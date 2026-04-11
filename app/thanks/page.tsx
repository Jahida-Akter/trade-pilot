"use client";

import { useEffect, useState } from "react";
import { loadFunnelState, patchFunnelState } from "@/lib/funnelState";
import type { FunnelState } from "@/lib/funnelState";
import { useLocale } from "@/components/LocaleProvider";

type ApiOk = { ok: true };
type ApiErr = { ok: false; error?: string; code?: string };
type ApiResp = ApiOk | ApiErr;

const COPY = {
  en: {
    finalizing: "Finalising your checkpoint...",
    pleaseWait: "Please wait...",
    checkpointRecorded: "Checkpoint recorded",
    wentWrong: "Something went wrong",
    genericError: "Something went wrong.",
    networkError: "Network error. Please try again later.",
    recordedMsg: "This checkpoint has been recorded.",
    nextTitle: "What happens next",
    nextBody:
      "A trading specialist may contact you within 24 hours to walk you through getting started. There is no obligation to proceed.",
    reference: "Reference:",
    restart: "Restart",
    secure: "Secure",
    noObligations: "No obligations",
  },
  it: {
    finalizing: "Stiamo finalizzando il tuo checkpoint...",
    pleaseWait: "Attendere...",
    checkpointRecorded: "Checkpoint registrato",
    wentWrong: "Qualcosa e andato storto",
    genericError: "Qualcosa e andato storto.",
    networkError: "Errore di rete. Riprova piu tardi.",
    recordedMsg: "Questo checkpoint e stato registrato.",
    nextTitle: "Cosa succede ora",
    nextBody:
      "Un consulente di trading potrebbe contattarti entro 24 ore per guidarti nei primi passi. Non c'e alcun obbligo di procedere.",
    reference: "Riferimento:",
    restart: "Ricomincia",
    secure: "Sicuro",
    noObligations: "Nessun obbligo",
  },
  de: {
    finalizing: "Dein Checkpoint wird finalisiert...",
    pleaseWait: "Bitte warten...",
    checkpointRecorded: "Checkpoint gespeichert",
    wentWrong: "Etwas ist schiefgelaufen",
    genericError: "Etwas ist schiefgelaufen.",
    networkError: "Netzwerkfehler. Bitte spaeter erneut versuchen.",
    recordedMsg: "Dieser Checkpoint wurde gespeichert.",
    nextTitle: "So geht es weiter",
    nextBody:
      "Ein Trading-Spezialist kann dich innerhalb von 24 Stunden kontaktieren und den Einstieg mit dir durchgehen. Es gibt keine Verpflichtung fortzufahren.",
    reference: "Referenz:",
    restart: "Neu starten",
    secure: "Sicher",
    noObligations: "Keine Verpflichtung",
  },
  fr: {
    finalizing: "Finalisation de votre checkpoint...",
    pleaseWait: "Veuillez patienter...",
    checkpointRecorded: "Checkpoint enregistre",
    wentWrong: "Une erreur est survenue",
    genericError: "Une erreur est survenue.",
    networkError: "Erreur reseau. Veuillez reessayer plus tard.",
    recordedMsg: "Ce checkpoint a ete enregistre.",
    nextTitle: "Et ensuite",
    nextBody:
      "Un specialiste trading peut vous contacter sous 24 heures pour vous guider au demarrage. Vous n'avez aucune obligation de poursuivre.",
    reference: "Reference :",
    restart: "Recommencer",
    secure: "Securise",
    noObligations: "Aucune obligation",
  },
  es: {
    finalizing: "Estamos finalizando tu checkpoint...",
    pleaseWait: "Por favor espera...",
    checkpointRecorded: "Checkpoint registrado",
    wentWrong: "Algo salio mal",
    genericError: "Algo salio mal.",
    networkError: "Error de red. Intentalo de nuevo mas tarde.",
    recordedMsg: "Este checkpoint ha sido registrado.",
    nextTitle: "Que pasa ahora",
    nextBody:
      "Un especialista en trading puede contactarte en 24 horas para guiarte en el inicio. No hay obligacion de continuar.",
    reference: "Referencia:",
    restart: "Reiniciar",
    secure: "Seguro",
    noObligations: "Sin obligaciones",
  },
} as const;

