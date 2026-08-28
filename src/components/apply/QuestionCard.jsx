'use client';

export function SectionTitle({ children }) {
  return (
    <h2 className="text-xl sm:text-2xl font-bold text-[#1B4332] mb-6">
      {children}
    </h2>
  );
}

export function QuestionCard({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-[#E5E7EB] p-6 lg:p-8 shadow-sm mb-6 ${className}`}>
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </div>
  );
}
