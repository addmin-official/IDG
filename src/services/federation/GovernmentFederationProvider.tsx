import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';

export type FederationModeType = 'SEPARATED' | 'FEDERATED' | 'UNIFIED';

export interface FederationFeatureFlags {
  enableJointOperations: boolean;
  enableSharedDatasets: boolean;
  enableCrossGovernmentApproval: boolean;
  enableUnifiedIdentity: boolean;
}

interface FederationContextData {
  federationMode: FederationModeType;
  setFederationMode: (mode: FederationModeType) => void;
  flags: FederationFeatureFlags;
  toggleFlag: (flag: keyof FederationFeatureFlags) => void;
}

const FederationContext = createContext<FederationContextData | undefined>(undefined);

export const GovernmentFederationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [federationMode, setFederationModeState] = useState<FederationModeType>(() => {
    return (localStorage.getItem('idg_federation_mode') as FederationModeType) || 'FEDERATED';
  });

  const { logAction } = useGovernment();

  const [flags, setFlags] = useState<FederationFeatureFlags>({
    enableJointOperations: true,
    enableSharedDatasets: true,
    enableCrossGovernmentApproval: true,
    enableUnifiedIdentity: false,
  });

  // Keep flags synchronized with mode changes
  const applyModeDefaults = (mode: FederationModeType) => {
    switch (mode) {
      case 'SEPARATED':
        setFlags({
          enableJointOperations: false,
          enableSharedDatasets: false,
          enableCrossGovernmentApproval: false,
          enableUnifiedIdentity: false,
        });
        break;
      case 'FEDERATED':
        setFlags({
          enableJointOperations: true,
          enableSharedDatasets: true,
          enableCrossGovernmentApproval: true,
          enableUnifiedIdentity: false,
        });
        break;
      case 'UNIFIED':
        setFlags({
          enableJointOperations: true,
          enableSharedDatasets: true,
          enableCrossGovernmentApproval: true,
          enableUnifiedIdentity: true,
        });
        break;
    }
  };

  const setFederationMode = (mode: FederationModeType) => {
    setFederationModeState(mode);
    localStorage.setItem('idg_federation_mode', mode);
    applyModeDefaults(mode);
    
    logAction(
      'Sovereign Architecture Controller',
      `Federation architecture paradigm transitioned to [${mode}]. System feature gates and compliance policies synchronized.`,
      'FEDERATED_CORE_TRANSITION_PROTOCOL_V1'
    );
  };

  useEffect(() => {
    applyModeDefaults(federationMode);
  }, [federationMode]);

  const toggleFlag = (flagName: keyof FederationFeatureFlags) => {
    setFlags(prev => {
      const updated = { ...prev, [flagName]: !prev[flagName] };
      logAction(
        'Sovereign System Controller',
        `Adjusted capability flag [${flagName}] to [${updated[flagName] ? 'ENABLED' : 'DISABLED'}].`,
        'FEDERATION_CAPABILITY_ADJUSTMENT'
      );
      return updated;
    });
  };

  return (
    <FederationContext.Provider value={{
      federationMode,
      setFederationMode,
      flags,
      toggleFlag,
    }}>
      {children}
    </FederationContext.Provider>
  );
};

export const useFederation = () => {
  const context = useContext(FederationContext);
  if (!context) {
    throw new Error('useFederation must be used within a GovernmentFederationProvider');
  }
  return context;
};
