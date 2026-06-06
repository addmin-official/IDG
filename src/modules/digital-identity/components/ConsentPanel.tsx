import React from 'react';
import { Language } from '../../../types';
import { SectionHeader, Table, Badge, Button } from '../../../ui';
import { ConsentAgreement } from '../../../digital-identity';

interface ConsentPanelProps {
  lang: Language;
  consents: ConsentAgreement[];
  handleRevokeConsent: (consentId: string) => void;
}

export const ConsentPanel: React.FC<ConsentPanelProps> = React.memo(({
  lang,
  consents,
  handleRevokeConsent
}) => {
  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'en') return en;
    if (lang === 'ar') return ar;
    return ku;
  };

  return (
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

      <div className="overflow-x-auto border border-slate-850 rounded pt-2 text-start">
        <Table headers={['Consent Agreement Serial', 'Citizen DID Identification', 'Authorized department', 'Legal Verification Purpose', 'Claims Access Granted', 'Consent Lifetime Duration', 'Status', 'Actions']}>
          {consents.map(c => (
            <tr key={c.id} className="text-xs font-mono text-slate-350 text-start">
              <td className="px-4 py-3 font-semibold text-white">{c.id}</td>
              <td className="px-4 py-3 text-slate-400">{c.citizenDid}</td>
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
  );
});

ConsentPanel.displayName = 'ConsentPanel';
