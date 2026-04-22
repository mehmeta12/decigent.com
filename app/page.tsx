import React from "react";
import { Header } from "@/components/ui/header-3";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#070a0f] text-white">
      <div className="pointer-events-none absolute inset-0 z-0 bg-black" />

      <div className="relative z-10">
        <Header />

        <section id="ana-sayfa" className="relative w-full overflow-hidden">
          <img
            src="/img/decigent_banner_notext.png"
            alt="Decigent Hero Banner"
            className="h-[56vh] min-h-[360px] w-full object-cover md:h-[68vh]"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 flex items-end md:items-center">
            <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#f6e7c7]">
                Yapay zeka destekli karar ve operasyon çözümleri
              </p>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                İş kararlarını AI ajanları ile otomatikleştiriyoruz
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85">
                Karar süreçlerini hızlandıran, operasyonları akıllı hale getiren yapay zekâ destekli sistemler kuruyoruz.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#iletisim"
                  className="inline-flex items-center justify-center rounded-md bg-[#d0953d]/20 px-5 py-2.5 font-semibold text-[#f6e7c7] hover:bg-[#d0953d]/30"
                >
                  Demo Talep Et
                </a>
                <a
                  href="#cozumler"
                  className="inline-flex items-center justify-center rounded-md bg-white/10 px-5 py-2.5 font-semibold text-white hover:bg-white/20"
                >
                  Çözümleri İncele
                </a>
              </div>
            </div>
          </div>
        </section>

        <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 md:px-6 md:pt-12">
          <section id="cozumler" className="mt-16">
            <h2 className="text-2xl font-semibold md:text-3xl">Çözümler</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="rounded-xl bg-black/30 p-5">
                <h3 className="text-lg font-semibold text-[#f6e7c7]">Decision Intelligence</h3>
                <p className="mt-2 text-sm text-white/70">İş verisini karar kalitesini artıran bir sisteme dönüştürür.</p>
              </article>
              <article className="rounded-xl bg-black/30 p-5">
                <h3 className="text-lg font-semibold text-[#f6e7c7]">Agentic Workflows</h3>
                <p className="mt-2 text-sm text-white/70">Kararları aksiyona taşıyan akıllı iş akışları oluşturur.</p>
              </article>
              <article className="rounded-xl bg-black/30 p-5">
                <h3 className="text-lg font-semibold text-[#f6e7c7]">Operational Impact</h3>
                <p className="mt-2 text-sm text-white/70">Operasyonları hızlandırır, maliyetleri düşürür, tutarlılığı artırır.</p>
              </article>
            </div>
          </section>

          <section id="hizmetler" className="mt-16">
            <h2 className="text-2xl font-semibold md:text-3xl">Hizmetler</h2>
            <p className="mt-3 max-w-3xl text-white/75">
              Analiz, tasarım, pilot uygulama ve ölçekleme adımlarını uçtan uca yönetiyoruz.
            </p>
          </section>

          <section id="hakkimizda" className="mt-16">
            <h2 className="text-2xl font-semibold md:text-3xl">Hakkımızda</h2>
            <p className="mt-3 max-w-3xl text-white/75">
              Decigent, kurumsal karar ve operasyon süreçlerinde ölçülebilir etki üretmek için çalışan bir AI çözüm ekibidir.
            </p>
          </section>

          <section id="iletisim" className="mt-16 rounded-2xl bg-black/35 p-6 md:p-8">
            <h2 className="text-2xl font-semibold md:text-3xl">İletişim</h2>
            <p className="mt-4 text-white/80">
              E-posta:{" "}
              <a href="mailto:info@decigent.com" className="text-[#f6e7c7] underline-offset-2 hover:underline">
                info@decigent.com
              </a>
            </p>
            <p className="mt-2 text-white/80">Telefon: Şimdilik yok</p>
            <p className="mt-2 text-white/80">WhatsApp: Şimdilik yok</p>
            <p className="mt-2 text-white/80">Adres: Atalar Mh. 1346 Sok. No: 24/10 Pamukkale / Denizli</p>
            <p className="mt-2 text-white/80">
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/company/decigent"
                target="_blank"
                rel="noreferrer"
                className="text-[#f6e7c7] underline-offset-2 hover:underline"
              >
                linkedin.com/company/decigent
              </a>
            </p>
          </section>
        </main>

        <footer className="bg-black/40">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 md:grid-cols-4 md:px-6">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#f6e7c7]">Hızlı Linkler</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li><a href="#ana-sayfa" className="hover:text-white">Ana Sayfa</a></li>
                <li><a href="#cozumler" className="hover:text-white">Çözümler</a></li>
                <li><a href="#hizmetler" className="hover:text-white">Hizmetler</a></li>
                <li><a href="#hakkimizda" className="hover:text-white">Hakkımızda</a></li>
                <li><a href="#iletisim" className="hover:text-white">İletişim</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#f6e7c7]">İletişim</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li>info@decigent.com</li>
                <li>Telefon: Şimdilik yok</li>
                <li>WhatsApp: Şimdilik yok</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#f6e7c7]">Yasal</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li>Gizlilik Politikası</li>
                <li>Aydınlatma Metni</li>
                <li>Hizmet Şartları</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#f6e7c7]">Sosyal Medya</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li>
                  <a href="https://www.linkedin.com/company/decigent" target="_blank" rel="noreferrer" className="hover:text-white">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-4 text-center text-xs text-white/60">
            © 2026 Decigent. Tüm hakları saklıdır.
          </div>
        </footer>
      </div>
    </div>
  );
}
