'use client';
import { useLanguage } from '@/components/layout/LanguageContext';
import CertificatesTable from '@/components/certificates/CertificatesTable';

export default function CertificatesPage() {
  const { t } = useLanguage();

  return (
    <div className="animate-slide-up">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B4332]">{t('myCertificates')}</h1>
        <p className="text-sm text-gray-500 mt-0.5">ESG Tayib Sustainability Certification Portal</p>
      </div>

      <CertificatesTable />
    </div>
  );
}
