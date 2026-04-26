import { useEffect, useMemo, useState } from "react";
import { type Lang, copy, services, solutions, useCasesList, blogPosts } from "./data";

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

const NAVY = "#0D1B2A";
const GOLD = "#D4A017";
const GOLD_LIGHT = "#FEF9EE";
const GOLD_BORDER = "#F0D89A";
const SOFT_BG = "#F8FAFC";
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
    background: SOFT_BG,
    color: NAVY,
    fontFamily: "'Science Gothic', Inter, Aptos, Arial, sans-serif",
  } as const,
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
  } as const,
  section: {
    padding: "64px 0",
  } as const,
  sectionLarge: {
    padding: "64px 0",
  } as const,
  card: {
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    padding: "24px",
    background: "#ffffff",
    boxShadow: "0 8px 20px rgba(13, 27, 42, 0.04)",
  } as const,
  muted: {
    color: "#64748B",
    fontSize: 17,
    lineHeight: 1.7,
  } as const,
  buttonPrimary: {
    background: NAVY,
    color: "white",
    border: "none",
    borderRadius: "999px",
    padding: "12px 20px",
    cursor: "pointer",
    fontWeight: 600,
  } as const,
  buttonSecondary: {
    background: "white",
    color: NAVY,
    border: "1px solid #cbd5e1",
    borderRadius: "999px",
    padding: "12px 20px",
    cursor: "pointer",
    fontWeight: 600,
  } as const,
  buttonGold: {
    background: GOLD,
    color: NAVY,
    border: "none",
    borderRadius: "999px",
    padding: "12px 20px",
    cursor: "pointer",
    fontWeight: 700,
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
          background: GOLD_LIGHT,
          border: `1px solid ${GOLD_BORDER}`,
          color: "#8A6820",
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 16,
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          margin: "0 0 12px",
          fontSize: "clamp(28px, 3vw, 36px)",
          lineHeight: 1.2,
          fontWeight: 700,
          letterSpacing: 0,
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
        background: NAVY,
        color: "white",
        fontSize: 10,
        fontWeight: 700,
      }}
    >
      in
    </span>
  );
}

