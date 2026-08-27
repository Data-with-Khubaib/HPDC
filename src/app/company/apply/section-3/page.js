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

function QuestionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 lg:p-8 shadow-sm mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-[#1B4332] mb-6">{title}</h2>
      {children}
    </div>
  );
}

export default function Section3Page() {
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
          <span className="text-sm font-bold text-[#2D6A4F]">{t('section3Of4')}</span>
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
      <QuestionCard title="Sustainability Governance and Business Conduct">
        <SurveyQuestion id="s3_gov_1" type="textarea" question="Who is accountable for sustainability, how are responsibilities allocated, and how is management oversight maintained?" />
        <SurveyQuestion id="s3_gov_2" type="textarea" question="How does your organization identify and prioritize key sustainability topics, business conduct risks, legal/regulatory obligations?" />
        <SurveyQuestion id="s3_gov_3" type="textarea" question="What are your sustainability objectives, priorities, action plans, responsibilities, and timelines?" />
        <SurveyQuestion id="s3_gov_4" type="textarea" question="How is sustainability information collected, records maintained, who is responsible, and how is accuracy checked?" />
        <SurveyQuestion id="s3_gov_5" type="textarea" question="How are sustainability matters reviewed internally, outcomes communicated, and issues converted to actions?" />
        <SurveyQuestion id="s3_gov_6" type="textarea" question="What are the main business conduct, anti-corruption, anti-bribery declarations, training, reporting, and speak-up controls?" />
        <SurveyQuestion id="s3_gov_7" type="textarea" question="Have there been any convictions or fines during the reporting period?" />
        <SurveyQuestion id="s3_gov_8" type="textarea" question="How do sustainability matters influence strategy, business planning, and major investments?" />
        <SurveyQuestion id="s3_gov_9" type="textarea" question="Provide a detailed description of sustainability practices, policies, initiatives, and responsibilities." />
        <SurveyQuestion id="s3_gov_10" type="textarea" question="How is governing body composition recorded, reviewed, and considered in planning/nominations?" />
      </QuestionCard>

      <QuestionCard title="Organizational Governance">
        <SurveyQuestion id="s3_org_1" question="Is the governing body structured to meet stakeholder expectations?" />
        <SurveyQuestion id="s3_org_2" question="Is the governing body competent and accountable for oversight?" />
        <SurveyQuestion id="s3_org_3" question="Does the governing body support long-term sustainability and value creation?" />
      </QuestionCard>

      <QuestionCard title="Risk Management">
        <SurveyQuestion id="s3_risk_1" question="Does your organization have a risk management framework?" />
        <SurveyQuestion id="s3_risk_2" question="Are risk identification, assessment, and treatment performed?" />
      </QuestionCard>

      <QuestionCard title="Compliance Management">
        <SurveyQuestion id="s3_comp_1" question="Is a compliance obligations register maintained?" />
        <SurveyQuestion id="s3_comp_2" question="Are compliance risks assessed and managed?" />
      </QuestionCard>

      <QuestionCard title="Privacy & Information Security">
        <SurveyQuestion id="s3_privacy_1" question="Are information security risks and vulnerabilities assessed?" />
        <SurveyQuestion id="s3_privacy_2" question="Are privacy and information security controls implemented?" />
      </QuestionCard>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 mb-8 py-4">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push('/company/apply/section-2')}
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
          onClick={() => router.push('/company/apply/section-4')}
          className="px-8 py-3 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-sm font-bold rounded-2xl transition-colors cursor-pointer"
        >
          {t('next')} →
        </button>
      </div>
    </div>
  );
}
