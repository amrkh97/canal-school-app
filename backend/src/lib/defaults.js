// Default site content — the SINGLE SOURCE OF TRUTH for the whole site.
// Everything the public site shows is seeded from here and is fully editable
// from the admin dashboard. All text is BILINGUAL: each field has an Arabic
// value and an English `_en` sibling (the frontend picks one via `localized()`).
// The frontend renders this data verbatim — it holds no hard-coded content.

export const defaultContent = {
  // --- Site identity + navigation -------------------------------------------
  site: {
    schoolName: 'مدرسة القناة بالمعادي',
    schoolName_en: 'Maadi Canal School',
    navItems: [
      { id: 'home', label: 'الرئيسية', label_en: 'Home' },
      { id: 'about', label: 'عن المدرسة', label_en: 'About' },
      { id: 'admissions', label: 'القبول', label_en: 'Admissions' },
      { id: 'news', label: 'الأخبار', label_en: 'News' },
      { id: 'gallery', label: 'معرض الصور', label_en: 'Gallery' },
      { id: 'contact', label: 'اتصل بنا', label_en: 'Contact' },
    ],
  },

  // --- Hero ------------------------------------------------------------------
  hero: {
    title: 'مدرسة القناة بالمعادي',
    title_en: 'Maadi Canal School',
    subtitle: 'نلتزم بالتميز التعليمي ورعاية أبنائنا الطلاب',
    subtitle_en: 'Committed to educational excellence and nurturing our students',
    ctaLabel: 'اعرف المزيد',
    ctaLabel_en: 'Learn more',
  },

  // --- About -----------------------------------------------------------------
  about: {
    heading: 'مرحباً بكم في مدرسة القناة بالمعادي',
    heading_en: 'Welcome to Maadi Canal School',
    videoBadge: 'جولة في المدرسة',
    videoBadge_en: 'School tour',
    paragraphs: [
      'نحن مؤسسة تعليمية رائدة في منطقة المعادي، نلتزم بتقديم تعليم متميز يشمل جميع المراحل الدراسية. نسعى دائماً لتوفير بيئة تعليمية آمنة ومحفزة تدعم تطور الطلاب الأكاديمي والشخصي.',
      'تتميز مدرستنا بالمناهج الحديثة والمرافق المتطورة والكادر التعليمي المؤهل، مما يضمن لأبنائنا أفضل مستوى تعليمي.',
    ],
    paragraphs_en: [
      'We are a leading educational institution in Maadi, committed to providing distinguished education across all stages. We always strive to offer a safe, motivating environment that supports each student’s academic and personal growth.',
      'Our school is distinguished by modern curricula, advanced facilities and a qualified teaching staff, ensuring the best learning experience for our students.',
    ],
    features: [
      'مرافق حديثة ومتطورة',
      'كادر تعليمي متميز',
      'أنشطة صفية ولاصفية',
      'اهتمام بالمواهب والابتكار',
    ],
    features_en: [
      'Modern facilities',
      'Distinguished teaching staff',
      'Curricular & extracurricular activities',
      'Focus on talent & innovation',
    ],
  },

  // --- Educational stages ----------------------------------------------------
  stages: [
    {
      icon: 'shapes',
      title: 'رياض الأطفال',
      title_en: 'Kindergarten',
      age: 'KG 1 - KG 2',
      age_en: 'KG 1 - KG 2',
      text: 'بداية تعليمية ممتعة تنمّي مهارات الطفل الأساسية باللعب والاكتشاف.',
      text_en: 'A joyful start that builds a child’s basic skills through play and discovery.',
    },
    {
      icon: 'pencil',
      title: 'المرحلة الابتدائية',
      title_en: 'Primary',
      age: 'الصفوف 1 - 6',
      age_en: 'Grades 1 - 6',
      text: 'أساس قوي في اللغات والرياضيات والعلوم مع غرس حب التعلّم.',
      text_en: 'A strong foundation in languages, maths and science while instilling a love of learning.',
    },
    {
      icon: 'flask',
      title: 'المرحلة الإعدادية',
      title_en: 'Preparatory',
      age: 'الصفوف 7 - 9',
      age_en: 'Grades 7 - 9',
      text: 'تعميق المعرفة وتنمية التفكير الناقد والمهارات البحثية.',
      text_en: 'Deepening knowledge and developing critical thinking and research skills.',
    },
    {
      icon: 'graduation-cap',
      title: 'المرحلة الثانوية',
      title_en: 'Secondary',
      age: 'الصفوف 10 - 12',
      age_en: 'Grades 10 - 12',
      text: 'إعداد الطلاب للثانوية العامة وللمرحلة الجامعية بثقة وتميّز.',
      text_en: 'Preparing students for the general secondary certificate and university with confidence.',
    },
  ],

  // --- Stats (animated counters) ---------------------------------------------
  stats: [
    { icon: 'calendar-days', value: 25, suffix: '+', label: 'عاماً من الخبرة', label_en: 'Years of experience' },
    { icon: 'user-graduate', value: 1200, suffix: '+', label: 'طالب وطالبة', label_en: 'Students' },
    { icon: 'chalkboard-user', value: 80, suffix: '+', label: 'معلم ومعلمة', label_en: 'Teachers' },
    { icon: 'trophy', value: 30, suffix: '+', label: 'نشاط وبطولة', label_en: 'Activities & tournaments' },
  ],

  // --- Features (cards + rich dialog) ----------------------------------------
  features: {
    items: [
      {
        icon: 'book-open',
        title: 'مناهج متطورة',
        title_en: 'Modern Curricula',
        text: 'نستخدم أحدث المناهج التعليمية المطورة لمواكبة التطورات العالمية في مجال التعليم.',
        text_en: 'We use the latest developed curricula to keep pace with global advances in education.',
        accent: ['#1e88e5', '#43a047'],
        tagline: 'تعلّم يصنع الفهم لا الحفظ',
        tagline_en: 'Learning that builds understanding, not memorisation',
        overview:
          'المناهج المتطورة تجمع بين الأسس الأكاديمية الراسخة وأحدث أساليب التعلّم النشط، لتنمّي لدى الطالب الفهم العميق ومهارات التفكير الناقد وحل المشكلات بدلاً من الحفظ والتلقين.',
        overview_en:
          'Our advanced curricula combine solid academic foundations with the latest active-learning methods, building deep understanding and critical-thinking and problem-solving skills rather than rote memorisation.',
        support: [
          'نطوّر خططنا الدراسية باستمرار لتواكب المعايير العالمية الحديثة',
          'نعتمد التعلّم بالمشروعات والأنشطة التطبيقية داخل الفصل',
          'نتابع تقدّم كل طالب عبر تقييمات مستمرة وتغذية راجعة فورية',
        ],
        support_en: [
          'We continuously update our study plans to match modern global standards',
          'We use project-based learning and hands-on activities in class',
          'We track each student’s progress with continuous assessment and instant feedback',
        ],
      },
      {
        icon: 'laptop-code',
        title: 'تقنية المعلومات',
        title_en: 'Information Technology',
        text: 'تجهيزات حديثة في مجال الحاسوب والتكنولوجيا لتنمية مهارات الطلاب الرقمية.',
        text_en: 'Modern computer and technology equipment to develop students’ digital skills.',
        accent: ['#1565c0', '#42a5f5'],
        tagline: 'مهارات رقمية لجيل المستقبل',
        tagline_en: 'Digital skills for the next generation',
        overview:
          'تمنح تقنية المعلومات الطلاب المهارات الرقمية التي أصبحت ضرورة في كل مجال؛ من أساسيات البرمجة والتفكير المنطقي إلى الاستخدام الآمن والمسؤول للإنترنت والأدوات الحديثة.',
        overview_en:
          'Information technology gives students the digital skills now essential in every field — from programming basics and logical thinking to safe, responsible use of the internet and modern tools.',
        support: [
          'معامل حاسوب مجهّزة بأحدث الأجهزة والبرمجيات',
          'دروس برمجة ومهارات رقمية ضمن الجدول الأسبوعي',
          'دمج الأدوات التعليمية التفاعلية في شرح جميع المواد',
        ],
        support_en: [
          'Computer labs equipped with the latest hardware and software',
          'Coding and digital-skills lessons within the weekly schedule',
          'Interactive learning tools integrated across all subjects',
        ],
      },
      {
        icon: 'users',
        title: 'بيئة متميزة',
        title_en: 'Outstanding Environment',
        text: 'بيئة تعليمية آمنة ومحفزة تدفع الطلاب نحو التفوق والنجاح.',
        text_en: 'A safe, motivating learning environment that drives students toward excellence.',
        accent: ['#00897b', '#43a047'],
        tagline: 'بيئة آمنة تبني الثقة والانتماء',
        tagline_en: 'A safe environment that builds trust and belonging',
        overview:
          'البيئة المدرسية المتميزة هي الأساس الذي ينمو فيه الطالب بثقة؛ مساحات آمنة ومحفّزة تشجّع على التعاون والاحترام والانتماء، وتجعل من المدرسة مكاناً يحبّه الطلاب.',
        overview_en:
          'An outstanding school environment is the foundation on which a student grows with confidence — safe, motivating spaces that encourage cooperation, respect and belonging, making school a place students love.',
        support: [
          'فصول واسعة ومرافق آمنة تخضع لمتابعة دورية',
          'رعاية طبية وإشراف تربوي طوال اليوم الدراسي',
          'برامج لبناء القيم والمواطنة وروح العمل الجماعي',
        ],
        support_en: [
          'Spacious classrooms and safe facilities under regular review',
          'Medical care and educational supervision throughout the school day',
          'Programmes that build values, citizenship and teamwork',
        ],
      },
      {
        icon: 'running',
        title: 'أنشطة رياضية',
        title_en: 'Sports Activities',
        text: 'نهتم بالأنشطة الرياضية والتنافسية لتنمية روح الفريق والصحة الجيدة.',
        text_en: 'We care about sports and competitions to build team spirit and good health.',
        accent: ['#1e88e5', '#26c6da'],
        tagline: 'جسد سليم وروح فريق',
        tagline_en: 'A healthy body and team spirit',
        overview:
          'الرياضة جزء أساسي من بناء شخصية الطالب؛ فهي تنمّي اللياقة والانضباط وروح الفريق، وتعلّمه كيف يفوز ويخسر بأخلاق عالية، وتمنحه طاقة إيجابية تنعكس على تحصيله الدراسي.',
        overview_en:
          'Sport is an essential part of building a student’s character; it develops fitness, discipline and team spirit, teaches winning and losing with good sportsmanship, and brings positive energy that reflects on academic achievement.',
        support: [
          'ملاعب وفرق مدرسية في كرة القدم والسلة وألعاب القوى',
          'حصص تربية بدنية منتظمة لجميع المراحل الدراسية',
          'بطولات داخلية ومسابقات ودية محفّزة بين الفصول',
        ],
        support_en: [
          'Pitches and school teams in football, basketball and athletics',
          'Regular physical-education classes for all stages',
          'Internal tournaments and friendly inter-class competitions',
        ],
      },
      {
        icon: 'palette',
        title: 'أنشطة فنية',
        title_en: 'Arts Activities',
        text: 'ورش عمل فنية وموسيقية لتنمية المواهب الإبداعية لدى الطلاب.',
        text_en: 'Art and music workshops to develop students’ creative talents.',
        accent: ['#43a047', '#7cb342'],
        tagline: 'إبداع بلا حدود',
        tagline_en: 'Creativity without limits',
        overview:
          'الفنون تطلق العنان لخيال الطالب وتمنحه وسيلة للتعبير عن نفسه، وتنمّي لديه الإبداع والثقة والإحساس بالجمال، وتوازن بين الجانب الأكاديمي والوجداني في شخصيته.',
        overview_en:
          'The arts unleash a student’s imagination and give them a means of self-expression, nurturing creativity, confidence and a sense of beauty, and balancing the academic and emotional sides of their character.',
        support: [
          'ورش رسم وموسيقى ومسرح يشرف عليها متخصصون',
          'معارض وحفلات فنية يعرض فيها الطلاب أعمالهم',
          'اكتشاف المواهب المبكرة وتنميتها على مدار العام',
        ],
        support_en: [
          'Drawing, music and theatre workshops led by specialists',
          'Exhibitions and art shows where students present their work',
          'Spotting and nurturing talent early throughout the year',
        ],
      },
      {
        icon: 'graduation-cap',
        title: 'إرشاد أكاديمي',
        title_en: 'Academic Guidance',
        text: 'متابعة مستمرة لمستوى الطلاب وتقديم الإرشاد الأكاديمي اللازم.',
        text_en: 'Continuous follow-up of students’ levels and the academic guidance they need.',
        accent: ['#1565c0', '#00897b'],
        tagline: 'مرافقة نحو مستقبل واثق',
        tagline_en: 'Guidance toward a confident future',
        overview:
          'الإرشاد الأكاديمي يرافق الطالب في رحلته التعليمية، فيساعده على فهم نقاط قوّته ووضع أهداف واضحة واتخاذ قرارات واثقة بشأن مساره ومستقبله الدراسي والمهني.',
        overview_en:
          'Academic guidance accompanies students throughout their learning journey, helping them understand their strengths, set clear goals and make confident decisions about their academic and professional future.',
        support: [
          'مرشد أكاديمي يتابع مستوى كل طالب باستمرار',
          'جلسات دعم فردية وخطط تحسين عند الحاجة',
          'تواصل دائم مع أولياء الأمور حول تقدّم أبنائهم',
        ],
        support_en: [
          'An academic advisor who continuously follows each student’s level',
          'One-to-one support sessions and improvement plans when needed',
          'Ongoing communication with parents about their children’s progress',
        ],
      },
    ],
  },

  // --- Admissions ------------------------------------------------------------
  admissions: {
    heading: 'القبول والمصروفات',
    heading_en: 'Admissions & Fees',
    intro:
      'يبدأ التقديم للعام الدراسي الجديد خلال شهر يونيو ويستمر لمدة شهر. نرحب بأبنائنا الجدد في جميع المراحل.',
    intro_en:
      'Applications for the new academic year open during June and run for one month. We welcome new students across all stages.',
    fees: [
      { grade: 'رياض الأطفال KG1', grade_en: 'Kindergarten KG1', amount: '13,700 ج.م', amount_en: 'EGP 13,700' },
      { grade: 'رياض الأطفال KG2', grade_en: 'Kindergarten KG2', amount: '13,700 ج.م', amount_en: 'EGP 13,700' },
    ],
    notes: [
      'المصروفات شاملة الكتب (قد تتغير من عام لآخر).',
      'سن القبول من ٦ سنوات إلا يوم، مع اجتياز المقابلة الشخصية.',
      'يشترط حضور الأب والأم مع الطفل في المقابلة.',
      'قسم الزهراء: رياض الأطفال والابتدائي — قسم السريات: الإعدادي والثانوي.',
      'الشهادة الممنوحة: الثانوية العامة المصرية.',
    ],
    notes_en: [
      'Fees include books (subject to change year to year).',
      'Admission age from 6 years, with a personal interview.',
      'Both parents must attend the interview with the child.',
      'Zahraa branch: KG & primary — Sariyat branch: prep & secondary.',
      'Certificate granted: Egyptian General Secondary Certificate.',
    ],
  },

  // --- Contact ---------------------------------------------------------------
  contact: {
    address: '22 ش 82، المعادى, Maadi, Cairo Governorate 4212201',
    address_en: '22 St. 82, Maadi, Cairo Governorate 4212201',
    phone: '0223584021',
    email: 'canalschools2000@yahoo.com',
    // Only icons with a real http(s) link are shown. Add them from the admin panel.
    socials: { facebook: '', twitter: '', instagram: '', youtube: '' },
  },

  // --- Footer ----------------------------------------------------------------
  footer: {
    tagline: 'نلتزم بتقديم أفضل تعليم لأبنائنا الطلاب',
    tagline_en: 'Committed to providing the best education for our students',
    copyright: 'جميع الحقوق محفوظة © 2026 مدرسة القناة بالمعادي',
    copyright_en: 'All rights reserved © 2026 Maadi Canal School',
  },

  // --- Section order + visibility (the "blueprint") --------------------------
  // The home page renders these in order, skipping any with enabled=false.
  // Reorder / toggle them from the admin "Sections" tab.
  sections: [
    { id: 'home', enabled: true },
    { id: 'about', enabled: true },
    { id: 'stages', enabled: true },
    { id: 'admissions', enabled: true },
    { id: 'stats', enabled: true },
    { id: 'news', enabled: true },
    { id: 'gallery', enabled: true },
    { id: 'features', enabled: true },
    { id: 'staff', enabled: true },
    { id: 'testimonials', enabled: true },
    { id: 'contact', enabled: true },
  ],
};

