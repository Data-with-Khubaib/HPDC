'use client';
import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import DatePicker from '@/components/ui/DatePicker';
import { ChevronDown } from 'lucide-react';

export default function AdvancedSearchModal({ isOpen, onClose, onApply }) {
  const [issuedFrom, setIssuedFrom] = useState('');
  const [issuedTo, setIssuedTo] = useState('');
  const [expiryFrom, setExpiryFrom] = useState('');
  const [expiryTo, setExpiryTo] = useState('');
  const [status, setStatus] = useState('all');

  const handleApply = () => {
    onApply({ issuedFrom, issuedTo, expiryFrom, expiryTo, status });
    onClose();
  };

  const handleCancel = () => {
    setIssuedFrom('');
    setIssuedTo('');
    setExpiryFrom('');
    setExpiryTo('');
    setStatus('all');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Advance Search" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <DatePicker label="Issued From" value={issuedFrom} onChange={setIssuedFrom} />
          <DatePicker label="Issued To" value={issuedTo} onChange={setIssuedTo} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DatePicker label="Expires From" value={expiryFrom} onChange={setExpiryFrom} />
          <DatePicker label="Expires To" value={expiryTo} onChange={setExpiryTo} />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-1.5">
            Status
          </label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2 text-sm border border-[#E5E7EB] rounded-lg bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="Valid">Valid</option>
              <option value="Suspended">Suspended</option>
              <option value="Expired">Expired</option>
              <option value="Withdrawn">Withdrawn</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Button variant="outline" fullWidth onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="solid" fullWidth onClick={handleApply}>
          Apply Filter
        </Button>
      </div>
    </Modal>
  );
}
