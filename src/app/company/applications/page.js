'use client';
import { useLanguage } from '@/components/layout/LanguageContext';
import ApplicationTable from '@/components/applications/ApplicationTable';

export default function ApplicationsPage() {
  const { t } = useLanguage();

  return (
    <div className="animate-slide-up">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B4332]">{t('applicationManagement')}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{t('hpdcPlatform')}</p>
      </div>

      <ApplicationTable />
    </div>
  );
}
