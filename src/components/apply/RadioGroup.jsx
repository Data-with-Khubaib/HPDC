'use client';

export default function RadioGroup({ value, onChange, options }) {
  const gridCols = options.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2';
  return (
    <div className={`grid ${gridCols} gap-4 w-full`}>
      {options.map((opt) => {
        const isSelected = value === opt.val;
        return (
          <button
            key={opt.val}
            type="button"
            onClick={() => onChange(opt.val)}
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
  );
}
