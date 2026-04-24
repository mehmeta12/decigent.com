import { useEffect, useMemo, useState } from "react";

type Lang = "tr" | "en";
type Page =
  | "Ana Sayfa"
  | "Hizmetler"
  | "Çözümler"
  | "Use Cases"
  | "Biz Kimiz"
  | "Blog"
  | "İletişim";

const navItems: Page[] = [
  "Ana Sayfa",
  "Hizmetler",
  "Çözümler",
  "Use Cases",
  "About",
  "Blog",
  "Contact",
];

const copy = {
  tr: {
    home: "Ana Sayfa",
    services: "Hizmetler",
    solutions: "Çözümler",
    useCases: "Use Cases",
    about: "About",
    blog: "Blog",
    contact: "Contact",
    ctaMeet: "Görüşme Planla",
    heroBadge: "Kurumsal kararlar ve operasyonlar için yapay zekâ",
    heroTitle: "Kurumsal kararlar ve operasyonlar için akıllı AI çözümleri",
    heroText:
      "Decigent, yapay zekâ destekli ajanik iş akışları temelli kurumsal uygulama çözümleri geliştirir. Hedefimiz, kurumların daha hızlı karar almasını, süreçlerini daha akıllı yönetmesini ve somut iş değeri üretmesini sağlamaktır.",
    reviewSolutions: "Çözümleri İncele",
    quickPilot: "Hızlı pilot",
    quickPilotText: "90 gün içinde ölçülebilir değer",
    controlledAI: "Kontrollü AI",
    controlledAIText: "İnsan onayı ve izlenebilirlik",
    enterpriseFit: "Kurumsal uyum",
    enterpriseFitText: "Mevcut süreçlerle entegre yaklaşım",
    decisionEngine: "Decigent Decision Engine",
    step1: "Veri kaynaklarını birleştir",
    step2: "Kritik sinyalleri tespit et",
    step3: "Karar önerisi oluştur",
    step4: "İnsan onayı ile aksiyona dönüştür",
    approach: "Temel yaklaşım",
    delivery: "Teslim modeli",
    deliveryValue: "Pilot → ölçekleme → ürünleşme",
    servicesEyebrow: "Hizmetler",
    servicesTitle: "Nasıl çalışıyoruz?",
    servicesText:
      "Decigent, kurumlara AI dönüşümünü başlatmak ve ölçeklemek için uçtan uca hizmetler sunar.",
    solutionsEyebrow: "Çözümler",
    solutionsTitle: "Ne inşa ediyoruz?",
    solutionsText:
      "Kurumsal karar ve operasyon süreçlerini dönüştüren yapay zekâ çözümleri.",
    useCasesEyebrow: "Use Cases",
    useCasesTitle: "Öncelikli kurumsal kullanım senaryoları",
    useCasesText:
      "İlk aşamada hızlı değer üretmeye en uygun alanları hedefliyoruz. Bu örnekler, farklı sektörlerde uygulanabilecek yapıların temsilidir.",
    talkThisUseCase: "Bu Use Case'i Konuşalım",
    aboutEyebrow: "About",
    aboutTitle: "Decigent hakkında",
    aboutText:
      "Decigent, kurumların karar alma ve operasyon yetkinliklerini yapay zekâ ile güçlendirmeye odaklanan bağımsız bir girişimdir.",
    mission: "Misyon",
    missionText:
      "Kurumların yapay zekâyı sadece deneme amaçlı değil, gerçek karar kalitesi ve operasyonel verim artışı sağlayacak şekilde kullanmasına yardımcı olmak.",
    vision: "Vizyon",
    visionText:
      "Türkiye'den çıkan, saygın, etkili ve iş dünyasında güven oluşturan bir kurumsal AI çözüm şirketi olmak.",
    blogEyebrow: "Blog",
    blogTitle: "İçgörüler, notlar ve uygulama deneyimleri",
    blogText:
      "Decigent blog, kurumsal AI dönüşümüne dair stratejik bakış, uygulama notları ve yönetsel içgörüler paylaşmak için tasarlanmıştır.",
    searchPosts: "Yazılarda ara...",
    readOnLinkedIn: "LinkedIn'de Oku",
    contactEyebrow: "Contact",
    contactTitle: "Bir AI kullanım alanını birlikte netleştirelim",
    contactText:
      "İlk görüşmede iş hedefinizi, öncelikli kullanım senaryonuzu ve en hızlı değer üretme yolunu birlikte değerlendiriyoruz.",
    contactForm: "İletişim formu",
    contactFormText:
      "Form gönderildiğinde varsayılan mail uygulamanız açılır ve mesajınız otomatik olarak doldurulur.",
    name: "Ad Soyad",
    company: "Şirket",
    email: "E-posta",
    phone: "Telefon",
    messagePlaceholder: "Kısa ihtiyaç tanımınızı yazın",
    send: "Mesaj Gönder",
    emailLabel: "E-posta",
    phoneLabel: "Telefon",
    addressLabel: "Adres",
    recommended: "Önerilen ilk adım",
    recommendedText:
      "Önce tek bir yüksek etkili kullanım alanı seçelim. Sonra veri gereksinimi, iş akışı ve pilot kapsamını birlikte netleştirelim.",
    menu: "Menü",
    contactInfo: "İletişim",
    footerTag: "Intelligent decisions and operations",
    rights: "Tüm hakları saklıdır.",
    linkedIn: "LinkedIn",
    prefMessage:
      "Merhaba, {title} use case'i ile ilgileniyorum. Bu çözüm için detaylı bilgi almak ve kısa bir görüşme planlamak istiyorum.",
  },
  en: {
    home: "Home",
    services: "Services",
    solutions: "Solutions",
    useCases: "Use Cases",
    about: "About",
    blog: "Blog",
    contact: "Contact",
    ctaMeet: "Schedule a Meeting",
    heroBadge: "AI for enterprise decisions and operations",
    heroTitle: "Smart AI solutions for enterprise decisions and operations",
    heroText:
      "Decigent develops enterprise application solutions built on AI-powered agentic workflows. Our goal is to help organizations make faster decisions, run smarter processes, and generate measurable business value.",
    reviewSolutions: "Explore Solutions",
    quickPilot: "Fast pilot",
    quickPilotText: "Measurable value within 90 days",
    controlledAI: "Controlled AI",
    controlledAIText: "Human approval and traceability",
    enterpriseFit: "Enterprise fit",
    enterpriseFitText: "Integrated with existing processes",
    decisionEngine: "Decigent Decision Engine",
    step1: "Unify data sources",
    step2: "Detect critical signals",
    step3: "Generate decision recommendations",
    step4: "Turn into action with human approval",
    approach: "Core approach",
    delivery: "Delivery model",
    deliveryValue: "Pilot → scale → productization",
    servicesEyebrow: "Services",
    servicesTitle: "How we work",
    servicesText:
      "Decigent provides end-to-end services to launch and scale AI transformation in enterprises.",
    solutionsEyebrow: "Solutions",
    solutionsTitle: "What we build",
    solutionsText:
      "AI solutions that transform enterprise decision and operational processes.",
    useCasesEyebrow: "Use Cases",
    useCasesTitle: "Priority enterprise use cases",
    useCasesText:
      "We focus first on the areas most suitable for rapid value creation. These examples represent structures that can be applied across sectors.",
    talkThisUseCase: "Let's discuss this use case",
    aboutEyebrow: "About",
    aboutTitle: "About Decigent",
    aboutText:
      "Decigent is an independent venture focused on strengthening enterprise decision-making and operational capabilities with AI.",
    mission: "Mission",
    missionText:
      "To help organizations use AI not just for experimentation, but to create real improvements in decision quality and operational efficiency.",
    vision: "Vision",
    visionText:
      "To become a respected and effective enterprise AI solutions company emerging from Türkiye.",
    blogEyebrow: "Blog",
    blogTitle: "Insights, notes and implementation experience",
    blogText:
      "The Decigent blog is designed to share strategic perspectives, implementation notes, and executive insights on enterprise AI transformation.",
    searchPosts: "Search posts...",
    readOnLinkedIn: "Read on LinkedIn",
    contactEyebrow: "Contact",
    contactTitle: "Let's clarify your AI opportunity together",
    contactText:
      "In the first conversation, we evaluate your business objective, priority use case, and the fastest path to measurable value.",
    contactForm: "Contact form",
    contactFormText:
      "When the form is submitted, your default mail app opens and the message is auto-filled.",
    name: "Full Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    messagePlaceholder: "Write a short description of your need",
    send: "Send Message",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",
    recommended: "Recommended first step",
    recommendedText:
      "Let's first select one high-impact use case. Then we can clarify the data requirements, workflow, and pilot scope together.",
    menu: "Menu",
    contactInfo: "Contact",
    footerTag: "Intelligent decisions and operations",
    rights: "All rights reserved.",
    linkedIn: "LinkedIn",
    prefMessage:
      "Hello, I am interested in the use case: {title}. I would like to learn more and schedule a short meeting.",
  },
} as const;

