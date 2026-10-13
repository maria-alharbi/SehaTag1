// ALL DATA BELOW IS FICTIONAL — for demonstration only.
// Architecture note: the UI reads from this single module. In a real system it would be
// replaced by an authenticated API call (e.g. fetchPatient(tagToken)) with audit logging.

const L = (ar, en, fr, ur) => ({ ar, en, fr, ur })

export const PATIENT = {
  name: L('خالد المنصوري', 'Khalid Al-Mansouri', 'Khalid Al-Mansouri', 'خالد المنصوری'),
  id: 'ST-DEMO-0001',
  dob: '1985-03-14',
  gender: L('ذكر', 'Male', 'Homme', 'مرد'),
  nationality: L('سعودي', 'Saudi', 'Saoudien', 'سعودی'),
  bloodType: 'A+',
  height: 178,
  weight: 84,
  language: L('العربية', 'Arabic', 'Arabe', 'عربی'),
}

export const EMERGENCY = {
  allergies: [
    L('البنسلين — صدمة تحسسية', 'Penicillin — anaphylaxis', 'Pénicilline — anaphylaxie', 'پینسلین — اینافلیکسس'),
    L('الفول السوداني — صدمة تحسسية', 'Peanuts — anaphylaxis', 'Arachides — anaphylaxie', 'مونگ پھلی — اینافلیکسس'),
  ],
  conditions: [
    L('السكري من النوع الثاني', 'Type 2 diabetes mellitus', 'Diabète de type 2', 'ٹائپ 2 ذیابیطس'),
    L('ارتفاع ضغط الدم', 'Hypertension', 'Hypertension artérielle', 'ہائی بلڈ پریشر'),
    L('مرض الشريان التاجي مع دعامة (2022)', 'Coronary artery disease with stent (2022)', 'Maladie coronarienne avec stent (2022)', 'کرونری شریان کی بیماری، اسٹنٹ (2022)'),
  ],
  medications: [
    L('أسبرين 81 ملغ — خطر نزيف', 'Aspirin 81 mg — bleeding risk', 'Aspirine 81 mg — risque hémorragique', 'اسپرین 81 ملی گرام — خون بہنے کا خطرہ'),
    L('ميتفورمين 500 ملغ (السكري)', 'Metformin 500 mg (diabetes)', 'Metformine 500 mg (diabète)', 'میٹفارمن 500 ملی گرام (ذیابیطس)'),
    L('حاقن إبينفرين ذاتي 0.3 ملغ', 'Epinephrine auto-injector 0.3 mg', 'Auto-injecteur d’épinéphrine 0,3 mg', 'ایپینیفرین آٹو انجیکٹر 0.3 ملی گرام'),
  ],
  contact: {
    name: L('سارة المنصوري', 'Sara Al-Mansouri', 'Sara Al-Mansouri', 'سارہ المنصوری'),
    relation: L('الزوجة', 'Spouse', 'Épouse', 'اہلیہ'),
    phone: '+000 000 000 0000',
  },
  instructions: L(
    'لا تُعطِ أي بنسلين. خطر صدمة تحسسية من الفول السوداني — حاقن الإبينفرين في المحفظة. المريض يتناول الأسبرين ولديه دعامة تاجية. تحقق من سكر الدم عند تغيّر مستوى الوعي. اتبع بروتوكول القلب عند ألم الصدر.',
    'Do NOT administer any penicillin. Peanut anaphylaxis risk — epinephrine auto-injector is kept in the wallet. Patient takes aspirin and has a coronary stent. Check blood glucose if consciousness is altered. Follow the cardiac protocol for chest pain.',
    'Ne pas administrer de pénicilline. Risque d’anaphylaxie aux arachides — auto-injecteur d’épinéphrine dans le portefeuille. Le patient prend de l’aspirine et porte un stent coronaire. Vérifier la glycémie en cas d’altération de la conscience. Suivre le protocole cardiaque en cas de douleur thoracique.',
    'کوئی پینسلین نہ دیں۔ مونگ پھلی سے اینافلیکسس کا خطرہ — ایپینیفرین آٹو انجیکٹر بٹوے میں ہے۔ مریض اسپرین لیتا ہے اور کرونری اسٹنٹ ہے۔ ہوش میں تبدیلی پر بلڈ شوگر چیک کریں۔ سینے کے درد میں کارڈیک پروٹوکول اپنائیں۔'
  ),
}

