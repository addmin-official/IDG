import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Language } from '../../../types';
import { SectionHeader, Badge, Table } from '../../../ui';
import { PKICertificate } from '../../../digital-identity';

interface PkiPanelProps {
  lang: Language;
  certs: PKICertificate[];
  pkiCheckSerial: string;
  pkiValidationResult: { isValid: boolean; chain: string[] } | null;
  runPkiPathCheck: (serial: string) => void;
}

export const PkiPanel: React.FC<PkiPanelProps> = React.memo(({
  lang,
  certs,
  pkiCheckSerial,
  pkiValidationResult,
  runPkiPathCheck
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
        <div className="bg-[#0b1420] border border-slate-800 p-5 rounded-xl flex flex-col gap-4 font-mono text-xs text-start">
          <h4 className="text-xs font-bold uppercase text-cyan-400 border-b border-slate-900 pb-2 font-sans tracking-wider text-start">
            PKI Path Verification Tool
          </h4>

          <div className="flex flex-col gap-3 text-start">
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
                
                <div className="flex flex-col gap-2 font-mono text-[10px]">
                  {pkiValidationResult.chain.map((cName, idx) => (
                    <div key={idx} className="bg-[#111e2e] p-2.5 rounded border border-slate-850 flex items-center gap-2">
                      <span className="bg-slate-950 text-slate-500 w-4 h-4 rounded-full flex items-center justify-center text-[8.5px] shrink-0 font-bold">{idx}</span>
                      <span className="text-slate-300 leading-tight">{cName}</span>
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

        <div className="xl:col-span-2 flex flex-col gap-2 text-start">
          <span className="text-xs uppercase font-bold tracking-widest text-[#E0A96D] font-mono block">Enrolled Certificate Authorities Ledger</span>
          
          <div className="overflow-x-auto border border-slate-850 rounded">
            <Table headers={['Serial / Cert Common Name', 'Issuer Parent Entity', 'Usage Type Class', 'Cryptographic Algorithm', 'Validity Calendar Days']}>
              {certs.map(c => (
                <tr key={c.serialNumber} className={`text-xs font-mono text-slate-300 ${c.isRevoked ? 'bg-red-950/15' : ''}`}>
                  <td className="px-4 py-3 font-semibold text-start">
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
                      <span className="text-red-400 text-[10px] leading-relaxed block font-semibold text-start">
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
  );
});

PkiPanel.displayName = 'PkiPanel';
