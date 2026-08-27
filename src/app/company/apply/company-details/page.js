'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWizard } from '@/components/apply/WizardContext';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Plus, Upload, AlertCircle, Folder } from 'lucide-react';

/* ──────────────── HELPER COMPONENTS ──────────────── */

// FormField wrapper for label + input + error message
function FormField({ label, required, error, children, className = '' }) {
  return (
    <div className={`mb-2 ${className}`}>
      <label className="block text-sm font-medium text-[#374151] mb-1.5">
        {label} {required && <span className="text-[#E53E3E]">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-[#E53E3E] mt-1 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

// TextInput with rounded corners and optional Arabic restriction
function TextInput({ value, onChange, placeholder, type = 'text', hasError, arabicOnly }) {
  const handleChange = (e) => {
    let val = e.target.value;
    if (arabicOnly) {
      val = val.replace(/[^\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF\s0-9٠-٩.,،؛:!؟\-()]/g, '');
    }
    onChange(val);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      dir={arabicOnly ? 'rtl' : undefined}
      className={`w-full px-4 py-3 text-sm border rounded-2xl bg-white text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none transition-all ${
        hasError
          ? 'border-[#E53E3E] focus:ring-2 focus:ring-red-200'
          : 'border-[#D1D5DB] focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F]'
      }`}
    />
  );
}

// SelectInput with rounded corners
function SelectInput({ value, onChange, options, placeholder, hasError }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-3 text-sm border rounded-2xl bg-white text-[#111827] focus:outline-none cursor-pointer appearance-none ${
        hasError
          ? 'border-[#E53E3E] focus:ring-2 focus:ring-red-200'
          : 'border-[#D1D5DB] focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F]'
      }`}
    >
      <option value="">{placeholder || 'Select...'}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

// RadioGroup styled as Pill / Box Buttons (Yes / Partial / No side-by-side in columns)
function RadioGroup({ value, onChange, options }) {
  const gridCols = options.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2';
  return (
    <div className={`grid ${gridCols} gap-4 w-full`}>
      {options.map((opt) => {
        const isSelected = value === opt.val;
        return (
          <button
            key={opt.val}
            type="button"
            onClick={() => onChange(opt.val)}
            className={`w-full py-3.5 px-4 rounded-2xl border text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center ${
              isSelected
                ? 'border-[#1B4332] bg-[#F0FDF4] text-[#1B4332] font-semibold shadow-xs ring-1 ring-[#1B4332]'
                : 'border-[#D1D5DB] bg-white text-[#4B5563] hover:border-[#2D6A4F]/60 hover:bg-emerald-50/30'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// SectionTitle for inside each section card
function SectionTitle({ children }) {
  return (
    <h2 className="text-xl sm:text-2xl font-bold text-[#1B4332] mb-6">
      {children}
    </h2>
  );
}

// FileUploadBox with Folder icon section on the right
function FileUploadBox({ onChange, fileName, hasError }) {
  return (
    <label className={`relative flex items-center justify-between border rounded-2xl bg-white overflow-hidden cursor-pointer transition-all duration-200 hover:border-[#2D6A4F] ${
      hasError ? 'border-[#E53E3E]' : 'border-[#D1D5DB]'
    }`}>
      <span className="px-4 py-3.5 text-sm text-[#6B7280] truncate flex-1">
        {fileName || 'No file chosen'}
      </span>
      <div className="px-4 py-3.5 border-l border-[#D1D5DB] bg-gray-50/50 text-[#6B7280] flex items-center justify-center hover:bg-emerald-50/50 hover:text-[#2D6A4F] transition-colors shrink-0">
        <Folder size={18} />
      </div>
      <input
        type="file"
        onChange={onChange}
        accept=".pdf,.doc,.docx"
        className="hidden"
      />
    </label>
  );
}

/* ──────────────── MAIN PAGE COMPONENT ──────────────── */

export default function CompanyDetailsPage() {
  const router = useRouter();
  const { formData, updateField, clearForm } = useWizard();
  const { t } = useLanguage();
  const [errors, setErrors] = useState({});

  const yesNoOptions = [
    { val: 'Yes', label: t('yes') },
    { val: 'No', label: t('no') },
  ];

  const yesPartialNoOptions = [
    { val: 'Yes', label: t('yes') },
    { val: 'Partial', label: t('partial') },
    { val: 'No', label: t('no') },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.legalNameEn?.trim()) newErrors.legalNameEn = 'This field is required';
    if (!formData.legalNameAr?.trim()) newErrors.legalNameAr = 'This field is required';
    if (!formData.crNumber?.trim()) newErrors.crNumber = 'This field is required';
    if (!formData.vatYear?.trim()) newErrors.vatYear = 'This field is required';
    if (!formData.orgType) newErrors.orgType = 'This field is required';
    if (!formData.sector) newErrors.sector = 'This field is required';

    if (!formData.headOfficeEn?.trim()) newErrors.headOfficeEn = 'This field is required';
    if (!formData.headOfficeAr?.trim()) newErrors.headOfficeAr = 'This field is required';
    if (!formData.contactInfo?.trim()) newErrors.contactInfo = 'This field is required';

    if (!formData.crDocument) newErrors.crDocument = 'This field is required';
    if (!formData.vatDocument) newErrors.vatDocument = 'This field is required';
    if (!formData.mroDocument) newErrors.mroDocument = 'This field is required';
    if (!formData.moaDocument) newErrors.moaDocument = 'This field is required';

    if (!formData.certAreasEn?.trim()) newErrors.certAreasEn = 'This field is required';
    if (!formData.certScopeAr?.trim()) newErrors.certScopeAr = 'This field is required';
    if (!formData.multisite) newErrors.multisite = 'This field is required';

    if (!formData.totalEmployees) newErrors.totalEmployees = 'This field is required';
    if (!formData.permanentEmployees) newErrors.permanentEmployees = 'This field is required';
    if (!formData.contractEmployees) newErrors.contractEmployees = 'This field is required';
    if (!formData.numberOfSites) newErrors.numberOfSites = 'This field is required';
    if (!formData.shiftOperations) newErrors.shiftOperations = 'This field is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      router.push('/company/apply/section-1');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const addBrand = () => {
    updateField('brands', [
      ...formData.brands,
      { name: '', productsEn: '', productsAr: '', criticalProcesses: '', outsourcedProcesses: '' },
    ]);
  };

  const updateBrand = (index, field, value) => {
    const updated = [...formData.brands];
    updated[index] = { ...updated[index], [field]: value };
    updateField('brands', updated);
  };

  return (
    <div className="max-w-4xl mx-auto animate-slide-up pb-12">
      {/* Page Title Header */}
      <div className="flex flex-col items-center justify-center space-y-2 text-center pb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1B4332]">{t('companyDetails')}</h1>
        <p className="text-sm sm:text-base text-[#42716C]">{t('companyDetailsSubtitle')}</p>
      </div>

      {/* Global Error Banner */}
      {Object.keys(errors).length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-[#E53E3E] flex items-center gap-2">
          <AlertCircle size={18} />
          <span>{t('fillRequiredFieldsWarning')}</span>
        </div>
      )}

      {/* ===== CARD 1: Organization Basic Details ===== */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 lg:p-8 shadow-sm mb-6">
        <SectionTitle>{t('orgBasicDetails')}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label={t('legalNameEn')} required error={errors.legalNameEn}>
            <TextInput value={formData.legalNameEn} onChange={(v) => updateField('legalNameEn', v)} placeholder="interlink" hasError={!!errors.legalNameEn} />
          </FormField>
          <FormField label={t('legalNameAr')} required error={errors.legalNameAr}>
            <TextInput value={formData.legalNameAr} onChange={(v) => updateField('legalNameAr', v)} placeholder="أدخل اسم الشركة بالعربية" hasError={!!errors.legalNameAr} arabicOnly />
          </FormField>
          <FormField label={t('crNumber')} required error={errors.crNumber}>
            <TextInput value={formData.crNumber} onChange={(v) => updateField('crNumber', v)} placeholder="0980000000" hasError={!!errors.crNumber} />
          </FormField>
          <FormField label={t('vatYear')} required error={errors.vatYear}>
            <TextInput value={formData.vatYear} onChange={(v) => updateField('vatYear', v)} placeholder="89750000" hasError={!!errors.vatYear} />
          </FormField>
          <FormField label={t('orgType')} required error={errors.orgType}>
            <SelectInput value={formData.orgType} onChange={(v) => updateField('orgType', v)} options={['LLC', 'Private', 'JSC', 'Partnership', 'Sole Proprietorship', 'Government', 'Non-Profit']} placeholder="LLC" hasError={!!errors.orgType} />
          </FormField>
          <FormField label={t('sector')} required error={errors.sector}>
            <SelectInput value={formData.sector} onChange={(v) => updateField('sector', v)} options={['Manufacturing', 'Food Processing', 'Logistics', 'Technology', 'Energy', 'Healthcare', 'Construction', 'Agriculture', 'Mining', 'Hospitality', 'Retail', 'Other']} placeholder="Sector" hasError={!!errors.sector} />
          </FormField>
        </div>
      </div>

      {/* ===== CARD 2: Address and Contact Details ===== */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 lg:p-8 shadow-sm mb-6">
        <SectionTitle>{t('addressContactDetails')}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label={t('headOfficeEn')} required error={errors.headOfficeEn}>
            <TextInput value={formData.headOfficeEn} onChange={(v) => updateField('headOfficeEn', v)} placeholder="Enter address in English" hasError={!!errors.headOfficeEn} />
          </FormField>
          <FormField label={t('headOfficeAr')} required error={errors.headOfficeAr}>
            <TextInput value={formData.headOfficeAr} onChange={(v) => updateField('headOfficeAr', v)} placeholder="أدخل العنوان بالعربية" hasError={!!errors.headOfficeAr} arabicOnly />
          </FormField>
          <FormField label={t('website')}>
            <TextInput value={formData.website} onChange={(v) => updateField('website', v)} placeholder="https://example.com" type="url" />
          </FormField>
          <FormField label={t('websiteAr')}>
            <TextInput value={formData.websiteAr} onChange={(v) => updateField('websiteAr', v)} placeholder="https://example.com/ar" />
          </FormField>
          <div className="md:col-span-2">
            <FormField label={t('contactInfo')} required error={errors.contactInfo}>
              <TextInput value={formData.contactInfo} onChange={(v) => updateField('contactInfo', v)} placeholder="Phone, email, or other contact details" hasError={!!errors.contactInfo} />
            </FormField>
          </div>
        </div>
      </div>

      {/* ===== CARD 3: Legal Documents ===== */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 lg:p-8 shadow-sm mb-6">
        <SectionTitle>{t('legalDocs')}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { labelKey: 'crDocument', field: 'crDocument' },
            { labelKey: 'vatDocument', field: 'vatDocument' },
            { labelKey: 'mroDocument', field: 'mroDocument' },
            { labelKey: 'moaDocument', field: 'moaDocument' },
          ].map(({ labelKey, field }) => (
            <FormField key={field} label={t(labelKey)} required error={errors[field]}>
              <FileUploadBox
                onChange={(e) => updateField(field, e.target.files[0])}
                fileName={formData[field]?.name}
                hasError={!!errors[field]}
              />
            </FormField>
          ))}
        </div>
      </div>

      {/* ===== CARD 4: Scope and Multisite Configuration ===== */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 lg:p-8 shadow-sm mb-6">
        <SectionTitle>Scope and Multisite Configuration</SectionTitle>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField label="Scope of Certification (English)" required error={errors.certAreasEn}>
              <TextInput value={formData.certAreasEn} onChange={(v) => updateField('certAreasEn', v)} placeholder="Enter in English" hasError={!!errors.certAreasEn} />
            </FormField>
            <FormField label="Scope of Certification (Arabic)" required error={errors.certScopeAr}>
              <TextInput value={formData.certScopeAr} onChange={(v) => updateField('certScopeAr', v)} placeholder="أدخل باللغة العربية" hasError={!!errors.certScopeAr} arabicOnly />
            </FormField>
          </div>

          {/* Question with 2 side-by-side Yes / No pill buttons matching screenshot */}
          <FormField label={t('multisiteQuestion')} required error={errors.multisite}>
            <RadioGroup value={formData.multisite} onChange={(v) => updateField('multisite', v)} options={yesNoOptions} />
          </FormField>
        </div>
      </div>

      {/* ===== CARD 5: Workforce Details ===== */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 lg:p-8 shadow-sm mb-6">
        <SectionTitle>{t('workforceDetails')}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <FormField label={t('totalEmployees')} required error={errors.totalEmployees}>
            <TextInput value={formData.totalEmployees} onChange={(v) => updateField('totalEmployees', v)} placeholder="e.g. 500" type="number" hasError={!!errors.totalEmployees} />
          </FormField>
          <FormField label={t('permanentEmployees')} required error={errors.permanentEmployees}>
            <TextInput value={formData.permanentEmployees} onChange={(v) => updateField('permanentEmployees', v)} placeholder="e.g. 350" type="number" hasError={!!errors.permanentEmployees} />
          </FormField>
          <FormField label={t('contractEmployees')} required error={errors.contractEmployees}>
            <TextInput value={formData.contractEmployees} onChange={(v) => updateField('contractEmployees', v)} placeholder="e.g. 150" type="number" hasError={!!errors.contractEmployees} />
          </FormField>
          <FormField label={t('numberOfSites')} required error={errors.numberOfSites}>
            <TextInput value={formData.numberOfSites} onChange={(v) => updateField('numberOfSites', v)} placeholder="e.g. 3" type="number" hasError={!!errors.numberOfSites} />
          </FormField>
        </div>

        <div className="flex flex-col gap-6">
          <FormField label={t('shiftOperations')} required error={errors.shiftOperations}>
            <RadioGroup value={formData.shiftOperations} onChange={(v) => updateField('shiftOperations', v)} options={yesNoOptions} />
          </FormField>
          <FormField label={t('remoteWork')}>
            <RadioGroup value={formData.remoteWork} onChange={(v) => updateField('remoteWork', v)} options={yesNoOptions} />
          </FormField>
        </div>
      </div>

      {/* ===== CARD 6: Brand Details ===== */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 lg:p-8 shadow-sm mb-6">
        <SectionTitle>{t('brandDetails')}</SectionTitle>
        {formData.brands.map((brand, idx) => (
          <div key={idx} className="border border-[#E5E7EB] rounded-2xl p-5 mb-4 bg-[#FAFAFA]">
            <p className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-wide mb-4">Brand {idx + 1}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
              <FormField label="List Brands/Entities">
                <TextInput value={brand.name} onChange={(v) => updateBrand(idx, 'name', v)} placeholder="Brand name" />
              </FormField>
              <FormField label="Key Products / Services (English)">
                <TextInput value={brand.productsEn} onChange={(v) => updateBrand(idx, 'productsEn', v)} placeholder="Products in English" />
              </FormField>
              <FormField label="Key Products / Services (Arabic)" className="md:col-span-2">
                <TextInput value={brand.productsAr} onChange={(v) => updateBrand(idx, 'productsAr', v)} placeholder="المنتجات بالعربية" arabicOnly />
              </FormField>
            </div>
            <div className="flex flex-col gap-5">
              <FormField label="Critical Processes (Manufacturing)">
                <RadioGroup value={brand.criticalProcesses} onChange={(v) => updateBrand(idx, 'criticalProcesses', v)} options={yesNoOptions} />
              </FormField>
              <FormField label="Outsourced Processes">
                <RadioGroup value={brand.outsourcedProcesses} onChange={(v) => updateBrand(idx, 'outsourcedProcesses', v)} options={yesNoOptions} />
              </FormField>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addBrand}
          className="w-full py-3 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-sm font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Plus size={18} />
          {t('addBrand')}
        </button>
      </div>

      {/* ===== CARD 7: Certification and Compliance Status ===== */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 lg:p-8 shadow-sm mb-6">
        <SectionTitle>{t('certComplianceStatus')}</SectionTitle>
        
        {/* Full width stacked items per ISO question matching reference screenshot */}
        <div className="flex flex-col gap-6">
          {[
            { label: 'ISO 9001 (Quality) *', field: 'iso9001' },
            { label: 'ISO 14001 (Environment) *', field: 'iso14001' },
            { label: 'ISO 45001 (OH&S) *', field: 'iso45001' },
            { label: 'ISO 22000/ HACCP *', field: 'iso22000' },
            { label: 'ISO 50001 (Energy) *', field: 'iso50001' },
          ].map(({ label, field }) => (
            <FormField key={field} label={label}>
              <RadioGroup value={formData[field]} onChange={(v) => updateField(field, v)} options={yesNoOptions} />
            </FormField>
          ))}

          {/* Inset Sub-Card Container for Other Certifications (Matching Reference Image) */}
          <div className="border border-[#E5E7EB] rounded-2xl p-5 bg-white mt-2 shadow-xs">
            <label className="block text-sm font-medium text-[#374151] mb-2">
              Other certifications <span className="text-[#6B7280] font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={formData.otherCerts}
              onChange={(e) => updateField('otherCerts', e.target.value)}
              placeholder="Short-answer text"
              className="w-full pb-2 pt-2 text-sm bg-transparent border-b border-[#D1D5DB] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2D6A4F] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ===== CARD 8: ESG and Sustainability Practice Details ===== */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 lg:p-8 shadow-sm mb-6">
        <SectionTitle>{t('esgPracticeDetails')}</SectionTitle>
        <div className="flex flex-col gap-6">
          {[
            { label: 'ESG Program in Place', field: 'esgProgram' },
            { label: 'ESG Governance / Safety / Health Policy', field: 'esgGovernance' },
            { label: 'Sustainability Strategy / Report Sections', field: 'sustainabilityStrategy' },
            { label: 'GHG / Carbon Output Monitoring', field: 'ghgMonitoring' },
            { label: 'Energy Management Document', field: 'energyManagement' },
            { label: 'Social Responsibility Programs', field: 'socialResponsibility' },
            { label: 'Good Labour / ESG Compliance Assessment', field: 'esgCompliance' },
          ].map(({ label, field }) => (
            <FormField key={field} label={label}>
              <RadioGroup value={formData[field]} onChange={(v) => updateField(field, v)} options={yesNoOptions} />
            </FormField>
          ))}
        </div>
      </div>

      {/* ===== CARD 9: Additional Notes & Supporting Documents ===== */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 lg:p-8 shadow-sm mb-6">
        <SectionTitle>{t('additionalNotes')}</SectionTitle>
        
        {/* Inset Sub-Card Container for Additional Notes */}
        <div className="border border-[#E5E7EB] rounded-2xl p-5 bg-white mb-8 shadow-xs">
          <label className="block text-sm font-medium text-[#374151] mb-2">
            Additional Notes <span className="text-[#6B7280] font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={formData.additionalNotes}
            onChange={(e) => updateField('additionalNotes', e.target.value)}
            placeholder="Short-answer text"
            className="w-full pb-2 pt-2 text-sm bg-transparent border-b border-[#D1D5DB] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2D6A4F] transition-colors"
          />
        </div>

        <SectionTitle>{t('supportingDocs')}</SectionTitle>
        <div className="border-2 border-dashed border-[#D1D5DB] rounded-2xl p-10 text-center hover:border-[#2D6A4F]/40 transition-colors">
          <Upload size={36} className="mx-auto text-[#9CA3AF] mb-3" />
          <p className="text-sm text-[#111827] font-medium">{t('dragDropText')}</p>
          <p className="text-xs text-[#6B7280] mt-1">Max 15MB • PDF, DOC, XLS, CSV</p>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
            onChange={(e) => updateField('supportingDocs', e.target.files)}
            className="mt-4"
          />
        </div>
      </div>

      {/* Bottom Actions Bar */}
      <div className="flex items-center justify-between mt-6 mb-8 py-4">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={clearForm}
            className="px-5 py-2.5 text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
          >
            {t('clearForm')}
          </button>
          <button
            type="button"
            className="px-5 py-2.5 text-sm font-medium text-[#2D6A4F] border border-[#2D6A4F] rounded-xl hover:bg-[#F0FDF4] transition-colors cursor-pointer"
          >
            {t('markFillLater')}
          </button>
        </div>
        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-3 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-sm font-bold rounded-2xl transition-colors cursor-pointer"
        >
          {t('next')} →
        </button>
      </div>
    </div>
  );
}