export const ALLERGIES = [
  {
    type: 'med',
    name: L('البنسلين', 'Penicillin', 'Pénicilline', 'پینسلین'),
    severity: 'severe',
    reaction: L('صدمة تحسسية، شرى، صعوبة تنفس', 'Anaphylaxis, hives, difficulty breathing', 'Anaphylaxie, urticaire, difficulté respiratoire', 'اینافلیکسس، چھپاکی، سانس میں دشواری'),
    notes: L('تجنب جميع البنسلينات؛ راجع الحساسية المتصالبة مع السيفالوسبورينات.', 'Avoid all penicillins; review cross-reactivity with cephalosporins.', 'Éviter toutes les pénicillines ; vérifier la réactivité croisée avec les céphalosporines.', 'تمام پینسلین سے پرہیز کریں؛ سیفالوسپورن کے ساتھ کراس ری ایکٹیویٹی دیکھیں۔'),
  },
  {
    type: 'med',
    name: L('الإيبوبروفين', 'Ibuprofen', 'Ibuprofène', 'آئبوپروفین'),
    severity: 'moderate',
    reaction: L('صفير وانسداد أنفي', 'Wheezing, nasal congestion', 'Sifflements, congestion nasale', 'سانس میں سیٹی، ناک بند'),
    notes: L('يُفضّل الباراسيتامول كبديل.', 'Paracetamol preferred as an alternative.', 'Paracétamol préféré comme alternative.', 'متبادل کے طور پر پیراسیٹامول بہتر ہے۔'),
  },
  {
    type: 'food',
    name: L('الفول السوداني', 'Peanuts', 'Arachides', 'مونگ پھلی'),
    severity: 'severe',
    reaction: L('صدمة تحسسية، تورم الشفاه والحلق', 'Anaphylaxis, lip and throat swelling', 'Anaphylaxie, gonflement des lèvres et de la gorge', 'اینافلیکسس، ہونٹوں اور گلے کی سوجن'),
    notes: L('يحمل حاقن إبينفرين ذاتي. تجنب التلوث المتصالب.', 'Carries an epinephrine auto-injector. Avoid cross-contamination.', 'Porte un auto-injecteur d’épinéphrine. Éviter la contamination croisée.', 'ایپینیفرین آٹو انجیکٹر ساتھ رکھتا ہے۔ کراس کنٹیمینیشن سے بچیں۔'),
  },
  {
    type: 'food',
    name: L('القشريات', 'Shellfish', 'Crustacés', 'شیل فش'),
    severity: 'mild',
    reaction: L('اضطراب هضمي', 'Gastrointestinal upset', 'Troubles digestifs', 'معدے کی خرابی'),
    notes: L('لا تأثير تنفسي موثق.', 'No documented respiratory involvement.', 'Aucune atteinte respiratoire documentée.', 'سانس پر کوئی ریکارڈ شدہ اثر نہیں۔'),
  },
  {
    type: 'env',
    name: L('عث الغبار', 'Dust mites', 'Acariens', 'گرد کے ذرات'),
    severity: 'mild',
    reaction: L('عطاس ودمع العينين', 'Sneezing, watery eyes', 'Éternuements, larmoiement', 'چھینکیں، آنکھوں سے پانی'),
    notes: L('يتحسن بمضادات الهيستامين عند الحاجة.', 'Improves with antihistamines when needed.', 'S’améliore avec des antihistaminiques si besoin.', 'ضرورت پر اینٹی ہسٹامین سے بہتری۔'),
  },
]