// --- Sample list content (all editable / deletable from the admin panel) -----
export const defaultNews = [
  {
    title: 'بدء التقديم للعام الدراسي الجديد',
    title_en: 'Admissions are now open',
    body: 'يسر مدرسة القناة بالمعادي أن تعلن عن فتح باب التقديم للعام الدراسي الجديد لجميع المراحل. سارعوا بالتسجيل لحجز مكان لأبنائكم.',
    body_en: 'Maadi Canal School is pleased to announce that admissions for the new academic year are now open for all stages. Register early to reserve a place.',
    date: '2026-06-01',
  },
  {
    title: 'انطلاق الأنشطة الصيفية',
    title_en: 'Summer activities kick off',
    body: 'تنطلق الأنشطة الصيفية من رياضة وفنون ومسرح وورش علمية لتنمية مواهب طلابنا خلال العطلة.',
    body_en: 'Our summer program of sports, arts, theatre and science workshops begins, nurturing our students’ talents over the break.',
    date: '2026-05-20',
  },
  {
    title: 'تكريم أوائل الطلبة',
    title_en: 'Honouring top students',
    body: 'احتفلت المدرسة بتكريم الطلاب المتفوقين تقديراً لتميزهم الأكاديمي وجهودهم المتواصلة طوال العام.',
    body_en: 'The school celebrated its top-performing students in recognition of their academic excellence and continuous effort throughout the year.',
    date: '2026-04-28',
  },
];