const services = {
  tr: [
    {
      title: "Ajanik İş Akışları",
      description:
        "Tekrarlayan ve karar gerektiren iş süreçlerini kontrollü, izlenebilir ve ölçülebilir AI iş akışlarına dönüştürüyoruz.",
    },
    {
      title: "Karar Destek Çözümleri",
      description:
        "Yöneticilerin daha hızlı, daha tutarlı ve veri destekli karar almasını sağlayan kurumsal çözümler geliştiriyoruz.",
    },
    {
      title: "Kurumsal Copilotlar",
      description:
        "Satış, operasyon, satın alma, İK ve yönetim ekipleri için role özel yapay zekâ asistanları tasarlıyoruz.",
    },
    {
      title: "Veri ve İçgörü Katmanı",
      description:
        "Dağınık verileri anlamlı içgörülere dönüştüren sorgulama, özetleme ve aksiyon katmanı kuruyoruz.",
    },
    {
      title: "AI Governance",
      description:
        "Yetki, insan onayı, izlenebilirlik ve güvenli kullanım gereksinimlerini çözüm tasarımının merkezine yerleştiriyoruz.",
    },
    {
      title: "Pilot ve Ölçekleme",
      description:
        "Hızlı pilotlarla değeri kanıtlıyor, ardından kurumsal ölçekte yaygınlaştırma planı oluşturuyoruz.",
    },
  ],
  en: [
    {
      title: "Agentic Workflows",
      description:
        "We transform repetitive and decision-heavy business processes into controlled, traceable, and measurable AI workflows.",
    },
    {
      title: "Decision Support Solutions",
      description:
        "We build enterprise solutions that enable executives to make faster, more consistent, and data-driven decisions.",
    },
    {
      title: "Enterprise Copilots",
      description:
        "We design role-specific AI assistants for sales, operations, procurement, HR, and executive teams.",
    },
    {
      title: "Data and Insight Layer",
      description:
        "We build a layer that turns fragmented data into meaningful insights, querying, summarization, and action.",
    },
    {
      title: "AI Governance",
      description:
        "We place authorization, human approval, traceability, and safe usage requirements at the center of solution design.",
    },
    {
      title: "Pilot and Scaling",
      description:
        "We prove value with fast pilots and then define a scaling roadmap at enterprise level.",
    },
  ],
};

