'use client';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function PaymentPage() {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto animate-slide-up">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[#111827]">Billing</h1>
        <p className="text-sm text-[#6B7280] mt-1">Complete the application form to begin the HPDC ESG certification process.</p>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#111827]">Hello</h2>
            <p className="text-sm text-[#6B7280] mt-1">Registration ID: <span className="font-medium text-[#111827]">APP-2026-0144</span></p>
          </div>
          <Badge status="Pending Payment" />
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] mb-8">
          <div>
            <p className="text-[10px] font-medium text-[#6B7280] uppercase tracking-wider">Certification Type</p>
            <p className="text-sm font-medium text-[#111827] mt-1">1 Year Validity</p>
          </div>
          <div>
            <p className="text-[10px] font-medium text-[#6B7280] uppercase tracking-wider">Submission Date</p>
            <p className="text-sm font-medium text-[#111827] mt-1">August 26, 2026</p>
          </div>
          <div>
            <p className="text-[10px] font-medium text-[#6B7280] uppercase tracking-wider">Amount Due</p>
            <p className="text-sm font-bold text-[#1B4332] mt-1">SAR 75,502.10</p>
          </div>
        </div>

        {/* Billing Breakdown */}
        <h3 className="text-base font-bold text-[#111827] mb-4">Billing Breakdown</h3>
        <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <div className="px-5 py-3 col-span-2">
              <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Description</span>
            </div>
            <div className="px-5 py-3 text-right">
              <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Amount</span>
            </div>
          </div>

          {/* Application Fee */}
          <div className="grid grid-cols-3 border-b border-[#E5E7EB]">
            <div className="px-5 py-4 col-span-2">
              <p className="text-sm font-medium text-[#111827]">Application Fee</p>
              <p className="text-xs text-[#6B7280] mt-0.5">Standard institutional certification processing fee for fiscal year 2024-25.</p>
            </div>
            <div className="px-5 py-4 text-right">
              <p className="text-sm font-medium text-[#111827]">SAR 65,654.00</p>
            </div>
          </div>

          {/* VAT */}
          <div className="grid grid-cols-3 border-b border-[#E5E7EB]">
            <div className="px-5 py-4 col-span-2">
              <p className="text-sm font-medium text-[#111827]">VAT (15%)</p>
              <p className="text-xs text-[#6B7280] mt-0.5">15% Value Added Tax.</p>
            </div>
            <div className="px-5 py-4 text-right">
              <p className="text-sm font-medium text-[#111827]">SAR 9,848.10</p>
            </div>
          </div>

          {/* Total */}
          <div className="grid grid-cols-3 bg-emerald-50">
            <div className="px-5 py-4 col-span-2">
              <p className="text-sm font-bold text-[#1B4332]">Total Amount Due</p>
            </div>
            <div className="px-5 py-4 text-right">
              <p className="text-lg font-bold text-[#1B4332]">SAR 75,502.10</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E5E7EB]">
          <Button variant="outline" onClick={() => router.push('/company/apply/section-4')}>
            ← Back
          </Button>
          <Button variant="solid" onClick={() => {
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-6 right-6 bg-[#1B4332] text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium z-[100] animate-slide-up';
            toast.textContent = '✓ Proceeding to payment gateway...';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
          }}>
            Proceed to Payment →
          </Button>
        </div>
      </div>
    </div>
  );
}
