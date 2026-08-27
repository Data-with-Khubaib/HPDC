'use client';
import { useState, useMemo } from 'react';
import { searchCertificates, paginateCertificates } from '@/lib/mock-data/certificates';

export function useCertificates() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [issuedFrom, setIssuedFrom] = useState('');
  const [issuedTo, setIssuedTo] = useState('');
  const [expiryFrom, setExpiryFrom] = useState('');
  const [expiryTo, setExpiryTo] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const filtered = useMemo(() => {
    return searchCertificates({
      query,
      status: statusFilter,
      type: typeFilter,
      issuedFrom,
      issuedTo,
      expiryFrom,
      expiryTo,
    });
  }, [query, statusFilter, typeFilter, issuedFrom, issuedTo, expiryFrom, expiryTo]);

  const paginated = useMemo(() => {
    return paginateCertificates(filtered, page, perPage);
  }, [filtered, page, perPage]);

  const resetFilters = () => {
    setQuery('');
    setStatusFilter('all');
    setTypeFilter('all');
    setIssuedFrom('');
    setIssuedTo('');
    setExpiryFrom('');
    setExpiryTo('');
    setPage(1);
  };

  const applyAdvancedFilters = ({ issuedFrom: iF, issuedTo: iT, expiryFrom: eF, expiryTo: eT, status: s }) => {
    if (iF !== undefined) setIssuedFrom(iF);
    if (iT !== undefined) setIssuedTo(iT);
    if (eF !== undefined) setExpiryFrom(eF);
    if (eT !== undefined) setExpiryTo(eT);
    if (s !== undefined) setStatusFilter(s);
    setPage(1);
  };

  return {
    certificates: paginated.data,
    pagination: paginated,
    query, setQuery,
    statusFilter, setStatusFilter,
    typeFilter, setTypeFilter,
    issuedFrom, setIssuedFrom,
    issuedTo, setIssuedTo,
    expiryFrom, setExpiryFrom,
    expiryTo, setExpiryTo,
    page, setPage,
    perPage, setPerPage,
    resetFilters,
    applyAdvancedFilters,
  };
}
