import React from 'react';
import { Language } from '../../../types';
import { SectionHeader, Input, Table, Badge } from '../../../ui';
import { 
  CitizenIdentity, 
  BusinessIdentity, 
  GovernmentEmployeeIdentity 
} from '../../../digital-identity';

interface RegistryPanelProps {
  lang: Language;
  citizens: CitizenIdentity[];
  businesses: BusinessIdentity[];
  employees: GovernmentEmployeeIdentity[];
  registrySearch: string;
  setRegistrySearch: (val: string) => void;
}

export const RegistryPanel: React.FC<RegistryPanelProps> = React.memo(({
  lang,
  citizens,
  businesses,
  employees,
  registrySearch,
  setRegistrySearch
}) => {
  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'en') return en;
    if (lang === 'ar') return ar;
    return ku;
  };

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
    <div className="flex flex-col gap-5 animate-fade-in text-start">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900 pb-3">
        <SectionHeader
          title={getLabel('National Sovereign Identity Registries', 'السجلات السيادية للهويات الرقمية', 'سجلە نیشتمانییە سەروەرەکانی ناسنامەی دیجیتاڵیی')}
          description={getLabel(
            'Unified national records for natural citizens, business corporations, federal government agents, and subsystem service accounts.',
            'قاعدة بيانات موثقة تربط الحسابات المدنية، والشركات، وموظفي المنافذ بالمفاتيح العامة المشفرة.',
            'قاعیدەی زانیاریی پشتڕاستکراوە کە پێوەست دەکات هەژمارە مەدەنییەکان، کۆمپانیاکان و فەرمانبەرانی دەروازەکان بە کلیلە گشتییەکان.'
          )}
        />
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

      {/* Businesses Table */}
      <div className="flex flex-col gap-1.5 pt-4 border-t border-slate-900">
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

      {/* Employees Table */}
      <div className="flex flex-col gap-1.5 pt-4 border-t border-slate-900">
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
  );
});

RegistryPanel.displayName = 'RegistryPanel';
