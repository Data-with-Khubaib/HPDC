'use client';
import { useState, useMemo } from 'react';
import { applications, searchApplications, getRecentApplications } from '@/lib/mock-data/applications';

export function useApplications() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = useMemo(() => {
    return searchApplications(query, statusFilter);
  }, [query, statusFilter]);

  const recent = useMemo(() => {
    if (query) {
      const searched = searchApplications(query, 'all');
      return searched.slice(0, 5);
    }
    return getRecentApplications(5);
  }, [query]);

  return {
    applications: filtered,
    recentApplications: recent,
    allApplications: applications,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
  };
}
