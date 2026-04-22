"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { createPortal } from "react-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LucideIcon } from "lucide-react";
import {
  CodeIcon,
  GlobeIcon,
  LayersIcon,
  UserPlusIcon,
  Users,
  Star,
  FileText,
  Shield,
  RotateCcw,
  Handshake,
  Leaf,
  HelpCircle,
  BarChart,
  PlugIcon,
  Info,
} from "lucide-react";

type LinkItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
};

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn("sticky top-0 z-50 w-full", {
        "bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg": scrolled,
      })}
    >
      <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-5">
          <a href="#ana-sayfa" className="inline-flex items-center gap-2 hover:bg-accent rounded-md px-2 py-1">
            <img src="/img/decigent_logo_white.png" alt="Decigent" className="h-8 w-auto" />
            <span className="text-sm font-semibold tracking-wide text-white">Decigent</span>
          </a>
          <a href="#ana-sayfa" className="hidden md:inline-flex hover:bg-accent rounded-md px-3 py-2 text-sm font-medium">
            Ana Sayfa
          </a>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Çözümler</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1 pr-1.5">
                  <ul className="bg-popover grid w-lg grid-cols-2 gap-2 rounded-md border p-2 shadow">
                    {productLinks.map((item, i) => (
                      <li key={i}>
                        <ListItem {...item} />
                      </li>
                    ))}
                  </ul>
                  <div className="p-2">
                    <p className="text-muted-foreground text-sm">
                      Interested?{" "}
                      <a href="#" className="text-foreground font-medium hover:underline">
                        Schedule a demo
                      </a>
                    </p>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Hizmetler</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1 pr-1.5 pb-1.5">
                  <div className="grid w-lg grid-cols-2 gap-2">
                    <ul className="bg-popover space-y-2 rounded-md border p-2 shadow">
                      {companyLinks.map((item, i) => (
                        <li key={i}>
                          <ListItem {...item} />
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-2 p-3">
                      {companyLinks2.map((item, i) => (
                        <li key={i}>
                          <NavigationMenuLink
                            href={item.href}
                            className="flex p-2 hover:bg-accent flex-row rounded-md items-center gap-x-2"
                          >
                            <item.icon className="text-foreground size-4" />
                            <span className="font-medium">{item.title}</span>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuLink className="px-4" asChild>
                <a href="#hakkimizda" className="hover:bg-accent rounded-md p-2">
                  Hakkımızda
                </a>
              </NavigationMenuLink>
              <NavigationMenuLink className="px-4" asChild>
                <a href="#iletisim" className="hover:bg-accent rounded-md p-2">
                  İletişim
                </a>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="hidden items-center gap-2 md:flex">
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/90 hover:bg-white/10 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </button>
      </nav>
      <MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
        <NavigationMenu className="max-w-full">
          <div className="flex w-full flex-col gap-y-2">
            <span className="text-sm">Çözümler</span>
            {productLinks.map((link) => (
              <ListItem key={link.title} {...link} />
            ))}
            <span className="text-sm">Hizmetler</span>
            {companyLinks.map((link) => (
              <ListItem key={link.title} {...link} />
            ))}
            {companyLinks2.map((link) => (
              <ListItem key={link.title} {...link} />
            ))}
          </div>
        </NavigationMenu>
        <div className="h-2" />
      </MobileMenu>
    </header>
  );
}

type MobileMenuProps = React.ComponentProps<"div"> & {
  open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg",
        "fixed top-16 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden md:hidden"
      )}
    >
      <div
        data-slot={open ? "open" : "closed"}
        className={cn(
          "data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out",
          "size-full p-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

function ListItem({
  title,
  description,
  icon: Icon,
  className,
  href,
  ...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
  return (
    <NavigationMenuLink
      className={cn(
        "w-full flex flex-row gap-x-2 data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm p-2",
        className
      )}
      {...props}
      asChild
    >
      <a href={href}>
        <div className="bg-background/40 flex aspect-square size-12 items-center justify-center rounded-md shadow-sm">
          <Icon className="text-foreground size-5" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="font-medium">{title}</span>
          <span className="text-muted-foreground text-xs">{description}</span>
        </div>
      </a>
    </NavigationMenuLink>
  );
}

const productLinks: LinkItem[] = [
  {
    title: "Karar Zekâsı",
    href: "#cozumler",
    description: "Veri odaklı karar destek sistemleri",
    icon: GlobeIcon,
  },
  {
    title: "Agentic Workflows",
    href: "#cozumler",
    description: "Ajan tabanlı operasyon akışları",
    icon: LayersIcon,
  },
  {
    title: "Operasyonel Etki",
    href: "#cozumler",
    description: "Hızlı ve tutarlı iş sonuçları",
    icon: UserPlusIcon,
  },
  {
    title: "KPI İzleme",
    href: "#cozumler",
    description: "Süreç ve çıktı metriklerinin takibi",
    icon: BarChart,
  },
  {
    title: "Entegrasyonlar",
    href: "#hizmetler",
    description: "Mevcut sistemlerle bağlanabilir yapı",
    icon: PlugIcon,
  },
  {
    title: "Danışmanlık",
    href: "#hizmetler",
    description: "İhtiyaca göre çözüm tasarımı",
    icon: CodeIcon,
  },
];

const companyLinks: LinkItem[] = [
  {
    title: "Uygulama",
    href: "#hizmetler",
    description: "Planlama, kurulum ve devreye alma",
    icon: Users,
  },
  {
    title: "Pilot Program",
    href: "#hizmetler",
    description: "Hızlı başlangıç ve ölçülebilir sonuç",
    icon: Star,
  },
  {
    title: "Kurumsal Destek",
    href: "#hizmetler",
    icon: Handshake,
    description: "Ekibinizle birlikte ölçekleme",
  },
];

const companyLinks2: LinkItem[] = [
  {
    title: "Hakkımızda",
    href: "#hakkimizda",
    icon: FileText,
  },
  {
    title: "İletişim",
    href: "#iletisim",
    icon: Shield,
  },
  {
    title: "Demo Talebi",
    href: "#iletisim",
    icon: RotateCcw,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/company/decigent",
    icon: Leaf,
  },
  {
    title: "Destek",
    href: "#iletisim",
    icon: HelpCircle,
  },
];

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);

  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  React.useEffect(() => {
    onScroll();
  }, [onScroll]);

  return scrolled;
}
