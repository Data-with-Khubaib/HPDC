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

export default function Section1Page() {
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
          <span className="text-sm font-bold text-[#2D6A4F]">{t('section1Of4')}</span>
          <span className="text-sm text-[#6B7280]">: {t('esgAssessment')}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#E53E3E] font-medium">{t('indicatesRequired')}</span>
          <span className="flex items-center gap-1.5 text-xs text-[#2D6A4F] font-semibold">
            <CheckCircle size={14} /> {t('allChangesSaved')}
          </span>
        </div>
      </div>

      {/* Cards for each Section 1 Group */}
      <QuestionCard title="Greenhouse Gas Management">
        <SurveyQuestion id="s1_ghg_1" question="Does your organization conduct GHG inventory covering Scope 1, Scope 2 and Scope 3 emissions?" />
        <SurveyQuestion id="s1_ghg_2" question="Does your organization have a documented GHG reduction strategy?" />
        <SurveyQuestion id="s1_ghg_3" question="Does your organization maintain a temperature performance record?" />
      </QuestionCard>

      <QuestionCard title="Adaptation to Climate Change">
        <SurveyQuestion id="s1_climate_1" question="Does your organization identify climate-related risks, impacts and/or opportunities?" />
        <SurveyQuestion id="s1_climate_2" question="Does your organization collect and analyze climate risk-related data and parameters?" />
        <SurveyQuestion id="s1_climate_3" question="Has it directly or indirectly a temperature increase in value chain/processing?" />
        <SurveyQuestion id="s1_climate_4" question="Does your organization include responses and adaptation measures?" />
      </QuestionCard>

      <QuestionCard title="Biodiversity Management">
        <SurveyQuestion id="s1_bio_1" question="Does your organization complete biodiversity impact and risk assessment (IBRA)?" />
        <SurveyQuestion id="s1_bio_2" question="Does your organization have a documented Biodiversity Action Plan?" />
      </QuestionCard>

      <QuestionCard title="Water Footprint Management">
        <SurveyQuestion id="s1_water_1" question="Does your organization monitor a water footprint inventory?" />
        <SurveyQuestion id="s1_water_2" question="Does your organization establish a water footprint impact assessment?" />
      </QuestionCard>

      <QuestionCard title="Circular Economy">
        <SurveyQuestion id="s1_circular_1" question="Does your organization define a circular economy classification or strategy/target?" />
        <SurveyQuestion id="s1_circular_2" question="Does your organization have representations in industry/sector associations, or partnerships?" />
        <SurveyQuestion id="s1_circular_3" question="Does your organization establish in-scope circular economy initiatives for own use?" />
        <SurveyQuestion id="s1_circular_4" question="Does your organization implement circular economy practices in product lifecycle?" />
      </QuestionCard>

      <QuestionCard title="Environmental Management">
        <SurveyQuestion id="s1_env_1" question="Does your organization identify and prioritize key environmental topics and impacts?" />
        <SurveyQuestion id="s1_env_2" question="Does your organization establish environmental and social targets at key sites or locations?" />
        <SurveyQuestion id="s1_env_3" question="Does your organization establish key measures for chemicals management at specific areas?" />
      </QuestionCard>

      <QuestionCard title="Energy Management">
        <SurveyQuestion id="s1_energy_1" question="Does your organization conduct and track energy consumption?" />
        <SurveyQuestion id="s1_energy_2" question="Does your organization have an energy management program or establishment?" />
      </QuestionCard>

      <QuestionCard title="Environmental Sustainability">
        <SurveyQuestion id="s1_sustain_1" type="textarea" question="Explain how environmental sustainability is measured, identified, resolved and reported in your organization." />
        <SurveyQuestion id="s1_sustain_2" type="textarea" question="Describe your organization's approach to environmental impact assessment and mitigation." />
        <SurveyQuestion id="s1_sustain_3" type="textarea" question="What environmental monitoring systems does your organization have in place?" />
        <SurveyQuestion id="s1_sustain_4" type="textarea" question="How does your organization manage waste reduction and recycling initiatives?" />
        <SurveyQuestion id="s1_sustain_5" type="textarea" question="Describe your organization's approach to sustainable resource management." />
        <SurveyQuestion id="s1_sustain_6" type="textarea" question="What environmental compliance frameworks does your organization follow?" />
        <SurveyQuestion id="s1_sustain_7" type="textarea" question="How does your organization engage stakeholders on environmental issues?" />
      </QuestionCard>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 mb-8 py-4">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push('/company/apply/company-details')}
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
          onClick={() => router.push('/company/apply/section-2')}
          className="px-8 py-3 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-sm font-bold rounded-2xl transition-colors cursor-pointer"
        >
          {t('next')} →
        </button>
      </div>
    </div>
  );
}