const solutions = {
  tr: [
    {
      title: "Yönetim Raporu ve Aksiyon Copilotu",
      sector: "Üretim",
      description:
        "Yöneticilere dağınık operasyon verilerini özetler, kritik sapmaları işaretler ve önerilen aksiyonları sunar.",
      bullets: [
        "Haftalık özet",
        "Sapma alarmı",
        "Aksiyon önerisi",
        "Yönetici görünümü",
      ],
    },
    {
      title: "Teklif ve Müşteri Yanıt Ajanı",
      sector: "Satış",
      description:
        "Teklif hazırlama, müşteri sorularını yanıtlama ve satış ekibinin yanıt hızını artırma için kullanılır.",
      bullets: [
        "Teklif taslağı",
        "Hızlı yanıtlama",
        "CRM özeti",
        "Fırsat takibi",
      ],
    },
    {
      title: "Tedarikçi Karşılaştırma ve Onay Akışı",
      sector: "Satın Alma",
      description:
        "Teklifleri kıyaslar, risk noktalarını işaretler ve onay süreçlerini hızlandırır.",
      bullets: ["Karşılaştırma", "Risk analizi", "Onay akışı", "Kayıt"],
    },
    {
      title: "İK Talep ve Politika Asistanı",
      sector: "İK",
      description:
        "İç prosedür ve politikalar üzerinden çalışan sorularını yanıtlayan güvenli kurumsal asistan sunar.",
      bullets: ["Politika Q&A", "Self-service", "Loglama", "Doküman erişimi"],
    },
  ],
  en: [
    {
      title: "Management Reporting and Action Copilot",
      sector: "Manufacturing",
      description:
        "Summarizes fragmented operational data for executives, highlights critical deviations, and presents recommended actions.",
      bullets: [
        "Weekly summary",
        "Deviation alerts",
        "Action suggestions",
        "Executive view",
      ],
    },
    {
      title: "Proposal and Customer Response Agent",
      sector: "Sales",
      description:
        "Used to prepare proposals, answer customer questions, and improve sales response speed.",
      bullets: [
        "Proposal draft",
        "Fast responses",
        "CRM summary",
        "Opportunity tracking",
      ],
    },
    {
      title: "Supplier Comparison and Approval Flow",
      sector: "Procurement",
      description:
        "Compares bids, flags risk points, and accelerates approval processes.",
      bullets: ["Comparison", "Risk analysis", "Approval flow", "Audit trail"],
    },
    {
      title: "HR Request and Policy Assistant",
      sector: "HR",
      description:
        "Provides a secure enterprise assistant that answers employee questions based on internal procedures and policies.",
      bullets: ["Policy Q&A", "Self-service", "Logging", "Document access"],
    },
  ],
};

