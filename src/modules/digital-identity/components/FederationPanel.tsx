import React from 'react';
import { Language } from '../../../types';
import { SectionHeader, Badge } from '../../../ui';
import { FederatedIdentityBroker } from '../../../digital-identity';

interface FederationPanelProps {
  lang: Language;
  brokers: FederatedIdentityBroker[];
  tokens: any[];
}

export const FederationPanel: React.FC<FederationPanelProps> = React.memo(({
  lang,
  brokers,
  tokens
}) => {
  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'en') return en;
    if (lang === 'ar') return ar;
    return ku;
  };

  return (
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
        <div className="flex flex-col gap-3 text-start">
          <span className="text-xs uppercase font-bold tracking-widest text-[#E0A96D] font-mono block text-start">SSO Federation Core System Standbys</span>
          
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

        <div className="flex flex-col gap-3 text-start">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono block text-start">Real-time Claims Token Assertions Ledger</span>
          
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-905 font-mono text-xs flex flex-col gap-4 max-h-[360px] overflow-y-auto text-start">
            {tokens.map(tok => (
              <div key={tok.jti} className="border-b border-slate-900 pb-3 flex flex-col gap-2">
                <div className="flex justify-between items-center text-[10px] text-slate-500">
                  <span>JTI Token: {tok.jti}</span>
                  <span>Exp: {new Date(tok.exp * 1000).toLocaleTimeString()}Z</span>
                </div>

                <div className="flex justify-between">
                  <strong className="text-white font-sans text-xs">Issuer: {tok.iss.replace('https://', '')}</strong>
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
  );
});

FederationPanel.displayName = 'FederationPanel';
