'use client';
import Modal from '@/components/ui/Modal';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ApplicationAcceptedModal({ isOpen, onClose }) {
  const router = useRouter();

  const handleGoToDashboard = () => {
    onClose();
    router.push('/company/dashboard');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="text-center py-4 px-2">
        {/* Animated Checkmark Circle */}
        <div className="w-20 h-20 bg-[#F0FDF4] text-[#1B4332] rounded-full flex items-center justify-center mx-auto mb-5 shadow-xs border border-emerald-200">
          <CheckCircle2 size={44} className="text-[#2D6A4F]" />
        </div>

        {/* Modal Title & Subtitle */}
        <h2 className="text-2xl font-bold text-[#1B4332] mb-2">
          Application Accepted!
        </h2>
        <p className="text-sm text-[#4B5563] mb-6 leading-relaxed">
          Your ESG certification application has been successfully submitted and accepted. Our assessment team will review your application details shortly.
        </p>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleGoToDashboard}
          className="w-full py-3.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <span>Go to Dashboard</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </Modal>
  );
}
