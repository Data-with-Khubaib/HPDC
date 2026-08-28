'use client';
import { createContext, useContext, useState } from 'react';

const WizardContext = createContext(null);

const initialFormData = {
  legalNameEn: '',
  legalNameAr: '',
  crNumber: '',
  vatYear: '',
  orgType: '',
  sector: '',
  headOfficeEn: '',
  headOfficeAr: '',
  website: '',
  websiteAr: '',
  contactInfo: '',
  crDocument: null,
  vatDocument: null,
  mroDocument: null,
  moaDocument: null,
  certAreasEn: '',
  certScopeAr: '',
  multisite: '',
  totalEmployees: '',
  permanentEmployees: '',
  contractEmployees: '',
  numberOfSites: '',
  shiftOperations: '',
  remoteWork: '',
  brands: [{ name: '', productsEn: '', productsAr: '', criticalProcesses: '', outsourcedProcesses: '' }],
  iso9001: '',
  iso14001: '',
  iso45001: '',
  iso22000: '',
  iso50001: '',
  otherCerts: '',
  esgProgram: '',
  esgGovernance: '',
  sustainabilityStrategy: '',
  ghgMonitoring: '',
  energyManagement: '',
  socialResponsibility: '',
  esgCompliance: '',
  additionalNotes: '',
  supportingDocs: null,

  survey: {},

  agreedToTerms: false,
};

export function WizardProvider({ children }) {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateSurvey = (questionId, value) => {
    setFormData((prev) => ({
      ...prev,
      survey: { ...prev.survey, [questionId]: value },
    }));
  };

  const clearForm = () => {
    setFormData(initialFormData);
  };

  return (
    <WizardContext.Provider
      value={{
        formData,
        setFormData,
        updateField,
        updateSurvey,
        clearForm,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}
