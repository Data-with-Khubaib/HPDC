import { applications } from "./applications";

export const dashboardStats = [
  {
    id: 'total-applications',
    label: 'Total Applications',
    labelKey: 'totalApplications',
    value: applications.length,
    icon: 'ClipboardList',
    color: 'green',
  },
  {
    id: 'rejected-applications',
    label: 'Rejected Applications',
    labelKey: 'rejectedApplications',
    value: applications.filter(app => app.status === 'Rejected').length,
    icon: 'XCircle',
    color: 'red',
  },
  {
    id: 'active-certificates',
    label: 'Active Certificates',
    labelKey: 'activeCertificates',
    value: 17,
    icon: 'FileCheck',
    color: 'green',
  },
  {
    id: 'suspended-certificates',
    label: 'Suspended Certificates',
    labelKey: 'suspendedCertificates',
    value: 2,
    icon: 'FileWarning',
    color: 'amber',
  },
  {
    id: 'withdrawn-certificates',
    label: 'Withdrawn Certificates',
    labelKey: 'withdrawnCertificates',
    value: 1,
    icon: 'FileX',
    color: 'red',
  },
  {
    id: 'expired-certificates',
    label: 'Expired Certificates',
    labelKey: 'expiredCertificates',
    value: 1,
    icon: 'FileClock',
    color: 'red',
  },
];
