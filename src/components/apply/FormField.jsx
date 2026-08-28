'use client';
import { AlertCircle } from 'lucide-react';

export default function FormField({ label, required, error, children, className = '' }) {
  return (
    <div className={`mb-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[#374151] mb-1.5">
          {label} {required && <span className="text-[#E53E3E]">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs text-[#E53E3E] mt-1 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}
