import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { type Lang, copy, services, solutions, useCases, pilotSteps, securityItems, blogPosts } from "./data";
import heroImg from "../img/decigent_hero_new.webp";
import logoGold from "../img/Decigent_logo_gold_bgwhite_noslogan.png";

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
  "Biz Kimiz",
  "Blog",
  "İletişim",
];

const BLACK = "#000000";
const NAVY = "#0D1B2A";
const BLUE = "#2776EA";
const GOLD = "#D4A017";
const GOLD_LIGHT = "rgba(212,160,23,0.10)";
const GOLD_BORDER = "rgba(212,160,23,0.28)";
const TEXT_PRIMARY = "#F7F9FC";
const TEXT_MUTED = "#94A3B8";
const BORDER_DARK = "rgba(247,249,252,0.1)";
const SPACE = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
} as const;

const styles = {
  page: {
    minHeight: "100vh",
    background: `radial-gradient(ellipse 110% 55% at 50% -8%, rgba(39,118,234,0.13) 0%, transparent 58%), ${BLACK}`,
    color: TEXT_PRIMARY,
    fontFamily: "'Barlow', Inter, Arial, sans-serif",
  } as const,
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    boxSizing: "border-box",
  } as const,
  section: {
    padding: "88px 0",
  } as const,
  sectionLarge: {
    padding: "88px 0",
  } as const,
  card: {
    border: "1px solid rgba(247,249,252,0.07)",
    borderRadius: "16px",
    padding: "28px",
    background: "rgba(18,34,56,0.72)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.45)",
  } as const,
  muted: {
    color: TEXT_MUTED,
    fontSize: 17,
    lineHeight: 1.7,
  } as const,
  buttonPrimary: {
    background: "linear-gradient(135deg, #1560cc 0%, #2776EA 100%)",
    color: TEXT_PRIMARY,
    border: "none",
    borderRadius: "999px",
    padding: "13px 26px",
    cursor: "pointer",
    fontWeight: 600,
    letterSpacing: "0.02em",
    boxShadow: "0 0 20px rgba(39,118,234,0.22), 0 2px 8px rgba(0,0,0,0.25)",
  } as const,
  buttonSecondary: {
    background: "rgba(247,249,252,0.05)",
    color: TEXT_PRIMARY,
    border: "1px solid rgba(247,249,252,0.14)",
    borderRadius: "999px",
    padding: "13px 26px",
    cursor: "pointer",
    fontWeight: 600,
    letterSpacing: "0.02em",
  } as const,
  buttonGold: {
    background: "linear-gradient(135deg, #C49010 0%, #E8B520 50%, #D4A017 100%)",
    color: NAVY,
    border: "none",
    borderRadius: "999px",
    padding: "13px 26px",
    cursor: "pointer",
    fontWeight: 700,
    letterSpacing: "0.02em",
    boxShadow: "0 0 28px rgba(212,160,23,0.30), 0 2px 8px rgba(0,0,0,0.2)",
  } as const,
};

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

