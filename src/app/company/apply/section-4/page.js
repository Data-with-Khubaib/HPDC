'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWizard } from '@/components/apply/WizardContext';
import { useLanguage } from '@/components/layout/LanguageContext';
import Modal from '@/components/ui/Modal';
import { CheckCircle, ChevronDown } from 'lucide-react';

function SurveyQuestion({ id, question, type = 'radio' }) {
  const { formData, updateSurvey } = useWizard();
  const { t } = useLanguage();
  const value = formData.survey[id] || '';

  if (type === 'textarea') {
    return (
      <div className="border border-[#E5E7EB] rounded-2xl p-5 bg-white mb-4 shadow-xs">
        <label className="block text-sm font-medium text-[#374151] mb-2">{question}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => updateSurvey(id, e.target.value)}
          className="w-full pb-2 pt-2 text-sm bg-transparent border-b border-[#D1D5DB] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2D6A4F] transition-colors"
          placeholder="Short-answer text"
        />
      </div>
    );
  }

  const options = type === 'toggle' 
    ? [{ val: 'Yes', label: t('yes') }, { val: 'No', label: t('no') }]
    : [{ val: 'Yes', label: t('yes') }, { val: 'Partial', label: t('partial') }, { val: 'No', label: t('no') }];

  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-[#374151] mb-3">{question}</p>
      <div className={type === 'toggle' ? 'grid grid-cols-2 gap-4 w-full' : 'grid grid-cols-1 sm:grid-cols-3 gap-4 w-full'}>
        {options.map((opt) => {
          const isSelected = value === opt.val;
          return (
            <button
              key={opt.val}
              type="button"
              onClick={() => updateSurvey(id, opt.val)}
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
    </div>
  );
}

function QuestionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 lg:p-8 shadow-sm mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-[#1B4332] mb-6">{title}</h2>
      {children}
    </div>
  );
}

function PaymentModal({ isOpen, onClose, onProceed }) {
  const [certType, setCertType] = useState('1 Year Validity');
  const pricing = {
    '1 Year Validity': { total: 'SAR 46,910' },
    '3 Year Validity': { total: 'SAR 98,500' },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Certificate Type & Payment" maxWidth="max-w-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-1.5">
            Certificate Type
          </label>
          <div className="relative">
            <select
              value={certType}
              onChange={(e) => setCertType(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-3 text-sm border border-[#D1D5DB] rounded-2xl bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 cursor-pointer"
            >
              <option value="1 Year Validity">1 Year Validity (SAR 46,910)</option>
              <option value="3 Year Validity">3 Year Validity (SAR 98,500)</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-1.5">
            Certificate + Application Fee
          </label>
          <p className="text-2xl font-bold text-[#1B4332] py-1">{pricing[certType].total}</p>
        </div>
      </div>

      <div className="bg-[#F0FDF4] border border-emerald-200 rounded-2xl p-4 mb-6">
        <p className="text-sm text-[#1B4332]">
          Certificate Fee will be paid when certificate is issued. For now you just have to pay Application fee only which is <strong>SAR 23,454</strong> only.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 text-sm font-medium text-[#6B7280] border border-[#D1D5DB] rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onProceed}
          className="flex-1 py-3 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
        >
          Proceed to Invoice
        </button>
      </div>
    </Modal>
  );
}

export default function Section4Page() {
  const router = useRouter();
  const { formData, updateField, clearForm } = useWizard();
  const { t } = useLanguage();
  const [paymentOpen, setPaymentOpen] = useState(false);

  const handleNext = () => {
    setPaymentOpen(true);
  };

  const handleProceedToPayment = () => {
    setPaymentOpen(false);
    router.push('/company/apply/payment');
  };

  return (
    <div className="max-w-4xl mx-auto animate-slide-up pb-12">
      {/* Header */}
      <div className="flex flex-col items-center justify-center space-y-2 text-center pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1B4332]">{t('esgSurvey')}</h1>
        <p className="text-sm sm:text-base text-[#42716C]">{t('surveySubtitle')}</p>
      </div>

      {/* Progress Bar & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white rounded-2xl border border-[#E5E7EB] p-4 px-6 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#2D6A4F]">{t('section4Of4')}</span>
          <span className="text-sm text-[#6B7280]">: {t('esgAssessment')}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#E53E3E] font-medium">{t('indicatesRequired')}</span>
          <span className="flex items-center gap-1.5 text-xs text-[#2D6A4F] font-semibold">
            <CheckCircle size={14} /> {t('allChangesSaved')}
          </span>
        </div>
      </div>

      {/* Question Cards */}
      <QuestionCard title="Halal Certification Scope">
        <SurveyQuestion id="s4_halal_1" type="toggle" question="Does your company have a valid Halal certificate?" />
      </QuestionCard>

      <QuestionCard title="Innovation Management">
        <SurveyQuestion id="s4_innov_1" question="Does your organization have a structured process for innovation and continuous improvement?" />
        <SurveyQuestion id="s4_innov_2" question="Does your organization develop innovation-related skills and capabilities?" />
      </QuestionCard>

      <QuestionCard title="Product Stewardship & Quality">
        <SurveyQuestion id="s4_product_1" question="Does your organization have a Product Stewardship and Quality Policy?" />
        <SurveyQuestion id="s4_product_2" question="Does leadership support reducing product life cycle impacts and promoting sustainable production?" />
      </QuestionCard>

      <QuestionCard title="Stakeholder Management">
        <SurveyQuestion id="s4_stake_1" question="Has your organization identified internal and external stakeholders?" />
        <SurveyQuestion id="s4_stake_2" question="Have stakeholders been categorized by influence and interest?" />
        <SurveyQuestion id="s4_stake_3" question="Have underrepresented stakeholder groups been considered?" />
        <SurveyQuestion id="s4_stake_4" question="Has a stakeholder engagement strategy been developed?" />
      </QuestionCard>

      <QuestionCard title="Sustainable Finance">
        <SurveyQuestion id="s4_fin_1" question="Are sustainability risks and opportunities integrated into financial decisions?" />
        <SurveyQuestion id="s4_fin_2" question="Are sustainability impacts assessed at transaction and portfolio levels?" />
        <SurveyQuestion id="s4_fin_3" question="Is sustainability oversight assigned to a board or committee?" />
      </QuestionCard>

      <QuestionCard title="Sustainable Procurement">
        <SurveyQuestion id="s4_proc_1" question="Are sustainability impacts assessed within procurement activities?" />
        <SurveyQuestion id="s4_proc_2" question="Are life-cycle impacts considered during purchasing decisions?" />
        <SurveyQuestion id="s4_proc_3" question="Is supplier diversity and local sourcing supported?" />
      </QuestionCard>

      <QuestionCard title="ESG Performance Metrics">
        <SurveyQuestion id="s4_metrics_1" type="textarea" question="Which ESG performance metrics does your organization currently monitor? (optional)" />
      </QuestionCard>

      {/* Terms Card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 lg:p-8 shadow-sm mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.agreedToTerms}
            onChange={(e) => updateField('agreedToTerms', e.target.checked)}
            className="w-5 h-5 mt-0.5 accent-[#2D6A4F]"
          />
          <span className="text-sm text-[#111827]">
            I agree to the Terms & Conditions and certify that the information provided in this ESG assessment is true, accurate, and complete to the best of my knowledge.
          </span>
        </label>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 mb-8 py-4">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push('/company/apply/section-3')}
            className="px-5 py-2.5 text-sm font-medium text-[#2D6A4F] border border-[#2D6A4F] rounded-xl hover:bg-[#F0FDF4] transition-colors cursor-pointer"
          >
            ← {t('back')}
          </button>
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

      <PaymentModal
        isOpen={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        onProceed={handleProceedToPayment}
      />
    </div>
  );
}
