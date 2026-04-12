"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import RiskDisclaimer from "@/components/funnel/RiskDisclaimer";
import { useT } from "@/components/LocaleProvider";

// ── Scripted EUR/USD candles (38 total) ───────────────────────────────────────
// [open, high, low, close]
const RAW: [number,number,number,number][] = [
  [1.08500,1.08540,1.08470,1.08510],
  [1.08510,1.08555,1.08490,1.08525],
  [1.08525,1.08550,1.08490,1.08500],
  [1.08500,1.08530,1.08475,1.08490],
  [1.08490,1.08520,1.08460,1.08505],
  [1.08505,1.08535,1.08480,1.08510],
  [1.08510,1.08545,1.08490,1.08515],
  [1.08515,1.08530,1.08485,1.08520],
  // ── Trade 1 BUY entry 1.08520 (candle 8) ─────────────────────────────
  [1.08520,1.08580,1.08510,1.08565],
  [1.08565,1.08630,1.08550,1.08615],
  [1.08615,1.08680,1.08600,1.08665],
  [1.08665,1.08730,1.08650,1.08715],
  [1.08715,1.08770,1.08700,1.08755],
  [1.08755,1.08800,1.08740,1.08780],
  // ── Trade 1 TP 1.08780 → +26 pips, +$6.50 (candle 14) ───────────────
  [1.08780,1.08800,1.08750,1.08765],
  [1.08765,1.08785,1.08740,1.08750],
  [1.08750,1.08770,1.08725,1.08745],
  [1.08745,1.08775,1.08730,1.08760],
  [1.08760,1.08800,1.08750,1.08790],
  [1.08790,1.08840,1.08775,1.08830],
  // ── Trade 2 BUY entry 1.08800 (candle 20) ────────────────────────────
  [1.08830,1.08900,1.08820,1.08880],
  [1.08880,1.08950,1.08865,1.08935],
  [1.08935,1.09010,1.08920,1.08990],
  [1.08990,1.09060,1.08975,1.09045],
  [1.09045,1.09110,1.09030,1.09095],
  [1.09095,1.09140,1.09080,1.09125],
  // ── Trade 2 TP 1.09120 → +32 pips, +$8.00 (candle 26) ───────────────
  [1.09125,1.09145,1.09090,1.09105],
  [1.09105,1.09120,1.09065,1.09075],
  [1.09075,1.09095,1.09040,1.09060],
  [1.09060,1.09080,1.09020,1.09040],
  // ── Trade 3 SELL entry 1.09050 (candle 30) ───────────────────────────
  [1.09040,1.09060,1.08995,1.09015],
  [1.09015,1.09030,1.08970,1.08990],
  [1.08990,1.09005,1.08945,1.08965],
  [1.08965,1.08980,1.08920,1.08940],
  [1.08940,1.08960,1.08895,1.08915],
  [1.08915,1.08930,1.08865,1.08880],
  // ── Trade 3 TP 1.08840 → +21 pips, +$5.25 (candle 37) ───────────────
  [1.08880,1.08895,1.08825,1.08845],
];

type C = { o:number; h:number; l:number; c:number };
const CANDLES: C[] = RAW.map(([o,h,l,c]) => ({ o,h,l,c }));

const T1_BUY  = 8;   const T1_ENTRY = 1.08520;
const T1_TP   = 14;  const T1_PIPS  = 26; const T1_USD = 6.50;
const T2_BUY  = 20;  const T2_ENTRY = 1.08800;
const T2_TP   = 26;  const T2_PIPS  = 32; const T2_USD = 8.00;
const T3_SELL = 30;  const T3_ENTRY = 1.09050;
const T3_TP   = 37;  const T3_PIPS  = 21; const T3_USD = 5.25;

const START_BAL   = 250.00;
const TOTAL_USD   = T1_USD + T2_USD + T3_USD; // $19.75

type Phase        = "idle" | "running" | "done";
type TradeSignal  = "BUY" | "SELL";
type ClosedTrade  = { n:number; signal:TradeSignal; pips:number; usd:number };

