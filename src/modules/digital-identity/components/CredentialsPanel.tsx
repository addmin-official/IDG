import React from 'react';
import { CheckCircle2, CheckSquare, XCircle } from 'lucide-react';
import { Language } from '../../../types';
import { SectionHeader, Button, Table, Badge } from '../../../ui';
import { VerifiableCredential } from '../../../digital-identity';

interface CredentialsPanelProps {
  lang: Language;
  credentials: VerifiableCredential[];
  issueHolderDid: string;
  setIssueHolderDid: (did: string) => void;
  issueType: string;
  setIssueType: (type: string) => void;
  issueClaimKey: string;
  setIssueClaimKey: (key: string) => void;
  issueClaimValue: string;
  setIssueClaimValue: (val: string) => void;
  newVcNotice: string | null;
  handleIssueCredential: (e: React.FormEvent) => void;
  handleRevokeCredential: (vcId: string) => void;
  vcEngine: any;
}

export const CredentialsPanel: React.FC<CredentialsPanelProps> = React.memo(({
  lang,
  credentials,
  issueHolderDid,
  setIssueHolderDid,
  issueType,
  setIssueType,
  issueClaimKey,
  setIssueClaimKey,
  issueClaimValue,
  setIssueClaimValue,
  newVcNotice,
  handleIssueCredential,
  handleRevokeCredential,
  vcEngine
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

      {newVcNotice && (
        <div className="bg-emerald-950/35 border border-emerald-500/30 text-[#52B788] rounded-xl p-4 font-sans font-semibold text-xs flex items-center gap-3 animate-pulse text-start">
          <CheckCircle2 className="w-5 h-5" />
          <span>{newVcNotice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-2">
        <div className="bg-[#0b1420] border border-slate-800 p-5 rounded-xl flex flex-col gap-4 font-mono text-xs text-start">
          <h4 className="text-xs font-bold uppercase text-[#E0A96D] border-b border-slate-900 pb-2 font-sans tracking-wider">
            Cryptographic Credentials Issuing Panel
          </h4>

          <form onSubmit={handleIssueCredential} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-bold text-start">1. Select Destination holder DID</label>
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
              <label className="text-[10px] text-slate-400 font-bold text-start">2. Select W3C Compliant Type</label>
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
              <label className="text-[10px] text-slate-400 font-bold text-start">3. Set Declared Claim Field Attributes</label>
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

        <div className="xl:col-span-2 flex flex-col gap-4 text-start">
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
                            onClick={() => handleRevokeCredential(vc.id)}
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
  );
});

CredentialsPanel.displayName = 'CredentialsPanel';
