'use client';
import { useRouter } from 'next/navigation';
import { useWizard } from '@/components/apply/WizardContext';
import { useLanguage } from '@/components/layout/LanguageContext';
import { CheckCircle } from 'lucide-react';

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

  const options = [
    { val: 'Yes', label: t('yes') },
    { val: 'Partial', label: t('partial') },
    { val: 'No', label: t('no') },
  ];

  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-[#374151] mb-3">{question}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
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

function CheckboxGroup({ id, label, options }) {
  const { formData, updateSurvey } = useWizard();
  const selected = formData.survey[id] || [];

  const toggle = (opt) => {
    const updated = selected.includes(opt)
      ? selected.filter((s) => s !== opt)
      : [...selected, opt];
    updateSurvey(id, updated);
  };

  return (
    <div className="mb-4">
      <p className="text-sm font-medium text-[#374151] mb-3">{label}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const isChecked = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`w-full py-3 px-4 rounded-2xl border text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-3 text-left ${
                isChecked
                  ? 'border-[#1B4332] bg-[#F0FDF4] text-[#1B4332] font-semibold ring-1 ring-[#1B4332]'
                  : 'border-[#D1D5DB] bg-white text-[#4B5563] hover:border-[#2D6A4F]/60 hover:bg-emerald-50/30'
              }`}
            >
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                isChecked ? 'bg-[#1B4332] border-[#1B4332] text-white' : 'border-[#D1D5DB] bg-white'
              }`}>
                {isChecked && <CheckCircle size={12} />}
              </div>
              <span>{opt}</span>
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

export default function Section2Page() {
  const router = useRouter();
  const { clearForm } = useWizard();
  const { t } = useLanguage();

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
          <span className="text-sm font-bold text-[#2D6A4F]">{t('section2Of4')}</span>
          <span className="text-sm text-[#6B7280]">: {t('esgAssessment')}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#E53E3E] font-medium">{t('indicatesRequired')}</span>
          <span className="flex items-center gap-1.5 text-xs text-[#2D6A4F] font-semibold">
            <CheckCircle size={14} /> {t('allChangesSaved')}
          </span>
        </div>
      </div>

      {/* Cards for each Section 2 Group */}
      <QuestionCard title="Human Rights">
        <SurveyQuestion id="s2_hr_1" question="Does your organization have a documented Human Rights Policy?" />
        <SurveyQuestion id="s2_hr_2" question="Has human rights due diligence been conducted?" />
        <SurveyQuestion id="s2_hr_3" question="Does your organization prohibit forced or compulsory labor?" />
        <SurveyQuestion id="s2_hr_4" question="Are health and safety risk assessments performed?" />
        <SurveyQuestion id="s2_hr_5" question="Does your organization provide a safe and healthy workplace?" />
      </QuestionCard>

      <QuestionCard title="Human Capital Reporting">
        <SurveyQuestion id="s2_hc_1" question="Does your organization promote workforce diversity and inclusion?" />
        <SurveyQuestion id="s2_hc_2" question="Does your organization support employee wellbeing and ethical labor practices?" />
      </QuestionCard>

      <QuestionCard title="Social Responsibility">
        <CheckboxGroup
          id="s2_sr_areas"
          label="Select applicable social responsibility areas:"
          options={[
            'Community Development',
            'Education & Culture',
            'Employment & Skills Development',
            'Community Health',
            'Wealth Creation',
            'Social Investment',
          ]}
        />
      </QuestionCard>

      <QuestionCard title="Social Sustainability">
        <SurveyQuestion id="s2_social_1" type="textarea" question="Explain how workforce information is maintained, fields recorded, and how kept current." />
        <SurveyQuestion id="s2_social_2" type="textarea" question="Describe main occupational health and safety practices, responsibilities, checks, and worker protections." />
        <SurveyQuestion id="s2_social_3" type="textarea" question="How are work-related accidents and fatalities recorded, investigated, and reviewed?" />
        <SurveyQuestion id="s2_social_4" type="textarea" question="How does your company ensure wage compliance across scope?" />
        <SurveyQuestion id="s2_social_5" type="textarea" question="Describe employee training, competence development, and training hour records." />
        <SurveyQuestion id="s2_social_6" type="textarea" question="Provide additional workforce metrics (management gender ratio, etc.)." />
        <SurveyQuestion id="s2_social_7" type="textarea" question="Describe HR-related policy, code, complaint route, or grievance mechanism." />
        <SurveyQuestion id="s2_social_8" type="textarea" question="How does your organization handle employee complaints and dispute resolution?" />
      </QuestionCard>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 mb-8 py-4">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push('/company/apply/section-1')}
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
          onClick={() => router.push('/company/apply/section-3')}
          className="px-8 py-3 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-sm font-bold rounded-2xl transition-colors cursor-pointer"
        >
          {t('next')} →
        </button>
      </div>
    </div>
  );
}