function DecisionCoreVisual({ lang, isMobile }: { lang: Lang; isMobile: boolean }) {
  const labels =
    lang === "tr"
      ? {
          data: "ERP / CRM / Excel",
          risk: "Risk Sinyali",
          audit: "Denetim Kaydı",
          action: "Aksiyon Önerisi",
          approval: "İnsan Onayı",
          outcome: "Ölçülen Sonuç",
        }
      : {
          data: "ERP / CRM / Excel",
          risk: "Risk Signal",
          audit: "Audit Trail",
          action: "Recommended Action",
          approval: "Human Approval",
          outcome: "Measured Outcome",
        };

  const card = (
    x: number,
    y: number,
    width: number,
    height: number,
    title: string,
    accent: "blue" | "gold",
    icon: "data" | "risk" | "audit" | "action" | "approval" | "outcome"
  ) => {
    const color = accent === "blue" ? "#2776EA" : GOLD;
    const iconX = x + 40;
    const iconY = y + 26;
    const textLines = title.includes("/") ? [title] : title.split(" ");
    const textX = icon === "data" || icon === "risk" || icon === "audit" ? x + width / 2 : x + 132;
    const textY = icon === "data" || icon === "risk" || icon === "audit" ? y + 118 : y + 56;
    const textAnchor = icon === "data" || icon === "risk" || icon === "audit" ? "middle" : "start";

    return (
      <g key={title}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx="14"
          fill="#0D1B2A"
          fillOpacity="0.72"
          stroke={color}
          strokeWidth="2"
        />
        <g transform={`translate(${iconX} ${iconY})`} stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {icon === "data" && (
            <>
              <ellipse cx="30" cy="14" rx="24" ry="10" />
              <path d="M6 14v42c0 6 11 10 24 10s24-4 24-10V14" />
              <path d="M6 34c0 6 11 10 24 10s24-4 24-10" />
              <rect x="72" y="22" width="50" height="48" rx="4" />
              <path d="M84 36h18M84 50h26M84 64h18" />
            </>
          )}
          {icon === "risk" && (
            <>
              <path d="M42 4l32 14v24c0 24-14 42-32 52-18-10-32-28-32-52V18L42 4z" />
              <path d="M42 28v30M42 74h.1" />
            </>
          )}
          {icon === "audit" && (
            <>
              <path d="M18 6h48l22 22v70H18z" />
              <path d="M66 6v24h22M34 44h26M34 62h20M34 80h18" />
              <circle cx="82" cy="82" r="20" />
              <path d="M82 70v13l9 6" />
            </>
          )}
          {icon === "action" && (
            <>
              <path d="M18 72V36h28" />
              <path d="M46 36l-14-14M46 36L32 50" />
              <circle cx="18" cy="72" r="9" />
              <path d="M70 18l22 22M92 18L70 40M70 72l22 22M92 72L70 94" />
            </>
          )}
          {icon === "approval" && (
            <>
              <circle cx="38" cy="28" r="20" />
              <path d="M8 94c4-30 18-44 30-44s26 14 30 44" />
              <circle cx="82" cy="76" r="20" />
              <path d="M72 76l7 7 15-17" />
            </>
          )}
          {icon === "outcome" && (
            <>
              <path d="M10 88h96" />
              <rect x="18" y="58" width="14" height="30" />
              <rect x="46" y="42" width="14" height="46" />
              <rect x="74" y="24" width="14" height="64" />
              <path d="M16 42l26-26 22 20 36-34" />
              <path d="M84 2h16v16" />
            </>
          )}
        </g>
        <text
          x={textX}
          y={textY}
          fill="#F7F9FC"
          fontSize="25"
          fontWeight="700"
          textAnchor={textAnchor}
        >
          {textLines.map((line, index) => (
            <tspan key={`${line}-${index}`} x={textX} dy={index === 0 ? 0 : 32}>
              {line}
            </tspan>
          ))}
        </text>
      </g>
    );
  };

  return (
    <div
      aria-label="Decigent Decision Core visual"
      style={{
        position: "relative",
        aspectRatio: "16 / 9",
        minHeight: isMobile ? 260 : 420,
        borderRadius: 8,
        overflow: "hidden",
        background: NAVY,
        border: "1px solid rgba(247, 249, 252, 0.12)",
        boxShadow: "0 16px 44px rgba(13, 27, 42, 0.18)",
      }}
    >
      <svg
        viewBox="0 0 1536 864"
        role="img"
        aria-hidden="true"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <radialGradient id="decisionCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2776EA" stopOpacity="0.14" />
            <stop offset="58%" stopColor={NAVY} stopOpacity="0.84" />
            <stop offset="100%" stopColor={NAVY} stopOpacity="1" />
          </radialGradient>
          <filter id="goldGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor={GOLD} floodOpacity="0.42" />
          </filter>
          <filter id="blueGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#2776EA" floodOpacity="0.42" />
          </filter>
        </defs>

        <rect width="1536" height="864" fill={NAVY} />
        <circle cx="768" cy="432" r="318" fill="url(#decisionCoreGlow)" />
        {[148, 184, 220, 256].map((r, index) => (
          <circle
            key={r}
            cx="768"
            cy="432"
            r={r}
            fill="none"
            stroke={index % 2 === 0 ? "#2776EA" : GOLD}
            strokeOpacity={index % 2 === 0 ? 0.32 : 0.26}
            strokeDasharray="6 16"
          />
        ))}

        <circle cx="768" cy="432" r="188" fill="none" stroke={GOLD} strokeWidth="5" filter="url(#goldGlow)" />

        <path d="M368 198h95c70 0 76 70 156 126" fill="none" stroke="#2776EA" strokeWidth="4" strokeLinecap="round" filter="url(#blueGlow)" />
        <path d="M344 432h238" fill="none" stroke="#2776EA" strokeWidth="4" strokeLinecap="round" filter="url(#blueGlow)" />
        <path d="M344 666h116c80 0 88-72 158-128" fill="none" stroke="#2776EA" strokeWidth="4" strokeLinecap="round" filter="url(#blueGlow)" />
        <path d="M917 324c76-58 76-126 156-126h95" fill="none" stroke={GOLD} strokeWidth="4" strokeLinecap="round" filter="url(#goldGlow)" />
        <path d="M954 432h228" fill="none" stroke={GOLD} strokeWidth="4" strokeLinecap="round" filter="url(#goldGlow)" />
        <path d="M918 538c78 58 78 128 158 128h92" fill="none" stroke={GOLD} strokeWidth="4" strokeLinecap="round" filter="url(#goldGlow)" />

        {[{ x: 622, y: 324, c: "#9CCDF6" }, { x: 574, y: 432, c: GOLD }, { x: 622, y: 540, c: "#9CCDF6" }, { x: 914, y: 324, c: GOLD }, { x: 962, y: 432, c: GOLD }, { x: 914, y: 540, c: GOLD }, { x: 768, y: 312, c: GOLD }, { x: 768, y: 552, c: GOLD }].map((dot) => (
          <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r="9" fill={dot.c} filter={dot.c === GOLD ? "url(#goldGlow)" : "url(#blueGlow)"} />
        ))}

        {card(66, 96, 302, 136, labels.data, "blue", "data")}
        {card(66, 364, 278, 136, labels.risk, "blue", "risk")}
        {card(66, 632, 278, 136, labels.audit, "blue", "audit")}
        {card(1128, 104, 342, 136, labels.action, "gold", "action")}
        {card(1128, 372, 342, 136, labels.approval, "gold", "approval")}
        {card(1128, 640, 342, 136, labels.outcome, "gold", "outcome")}

        <text x="768" y="540" textAnchor="middle" fill="#F7F9FC" fontSize="34" fontWeight="800">
          Decision Core
        </text>
      </svg>
      <img
        src="/favicon_gold.ico"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "43%",
          left: "50%",
          width: isMobile ? 62 : 82,
          height: isMobile ? 62 : 82,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          filter: "drop-shadow(0 0 14px rgba(212, 160, 23, 0.38))",
        }}
      />
    </div>
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

  const handleContactSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
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
          background: "rgba(248,250,252,0.94)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #E2E8F0",
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
            <img src="/decigent_logo_header.svg" alt="Decigent Logo" style={{ height: 40, width: "auto" }} />
          </button>

          {isMobile ? (
            /* Mobile: lang toggle + hamburger */
            <div style={{ display: "flex", alignItems: "center", gap: SPACE.xs }}>
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
                    background: lang === "tr" ? NAVY : "white",
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
                    background: lang === "en" ? NAVY : "white",
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
                      background: NAVY, borderRadius: 2,
                      transform: "rotate(45deg) translate(5px, 5px)",
                    }} />
                    <span style={{
                      display: "block", width: 18, height: 2,
                      background: NAVY, borderRadius: 2,
                      opacity: 0,
                    }} />
                    <span style={{
                      display: "block", width: 18, height: 2,
                      background: NAVY, borderRadius: 2,
                      transform: "rotate(-45deg) translate(5px, -5px)",
                    }} />
                  </>
                ) : (
                  /* Hamburger ikonu */
                  <>
                    <span style={{ display: "block", width: 18, height: 2, background: NAVY, borderRadius: 2 }} />
                    <span style={{ display: "block", width: 18, height: 2, background: NAVY, borderRadius: 2 }} />
                    <span style={{ display: "block", width: 18, height: 2, background: NAVY, borderRadius: 2 }} />
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Desktop nav */
            <nav style={{ display: "flex", gap: SPACE.xs, flexWrap: "wrap", alignItems: "center" }}>
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => navigateTo(item)}
                  style={{
                    border: "none",
                    background: currentPage === item ? NAVY : "transparent",
                    color: currentPage === item ? "white" : "#334155",
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
                    background: lang === "tr" ? NAVY : "white",
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
                    background: lang === "en" ? NAVY : "white",
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
              borderTop: "1px solid #E2E8F0",
              background: SOFT_BG,
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
                  background: currentPage === item ? "#F1F5F9" : "transparent",
                  color: currentPage === item ? NAVY : "#334155",
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
          <section
            style={{
              ...styles.sectionLarge,
              background: `linear-gradient(180deg, ${SOFT_BG} 0%, #ffffff 100%)`,
            }}
          >
            <div style={styles.container}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "0.92fr 1.08fr",
                  gap: isMobile ? 28 : 42,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "7px 12px",
                      borderRadius: 999,
                      border: `1px solid ${GOLD_BORDER}`,
                      background: GOLD_LIGHT,
                      color: "#73540B",
                      fontSize: 13,
                      fontWeight: 700,
                      marginBottom: 18,
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 999,
                        background: GOLD,
                        display: "inline-block",
                      }}
                    />
                    {c.heroBadge}
                  </div>
                  <h1
                    style={{
                      fontSize: isMobile ? 38 : 62,
                      lineHeight: 1.02,
                      margin: "0 0 18px",
                      fontWeight: 800,
                      letterSpacing: 0,
                      maxWidth: 760,
                    }}
                  >
                    {c.heroTitle}
                  </h1>
                  <p
                    style={{
                      ...styles.muted,
                      margin: 0,
                      fontSize: isMobile ? 16 : 19,
                      maxWidth: 680,
                    }}
                  >
                    {c.heroText}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: SPACE.sm,
                      marginTop: 26,
                    }}
                  >
                    <button type="button" style={styles.buttonGold} onClick={() => navigateTo("Use Cases")}>
                      {c.reviewSolutions}
                    </button>
                    <button type="button" style={styles.buttonSecondary} onClick={() => setCurrentPage("İletişim")}>
                      {c.ctaMeet}
                    </button>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
                      gap: SPACE.sm,
                      marginTop: 28,
                      maxWidth: 760,
                    }}
                  >
                    {[
                      [c.quickPilot, c.quickPilotText],
                      [c.controlledAI, c.controlledAIText],
                      [c.enterpriseFit, c.enterpriseFitText],
                    ].map(([title, text]) => (
                      <div
                        key={title}
                        style={{
                          borderTop: `2px solid ${GOLD}`,
                          paddingTop: 10,
                        }}
                      >
                        <div style={{ color: NAVY, fontWeight: 800, fontSize: 14, marginBottom: 4 }}>
                          {title}
                        </div>
                        <div style={{ color: "#64748B", fontSize: 13, lineHeight: 1.45 }}>{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <DecisionCoreVisual lang={lang} isMobile={isMobile} />
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
              <div style={{ position: "relative", marginBottom: 32 }}>
                <img
                  src="/decigent_services.png"
                  alt="Decigent services visual"
                  style={{ width: "100%", display: "block", borderRadius: 8 }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(3, minmax(0,1fr))",
                  gap: SPACE.lg,
                }}
              >
                {currentServices.map((service, index) => {
                  const ServiceIcon = serviceIcons[index] ?? WorkflowIcon;
                  const isFeatured = index === 0;
                  return (
                  <div
                    key={service.title}
                    className="card-hover"
                    style={{
                      ...styles.card,
                      background: isFeatured ? GOLD_LIGHT : "#ffffff",
                      border: isFeatured ? `1px solid ${GOLD_BORDER}` : "1px solid #E2E8F0",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 16,
                        background: isFeatured ? "#ffffff" : "#F1F5F9",
                        marginBottom: 16,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ServiceIcon size={22} color="#334155" strokeWidth={2.2} />
                    </div>
                    <h3 style={{ margin: "0 0 10px", fontSize: 22 }}>{service.title}</h3>
                    <p style={{ ...styles.muted, margin: 0 }}>{service.description}</p>
                  </div>
                  );
                })}
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
              <div style={{ position: "relative", marginBottom: 32 }}>
                <img
                  src="/decigent_solutions.png"
                  alt="Decigent solutions visual"
                  style={{ width: "100%", display: "block", borderRadius: 8 }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0,1fr))",
                  gap: SPACE.lg,
                }}
              >
                {currentSolutions.map((item, index) => (
                  <div
                    key={item.title}
                    className="card-hover"
                    style={{
                      ...styles.card,
                      background: index % 2 === 0 ? "#ffffff" : "#F8FAFC",
                    }}
                  >
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
                        gap: SPACE.sm,
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
                  gap: SPACE.lg,
                }}
              >
                {currentSolutions.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="card-hover" style={styles.card}>
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
                  marginTop: 32,
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: SPACE.md,
                }}
              >
                {currentUseCases.map((item) => (
                  <div key={item} className="card-hover" style={{ ...styles.card, padding: 18 }}>
                    <div style={styles.muted}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── WHY DECIGENT ── */}
          <section style={{ ...styles.section, background: SOFT_BG }}>
            <div style={styles.container}>
              <SectionHeader
                eyebrow={c.whyEyebrow}
                title={c.whyTitle}
                text={c.whyText}
              />
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
                      background: item.accent ? NAVY : "#ffffff",
                      color: item.accent ? "#ffffff" : NAVY,
                    }}
                  >
                    <h3 style={{ margin: "0 0 10px", fontSize: 20 }}>{item.title}</h3>
                    <p
                      style={{
                        margin: 0,
                        lineHeight: 1.7,
                        color: item.accent ? "#94a3b8" : "#334155",
                      }}
                    >
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
            </div>
          </section>
        </>
      )}

      {/* ── ABOUT ── */}
      {currentPage === "Biz Kimiz" && (
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
                gap: SPACE.lg,
                marginBottom: 32,
              }}
            >
              <div className="card-hover" style={styles.card}>
                <h3 style={{ marginTop: 0 }}>{c.mission}</h3>
                <p style={{ ...styles.muted, margin: 0 }}>{c.missionText}</p>
              </div>
              <div className="card-hover" style={styles.card}>
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
                marginBottom: 32,
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
                gap: SPACE.lg,
              }}
            >
              {filteredPosts.map((post) => (
                <div key={post.title} className="card-hover" style={styles.card}>
                  <div style={{ color: "#64748B", fontSize: 14, marginBottom: 12 }}>
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
      {currentPage === "İletişim" && (
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
                gap: SPACE.lg,
              }}
            >
              <div className="card-hover" style={styles.card}>
                <h3 style={{ marginTop: 0 }}>{c.contactForm}</h3>
                <p style={{ ...styles.muted, marginTop: 0 }}>{c.contactFormText}</p>

                <form onSubmit={handleContactSubmit} style={{ display: "grid", gap: SPACE.md }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                      gap: SPACE.md,
                    }}
                  >
                    <input name="name" placeholder={c.name} required style={inputStyle} />
                    <input name="company" placeholder={c.company} style={inputStyle} />
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                      gap: SPACE.md,
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

              <div style={{ display: "grid", gap: SPACE.lg }}>
                {[
                  [c.emailLabel, "info@decigent.com"],
                  [c.addressLabel, "Atalar Mh. 1346 Sok. No: 24/10 Pamukkale - DENİZLİ"],
                ].map(([title, text]) => (
                  <div key={title} className="card-hover" style={styles.card}>
                    <div style={{ fontWeight: 700, marginBottom: 8 }}>{title}</div>
                    <div style={styles.muted}>{text}</div>
                  </div>
                ))}

                <div style={{ ...styles.card, background: NAVY, color: "white" }}>
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
          borderTop: "1px solid #E2E8F0",
          padding: "40px 0",
          background: SOFT_BG,
        }}
      >
        <div style={styles.container}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
              gap: SPACE.xl,
            }}
          >
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Decigent</div>
              <div style={{ color: "#64748B" }}>{c.footerTag}</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>{c.menu}</div>
              <div style={{ display: "grid", gap: SPACE.xs }}>
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => navigateTo(item)}
                    style={{
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      color: "#334155",
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
              <div style={{ display: "grid", gap: SPACE.xs, color: "#334155" }}>
                <div>info@decigent.com</div>
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
                    gap: SPACE.xs,
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
              marginTop: 32,
              paddingTop: 20,
              borderTop: "1px solid #E2E8F0",
              color: "#64748B",
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
