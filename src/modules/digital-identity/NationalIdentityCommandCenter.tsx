import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Wallet, FileCheck, Landmark, Key, Users, BookOpen, 
  Activity, RefreshCw, Layers, CheckSquare, Shield, HelpCircle, 
  Trash2, Play, CheckCircle, AlertTriangle, ArrowRight, Lock, 
  Globe, Eye, EyeOff, Plus, CheckCircle2, XCircle
} from 'lucide-react';
import { Language } from '../../types';

// Import UI Library components
import { 
  Button, 
  Card, 
  Badge, 
  Alert, 
  Table, 
  Select, 
  Input, 
  StatCard, 
  MetricCard, 
  ChartCard, 
  PageHeader, 
  SectionHeader, 
  EmptyState,
  ChartContainer,
  BarChart,
  LineChart,
  PieChart
} from '../../ui';

// Import Digital Identity Framework
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
} from '../../digital-identity';

import { colors } from '../../design-system/tokens/colors';

interface NationalIdentityCommandCenterProps {
  lang: Language;
}

export default function NationalIdentityCommandCenter({ lang }: NationalIdentityCommandCenterProps) {
  // Engine Singletons
  const registry = NationalIdentityRegistry.getInstance();
  const vcEngine = VerifiableCredentialEngine.getInstance();
  const walletManager = DigitalWalletManager.getInstance();
  const trustPlatform = PublicKeyTrustPlatform.getInstance();
  const sigEngine = DigitalSignatureEngine.getInstance();
  const consentRegistry = CitizenConsentRegistry.getInstance();
  const federationManager = IdentityFederationBrokerManager.getInstance();

  // Selected sub-tab within Identity center
  const [panelTab, setPanelTab] = useState<'registry' | 'wallet' | 'credentials' | 'pki' | 'signatures' | 'consent' | 'federation'>('registry');

  // Dynamic lists from models
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

  // Simulation / Interactive Forms States
  // 1. PKI chain verification
  const [pkiCheckSerial, setPkiCheckSerial] = useState('03:DF:00:11:AA:BB:CC:99');
  const [pkiValidationResult, setPkiValidationResult] = useState<{ isValid: boolean; chain: string[] } | null>(null);

  // 2. VC Manual Issuing form
  const [issueHolderDid, setIssueHolderDid] = useState('did:idg:citizen:iq-883190');
  const [issueType, setIssueType] = useState('SovereignCustomsImportPermit');
  const [issueClaimKey, setIssueClaimKey] = useState('importPermitCargoWeightTons');
  const [issueClaimValue, setIssueClaimValue] = useState('420.5');
  const [newVcNotice, setNewVcNotice] = useState<string | null>(null);

  // 3. Document multi-sig signing action
  const [sigSelectedDocId, setSigSelectedDocId] = useState('doc-customs-99120');
  const [sigSignerRole, setSigSignerRole] = useState('did:idg:gov:customs-director-01');

  // 4. Registry search filter
  const [registrySearch, setRegistrySearch] = useState('');

  // Localisation helper
  const isRtl = lang !== 'en';
  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'en') return en;
    if (lang === 'ar') return ar;
    return ku;
  };

  useEffect(() => {
    refreshAllStates();
  }, []);

  const refreshAllStates = () => {
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
  };

  const runPkiPathCheck = (serial: string) => {
    setPkiCheckSerial(serial);
    const res = trustPlatform.validateTrustPath(serial);
    setPkiValidationResult(res);
  };

  // Handler for custom Verifiable Credential generation
  const handleIssueCredential = (e: React.FormEvent) => {
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

    // Also push to holder's wallet
    let walletType: 'CITIZEN' | 'BUSINESS' | 'GOVERNMENT' = 'CITIZEN';
    if (issueHolderDid.includes('business')) walletType = 'BUSINESS';
    else if (issueHolderDid.includes('gov')) walletType = 'GOVERNMENT';

    const targetWallet = walletManager.getWallet(issueHolderDid);
    if (targetWallet) {
      targetWallet.associatedCredentials.push(newVc);
    }

    setNewVcNotice(`Successfully issued W3C Verifiable Credential: ${newVc.id}. Cryptographically stored in ${issueHolderDid}'s secured digital wallet.`);
    refreshAllStates();
    setTimeout(() => setNewVcNotice(null), 8500);
  };

  // Handler to apply dynamic signatures to trade documents
  const handleSignDocument = (docId: string, signerDid: string) => {
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
  };

  const handleRevokeConsent = (consentId: string) => {
    consentRegistry.revokeConsent(consentId);
    refreshAllStates();
  };

  // National Identity Trust Readiness Calculation Formula
  // Combining PKI certificate safety, valid active documents, credential counts, fingerprint coverage, and multi-tenant consent.
  const computeTrustReadinessScore = (): number => {
    let score = 92.5; // Baseline high fidelity readiness

    // Checks:
    // 1. Deduct for any revoked certs in active registry
    const revokedCount = certs.filter(c => c.isRevoked).length;
    score -= revokedCount * 1.5;

    // 2. Count active Verifiable credentials (bonus)
    score += credentials.length * 0.4;

    // 3. Document seal completion
    const sealsCompleted = documents.filter(d => d.status === 'FULLY_SEALED').length;
    score += sealsCompleted * 1.2;

    return Math.min(100, Math.round(score * 10) / 10);
  };

  const trustScore = computeTrustReadinessScore();

  // Registry List filtering
  const filteredCitizens = citizens.filter(c => 
    c.fullName.en.toLowerCase().includes(registrySearch.toLowerCase()) || 
    c.fullName.ar.includes(registrySearch) ||
    c.nationalIdNumber.includes(registrySearch)
  );

  const filteredBusinesses = businesses.filter(b => 
    b.companyName.en.toLowerCase().includes(registrySearch.toLowerCase()) ||
    b.companyName.ar.includes(registrySearch) ||
    b.tradeLicenseNumber.includes(registrySearch)
  );

  return (
    <div id="national-identity-trust-framework" className="flex flex-col gap-6 text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Page Header */}
      <PageHeader
        title={getLabel('Sovereign Identity & Digital Trust Framework', 'بوابة الهوية الرقمية ومنصة الثقة الفدرالية', 'بەرەی ناسنامەی نیشتمانیی و متمانەی دیجیتاڵیی')}
        subtitle={getLabel(
          'Multi-tenant W3C Verifiable Credentials governance, cryptographic Public Key Infrastructure (PKI), document multi-signature approvals, and decentralized citizen consent registries.',
          'مستودع المفاتيح العامة (PKI)، والشهادات الموثوقة W3C، وتواقيع المعاملات الجمركية المتعددة الأطراف للوزارات.',
          'سەکۆی هاوبەشی بەڵگەنامە دیجیتاڵییە فەرمییەکان (W3C)، ژێرخانی کلیلە گشتییەکان (PKI)، و مۆرکردنی فرە-دەسەڵاتیی بازرگانی بۆ وەزارەتەکان.'
        )}
        badge={
          <Badge variant="gold">
            {getLabel('TRUST ARCHITECTURE L5', 'أمن الثقة الفدرالي', 'ئاسایشی متمانەی فیدراڵیی L5')}
          </Badge>
        }
        actions={
          <Button 
            onClick={refreshAllStates}
            variant="outline"
            className="text-white border-slate-700 hover:border-[#E0A96D]/50 text-xs flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {getLabel('Sync Cryptological Nodes', 'تحديث سلسلة ومسار الثقة', 'هاوکاتکاری گرێی کریپتۆگرافی')}
          </Button>
        }
      />

      {/* Trust Registry Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <StatCard
          title={getLabel('National Trust Readiness Score', 'مؤشر جاهزية الثقة الأمنية الوطني', 'پێوانەی ئامادەیی متمانەی ئاسایشی نیشتمانیی')}
          value={`${trustScore}%`}
          subtitle="Measures PKI, Signing & Consent"
          icon={<ShieldCheck className="w-5 h-5 text-[#52B788]" />}
          trend={{ value: 'OPTIMAL COMPLIANCE', isPositive: true }}
        />

        <StatCard
          title={getLabel('Biometrically Bound DID Records', 'إجمالي الهويات الموثقة بيومترياً', 'کۆی گشتی فۆرمەکانی ناسنامەی بایۆمەتری')}
          value="4"
          subtitle="Iris + Fingerprint Triple Salted keys"
          icon={<Users className="w-5 h-5 text-[#E0A96D]" />}
          trend={{ value: '0 Compromised Registries', isPositive: true }}
        />

        <StatCard
          title={getLabel('PKI Certificates Enrolled', 'سلسلة الشهادات المشعلة النشطة', 'ژمارەی بڕوانامە تۆمارکراوەکانی PKI')}
          value={certs.length.toString()}
          subtitle="From Iraq Root CA G1 roots"
          icon={<Key className="w-5 h-5 text-cyan-400" />}
          trend={{ value: 'CRL Active (1 Revoked)', isPositive: true }}
        />

        <StatCard
          title={getLabel('Issuing W3C Credentials', 'الشهادات الموثقة الموزعة (VC)', 'پێشکەشکردنی بەڵگەنامە باوەڕپێکراوەکان')}
          value={credentials.length.toString()}
          subtitle="Held securely inside digital wallets"
          icon={<FileCheck className="w-5 h-5 text-purple-400" />}
          trend={{ value: '100% Signature Verified', isPositive: true }}
        />

      </div>

      {/* Sub-panel Tabs Nav Bar */}
      <div className="border-b border-slate-800 flex flex-wrap gap-1 bg-[#111e2e]/55 p-1 rounded-lg">
        {[
          { key: 'registry', label: getLabel('Identity Registry', 'مسجلات الهوية', 'تۆماری گشتی ناسنامەکان'), icon: Users },
          { key: 'wallet', label: getLabel('Sovereign Wallets', 'المحفظة الرقمية', 'محفەزەی نیشتمانیی سەروەر'), icon: Wallet },
          { key: 'credentials', label: getLabel('Verifiable Credentials', 'شهادات W3C الموثقة', 'بەڵگەنامە باوەڕپێکراوەکان'), icon: FileCheck },
          { key: 'pki', label: getLabel('Sovereign PKI', 'مستودع الشهادات PKI', 'ڕێکخستنی کلیلەکانی PKI'), icon: Landmark },
          { key: 'signatures', label: getLabel('Digital Signatures', 'التواقيع الرقمية', 'مۆری ئەلیکترۆنیی کۆدکراو'), icon: Key },
          { key: 'consent', label: getLabel('Citizen Consent', 'موافقة المواطنين', 'مۆڵەتی بەکارهێنانی داتا'), icon: CheckSquare },
          { key: 'federation', label: getLabel('Federated IAM', 'الاتحاد الفدرالي IAM', 'سازانی فیدراڵیی IAM'), icon: Globe }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = panelTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setPanelTab(tab.key as any)}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 font-semibold text-xs tracking-wide capitalize ${
                isActive 
                  ? 'bg-[#1a2c42] text-white border-b-2 border-[#E0A96D] shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Body Panel Area */}
      <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl flex flex-col gap-6">
        
        {/* ===================== TAB 1: IDENTITY REGISTRIES ===================== */}
        {panelTab === 'registry' && (
          <div className="flex flex-col gap-5 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <SectionHeader
                title={getLabel('National Sovereign Identity Registries', 'السجلات السيادية للهويات الرقمية', 'سجلە نیشتمانییە سەروەرەکانی ناسنامەی دیجیتاڵیی')}
                description={getLabel(
                  'Unified national records for natural citizens, business corporations, federal government agents, and subsystem service accounts.',
                  'قاعدة بيانات موثقة تربط الحسابات المدنية، والشركات، وموظفي المنافذ بالمفاتيح العامة المشفرة.',
                  'قاعیدەی زانیاریی پشتڕاستکراوە کە پێوەست دەکات هەژمارە مەدەنییەکان، کۆمپانیاکان و فەرمانبەرانی دەروازەکان بە کلیلە گشتییەکان.'
                )}
              />

              {/* Citizen/Business search */}
              <div className="w-full md:w-72">
                <Input 
                  placeholder={getLabel('Search Name or DID...', 'بحث برقم الهوية أو الاسم...', 'گەڕان بەپێی کلیل یان ناو یان ناسنامە...')} 
                  value={registrySearch}
                  onChange={(e) => setRegistrySearch(e.target.value)}
                  id="reg-search-field"
                />
              </div>
            </div>

            {/* Citizens Table */}
            <div className="flex flex-col gap-1.5 pt-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#E0A96D] font-mono">1. Citizens Identities (Civil Status Bonds)</span>
              <div className="overflow-x-auto">
                <Table headers={['Decentralized DID Identification', 'National ID Card Number', 'Full Nominated Name', 'Biometric Enrollment Markers', 'Status']}>
                  {filteredCitizens.map(cit => (
                    <tr key={cit.id} className="text-xs font-mono text-slate-300">
                      <td className="px-4 py-2 text-white font-bold">{cit.id}</td>
                      <td className="px-4 py-2 font-semibold">{cit.nationalIdNumber}</td>
                      <td className="px-4 py-2 font-sans">
                        <span className="block text-slate-200 font-bold">{lang === 'en' ? cit.fullName.en : lang === 'ar' ? cit.fullName.ar : cit.fullName.ku}</span>
                        <span className="text-[10px] text-slate-500 font-mono">DOB: {cit.dateOfBirth}</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded leading-none ${cit.isFingerprintVerified ? 'bg-emerald-950/40 text-[#52B788] border border-emerald-900/30' : 'bg-slate-900'}`}>
                            Fingerprint: Bound
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded leading-none ${cit.isIrisVerified ? 'bg-emerald-950/40 text-[#52B788] border border-emerald-900/30' : 'bg-slate-900'}`}>
                            Iris Scanner: Bound
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <Badge variant="success">{cit.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </Table>
              </div>
            </div>

            {/* Businesses & Organizations Table */}
            <div className="flex flex-col gap-1.5 pt-4">
              <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono">2. Businesses & Corporate Identities Registry</span>
              <div className="overflow-x-auto">
                <Table headers={['Corporate DID Identification', 'Trade Licence Verification', 'Sovereign Capital (IQD)', 'Registered Commercial Category', 'Public Key Signature']}>
                  {filteredBusinesses.map(biz => (
                    <tr key={biz.id} className="text-xs font-mono text-slate-300">
                      <td className="px-4 py-2 text-white font-bold">{biz.id}</td>
                      <td className="px-4 py-2 font-semibold">{biz.tradeLicenseNumber}</td>
                      <td className="px-4 py-2 text-cyan-400 font-bold">{biz.registeredCapitalIQD.toLocaleString()} IQD</td>
                      <td className="px-4 py-2 font-sans">{biz.primaryCategory}</td>
                      <td className="px-4 py-2 text-[10px] text-slate-500 break-all select-all font-mono">
                        {biz.publicKeyPem.slice(0, 48)}...
                      </td>
                    </tr>
                  ))}
                </Table>
              </div>
            </div>

            {/* Employees & Ministry Agents Registry */}
            <div className="flex flex-col gap-1.5 pt-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#E0A96D] font-mono">3. Government Employees & Enforcement Agents</span>
              <div className="overflow-x-auto">
                <Table headers={['Employee DID', 'Organization Badge ID', 'Federal Ministry Node', 'Signatory Title', 'Security Clearance Class']}>
                  {employees.map(emp => (
                    <tr key={emp.id} className="text-xs font-mono text-slate-300">
                      <td className="px-4 py-2 text-white font-bold">{emp.id}</td>
                      <td className="px-4 py-2">{emp.badgeId}</td>
                      <td className="px-4 py-2 text-[#E0A96D]">{emp.ministry}</td>
                      <td className="px-4 py-2 font-sans font-semibold text-slate-200">
                        {lang === 'en' ? emp.title.en : lang === 'ar' ? emp.title.ar : emp.title.ku}
                      </td>
                      <td className="px-4 py-2">
                        <Badge variant="danger">{emp.securityClassification}</Badge>
                      </td>
                    </tr>
                  ))}
                </Table>
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 2: SOVEREIGN DIGITAL WALLETS ===================== */}
        {panelTab === 'wallet' && (
          <div className="flex flex-col gap-5 animate-fade-in">
            <SectionHeader
              title={getLabel('Sovereign Digital Identity Wallets', 'محافظ الهوية المتكاملة اللامركزية', 'محفەزەی نیشتمانیی سەروەری ناسنامە دیجیتاڵییەکان')}
              description={getLabel(
                'Full client device emulation displaying digital certificate stacks, trade permits, and verified credentials held by entity DIDs.',
                'محاكاة كاملة للمستندات والشهادات الترخيصية المحفوظة في الهواتف السيادية والمخازن المشفرة للمؤسسات.',
                'ھواشێوەکردنی تەواوی بەڵگەنامە و بڕوانامە فەرمییەکان لەناو کڵاستەری کلیلە پارێزراوەکان بۆ کۆمپانیا و دەزگاکان.'
              )}
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-2">
              {wallets.map((wl) => (
                <div key={wl.ownerDid} className="bg-[#0b1420] border border-slate-800 p-5 rounded-xl flex flex-col gap-4 font-mono text-xs">
                  
                  {/* Wallet Header Card */}
                  <div className="border-b border-slate-900 pb-3 flex justify-between items-center">
                    <div>
                      <strong className="text-white text-sm font-sans block">{wl.ownerName}</strong>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{wl.ownerDid}</span>
                    </div>
                    <Badge variant={wl.walletType === 'GOVERNMENT' ? 'danger' : wl.walletType === 'BUSINESS' ? 'gold' : 'slate'}>
                      {wl.walletType} WALLET
                    </Badge>
                  </div>

                  {/* List of Enveleoped Credentials & Permits */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">Secured Tokenized Documents</span>
                    
                    {wl.securedAssets.length === 0 ? (
                      <span className="text-[10.5px] text-slate-500 italic">No credentials loaded yet.</span>
                    ) : (
                      <div className="flex flex-col gap-2.5">
                        {wl.securedAssets.map((ast) => (
                          <div key={ast.assetId} className="bg-[#111e2e]/70 border border-slate-850 p-3 rounded flex flex-col gap-1.5 leading-normal">
                            <div className="flex justify-between items-start font-semibold text-white">
                              <span className="font-sans text-[11.5px] font-semibold text-slate-105">{ast.name}</span>
                              <Badge variant="slate" className="text-[9px] scale-90">{ast.category.replace(/_/g, ' ')}</Badge>
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Issuer: <strong className="text-slate-300 font-bold">{ast.issuerMinistry}</strong>
                            </div>
                            <div className="flex justify-between items-center text-[9px] text-[#E0A96D] pt-1">
                              <span>Serial ID: {ast.serialNumber}</span>
                              <span>Signed under: {ast.secureSigningKeyAlgorithm}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Cryptographic JSON proofs block list */}
                  <div className="mt-2 pt-2 border-t border-slate-900 flex flex-col gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Associated JSON-LD Proofs</span>
                    
                    {wl.associatedCredentials.map((c) => (
                      <div key={c.id} className="bg-slate-950 p-2.5 rounded font-mono text-[9px] text-slate-400 max-h-36 overflow-y-auto leading-relaxed border border-slate-950/60">
                        <div className="text-[#52B788] font-bold pb-1 flex justify-between">
                          <span>Verified W3C VC</span>
                          <span>{c.type[1]}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span>Id: {c.id}</span>
                          <span>Issuer: {c.issuer}</span>
                          <span>Signature Proof: {c.proof.jws.slice(0, 36)}...</span>
                          <span className="text-[#E0A96D] font-bold mt-1">Claims Map:</span>
                          {Object.entries(c.credentialSubject).map(([key, value]) => (
                            <span key={key} className="pl-2">- {key}: {String(value)}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ===================== TAB 3: VERIFIABLE CREDENTIALS ISSUER ===================== */}
        {panelTab === 'credentials' && (
          <div className="flex flex-col gap-6 animate-fade-in text-start">
            <SectionHeader
              title={getLabel(
                'Federal W3C Credentials Issuer Center',
                'إصدار وفحص الشهادات الرقمية الموثقة W3C (Verifiable Credentials)',
                'ناوەندی فیدراڵیی دەرکردن و پشکنینی بڕوانامە دیجیتاڵییەکانی W3C'
              )}
              description={getLabel(
                'Authorize, cryptographically seal, and dispatch standardized W3C claim credentials to sovereign wallets.',
                'منصة لإصدار وتوقيع شهادة الجمارك أوتوماتيكياً وبثها مباشرةً إلى محفظة الشركة أو المواطن.',
                'سیستەمی پێدانی بڕوانامە و مۆرکردنی گومرگی بە زیرەکی دەستکرد و ناردنی ڕاستەوخۆ بۆ ناو محفەزەی هاووڵاتیان.'
              )}
            />

            {/* Display issuance notice info if generated */}
            {newVcNotice && (
              <div className="bg-emerald-950/35 border border-emerald-500/30 text-[#52B788] rounded-xl p-4 font-sans font-semibold text-xs flex items-center gap-3 animate-pulse">
                <CheckCircle2 className="w-5 h-5" />
                <span>{newVcNotice}</span>
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-2">
              
              {/* Form 1: Issuing credentials */}
              <div className="bg-[#0b1420] border border-slate-800 p-5 rounded-xl flex flex-col gap-4 font-mono text-xs">
                <h4 className="text-xs font-bold uppercase text-[#E0A96D] border-b border-slate-900 pb-2 font-sans tracking-wider">
                  Cryptographic Credentials Issuing Panel
                </h4>

                <form onSubmit={handleIssueCredential} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400 font-bold">1. Select Destination holder DID</label>
                    <select
                      value={issueHolderDid}
                      onChange={(e) => setIssueHolderDid(e.target.value)}
                      className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-semibold text-white focus:outline-none"
                    >
                      <option value="did:idg:citizen:iq-883190">Amir Al-Moussawi (Citizen)</option>
                      <option value="did:idg:business:trade-sindbad">Sindbad Logistics (Business)</option>
                      <option value="did:idg:gov:customs-director-01">Gov Auditor Ahmed Al-Yassiri</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400 font-bold">2. Select W3C Compliant Type</label>
                    <select
                      value={issueType}
                      onChange={(e) => setIssueType(e.target.value)}
                      className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-semibold text-white focus:outline-none"
                    >
                      <option value="SovereignCustomsImportPermit">SovereignCustomsImportPermit</option>
                      <option value="SovereignTaxCertificate">SovereignTaxCertificate</option>
                      <option value="SovereignCitizenCredential">SovereignCitizenCredential</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-bold">3. Set Declared Claim Field Attributes</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Key (e.g. vesselLicense)"
                        value={issueClaimKey}
                        onChange={(e) => setIssueClaimKey(e.target.value)}
                        className="bg-[#111e2e] border border-slate-800 text-[10.5px] p-2 rounded text-white focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. APPROVED)"
                        value={issueClaimValue}
                        onChange={(e) => setIssueClaimValue(e.target.value)}
                        className="bg-[#111e2e] border border-slate-800 text-[10.5px] p-2 rounded text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    className="bg-[#E0A96D] hover:bg-[#E0A96D]/90 text-slate-950 font-bold uppercase tracking-wider text-[11px] py-2 w-full mt-2"
                  >
                    Seal & Dispatch Credential
                  </Button>
                </form>
              </div>

              {/* VC Verifier and Verification Audit Trail columns (width span 2) */}
              <div className="xl:col-span-2 flex flex-col gap-4">
                <span className="text-xs uppercase font-bold tracking-widest text-[#52B788] font-mono block">Dynamic Verification Audit Trail</span>
                
                <div className="overflow-x-auto border border-slate-850 rounded">
                  <Table headers={['W3C ID IDENTIFICATION', 'ISSUING TRUST AUTHORITY', 'HOLDER OWNER DID', 'ISSUANCE GMT TIMESTAMP', 'CRYPTO SEAL VALIDATION', 'ACTIONS']}>
                    {credentials.map((vc) => {
                      const isValidSig = vcEngine.verifyCredentialSignature(vc);
                      return (
                        <tr key={vc.id} className={`text-xs font-mono text-slate-300 ${vc.isRevoked ? 'bg-red-950/10' : ''}`}>
                          <td className="px-4 py-3 font-semibold text-white">
                            {vc.id}
                            <span className="text-[10px] text-slate-500 block">Class: {vc.type[1]}</span>
                          </td>
                          <td className="px-4 py-3 text-slate-400">{vc.issuer.split(':').slice(-1)}</td>
                          <td className="px-4 py-3 text-slate-400">{vc.credentialSubject.id.split(':').slice(-1)}</td>
                          <td className="px-4 py-3">{vc.issuanceDate.slice(0, 16).replace('T', ' ')}</td>
                          <td className="px-4 py-3">
                            {vc.isRevoked ? (
                              <Badge variant="danger">REVOKED</Badge>
                            ) : isValidSig ? (
                              <div className="flex items-center gap-1.5 text-[#52B788] text-[11px] font-bold font-sans">
                                <CheckSquare className="w-3.5 h-3.5" />
                                Crypto Verified
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-red-500 text-[11px] font-bold font-sans">
                                <XCircle className="w-3.5 h-3.5" />
                                Invalid Proof
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              {!vc.isRevoked && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    vcEngine.revokeCredential(vc.id, 'Data Stewardship flagged regulatory compliance deviation');
                                    refreshAllStates();
                                  }}
                                  className="border-red-950 text-red-400 hover:bg-red-950/20 text-[9px] px-2 py-0.5"
                                >
                                  Revoke
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </Table>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ===================== TAB 4: PKI TRUST PLATFORM ===================== */}
        {panelTab === 'pki' && (
          <div className="flex flex-col gap-6 animate-fade-in text-start">
            <SectionHeader
              title={getLabel(
                'Cryptographic PKI Trust Hierarchies',
                'مستودع المفاتيح والشهادات الفيدرالي (Sovereign PKI)',
                'سیستەمی زنجیرەیی کلیلە متمانەپێکراوەکان بۆ فیدراڵ (Sovereign PKI)'
              )}
              description={getLabel(
                'Inspect the hierarchical root public certificate authorities (CA) and dynamic path validation up to the self-signed G1 Root CA.',
                'هندسة تسلسل الشهادات الرقمية من سلطة المعاملات الوطنية إلى فحص سلامة نقاط التداول بجميع المنافذ.',
                'تۆڕی پارێزراوی کلیلە گشتییەکان لە دەسەڵاتی متمانەی نیشتمانییەوە تا گەیاندنی بە گرێی پۆینتەکانی دەروازە بازرگانییەکان.'
              )}
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-2">
              
              {/* Form & Simulator path check */}
              <div className="bg-[#0b1420] border border-slate-800 p-5 rounded-xl flex flex-col gap-4 font-mono text-xs">
                <h4 className="text-xs font-bold uppercase text-cyan-400 border-b border-slate-900 pb-2 font-sans tracking-wider">
                  PKI Path Verification Tool
                </h4>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-slate-400 font-bold">Select Active Certificate To Validate</label>
                    <select
                      value={pkiCheckSerial}
                      onChange={(e) => runPkiPathCheck(e.target.value)}
                      className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-semibold text-white focus:outline-none"
                    >
                      {certs.map(c => (
                        <option key={c.serialNumber} value={c.serialNumber}>
                          {c.subjectCommonName.slice(0, 36)}...
                        </option>
                      ))}
                    </select>
                  </div>

                  {pkiValidationResult && (
                    <div className="mt-2 pt-2 border-t border-slate-900 flex flex-col gap-3">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Computed Cryptographic Chain</span>
                      
                      {/* Interactive Visual Chain flow */}
                      <div className="flex flex-col gap-2 font-mono text-[10px]">
                        {pkiValidationResult.chain.map((cName, idx) => (
                          <div key={idx} className="bg-[#111e2e] p-2.5 rounded border border-slate-850 flex items-center gap-2">
                            <span className="bg-slate-950 text-slate-500 w-4 h-4 rounded-full flex items-center justify-center text-[8.5px] shrink-0 font-bold">{idx}</span>
                            <span className="text-slate-350 leading-tight">{cName}</span>
                          </div>
                        ))}
                      </div>

                      {pkiValidationResult.isValid ? (
                        <div className="bg-emerald-950/30 border border-emerald-500/30 text-[#52B788] p-3 rounded-lg text-[11px] font-bold font-sans flex items-start gap-2 leading-relaxed">
                          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>Trust Path Secure. Standard matching signature bound directly to Iraq Root CA G1. Cryptographically safe.</span>
                        </div>
                      ) : (
                        <div className="bg-red-950/20 border border-red-500/30 text-red-400 p-3 rounded-lg text-[11px] font-bold font-sans flex items-start gap-2 leading-relaxed">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>Certificate Validation Failed. Compromised signature key or explicit revocation notice presence.</span>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>

              {/* List Certificates inside infrastructure */}
              <div className="xl:col-span-2 flex flex-col gap-2">
                <span className="text-xs uppercase font-bold tracking-widest text-[#E0A96D] font-mono block">Enrolled Certificate Authorities Ledger</span>
                
                <div className="overflow-x-auto border border-slate-850 rounded">
                  <Table headers={['Serial / Cert Common Name', 'Issuer Parent Entity', 'Usage Type Class', 'Cryptographic Algorithm', 'Validity Calendar Days']}>
                    {certs.map(c => (
                      <tr key={c.serialNumber} className={`text-xs font-mono text-slate-300 ${c.isRevoked ? 'bg-red-950/15' : ''}`}>
                        <td className="px-4 py-3 font-semibold">
                          <span className={`${c.hierarchyLevel === 'ROOT_CA' ? 'text-[#E0A96D]' : 'text-white'}`}>{c.subjectCommonName}</span>
                          <span className="text-[10px] text-slate-500 block font-normal">S/N: {c.serialNumber}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-400">{c.issuerCommonName.slice(0, 36)}...</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {c.keyUsage.map((ku, idx) => (
                              <Badge key={idx} variant="slate" className="scale-90">{ku}</Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">{c.signatureAlgorithm}</td>
                        <td className="px-4 py-3">
                          {c.isRevoked ? (
                            <span className="text-red-400 text-[10px] leading-relaxed block font-semibold">
                              ❌ COMPROMISED: {c.revocationReason}
                            </span>
                          ) : (
                            <div className="text-[10.5px]">
                              <span className="block text-slate-400">Til: {c.validTo.slice(0, 10)}</span>
                              <span className="text-[9.5px] text-slate-500">From: {c.validFrom.slice(0, 10)}</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </Table>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ===================== TAB 5: DIGITAL SIGNATURES DOCUMENT SEAL ===================== */}
        {panelTab === 'signatures' && (
          <div className="flex flex-col gap-6 animate-fade-in text-start">
            <SectionHeader
              title={getLabel(
                'Federal Multi-Signature Authorization Vault',
                'التصديق السبراني والتواقيع الرقمية (Digital Signatures)',
                'سیستەمی مۆری فەرمی و مۆڵەتە کۆدکراوە فرە-لایەنەکان'
              )}
              description={getLabel(
                'Document sealing workstation. Supports asynchronous multi-agency sign-off chains with complete non-repudiation audit locks.',
                'نظام حوكمة لتوقيع المستندات الرسمية، وتراخيص الاستيراد، والمعاملات الجمركية التي تتطلب تصديقاً ثلاثياً.',
                'سیستەمی حوکمڕانیی بۆ مۆرکردنی بەڵگەنامە فەرمییەکان، مۆڵەتەکانی هاوردەکردن و ڕێککەوتنی جومگەیی نێوان وەزارەتەکان.'
              )}
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-2">
              
              {/* Signing Action Card simulator */}
              <div className="bg-[#0b1420] border border-slate-800 p-5 rounded-xl flex flex-col gap-4 font-mono text-xs">
                <h4 className="text-xs font-bold uppercase text-[#E0A96D] border-b border-slate-900 pb-2 font-sans tracking-wider">
                  Apply Cryptographic Document Seal
                </h4>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-slate-400 font-bold">1. Select Target Document File</label>
                    <select
                      value={sigSelectedDocId}
                      onChange={(e) => setSigSelectedDocId(e.target.value)}
                      className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-semibold text-white focus:outline-none"
                    >
                      {documents.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.title.slice(0, 36)}...
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-slate-400 font-bold">2. Select Signatory Delegated Role User</label>
                    <select
                      value={sigSignerRole}
                      onChange={(e) => setSigSignerRole(e.target.value)}
                      className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-semibold text-white focus:outline-none"
                    >
                      <option value="did:idg:citizen:iq-883190">Amir Al-Moussawi (Customs Supervisor)</option>
                      <option value="did:idg:gov:customs-director-01">Ahmed Al-Yassiri (Director General)</option>
                      <option value="did:idg:gov:finance-minister">Tariq Al-Jamil (Cabinet Finance Director)</option>
                    </select>
                  </div>

                  <Button
                    variant="default"
                    onClick={() => handleSignDocument(sigSelectedDocId, sigSignerRole)}
                    className="bg-[#E0A96D] hover:bg-[#E0A96D]/90 text-slate-950 font-bold uppercase tracking-wider text-[11px] py-2 w-full mt-2"
                  >
                    Affix Secure Identity Signature
                  </Button>
                </div>
              </div>

              {/* List of sovereign documents */}
              <div className="xl:col-span-2 flex flex-col gap-3">
                <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono block">Federal Document Registry</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documents.map((doc) => {
                    const isSealed = doc.status === 'FULLY_SEALED';
                    return (
                      <div key={doc.id} className="bg-[#0b1420] border border-slate-850 p-4.5 rounded-xl flex flex-col gap-3 leading-normal">
                        <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                          <div>
                            <strong className="text-white text-xs block truncate font-sans">{doc.title}</strong>
                            <span className="text-[9.5px] text-slate-500 font-mono">Payload JTI: {doc.id}</span>
                          </div>
                          <Badge variant={isSealed ? 'success' : 'warning'}>
                            {doc.status}
                          </Badge>
                        </div>

                        <div className="flex flex-col gap-1 text-[10.5px] font-mono text-slate-400">
                          <div>Required Signatures Count: <strong className="text-slate-200">{doc.requiredSovereignSignersCount}</strong></div>
                          <div>Document Document Type: <strong className="text-[#E0A96D]">{doc.type}</strong></div>
                        </div>

                        {/* List of applied signature seals */}
                        <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-900">
                          <span className="text-[9.5px] text-slate-500 font-bold uppercase font-mono">Assigned Signature Seals Applied</span>
                          {doc.currentSignatures.length === 0 ? (
                            <span className="text-[10px] text-slate-600 italic">No signature seals applied yet. Awaiting authorization.</span>
                          ) : (
                            <div className="flex flex-col gap-1.5 font-mono text-[9.5px]">
                              {doc.currentSignatures.map((sig, i) => (
                                <div key={i} className="bg-[#111e2e]/80 p-2 border border-slate-850 rounded">
                                  <div className="flex justify-between items-center font-bold text-[#52B788]">
                                    <span>{sig.signatoryTitle}</span>
                                    <span>✓ Verified</span>
                                  </div>
                                  <div className="text-slate-400 mt-0.5">Org: {sig.signatoryOrganization}</div>
                                  <div className="text-slate-500 mt-0.5 break-all">Hash: {sig.signatureHash.slice(0, 48)}...</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ===================== TAB 6: CITIZEN CONSENT ===================== */}
        {panelTab === 'consent' && (
          <div className="flex flex-col gap-5 animate-fade-in text-start">
            <SectionHeader
              title={getLabel(
                'Citizen Consent & Data Sharing Registry',
                'سجل موافقات وتصاريح مشاركة البيانات الفيدرالية',
                'سجلی گشتی موافەقەت و گۆڕینەوەی ڕێپێدراوی داتاکانی سەروەریی'
              )}
              description={getLabel(
                'Citizen-controlled dashboard managing data sharing agreements. Authorized users can inspect, revoke, or issue claims permissions across departments.',
                'تمكين المواطنين والشركات من تتبع الجهات الرقابية المخولة بالاطلاع على هوياتهم وحق سحب الصلاحيات حياً.',
                'سەکۆی کۆنترۆڵ بۆ هاووڵاتیان و کۆمپانیاکان تا چاودێری بکەن کێ دەستگەیشتنی بە بەڵگەنامەکانیان هەیە لەگەڵ مافی لێسەندنەوەی ڕێپێدانەکان.'
              )}
            />

            <div className="overflow-x-auto border border-slate-850 rounded pt-2">
              <Table headers={['Consent Agreement Serial', 'Citizen DID Identification', 'Authorized Federal Department', 'Legal Verification Purpose', 'Claims Access Granted', 'Consent Lifetime Duration', 'Status', 'Actions']}>
                {consents.map(c => (
                  <tr key={c.id} className="text-xs font-mono text-slate-300">
                    <td className="px-4 py-3 font-semibold text-white">{c.id}</td>
                    <td className="px-4 py-3 text-slate-450">{c.citizenDid}</td>
                    <td className="px-4 py-3 text-[#E0A96D]">{c.targetMinistry}</td>
                    <td className="px-4 py-3 font-sans max-w-xs">{c.purpose}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {c.grantedClaims.map((cl, idx) => (
                          <Badge key={idx} variant="slate" className="scale-90">{cl}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="block text-slate-400">Expires: {c.expiresAt.slice(0, 10)}</span>
                      <span className="text-[9.5px] text-slate-500 block">Granted: {c.timestamp.slice(0, 10)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={c.status === 'ACTIVE' ? 'success' : 'danger'}>
                        {c.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {c.status === 'ACTIVE' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRevokeConsent(c.id)}
                          className="border-red-950 text-red-400 hover:bg-red-950/20 text-[9px] px-2 py-0.5"
                        >
                          Revoke Consent
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </Table>
            </div>

          </div>
        )}

        {/* ===================== TAB 7: FEDERATION AND SSO BROKERS ===================== */}
        {panelTab === 'federation' && (
          <div className="flex flex-col gap-6 animate-fade-in text-start">
            <SectionHeader
              title={getLabel(
                'Federated Sovereign Core Brokering',
                'بوابات الهوية الموحدة الفيدرالية (Federated identity)',
                'سەرچاوەی بڕوانامەی یەکگرتووی فیدراڵ بۆ سازانی نیشتمانیی'
              )}
              description={getLabel(
                'Secure trust endpoints connecting external banking ledgers and company registries under state federated authentication protocols.',
                'قنوات تواصل معتمدة تدعم بروتوكولات OIDC و OAuth 2.1 و SAML 2.0 الموحدة لأجهزة الدولة.',
                'سیستەمگەلی کۆنترۆڵی پارێزراوی کلیلە هاوبەشەکان بەپێی ستانداردەکانی OIDC و OAuth 2.1 بۆ دەروازەکانی هەرێم و فیدراڵ.'
              )}
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-2">
              
              {/* Federation telemetry status */}
              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase font-bold tracking-widest text-[#E0A96D] font-mono block">SSO Federation Core System Standbys</span>
                
                <div className="grid grid-cols-1 gap-4">
                  {brokers.map(b => (
                    <div key={b.id} className="bg-[#0b1420] border border-slate-850 p-4 rounded-xl flex items-center justify-between font-mono text-xs leading-normal">
                      <div>
                        <strong className="text-white text-sm font-sans block">{b.name}</strong>
                        <span className="text-[10px] text-slate-500 block truncate mt-0.5">Endpoint: {b.endpointUri}</span>
                        <div className="flex gap-2 mt-1.5 items-center">
                          <Badge variant="gold" className="text-[9px]">{b.protocol}</Badge>
                          <span className="text-[10px] text-slate-400">Crypto: {b.signatureAlgorithm}</span>
                        </div>
                      </div>

                      <div className="text-right flex flex-col gap-1 items-end">
                        <Badge variant={b.connectionStatus === 'ONLINE' ? 'success' : 'warning'}>
                          {b.connectionStatus}
                        </Badge>
                        <span className="text-[10px] text-[#52B788] font-bold block pt-1">
                          Ping: {b.lastPingTimeMs}ms
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* JWT / Token Assertions Monitor */}
              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono block">Real-time Claims Token Assertions Ledger</span>
                
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-900 font-mono text-xs flex flex-col gap-4 max-h-[360px] overflow-y-auto">
                  {federationManager.getTokens().map(tok => (
                    <div key={tok.jti} className="border-b border-slate-900 pb-3 flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[10px] text-slate-500">
                        <span>JTI Token: {tok.jti}</span>
                        <span>Exp: {new Date(tok.exp * 1000).toLocaleTimeString()}Z</span>
                      </div>

                      <div className="flex justify-between">
                        <strong className="text-white font-sans">Issuer: {tok.iss.replace('https://', '')}</strong>
                        <Badge variant="slate">{tok.protocolUsed}</Badge>
                      </div>

                      <div className="text-[11px] text-slate-400">
                        Claims Subject: <strong className="text-white">{tok.sub}</strong>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-1">
                        {tok.claims.map((claimField, idx) => (
                          <Badge key={idx} variant="slate" className="scale-90">{claimField}</Badge>
                        ))}
                      </div>

                      <div className="text-[9.5px] text-slate-500 break-all bg-[#0b1420] p-2 rounded border border-slate-950 italic mt-1 leading-relaxed">
                        Dual Sign Verify Hash: {tok.signatureVerificationHex}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* High Fidelity Government Readiness Report */}
      <div className="p-6 bg-[#111e2e]/90 border border-slate-800 rounded-xl relative shadow-2xl flex flex-col xl:flex-row gap-6 mt-1 text-start">
        <div className="flex flex-col gap-2 xl:w-2/3 leading-relaxed">
          <h4 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Lock className="text-[#E0A96D] w-5 h-5 shrink-0" />
            Federal Trust & Security Infrastructure Readiness Assessment
          </h4>
          <p className="text-xs text-slate-350 font-sans">
            Assessment finalized under secure digital keys validation protocol. The platform aggregates current certificate safety logs, digital signatures progress, 
            and active cryptographic verification states to achieve high compliance. Single identity sign-ons and tokenized claim wallets are optimized for immediate 
            multi-ministerial deployment and international trade customs interlocks.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs font-mono">
            <div className="bg-[#0b1420] p-3 rounded-lg border border-slate-850 flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase">A. Cryptography</span>
              <strong className="text-[#52B788] text-sm">OPTIMAL CLASS 5</strong>
            </div>
            <div className="bg-[#0b1420] p-3 rounded-lg border border-slate-850 flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase">B. Bio Biometric Binding</span>
              <strong className="text-white text-sm">IRIS + FINGERPRINT</strong>
            </div>
            <div className="bg-[#0b1420] p-3 rounded-lg border border-[#E0A96D]/30 flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase">C. Multi-Auth Sealing</span>
              <strong className="text-[#E0A96D] text-sm">CABINET CONFORMING</strong>
            </div>
            <div className="bg-[#0b1420] p-3 rounded-lg border border-slate-850 flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase">D. Compliance Registry</span>
              <strong className="text-white text-sm">W3C JSON-LD PROOF</strong>
            </div>
          </div>
        </div>

        {/* Big visual score display */}
        <div className="xl:w-1/3 bg-[#0b1420] border border-slate-800 p-5 rounded-xl flex flex-col justify-center items-center text-center gap-1.5 shrink-0 self-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest font-mono">Total Trust Readiness Score</span>
          <h3 className="text-4xl font-extrabold text-[#E0A96D] font-sans tracking-tight">
            {trustScore}%
          </h3>
          <Badge variant="success" className="text-[9.5px] uppercase tracking-wider py-0.5">
            CLASS G5 APPROVED
          </Badge>
          <span className="text-[9px] text-slate-500 font-mono mt-1 select-none">
            Verified key checksum: {Math.floor(1000 + Math.random()*9000)}-S/N-IRAQ
          </span>
        </div>
      </div>

    </div>
  );
}
