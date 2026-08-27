'use client';
import { WizardProvider } from '@/components/apply/WizardContext';

export default function ApplyLayout({ children }) {
  return <WizardProvider>{children}</WizardProvider>;
}