export const MEDS = [
  {
    name: L('ميتفورمين', 'Metformin', 'Metformine', 'میٹفارمن'),
    dosage: '500 mg',
    frequency: L('مرتان يوميًا', 'Twice daily', 'Deux fois par jour', 'دن میں دو بار'),
    route: L('فموي', 'Oral', 'Orale', 'منہ سے'),
    purpose: L('السكري من النوع الثاني', 'Type 2 diabetes', 'Diabète de type 2', 'ٹائپ 2 ذیابیطس'),
    start: '2021-06-10',
    notes: L('مع الوجبات. يُوقف قبل التصوير بالصبغة.', 'Take with meals. Hold before contrast imaging.', 'Pendant les repas. À suspendre avant une imagerie avec contraste.', 'کھانے کے ساتھ۔ کنٹراسٹ امیجنگ سے پہلے روکیں۔'),
  },
  {
    name: L('ليزينوبريل', 'Lisinopril', 'Lisinopril', 'لیسینوپرل'),
    dosage: '10 mg',
    frequency: L('مرة يوميًا', 'Once daily', 'Une fois par jour', 'دن میں ایک بار'),
    route: L('فموي', 'Oral', 'Orale', 'منہ سے'),
    purpose: L('ارتفاع ضغط الدم', 'Hypertension', 'Hypertension', 'ہائی بلڈ پریشر'),
    start: '2020-02-03',
    notes: L('مراقبة البوتاسيوم والكرياتينين.', 'Monitor potassium and creatinine.', 'Surveiller potassium et créatinine.', 'پوٹاشیم اور کریٹینین کی نگرانی کریں۔'),
  },
  {
    name: L('أتورفاستاتين', 'Atorvastatin', 'Atorvastatine', 'ایٹورواسٹیٹن'),
    dosage: '40 mg',
    frequency: L('مرة يوميًا ليلًا', 'Once daily at night', 'Une fois par jour le soir', 'رات کو ایک بار'),
    route: L('فموي', 'Oral', 'Orale', 'منہ سے'),
    purpose: L('الوقاية القلبية الوعائية', 'Cardiovascular prevention', 'Prévention cardiovasculaire', 'امراضِ قلب سے بچاؤ'),
    start: '2022-05-20',
    notes: L('الإبلاغ عن آلام عضلية غير مفسرة.', 'Report unexplained muscle pain.', 'Signaler toute douleur musculaire inexpliquée.', 'پٹھوں کے غیر واضح درد کی اطلاع دیں۔'),
  },
  {
    name: L('أسبرين', 'Aspirin', 'Aspirine', 'اسپرین'),
    dosage: '81 mg',
    frequency: L('مرة يوميًا', 'Once daily', 'Une fois par jour', 'دن میں ایک بار'),
    route: L('فموي', 'Oral', 'Orale', 'منہ سے'),
    purpose: L('مضاد للصفيحات بعد الدعامة', 'Antiplatelet after stent', 'Antiagrégant après stent', 'اسٹنٹ کے بعد اینٹی پلیٹ لیٹ'),
    start: '2022-05-20',
    notes: L('خطر نزيف — أبلغ قبل أي جراحة.', 'Bleeding risk — inform before any surgery.', 'Risque hémorragique — informer avant toute chirurgie.', 'خون بہنے کا خطرہ — کسی بھی سرجری سے پہلے بتائیں۔'),
  },
  {
    name: L('إبينفرين (حاقن ذاتي)', 'Epinephrine (auto-injector)', 'Épinéphrine (auto-injecteur)', 'ایپینیفرین (آٹو انجیکٹر)'),
    dosage: '0.3 mg',
    frequency: L('عند الحاجة (صدمة تحسسية)', 'As needed (anaphylaxis)', 'Au besoin (anaphylaxie)', 'ضرورت پر (اینافلیکسس)'),
    route: L('حقن عضلي (الفخذ)', 'Intramuscular (thigh)', 'Intramusculaire (cuisse)', 'عضلاتی ٹیکہ (ران)'),
    purpose: L('علاج طارئ للحساسية الشديدة', 'Emergency treatment of severe allergy', 'Traitement d’urgence des allergies sévères', 'شدید الرجی کا ہنگامی علاج'),
    start: '2023-01-12',
    notes: L('يحمله المريض دائمًا؛ اطلب الإسعاف بعد الاستخدام.', 'Carried by the patient; call emergency services after use.', 'Porté par le patient ; appeler les secours après usage.', 'مریض ہمیشہ ساتھ رکھتا ہے؛ استعمال کے بعد ایمرجنسی کو بلائیں۔'),
  },
]

export const HISTORY = [
  {
    key: 'chronic',
    items: [
      L('السكري من النوع الثاني (منذ 2021)', 'Type 2 diabetes mellitus (since 2021)', 'Diabète de type 2 (depuis 2021)', 'ٹائپ 2 ذیابیطس (2021 سے)'),
      L('ارتفاع ضغط الدم (منذ 2019)', 'Hypertension (since 2019)', 'Hypertension artérielle (depuis 2019)', 'ہائی بلڈ پریشر (2019 سے)'),
      L('مرض الشريان التاجي (منذ 2022)', 'Coronary artery disease (since 2022)', 'Maladie coronarienne (depuis 2022)', 'کرونری شریان کی بیماری (2022 سے)'),
    ],
  },
  {
    key: 'previous',
    items: [
      L('التهاب رئوي (2016) — شُفي', 'Pneumonia (2016) — resolved', 'Pneumonie (2016) — guérie', 'نمونیا (2016) — ٹھیک ہو گیا'),
      L('التهاب المعدة (2018) — شُفي', 'Gastritis (2018) — resolved', 'Gastrite (2018) — guérie', 'معدے کی سوزش (2018) — ٹھیک ہو گئی'),
    ],
  },
  {
    key: 'surgeries',
    items: [
      L('استئصال الزائدة الدودية (2004)', 'Appendectomy (2004)', 'Appendicectomie (2004)', 'اپینڈکس کی سرجری (2004)'),
      L('تدخل تاجي عبر الجلد مع زرع دعامة (مايو 2022)', 'Percutaneous coronary intervention with stent (May 2022)', 'Angioplastie coronaire avec stent (mai 2022)', 'کرونری انجیوپلاسٹی، اسٹنٹ (مئی 2022)'),
    ],
  },
  {
    key: 'hospitalizations',
    items: [
      L('ألم صدر حاد — 3 أيام (مايو 2022)، مستشفى العرض العام', 'Acute chest pain — 3 days (May 2022), Demo General Hospital', 'Douleur thoracique aiguë — 3 jours (mai 2022), Hôpital général Démo', 'شدید سینے کا درد — 3 دن (مئی 2022)، ڈیمو جنرل ہسپتال'),
      L('التهاب رئوي — 5 أيام (2016)', 'Pneumonia — 5 days (2016)', 'Pneumonie — 5 jours (2016)', 'نمونیا — 5 دن (2016)'),
    ],
  },
  {
    key: 'family',
    items: [
      L('الأب: سكري من النوع الثاني وأمراض القلب', 'Father: type 2 diabetes and heart disease', 'Père : diabète de type 2 et maladie cardiaque', 'والد: ٹائپ 2 ذیابیطس اور دل کی بیماری'),
      L('الأم: ارتفاع ضغط الدم', 'Mother: hypertension', 'Mère : hypertension', 'والدہ: ہائی بلڈ پریشر'),
    ],
  },
  {
    key: 'devices',
    items: [
      L('دعامة تاجية مغطاة بالدواء (الشريان الأمامي النازل، 2022)', 'Drug-eluting coronary stent (LAD, 2022)', 'Stent coronaire actif (IVA, 2022)', 'ڈرگ ایلیوٹنگ کرونری اسٹنٹ (LAD، 2022)'),
    ],
  },
  {
    key: 'special',
    items: [
      L('لا توجد إعاقات. يستخدم نظارات للقراءة.', 'No disabilities reported. Uses reading glasses.', 'Aucun handicap signalé. Porte des lunettes de lecture.', 'کوئی معذوری نہیں۔ مطالعے کے لیے عینک استعمال کرتا ہے۔'),
    ],
  },
]

