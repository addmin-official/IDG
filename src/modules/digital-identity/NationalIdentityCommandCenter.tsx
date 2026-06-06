import React, { useState } from 'react';
import { 
  ShieldCheck, Wallet, FileCheck, Landmark, Key, Users, Globe, Lock, RefreshCw
} from 'lucide-react';
import { Language } from '../../types';

// Import UI Library components
import { 
  Button, 
  Badge, 
  StatCard, 
  PageHeader
} from '../../ui';

import { VerifiableCredentialEngine } from '../../digital-identity';

// Import local Refactored items
import { useNationalIdentity } from './hooks/useNationalIdentity';
import { t } from './localization/identityTranslations';
import { RegistryPanel } from './components/RegistryPanel';
import { WalletPanel } from './components/WalletPanel';
import { CredentialsPanel } from './components/CredentialsPanel';
import { PkiPanel } from './components/PkiPanel';
import { SignaturesPanel } from './components/SignaturesPanel';
import { ConsentPanel } from './components/ConsentPanel';
import { FederationPanel } from './components/FederationPanel';

interface NationalIdentityCommandCenterProps {
  lang: Language;
}

export default function NationalIdentityCommandCenter({ lang }: NationalIdentityCommandCenterProps) {
  const model = useNationalIdentity();

  // Selected sub-tab within Identity center
  const [panelTab, setPanelTab] = useState<'registry' | 'wallet' | 'credentials' | 'pki' | 'signatures' | 'consent' | 'federation'>('registry');

  const isRtl = lang !== 'en';
  const labelSync = t(lang, 'buttons.syncCryptological');

  return (
    <div id="national-identity-trust-framework" className="flex flex-col gap-6 text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Page Header */}
      <PageHeader
        title={t(lang, 'header.title')}
        subtitle={t(lang, 'header.subtitle')}
        badge={
          <Badge variant="gold">
            {t(lang, 'header.badge')}
          </Badge>
        }
        actions={
          <Button 
            onClick={model.refreshAllStates}
            variant="outline"
            className="text-white border-slate-700 hover:border-[#E0A96D]/50 text-xs flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {labelSync}
          </Button>
        }
      />

      {/* Trust Registry Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <StatCard
          title={t(lang, 'stats.trustScore.title')}
          value={`${model.identityViewModel.trustScore}%`}
          subtitle="Measures PKI, Signing & Consent"
          icon={<ShieldCheck className="w-5 h-5 text-[#52B788]" />}
          trend={{ value: 'OPTIMAL COMPLIANCE', isPositive: true }}
        />

        <StatCard
          title={t(lang, 'stats.biometric.title')}
          value="4"
          subtitle="Iris + Fingerprint Triple Salted keys"
          icon={<Users className="w-5 h-5 text-[#E0A96D]" />}
          trend={{ value: '0 Compromised Registries', isPositive: true }}
        />

        <StatCard
          title={t(lang, 'stats.pki.title')}
          value={model.identityViewModel.certs.length.toString()}
          subtitle="From Iraq Root CA G1 roots"
          icon={<Key className="w-5 h-5 text-cyan-400" />}
          trend={{ value: 'CRL Active (1 Revoked)', isPositive: true }}
        />

        <StatCard
          title={t(lang, 'stats.w3c.title')}
          value={model.identityViewModel.credentials.length.toString()}
          subtitle="Held securely inside digital wallets"
          icon={<FileCheck className="w-5 h-5 text-purple-400" />}
          trend={{ value: '100% Signature Verified', isPositive: true }}
        />

      </div>

      {/* Sub-panel Tabs Nav Bar */}
      <div className="border-b border-slate-800 flex flex-wrap gap-1 bg-[#111e2e]/55 p-1 rounded-lg">
        {[
          { key: 'registry', label: t(lang, 'tabs.registry'), icon: Users },
          { key: 'wallet', label: t(lang, 'tabs.wallet'), icon: Wallet },
          { key: 'credentials', label: t(lang, 'tabs.credentials'), icon: FileCheck },
          { key: 'pki', label: t(lang, 'tabs.pki'), icon: Landmark },
          { key: 'signatures', label: t(lang, 'tabs.signatures'), icon: Key },
          { key: 'consent', label: t(lang, 'tabs.consent'), icon: FileCheck },
          { key: 'federation', label: t(lang, 'tabs.federation'), icon: Globe }
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
        
        {panelTab === 'registry' && (
          <RegistryPanel 
            lang={lang}
            citizens={model.identityViewModel.citizens}
            businesses={model.identityViewModel.businesses}
            employees={model.identityViewModel.employees}
            registrySearch={model.registrySearch}
            setRegistrySearch={model.setRegistrySearch}
          />
        )}

        {panelTab === 'wallet' && (
          <WalletPanel 
            lang={lang}
            wallets={model.identityViewModel.wallets}
          />
        )}

        {panelTab === 'credentials' && (
          <CredentialsPanel 
            lang={lang}
            credentials={model.identityViewModel.credentials}
            issueHolderDid={model.issueHolderDid}
            setIssueHolderDid={model.setIssueHolderDid}
            issueType={model.issueType}
            setIssueType={model.setIssueType}
            issueClaimKey={model.issueClaimKey}
            setIssueClaimKey={model.setIssueClaimKey}
            issueClaimValue={model.issueClaimValue}
            setIssueClaimValue={model.setIssueClaimValue}
            newVcNotice={model.newVcNotice}
            handleIssueCredential={model.handleIssueCredential}
            handleRevokeCredential={model.handleRevokeCredential}
            vcEngine={VerifiableCredentialEngine.getInstance()}
          />
        )}

        {panelTab === 'pki' && (
          <PkiPanel 
            lang={lang}
            certs={model.identityViewModel.certs}
            pkiCheckSerial={model.pkiCheckSerial}
            pkiValidationResult={model.pkiValidationResult}
            runPkiPathCheck={model.runPkiPathCheck}
          />
        )}

        {panelTab === 'signatures' && (
          <SignaturesPanel 
            lang={lang}
            documents={model.identityViewModel.documents}
            sigSelectedDocId={model.sigSelectedDocId}
            setSigSelectedDocId={model.setSigSelectedDocId}
            sigSignerRole={model.sigSignerRole}
            setSigSignerRole={model.setSigSignerRole}
            handleSignDocument={model.handleSignDocument}
          />
        )}

        {panelTab === 'consent' && (
          <ConsentPanel 
            lang={lang}
            consents={model.identityViewModel.consents}
            handleRevokeConsent={model.handleRevokeConsent}
          />
        )}

        {panelTab === 'federation' && (
          <FederationPanel 
            lang={lang}
            brokers={model.identityViewModel.brokers}
            tokens={model.tokens}
          />
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
              <span className="text-[10px] text-slate-550 uppercase">D. Compliance Registry</span>
              <strong className="text-white text-sm">W3C JSON-LD PROOF</strong>
            </div>
          </div>
        </div>

        {/* Big visual score display */}
        <div className="xl:w-1/3 bg-[#0b1420] border border-slate-800 p-5 rounded-xl flex flex-col justify-center items-center text-center gap-1.5 shrink-0 self-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest font-mono">Total Trust Readiness Score</span>
          <h3 className="text-4xl font-extrabold text-[#E0A96D] font-sans tracking-tight">
            {model.identityViewModel.trustScore}%
          </h3>
          <Badge variant="success" className="text-[9.5px] uppercase tracking-wider py-0.5">
            CLASS G5 APPROVED
          </Badge>
          <span className="text-[9px] text-slate-500 font-mono mt-1 select-none">
            Verified key checksum: 9912-S/N-IRAQ
          </span>
        </div>
      </div>

    </div>
  );
}