export const defaultTestimonials = [
  {
    name: 'عمر خالد',
    name_en: 'Omar Khaled',
    relation: 'طالب — مطوّر الموقع',
    relation_en: 'Student — Website Developer',
    quote: 'مدرستي مكان رائع تعلّمت فيه الكثير، ويسعدني أن أبني لها هذا الموقع بنفسي.',
    quote_en: 'My school is a wonderful place where I have learned so much — and I am proud to have built this website for it myself.',
    image: 'omar_khaled.jpeg',
  },
];

export const defaultStaff = [
  { name: 'أ. أحمد عبد الغني', name_en: 'Ahmed Abdelghany', role: 'مدير المدرسة', role_en: 'Principal' },
  { name: 'أ. بسنت جعفر', name_en: 'Bassant Gaffar', role: 'معلمة اللغة الإنجليزية', role_en: 'English Teacher' },
  { name: 'أ. أحمد جودة', name_en: 'Ahmed Gouda', role: 'معلم الرياضيات', role_en: 'Mathematics Teacher' },
  { name: 'أ. عادل الشاذلي', name_en: 'Adel ElShazly', role: 'معلم اللغة العربية', role_en: 'Arabic Teacher' },
];

// Gallery images bundled locally in /seed-assets (copied into /uploads on seed).
// Captions are bilingual; empty captions are fine. More of the school's real
// photos can be pulled in with:  npm run photos
export const defaultGallery = [
  { file: 'gallery1.jpeg', caption: 'مبنى المدرسة', caption_en: 'School building' },
  { file: 'gallery2.jpeg', caption: 'الفصول الدراسية', caption_en: 'Classrooms' },
  { file: 'gallery3.jpeg', caption: 'الأنشطة المدرسية', caption_en: 'School activities' },
  { file: 'gallery4.jpeg', caption: 'مرافق المدرسة', caption_en: 'School facilities' },
  { file: 'canal-photo-1.jpg', caption: '', caption_en: '' },
  { file: 'canal-photo-2.jpg', caption: '', caption_en: '' },
  { file: 'canal-photo-3.jpg', caption: '', caption_en: '' },
  { file: 'canal-photo-4.jpg', caption: '', caption_en: '' },
  { file: 'canal-photo-5.jpg', caption: '', caption_en: '' },
  { file: 'canal-photo-6.jpg', caption: '', caption_en: '' },
  { file: 'canal-photo-7.jpg', caption: '', caption_en: '' },
  { file: 'canal-photo-8.jpg', caption: '', caption_en: '' },
  { file: 'canal-photo-9.jpg', caption: '', caption_en: '' },
];
