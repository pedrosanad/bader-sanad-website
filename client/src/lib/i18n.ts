export type Language = "en" | "ar";

export const translations = {
  en: {
    nav: {
      portfolio: "Portfolio",
      packages: "Packages",
      about: "About",
      bookSession: "Book Session",
      categories: {
        portrait: "Portrait",
        events: "Events",
        commercial: "Commercial",
        headshots: "Headshots",
      },
    },
    hero: {
      title: "Capturing Your Story",
      subtitle:
        "Professional photography that tells your unique story. From portraits to events, every moment deserves to be beautifully preserved.",
      bookSession: "Book a Session",
      viewPortfolio: "View Portfolio",
    },
    portfolio: {
      title: "Portfolio",
      subtitle:
        "Explore my work across different photography styles. Each category showcases my dedication to capturing beautiful, authentic moments.",
    },
    categories: {
      portrait: {
        title: "Portrait",
        description:
          "Professional portrait photography capturing your unique personality and style in any setting.",
      },
      events: {
        title: "Events",
        description:
          "Beautiful event coverage from weddings and parties to corporate gatherings and celebrations.",
      },
      commercial: {
        title: "Commercial",
        description:
          "High-quality commercial photography for products, brands, and marketing campaigns.",
      },
      headshots: {
        title: "Headshots",
        description:
          "Professional headshots for your LinkedIn, company website, or personal branding needs.",
      },
    },
    categoryCard: {
      viewGallery: "View Gallery",
      bookSession: "Book Session",
    },
    about: {
      title: "About the Photographer",
      p1: "With over a decade of experience behind the lens, I specialize in capturing authentic moments that tell your unique story. Whether it's a corporate headshot, a family portrait, or a once-in-a-lifetime event, I bring the same level of dedication and artistry to every session.",
      p2: "My approach combines technical expertise with a genuine connection to my subjects. I believe that the best photographs come from a place of trust and comfort, which is why I take the time to understand your vision before we even pick up the camera.",
      bookSession: "Book Your Session",
      stats: {
        sessions: "Sessions Completed",
        clients: "Happy Clients",
        experience: "Years Experience",
        passion: "Passion",
      },
    },
    cta: {
      title: "Ready to Create Something Beautiful?",
      subtitle:
        "Let's work together to capture your story. Book a session today and let's create memories that will last a lifetime.",
      bookNow: "Book Your Session Now",
    },
    packages: {
      title: "Session Packages",
      subtitle:
        "Choose the package that best suits your needs. All sessions include professional editing and digital delivery.",
      premium: {
        title: "Premium Package",
        features: [
          "Flexible shooting time until we finish",
          "Multiple outfits and looks",
          "5 professionally edited photos",
          "All photos delivered via link",
        ],
        book: "Book Premium Package",
      },
      standard: {
        title: "Standard Package",
        features: [
          "1 hour shooting time",
          "Multiple outfits and looks",
          "3 professionally edited photos",
          "All photos delivered via link",
        ],
        book: "Book Standard Package",
      },
      cancellation: {
        title: "Cancellation Policy",
        intro:
          "We understand that plans can change. Please review our cancellation policy below:",
        rules: [
          { label: "48+ hours notice:", text: "Full refund or free rescheduling" },
          { label: "24-48 hours notice:", text: "50% refund or rescheduling with fee" },
          { label: "Less than 24 hours:", text: "No refund available" },
        ],
        note: "To cancel or reschedule your session, please contact us via WhatsApp at least 48 hours before your scheduled appointment.",
      },
    },
    booking: {
      title: "Book Your Session",
      subtitle:
        "Ready to capture your special moments? Fill out the form below to schedule your photography session.",
      back: "Back to Home",
      backPortfolio: "Back to Portfolio",
    },
    bookingForm: {
      step1: { title: "Choose Your Session", desc: "Select the type of photography session you need" },
      step2: { title: "Select Date & Time", desc: "Choose when you would like to have your session" },
      step3: { title: "Your Details", desc: "Tell us how to reach you" },
      sessionTypes: {
        portrait: "Portrait Session",
        events: "Event Photography",
        commercial: "Commercial Shoot",
        headshots: "Professional Headshots",
      },
      fields: {
        name: "Full Name",
        namePlaceholder: "Your full name",
        phone: "Phone (WhatsApp)",
        phonePlaceholder: "+966 5XX XXX XXXX",
        session: "Session Type",
        sessionPlaceholder: "Select session type",
        message: "Special Requests (Optional)",
        messagePlaceholder: "Any specific requirements or ideas for your session...",
      },
      buttons: {
        continue: "Continue",
        back: "Back",
        confirm: "Confirm Booking",
        booking: "Booking...",
      },
      success: {
        title: "Booking Confirmed!",
        message:
          "Thank you for booking a session. We will contact you via WhatsApp shortly with all the details.",
        session: "Session:",
        date: "Date:",
        time: "Time:",
        name: "Name:",
      },
      errors: {
        missing: "Missing Information",
        missingDesc: "Please fill in all required fields.",
        failed: "Booking Failed",
        failedDesc: "There was an error creating your booking. Please try again.",
      },
    },
    footer: {
      tagline:
        "Professional photography capturing life's precious moments. Specializing in portraits, events, commercial, and headshot photography.",
      quickLinks: "Quick Links",
      links: {
        portrait: "Portrait Gallery",
        events: "Event Photography",
        commercial: "Commercial Work",
        booking: "Book a Session",
      },
      contact: "Contact",
      location: "Kingdom of Saudi Arabia",
      copyright: "2024 Bader Sanad Photography. All rights reserved.",
    },
    admin: "Admin",
  },
  ar: {
    nav: {
      portfolio: "معرض الأعمال",
      packages: "الباقات",
      about: "من أنا",
      bookSession: "احجز جلسة",
      categories: {
        portrait: "بورتريه",
        events: "فعاليات",
        commercial: "تجاري",
        headshots: "صور احترافية",
      },
    },
    hero: {
      title: "نحكي قصتك بالصورة",
      subtitle:
        "تصوير احترافي يعكس شخصيتك الفريدة. من البورتريه إلى الفعاليات، كل لحظة تستحق أن تُخلَّد.",
      bookSession: "احجز جلسة",
      viewPortfolio: "شاهد الأعمال",
    },
    portfolio: {
      title: "معرض الأعمال",
      subtitle:
        "استعرض أعمالي في مختلف أنواع التصوير. كل تصنيف يعكس شغفي بالتقاط اللحظات الجميلة والأصيلة.",
    },
    categories: {
      portrait: {
        title: "بورتريه",
        description: "تصوير بورتريه احترافي يبرز شخصيتك الفريدة وأسلوبك في أي مكان.",
      },
      events: {
        title: "فعاليات",
        description:
          "تغطية مميزة للفعاليات من حفلات الأعراس والحفلات إلى التجمعات والاحتفالات.",
      },
      commercial: {
        title: "تجاري",
        description:
          "تصوير تجاري عالي الجودة للمنتجات والعلامات التجارية وحملات التسويق.",
      },
      headshots: {
        title: "صور احترافية",
        description:
          "صور احترافية لـ LinkedIn وموقع شركتك أو علامتك التجارية الشخصية.",
      },
    },
    categoryCard: {
      viewGallery: "عرض المعرض",
      bookSession: "احجز جلسة",
    },
    about: {
      title: "عن المصور",
      p1: "بخبرة تمتد لأكثر من عقد خلف العدسة، أتخصص في التقاط اللحظات الأصيلة التي تحكي قصتك الفريدة. سواء كانت صورة احترافية أو بورتريه عائلي أو حدث لا يُنسى، أبذل نفس الجهد والإتقان في كل جلسة.",
      p2: "أسلوبي يجمع بين الخبرة التقنية والتواصل الحقيقي مع العملاء. أؤمن بأن أفضل الصور تولد من الثقة والارتياح، ولذلك أحرص على فهم رؤيتك قبل أن نبدأ التصوير.",
      bookSession: "احجز جلستك",
      stats: {
        sessions: "جلسة مكتملة",
        clients: "عميل سعيد",
        experience: "سنوات خبرة",
        passion: "شغف",
      },
    },
    cta: {
      title: "مستعد لنصنع شيئاً جميلاً؟",
      subtitle:
        "لنعمل معاً لالتقاط قصتك. احجز جلسة اليوم ونصنع ذكريات تدوم مدى الحياة.",
      bookNow: "احجز جلستك الآن",
    },
    packages: {
      title: "الباقات",
      subtitle:
        "اختر الباقة التي تناسب احتياجاتك. جميع الجلسات تشمل التحرير الاحترافي والتسليم الرقمي.",
      premium: {
        title: "الباقة المميزة",
        features: [
          "وقت تصوير مرن حتى ننتهي",
          "إطلالات وأزياء متعددة",
          "5 صور محررة احترافياً",
          "جميع الصور تُسلَّم عبر رابط",
        ],
        book: "احجز الباقة المميزة",
      },
      standard: {
        title: "الباقة الأساسية",
        features: [
          "ساعة تصوير",
          "إطلالات وأزياء متعددة",
          "3 صور محررة احترافياً",
          "جميع الصور تُسلَّم عبر رابط",
        ],
        book: "احجز الباقة الأساسية",
      },
      cancellation: {
        title: "سياسة الإلغاء",
        intro: "نفهم أن الخطط قد تتغير. يرجى مراجعة سياسة الإلغاء:",
        rules: [
          { label: "إشعار قبل 48 ساعة أو أكثر:", text: "استرداد كامل أو إعادة جدولة مجانية" },
          { label: "إشعار بين 24 و48 ساعة:", text: "استرداد 50% أو إعادة الجدولة برسوم" },
          { label: "أقل من 24 ساعة:", text: "لا يوجد استرداد" },
        ],
        note: "للإلغاء أو إعادة الجدولة، يرجى التواصل معنا عبر واتساب قبل 48 ساعة على الأقل من موعدك.",
      },
    },
    booking: {
      title: "احجز جلستك",
      subtitle:
        "هل أنت مستعد لالتقاط لحظاتك الخاصة؟ املأ النموذج أدناه لحجز جلسة التصوير.",
      back: "العودة للرئيسية",
      backPortfolio: "العودة للمعرض",
    },
    bookingForm: {
      step1: { title: "اختر نوع الجلسة", desc: "حدد نوع جلسة التصوير التي تحتاجها" },
      step2: { title: "اختر التاريخ والوقت", desc: "حدد موعد جلستك" },
      step3: { title: "بياناتك", desc: "أخبرنا كيف نتواصل معك" },
      sessionTypes: {
        portrait: "جلسة بورتريه",
        events: "تصوير فعاليات",
        commercial: "تصوير تجاري",
        headshots: "صور احترافية",
      },
      fields: {
        name: "الاسم الكامل",
        namePlaceholder: "اسمك الكامل",
        phone: "الجوال (واتساب)",
        phonePlaceholder: "+966 5XX XXX XXXX",
        session: "نوع الجلسة",
        sessionPlaceholder: "اختر نوع الجلسة",
        message: "طلبات خاصة (اختياري)",
        messagePlaceholder: "أي متطلبات أو أفكار خاصة بجلستك...",
      },
      buttons: {
        continue: "التالي",
        back: "السابق",
        confirm: "تأكيد الحجز",
        booking: "جاري الحجز...",
      },
      success: {
        title: "تم تأكيد الحجز!",
        message:
          "شكراً لحجزك جلسة. سنتواصل معك عبر واتساب قريباً بجميع التفاصيل.",
        session: "الجلسة:",
        date: "التاريخ:",
        time: "الوقت:",
        name: "الاسم:",
      },
      errors: {
        missing: "معلومات ناقصة",
        missingDesc: "يرجى ملء جميع الحقول المطلوبة.",
        failed: "فشل الحجز",
        failedDesc: "حدث خطأ في إنشاء حجزك. يرجى المحاولة مرة أخرى.",
      },
    },
    footer: {
      tagline:
        "تصوير احترافي يخلّد أجمل لحظات حياتك. متخصص في البورتريه والفعاليات والتصوير التجاري والصور الاحترافية.",
      quickLinks: "روابط سريعة",
      links: {
        portrait: "معرض البورتريه",
        events: "تصوير الفعاليات",
        commercial: "الأعمال التجارية",
        booking: "احجز جلسة",
      },
      contact: "تواصل معنا",
      location: "المملكة العربية السعودية",
      copyright: "2024 بدر سند للتصوير. جميع الحقوق محفوظة.",
    },
    admin: "الإدارة",
  },
} as const;

export type Translations = typeof translations.en;