const useCasesList = {
  tr: [
    "Yönetim ekipleri için hızlı özet ve karar desteği",
    "Satış ekipleri için teklif ve yanıt otomasyonu",
    "Satın alma süreçlerinde teklif kıyaslama ve onay hızlandırma",
    "Kurumsal bilgi tabanı üzerinden güvenli çalışan asistanları",
    "Operasyon verilerinden anomali tespiti ve aksiyon önerisi",
    "Web ve WhatsApp tabanlı destek asistanları",
  ],
  en: [
    "Fast summaries and decision support for management teams",
    "Proposal and response automation for sales teams",
    "Bid comparison and faster approvals in procurement",
    "Secure employee assistants on top of enterprise knowledge bases",
    "Anomaly detection and action suggestions from operational data",
    "Web and WhatsApp based support assistants",
  ],
};

const blogPosts = {
  tr: [
    {
      category: "Bakış Açısı",
      title: "Agentic AI neden kurumsal dönüşümün bir sonraki aşaması?",
      excerpt:
        "Kurumsal yapay zekâ kullanımının, tekil chatbotlardan kontrollü ajan tabanlı iş akışlarına neden evrildiğini anlatıyoruz.",
    },
    {
      category: "Uygulama",
      title: "Başarılı bir AI pilotu nasıl tasarlanır?",
      excerpt:
        "90 günlük bir pilotta hedef kapsam, veri gereksinimleri, insan kontrolü ve başarı ölçütleri nasıl tanımlanmalı?",
    },
    {
      category: "Yönetim",
      title: "Karar destek sistemlerinde güven ve izlenebilirlik",
      excerpt:
        "Kurumsal ortamlarda güvenli AI kullanımının temelinde açıklanabilirlik, yetki ve kayıt mekanizmaları yer alır.",
    },
  ],
  en: [
    {
      category: "Perspective",
      title: "Why is Agentic AI the next phase of enterprise transformation?",
      excerpt:
        "We explain why enterprise AI usage is evolving from standalone chatbots to controlled, agent-based workflows.",
    },
    {
      category: "Implementation",
      title: "How should a successful AI pilot be designed?",
      excerpt:
        "How should scope, data requirements, human control, and success metrics be defined in a 90-day pilot?",
    },
    {
      category: "Management",
      title: "Trust and traceability in decision support systems",
      excerpt:
        "Safe AI usage in enterprise environments is built on explainability, authorization, and recording mechanisms.",
    },
  ],
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#0f172a",
    fontFamily: "Inter, Arial, sans-serif",
  } as const,
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
  } as const,
  section: {
    padding: "72px 0",
  } as const,
  card: {
    border: "1px solid #e2e8f0",
    borderRadius: "24px",
    padding: "24px",
    background: "#ffffff",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
  } as const,
  muted: {
    color: "#475569",
    lineHeight: 1.7,
  } as const,
  buttonPrimary: {
    background: "#0f172a",
    color: "white",
    border: "none",
    borderRadius: "999px",
    padding: "12px 20px",
    cursor: "pointer",
    fontWeight: 600,
  } as const,
  buttonSecondary: {
    background: "white",
    color: "#0f172a",
    border: "1px solid #cbd5e1",
    borderRadius: "999px",
    padding: "12px 20px",
    cursor: "pointer",
    fontWeight: 600,
  } as const,
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div style={{ maxWidth: 760, marginBottom: 28 }}>
      <div
        style={{
          display: "inline-block",
          padding: "6px 12px",
          borderRadius: 999,
          background: "#f1f5f9",
          fontSize: 13,
          marginBottom: 16,
        }}
      >
        {eyebrow}
      </div>
      <h2 style={{ margin: "0 0 12px", fontSize: 36, lineHeight: 1.15 }}>
        {title}
      </h2>
      <p style={{ ...styles.muted, margin: 0 }}>{text}</p>
    </div>
  );
}

