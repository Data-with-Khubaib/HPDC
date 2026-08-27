'use client';
import { usePathname } from 'next/navigation';
import Layout from '@/components/layout/Layout';

const titleMap = {
  '/company/dashboard': 'Dashboard',
  '/company/applications': 'All Applications',
  '/company/certificates': 'My Certificates',
  '/company/apply': 'Apply for Certification',
};

function getTitle(pathname) {
  if (pathname.startsWith('/company/apply')) return 'Apply for Certification';
  if (pathname.startsWith('/company/applications/')) return 'Application Details';
  return titleMap[pathname] || 'Dashboard';
}

export default function CompanyLayout({ children }) {
  const pathname = usePathname();
  const title = getTitle(pathname);

  return <Layout title={title}>{children}</Layout>;
}
