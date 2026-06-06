import { Language } from '../../../types';

export const ccTranslations = {
  header: {
    title: {
      en: 'Sovereign National Command Center',
      ar: 'غرفة العمليات الوطنية السيادية الموحدة (IDG)',
      ku: 'ناوەندی فەرمانی نیشتمانیی سەروەر'
    },
    subtitle: {
      en: 'Operational command deck integrating border logistics telemetry pipelines, automated tax registers, and real-time cargo compliance audits.',
      ar: 'نظام العمليات والتحكم المركزي الموحد للجمهورية لدمج سونار المنافذ والتدفقات المالية للبنك المركزي.',
      ku: 'سەکۆی فەرمی نیشتمانیی بۆ چاودێریکردني جموجۆڵی دارایی گومرگ و دەروازە سنوورییەکان.'
    },
    badge: {
      en: 'Supreme Council',
      ar: 'المجلس الأعلى',
      ku: 'ئەنجومەنی باڵای نیشتمانی'
    },
    roleSelectionLabel: {
      en: 'Cabinet Role Selection:',
      ar: 'اختيار دور السلطة:',
      ku: 'دەستنیشانکردنی دەسەڵات:'
    },
    pmo: { en: 'PM Office', ar: 'رئيس الوزراء', ku: 'سەرۆکی وەزیران' },
    ministries: { en: 'Ministries', ar: 'الوزارات', ku: 'وەزارەتەکان' },
    customs: { en: 'Customs', ar: 'الجمارك', ku: 'گومرگ' },
    border: { en: 'Border', ar: 'المنافذ', ku: 'دەروازە سنوورییەکان' },
    economic: { en: 'Economic', ar: 'الاقتصاد', ku: 'ئابووری' }
  },
  roles: {
    jwtPass: { en: 'JWT_PASS: ', ar: 'مفتاح التحقق: ', ku: 'مفتی متمانە: ' },
    pmo: {
      title: {
        en: "Prime Minister's Executive Briefing",
        ar: 'المستشارية التنفيذية لريادة الوزراء',
        ku: 'نوسینگەی ڕێنمایی و ستراتیژی سەرۆک وەزیران'
      },
      sub: {
        en: 'Supreme Strategy Decision Matrix & Budget Allocation Monitoring',
        ar: 'مصفوفة اتخاذ القرارات العليا ومراقبة الموازنات والموارد الوطنية',
        ku: 'ماتریسی بڕیاری ستراتیژی باڵا و چاودێری دابەشکردنی بودجەی نیشتمانیی'
      }
    },
    ministries: {
      title: {
        en: 'Inter-Agency Ministerial Gateway',
        ar: 'بوابة التكامل الوزاري المشترك',
        ku: 'بەرەی هاوئاهەنگی نێوان وەزارەتەکان'
      },
      sub: {
        en: 'Custom Clearance Accords, Quality Control (COSQC), and Defense Dual-Use Interlocks',
        ar: 'تنسيق مطابقة المواصفات والسيطرة النوعية وموافقات الإعفاءات الصناعية',
        ku: 'ڕێککەوتنەکانی گومرگ، کۆنترۆڵی جۆری (COSQC)، و هاوئاهەنگی وەزارەتەکان'
      }
    },
    customs: {
      title: {
        en: 'Federal Customs Control Command',
        ar: 'قيادة هيئة الجمارك الاتحادية المركزية',
        ku: 'فەرماندەیی گشتی کۆنتڕۆڵی گومرگی فیدراڵ'
      },
      sub: {
        en: 'Real-Time Tariffs, Classification Audit Engine, and Revenue Anti-Corruption Shield',
        ar: 'إدارة الرسوم الجمركية ومحرك تدقيق السلع وحماية الإيرادات من الهدر مالي',
        ku: 'تاریفەی ڕاستەوخۆ، بزوێنەری لێکۆڵینەوەی پۆلێنکردن، و قەڵغانی بەرەنگاربوونەوەی هاوچەرخ'
      }
    },
    border: {
      title: {
        en: 'National Border Security & Logistics Hub',
        ar: 'قيادة المنافذ الحدودية واللوجستية نينوى-البصرة',
        ku: 'ژێرخانی نیشتمانیی بازرگانی و دەروازە لۆجستییەکان'
      },
      sub: {
        en: 'X-Ray Scanners, Quarantine Alarms, and Biosecurity Gate Clearance Signals',
        ar: 'أجهزة السونار وأجهزة الفحص الإشعاعي وصمامات السلامة والطب الإحيائي',
        ku: 'ئامێرەکانی سۆنەر و سکێنەری تیشکی و ئامێرەکانی هۆشداری تەندروستی گومرگی'
      }
    },
    economic: {
      title: {
        en: 'National Trade Council Operations Desk',
        ar: 'غرفة التحكم لمجلس التجارة والاقتصاد الوطني',
        ku: 'ناوەندی گشتی هاوسەنگی بازرگانی و دارایی نیشتمانیی'
      },
      sub: {
        en: 'Foreign Exchange Matching, Balance of Payments Index, and Regional Expansion Scenarios',
        ar: 'مطابقة حوالات مزاد العملة ومراقبة ميزان المدفوعات ونشاط المستثمرين',
        ku: 'هاوتاکردنی مۆڵەتی کڕینی دراو، چاودێری هاوردەی گشتی دەرەکی، و گەشەسەندنی ئاستی بازرگانی'
      }
    }
  },
  pmo: {
    revenueCardTitle: { en: 'Direct Customs Revenues Yield', ar: 'العوائد الجمركية المحققة', ku: 'داهاتی گومرگی بەدەستهاتوو' },
    revenueCardSub: { en: '94.3% of 2026 targeted national customs intake', ar: '٩٤.٣٪ من الإيرادات الجمركية المستهدفة لعام ٢٠٢٦', ku: '٩٤.٣٪ی داهاتی گومرگی نیشتمانیی پلانداڕێژراو بۆ ساڵی ٢٠٢٦' },
    interopCardTitle: { en: 'State Interoperability Rating', ar: 'مؤشر التكامل الحكومي', ku: 'پێوەری یەکگرتوویی حکومی' },
    interopCardSub: { en: 'Secure redundant fiber link networks synced', ar: 'شبكات الألياف الضوئية الفيدرالية متزامنة بنجاح', ku: 'تۆڕە جیاوازەکانی ڕایەڵەی ڕیشاڵی نیشتمانی هاوکاتکراون' },
    chartTitle: { en: 'Revenue Intake by Customs Terminal ($ USD / Day)', ar: 'إيرادات المنافذ والحدود', ku: 'داهاتەکانی دەروازەکان و سنوورەکان' },
    chartSub: { en: 'Calculated and locked on SHA-256 state ledgers', ar: 'محسوبة ومحفظة ببروتوكول SHA-256 الفيدرالي', ku: 'تۆمارکراو و پارێزراو لە دەفتەری نیشتمانیی لەسەر بنەمای SHA-256' },
    directiveHeader: { en: 'Cabinet Immediate Directives', ar: 'التوجيهات الفورية لمجلس الوزراء', ku: 'ڕێنمایی و بڕیارە خێراکانى ئەنجومەنی وەزیران' },
    alert1Title: { en: 'Faw Seaport Digital Harbor Integration', ar: 'ربط ميناء الفاو الكبير رقمياً', ku: 'گرێدانی دیجیتاڵیی بەندرە گەورەی فاو' },
    alert1Desc: { en: 'Automating Deep Basin dry container customs classifications with dual-use defense clearance loops.', ar: 'ربط وميكنة الفاو بري وبحري ضمن طريق التنمية بقرارات الجمارك الاتحادية.', ku: 'بەدیجیتاڵکردنی تەواوی پۆلێنکردنی بارهەڵگرەکانی فاو بە هەماهەنگی لەگەڵ وەزارەتی بەرگری.' },
    alert2Title: { en: 'Ibrahim Khalil Joint Accord Transshipment', ar: 'منفذ إبراهيم الخليل المشترك', ku: 'دەروازەی هاوبەشی ئیبراهیم خەلیل' },
    alert2Desc: { en: 'Harmonizing Baghdad Custom tariffs on Turkish rail transits with bilingual Sorani/Arabic documents.', ar: 'توحيد تفتيش وجمارك المنفذ بين الإقليم والمركز بمستندات عربية وكوردية.', ku: 'هاوتاکردنی ڕێساکانی گومرگی بەغداد بۆ دەروازەکانی هەرێمی کوردستان بە دۆکیومێنتی دەستووری.' }
  },
  checkpoint: {
    accuracyLabel: { en: 'NODE RECONCILED ACCURACY', ar: 'دقة مطابقة بيانات المنفذ', ku: 'ڕێژەی دروستی هاوتاسازی گرێ' },
    metricsTitleSuffix: { en: 'Custom Node Metrics', ar: 'مؤشرات العقدة الجمركية', ku: 'پێوەرەکانی گرێی گومرگی' },
    taxAuditLabel: { en: 'Tax Audit Rate', ar: 'معدل تدقيق الضرائب', ku: 'ڕێژەی پشکنینی باج' },
    zeroTrustLock: { en: 'Zero-Trust LOCK', ar: 'قفل صفر ثقة', ku: 'قوفڵی متمانەی سفر' },
    intakeLabel: { en: 'Intake Today', ar: 'المستلم اليوم', ku: 'وەرگیراوی ئەمڕۆ' },
    trucksLabel: { en: 'Trucks Processed', ar: 'الشاحنات المنجزة', ku: 'ژمارەی بارهەڵگرە پشکنراوەکان' },
    manifestsLabel: { en: 'manifests', ar: 'البيانات', ku: 'مۆڵەت پشکنراوەکان' },
    scannerGradeLabel: { en: 'Scanner Grade', ar: 'مستوى الفحص الصنعوني', ku: 'ئاستی پشکنەری سکان' },
    chartTitle: { en: 'Node Hourly Cargo Queue Speed', ar: 'معدل تدفق الحاويات بالساعة للمنفذ', ku: 'توقعات تدفق بارهەڵگرەكان' },
    chartSub: { en: 'Live predictive queue flow rate per hour', ar: 'معدل تدفق الحاويات بالساعة للمنفذ تنبؤياً', ku: 'توقعات تدفق بارهەڵگرەكان بە شێوەیەکی ڕاستەوخۆ' },
    selectNodeLabel: { en: 'Select Active Custom Node to Inspect:', ar: 'اختر المنفذ الجمركي النشط للفحص:', ku: 'گرێی گومرگی چالاک دەستنیشان بکە بۆ پشکنین:' }
  },
  sidebar: {
    loopTitle: { en: 'Sovereign Manifest Loop', ar: 'دورة المستندات السيادية', ku: 'زنجیرەی بەڵگەنامە سەروەرەکان' },
    directoryTitle: { en: 'Sovereign Operations Directory', ar: 'دليل العمليات الفيدرالي', ku: 'دایرێکتۆریی ئۆپەراسیۆنە سەروەرەکان' },
    advisorTitle: { en: 'Sovereign AI Decision Shield', ar: 'درع القرار للذكاء الاصطناعي السيادي', ku: 'قەڵغانی بڕیاردانی زیرەکی دەستکردی نیشتمانی' }
  },
  crisis: {
    title: { en: 'Inter-Agency Crisis Intercepts', ar: 'الاعتراضات والتدخلات المشتركة للأزمات', ku: 'هۆشدارییە هاوبەشەکانی دەمەقەیران' },
    sub: { en: 'Active border sensor alarms requiring manual sovereign cabinet interdictions.', ar: 'إنذارات أجهزة الاستشعار الحدودية النشطة التي تتطلب تدخلات وزارية.', ku: 'هۆشدارییە چاڵاکەکانی سۆنەر و سکێنەری سنوورەکان کە پێویستیان بە بڕیار و دەستوەردانی ئەنجومەنی وەزیرانە.' },
    resolvedTitle: { en: '✓ ALL INCIDENTS RESOLVED', ar: '✓ تم حل جميع الحوادث', ku: '✓ هەموو هۆشدارییەکان چارەسەر کراون' },
    resolvedDesc: { en: 'Regional border checkpoints are functioning securely under optimal clearance configurations.', ar: 'المنافذ والحدود تعمل بأمان تام وتوافق مع أنظمة الجدولة الذكية.', ku: 'دەروازە سنوورییەکان بە پارێزراوی و کارایی تەواوەوە لە ژێر باشترین ڕێکاردا کار دەکەن.' },
    target: { en: 'Mitigation target: ', ar: 'أهداف المعالجة الفورية: ', ku: 'ئامانجی چارەسەری: ' },
    placeholder: { en: 'Provide audit override note ledger item...', ar: 'أدخل ملاحظة التدقيق للكتل المشفرة...', ku: 'تێبینی دەستکاریکردنی پشکنین بنووسە...' },
    interceptBtn: { en: 'Intercept', ar: 'اعتراض وفلترة', ku: 'ڕێگریکردن' }
  },
  gateTypes: {
    land: { en: 'land border', ar: 'منفذ بري', ku: 'سنووری وشکانی' },
    sea: { en: 'seaport deep', ar: 'منفذ بحري', ku: 'سنووری دەریایی' },
    air: { en: 'airport cargo', ar: 'شحن جوي', ku: 'بارهەڵگری ئاسمانی' }
  }
};

export function t(lang: Language, keyPath: string): string {
  const parts = keyPath.split('.');
  let current: any = ccTranslations;
  
  for (const part of parts) {
    if (current && part in current) {
      current = current[part];
    } else {
      return keyPath;
    }
  }
  
  if (current && typeof current === 'object' && lang in current) {
    return current[lang];
  }
  
  return typeof current === 'string' ? current : keyPath;
}
