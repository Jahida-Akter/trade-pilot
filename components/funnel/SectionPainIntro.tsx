"use client";

import { useState, useEffect } from "react";
import RiskDisclaimer from "@/components/funnel/RiskDisclaimer";
import { useT } from "@/components/LocaleProvider";

// ── Famous automation advocates ───────────────────────────────────────────────

const ADVOCATE_ICONS = ["📐", "⚙️", "🧠", "📊"];
const ADVOCATE_NAMES = ["Jim Simons", "Ray Dalio", "Warren Buffett", "Paul Tudor Jones"];

// ── Component ─────────────────────────────────────────────────────────────────

export default function SectionPainIntro({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const t = useT();
  const PAIN_POINTS = [
    { icon: "💸", title: t.s2b_p1_title, body: t.s2b_p1_body, stat: t.s2b_p1_stat },
    { icon: "📈", title: t.s2b_p2_title, body: t.s2b_p2_body, stat: t.s2b_p2_stat },
    { icon: "⛽", title: t.s2b_p3_title, body: t.s2b_p3_body, stat: t.s2b_p3_stat },
    { icon: "⏰", title: t.s2b_p4_title, body: t.s2b_p4_body, stat: t.s2b_p4_stat },
    { icon: "🏦", title: t.s2b_p5_title, body: t.s2b_p5_body, stat: t.s2b_p5_stat },
    { icon: "👴", title: t.s2b_p6_title, body: t.s2b_p6_body, stat: t.s2b_p6_stat },
  ];
  const ADVOCATES = [
    { name: ADVOCATE_NAMES[0], icon: ADVOCATE_ICONS[0], title: t.s2b_adv1_title, quote: t.s2b_adv1_quote, tag: t.s2b_adv1_tag },
    { name: ADVOCATE_NAMES[1], icon: ADVOCATE_ICONS[1], title: t.s2b_adv2_title, quote: t.s2b_adv2_quote, tag: t.s2b_adv2_tag },
    { name: ADVOCATE_NAMES[2], icon: ADVOCATE_ICONS[2], title: t.s2b_adv3_title, quote: t.s2b_adv3_quote, tag: t.s2b_adv3_tag },
    { name: ADVOCATE_NAMES[3], icon: ADVOCATE_ICONS[3], title: t.s2b_adv4_title, quote: t.s2b_adv4_quote, tag: t.s2b_adv4_tag },
  ];
  const [revealed, setRevealed] = useState(false);
  const [counter, setCounter] = useState(0);
  const [showSticky, setShowSticky] = useState(false);

  // Animate entry
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Live bot profit counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => c + Math.floor(Math.random() * 120 + 80));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sticky CTA: show after scrolling past the intro
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "space-y-8 transition-opacity duration-500",
        revealed ? "opacity-100" : "opacity-0",
      ].join(" ")}
    >
      {/* ── Step indicator ── */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <span className="bg-gray-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
        <span>{t.s2b_step_label}</span>
        <span className="flex-1 border-t border-gray-200" />
        <span className="bg-gray-100 rounded-full px-2 py-0.5">{t.s2b_step_duration}</span>
      </div>

      {/* ── Opening headline ── */}
      <div className="space-y-3">
        <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
          {t.s2b_headline}<br />
          <span className="text-amber-500">{t.s2b_headline_em}</span> <br />
          {t.s2b_headline_end}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          {t.s2b_subtext}
        </p>
      </div>

      {/* ── Live counter ── */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-4">
        <div className="text-xs text-amber-600 uppercase tracking-widest font-semibold mb-1">
          {t.s2b_counter_label}
        </div>
        <div className="text-3xl font-extrabold text-amber-600 font-mono tabular-nums">
          +${counter.toLocaleString()}
        </div>
        <div className="text-xs text-amber-500 mt-1">
          {t.s2b_counter_sub}
        </div>
      </div>

      {/* ── Pain cards ── */}
      <div className="space-y-3">
        {PAIN_POINTS.map((p) => (
          <div
            key={p.title}
            className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">{p.icon}</span>
              <div className="space-y-1.5 min-w-0">
                <div className="font-bold text-gray-900 text-sm leading-snug">
                  {p.title}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{p.body}</p>
                <div className="text-xs text-gray-400 italic border-t border-gray-100 pt-1.5">
                  📌 {p.stat}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── The pivot ── */}
      <div className="rounded-2xl bg-gray-900 text-white px-5 py-6 space-y-4">
        <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
          {t.s2b_why_headline}
        </div>
                <p className="text-base font-semibold leading-relaxed">
          {t.s2b_why_text1}
        </p>
                <p className="text-sm text-gray-400">
          {t.s2b_why_text2}
        </p>
         <p className="text-sm font-bold text-white">{t.s2b_why_text3}</p>
 </div>

 {/* ── TradePilot intro ── */}
 <div className="space-y-4">
 <div className="text-center space-y-1">
 <div className="inline-block rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-gray-500">{t.s2b_solution_label}</div>
 <h3 className="text-xl font-extrabold text-gray-900">{t.s2b_tp_headline}</h3>
 <p className="text-gray-500 text-sm">
 {t.s2b_tp_sub}
 </p>
 </div>

 {/* Claude AI badge */}
 <div className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 flex items-start gap-3">
 <span className="text-2xl shrink-0">🧠</span>
 <div>
 <div className="font-bold text-violet-800 text-sm">{t.s2b_claude_title}</div>
 <p className="text-violet-600 text-xs leading-relaxed mt-0.5">
 {t.s2b_claude_body}
 </p>
 </div>
 </div>

 {/* Three simple facts */}
 <div className="space-y-3">
 {[
            { num: "01", heading: t.s2b_fact1_heading, detail: t.s2b_fact1_detail },
            { num: "02", heading: t.s2b_fact2_heading, detail: t.s2b_fact2_detail },
            { num: "03", heading: t.s2b_fact3_heading, detail: t.s2b_fact3_detail },
          ].map((item) => (
 <div
 key={item.num}
 className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white px-4 py-4"
 >
 <div className="text-3xl font-extrabold text-gray-200 shrink-0 leading-none mt-0.5">
 {item.num}
 </div>
 <div className="space-y-1">
 <div className="font-bold text-gray-900 text-sm">
 {item.heading}
 </div>
 <p className="text-gray-500 text-xs leading-relaxed">
 {item.detail}
 </p>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* ── Famous advocates ── */}
 <div className="space-y-3">
 <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold text-center">{t.s2b_advocates_label}</div>
 <div className="space-y-3">
 {ADVOCATES.map((a) => (
 <div
 key={a.name}
 className="rounded-xl border border-gray-200 bg-white px-4 py-4 space-y-2"
 >
 <div className="flex items-start gap-3">
 <span className="text-2xl shrink-0">{a.icon}</span>
 <div>
 <div className="font-bold text-gray-900 text-sm">{a.name}</div>
 <div className="text-xs text-gray-400">{a.title}</div>
 </div>
 </div>
 <p className="text-xs text-gray-600 leading-relaxed italic border-l-2 border-gray-200 pl-3">
 {a.quote}
 </p>
 <div className="inline-block rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
 {a.tag}
 </div>
 </div>
 ))}
 </div>
 <p className="text-center text-xs text-gray-400 leading-relaxed">
 {t.s2b_adv_disclaimer}
 </p>
 </div>

 {/* ── CTA ── */}
 <div className="space-y-3 pb-4">
 <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-4 text-center space-y-1">
 <p className="text-sm font-bold text-gray-900">
 {t.s2b_cta_box_p1}
 </p>
 <p className="text-xs text-gray-500">
 {t.s2b_cta_box_p2}
 </p>
 </div>
 <button
 onClick={onContinue}
 className="btn-gold-gradient group w-full rounded-2xl px-6 py-4 text-base font-bold text-black shadow-lg flex items-center justify-center gap-2"
 style={{ boxShadow: "0 4px 32px rgba(240,165,0,0.50)" }}
 >
          {t.s2b_cta}
          <span className="transition-transform duration-150 group-hover:translate-x-1.5">→</span>
        </button>
 <p className="text-center text-xs text-gray-400">
          {t.s2b_cta_sub}
        </p>
      </div>

      {/* Risk disclaimer */}
      <RiskDisclaimer />

      {/* ── Sticky bottom CTA  appears after scrolling ──────────────────── */}
      {showSticky && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50"
          style={{
            background: "linear-gradient(to top, rgba(255,255,255,0.97) 80%, transparent)",
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: "max(16px, env(safe-area-inset-bottom))",
            paddingTop: 12,
          }}
        >
          <div className="mx-auto max-w-xl">
            <button
              onClick={onContinue}
              className="btn-gold-gradient group w-full rounded-2xl px-6 py-4 text-base font-extrabold text-black flex items-center justify-center gap-2"
              style={{ boxShadow: "0 4px 32px rgba(240,165,0,0.50)" }}
            >
              {t.s2b_cta}
              <span className="transition-transform duration-150 group-hover:translate-x-1.5">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
