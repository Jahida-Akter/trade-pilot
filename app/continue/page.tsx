"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

// Set NEXT_PUBLIC_CPA_OFFER_URL in .env to enable auto-redirect to broker
const CPA_URL = process.env.NEXT_PUBLIC_CPA_OFFER_URL || "";

/* ── Animated counter ─────────────────────────────────────────── */
function useCounter(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const steps = 60;
    const inc = target / steps;
    let current = 0;
    const id = setInterval(() => {
      current += inc;
      if (current >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(id);
  }, [target, duration]);
  return val;
}

const STEPS = [
  { icon: "🔐", title: "Identity verified",      sub: "Your details are secure" },
  { icon: "📊", title: "Profile created",         sub: "91% match with profitable traders" },
  { icon: "📞", title: "Specialist being assigned", sub: "You'll receive a call within 24 hrs" },
];

const COPY = {
  en: {
    badgeAlt: "Success badge",
    headline: "You're in - what happens next",
    subhead: "Your application has been received. A trading specialist will contact you personally to walk you through getting started.",
    membersInside: "Members already inside",
    andCounting: "and counting",
    steps: STEPS,
    previewAlt: "Sample trading dashboard showing portfolio performance",
    previewLabel: "Preview: what your dashboard looks like",
    ctaLead: "Your account is ready - open it now",
    ctaBtn: "Open My Trading Account",
    redirecting: "Redirecting automatically in {n}s...",
    callTitle: "What to expect on your call:",
    callItems: [
      "A quick intro - no pressure, no scripts",
      "They'll explain exactly how the platform works",
      "Walk you through your first deposit (min. $250)",
      "Set up your account and answer all your questions",
    ],
    tipLabel: "Pro tip:",
    tipText: "Save the specialist's number when they call - traders who respond quickly tend to get the best onboarding slots.",
    socialMeta: "Milan, Italy - Week 6",
    socialVerified: "Verified",
    socialQuote: "The call lasted about 45 minutes. No pressure at all - they just explained everything clearly. By end of week 2 I had made my first withdrawal.",
    privacy: "Your information is private and will never be shared with third parties.",
  },
  it: {
    badgeAlt: "Badge di conferma",
    headline: "Sei dentro - ecco cosa succede ora",
    subhead: "La tua richiesta e stata ricevuta. Un consulente di trading ti contattera personalmente per aiutarti a iniziare.",
    membersInside: "Membri gia dentro",
    andCounting: "e in aumento",
    steps: [
      { icon: "🔐", title: "Identita verificata", sub: "I tuoi dati sono al sicuro" },
      { icon: "📊", title: "Profilo creato", sub: "91% di compatibilita con trader profittevoli" },
      { icon: "📞", title: "Consulente in assegnazione", sub: "Riceverai una chiamata entro 24 ore" },
    ],
    previewAlt: "Anteprima dashboard di trading",
    previewLabel: "Anteprima: come apparira la tua dashboard",
    ctaLead: "Il tuo account e pronto - aprilo ora",
    ctaBtn: "Apri il mio account di trading",
    redirecting: "Reindirizzamento automatico tra {n}s...",
    callTitle: "Cosa aspettarti dalla chiamata:",
    callItems: [
      "Breve introduzione - senza pressione, senza script",
      "Ti spiegheranno esattamente come funziona la piattaforma",
      "Ti guideranno nel primo deposito (min. $250)",
      "Configureranno l'account e risponderanno a tutte le domande",
    ],
    tipLabel: "Suggerimento:",
    tipText: "Salva il numero del consulente quando chiama - chi risponde rapidamente ottiene spesso i migliori slot di onboarding.",
    socialMeta: "Milano, Italia - Settimana 6",
    socialVerified: "Verificato",
    socialQuote: "La chiamata e durata circa 45 minuti. Nessuna pressione - hanno spiegato tutto con chiarezza. Entro la fine della settimana 2 ho fatto il mio primo prelievo.",
    privacy: "Le tue informazioni sono private e non saranno mai condivise con terze parti.",
  },
  de: {
    badgeAlt: "Erfolgsabzeichen",
    headline: "Du bist drin - so geht es jetzt weiter",
    subhead: "Deine Anfrage ist eingegangen. Ein Trading-Spezialist wird dich personlich kontaktieren und den Start mit dir durchgehen.",
    membersInside: "Mitglieder bereits aktiv",
    andCounting: "und steigend",
    steps: [
      { icon: "🔐", title: "Identitat verifiziert", sub: "Deine Daten sind sicher" },
      { icon: "📊", title: "Profil erstellt", sub: "91% Match mit profitablen Tradern" },
      { icon: "📞", title: "Spezialist wird zugewiesen", sub: "Du wirst innerhalb von 24 Std. angerufen" },
    ],
    previewAlt: "Beispiel eines Trading-Dashboards",
    previewLabel: "Vorschau: so sieht dein Dashboard aus",
    ctaLead: "Dein Konto ist bereit - jetzt eroffnen",
    ctaBtn: "Mein Trading-Konto eroffnen",
    redirecting: "Automatische Weiterleitung in {n}s...",
    callTitle: "Das erwartet dich im Gesprach:",
    callItems: [
      "Kurze Einfuhrung - kein Druck, keine Skripte",
      "Exakte Erklarung, wie die Plattform funktioniert",
      "Begleitung bei der ersten Einzahlung (min. $250)",
      "Kontoeinrichtung und Antworten auf alle Fragen",
    ],
    tipLabel: "Profi-Tipp:",
    tipText: "Speichere die Nummer des Spezialisten - wer schnell reagiert, bekommt oft die besten Onboarding-Zeiten.",
    socialMeta: "Mailand, Italien - Woche 6",
    socialVerified: "Verifiziert",
    socialQuote: "Das Gesprach dauerte etwa 45 Minuten. Kein Druck - alles wurde klar erklart. Ende Woche 2 habe ich meine erste Auszahlung gemacht.",
    privacy: "Deine Daten sind privat und werden niemals an Dritte weitergegeben.",
  },
  fr: {
    badgeAlt: "Badge de succes",
    headline: "Vous etes dedans - voici la suite",
    subhead: "Votre demande a bien ete recue. Un specialiste trading vous contactera personnellement pour vous guider au demarrage.",
    membersInside: "Membres deja actifs",
    andCounting: "et ca continue",
    steps: [
      { icon: "🔐", title: "Identite verifiee", sub: "Vos informations sont securisees" },
      { icon: "📊", title: "Profil cree", sub: "91% de correspondance avec des traders rentables" },
      { icon: "📞", title: "Specialiste en cours d'attribution", sub: "Vous recevrez un appel sous 24 h" },
    ],
    previewAlt: "Apercu du tableau de bord de trading",
    previewLabel: "Apercu : a quoi ressemblera votre tableau de bord",
    ctaLead: "Votre compte est pret - ouvrez-le maintenant",
    ctaBtn: "Ouvrir mon compte de trading",
    redirecting: "Redirection automatique dans {n}s...",
    callTitle: "Ce qui vous attend pendant l'appel :",
    callItems: [
      "Introduction rapide - sans pression, sans script",
      "Explication claire du fonctionnement de la plateforme",
      "Accompagnement pour votre premier depot (min. $250)",
      "Configuration du compte et reponses a vos questions",
    ],
    tipLabel: "Conseil :",
    tipText: "Enregistrez le numero du specialiste - ceux qui repondent vite obtiennent souvent les meilleurs creneaux d'onboarding.",
    socialMeta: "Milan, Italie - Semaine 6",
    socialVerified: "Verifie",
    socialQuote: "L'appel a dure environ 45 minutes. Aucune pression - tout a ete explique clairement. A la fin de la semaine 2, j'avais fait mon premier retrait.",
    privacy: "Vos informations sont privees et ne seront jamais partagees avec des tiers.",
  },
  es: {
    badgeAlt: "Insignia de exito",
    headline: "Ya estas dentro - esto es lo que sigue",
    subhead: "Hemos recibido tu solicitud. Un especialista en trading te contactara personalmente para guiarte en el inicio.",
    membersInside: "Miembros ya dentro",
    andCounting: "y subiendo",
    steps: [
      { icon: "🔐", title: "Identidad verificada", sub: "Tus datos estan seguros" },
      { icon: "📊", title: "Perfil creado", sub: "91% de coincidencia con traders rentables" },
      { icon: "📞", title: "Especialista en asignacion", sub: "Recibiras una llamada en 24 h" },
    ],
    previewAlt: "Vista previa del panel de trading",
    previewLabel: "Vista previa: asi se vera tu panel",
    ctaLead: "Tu cuenta esta lista - abrila ahora",
    ctaBtn: "Abrir mi cuenta de trading",
    redirecting: "Redireccion automatica en {n}s...",
    callTitle: "Que esperar en tu llamada:",
    callItems: [
      "Introduccion rapida - sin presion, sin guiones",
      "Te explicaran exactamente como funciona la plataforma",
      "Te guiaran en tu primer deposito (min. $250)",
      "Configuraran tu cuenta y responderan tus preguntas",
    ],
    tipLabel: "Consejo:",
    tipText: "Guarda el numero del especialista - quienes responden rapido suelen conseguir los mejores cupos de onboarding.",
    socialMeta: "Milan, Italia - Semana 6",
    socialVerified: "Verificado",
    socialQuote: "La llamada duro unos 45 minutos. Cero presion - lo explicaron todo con claridad. Al final de la semana 2 hice mi primer retiro.",
    privacy: "Tu informacion es privada y nunca se compartira con terceros.",
  },
} as const;

export default function ContinuePage() {
  const locale = useLocale();
  const copy = COPY[locale] ?? COPY.en;
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(CPA_URL ? 8 : 0);
  const traders = useCounter(47382, 2000);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 100);
    return () => window.clearTimeout(t);
  }, []);

  // Auto-redirect to broker after countdown (only when CPA_URL is configured)
  useEffect(() => {
    if (!CPA_URL) return;
    const id = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(id); window.location.href = CPA_URL; return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-start justify-center px-4 py-10 sm:py-16">
      <div
        className={`w-full max-w-xl space-y-8 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="text-center space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="flex justify-center">
            <img
              src="/images/badge-success.svg"
              alt={copy.badgeAlt}
              className="h-20 w-20 animate-scale-in"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {copy.headline}
          </h1>
          <p className="text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed">
            {copy.subhead}
          </p>
        </div>

        {/* ── Live traders badge ───────────────────────────────────── */}
        <div
          className="rounded-2xl px-5 py-4 text-center glow-emerald"
          style={{
            background: "linear-gradient(145deg,rgba(12,28,18,0.9) 0%,rgba(6,14,9,0.95) 100%)",
            border: "1px solid rgba(52,211,153,0.2)",
          }}
        >
          <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">{copy.membersInside}</p>
          <p
            className="stat-number text-4xl font-black text-emerald-400"
            style={{ textShadow: "0 0 20px rgba(52,211,153,0.4)" }}
          >
            {traders.toLocaleString()}
          </p>
          <p className="text-xs text-neutral-600 mt-1">{copy.andCounting}</p>
        </div>

        {/* ── Steps ────────────────────────────────────────────────── */}
        <div className="space-y-3">
          {copy.steps.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl px-4 py-4 animate-slide-left"
              style={{
                animationDelay: `${i * 120}ms`,
                background: "linear-gradient(145deg,rgba(14,20,16,0.88) 0%,rgba(8,12,9,0.95) 100%)",
                border: "1px solid rgba(52,211,153,0.12)",
              }}
            >
              <div
                className="shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-lg"
                style={{
                  background: "linear-gradient(135deg,rgba(16,185,129,0.2) 0%,rgba(5,150,105,0.1) 100%)",
                  border: "1px solid rgba(52,211,153,0.3)",
                  boxShadow: "0 0 12px rgba(52,211,153,0.15)",
                }}
              >
                {s.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-100">{s.title}</p>
                <p className="text-xs text-neutral-500">{s.sub}</p>
              </div>
              <span className="ml-auto text-emerald-400 text-sm font-bold">✓</span>
            </div>
          ))}
        </div>
        {/* ── Dashboard preview image ──────────────────────────── */}
        <div
          className="overflow-hidden rounded-2xl"
          style={{ border: "1px solid rgba(52,211,153,0.12)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dashboard-mockup.svg"
            alt={copy.previewAlt}
            className="w-full object-cover rounded-2xl"
            loading="lazy"
          />
          <p className="text-center text-xs text-neutral-600 py-2">{copy.previewLabel}</p>
        </div>
        {/* ── CPA offer CTA ─────────────────────────────────────────── */}
        {CPA_URL ? (
          <div
            className="rounded-2xl p-5 space-y-3 text-center"
            style={{
              background: "linear-gradient(145deg,rgba(12,28,18,0.9) 0%,rgba(6,14,9,0.95) 100%)",
              border: "1px solid rgba(52,211,153,0.25)",
            }}
          >
            <p className="text-sm font-semibold text-neutral-200">{copy.ctaLead}</p>
            <a
              href={CPA_URL}
              className="btn-emerald-gradient inline-flex items-center justify-center gap-2 w-full rounded-2xl px-6 py-4 text-base font-bold text-white shadow-lg"
            >
              {copy.ctaBtn} →
            </a>
            {countdown > 0 && (
              <p className="text-xs text-neutral-500">{copy.redirecting.replace("{n}", String(countdown))}</p>
            )}
          </div>
        ) : null}

        {/* ── What to expect ───────────────────────────────────────── */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-4">
          <p className="text-sm font-semibold text-neutral-200">{copy.callTitle}</p>
          <ul className="space-y-2.5 text-sm text-neutral-400">
            {copy.callItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5 shrink-0">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Tip ──────────────────────────────────────────────────── */}
        <div className="rounded-xl border border-amber-800/30 bg-amber-950/20 px-4 py-3 flex gap-3 items-start">
          <span className="text-lg shrink-0">💡</span>
          <p className="text-xs text-neutral-400 leading-relaxed">
            <strong className="text-neutral-200">{copy.tipLabel}</strong> {copy.tipText}
          </p>
        </div>

        {/* ── Social proof ─────────────────────────────────────────── */}
        <div className="rounded-2xl border border-neutral-700 bg-neutral-900 p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-emerald-700/50 bg-blue-700 text-sm font-bold text-white">
              LF
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-100">Luca F.</p>
              <p className="text-xs text-neutral-500">{copy.socialMeta}</p>
            </div>
            <span className="ml-auto text-xs font-bold text-emerald-400 bg-emerald-900/40 rounded-full px-2 py-0.5">{copy.socialVerified}</span>
          </div>
          <p className="text-sm text-neutral-300 leading-relaxed italic">
            &ldquo;{copy.socialQuote}&rdquo;
          </p>
        </div>

        <p className="text-center text-xs text-neutral-600 pb-6">
          🔒 {copy.privacy}
        </p>
      </div>
    </main>
  );
}