export default function SectionLiveProof({ onContinue }: { onContinue: () => void }) {
  useT(); // locale hook kept for completeness; translations not needed here
  const [phase,       setPhase]      = useState<Phase>("idle");
  const [shown,       setShown]      = useState(0);
  const [balance,     setBalance]    = useState(START_BAL);
  const [livePrice,   setLivePrice]  = useState(CANDLES[0].c);
  const [signal,      setSignal]     = useState<TradeSignal|null>(null);
  const [entryPrice,  setEntryPrice] = useState<number|null>(null);
  const [livePips,    setLivePips]   = useState(0);
  const [inTrade,     setInTrade]    = useState(false);
  const [closed,      setClosed]     = useState<ClosedTrade[]>([]);
  const [flash,       setFlash]      = useState(false);
  const [status,      setStatus]     = useState("Bot ready. Press Run Bot.");

  const balRef    = useRef(START_BAL);
  const timers    = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervals = useRef<ReturnType<typeof setInterval>[]>([]);

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    intervals.current.forEach(clearInterval);
    timers.current = []; intervals.current = [];
  }, []);

  useEffect(() => () => clearAll(), [clearAll]);

  const later = useCallback((ms:number, fn:()=>void) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const startBot = useCallback(() => {
    clearAll();
    setPhase("running");
    setShown(0);
    setBalance(START_BAL);
    setLivePrice(CANDLES[0].c);
    setSignal(null);
    setEntryPrice(null);
    setLivePips(0);
    setInTrade(false);
    setClosed([]);
    setFlash(false);
    setStatus("Scanning EUR/USD market…");
    balRef.current = START_BAL;

    const TICK = 380;
    let idx = 0;
    const entRef = { price: 0, sig: "BUY" as TradeSignal };

    const ticker = setInterval(() => {
      idx++;
      setShown(idx);
      const candle = CANDLES[idx - 1];
      if (!candle) { clearInterval(ticker); return; }
      setLivePrice(candle.c);

      // Live pips while in a trade
      if (entRef.price > 0) {
        const raw = entRef.sig === "BUY"
          ? (candle.c - entRef.price) * 10000
          : (entRef.price - candle.c) * 10000;
        setLivePips(Math.round(raw));
      }

      // ── Trade 1 BUY ───────────────────────────────────────────────
      if (idx === T1_BUY + 1) {
        entRef.price = T1_ENTRY; entRef.sig = "BUY";
        setSignal("BUY"); setEntryPrice(T1_ENTRY);
        setInTrade(true);
        setStatus(`Trade 1 OPEN — BUY at ${T1_ENTRY.toFixed(5)}`);
      }
      if (idx === T1_TP + 1) {
        entRef.price = 0;
        setInTrade(false); setSignal(null); setEntryPrice(null); setLivePips(0);
        balRef.current = START_BAL + T1_USD;
        setBalance(balRef.current);
        setFlash(true); later(800, () => setFlash(false));
        setClosed(p => [...p, { n:1, signal:"BUY", pips:T1_PIPS, usd:T1_USD }]);
        setStatus(`Trade 1 CLOSED ✓  +${T1_PIPS} pips  +$${T1_USD.toFixed(2)}`);
      }

      // ── Trade 2 BUY ───────────────────────────────────────────────
      if (idx === T2_BUY + 1) {
        entRef.price = T2_ENTRY; entRef.sig = "BUY";
        setSignal("BUY"); setEntryPrice(T2_ENTRY);
        setInTrade(true);
        setStatus(`Trade 2 OPEN — BUY at ${T2_ENTRY.toFixed(5)}`);
      }
      if (idx === T2_TP + 1) {
        entRef.price = 0;
        setInTrade(false); setSignal(null); setEntryPrice(null); setLivePips(0);
        balRef.current = START_BAL + T1_USD + T2_USD;
        setBalance(balRef.current);
        setFlash(true); later(800, () => setFlash(false));
        setClosed(p => [...p, { n:2, signal:"BUY", pips:T2_PIPS, usd:T2_USD }]);
        setStatus(`Trade 2 CLOSED ✓  +${T2_PIPS} pips  +$${T2_USD.toFixed(2)}`);
      }

      // ── Trade 3 SELL ──────────────────────────────────────────────
      if (idx === T3_SELL + 1) {
        entRef.price = T3_ENTRY; entRef.sig = "SELL";
        setSignal("SELL"); setEntryPrice(T3_ENTRY);
        setInTrade(true);
        setStatus(`Trade 3 OPEN — SELL at ${T3_ENTRY.toFixed(5)}`);
      }
      if (idx === T3_TP + 1) {
        entRef.price = 0;
        setInTrade(false); setSignal(null); setEntryPrice(null); setLivePips(0);
        balRef.current = START_BAL + TOTAL_USD;
        setBalance(balRef.current);
        setFlash(true); later(800, () => setFlash(false));
        setClosed(p => [...p, { n:3, signal:"SELL", pips:T3_PIPS, usd:T3_USD }]);
        setStatus(`Trade 3 CLOSED ✓  +${T3_PIPS} pips  +$${T3_USD.toFixed(2)}`);
      }

      // ── End ───────────────────────────────────────────────────────
      if (idx >= CANDLES.length) {
        clearInterval(ticker);
        setPhase("done");
        setStatus("Session complete — 3 trades, 3 wins, $0 effort.");
        later(6000, onContinue);
      }
    }, TICK);

    intervals.current.push(ticker);
  }, [clearAll, later, onContinue]);

  // ── Chart geometry ────────────────────────────────────────────────────────
  const W = 560; const H = 190;
  const PL = 6;  const PR = 6; const PT = 12; const PB = 12;
  const cW = W - PL - PR; const cH = H - PT - PB;
  const total = CANDLES.length;
  const yMin = Math.min(...CANDLES.map(c => c.l)) - 0.0008;
  const yMax = Math.max(...CANDLES.map(c => c.h)) + 0.0008;
  const yR   = yMax - yMin;
  const slotW = cW / total;
  const bW    = Math.max(2, slotW * 0.6);
  const toX   = (i:number) => PL + (i + 0.5) * slotW;
  const toY   = (p:number) => PT + cH * (1 - (p - yMin) / yR);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="text-center space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-500">Live Bot Demo</p>
        <h2 className="text-2xl font-extrabold text-gray-900">Watch the Bot Trade EUR/USD</h2>
        <p className="text-sm text-gray-400">3 trades · all winners · zero input from you</p>
      </div>

      {/* Stats bar */}
      <div
        className={`rounded-2xl px-5 py-4 transition-colors duration-500 ${flash ? "bg-emerald-600" : "bg-gray-900"}`}
      >
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">Pair</p>
            <p className="text-base font-extrabold text-white font-mono">EUR/USD</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">Price</p>
            <p className="text-base font-extrabold text-white font-mono">{livePrice.toFixed(5)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">Balance</p>
            <p className={`text-base font-extrabold font-mono ${flash ? "text-white" : "text-emerald-400"}`}>
              ${balance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Live trade row */}
        {inTrade && signal && entryPrice !== null && (
          <div className="mt-3 pt-3 border-t border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-black ${
                signal === "BUY" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
              }`}>{signal}</span>
              <span className="text-xs text-gray-400 font-mono">@ {entryPrice.toFixed(5)}</span>
            </div>
            <span className={`text-sm font-black font-mono ${livePips >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {livePips >= 0 ? "+" : ""}{livePips} pips
            </span>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 px-1 min-h-[18px]">
        {phase === "running" && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />}
        {phase === "done"    && <span className="text-emerald-500 shrink-0">✓</span>}
        <p className="text-xs text-gray-500 italic">{status}</p>
      </div>

      {/* Candlestick Chart */}
      <div className="rounded-2xl overflow-hidden border border-gray-200">
        {/* Toolbar */}
        <div className="bg-gray-900 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${phase === "running" ? "bg-emerald-400 animate-pulse" : "bg-gray-600"}`} />
            <span className="text-xs text-gray-300 font-mono">EUR/USD · M1 · TradePilot Bot</span>
          </div>
          {phase === "running" && (
            <span className="text-[10px] text-gray-500 font-mono">{shown}/{CANDLES.length}</span>
          )}
          {phase !== "running" && (
            <span className="flex items-center gap-1 rounded-full bg-red-600/80 px-2 py-0.5 text-[10px] font-bold text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
            </span>
          )}
        </div>

        {/* SVG chart */}
        <div className="bg-[#0d0d0d] overflow-hidden">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 190 }}>
            {/* Grid */}
            {[0.25,0.5,0.75].map(f => (
              <line key={f} x1={PL} x2={W-PR} y1={PT+cH*f} y2={PT+cH*f}
                stroke="#1a1a1a" strokeWidth="1"/>
            ))}

            {/* Entry dashed line */}
            {entryPrice !== null && phase === "running" && (
              <>
                <line x1={PL} x2={W-PR} y1={toY(entryPrice)} y2={toY(entryPrice)}
                  stroke={signal === "BUY" ? "#10b981" : "#ef4444"}
                  strokeWidth="1" strokeDasharray="4 3" opacity="0.7"/>
                <text x={W-PR-2} y={toY(entryPrice)-3} fontSize="7"
                  fill={signal === "BUY" ? "#10b981" : "#ef4444"} textAnchor="end" fontWeight="bold">
                  ENTRY
                </text>
              </>
            )}

            {/* Candles */}
            {CANDLES.slice(0, shown).map((c,i) => {
              const green = c.c >= c.o;
              const col   = green ? "#10b981" : "#ef4444";
              const x     = toX(i);
              const bTop  = Math.min(toY(c.o), toY(c.c));
              const bH    = Math.max(1.5, Math.abs(toY(c.c) - toY(c.o)));
              return (
                <g key={i}>
                  <line x1={x} y1={toY(c.h)} x2={x} y2={toY(c.l)} stroke={col} strokeWidth="1"/>
                  <rect x={x-bW/2} y={bTop} width={bW} height={bH} fill={col} rx="0.5"/>
                </g>
              );
            })}

            {/* BUY arrow T1 */}
            {shown > T1_BUY && (()=>{
              const x=toX(T1_BUY); const y=toY(CANDLES[T1_BUY].l)+22;
              return <g><polygon points={`${x},${y-14} ${x-6},${y} ${x+6},${y}`} fill="#10b981"/>
                <text x={x} y={y+11} fontSize="7" fill="#10b981" textAnchor="middle" fontWeight="bold">BUY</text></g>;
            })()}
            {/* TP badge T1 */}
            {shown > T1_TP && (()=>{
              const x=Math.min(toX(T1_TP),W-54); const y=toY(CANDLES[T1_TP].h)-20;
              return <g><rect x={x-27} y={y} width={58} height={15} rx="3" fill="#10b981"/>
                <text x={x+2} y={y+11} fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">+{T1_PIPS} pips</text></g>;
            })()}

            {/* BUY arrow T2 */}
            {shown > T2_BUY && (()=>{
              const x=toX(T2_BUY); const y=toY(CANDLES[T2_BUY].l)+22;
              return <g><polygon points={`${x},${y-14} ${x-6},${y} ${x+6},${y}`} fill="#3b82f6"/>
                <text x={x} y={y+11} fontSize="7" fill="#3b82f6" textAnchor="middle" fontWeight="bold">BUY</text></g>;
            })()}
            {/* TP badge T2 */}
            {shown > T2_TP && (()=>{
              const x=Math.min(toX(T2_TP),W-54); const y=toY(CANDLES[T2_TP].h)-20;
              return <g><rect x={x-27} y={y} width={58} height={15} rx="3" fill="#3b82f6"/>
                <text x={x+2} y={y+11} fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">+{T2_PIPS} pips</text></g>;
            })()}

            {/* SELL arrow T3 */}
            {shown > T3_SELL && (()=>{
              const x=toX(T3_SELL); const y=toY(CANDLES[T3_SELL].h)-22;
              return <g><polygon points={`${x},${y+14} ${x-6},${y} ${x+6},${y}`} fill="#f59e0b"/>
                <text x={x} y={y-6} fontSize="7" fill="#f59e0b" textAnchor="middle" fontWeight="bold">SELL</text></g>;
            })()}
            {/* TP badge T3 */}
            {shown > T3_TP && (()=>{
              const x=Math.min(toX(T3_TP),W-54); const y=toY(CANDLES[T3_TP].l)+20;
              return <g><rect x={x-27} y={y} width={58} height={15} rx="3" fill="#f59e0b"/>
                <text x={x+2} y={y+11} fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">+{T3_PIPS} pips</text></g>;
            })()}

            {/* Live cursor */}
            {phase === "running" && shown > 0 && (
              <line x1={toX(shown-1)} y1={PT} x2={toX(shown-1)} y2={H-PB}
                stroke="#ffffff14" strokeWidth="1"/>
            )}
          </svg>
        </div>
      </div>

      {/* Closed trades */}
      {closed.length > 0 && (
        <div className="space-y-2">
          {closed.map(tr => (
            <div key={tr.n}
              className="flex items-center justify-between rounded-xl px-4 py-3"
              style={{ background:"rgba(16,185,129,0.07)", border:"1px solid rgba(16,185,129,0.2)" }}
            >
              <div className="flex items-center gap-3">
                <span className="text-emerald-500 font-black text-lg">✓</span>
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Trade {tr.n}
                    <span className={`ml-2 rounded px-1.5 py-0.5 text-xs font-black ${
                      tr.signal === "BUY" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>{tr.signal}</span>
                  </p>
                  <p className="text-xs text-gray-400">EUR/USD · closed</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-emerald-600">+${tr.usd.toFixed(2)}</p>
                <p className="text-xs text-emerald-500">+{tr.pips} pips</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Done result summary */}
      {phase === "done" && (
        <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-5 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Session Result</span>
            <span className="text-xs font-semibold text-emerald-600">3 trades · 3 wins · 100%</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-400 mb-0.5">Started with</p>
              <p className="text-3xl font-extrabold text-gray-400 font-mono">$250.00</p>
            </div>
            <div className="text-2xl text-gray-300">→</div>
            <div className="text-right">
              <p className="text-[11px] text-gray-400 mb-0.5">Ended with</p>
              <p className="text-3xl font-extrabold text-emerald-700 font-mono">
                ${(START_BAL + TOTAL_USD).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-200 text-center">
            <div>
              <p className="text-xs text-gray-400">Total pips</p>
              <p className="text-base font-black text-emerald-700">+{T1_PIPS+T2_PIPS+T3_PIPS}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Profit</p>
              <p className="text-base font-black text-emerald-700">+${TOTAL_USD.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Win rate</p>
              <p className="text-base font-black text-emerald-700">100%</p>
            </div>
          </div>
          <p className="text-xs text-emerald-700 leading-relaxed">
            The bot detected 3 setups, entered and exited each trade automatically. You did nothing.
          </p>
        </div>
      )}

      {/* ── Buttons ─────────────────────────────────────────────────────── */}
      {phase === "idle" && (
        <button
          onClick={startBot}
          className="btn-gold-gradient group w-full rounded-2xl px-6 py-4 text-lg font-extrabold text-black shadow-lg flex items-center justify-center gap-2"
          style={{ boxShadow:"0 4px 32px rgba(240,165,0,0.50)" }}
        >
          ▶&nbsp;Run Bot
        </button>
      )}

      {phase === "running" && (
        <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Bot is active — watch the chart above
          </p>
        </div>
      )}

      {phase === "done" && (
        <div className="space-y-3">
          <button
            onClick={onContinue}
            className="btn-gold-gradient group w-full rounded-2xl px-6 py-4 text-base font-bold text-black shadow-lg flex items-center justify-center gap-2"
            style={{ boxShadow:"0 4px 32px rgba(240,165,0,0.50)" }}
          >
            I want this on my account →
          </button>
          <button
            onClick={() => {
              setPhase("idle");
              setShown(0);
              setBalance(START_BAL);
              setLivePrice(CANDLES[0].c);
              setSignal(null);
              setEntryPrice(null);
              setLivePips(0);
              setInTrade(false);
              setClosed([]);
              setFlash(false);
              setStatus("Bot ready. Press Run Bot.");
            }}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm text-gray-400 hover:border-gray-300 transition"
          >
            ↺ Watch again
          </button>
        </div>
      )}

      <RiskDisclaimer compact />
    </div>
  );
}