export const HEALTH = {
  recorded: '2026-09-02',
  lastVisit: {
    date: '2026-09-02',
    note: L('متابعة دورية — عيادة الباطنة (عرض تجريبي)', 'Routine follow-up — Internal Medicine clinic (demo)', 'Suivi de routine — clinique de médecine interne (démo)', 'معمول کا فالو اپ — انٹرنل میڈیسن کلینک (ڈیمو)'),
  },
  vitals: [
    { key: 'bp', value: '128/82', unit: 'mmHg' },
    { key: 'hr', value: '74', unit: 'bpm' },
    { key: 'spo2', value: '97', unit: '%' },
    { key: 'temp', value: '36.8', unit: '°C' },
    { key: 'glucose', value: '112', unit: 'mg/dL' },
  ],
  labs: [
    { name: 'HbA1c', value: '6.8 %', range: '< 7.0 %' },
    { name: 'LDL', value: '98 mg/dL', range: '< 100 mg/dL' },
    { name: 'Creatinine', value: '0.9 mg/dL', range: '0.7–1.3 mg/dL' },
    { name: 'Hemoglobin', value: '14.2 g/dL', range: '13.5–17.5 g/dL' },
  ],
  vaccines: [
    { name: L('الإنفلونزا الموسمية', 'Seasonal influenza', 'Grippe saisonnière', 'موسمی انفلوئنزا'), date: '2025-10-05' },
    { name: L('كوفيد-19 (جرعة معززة)', 'COVID-19 (booster)', 'COVID-19 (rappel)', 'کووڈ-19 (بوسٹر)'), date: '2024-10-14' },
    { name: L('المكورات الرئوية', 'Pneumococcal', 'Pneumocoque', 'نمونیا ویکسین'), date: '2023-03-01' },
    { name: L('الكزاز والدفتيريا', 'Tetanus–diphtheria (Td)', 'Tétanos–diphtérie (Td)', 'ٹیٹنس–ڈفتھیریا (Td)'), date: '2021-08-12' },
    { name: L('التهاب الكبد B', 'Hepatitis B', 'Hépatite B', 'ہیپاٹائٹس بی'), date: '2005-09-20' },
  ],
  physicianNotes: L(
    'السكري تحت السيطرة الجيدة. الضغط ضمن النطاق المقبول. يُنصح بمتابعة القلب خلال 6 أشهر وتجنب البنسلين والفول السوداني. (ملاحظة وهمية)',
    'Diabetes well controlled. Blood pressure within acceptable range. Cardiology follow-up in 6 months; strictly avoid penicillin and peanuts. (fictional note)',
    'Diabète bien contrôlé. Tension dans la plage acceptable. Suivi cardiologique dans 6 mois ; éviter strictement pénicilline et arachides. (note fictive)',
    'ذیابیطس اچھی طرح قابو میں ہے۔ بلڈ پریشر قابلِ قبول حد میں ہے۔ 6 ماہ میں دل کا فالو اپ؛ پینسلین اور مونگ پھلی سے سختی سے پرہیز۔ (فرضی نوٹ)'
  ),
}