function Spinner() {
  return (
    <svg className="animate-spin" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
    </svg>
  );
}

export default function ThanksPage() {
  const locale = useLocale();
  const copy = COPY[locale] ?? COPY.en;
  const [state, setState] = useState<FunnelState | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>(copy.finalizing);

  useEffect(() => {
    setMessage(copy.finalizing);
  }, [copy.finalizing]);

  useEffect(() => {
    const st = loadFunnelState();
    if (!st.leadId || !st.didContinue) {
      window.location.href = "/";
      return;
    }
    setState(st);
    fireConversion(st.leadId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fireConversion(leadId: string) {
    try {
      const res = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId }),
      });

      const data = (await res.json()) as ApiResp;

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(!data.ok ? data.error || data.code || copy.genericError : copy.genericError);
        return;
      }

      patchFunnelState({ didClickOut: true });
      setStatus("success");
      setMessage(copy.recordedMsg);
    } catch {
      setStatus("error");
      setMessage(copy.networkError);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Card */}
        <div
          className="rounded-2xl p-8 text-center space-y-5"
          style={{
            background: "linear-gradient(145deg,rgba(13,18,32,0.92) 0%,rgba(7,9,15,0.97) 100%)",
            border: status === "success"
              ? "1px solid rgba(52,211,153,0.2)"
              : status === "error"
              ? "1px solid rgba(239,68,68,0.2)"
              : "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Icon ring */}
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              background: status === "success"
                ? "linear-gradient(135deg,rgba(52,211,153,0.25),rgba(16,185,129,0.15))"
                : status === "error"
                ? "linear-gradient(135deg,rgba(239,68,68,0.25),rgba(220,38,38,0.15))"
                : "linear-gradient(135deg,rgba(240,165,0,0.2),rgba(212,132,10,0.1))",
              border: status === "success"
                ? "1px solid rgba(52,211,153,0.3)"
                : status === "error"
                ? "1px solid rgba(239,68,68,0.3)"
                : "1px solid rgba(240,165,0,0.2)",
              color: status === "success" ? "#34d399" : status === "error" ? "#f87171" : "#f0a500",
            }}
          >
            {status === "loading" && <Spinner />}
            {status === "success" && <CheckIcon />}
            {status === "error"   && <ErrorIcon />}
          </div>

          <h1 className="text-xl font-bold text-white">
            {status === "loading" && copy.pleaseWait}
            {status === "success" && copy.checkpointRecorded}
            {status === "error"   && copy.wentWrong}
          </h1>

          <p className="text-sm leading-relaxed" style={{ color: "#8a9bbf" }}>{message}</p>

          {status === "success" && (
            <>
              <div
                className="rounded-xl px-4 py-3.5 text-sm space-y-1"
                style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.12)" }}
              >
                <p className="text-xs font-medium text-emerald-400">{copy.nextTitle}</p>
                <p style={{ color: "#8a9bbf" }}>
                  {copy.nextBody}
                </p>
              </div>

              <p className="text-xs" style={{ color: "#4e5d7a" }}>
                {copy.reference}{" "}
                <span className="font-mono" style={{ color: "#8a9bbf" }}>
                  {state?.leadId?.slice(0, 12)}…
                </span>
              </p>
            </>
          )}

          {status === "error" && (
            <a
              href="/"
              className="btn-gold-gradient inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold"
            >
              {copy.restart}
            </a>
          )}
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="trust-badge">&#128274; {copy.secure}</span>
          <span className="trust-badge">{copy.noObligations}</span>
        </div>
      </div>
    </main>
  );
}