function LinkedInMark() {
  return (
    <span
      style={{
        display: "inline-flex",
        width: 16,
        height: 16,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3,
        background: "#0f172a",
        color: "white",
        fontSize: 10,
        fontWeight: 700,
      }}
    >
      in
    </span>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 16,
  border: "1px solid #cbd5e1",
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box",
};

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [currentPage, setCurrentPage] = useState<Page>("Ana Sayfa");
  const [blogQuery, setBlogQuery] = useState("");
  const [prefilledMessage, setPrefilledMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMobile = useIsMobile();

  const c = copy[lang];
  const currentServices = services[lang];
  const currentSolutions = solutions[lang];
  const currentUseCases = useCasesList[lang];
  const currentBlogPosts = blogPosts[lang];

  useEffect(() => {
    const saved = localStorage.getItem("decigent-lang") as Lang | null;
    if (saved === "tr" || saved === "en") {
      setLang(saved);
      return;
    }
    const browserLang = navigator.language.toLowerCase();
    setLang(browserLang.startsWith("tr") ? "tr" : "en");
  }, []);

  useEffect(() => {
    localStorage.setItem("decigent-lang", lang);
    document.documentElement.lang = lang;
    document.title =
      lang === "tr"
        ? "Decigent | Kurumsal AI Çözümleri ve Decision Intelligence"
        : "Decigent | Enterprise AI Solutions and Decision Intelligence";
  }, [lang]);

  useEffect(() => {
    const selected = sessionStorage.getItem("selectedUseCase");
    if (selected && currentPage === "Contact") {
      setPrefilledMessage(c.prefMessage.replace("{title}", selected));
      sessionStorage.removeItem("selectedUseCase");
    }
  }, [currentPage, c.prefMessage]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMobileMenuOpen(false);
  }, [isMobile]);

  const filteredPosts = useMemo(() => {
    return currentBlogPosts.filter((post) => {
      const haystack = `${post.category} ${post.title} ${post.excerpt}`.toLowerCase();
      return haystack.includes(blogQuery.toLowerCase());
    });
  }, [currentBlogPosts, blogQuery]);

  const pageLabel = (page: Page) => {
    switch (page) {
      case "Ana Sayfa":
        return c.home;
      case "Hizmetler":
        return c.services;
      case "Çözümler":
        return c.solutions;
      case "Use Cases":
        return c.useCases;
      case "About":
        return c.about;
      case "Blog":
        return c.blog;
      case "Contact":
        return c.contact;
    }
  };

  const navigateTo = (page: Page) => {
    setMobileMenuOpen(false);
    setCurrentPage(
      page === "Hizmetler" || page === "Çözümler" || page === "Use Cases"
        ? "Ana Sayfa"
        : page
    );

    setTimeout(() => {
      if (page === "Ana Sayfa") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (page === "Hizmetler") {
        document.getElementById("services-section")?.scrollIntoView({
          behavior: "smooth",
        });
      } else if (page === "Çözümler") {
        document.getElementById("solutions-section")?.scrollIntoView({
          behavior: "smooth",
        });
      } else if (page === "Use Cases") {
        document.getElementById("usecases-section")?.scrollIntoView({
          behavior: "smooth",
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 0);
  };

  const handleUseCaseContact = (title: string) => {
    sessionStorage.setItem("selectedUseCase", title);
    setCurrentPage("Contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const company = String(data.get("company") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(`Decigent Contact - ${name}`);
    const body = encodeURIComponent(
      `${c.name}: ${name}\n${c.company}: ${company}\n${c.email}: ${email}\n${c.phone}: ${phone}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:info@decigent.com?subject=${subject}&body=${body}`;
  };

  return (
    <div style={styles.page}>
      {/* ── HEADER ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            ...styles.container,
            minHeight: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            padding: isMobile ? "12px 16px" : "0 24px",
          }}
        >
          <button
            onClick={() => navigateTo("Ana Sayfa")}
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
          >
            <img src="/logo.png" alt="Decigent Logo" style={{ height: 36, width: "auto" }} />
          </button>

          {isMobile ? (
            /* Mobile: lang toggle + hamburger */
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  display: "flex",
                  border: "1px solid #cbd5e1",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setLang("tr")}
                  style={{
                    border: "none",
                    background: lang === "tr" ? "#0f172a" : "white",
                    color: lang === "tr" ? "white" : "#334155",
                    padding: "7px 11px",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  TR
                </button>
                <button
                  onClick={() => setLang("en")}
                  style={{
                    border: "none",
                    background: lang === "en" ? "#0f172a" : "white",
                    color: lang === "en" ? "white" : "#334155",
                    padding: "7px 11px",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  EN
                </button>
              </div>
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                style={{
                  border: "1px solid #cbd5e1",
                  borderRadius: 12,
                  background: "white",
                  width: 40,
                  height: 40,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                {mobileMenuOpen ? (
                  /* X ikonu */
                  <>
                    <span style={{
                      display: "block", width: 18, height: 2,
                      background: "#0f172a", borderRadius: 2,
                      transform: "rotate(45deg) translate(5px, 5px)",
                    }} />
                    <span style={{
                      display: "block", width: 18, height: 2,
                      background: "#0f172a", borderRadius: 2,
                      opacity: 0,
                    }} />
                    <span style={{
                      display: "block", width: 18, height: 2,
                      background: "#0f172a", borderRadius: 2,
                      transform: "rotate(-45deg) translate(5px, -5px)",
                    }} />
                  </>
                ) : (
                  /* Hamburger ikonu */
                  <>
                    <span style={{ display: "block", width: 18, height: 2, background: "#0f172a", borderRadius: 2 }} />
                    <span style={{ display: "block", width: 18, height: 2, background: "#0f172a", borderRadius: 2 }} />
                    <span style={{ display: "block", width: 18, height: 2, background: "#0f172a", borderRadius: 2 }} />
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Desktop nav */
            <nav style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => navigateTo(item)}
                  style={{
                    border: "none",
                    background: currentPage === item ? "#0f172a" : "transparent",
                    color: currentPage === item ? "white" : "#475569",
                    padding: "10px 14px",
                    borderRadius: 999,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {pageLabel(item)}
                </button>
              ))}
              <div
                style={{
                  display: "flex",
                  border: "1px solid #cbd5e1",
                  borderRadius: 999,
                  overflow: "hidden",
                  marginLeft: 8,
                }}
              >
                <button
                  onClick={() => setLang("tr")}
                  style={{
                    border: "none",
                    background: lang === "tr" ? "#0f172a" : "white",
                    color: lang === "tr" ? "white" : "#334155",
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  TR
                </button>
                <button
                  onClick={() => setLang("en")}
                  style={{
                    border: "none",
                    background: lang === "en" ? "#0f172a" : "white",
                    color: lang === "en" ? "white" : "#334155",
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  EN
                </button>
              </div>
            </nav>
          )}
        </div>

        {/* Mobile dropdown menu */}
        {isMobile && mobileMenuOpen && (
          <div
            style={{
              borderTop: "1px solid #e2e8f0",
              background: "white",
              padding: "12px 16px",
              display: "grid",
              gap: 4,
            }}
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => navigateTo(item)}
                style={{
                  border: "none",
                  background: currentPage === item ? "#f1f5f9" : "transparent",
                  color: currentPage === item ? "#0f172a" : "#475569",
                  padding: "12px 14px",
                  borderRadius: 12,
                  cursor: "pointer",
                  fontWeight: 600,
                  textAlign: "left",
                  fontSize: 15,
                }}
              >
                {pageLabel(item)}
              </button>
            ))}
          </div>
        )}
      </header>

      {currentPage === "Ana Sayfa" && (
        <>
          {/* ── HERO ── */}
          <section style={{ ...styles.section, paddingTop: 88 }}>
            <div
              style={{
                ...styles.container,
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
                gap: 32,
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: "#f1f5f9",
                    fontSize: 13,
                    marginBottom: 18,
                  }}
                >
                  {c.heroBadge}
                </div>
                <h1
                  style={{
                    fontSize: isMobile ? 36 : 56,
                    lineHeight: 1.05,
                    margin: "0 0 18px",
                  }}
                >
                  {c.heroTitle}
                </h1>
                <p style={{ ...styles.muted, fontSize: 18, marginBottom: 24 }}>
                  {c.heroText}
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                  <button
                    style={styles.buttonPrimary}
                    onClick={() => navigateTo("Çözümler")}
                  >
                    {c.reviewSolutions}
                  </button>
                  <button
                    style={styles.buttonSecondary}
                    onClick={() => navigateTo("Use Cases")}
                  >
                    {c.useCases}
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0,1fr))",
                    gap: 14,
                  }}
                >
                  {[
                    [c.quickPilot, c.quickPilotText],
                    [c.controlledAI, c.controlledAIText],
                    [c.enterpriseFit, c.enterpriseFitText],
                  ].map(([title, text]) => (
                    <div key={title} style={{ ...styles.card, padding: 18 }}>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
                      <div style={{ ...styles.muted, fontSize: 14 }}>{text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ ...styles.card, overflow: "hidden", padding: 0 }}>
                <div style={{ background: "#0f172a", color: "white", padding: 28 }}>
                  <div style={{ marginBottom: 18, opacity: 0.8 }}>{c.decisionEngine}</div>
                  {[c.step1, c.step2, c.step3, c.step4].map((step, i) => (
                    <div
                      key={step}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "14px 16px",
                        borderRadius: 18,
                        background: "rgba(255,255,255,0.08)",
                        marginBottom: 10,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 999,
                            background: "rgba(255,255,255,0.14)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            flexShrink: 0,
                          }}
                        >
                          {i + 1}
                        </div>
                        <span style={{ fontSize: isMobile ? 14 : 16 }}>{step}</span>
                      </div>
                      <span>›</span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                    padding: 22,
                  }}
                >
                  <div style={{ ...styles.card, padding: 18 }}>
                    <div style={{ fontSize: 13, color: "#64748b", marginBottom: 8 }}>
                      {c.approach}
                    </div>
                    <div style={{ fontWeight: 700 }}>Decision intelligence + agents</div>
                  </div>
                  <div style={{ ...styles.card, padding: 18 }}>
                    <div style={{ fontSize: 13, color: "#64748b", marginBottom: 8 }}>
                      {c.delivery}
                    </div>
                    <div style={{ fontWeight: 700 }}>{c.deliveryValue}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── SERVICES ── */}
          <section id="services-section" style={styles.section}>
            <div style={styles.container}>
              <SectionHeader
                eyebrow={c.servicesEyebrow}
                title={c.servicesTitle}
                text={c.servicesText}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(3, minmax(0,1fr))",
                  gap: 18,
                }}
              >
                {currentServices.map((service) => (
                  <div key={service.title} style={styles.card}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 16,
                        background: "#f1f5f9",
                        marginBottom: 16,
                      }}
                    />
                    <h3 style={{ margin: "0 0 10px", fontSize: 22 }}>{service.title}</h3>
                    <p style={{ ...styles.muted, margin: 0 }}>{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SOLUTIONS ── */}
          <section id="solutions-section" style={styles.section}>
            <div style={styles.container}>
              <SectionHeader
                eyebrow={c.solutionsEyebrow}
                title={c.solutionsTitle}
                text={c.solutionsText}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0,1fr))",
                  gap: 18,
                }}
              >
                {currentSolutions.map((item) => (
                  <div key={item.title} style={styles.card}>
                    <div
                      style={{
                        display: "inline-block",
                        border: "1px solid #cbd5e1",
                        borderRadius: 999,
                        padding: "6px 12px",
                        fontSize: 13,
                        marginBottom: 14,
                      }}
                    >
                      {item.sector}
                    </div>
                    <h3 style={{ margin: "0 0 10px", fontSize: 28 }}>{item.title}</h3>
                    <p style={{ ...styles.muted, marginTop: 0 }}>{item.description}</p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 10,
                        marginTop: 16,
                      }}
                    >
                      {item.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          style={{
                            background: "#f8fafc",
                            borderRadius: 16,
                            padding: "12px 14px",
                            color: "#334155",
                            fontSize: 14,
                          }}
                        >
                          {bullet}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── USE CASES ── */}
          <section id="usecases-section" style={styles.section}>
            <div style={styles.container}>
              <SectionHeader
                eyebrow={c.useCasesEyebrow}
                title={c.useCasesTitle}
                text={c.useCasesText}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0,1fr))",
                  gap: 18,
                }}
              >
                {currentSolutions.map((item, index) => (
                  <div key={`${item.title}-${index}`} style={styles.card}>
                    <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                    <p style={{ ...styles.muted, marginBottom: 18 }}>{item.description}</p>
                    <button
                      style={styles.buttonPrimary}
                      onClick={() => handleUseCaseContact(item.title)}
                    >
                      {c.talkThisUseCase}
                    </button>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 18,
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 14,
                }}
              >
                {currentUseCases.map((item) => (
                  <div key={item} style={{ ...styles.card, padding: 18 }}>
                    <div style={styles.muted}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── ABOUT ── */}
      {currentPage === "About" && (
        <section style={styles.section}>
          <div style={styles.container}>
            <SectionHeader
              eyebrow={c.aboutEyebrow}
              title={c.aboutTitle}
              text={c.aboutText}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 18,
                marginBottom: 18,
              }}
            >
              <div style={styles.card}>
                <h3 style={{ marginTop: 0 }}>{c.mission}</h3>
                <p style={{ ...styles.muted, margin: 0 }}>{c.missionText}</p>
              </div>
              <div style={styles.card}>
                <h3 style={{ marginTop: 0 }}>{c.vision}</h3>
                <p style={{ ...styles.muted, margin: 0 }}>{c.visionText}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── BLOG ── */}
      {currentPage === "Blog" && (
        <section style={styles.section}>
          <div style={styles.container}>
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "end",
                gap: 20,
                marginBottom: 28,
              }}
            >
              <SectionHeader
                eyebrow={c.blogEyebrow}
                title={c.blogTitle}
                text={c.blogText}
              />
              <input
                value={blogQuery}
                onChange={(e) => setBlogQuery(e.target.value)}
                placeholder={c.searchPosts}
                style={{
                  padding: "12px 16px",
                  borderRadius: 999,
                  border: "1px solid #cbd5e1",
                  minWidth: isMobile ? "100%" : 240,
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(3, minmax(0,1fr))",
                gap: 18,
              }}
            >
              {filteredPosts.map((post) => (
                <div key={post.title} style={styles.card}>
                  <div style={{ color: "#64748b", fontSize: 14, marginBottom: 12 }}>
                    {post.category}
                  </div>
                  <h3 style={{ margin: "0 0 10px", fontSize: 24 }}>{post.title}</h3>
                  <p style={{ ...styles.muted, marginBottom: 18 }}>{post.excerpt}</p>
                  <button
                    style={styles.buttonSecondary}
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/company/decigent/",
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    {c.readOnLinkedIn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT ── */}
      {currentPage === "Contact" && (
        <section style={styles.section}>
          <div style={styles.container}>
            <SectionHeader
              eyebrow={c.contactEyebrow}
              title={c.contactTitle}
              text={c.contactText}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr",
                gap: 18,
              }}
            >
              <div style={styles.card}>
                <h3 style={{ marginTop: 0 }}>{c.contactForm}</h3>
                <p style={{ ...styles.muted, marginTop: 0 }}>{c.contactFormText}</p>

                <form onSubmit={handleContactSubmit} style={{ display: "grid", gap: 14 }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                      gap: 14,
                    }}
                  >
                    <input name="name" placeholder={c.name} required style={inputStyle} />
                    <input name="company" placeholder={c.company} style={inputStyle} />
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                      gap: 14,
                    }}
                  >
                    <input
                      name="email"
                      type="email"
                      placeholder={c.email}
                      required
                      style={inputStyle}
                    />
                    <input name="phone" placeholder={c.phone} style={inputStyle} />
                  </div>
                  <textarea
                    name="message"
                    placeholder={c.messagePlaceholder}
                    value={prefilledMessage}
                    onChange={(e) => setPrefilledMessage(e.target.value)}
                    required
                    style={{ ...inputStyle, minHeight: 150, resize: "vertical" }}
                  />
                  <button type="submit" style={styles.buttonPrimary}>
                    {c.send}
                  </button>
                </form>
              </div>

              <div style={{ display: "grid", gap: 18 }}>
                {[
                  [c.emailLabel, "info@decigent.com"],
                  [c.phoneLabel, "+90 258 XXX XX XX"],
                  [c.addressLabel, "Atalar Mh. 1346 Sok. No: 24/10 Pamukkale - DENİZLİ"],
                ].map(([title, text]) => (
                  <div key={title} style={styles.card}>
                    <div style={{ fontWeight: 700, marginBottom: 8 }}>{title}</div>
                    <div style={styles.muted}>{text}</div>
                  </div>
                ))}

                <div style={{ ...styles.card, background: "#0f172a", color: "white" }}>
                  <div style={{ fontWeight: 700, marginBottom: 10 }}>{c.recommended}</div>
                  <div style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
                    {c.recommendedText}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid #e2e8f0",
          padding: "40px 0",
          background: "#fff",
        }}
      >
        <div style={styles.container}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
              gap: 24,
            }}
          >
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Decigent</div>
              <div style={{ color: "#64748b" }}>{c.footerTag}</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>{c.menu}</div>
              <div style={{ display: "grid", gap: 8 }}>
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => navigateTo(item)}
                    style={{
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      color: "#475569",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    {pageLabel(item)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>{c.contactInfo}</div>
              <div style={{ display: "grid", gap: 8, color: "#475569" }}>
                <div>info@decigent.com</div>
                <div>+90 258 XXX XX XX</div>
                <div>Atalar Mh. 1346 Sok. No: 24/10 Pamukkale - DENİZLİ</div>
                <a
                  href="https://www.linkedin.com/company/decigent/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#334155",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 6,
                  }}
                >
                  <LinkedInMark />
                  {c.linkedIn}
                </a>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 28,
              paddingTop: 20,
              borderTop: "1px solid #e2e8f0",
              color: "#64748b",
              fontSize: 14,
            }}
          >
            © {new Date().getFullYear()} Decigent. {c.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}