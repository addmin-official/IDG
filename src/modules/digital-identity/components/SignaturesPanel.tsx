import React from 'react';
import { Language } from '../../../types';
import { SectionHeader, Button, Badge } from '../../../ui';
import { SovereignDocument } from '../../../digital-identity';

interface SignaturesPanelProps {
  lang: Language;
  documents: SovereignDocument[];
  sigSelectedDocId: string;
  setSigSelectedDocId: (id: string) => void;
  sigSignerRole: string;
  setSigSignerRole: (role: string) => void;
  handleSignDocument: (docId: string, signerDid: string) => void;
}

export const SignaturesPanel: React.FC<SignaturesPanelProps> = React.memo(({
  lang,
  documents,
  sigSelectedDocId,
  setSigSelectedDocId,
  sigSignerRole,
  setSigSignerRole,
  handleSignDocument
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
        <div className="bg-[#0b1420] border border-slate-800 p-5 rounded-xl flex flex-col gap-4 font-mono text-xs text-start">
          <h4 className="text-xs font-bold uppercase text-[#E0A96D] border-b border-slate-900 pb-2 font-sans tracking-wider text-start">
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

        <div className="xl:col-span-2 flex flex-col gap-3 text-start">
          <span className="text-xs uppercase font-bold tracking-widest text-[#E0A96D] font-mono block text-start">Federal Document Registry</span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => {
              const isSealed = doc.status === 'FULLY_SEALED';
              return (
                <div key={doc.id} className="bg-[#0b1420] border border-slate-850 p-4.5 rounded-xl flex flex-col gap-3 leading-normal text-start">
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
                    <div>Required Signatures: <strong className="text-slate-200">{doc.requiredSovereignSignersCount}</strong></div>
                    <div>Type Class: <strong className="text-[#E0A96D]">{doc.type}</strong></div>
                  </div>

                  <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-900 text-start">
                    <span className="text-[9.5px] text-slate-500 font-bold uppercase font-mono">Applied Signature Seals</span>
                    {doc.currentSignatures.length === 0 ? (
                      <span className="text-[10px] text-slate-600 italic">No signatures applied yet.</span>
                    ) : (
                      <div className="flex flex-col gap-1.5 font-mono text-[9.5px]">
                        {doc.currentSignatures.map((sig, i) => (
                          <div key={i} className="bg-[#111e2e]/80 p-2 border border-slate-850 rounded">
                            <div className="flex justify-between items-center font-bold text-[#52B788]">
                              <span>{sig.signatoryTitle}</span>
                              <span>✓ Verified</span>
                            </div>
                            <div className="text-slate-400 mt-0.5">Org: {sig.signatoryOrganization}</div>
                            <div className="text-slate-500 mt-0.5 break-all">Hash: {sig.signatureHash.slice(0, 36)}...</div>
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
  );
});

SignaturesPanel.displayName = 'SignaturesPanel';
