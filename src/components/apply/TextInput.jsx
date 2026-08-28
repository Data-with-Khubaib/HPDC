'use client';

export default function TextInput({ value, onChange, placeholder, type = 'text', hasError, arabicOnly }) {
  const handleChange = (e) => {
    let val = e.target.value;
    if (arabicOnly) {
      // Filter out non-Arabic characters
      val = val.replace(/[^\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF\s0-9٠-٩.,،؛:!؟\-()]/g, '');
    }
    onChange(val);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      dir={arabicOnly ? 'rtl' : undefined}
      className={`w-full px-4 py-3 text-sm border rounded-2xl bg-white text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none transition-all ${
        hasError
          ? 'border-[#E53E3E] focus:ring-2 focus:ring-red-200'
          : 'border-[#D1D5DB] focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F]'
      }`}
    />
  );
}
