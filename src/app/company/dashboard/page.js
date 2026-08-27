'use client';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentApplicationsTable from '@/components/dashboard/RecentApplicationsTable';
import { dashboardStats } from '@/lib/mock-data/dashboard-stats';
import { useLanguage } from '@/components/layout/LanguageContext';
import Image from 'next/image'

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="animate-slide-up">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1B4332]">{t('dashboard')}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{t('hpdcPlatform')}</p>
        </div>
        <Link href="/company/apply/company-details">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer">
            <Image src='/assets/userplus.svg' alt="user plus" width={16} height={16} priority />
            {t('applyForCertifications')}
          </button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {dashboardStats.map((stat) => (
          <StatsCard
            key={stat.id}
            labelKey={stat.labelKey}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Recent Applications */}
      <RecentApplicationsTable />
    </div>
  );
}
