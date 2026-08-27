'use client';
import { useState, useMemo } from 'react';
import { FileText, Users } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import SearchInput from '@/components/ui/SearchInput';
import { getRecentApplications, searchApplications } from '@/lib/mock-data/applications';
import { useLanguage } from '@/components/layout/LanguageContext';

export default function RecentApplicationsTable() {
  const [query, setQuery] = useState('');
  const { t } = useLanguage();

  const displayApps = useMemo(() => {
    if (query) {
      const searched = searchApplications(query, 'all');
      return searched.slice(0, 5);
    }
    return getRecentApplications(5);
  }, [query]);

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-bold text-[#111827]">{t('recentApplications')}</h2>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder={t('searchPlaceholder')}
          className="w-full sm:w-64"
        />
      </div>

      <div className="space-y-3">
        {displayApps.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#6B7280]">
            No applications found
          </div>
        ) : (
          displayApps.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#E5E7EB] hover:border-[#2D6A4F]/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-[#2D6A4F]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2D6A4F]">{app.applicationNo}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">{app.companyName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {app.status === 'Assessment Schedule' && (
                  <div className="hidden sm:flex items-center gap-2 pr-3 border-r border-[#E5E7EB] text-xs text-[#6B7280]">
                    <Users size={14} />
                  </div>
                )}
                <Badge status={app.status === 'Approved' ? 'Submitted' : app.status} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
