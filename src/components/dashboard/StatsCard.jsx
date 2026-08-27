import { ClipboardList, XCircle, FileCheck, FileWarning, FileX, FileClock } from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageContext';

const iconMap = {
  ClipboardList,
  XCircle,
  FileCheck,
  FileWarning,
  FileX,
  FileClock,
};

const colorMap = {
  green: {
    title: 'text-[#15803D]',
    number: 'text-[#15803D]',
    icon: 'text-[#16A34A]',
    iconBg: 'bg-emerald-50 border-emerald-200',
    cardBorder: 'border-emerald-100',
  },
  red: {
    title: 'text-[#DC2626]',
    number: 'text-[#DC2626]',
    icon: 'text-[#EF4444]',
    iconBg: 'bg-red-50 border-red-200',
    cardBorder: 'border-red-100',
  },
  amber: {
    title: 'text-[#D97706]',
    number: 'text-[#D97706]',
    icon: 'text-[#F59E0B]',
    iconBg: 'bg-amber-50 border-amber-200',
    cardBorder: 'border-amber-100',
  },
};

export default function StatsCard({ labelKey, label, value, icon, color }) {
  const { t } = useLanguage();
  const Icon = iconMap[icon] || ClipboardList;
  const colors = colorMap[color] || colorMap.green;

  return (
    <div className={`bg-white rounded-2xl border ${colors.cardBorder} p-6 shadow-sm flex flex-col justify-between min-h-[145px]`}>
      <div className="flex items-start justify-between">
        <h3 className={`text-base font-semibold ${colors.title} leading-snug max-w-[70%]`}>
          {labelKey ? t(labelKey) : label}
        </h3>
        <div className={`w-10 h-10 rounded-full border ${colors.iconBg} flex items-center justify-center shrink-0`}>
          <Icon size={18} className={colors.icon} />
        </div>
      </div>
      <div className="mt-auto pt-3">
        <p className={`text-4xl font-bold ${colors.number}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