function WorkflowIcon({ size = 22, color = "#334155", strokeWidth = 2.2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="2" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="18" cy="6" r="2" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="12" cy="18" r="2" stroke={color} strokeWidth={strokeWidth} />
      <path d="M8 6h8M7.5 7.5l3.5 8M16.5 7.5l-3.5 8" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
}

function BarChart2Icon({ size = 22, color = "#334155", strokeWidth = 2.2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20h16" stroke={color} strokeWidth={strokeWidth} />
      <rect x="6" y="11" width="3" height="7" stroke={color} strokeWidth={strokeWidth} />
      <rect x="11" y="7" width="3" height="11" stroke={color} strokeWidth={strokeWidth} />
      <rect x="16" y="4" width="3" height="14" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
}

function BotIcon({ size = 22, color = "#334155", strokeWidth = 2.2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="8" width="14" height="10" rx="3" stroke={color} strokeWidth={strokeWidth} />
      <path d="M12 4v4M9 13h.01M15 13h.01M8 20v-2M16 20v-2" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
}

function LayersIcon({ size = 22, color = "#334155", strokeWidth = 2.2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4l8 4-8 4-8-4 8-4zM4 12l8 4 8-4M4 16l8 4 8-4" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
}

function ShieldIcon({ size = 22, color = "#334155", strokeWidth = 2.2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.5-2.6 7.8-7 10-4.4-2.2-7-5.5-7-10V6l7-3z" stroke={color} strokeWidth={strokeWidth} />
      <path d="M9 12l2 2 4-4" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
}

function RocketIcon({ size = 22, color = "#334155", strokeWidth = 2.2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 4c3 0 5 2 6 6-3.5.8-5.7 2.8-8 5l-3-3c2.2-2.3 4.2-4.5 5-8z" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="15.5" cy="8.5" r="1.2" stroke={color} strokeWidth={strokeWidth} />
      <path d="M9 15l-3 3M8 12l-3 1M12 16l1 3" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
}

const serviceIcons = [WorkflowIcon, BarChart2Icon, BotIcon, LayersIcon, ShieldIcon, RocketIcon];

function KeyIcon({ size = 22, color = "#334155", strokeWidth = 2.2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="4" stroke={color} strokeWidth={strokeWidth} />
      <path d="M12 12l8 8M16 20l2-2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

function CheckCircleIcon({ size = 22, color = "#334155", strokeWidth = 2.2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} />
      <path d="M8 12l3 3 5-5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ServerIcon({ size = 22, color = "#334155", strokeWidth = 2.2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="6" rx="2" stroke={color} strokeWidth={strokeWidth} />
      <rect x="3" y="14" width="18" height="6" rx="2" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="7" cy="7" r="1" fill={color} />
      <circle cx="7" cy="17" r="1" fill={color} />
    </svg>
  );
}

function securityIcon(iconKey: string, color: string) {
  const p = { size: 22, color, strokeWidth: 2.2 };
  switch (iconKey) {
    case "role":    return <KeyIcon {...p} />;
    case "approval": return <CheckCircleIcon {...p} />;
    case "audit":   return <LayersIcon {...p} />;
    case "data":    return <BarChart2Icon {...p} />;
    case "deploy":  return <ServerIcon {...p} />;
    case "shield":  return <ShieldIcon {...p} />;
    default:        return <ShieldIcon {...p} />;
  }
}

function ProofIcon({ type, color = GOLD }: { type: "result" | "pilot" | "human" | "privacy"; color?: string }) {
  const p = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true };
  const stroke = { stroke: color, strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (type === "result") {
    return (
      <svg {...p}>
        <circle cx="12" cy="12" r="9" {...stroke} />
        <path d="M8 12l2.5 2.5L16 9" {...stroke} />
      </svg>
    );
  }
  if (type === "pilot") {
    return (
      <svg {...p}>
        <rect x="4" y="5" width="16" height="15" rx="2" {...stroke} />
        <path d="M8 3v4M16 3v4M4 10h16M9 15h3" {...stroke} />
      </svg>
    );
  }
  if (type === "human") {
    return (
      <svg {...p}>
        <path d="M15 19a6 6 0 0 0-10 0" {...stroke} />
        <circle cx="10" cy="8" r="4" {...stroke} />
        <path d="M16 12l2 2 4-4" {...stroke} />
      </svg>
    );
  }
  return (
    <svg {...p}>
      <path d="M12 3l7 3v5c0 4.5-2.6 7.8-7 10-4.4-2.2-7-5.5-7-10V6l7-3z" {...stroke} />
      <path d="M9 12l2 2 4-4" {...stroke} />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

function FadeUp({ children, i = 0 }: { children: React.ReactNode; i?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={i}
    >
      {children}
    </motion.div>
  );
}

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
  hideEyebrow = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  hideEyebrow?: boolean;
}) {
  return (
    <div style={{ maxWidth: 760, marginBottom: 36 }}>
      {!hideEyebrow && (
        <div
          style={{
            display: "inline-block",
            padding: "6px 12px",
            borderRadius: 999,
            background: GOLD_LIGHT,
            border: `1px solid ${GOLD_BORDER}`,
            color: GOLD,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            marginBottom: 16,
          }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        style={{
          margin: "0 0 12px",
          fontSize: "clamp(30px, 3.5vw, 44px)",
          lineHeight: 1.2,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: TEXT_PRIMARY,
        }}
      >
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
        background: "#0A66C2",
        color: "white",
        fontSize: 10,
        fontWeight: 700,
      }}
    >
      in
    </span>
  );
}

const heroLabels = {
  left: [
    { tr: "Kurumsal Veri", en: "Enterprise Data" },
    { tr: "Gerçek Zamanlı Sinyaller", en: "Real-time Signals" },
    { tr: "Bağlam Katmanı", en: "Context Layer" },
  ],
  center: { tr: "Karar Motoru", en: "Decision Core" },
  right: [
    { tr: "Önerilen Aksiyonlar", en: "Recommended Actions" },
    { tr: "İnsan Onaylı Süreç", en: "Human-in-the-Loop" },
    { tr: "Ölçülen Sonuçlar", en: "Measured Outcomes" },
  ],
};

const rowTops = ["28.7%", "59%", "86.5%"];

const HERO_BLUE = "#88BBDD";

function HeroGifVisual({ isMobile, lang }: { isMobile: boolean; lang: Lang }) {
  const labelStyle = (side: "left" | "right"): React.CSSProperties => ({
    position: "absolute",
    textAlign: "center" as const,
    fontSize: isMobile ? "clamp(5px, 1.45vw, 8px)" : "clamp(9px, 1.05vw, 14px)",
    fontWeight: 700,
    color: side === "left" ? HERO_BLUE : GOLD,
    pointerEvents: "none" as const,
    lineHeight: 1.15,
    width: "16.8%",
    height: "5.6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: "0 1.1%",
    transform: "translateY(-50%)",
    textShadow: side === "left"
      ? "0 0 12px rgba(39,118,234,0.5), 0 1px 6px rgba(0,0,0,0.9)"
      : "0 0 12px rgba(212,160,23,0.5), 0 1px 6px rgba(0,0,0,0.9)",
    ...(side === "left" ? { left: "4.7%" } : { right: "4.7%" }),
  });

  return (
    <div
      style={{
        position: "relative",
        width: isMobile ? "100%" : "88%",
        maxWidth: isMobile ? "none" : 1040,
        margin: "0 auto",
      }}
    >

      {/* Image — overflow hidden clips any render bleed */}
      <div style={{ position: "relative", zIndex: 1, overflow: "hidden" }}>
        <img
          src={heroImg}
          alt="Decigent Decision Core — enterprise AI decision system"
          className="hero-image-mask"
          style={{ width: "100%", display: "block" }}
        />
      </div>

      {/* Labels — outside overflow:hidden so they are never clipped */}
      {heroLabels.left.map((label, i) => (
        <div key={i} style={{ ...labelStyle("left"), top: rowTops[i] }}>
          {lang === "tr" ? label.tr : label.en}
        </div>
      ))}

      <div style={{
        position: "absolute",
        left: "50%",
        top: "67%",
        transform: "translate(-50%, -50%)",
        textAlign: "center" as const,
        fontSize: isMobile ? "clamp(6px, 2vw, 10px)" : "clamp(9px, 1.2vw, 14px)",
        fontWeight: 800,
        color: GOLD,
        pointerEvents: "none",
        letterSpacing: "0.04em",
        textShadow: "0 0 16px rgba(212,160,23,0.6), 0 1px 6px rgba(0,0,0,0.9)",
        whiteSpace: "nowrap" as const,
      }}>
        {lang === "tr" ? heroLabels.center.tr : heroLabels.center.en}
      </div>

      {heroLabels.right.map((label, i) => (
        <div key={i} style={{ ...labelStyle("right"), top: rowTops[i] }}>
          {lang === "tr" ? label.tr : label.en}
        </div>
      ))}
    </div>
  );
}


const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid rgba(247,249,252,0.1)",
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box",
  background: "rgba(18,34,56,0.8)",
  color: TEXT_PRIMARY,
};

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [currentPage, setCurrentPage] = useState<Page>("Ana Sayfa");
  const [blogQuery, setBlogQuery] = useState("");
  const [prefilledMessage, setPrefilledMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");

  const isMobile = useIsMobile();
  const hpad = isMobile ? "0 16px" : "0 24px";
  const vpad = isMobile ? "40px 0" : "64px 0";

  const c = copy[lang];
  const currentServices = services[lang];
  const currentSolutions = solutions[lang];
  const currentUseCases = useCases[lang];
  const currentPilotSteps = pilotSteps[lang];
  const currentSecurityItems = securityItems[lang];
  const currentBlogPosts = blogPosts[lang];
  useEffect(() => {
    const saved = localStorage.getItem("decigent-lang") as Lang | null;
    if (saved === "tr" || saved === "en") {
      setLang(saved);
      return;
    }
    const detect = async () => {
      try {
        const res = await fetch("https://ipapi.co/country/", { signal: AbortSignal.timeout(3000) });
        const country = (await res.text()).trim().toUpperCase();
        setLang(country === "TR" ? "tr" : "en");
      } catch {
        const browserLang = navigator.language.toLowerCase();
        setLang(browserLang.startsWith("tr") ? "tr" : "en");
      }
    };
    detect();
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
    if (selected && currentPage === "İletişim") {
      setPrefilledMessage(c.prefMessage.replace("{title}", selected));
      sessionStorage.removeItem("selectedUseCase");
    }
  }, [currentPage, c.prefMessage]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMobileMenuOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

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
      case "Biz Kimiz":
        return c.about;
      case "Blog":
        return c.blog;
      case "İletişim":
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
    setCurrentPage("İletişim");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const FORMSPREE_ID = "mwvadggn";

  const handleContactSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      setFormState(res.ok ? "success" : "error");
    } catch {
      setFormState("error");
    }
  };

  return (
    <div style={styles.page}>
      {/* ── HEADER ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(0,0,0,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${BORDER_DARK}`,
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
            flexWrap: isMobile ? "nowrap" : "wrap",
            padding: isMobile ? "12px 16px" : "0 24px",
          }}
        >
          <button
            type="button"
            onClick={() => navigateTo("Ana Sayfa")}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              minWidth: 0,
              flexShrink: 1,
            }}
          >
            <img
              src={logoGold}
              alt="Decigent Logo"
              style={{ height: 40, width: "auto", maxWidth: isMobile ? "48vw" : "none", display: "block" }}
            />
          </button>

          {isMobile ? (
            /* Mobile: lang toggle + hamburger */
            <div style={{ display: "flex", alignItems: "center", gap: SPACE.xs, flexShrink: 0 }}>
              <div
                style={{
                  display: "flex",
                  border: `1px solid ${BORDER_DARK}`,
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setLang("tr")}
                  style={{
                    border: "none",
                    background: lang === "tr" ? GOLD : "transparent",
                    color: lang === "tr" ? NAVY : TEXT_MUTED,
                    padding: "7px 11px",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  TR
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  style={{
                    border: "none",
                    background: lang === "en" ? GOLD : "transparent",
                    color: lang === "en" ? NAVY : TEXT_MUTED,
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
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                style={{
                  border: `1px solid ${BORDER_DARK}`,
                  borderRadius: 12,
                  background: "transparent",
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
                  <>
                    <span style={{ display: "block", width: 18, height: 2, background: TEXT_PRIMARY, borderRadius: 2, transform: "rotate(45deg) translate(5px, 5px)" }} />
                    <span style={{ display: "block", width: 18, height: 2, background: TEXT_PRIMARY, borderRadius: 2, opacity: 0 }} />
                    <span style={{ display: "block", width: 18, height: 2, background: TEXT_PRIMARY, borderRadius: 2, transform: "rotate(-45deg) translate(5px, -5px)" }} />
                  </>
                ) : (
                  <>
                    <span style={{ display: "block", width: 18, height: 2, background: TEXT_PRIMARY, borderRadius: 2 }} />
                    <span style={{ display: "block", width: 18, height: 2, background: TEXT_PRIMARY, borderRadius: 2 }} />
                    <span style={{ display: "block", width: 18, height: 2, background: TEXT_PRIMARY, borderRadius: 2 }} />
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Desktop nav */
            <nav style={{ display: "flex", gap: SPACE.xs, flexWrap: "wrap", alignItems: "center" }}>
              {navItems.map((item) => {
                const isContact = item === "İletişim";
                const isActive = currentPage === item;
                return (
                  <button
                    key={item}
                    onClick={() => navigateTo(item)}
                    style={{
                      border: isContact && !isActive ? `1px solid ${GOLD_BORDER}` : "none",
                      background: isActive ? GOLD : "transparent",
                      color: isActive ? NAVY : isContact ? GOLD : TEXT_MUTED,
                      padding: "10px 14px",
                      borderRadius: 999,
                      cursor: "pointer",
                      fontWeight: isContact ? 700 : 600,
                    }}
                  >
                    {pageLabel(item)}
                  </button>
                );
              })}
              <div
                style={{
                  display: "flex",
                  border: `1px solid ${BORDER_DARK}`,
                  borderRadius: 999,
                  overflow: "hidden",
                  marginLeft: 8,
                }}
              >
                <button
                  onClick={() => setLang("tr")}
                  style={{
                    border: "none",
                    background: lang === "tr" ? GOLD : "transparent",
                    color: lang === "tr" ? NAVY : TEXT_MUTED,
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
                    background: lang === "en" ? GOLD : "transparent",
                    color: lang === "en" ? NAVY : TEXT_MUTED,
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
            id="mobile-menu"
            className="mobile-menu-dropdown"
            style={{
              borderTop: `1px solid ${BORDER_DARK}`,
              background: "rgba(8,16,28,0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              padding: "12px 16px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {navItems.filter((item) => item !== "İletişim").map((item) => {
              const isActive = currentPage === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => navigateTo(item)}
                  style={{
                    border: "none",
                    background: isActive ? "rgba(212,160,23,0.1)" : "transparent",
                    color: isActive ? GOLD : TEXT_MUTED,
                    padding: "14px 18px",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontWeight: 600,
                    textAlign: "left" as const,
                    fontSize: 16,
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  {pageLabel(item)}
                </button>
              );
            })}
            <div style={{ height: 1, background: BORDER_DARK, margin: "8px 0" }} />
            <button
              type="button"
              onClick={() => navigateTo("İletişim")}
              style={{
                border: "none",
                background: "linear-gradient(135deg, #C49010 0%, #E8B520 50%, #D4A017 100%)",
                color: NAVY,
                padding: "14px 18px",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 700,
                textAlign: "center" as const,
                fontSize: 16,
                boxShadow: "0 0 20px rgba(212,160,23,0.25)",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {pageLabel("İletişim")}
            </button>
          </div>
        )}
      </header>

      {currentPage === "Ana Sayfa" && (
        <>
          {/* ── HERO ── */}
          <section
            style={{
              ...styles.sectionLarge,
              background: "transparent",
              padding: isMobile ? "20px 0 48px" : "44px 0",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Atmospheric glow orb */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: isMobile ? "50%" : "35%",
              transform: "translate(-50%, -60%)",
              width: isMobile ? "100%" : "70vw",
              height: isMobile ? "60vh" : "80vh",
              maxWidth: 900,
              background: "radial-gradient(circle, rgba(39,118,234,0.12) 0%, rgba(212,160,23,0.04) 40%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <div style={{ ...styles.container, padding: hpad, position: "relative" }}>
              {/* H1 */}
              <FadeUp i={0}>
                <h1
                  style={{
                    fontSize: isMobile ? 36 : 72,
                    lineHeight: 1.05,
                    margin: "0 0 22px",
                    fontWeight: 800,
                    letterSpacing: "-0.015em",
                    textAlign: "center",
                  }}
                >
                  {c.heroTitle.split(". ").map((part, i, arr) => (
                    <span key={i}>
                      {i === arr.length - 1
                        ? <span className="hero-gradient-text">{part}</span>
                        : <>{part}.<br /></>
                      }
                    </span>
                  ))}
                </h1>
              </FadeUp>

              {/* Subtitle */}
              <FadeUp i={2}>
                <p
                  style={{
                    ...styles.muted,
                    textAlign: "center",
                    margin: "0 auto 24px",
                    maxWidth: 620,
                    fontSize: isMobile ? 16 : 18,
                    lineHeight: 1.65,
                  }}
                >
                  {c.heroText}
                </p>
              </FadeUp>

              {/* CTA buttons before hero image */}
              <FadeUp i={3}>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: isMobile ? 24 : 32 }}>
                  <button
                    type="button"
                    style={{ ...styles.buttonGold, fontSize: 13, padding: isMobile ? "10px 16px" : "10px 22px" }}
                    onClick={() => navigateTo("Use Cases")}
                  >
                    {isMobile ? (lang === "tr" ? "Use Cases →" : "See Cases →") : `${c.reviewSolutions} →`}
                  </button>
                  <button
                    type="button"
                    style={{ ...styles.buttonSecondary, fontSize: 13, padding: isMobile ? "10px 16px" : "10px 22px" }}
                    onClick={() => setCurrentPage("İletişim")}
                  >
                    {isMobile ? (lang === "tr" ? "Görüşme Planla" : "Book a Call") : c.ctaMeet}
                  </button>
                </div>
              </FadeUp>

              {/* Hero image — full width */}
              <FadeUp i={4}>
                <HeroGifVisual isMobile={isMobile} lang={lang} />
              </FadeUp>
            </div>
          </section>

          {/* ── PROOF STRIP ── */}
          <div
            style={{
              marginTop: isMobile ? 8 : 18,
              background: `linear-gradient(90deg, transparent 0%, rgba(13,27,42,0.82) 12%, rgba(13,27,42,0.82) 88%, transparent 100%)`,
              borderTop: `1px solid rgba(247,249,252,0.05)`,
              borderBottom: `1px solid rgba(247,249,252,0.05)`,
            }}
          >
            <div style={{ ...styles.container, padding: isMobile ? "26px 16px" : "26px 24px" }}>
              <div style={{
                display: isMobile ? "grid" : "flex",
                gridTemplateColumns: "1fr 1fr",
                flexWrap: "wrap",
                gap: isMobile ? "12px" : 22,
                alignItems: "center",
                justifyContent: "center",
              }}>
                {[
                  { label: lang === "tr" ? "Risk bazlı insan onayı" : "Risk-based human approval", icon: "human" as const },
                  { label: lang === "tr" ? "Uçtan uca otomasyon" : "End-to-end automation", icon: "result" as const },
                  { label: lang === "tr" ? "12 haftalık pilot" : "12-week pilot", icon: "pilot" as const },
                  { label: lang === "tr" ? "KVKK uyumlu yaklaşım" : "GDPR-aligned approach", icon: "privacy" as const },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      minWidth: isMobile ? 0 : 190,
                      justifyContent: isMobile ? "flex-start" : "center",
                    }}
                  >
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 999,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: "rgba(212,160,23,0.10)",
                        border: "1px solid rgba(212,160,23,0.18)",
                      }}
                    >
                      <ProofIcon type={item.icon} />
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 650, color: TEXT_PRIMARY, lineHeight: 1.35 }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── SERVICES ── */}
          <section id="services-section" style={{ ...styles.section, padding: vpad }}>
            <div style={{ ...styles.container, padding: hpad }}>
              <FadeUp>
                <SectionHeader eyebrow={c.servicesEyebrow} title={c.servicesTitle} text={c.servicesText} hideEyebrow />
              </FadeUp>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0,1fr))", gap: SPACE.lg }}>
                {currentServices.map((service, index) => {
                  const ServiceIcon = serviceIcons[index] ?? WorkflowIcon;
                  const isFeatured = index === 0;
                  return (
                    <FadeUp key={service.title} i={index}>
                      <div className="card-hover" style={{ ...styles.card, height: "100%", ...(isFeatured ? { background: "rgba(40,28,4,0.72)", border: "1px solid rgba(212,160,23,0.25)", boxShadow: "0 0 0 1px rgba(212,160,23,0.12), 0 0 40px rgba(212,160,23,0.07), inset 0 1px 0 rgba(212,160,23,0.2), 0 4px 24px rgba(0,0,0,0.5)", borderTop: "2px solid rgba(212,160,23,0.7)" } : {}) }}>
                        <div style={{ width: 48, height: 48, borderRadius: 16, background: isFeatured ? "rgba(212,160,23,0.15)" : "rgba(247,249,252,0.07)", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <ServiceIcon size={22} color={isFeatured ? GOLD : TEXT_MUTED} strokeWidth={2.2} />
                        </div>
                        <h3 style={{ margin: "0 0 10px", fontSize: 22, color: TEXT_PRIMARY }}>{service.title}</h3>
                        <p style={{ ...styles.muted, margin: 0 }}>{service.description}</p>
                      </div>
                    </FadeUp>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── SOLUTIONS ── */}
          <section id="solutions-section" style={{ ...styles.section, padding: vpad, background: `linear-gradient(180deg, transparent 0%, rgba(13,27,42,0.95) 5%, rgba(13,27,42,0.95) 95%, transparent 100%)` }}>
            <div style={{ ...styles.container, padding: hpad }}>
              <FadeUp>
                <SectionHeader eyebrow={c.solutionsEyebrow} title={c.solutionsTitle} text={c.solutionsText} hideEyebrow />
              </FadeUp>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0,1fr))", gap: SPACE.lg }}>
                {currentSolutions.map((item, i) => (
                  <FadeUp key={item.title} i={i}>
                  <div
                    className="card-hover"
                    style={{ ...styles.card }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        border: `1px solid ${BORDER_DARK}`,
                        borderRadius: 999,
                        padding: "6px 12px",
                        fontSize: 13,
                        color: TEXT_MUTED,
                        marginBottom: 14,
                      }}
                    >
                      {item.sector}
                    </div>
                    <h3 style={{ margin: "0 0 10px", fontSize: isMobile ? 21 : 28, color: TEXT_PRIMARY }}>{item.title}</h3>
                    <p style={{ ...styles.muted, marginTop: 0 }}>{item.description}</p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                        gap: SPACE.sm,
                        marginTop: 16,
                      }}
                    >
                      {item.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          style={{
                            background: "rgba(247,249,252,0.06)",
                            borderRadius: 16,
                            padding: "12px 14px",
                            color: TEXT_PRIMARY,
                            fontSize: 14,
                          }}
                        >
                          {bullet}
                        </div>
                      ))}
                    </div>
                  </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>

          {/* ── USE CASES ── */}
          <section id="usecases-section" style={{ ...styles.section, padding: vpad }}>
            <div style={{ ...styles.container, padding: hpad }}>
              <FadeUp>
                <SectionHeader
                  eyebrow={c.useCasesEyebrow}
                  title={c.useCasesTitle}
                  text={c.useCasesText}
                  hideEyebrow
                />
              </FadeUp>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0,1fr))",
                  gap: SPACE.lg,
                }}
              >
                {currentUseCases.map((uc, i) => (
                  <FadeUp key={uc.title} i={i}>
                  <div
                    className="card-hover"
                    style={{
                      ...styles.card,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0,
                      height: "100%",
                    }}
                  >
                    {/* Sector + title */}
                    <div style={{ marginBottom: 16 }}>
                      <div
                        style={{
                          display: "inline-block",
                          border: "1px solid #cbd5e1",
                          borderRadius: 999,
                          padding: "4px 12px",
                          fontSize: 12,
                          fontWeight: 600,
                          color: TEXT_MUTED,
                          marginBottom: 10,
                        }}
                      >
                        {uc.sector}
                      </div>
                      <h3 style={{ margin: 0, fontSize: 22, lineHeight: 1.25, color: TEXT_PRIMARY }}>{uc.title}</h3>
                    </div>

                    {/* Problem */}
                    <div
                      style={{
                        borderLeft: "3px solid #F59E0B",
                        paddingLeft: 12,
                        marginBottom: 12,
                      }}
                    >
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#FBBF24", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                        {c.problemLabel}
                      </div>
                      <div style={{ fontSize: 14, color: TEXT_MUTED, lineHeight: 1.55 }}>{uc.problem}</div>
                    </div>

                    {/* Approach */}
                    <div
                      style={{
                        borderLeft: `3px solid ${BLUE}`,
                        paddingLeft: 12,
                        marginBottom: 12,
                      }}
                    >
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                        {c.approachLabel}
                      </div>
                      <div style={{ fontSize: 14, color: TEXT_MUTED, lineHeight: 1.55 }}>{uc.approach}</div>
                    </div>

                    {/* Output */}
                    <div
                      style={{
                        borderLeft: "3px solid #10B981",
                        paddingLeft: 12,
                        marginBottom: 16,
                      }}
                    >
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#6EE7B7", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                        {c.outputLabel}
                      </div>
                      <div style={{ fontSize: 14, color: TEXT_MUTED, lineHeight: 1.55 }}>{uc.output}</div>
                    </div>

                    {/* Metrics */}
                    <div
                      style={{
                        background: "rgba(247,249,252,0.05)",
                        borderRadius: 8,
                        padding: "10px 14px",
                        marginBottom: 18,
                      }}
                    >
                      <div style={{ fontSize: 11, fontWeight: 700, color: TEXT_MUTED, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                        {c.metricLabel}
                      </div>
                      <div style={{ fontSize: 13, color: TEXT_PRIMARY }}>{uc.metric}</div>
                    </div>

                    <button
                      style={{ ...styles.buttonPrimary, alignSelf: "flex-start", marginTop: "auto" }}
                      onClick={() => handleUseCaseContact(uc.title)}
                    >
                      {c.talkThisUseCase}
                    </button>
                  </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>

          {/* ── WHY DECIGENT ── */}
          <section style={{ ...styles.section, padding: vpad, background: BLACK }}>
            <div style={{ ...styles.container, padding: hpad }}>
              <FadeUp>
                <SectionHeader
                  eyebrow={c.whyEyebrow}
                  title={c.whyTitle}
                  text={c.whyText}
                  hideEyebrow
                />
              </FadeUp>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0,1fr))",
                  gap: SPACE.lg,
                  marginBottom: 32,
                }}
              >
                {[
                  { title: c.whyPilot, text: c.whyPilotText, accent: true },
                  { title: c.whyAnalysis, text: c.whyAnalysisText, accent: false },
                  { title: c.whyFlexible, text: c.whyFlexibleText, accent: false },
                  { title: c.whyFounding, text: c.whyFoundingText, accent: false },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="card-hover"
                    style={{
                      ...styles.card,
                      border: item.accent ? `1px solid ${GOLD_BORDER}` : `1px solid ${BORDER_DARK}`,
                    }}
                  >
                    <h3 style={{ margin: "0 0 10px", fontSize: 20, color: item.accent ? GOLD : TEXT_PRIMARY }}>{item.title}</h3>
                    <p style={{ margin: 0, lineHeight: 1.7, color: TEXT_MUTED }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                style={styles.buttonGold}
                onClick={() => setCurrentPage("İletişim")}
              >
                {c.whyCta}
              </button>

              <div style={{ marginTop: 40, borderTop: `1px solid ${BORDER_DARK}`, paddingTop: 32 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: GOLD, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 20 }}>
                  {c.engagementTitle}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0,1fr))", gap: SPACE.lg }}>
                  {c.engagementSteps.map((s) => (
                    <div key={s.step} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: GOLD, opacity: 0.35, lineHeight: 1, flexShrink: 0, minWidth: 32 }}>{s.step}</div>
                      <div>
                        <div style={{ fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 6, fontSize: 15 }}>{s.title}</div>
                        <div style={{ color: TEXT_MUTED, fontSize: 13, lineHeight: 1.6 }}>{s.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── PILOT METHODOLOGY ── */}
          <section style={{ ...styles.section, padding: vpad, background: `linear-gradient(180deg, transparent 0%, rgba(13,27,42,0.95) 5%, rgba(13,27,42,0.95) 95%, transparent 100%)` }}>
            <div style={{ ...styles.container, padding: hpad }}>
              <FadeUp>
                <SectionHeader
                  eyebrow={c.pilotEyebrow}
                  title={c.pilotTitle}
                  text={c.pilotText}
                  hideEyebrow
                />
              </FadeUp>
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(4, minmax(0,1fr))",
                gap: 0,
                position: "relative",
              }}>
                {/* connector line — desktop only */}
                {!isMobile && (
                  <div style={{
                    position: "absolute",
                    top: 36,
                    left: "12.5%",
                    right: "12.5%",
                    height: 2,
                    background: `linear-gradient(90deg, ${GOLD} 0%, ${BLUE} 100%)`,
                    opacity: 0.35,
                    zIndex: 0,
                  }} />
                )}
                {currentPilotSteps.map((step, i) => (
                  <FadeUp key={step.step} i={i}>
                    <div style={{
                      padding: isMobile ? "20px 0" : "0 20px 0",
                      borderTop: isMobile ? `2px solid ${i === 0 ? GOLD : BORDER_DARK}` : "none",
                      position: "relative",
                      zIndex: 1,
                    }}>
                      {/* Step number circle */}
                      <div style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: i === 0 ? GOLD : BLACK,
                        border: `2px solid ${i === 0 ? GOLD : BORDER_DARK}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: 20,
                        color: i === 0 ? NAVY : TEXT_MUTED,
                        marginBottom: 20,
                      }}>
                        {step.step}
                      </div>
                      {/* Duration badge */}
                      <div style={{
                        display: "inline-block",
                        fontSize: 11,
                        fontWeight: 700,
                        color: GOLD,
                        background: GOLD_LIGHT,
                        border: `1px solid ${GOLD_BORDER}`,
                        borderRadius: 999,
                        padding: "3px 10px",
                        marginBottom: 10,
                        letterSpacing: "0.04em",
                      }}>
                        {step.duration}
                      </div>
                      <h3 style={{ margin: "0 0 10px", fontSize: 20, color: TEXT_PRIMARY }}>{step.title}</h3>
                      <p style={{ ...styles.muted, fontSize: 14, margin: "0 0 16px" }}>{step.description}</p>
                      {/* Deliverable */}
                      <div style={{
                        borderLeft: `2px solid ${GOLD}`,
                        paddingLeft: 10,
                      }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: GOLD, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                          {c.pilotDeliverable}
                        </div>
                        <div style={{ fontSize: 13, color: TEXT_MUTED, lineHeight: 1.5 }}>{step.deliverable}</div>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>

          {/* ── SECURITY & GOVERNANCE ── */}
          <section style={{ ...styles.section, padding: vpad, background: BLACK }}>
            <div style={{ ...styles.container, padding: hpad }}>
              <FadeUp>
                <SectionHeader
                  eyebrow={c.securityEyebrow}
                  title={c.securityTitle}
                  text={c.securityText}
                  hideEyebrow
                />
              </FadeUp>
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0,1fr))",
                gap: SPACE.lg,
              }}>
                {currentSecurityItems.map((item, i) => (
                  <FadeUp key={item.title} i={i}>
                    <div className="card-hover" style={{
                      ...styles.card,
                      border: item.icon === "shield" ? `1px solid ${GOLD_BORDER}` : `1px solid ${BORDER_DARK}`,
                    }}>
                      <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: item.icon === "shield" ? GOLD_LIGHT : "rgba(39,118,234,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 14,
                      }}>
                        {securityIcon(item.icon, item.icon === "shield" ? GOLD : BLUE)}
                      </div>
                      <h3 style={{ margin: "0 0 8px", fontSize: 17, color: TEXT_PRIMARY }}>{item.title}</h3>
                      <p style={{ ...styles.muted, margin: 0, fontSize: 14 }}>{item.description}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── ABOUT ── */}
      {currentPage === "Biz Kimiz" && (
        <section style={{ ...styles.section, padding: vpad }}>
          <div style={{ ...styles.container, padding: hpad }}>
            <SectionHeader
              eyebrow={c.aboutEyebrow}
              title={c.aboutTitle}
              text={c.aboutText}
            />

            {/* Founder card */}
            <div
              style={{
                ...styles.card,
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "auto 1fr",
                gap: SPACE.xl,
                alignItems: "flex-start",
                marginBottom: SPACE.lg,
                border: `1px solid ${GOLD_BORDER}`,
              }}
            >
              {/* Avatar */}
              <div style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                background: GOLD_LIGHT,
                border: `2px solid ${GOLD_BORDER}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                margin: isMobile ? "0 auto 8px" : 0,
              }}>
                <span style={{ fontSize: 32, fontWeight: 800, color: GOLD }}>MA</span>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY }}>
                    Mehmet Açıkyer
                  </span>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: GOLD,
                    background: GOLD_LIGHT,
                    border: `1px solid ${GOLD_BORDER}`,
                    borderRadius: 999,
                    padding: "3px 10px",
                  }}>
                    {c.founderSection}
                  </span>
                </div>
                <div style={{ color: TEXT_MUTED, fontSize: 14, marginBottom: 14 }}>
                  {lang === "tr" ? "Kurucu & CEO — Decigent" : "Founder & CEO — Decigent"}
                </div>
                <p style={{ ...styles.muted, margin: "0 0 16px", fontSize: 16 }}>
                  {lang === "tr"
                    ? "Mehmet Açıkyer, Türkiye'nin önde gelen bakır üreticilerinden ER-Bakır Elektrolitik Bakır Mamulleri A.Ş.'de 20 yılı aşkın süre görev yaptı; son 12 yılında CIO olarak kurumun tüm bilgi sistemleri ve dijital dönüşüm süreçlerini yönetti. Bu süreçte SAP ERP, SAP BW, Salesforce CRM ve RPA (Automation Anywhere) gibi büyük ölçekli kurumsal projeleri bizzat yönetti; ISO 27001 bilgi güvenliği sisteminin kurulumunda proje yöneticisi ve yönetim temsilcisi olarak görev aldı. Büyük bir üretim şirketinin içinden gelen bu deneyim — ERP verilerinin dağınıklığı, manuel raporlama yükü, onay gecikmeleri — Decigent'i doğrudan şekillendirdi."
                    : "Mehmet Açıkyer spent over 20 years at ER-Bakır Elektrolitik Bakır Mamulleri A.Ş., one of Türkiye's leading copper manufacturers, including 12 years as CIO. During that time he led large-scale enterprise projects including SAP ERP, SAP BW, Salesforce CRM, and RPA (Automation Anywhere), and served as project manager and management representative for ISO 27001 implementation. That insider experience — fragmented ERP data, manual reporting, approval delays — shaped Decigent directly."}
                </p>

                {/* Career highlights */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                  {(lang === "tr"
                    ? ["CIO — ER-Bakır (12 yıl)", "SAP ERP & BW", "Salesforce CRM", "RPA — Automation Anywhere", "ISO 27001", "20+ yıl üretim sektörü"]
                    : ["CIO — ER-Bakır (12 years)", "SAP ERP & BW", "Salesforce CRM", "RPA — Automation Anywhere", "ISO 27001", "20+ years in manufacturing"]
                  ).map((tag) => (
                    <span key={tag} style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: TEXT_MUTED,
                      background: "rgba(247,249,252,0.07)",
                      border: `1px solid ${BORDER_DARK}`,
                      borderRadius: 999,
                      padding: "4px 12px",
                    }}>{tag}</span>
                  ))}
                </div>

                <a
                  href="https://www.linkedin.com/in/mehmet-a%C3%A7%C4%B1kyer-46491b31/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: TEXT_MUTED,
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  <LinkedInMark />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Mission / Vision */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: SPACE.lg,
              }}
            >
              <div className="card-hover" style={styles.card}>
                <h3 style={{ marginTop: 0, color: TEXT_PRIMARY }}>{c.mission}</h3>
                <p style={{ ...styles.muted, margin: 0 }}>{c.missionText}</p>
              </div>
              <div className="card-hover" style={styles.card}>
                <h3 style={{ marginTop: 0, color: TEXT_PRIMARY }}>{c.vision}</h3>
                <p style={{ ...styles.muted, margin: 0 }}>{c.visionText}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── BLOG ── */}
      {currentPage === "Blog" && (
        <section style={{ ...styles.section, padding: vpad }}>
          <div style={{ ...styles.container, padding: hpad }}>
            <FadeUp>
              <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", gap: 20, marginBottom: 32 }}>
                <SectionHeader eyebrow={c.blogEyebrow} title={c.blogTitle} text={c.blogText} />
                <input
                  value={blogQuery}
                  onChange={(e) => setBlogQuery(e.target.value)}
                  placeholder={c.searchPosts}
                  style={{ padding: "12px 16px", borderRadius: 999, border: "1px solid rgba(247,249,252,0.1)", minWidth: isMobile ? "100%" : 240, boxSizing: "border-box", background: "rgba(18,34,56,0.8)", color: TEXT_PRIMARY, outline: "none" }}
                />
              </div>
            </FadeUp>

            {/* LinkedIn callout */}
            <div style={{ ...styles.card, border: `1px solid ${BORDER_DARK}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <LinkedInMark />
                <span style={{ color: TEXT_MUTED, fontSize: 14, lineHeight: 1.5 }}>
                  {lang === "tr"
                    ? "Blog içeriklerimiz LinkedIn'de yayınlanıyor. Aşağıdaki özetlerden ilgilendiğiniz makaleye ulaşabilirsiniz."
                    : "Our blog is published on LinkedIn. Use the summaries below to find the article that interests you."}
                </span>
              </div>
              <a
                href="https://www.linkedin.com/company/decigent/posts/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.buttonSecondary, textDecoration: "none", whiteSpace: "nowrap", fontSize: 13 }}
              >
                {lang === "tr" ? "LinkedIn Sayfamız" : "Our LinkedIn Page"}
              </a>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0,1fr))", gap: SPACE.lg }}>
              {filteredPosts.map((post, i) => (
                <FadeUp key={post.title} i={i}>
                  <div className="card-hover" style={{ ...styles.card, height: "100%", display: "flex", flexDirection: "column" }}>
                    <div style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                      {post.category}
                    </div>
                    <h3 style={{ margin: "0 0 10px", fontSize: 20, color: TEXT_PRIMARY, lineHeight: 1.3, flexGrow: 1 }}>{post.title}</h3>
                    <p style={{ ...styles.muted, fontSize: 14, marginBottom: 20 }}>{post.excerpt}</p>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ ...styles.buttonSecondary, alignSelf: "flex-start", textDecoration: "none", fontSize: 14 }}
                    >
                      {c.readOnLinkedIn}
                    </a>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT ── */}
      {currentPage === "İletişim" && (
        <section style={{ ...styles.section, padding: vpad }}>
          <div style={{ ...styles.container, padding: hpad }}>
            <SectionHeader
              eyebrow={c.contactEyebrow}
              title={c.contactTitle}
              text={c.contactText}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr",
                gap: SPACE.lg,
              }}
            >
              <div className="card-hover" style={styles.card}>
                <h3 style={{ marginTop: 0, color: TEXT_PRIMARY }}>{c.contactForm}</h3>
                <p style={{ ...styles.muted, marginTop: 0 }}>{c.contactFormText}</p>

                {formState === "success" ? (
                  <div style={{
                    padding: "24px",
                    borderRadius: 8,
                    border: `1px solid ${GOLD_BORDER}`,
                    background: GOLD_LIGHT,
                    color: GOLD,
                    lineHeight: 1.6,
                  }}>
                    {c.formSuccess}
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} style={{ display: "grid", gap: SPACE.md }}>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: SPACE.md }}>
                      <input name="name" placeholder={c.name} required style={inputStyle} />
                      <input name="company" placeholder={c.company} style={inputStyle} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: SPACE.md }}>
                      <input name="email" type="email" placeholder={c.email} required style={inputStyle} />
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
                    {formState === "error" && (
                      <div style={{ color: "#F87171", fontSize: 14 }}>{c.formError}</div>
                    )}
                    <button
                      type="submit"
                      disabled={formState === "sending"}
                      style={{ ...styles.buttonGold, opacity: formState === "sending" ? 0.7 : 1 }}
                    >
                      {formState === "sending" ? c.formSending : c.send}
                    </button>
                  </form>
                )}
              </div>

              <div style={{ display: "grid", gap: SPACE.lg, alignContent: "start" }}>
                {[
                  [c.emailLabel, "info@decigent.com"],
                  [c.addressLabel, "Atalar Mh. 1346 Sok. No: 24/10 Pamukkale - DENİZLİ"],
                ].map(([title, text]) => (
                  <div key={title} className="card-hover" style={styles.card}>
                    <div style={{ fontWeight: 700, marginBottom: 8, color: TEXT_MUTED, fontSize: 13 }}>{title}</div>
                    <div style={{ color: TEXT_PRIMARY }}>{text}</div>
                  </div>
                ))}
                <div style={{ fontSize: 13, color: TEXT_MUTED, lineHeight: 1.6, padding: "4px 0" }}>
                  {c.remoteService}
                </div>

                <div style={{ ...styles.card, border: `1px solid ${GOLD_BORDER}`, background: GOLD_LIGHT }}>
                  <div style={{ fontWeight: 700, marginBottom: 10, color: GOLD }}>{c.recommended}</div>
                  <div style={{ color: TEXT_MUTED, lineHeight: 1.7 }}>{c.recommendedText}</div>
                  <div style={{ marginTop: 12, color: TEXT_PRIMARY, fontSize: 13, lineHeight: 1.6 }}>
                    {c.contactNextStep}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── PRE-FOOTER CTA ── */}
      {currentPage === "Ana Sayfa" && (
        <section style={{ background: `linear-gradient(135deg, rgba(13,27,42,0.95) 0%, rgba(10,20,36,0.98) 100%)`, borderTop: `1px solid rgba(247,249,252,0.07)`, borderBottom: `1px solid rgba(247,249,252,0.07)` }}>
          <div style={{ ...styles.container, padding: isMobile ? "56px 16px" : "72px 24px", textAlign: "center" }}>
            <div style={{
              display: "inline-block",
              padding: "6px 14px",
              borderRadius: 999,
              background: GOLD_LIGHT,
              border: `1px solid ${GOLD_BORDER}`,
              color: GOLD,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 20,
            }}>
              {c.engagementSteps[0].title}
            </div>
            <h2 style={{ fontSize: isMobile ? 28 : 42, fontWeight: 800, color: TEXT_PRIMARY, margin: "0 0 16px", lineHeight: 1.15 }}>
              {c.preCtaTitle}
            </h2>
            <p style={{ fontSize: isMobile ? 16 : 18, color: TEXT_MUTED, margin: "0 auto 32px", maxWidth: 560, lineHeight: 1.7 }}>
              {c.preCtaText}
            </p>
            <button
              type="button"
              style={{ ...styles.buttonGold, fontSize: 16, padding: "14px 32px" }}
              onClick={() => setCurrentPage("İletişim")}
            >
              {c.preCtaButton}
            </button>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: `1px solid ${BORDER_DARK}`,
          padding: isMobile ? "40px 0 28px" : "48px 0 32px",
          background: `linear-gradient(180deg, ${BLACK} 0%, rgba(13,27,42,0.42) 100%)`,
        }}
      >
        <div style={{ ...styles.container, padding: hpad }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.35fr 0.85fr 1fr",
              gap: isMobile ? 30 : 48,
              alignItems: "start",
            }}
          >
            <div>
              <img src={logoGold} alt="Decigent" style={{ height: 32, width: "auto", marginBottom: 10 }} />
              <div style={{ color: TEXT_PRIMARY, fontWeight: 700, lineHeight: 1.45, maxWidth: 360 }}>{c.footerTag}</div>
              <div style={{ color: TEXT_MUTED, fontSize: 13, lineHeight: 1.6, marginTop: 12, maxWidth: 380 }}>
                {lang === "tr"
                  ? "Risk bazlı insan onayı, uçtan uca otomasyon ve ölçülebilir pilot yaklaşımıyla."
                  : "With risk-based human approval, end-to-end automation, and measurable pilot delivery."}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12, color: TEXT_PRIMARY }}>{c.menu}</div>
              <div style={{ display: "grid", gap: 9 }}>
                {navItems.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => navigateTo(item)}
                    style={{
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      color: TEXT_MUTED,
                      cursor: "pointer",
                      padding: 0,
                      fontSize: 14,
                      lineHeight: 1.35,
                    }}
                  >
                    {pageLabel(item)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12, color: TEXT_PRIMARY }}>{c.contactInfo}</div>
              <div style={{ display: "grid", gap: 10, color: TEXT_MUTED, fontSize: 14, lineHeight: 1.55 }}>
                <a href="mailto:info@decigent.com" style={{ color: TEXT_MUTED, textDecoration: "none" }}>info@decigent.com</a>
                <div style={{ wordBreak: "break-word" }}>Atalar Mh. 1346 Sok. No: 24/10 Pamukkale - Denizli</div>
                <a
                  href="https://www.linkedin.com/company/decigent/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: TEXT_MUTED,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: SPACE.xs,
                    marginTop: 6,
                    width: "fit-content",
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
              marginTop: isMobile ? 30 : 40,
              paddingTop: 18,
              borderTop: `1px solid ${BORDER_DARK}`,
              color: TEXT_MUTED,
              fontSize: 13,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <span>© {new Date().getFullYear()} Decigent. {c.rights}</span>
            <span>{lang === "tr" ? "Agentic AI · AI Agents · Generative AI" : "Agentic AI · AI Agents · Generative AI"}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
