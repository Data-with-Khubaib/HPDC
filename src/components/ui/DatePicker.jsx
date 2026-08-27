import { Calendar } from 'lucide-react';

export default function DatePicker({ value, onChange, label, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-colors"
        />
      </div>
    </div>
  );
}
