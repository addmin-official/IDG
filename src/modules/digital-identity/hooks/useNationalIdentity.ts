import React, { useState, useEffect, useCallback } from 'react';
import { 
  NationalIdentityRegistry,
  VerifiableCredentialEngine,
  DigitalWalletManager,
  PublicKeyTrustPlatform,
  DigitalSignatureEngine,
  CitizenConsentRegistry,
  IdentityFederationBrokerManager,
  CitizenIdentity,
  BusinessIdentity,
  GovernmentEmployeeIdentity,
  ServicePrincipalIdentity,
  VerifiableCredential,
  NationalSovereignWallet,
  PKICertificate,
  SovereignDocument,
  ConsentAgreement,
  FederatedIdentityBroker
} from '../../../digital-identity';

export function useNationalIdentity() {
  const registry = NationalIdentityRegistry.getInstance();
  const vcEngine = VerifiableCredentialEngine.getInstance();
  const walletManager = DigitalWalletManager.getInstance();
  const trustPlatform = PublicKeyTrustPlatform.getInstance();
  const sigEngine = DigitalSignatureEngine.getInstance();
  const consentRegistry = CitizenConsentRegistry.getInstance();
  const federationManager = IdentityFederationBrokerManager.getInstance();

  // Dynamic Lists from engines
  const [citizens, setCitizens] = useState<CitizenIdentity[]>([]);
  const [businesses, setBusinesses] = useState<BusinessIdentity[]>([]);
  const [employees, setEmployees] = useState<GovernmentEmployeeIdentity[]>([]);
  const [principals, setPrincipals] = useState<ServicePrincipalIdentity[]>([]);
  const [credentials, setCredentials] = useState<VerifiableCredential[]>([]);
  const [wallets, setWallets] = useState<NationalSovereignWallet[]>([]);
  const [certs, setCerts] = useState<PKICertificate[]>([]);
  const [documents, setDocuments] = useState<SovereignDocument[]>([]);
  const [consents, setConsents] = useState<ConsentAgreement[]>([]);
  const [brokers, setBrokers] = useState<FederatedIdentityBroker[]>([]);

  // Simulation Form States
  const [pkiCheckSerial, setPkiCheckSerial] = useState('03:DF:00:11:AA:BB:CC:99');
  const [pkiValidationResult, setPkiValidationResult] = useState<{ isValid: boolean; chain: string[] } | null>(null);

  // Verifiable Credentials manual form state
  const [issueHolderDid, setIssueHolderDid] = useState('did:idg:citizen:iq-883190');
  const [issueType, setIssueType] = useState('SovereignCustomsImportPermit');
  const [issueClaimKey, setIssueClaimKey] = useState('importPermitCargoWeightTons');
  const [issueClaimValue, setIssueClaimValue] = useState('420.5');
  const [newVcNotice, setNewVcNotice] = useState<string | null>(null);

  // Document Multi-sig form state
  const [sigSelectedDocId, setSigSelectedDocId] = useState('doc-customs-99120');
  const [sigSignerRole, setSigSignerRole] = useState('did:idg:gov:customs-director-01');

  // Search
  const [registrySearch, setRegistrySearch] = useState('');

  const refreshAllStates = useCallback(() => {
    setCitizens(registry.getAllCitizens());
    setBusinesses(registry.getAllBusinesses());
    setEmployees(registry.getAllEmployees());
    setPrincipals(registry.getAllPrincipals());
    setCredentials(vcEngine.getAllCredentials());
    setWallets(walletManager.getAllWallets());
    setCerts(trustPlatform.getAllCertificates());
    setDocuments(sigEngine.getAllDocuments());
    setConsents(consentRegistry.getAllConsents());
    federationManager.simulatePingRefresh();
    setBrokers(federationManager.getBrokers());
    runPkiPathCheck('03:DF:00:11:AA:BB:CC:99');
  }, []);

  const runPkiPathCheck = useCallback((serial: string) => {
    setPkiCheckSerial(serial);
    const res = trustPlatform.validateTrustPath(serial);
    setPkiValidationResult(res);
  }, []);

  const handleIssueCredential = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const claims: Record<string, any> = {};
    claims[issueClaimKey] = issueClaimValue;
    claims['assignedDataStewardRole'] = 'Federal System Self-Issued Agent';

    const newVc = vcEngine.issueCredential(
      issueHolderDid, 
      'did:idg:authority:digital-cabinet',
      issueType,
      claims
    );

    const targetWallet = walletManager.getWallet(issueHolderDid);
    if (targetWallet) {
      targetWallet.associatedCredentials.push(newVc);
    }

    setNewVcNotice(`Successfully issued W3C Verifiable Credential: ${newVc.id}. Cryptographically stored in ${issueHolderDid}'s secured digital wallet.`);
    refreshAllStates();
    setTimeout(() => setNewVcNotice(null), 8500);
  }, [issueHolderDid, issueType, issueClaimKey, issueClaimValue, refreshAllStates]);

  const handleSignDocument = useCallback((docId: string, signerDid: string) => {
    let title = 'Customs Commissioner Inspector General';
    let certSerial = '03:DF:00:11:AA:BB:CC:99';
    let org = 'General Authority for Customs';

    if (signerDid.includes('citizen')) {
      title = 'Primary Registered Importer Agent';
      certSerial = '02:FA:11:92:BC:EF:44:88';
      org = 'Sindbad Logistics Operations';
    } else if (signerDid.includes('gov')) {
      title = 'Ministerial Oversight Director';
      certSerial = '01:AB:88:21:CD:AA:99:11';
      org = 'Ministry of Finance';
    }

    sigEngine.signDocument(docId, signerDid, title, org, certSerial);
    refreshAllStates();
  }, [refreshAllStates]);

  const handleRevokeConsent = useCallback((consentId: string) => {
    consentRegistry.revokeConsent(consentId);
    refreshAllStates();
  }, [refreshAllStates]);

  const handleRevokeCredential = useCallback((vcId: string) => {
    vcEngine.revokeCredential(vcId, 'Data Stewardship flagged regulatory compliance deviance');
    refreshAllStates();
  }, [refreshAllStates]);

  // Compute trust score
  const computeTrustReadinessScore = useCallback(() => {
    let score = 92.5;
    const revokedCount = certs.filter(c => c.isRevoked).length;
    score -= revokedCount * 1.5;
    score += credentials.length * 0.4;
    const sealsCompleted = documents.filter(d => d.status === 'FULLY_SEALED').length;
    score += sealsCompleted * 1.2;
    return Math.min(100, Math.round(score * 10) / 10);
  }, [certs, credentials, documents]);

  useEffect(() => {
    refreshAllStates();
  }, [refreshAllStates]);

  return {
    citizens,
    businesses,
    employees,
    principals,
    credentials,
    wallets,
    certs,
    documents,
    consents,
    brokers,
    pkiCheckSerial,
    pkiValidationResult,
    issueHolderDid,
    setIssueHolderDid,
    issueType,
    setIssueType,
    issueClaimKey,
    setIssueClaimKey,
    issueClaimValue,
    setIssueClaimValue,
    newVcNotice,
    sigSelectedDocId,
    setSigSelectedDocId,
    sigSignerRole,
    setSigSignerRole,
    registrySearch,
    setRegistrySearch,
    refreshAllStates,
    runPkiPathCheck,
    handleIssueCredential,
    handleSignDocument,
    handleRevokeConsent,
    handleRevokeCredential,
    trustScore: computeTrustReadinessScore(),
    tokens: federationManager.getTokens()
  };
}
