import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { type Lang, copy, services, solutions, useCases, pilotSteps, securityItems, blogPosts } from "./data";

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
    background: BLACK,
    color: TEXT_PRIMARY,
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
    border: `1px solid ${BORDER_DARK}`,
    borderRadius: "8px",
    padding: "24px",
    background: NAVY,
    boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
  } as const,
  muted: {
    color: TEXT_MUTED,
    fontSize: 17,
    lineHeight: 1.7,
  } as const,
  buttonPrimary: {
    background: BLUE,
    color: TEXT_PRIMARY,
    border: "none",
    borderRadius: "999px",
    padding: "12px 20px",
    cursor: "pointer",
    fontWeight: 600,
  } as const,
  buttonSecondary: {
    background: "transparent",
    color: TEXT_PRIMARY,
    border: `1px solid ${BORDER_DARK}`,
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

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
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
          color: GOLD,
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
        {!isMobile && (
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
        )}
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
  border: `1px solid ${BORDER_DARK}`,
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box",
  background: NAVY,
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
  const vpad = isMobile ? "48px 0" : "64px 0";

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
            flexWrap: "wrap",
            padding: isMobile ? "12px 16px" : "0 24px",
          }}
        >
          <button
            onClick={() => navigateTo("Ana Sayfa")}
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
          >
            <img src="/decigent_logo.svg" alt="Decigent Logo" style={{ height: 40, width: "auto" }} />
          </button>

          {isMobile ? (
            /* Mobile: lang toggle + hamburger */
            <div style={{ display: "flex", alignItems: "center", gap: SPACE.xs }}>
              <div
                style={{
                  display: "flex",
                  border: `1px solid ${BORDER_DARK}`,
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <button
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
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
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
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => navigateTo(item)}
                  style={{
                    border: "none",
                    background: currentPage === item ? GOLD : "transparent",
                    color: currentPage === item ? NAVY : TEXT_MUTED,
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
            style={{
              borderTop: `1px solid ${BORDER_DARK}`,
              background: BLACK,
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
                  background: currentPage === item ? GOLD_LIGHT : "transparent",
                  color: currentPage === item ? GOLD : TEXT_MUTED,
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
              background: BLACK,
              padding: isMobile ? "40px 0 48px" : "64px 0",
            }}
          >
            <div style={{ ...styles.container, padding: hpad }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "0.92fr 1.08fr",
                  gap: isMobile ? 28 : 42,
                  alignItems: "center",
                }}
              >
                <div>
                  <FadeUp i={0}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "7px 12px",
                        borderRadius: 999,
                        border: `1px solid ${GOLD_BORDER}`,
                        background: GOLD_LIGHT,
                        color: GOLD,
                        fontSize: 13,
                        fontWeight: 700,
                        marginBottom: 18,
                      }}
                    >
                      <span style={{ width: 7, height: 7, borderRadius: 999, background: GOLD, display: "inline-block" }} />
                      {c.heroBadge}
                    </div>
                  </FadeUp>
                  <FadeUp i={1}>
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
                    <p style={{ ...styles.muted, margin: 0, fontSize: isMobile ? 16 : 19, maxWidth: 680 }}>
                      {c.heroText}
                    </p>
                  </FadeUp>
                  <FadeUp i={2}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: SPACE.sm, marginTop: 26 }}>
                      <button type="button" style={styles.buttonGold} onClick={() => navigateTo("Use Cases")}>
                        {c.reviewSolutions}
                      </button>
                      <button type="button" style={styles.buttonSecondary} onClick={() => setCurrentPage("İletişim")}>
                        {c.ctaMeet}
                      </button>
                    </div>
                  </FadeUp>
                  <FadeUp i={3}>
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
                        <div key={title} style={{ borderTop: `2px solid ${GOLD}`, paddingTop: 10 }}>
                          <div style={{ color: TEXT_PRIMARY, fontWeight: 800, fontSize: 14, marginBottom: 4 }}>{title}</div>
                          <div style={{ color: TEXT_MUTED, fontSize: 13, lineHeight: 1.45 }}>{text}</div>
                        </div>
                      ))}
                    </div>
                  </FadeUp>
                </div>
                <FadeUp i={1}>
                  <DecisionCoreVisual lang={lang} isMobile={isMobile} />
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ── PROOF STRIP ── */}
          <div style={{ borderTop: `1px solid ${BORDER_DARK}`, borderBottom: `1px solid ${BORDER_DARK}`, background: NAVY }}>
            <div style={{ ...styles.container, padding: isMobile ? "18px 16px" : "18px 24px" }}>
              <div style={{
                display: isMobile ? "grid" : "flex",
                gridTemplateColumns: "1fr 1fr",
                flexWrap: "wrap",
                gap: isMobile ? "10px 12px" : 0,
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                {[
                  { label: lang === "tr" ? "Sonuç yoksa ücret yok" : "No results, no fee", icon: "✦" },
                  { label: lang === "tr" ? "8-12 haftalık pilot" : "8-12 week pilot", icon: "✦" },
                  { label: lang === "tr" ? "İnsan onaylı süreçler" : "Human-approved workflows", icon: "✦" },
                  { label: lang === "tr" ? "Tam audit trail" : "Full audit trail", icon: "✦" },
                  { label: "KVKK / GDPR", icon: "✦" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: GOLD, fontSize: 10 }}>{item.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: TEXT_MUTED, whiteSpace: "nowrap" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── SERVICES ── */}
          <section id="services-section" style={{ ...styles.section, padding: vpad }}>
            <div style={{ ...styles.container, padding: hpad }}>
              <FadeUp>
                <SectionHeader eyebrow={c.servicesEyebrow} title={c.servicesTitle} text={c.servicesText} />
              </FadeUp>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0,1fr))", gap: SPACE.lg }}>
                {currentServices.map((service, index) => {
                  const ServiceIcon = serviceIcons[index] ?? WorkflowIcon;
                  const isFeatured = index === 0;
                  return (
                    <FadeUp key={service.title} i={index}>
                      <div className="card-hover" style={{ ...styles.card, background: isFeatured ? GOLD_LIGHT : NAVY, border: isFeatured ? `1px solid ${GOLD_BORDER}` : `1px solid ${BORDER_DARK}`, height: "100%" }}>
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
          <section id="solutions-section" style={{ ...styles.section, padding: vpad }}>
            <div style={{ ...styles.container, padding: hpad }}>
              <FadeUp>
                <SectionHeader eyebrow={c.solutionsEyebrow} title={c.solutionsTitle} text={c.solutionsText} />
              </FadeUp>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0,1fr))", gap: SPACE.lg }}>
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
                    <h3 style={{ margin: "0 0 10px", fontSize: 28, color: TEXT_PRIMARY }}>{item.title}</h3>
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
            </div>
          </section>

          {/* ── PILOT METHODOLOGY ── */}
          <section style={{ ...styles.section, padding: vpad, background: NAVY }}>
            <div style={{ ...styles.container, padding: hpad }}>
              <FadeUp>
                <SectionHeader
                  eyebrow={c.pilotEyebrow}
                  title={c.pilotTitle}
                  text={c.pilotText}
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
                    ? "Kurumsal yazılım ve operasyon süreçleri üzerine uzun yıllara dayanan deneyimiyle Mehmet Açıkyer, büyük ölçekli kurumlarda yapay zekanın gerçek iş değeri yaratması için ne gerektiğini bizzat gözlemledi. Bu gözlemden doğan Decigent ile kurumsal karar süreçlerini insan onaylı, izlenebilir ve ölçülebilir AI sistemlerine dönüştürmek için çalışıyor."
                    : "With extensive experience in enterprise software and operational processes, Mehmet Açıkyer witnessed firsthand what it takes for AI to create real business value at scale. That insight led him to found Decigent — transforming fragmented enterprise decision workflows into controlled, human-approved, and measurable AI systems."}
                </p>
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
                  style={{ padding: "12px 16px", borderRadius: 999, border: `1px solid ${BORDER_DARK}`, minWidth: isMobile ? "100%" : 240, boxSizing: "border-box", background: NAVY, color: TEXT_PRIMARY }}
                />
              </div>
            </FadeUp>

            {/* LinkedIn callout */}
            <div style={{ ...styles.card, border: `1px solid ${BORDER_DARK}`, display: "flex", alignItems: "center", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
              <LinkedInMark />
              <span style={{ color: TEXT_MUTED, fontSize: 14, lineHeight: 1.5 }}>
                {lang === "tr"
                  ? "Yazıların tamamı LinkedIn'de yayınlanmaktadır. Her makale için \"LinkedIn'de Oku\" butonuna tıklayın."
                  : "All articles are published on LinkedIn. Click \"Read on LinkedIn\" on any post to access the full content."}
              </span>
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
                    <button
                      style={{ ...styles.buttonSecondary, alignSelf: "flex-start" }}
                      onClick={() => window.open("https://www.linkedin.com/company/decigent/", "_blank", "noopener,noreferrer")}
                    >
                      {c.readOnLinkedIn}
                    </button>
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

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: `1px solid ${BORDER_DARK}`,
          padding: "40px 0",
          background: BLACK,
        }}
      >
        <div style={{ ...styles.container, padding: hpad }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
              gap: SPACE.xl,
            }}
          >
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: TEXT_PRIMARY }}>Decigent</div>
              <div style={{ color: TEXT_MUTED }}>{c.footerTag}</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12, color: TEXT_PRIMARY }}>{c.menu}</div>
              <div style={{ display: "grid", gap: SPACE.xs }}>
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => navigateTo(item)}
                    style={{
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      color: TEXT_MUTED,
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
              <div style={{ fontWeight: 700, marginBottom: 12, color: TEXT_PRIMARY }}>{c.contactInfo}</div>
              <div style={{ display: "grid", gap: SPACE.xs, color: TEXT_MUTED }}>
                <div>info@decigent.com</div>
                <div style={{ wordBreak: "break-word" }}>Atalar Mh. 1346 Sok. No: 24/10 Pamukkale - DENİZLİ</div>
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
              borderTop: `1px solid ${BORDER_DARK}`,
              color: TEXT_MUTED,
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
