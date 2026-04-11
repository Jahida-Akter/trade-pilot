// ── Locale configuration ──────────────────────────────────────────────────────
export type Locale = "en" | "it" | "de" | "fr" | "es";

export const SUPPORTED_LOCALES: Locale[] = ["en", "it", "de", "fr", "es"];

/** Detect locale from Accept-Language header string. */
export function detectLocale(acceptLang: string, cfCountry?: string | null): Locale {
  // Accept-Language takes priority for Switzerland (4 official languages) 
  // country header alone can't distinguish de/fr/it Swiss users.
  // For all other mapped countries, country header wins.
  const primary = acceptLang.split(",")[0]?.split(";")[0]?.split("-")[0]?.toLowerCase();
  const langMap: Record<string, Locale> = {
    it: "it",
    de: "de",
    fr: "fr",
    es: "es",
    ca: "es", // Catalan → Spanish
  };

  if (cfCountry && cfCountry.toUpperCase() !== "CH") {
    const countryMap: Record<string, Locale> = {
      IT: "it",
      DE: "de", AT: "de", // Austria → German
      FR: "fr",
      BE: "fr",           // Belgium → French
      LU: "fr",           // Luxembourg → French
      ES: "es",
      MX: "es", AR: "es", CO: "es", CL: "es", // LATAM → Spanish
    };
    const mapped = countryMap[cfCountry.toUpperCase()];
    if (mapped) return mapped;
  }

  // Switzerland: use Accept-Language, fall back to German (≈65 % of Swiss population)
  if (cfCountry?.toUpperCase() === "CH") {
    return langMap[primary ?? ""] ?? "de";
  }

  // All other unmapped countries: use Accept-Language, fall back to English
  return langMap[primary ?? ""] ?? "en";
}

// ── Translation type (every key required in all locales) ──────────────────────
export type T = {
  // Common
  live: string;
  watching: string;      // "{n} watching right now"
  ssl_secured: string;

  // Footer
  footer_risk_prefix: string;
  footer_risk_body: string;
  footer_terms: string;
  footer_privacy: string;
  footer_deposits: string;
  footer_copyright: string;

  // Section 1 – Hook
  s1_headline: string;
  s1_subtext: string;
  s1_cta_above: string;
  s1_profit_label: string;
  s1_profit_sublabel: string;
  s1_real_accounts: string;
  s1_challenge_title: string;
  s1_challenge_headline: string; // "{n}" placeholder
  s1_challenge_sub: string;
  s1_daily_cap: string;
  s1_mind_label: string;
  s1_mind_question: string;
  s1_mind_nothing: string;
  s1_mind_works: string;
  s1_mind_nothing_title: string;
  s1_mind_nothing_body: string;
  s1_mind_nothing_footer: string;
  s1_mind_works_title: string;
  s1_mind_works_body: string;
  s1_activity_title: string;
  s1_activity_verified: string;
  s1_trust_t1: string; s1_trust_t2: string;
  s1_trust_c1: string; s1_trust_c2: string;
  s1_trust_f1: string; s1_trust_f2: string;
  s1_deposit_title: string;
  s1_deposit_body: string;
  s1_deposit_own1: string; s1_deposit_own2: string;
  s1_deposit_with1: string; s1_deposit_with2: string;
  s1_deposit_reg1: string; s1_deposit_reg2: string;
  s1_cta_main: string;
  s1_cta_sub: string;

  // Section 2 – Pain
  s2_step1: string; s2_step2: string; s2_step3: string;
  s2_missed_label: string;
  s2_missed_sub: string;
  s2_question_label: string;
  s2_headline: string;
  s2_subtext: string;
  s2_opt1_head: string; s2_opt1_sub: string;
  s2_opt2_head: string; s2_opt2_sub: string;
  s2_opt3_head: string; s2_opt3_sub: string;
  s2_footer: string;
  s2_hint: string;        // "Tap the option that describes you best"
  s3_hint: string;        // "Select one answer to continue"
  s2c_scroll_hint: string; // "Scroll down to watch the simulation"
  s2c_strategy_hint: string; // "Tap a strategy above to switch it"

  // Section 3 – Quiz
  s3_progress_label: string;
  s3_question_label: string; // "Question {q} of {total}"
  s3_footer: string;
  s3_q1: string; s3_a1_1: string; s3_a1_2: string; s3_a1_3: string; s3_a1_4: string;
  s3_q2: string; s3_a2_1: string; s3_a2_2: string; s3_a2_3: string; s3_a2_4: string;
  s3_q3: string; s3_a3_1: string; s3_a3_2: string; s3_a3_3: string; s3_a3_4: string;

  // Section 4 – Reveal
  s4_loading_1: string; s4_loading_2: string; s4_loading_3: string;
  s4_loading_4: string; s4_loading_5: string;
  s4_fit_label: string;
  s4_fit_sub: string;
  s4_result_headline: string;
  s4_result_watching: string;
  s4_result_tried: string;
  s4_result_no_time: string;
  s4_modes_label: string;
  s4_mode1_title: string; s4_mode1_badge: string; s4_mode1_desc: string;
  s4_mode2_title: string; s4_mode2_badge: string; s4_mode2_desc: string;
  s4_mode3_title: string; s4_mode3_badge: string; s4_mode3_desc: string;
  s4_mode_recommended: string;
  s4_test1_text: string; s4_test2_text: string; s4_test3_text: string;
  s4_stat1_label: string; s4_stat2_label: string; s4_stat3_label: string;
  s4_urgency_title: string; s4_urgency_sub1: string; s4_urgency_sub2: string;
  s4_cta: string;

  // Section 5 – Scarcity
  s5_spots_one: string;   // "1 spot remaining today"
  s5_spots_many: string;  // "{n} spots remaining today"
  s5_countdown_label: string;
  s5_expired: string;
  s5_expired_sub: string;
  s5_spots_title: string;
  s5_spots_sub: string;
  s5_spots_total: string;
  s5_what_happens: string;
  s5_c1: string; s5_c2: string; s5_c3: string; s5_c4: string;
  s5_qualify_label: string;
  s5_q1: string; s5_q2: string; s5_q3: string; s5_q4: string;
  s5_qualify_footer: string;
  s5_cta: string;
  s5_cta_sub: string;

  // Section 6 – Lead Capture
  s6_progress_label: string;
  s6_headline: string;
  s6_subtext: string;
  s6_min_deposit_label: string;
  s6_specialist_role: string;
  s6_specialist_quote: string;
  s6_specialist_online: string;
  s6_step1_title: string;
  s6_step1_sub: string;
  s6_email_label: string;
  s6_email_placeholder: string;
  s6_continue_btn: string;
  s6_no_spam: string;
  s6_confirmed_label: string;
  s6_change: string;
  s6_first_name_label: string; s6_last_name_label: string;
  s6_fname_placeholder: string; s6_lname_placeholder: string;
  s6_phone_label: string;
  s6_phone_sub: string;
  s6_loading_btn: string;
  s6_confirm_btn: string;
  s6_consent_text: string;
  s6_trust1: string; s6_trust2: string; s6_trust3: string;
  s6_privacy_note: string;
  s6_min_note: string;
  s6_terms_note: string;
  s6_terms_link: string;
  s6_and: string;
  s6_privacy_link: string;

  // Validation errors
  err_email: string;
  err_email_personal: string;
  err_first_name: string;
  err_last_name: string;
  err_full_name: string;
  err_phone: string;
  err_phone_invalid: string;
  err_too_many: string;
  err_rate_limit: string;
  err_generic: string;
  err_network: string;

  // SocialProofTicker
  ticker_joined: string;
  ticker_trade: string;
  ticker_on_page: string;
  ticker_mins_ago: string;

  // ExitIntentModal
  exit_warning: string;
  exit_headline: string;
  exit_body_1: string;
  exit_still_climbing: string;
  exit_body_2: string;
  exit_cta: string;
  exit_or: string;
  exit_soft_prompt: string;
  exit_email_placeholder: string;
  exit_send_btn: string;
  exit_sent: string;
  exit_no_thanks: string;

  // RiskDisclaimer
  risk_label: string;
  risk_body: string;
  risk_compact: string;
  risk_regulated_by: string;

  // SectionPainIntro (S2B)
  s2b_step_label: string;
  s2b_step_duration: string;
  s2b_headline: string;
  s2b_headline_em: string;
  s2b_headline_end: string;
  s2b_subtext: string;
  s2b_counter_label: string;
  s2b_counter_sub: string;
  s2b_p1_title: string; s2b_p1_body: string; s2b_p1_stat: string;
  s2b_p2_title: string; s2b_p2_body: string; s2b_p2_stat: string;
  s2b_p3_title: string; s2b_p3_body: string; s2b_p3_stat: string;
  s2b_p4_title: string; s2b_p4_body: string; s2b_p4_stat: string;
  s2b_p5_title: string; s2b_p5_body: string; s2b_p5_stat: string;
  s2b_p6_title: string; s2b_p6_body: string; s2b_p6_stat: string;
  s2b_why_headline: string;
  s2b_why_text1: string;
  s2b_why_text2: string;
  s2b_why_text3: string;
  s2b_solution_label: string;
  s2b_tp_headline: string;
  s2b_tp_sub: string;
  s2b_claude_title: string;
  s2b_claude_body: string;
  s2b_fact1_heading: string; s2b_fact1_detail: string;
  s2b_fact2_heading: string; s2b_fact2_detail: string;
  s2b_fact3_heading: string; s2b_fact3_detail: string;
  s2b_advocates_label: string;
  s2b_adv_disclaimer: string;
  s2b_adv1_title: string; s2b_adv1_quote: string; s2b_adv1_tag: string;
  s2b_adv2_title: string; s2b_adv2_quote: string; s2b_adv2_tag: string;
  s2b_adv3_title: string; s2b_adv3_quote: string; s2b_adv3_tag: string;
  s2b_adv4_title: string; s2b_adv4_quote: string; s2b_adv4_tag: string;
  s2b_cta_box_p1: string;
  s2b_cta_box_p2: string;
  s2b_cta: string;
  s2b_cta_sub: string;

  // SectionPilotSim (S2C)
  s2c_badge: string;
  s2c_headline: string;
  s2c_subtext: string;
  s2c_win_rate: string;
  s2c_how_works: string;
  s2c_risk_label: string;
  s2c_sl_title: string; s2c_sl_desc: string;
  s2c_tp_title: string; s2c_tp_desc: string;
  s2c_dl_title: string; s2c_dl_desc: string;
  s2c_mt_title: string; s2c_mt_desc: string;
  s2c_running: string;
  s2c_replay: string;
  s2c_cta: string;
  s2c_cta_sub: string;
  s2c_scanning: string;
  s2c_complete: string;
  s2c_idle: string;
  s2c_buy_signal: string;
  s2c_sell_signal: string;

  // SectionLiveProof (S2D)
  s2d_badge: string;
  s2d_headline: string;
  s2d_subtext: string;
  s2d_balance_label: string;
  s2d_status_initial: string;
  s2d_status_scanning: string;
  s2d_status_pattern: string;
  s2d_status_trade1: string;
  s2d_status_tp1: string;
  s2d_status_trade2: string;
  s2d_status_tp2: string;
  s2d_status_done: string;
  s2d_trade_open: string;
  s2d_scanning: string;
  s2d_complete: string;
  s2d_standby: string;
  s2d_milestone_activated: string;
  s2d_milestone_activated_sub: string;
  s2d_milestone_trade1: string;
  s2d_milestone_trade1_sub: string;
  s2d_milestone_tp1: string;
  s2d_milestone_tp1_sub: string;
  s2d_milestone_trade2: string;
  s2d_milestone_trade2_sub: string;
  s2d_milestone_tp2_sub: string;
  s2d_watch_step1_title: string; s2d_watch_step1_desc: string;
  s2d_watch_step2_title: string; s2d_watch_step2_desc: string;
  s2d_watch_step3_title: string; s2d_watch_step3_desc: string;
  s2d_sim_complete_label: string;
  s2d_started_with: string;
  s2d_ended_with: string;
  s2d_trade1_label: string;
  s2d_trade2_label: string;
  s2d_result_box: string;
  s2d_start_btn: string;
  s2d_running_note: string;
  s2d_cta: string;
  s2d_watch_again: string;
  // S1 – 3 quick advantages strip
  s1_adv1: string; s1_adv2: string; s1_adv3: string;
  // S5 – direct/waitlist bypass note
  s5_direct_note: string;
  // S2D – withdrawal log panel
  s2d_withdrawal_title: string;
  s2d_withdrawal_verified: string;
};

// ── ENGLISH ───────────────────────────────────────────────────────────────────
const en: T = {
  live: "Live",
  watching: "{n} watching right now",
  ssl_secured: "SSL Secured",

  footer_risk_prefix: "Risk Warning:",
  footer_risk_body: "Trading in financial instruments involves significant risk. Prices may fluctuate and you may lose more than your initial deposit. Only trade with capital you can afford to lose. Past performance is not indicative of future results. The minimum starting deposit is $250.",
  footer_terms: "Terms",
  footer_privacy: "Privacy",
  footer_deposits: "Why Deposits Fail",
  footer_copyright: "© 2026 TradePilot",

  s1_headline: "The AI that trades for you. 24/7. Four proven strategies. Zero emotion.",
  s1_subtext: "Trading Pilot is the first autonomous trading intelligence engine that fuses real-time technical signals with Claude AI news sentiment, executing trades around the clock with the discipline no human can sustain. Four battle-tested strategies. Six layers of risk protection. One click to deploy.",
  s1_cta_above: "Activate Trading Pilot →",
  s1_profit_label: "Generated by Trading Pilot bots today",
  s1_profit_sublabel: "Live · updates every few seconds · 20+ instruments",
  s1_real_accounts: "Live bots",
  s1_challenge_title: "Happening right now",
  s1_challenge_headline: "While you're reading this, {n} people activated their first Trading Pilot bot today.",
  s1_challenge_sub: "Not professional traders. Regular people who set their risk level, picked a strategy, and let the AI handle the rest. The only thing separating them from you is that they clicked activate.",
  s1_daily_cap: "Daily activations: 100 limit",
  s1_mind_label: "Quick question",
  s1_mind_question: "What happens to the market while you sleep?",
  s1_mind_nothing: "It moves without me",
  s1_mind_works: "I have a bot running",
  s1_mind_nothing_title: "The market never sleeps. Trading Pilot doesn't either.",
  s1_mind_nothing_body: "While you sleep, Trading Pilot scans every price tick across 20+ instruments, fires precise entry signals, and manages open positions 24/7, with no emotion, no hesitation, and sub-millisecond execution. That's the edge people are using right now.",
  s1_mind_nothing_footer: "That's exactly what we're going to show you in under 60 seconds.",
  s1_mind_works_title: "Trading Pilot gives that edge a Claude AI brain.",
  s1_mind_works_body: "Every signal Trading Pilot fires is cross-checked against live market news via Claude AI sentiment analysis before a single trade is placed. A perfect technical setup against negative headlines? Pilot waits. Confirmed signal with bullish sentiment? Pilot acts with full conviction.",
  s1_activity_title: "Live withdrawals",
  s1_activity_verified: "verified · real accounts",
  s1_trust_t1: "4", s1_trust_t2: "AI strategies",
  s1_trust_c1: "24/7", s1_trust_c2: "Autonomous ops",
  s1_trust_f1: "< 1ms", s1_trust_f2: "Signal latency",
  s1_deposit_title: "One thing to know before you activate",
  s1_deposit_body: "To deploy Trading Pilot on a live account, brokers require a minimum starting capital of $250. That's not a fee. It's your own trading capital, sitting in your brokerage account, that you control and can withdraw at any time. Trading Pilot itself is included free.",
  s1_deposit_own1: "Your money", s1_deposit_own2: "Not a fee",
  s1_deposit_with1: "Withdrawable", s1_deposit_with2: "Anytime",
  s1_deposit_reg1: "Regulated", s1_deposit_reg2: "Broker held",
  s1_cta_main: "Activate Trading Pilot. See it live →",
  s1_cta_sub: "Zero to operating in under 60 seconds · no credit card needed",

  s2_step1: "Your goal", s2_step2: "Quick quiz", s2_step3: "Get access",
  s2_missed_label: "While you read this, our bots made",
  s2_missed_sub: "The market never pauses. Automation never sleeps.",
  s2_question_label: "Quick question",
  s2_headline: "What kind of trading setup are you looking for?",
  s2_subtext: "Pick the one closest to you  it shapes your strategy recommendation.",
  s2_opt1_head: "I want to start trading automatically  let AI run trades 24/7 for me",
  s2_opt1_sub: "No chart-watching, no stress. Set a strategy, set my risk, let the bot do the rest",
  s2_opt2_head: "I've tried trading before  I want automation that actually works",
  s2_opt2_sub: "Manual trading is exhausting. I want a system that executes with discipline, not emotion",
  s2_opt3_head: "I want passive returns from Forex, Gold or indices",
  s2_opt3_sub: "I want a bot running in the background while I get on with my life",
  s2_footer: "Your answer helps us match you to the right strategy",
  s2_hint: "👆 Tap the option that describes you best",
  s3_hint: "Select one answer to continue",
  s2c_scroll_hint: "Scroll down to watch the simulation run live",
  s2c_strategy_hint: "Tap a strategy above to switch and replay",

  s3_progress_label: "Building your strategy profile…",
  s3_question_label: "Question {q} of {total}",
  s3_footer: "No right or wrong answers  this helps us match you to the best strategy",
  s3_q1: "Which market do you want your bot to trade?",
  s3_a1_1: "Forex (EUR/USD, GBP/JPY, EUR/GBP…)",
  s3_a1_2: "Commodities (Gold, Oil, Silver…)",
  s3_a1_3: "Indices (Nasdaq, US30, S&P 500…)",
  s3_a1_4: "Let the AI pick the best instrument",
  s3_q2: "How hands-on do you want to be?",
  s3_a2_1: "Fully automated  just let it run 24/7",
  s3_a2_2: "Show me signals  I'll confirm before each trade",
  s3_a2_3: "I want to watch and learn how the bot trades first",
  s3_a2_4: "Not sure  show me what works best",
  s3_q3: "What's your rough starting capital?",
  s3_a3_1: "Starting with the minimum ($250)",
  s3_a3_2: "$500 – $1,000",
  s3_a3_3: "$1,000 – $5,000",
  s3_a3_4: "$5,000+",

  s4_loading_1: "Reading your answers…",
  s4_loading_2: "Finding traders with a similar background…",
  s4_loading_3: "Checking what worked for them…",
  s4_loading_4: "Working out your fit score…",
  s4_loading_5: "Done. Here's what we found.",
  s4_fit_label: "Your fit score",
  s4_fit_sub: "How closely you match traders who are actually profitable",
  s4_result_headline: "What your answers actually mean:",
  s4_result_watching: "People who research before they act tend to run bots that last. That's you. You're not here chasing hype, you want to understand how the system works. Trading Pilot is exactly built for that mindset: set your strategy parameters once, let the AI execute with discipline, review the equity curve as it compounds.",
  s4_result_tried: "Manual trading fails because humans can't maintain the discipline an algorithm can. You likely had the right instincts, just the wrong execution. Trading Pilot removes the emotion entirely. Hard stop-losses fire automatically. The bot halts if daily limits are hit. The strategy you pick has a documented win rate, and it sticks to it, every time.",
  s4_result_no_time: "This is exactly what Trading Pilot was built for. Zero charts to watch. Zero screen time required. You activate a strategy, set your risk level and trade size, and the bot handles entry, management, and exit 24/7 across 20+ instruments. Most users spend under 10 minutes a week reviewing results.",
  s4_modes_label: "Four Trading Pilot strategies. Pick your weapon.",
  s4_mode1_title: "MA Crossover", s4_mode1_badge: "61% win rate",
  s4_mode1_desc: "Trend Detection Engine. Two intelligent moving averages track momentum. Fast MA crosses above slow MA: Pilot enters. Crosses below: exits. Clean, precise, relentless. Works on any asset class.",
  s4_mode2_title: "RSI Reversal", s4_mode2_badge: "58% win rate · avg +1.9R",
  s4_mode2_desc: "Mean Reversion Detector. Measures market exhaustion. When the crowd has sold too aggressively, Pilot buys the rebound. When euphoria peaks, it sells the top: a discipline no human can maintain.",
  s4_mode3_title: "MACD Momentum", s4_mode3_badge: "63% win rate · avg +2.7R",
  s4_mode3_desc: "Momentum Shift Interceptor. Watches for MACD line convergence and catches momentum shifts early, often before the rest of the market even notices the move has begun.",
  s4_mode_recommended: "Highest win rate",
  s4_test1_text: "I set up the MA Crossover strategy on BTCUSD and walked away. Woke up to three closed trades and a positive equity curve. I genuinely didn't touch anything. The bot just did it.",
  s4_test2_text: "I'd lost money twice trading manually. The difference with Trading Pilot is the Claude AI filter: it stopped me entering a trade right before a bad news drop. That alone saved me more than I made in my first month.",
  s4_test3_text: "I run the MACD strategy on EURUSD during the London session and the RSI strategy on Gold overnight. Two bots, set once, running while I work. This is what I thought automated trading was supposed to be.",
  s4_stat1_label: "Instruments supported", s4_stat2_label: "Risk controls per trade", s4_stat3_label: "To get started",
  s4_urgency_title: "Limited activations today", s4_urgency_sub1: "Spots filling fast", s4_urgency_sub2: "Resets every 24 hours",
  s4_cta: "Activate Trading Pilot →",

  s5_spots_one: "1 spot remaining today",
  s5_spots_many: "{n} spots remaining today",
  s5_countdown_label: "Your spot is held for",
  s5_expired: "Time expired",
  s5_expired_sub: "Once this runs out your profile resets and you'd have to start from scratch.",
  s5_spots_title: "Trading Pilot activations in your area",
  s5_spots_sub: "Refreshes every 24 hours",
  s5_spots_total: "/ 10 total",
  s5_what_happens: "What actually happens if you close this?",
  s5_c1: "The market keeps moving 24/7, with or without a bot running for you.",
  s5_c2: "Your Trading Pilot profile disappears and you'd have to start from scratch.",
  s5_c3: "Someone else in your area claims your activation slot.",
  s5_c4: "People who activated last week already have live bots running their strategies.",
  s5_qualify_label: "Before you claim your spot, make sure you qualify",
  s5_q1: "You have a device with internet access",
  s5_q2: "You can spare 10 minutes to set up your account",
  s5_q3: "You understand trading involves risk",
  s5_q4: "You're able to start with a $250 minimum (your trading capital, not a fee, fully withdrawable)",
  s5_qualify_footer: "If all of the above applies to you, your spot is reserved below.",
  s5_cta: "Activate Trading Pilot now →",
  s5_cta_sub: "Included free · works on all 20+ instruments · no credit card needed",

  s6_progress_label: "Almost done…",
  s6_headline: "Last step. Activate your Trading Pilot.",
  s6_subtext: "Your strategy profile is ready. Tell us where to send your access details and a Trading Pilot specialist will personally walk you through deploying your first bot.",
  s6_min_deposit_label: "Minimum starting amount:",
  s6_specialist_role: "Senior Trading Pilot Specialist",
  s6_specialist_quote: "I'll review your strategy selection and walk you through activating your first bot on our 20-minute onboarding call. We'll set your risk parameters, configure the Claude AI filter, and get you live. No pressure, just getting you set up.",
  s6_specialist_online: "Online now, usually replies within 2 hrs",
  s6_step1_title: "Where should we send your Trading Pilot access?",
  s6_step1_sub: "Takes 10 seconds. No card needed. Included free.",
  s6_email_label: "Email address",
  s6_email_placeholder: "you@example.com",
  s6_continue_btn: "Continue →",
  s6_no_spam: "🔒 We never spam or sell your data.",
  s6_confirmed_label: "Email confirmed",
  s6_change: "Change",
  s6_first_name_label: "First name", s6_last_name_label: "Last name",
  s6_fname_placeholder: "First", s6_lname_placeholder: "Last",
  s6_phone_label: "Phone number",
  s6_phone_sub: "A real person will text you to help with setup.",
  s6_loading_btn: "Setting things up…",
  s6_confirm_btn: "Let's go →",
  s6_consent_text: "I agree to be contacted by a trading specialist and confirm I have read the Terms and Privacy Policy. I understand trading involves risk, the minimum starting deposit is $250, and I am 18 or older.",
  s6_trust1: "🔒 Secure & private", s6_trust2: "No credit card", s6_trust3: "No commitment",
  s6_privacy_note: "🔒 Your details are kept private and never shared or sold.",
  s6_min_note: "Minimum deposit to get started:",
  s6_terms_note: "By continuing you agree to our",
  s6_terms_link: "Terms",
  s6_and: "and",
  s6_privacy_link: "Privacy Policy",

  err_email: "Please enter a valid email address.",
  err_email_personal: "Please use your personal email.",
  err_first_name: "Please enter your first name.",
  err_last_name: "Please enter your last name.",
  err_full_name: "Please enter your full name.",
  err_phone: "Please enter your phone number.",
  err_phone_invalid: "Please enter a valid phone number.",
  err_too_many: "Too many attempts. Please refresh and try again.",
  err_rate_limit: "Too many attempts. Please wait a minute and try again.",
  err_generic: "Something went wrong. Please refresh the page and try again.",
  err_network: "Network issue. Please check your connection and try again.",

  // ── SocialProofTicker ──────────────────────────────────────────────────────
  ticker_joined: "{name} from {city} just joined",
  ticker_trade: "{name} from {city} just closed a {amount} trade",
  ticker_on_page: "{name} from {city} is on this page right now",
  ticker_mins_ago: "{n}m ago",

  // ── ExitIntentModal ────────────────────────────────────────────────────────
  exit_warning: "Warning",
  exit_headline: "Hold on  you were so close",
  exit_body_1: "In the time since you opened this page, people on the same platform made:",
  exit_still_climbing: "That number is still climbing right now.",
  exit_body_2: "You don't have to commit to anything. Just finish the last step  it takes under 60 seconds and you can always decide later.",
  exit_cta: "Continue where I left off →",
  exit_or: "or",
  exit_soft_prompt: "Not ready? Drop your email and we'll send you the free guide.",
  exit_email_placeholder: "your@email.com",
  exit_send_btn: "Send",
  exit_sent: "✓ Got it! Check your inbox shortly.",
  exit_no_thanks: "No thanks, I'm not interested",

  // ── RiskDisclaimer ─────────────────────────────────────────────────────────
  risk_label: "Risk Warning:",
  risk_body: "Trading involves risk. Past performance is not indicative of future results. Capital at risk. The value of investments can go down as well as up. You should only trade with money you can afford to lose. Simulated and historical results do not guarantee future performance.",
  risk_compact: "Capital at risk. Past performance is not indicative of future results.",
  risk_regulated_by: "Regulated by",

  // ── SectionPainIntro (S2B) ─────────────────────────────────────────────────
  s2b_step_label: "How automated trading works",
  s2b_step_duration: "2 min",
  s2b_headline: "Automated trading is how",
  s2b_headline_em: "consistent returns are built",
  s2b_headline_end: "not by watching charts.",
  s2b_subtext: "The most successful traders don't sit glued to screens. They deploy rule-based algorithms that execute with precision  24/7, without emotion, without hesitation. Here's what makes it so powerful.",
  s2b_counter_label: "Generated by Trading Pilot bots since you opened this page",
  s2b_counter_sub: "Every tick is a real automated trade closing on a live account.",
  s2b_p1_title: "The market trades 24 hours a day  automation never misses a move",
  s2b_p1_body: "No human can scan EUR/USD, Gold, and the Nasdaq simultaneously at 3 AM. A bot can. Every price tick, every pattern, every signal  checked and executed in milliseconds without fatigue.",
  s2b_p1_stat: "Forex alone processes $7.5 trillion per day  the majority handled by algorithms.",
  s2b_p2_title: "Emotion is the #1 reason traders lose money",
  s2b_p2_body: "Fear stops you entering a valid trade. Greed keeps you in too long. Panic makes you exit at exactly the wrong moment. Algorithms have none of these flaws  they follow the rules every single time.",
  s2b_p2_stat: "Over 70% of retail trader losses are linked to emotional decision-making.",
  s2b_p3_title: "Four proven strategies  each built for different market conditions",
  s2b_p3_body: "MA Crossover catches sustained trends. RSI Reversal detects market exhaustion. MACD Momentum intercepts momentum shifts early. Pure Momentum rides breakouts. Run one or multiple bots simultaneously.",
  s2b_p3_stat: "Combined win rates: 55–63% depending on strategy and market conditions.",
  s2b_p4_title: "Six layers of risk protection on every single trade",
  s2b_p4_body: "Hard stop-loss. Take-profit auto-exit. Max daily loss circuit-breaker. Daily trade cap. Confirmation bar filtering. Real-time equity monitoring. Your capital is always protected automatically.",
  s2b_p4_stat: "Risk is defined before every trade opens  not reacted to in a panic.",
  s2b_p5_title: "Claude AI filters news sentiment before every trade fires",
  s2b_p5_body: "A perfect technical signal right before a negative news event? Pilot checks Claude AI sentiment first and waits. Confirmed bullish signal with positive sentiment? It acts with full conviction  an edge no manual trader can replicate.",
  s2b_p5_stat: "AI sentiment filtering reduces false entries in high-volatility news events.",
  s2b_p6_title: "Start with $250 and scale at your own pace",
  s2b_p6_body: "You don't need a large account to get started. Trading Pilot operates from a $250 minimum deposit  your own trading capital, in your brokerage account, fully withdrawable whenever you choose.",
  s2b_p6_stat: "Minimum capital: $250. Your money. Your account. Withdraw any time.",
  s2b_why_headline: "Why automation consistently beats manual trading",
  s2b_why_text1: "The world's most successful traders  Jim Simons, Ray Dalio, Paul Tudor Jones  have all moved to algorithmic systems. Not because it's easier, but because no human can match the consistency and discipline of a well-designed algorithm.",
  s2b_why_text2: "Simons' Medallion Fund averaged 66% annual returns for 30 years  run purely by algorithms, around the clock. That same principle is now available to retail traders through Trading Pilot.",
  s2b_why_text3: "The next step shows you exactly how it works.",
  s2b_solution_label: "The solution",
  s2b_tp_headline: "Meet Trading Pilot",
  s2b_tp_sub: "The first autonomous trading intelligence engine that fuses real-time technical signals with Claude AI news sentiment  executing trades 24/7 with the discipline no human can sustain.",
  s2b_claude_title: "Claude AI Sentiment Engine",
  s2b_claude_body: "Before every trade, Pilot queries Claude AI for live news sentiment on that asset. A perfect crossover with negative headlines? Pilot waits. Confirmed signal with bullish sentiment? Pilot acts with full conviction.",
  s2b_fact1_heading: "It watches the market so you don't have to",
  s2b_fact1_detail: "Trading Pilot scans every price tick, every minute, across 20+ instruments  24/7 with zero hesitation and sub-millisecond signal execution. The market never sleeps, and neither does Pilot.",
  s2b_fact2_heading: "Four battle-tested strategies, not guesswork",
  s2b_fact2_detail: "MA Crossover (61% win rate), RSI Reversal (58%), MACD Momentum (63%), Pure Momentum (55%). Each engineered for a different market condition. You pick one  or run multiple pilots simultaneously across different assets.",
  s2b_fact3_heading: "Six layers of institutional-grade risk protection",
  s2b_fact3_detail: "Hard stop-loss on every trade. Take-profit locking. Max daily loss circuit-breaker. Max daily trades cap. Confirmation bar filtering. Real-time equity curve monitoring. Your capital is always protected.",
  s2b_advocates_label: "Who has been doing this for decades",
  s2b_adv_disclaimer: "These individuals are not affiliated with or endorsing Trading Pilot. Their publicly documented use of algorithmic and rules-based trading systems demonstrates the power of automation.",
  s2b_adv1_title: "Renaissance Technologies quantitative trading legend",
  s2b_adv1_quote: "The Medallion Fund, run entirely by mathematical algorithms, averaged 66% annual returns over 30 years the greatest investing track record in history.",
  s2b_adv1_tag: "66% annual returns · Purely algorithmic",
  s2b_adv2_title: "Bridgewater Associates world's largest hedge fund",
  s2b_adv2_quote: "Dalio built Bridgewater on a system he calls 'The Machine' a set of algorithms and principles that remove human emotion from every investment decision.",
  s2b_adv2_tag: "$160B AUM · Algorithm-first",
  s2b_adv3_title: "Berkshire Hathaway world's most famous investor",
  s2b_adv3_quote: "\"The stock market is a device for transferring money from the impatient to the patient.\" Systems enforce patience. Humans almost never can.",
  s2b_adv3_tag: "Discipline over emotion · Rules-based thinking",
  s2b_adv4_title: "Tudor Investment Corp macro trading legend",
  s2b_adv4_quote: "Jones pioneered computer-driven systematic strategies in the 1980s and has consistently advocated for rules-based, emotion-free trade execution.",
  s2b_adv4_tag: "Systematic strategies since the '80s",
  s2b_cta_box_p1: "Now let's show you exactly how Trading Pilot would have acted on last week's market.",
  s2b_cta_box_p2: "Real strategy logic. Real chart data. Claude AI sentiment live.",
  s2b_cta: "Show me how it works →",
  s2b_cta_sub: "Free to access · No credit card · Takes 60 seconds to set up",

  // ── SectionPilotSim (S2C) ──────────────────────────────────────────────────
  s2c_badge: "Live Simulation · Claude AI Active",
  s2c_headline: "Watch Trading Pilot Think in Real-Time",
  s2c_subtext: "Pick a strategy. See how the bot detects a signal, checks live news sentiment via Claude AI, then fires or suppresses the trade  automatically.",
  s2c_win_rate: "{n}% win rate",
  s2c_how_works: "How {name} works",
  s2c_risk_label: "Built-in risk controls  every strategy",
  s2c_sl_title: "Stop-Loss", s2c_sl_desc: "Hard stop on every trade",
  s2c_tp_title: "Take-Profit", s2c_tp_desc: "Auto-exits at your target",
  s2c_dl_title: "Daily loss cap", s2c_dl_desc: "Bot halts if limit hit",
  s2c_mt_title: "Max daily trades", s2c_mt_desc: "No overtrading in noise",
  s2c_running: "Simulation running…",
  s2c_replay: "↺ Run simulation again",
  s2c_cta: "I want TradePilot working for me →",
  s2c_cta_sub: "Free to access · Takes 60 seconds · No credit card needed",
  s2c_scanning: "SCANNING",
  s2c_complete: "COMPLETE",
  s2c_idle: "IDLE",
  s2c_buy_signal: "BUY signal",
  s2c_sell_signal: "SELL signal",

  // ── SectionLiveProof (S2D) ─────────────────────────────────────────────────
  s2d_badge: "Watch it trade live",
  s2d_headline: "$250 account. Bot trading EUR/USD. Fully automated.",
  s2d_subtext: "Watch TradePilot spot opportunities and make trades in real time while you do absolutely nothing.",
  s2d_balance_label: "Account Balance",
  s2d_status_initial: "TradePilot is watching the market...",
  s2d_status_scanning: "Scanning every price tick. Looking for the right moment...",
  s2d_status_pattern: "Spotted a pattern forming. Fast line crossing above slow line...",
  s2d_status_trade1: "Trade #1 open  bot is in the market now.",
  s2d_status_tp1: "Trade #1 closed with profit!",
  s2d_status_trade2: "Second setup spotted  bot entering market again.",
  s2d_status_tp2: "Second trade closed with profit!",
  s2d_status_done: "Session complete. 2 trades. 2 wins. Zero effort from you.",
  s2d_trade_open: "TRADE OPEN",
  s2d_scanning: "SCANNING",
  s2d_complete: "COMPLETE",
  s2d_standby: "STANDBY",
  s2d_milestone_activated: "Bot activated  watching market",
  s2d_milestone_activated_sub: "Scanning every tick for a signal...",
  s2d_milestone_trade1: "Trade #1 opened",
  s2d_milestone_trade1_sub: "Bot entered at the right moment.",
  s2d_milestone_tp1: "+${amount} profit locked",
  s2d_milestone_tp1_sub: "First trade closed in the green.",
  s2d_milestone_trade2: "Second trade opened",
  s2d_milestone_trade2_sub: "Bot spotted another opportunity.",
  s2d_milestone_tp2_sub: "Both trades closed in the green.",
  s2d_watch_step1_title: "Bot watches",
  s2d_watch_step1_desc: "Every price movement, 24/7",
  s2d_watch_step2_title: "Spots opportunity",
  s2d_watch_step2_desc: "Detects the right moment automatically",
  s2d_watch_step3_title: "Locks profit",
  s2d_watch_step3_desc: "Exits the trade at your target price",
  s2d_sim_complete_label: "Simulation complete",
  s2d_started_with: "Started with",
  s2d_ended_with: "Ended with",
  s2d_trade1_label: "Trade 1: EUR/USD",
  s2d_trade2_label: "Trade 2: EUR/USD",
  s2d_result_box: "You did nothing. The bot watched the chart, spotted two opportunities, entered both trades, and closed them at a profit. That's what TradePilot does for you every day.",
  s2d_start_btn: "▶  Watch it trade live",
  s2d_running_note: "Simulation running  watch the chart above...",
  s2d_cta: "I want this running on my account →",
  s2d_watch_again: "↺ Watch again",
  s1_adv1: "Minimal manual work",
  s1_adv2: "No experience needed",
  s1_adv3: "Withdraw in 24–48h",
  s5_direct_note: "You're accessing via a direct registration link  this bypasses the public waitlist and reserves your spot immediately. Once you leave this page, this spot cannot be guaranteed.",
  s2d_withdrawal_title: "Recent withdrawals from your region",
  s2d_withdrawal_verified: "verified · real accounts",
};

// ── ITALIAN ───────────────────────────────────────────────────────────────────
const it: T = {
  live: "Live",
  watching: "{n} persone guardano adesso",
  ssl_secured: "Connessione sicura SSL",

  footer_risk_prefix: "Avvertenza sul rischio:",
  footer_risk_body: "Il trading in strumenti finanziari comporta rischi significativi. I prezzi possono variare e potresti perdere più del tuo deposito iniziale. Opera solo con capitale che puoi permetterti di perdere. I risultati passati non sono indicativi di quelli futuri. Il deposito iniziale minimo è di $250.",
  footer_terms: "Termini",
  footer_privacy: "Privacy",
  footer_deposits: "Perché i depositi falliscono",
  footer_copyright: "© 2026 TradePilot",

  s1_headline: "L'AI che fa trading per te. 24/7. Quattro strategie collaudate. Zero emozioni.",
  s1_subtext: "Trading Pilot è il primo motore di intelligenza di trading autonoma che fonde segnali tecnici in tempo reale con il sentiment delle notizie di Claude AI, eseguendo trade 24 ore su 24 con la disciplina che nessun essere umano può sostenere. Quattro strategie collaudate. Sei livelli di protezione del rischio. Un click per attivare.",
  s1_cta_above: "Attiva Trading Pilot →",
  s1_profit_label: "Generato dai bot Trading Pilot oggi",
  s1_profit_sublabel: "In diretta · si aggiorna ogni pochi secondi · 20+ strumenti",
  s1_real_accounts: "Bot attivi",
  s1_challenge_title: "Sta succedendo adesso",
  s1_challenge_headline: "Mentre leggi questo, {n} persone hanno attivato il loro primo bot Trading Pilot oggi.",
  s1_challenge_sub: "Non trader professionisti. Persone comuni che hanno impostato il loro livello di rischio, scelto una strategia e lasciato che l'AI facesse il resto. L'unica cosa che le separa da te è che hanno cliccato su attiva.",
  s1_daily_cap: "Attivazioni giornaliere: limite 100",
  s1_mind_label: "Domanda veloce",
  s1_mind_question: "Cosa succede al mercato mentre dormi?",
  s1_mind_nothing: "Si muove senza di me",
  s1_mind_works: "Ho un bot attivo",
  s1_mind_nothing_title: "Il mercato non dorme mai. Trading Pilot neanche.",
  s1_mind_nothing_body: "Mentre dormi, Trading Pilot scansiona ogni tick di prezzo su 20+ strumenti, genera segnali di ingresso precisi e gestisce le posizioni aperte 24/7  senza emozioni, senza esitazione, con esecuzione sub-millisecondo. Questo è il vantaggio che le persone stanno usando adesso.",
  s1_mind_nothing_footer: "È esattamente quello che ti mostreremo in meno di 60 secondi.",
  s1_mind_works_title: "Trading Pilot dà a quel vantaggio un cervello Claude AI.",
  s1_mind_works_body: "Ogni segnale che Trading Pilot emette viene verificato rispetto alle notizie di mercato live tramite l'analisi del sentiment di Claude AI prima che venga effettuato un singolo trade. Un setup tecnico perfetto contro titoli negativi? Pilot aspetta. Segnale confermato con sentiment rialzista? Pilot agisce con piena convinzione.",
  s1_activity_title: "Prelievi in diretta",
  s1_activity_verified: "verificato · account reali",
  s1_trust_t1: "4", s1_trust_t2: "Strategie AI",
  s1_trust_c1: "24/7", s1_trust_c2: "Operativo autonomo",
  s1_trust_f1: "< 1ms", s1_trust_f2: "Latenza segnale",
  s1_deposit_title: "Una cosa da sapere prima di attivare",
  s1_deposit_body: "Per attivare Trading Pilot su un conto reale, i broker richiedono un capitale iniziale minimo di $250. Non è una commissione. È il tuo stesso capitale di trading, nel tuo conto di brokeraggio, che controlli e puoi prelevare in qualsiasi momento. Trading Pilot è incluso gratuitamente.",
  s1_deposit_own1: "I tuoi soldi", s1_deposit_own2: "Non una commissione",
  s1_deposit_with1: "Prelevabile", s1_deposit_with2: "In qualsiasi momento",
  s1_deposit_reg1: "Regolamentato", s1_deposit_reg2: "Broker autorizzato",
  s1_cta_main: "Attiva Trading Pilot. Vedilo dal vivo →",
  s1_cta_sub: "Da zero a operativo in meno di 60 secondi · nessuna carta di credito",

  s2_step1: "Il tuo obiettivo", s2_step2: "Quiz veloce", s2_step3: "Ottieni accesso",
  s2_missed_label: "Mentre leggi questo, i nostri bot hanno generato",
  s2_missed_sub: "Il mercato non si ferma mai. L'automazione non dorme mai.",
  s2_question_label: "Domanda veloce",
  s2_headline: "Che tipo di setup di trading cerchi?",
  s2_subtext: "Scegli quello più vicino a te  determina il consiglio sulla strategia.",
  s2_opt1_head: "Voglio iniziare a fare trading automaticamente  AI che opera 24/7 per me",
  s2_opt1_sub: "Niente grafici, niente stress. Imposto una strategia, imposto il rischio, il bot fa il resto",
  s2_opt2_head: "Ho già provato il trading  voglio l'automazione che funziona davvero",
  s2_opt2_sub: "Il trading manuale è estenuante. Voglio un sistema che operi con disciplina, non con emozioni",
  s2_opt3_head: "Voglio guadagni passivi da Forex, Oro o indici",
  s2_opt3_sub: "Voglio un bot che lavori in background mentre vivo la mia vita",
  s2_footer: "La tua risposta ci aiuta ad abbinarti alla strategia giusta",
  s2_hint: "👆 Tocca l'opzione che ti descrive meglio",
  s3_hint: "Seleziona una risposta per continuare",
  s2c_scroll_hint: "Scorri in basso per guardare la simulazione in tempo reale",
  s2c_strategy_hint: "Tocca una strategia in alto per cambiarla e riprodurla",

  s3_progress_label: "Costruendo il tuo profilo strategico…",
  s3_question_label: "Domanda {q} di {total}",
  s3_footer: "Non ci sono risposte giuste o sbagliate  ci aiutano solo ad abbinarti alla strategia migliore",
  s3_q1: "Quale mercato vuoi che il tuo bot operi?",
  s3_a1_1: "Forex (EUR/USD, GBP/JPY, EUR/GBP…)",
  s3_a1_2: "Materie prime (Oro, Petrolio, Argento…)",
  s3_a1_3: "Indici (Nasdaq, US30, S&P 500…)",
  s3_a1_4: "Lascia che l'AI scelga lo strumento migliore",
  s3_q2: "Quanta autonomia vuoi avere?",
  s3_a2_1: "Completamente automatico  lascialo girare 24/7",
  s3_a2_2: "Mostrami i segnali  confermo prima di ogni trade",
  s3_a2_3: "Voglio osservare e imparare come opera il bot",
  s3_a2_4: "Non sono sicuro  mostrami cosa funziona meglio",
  s3_q3: "Qual sarà il tuo capitale iniziale indicativo?",
  s3_a3_1: "Inizio con il minimo ($250)",
  s3_a3_2: "$500 – $1.000",
  s3_a3_3: "$1.000 – $5.000",
  s3_a3_4: "$5.000+",

  s4_loading_1: "Leggendo le tue risposte…",
  s4_loading_2: "Trovando trader con un background simile al tuo…",
  s4_loading_3: "Verificando cosa ha funzionato per loro…",
  s4_loading_4: "Calcolando il tuo punteggio di compatibilità…",
  s4_loading_5: "Fatto ecco cosa abbiamo trovato.",
  s4_fit_label: "Il tuo punteggio di compatibilità",
  s4_fit_sub: "Quanto sei simile ai trader che ottengono profitti reali",
  s4_result_headline: "Cosa significano davvero le tue risposte:",
  s4_result_watching: "Chi si informa prima di agire tende ad avere bot che durano. Sei tu. Non sei qui per hype  vuoi capire come funziona il sistema. Trading Pilot è costruito esattamente per questa mentalità: imposta i parametri della strategia una volta, lascia che l'AI esegua con disciplina, osserva la curva di equity mentre cresce.",
  s4_result_tried: "Il trading manuale fallisce perché gli esseri umani non possono mantenere la disciplina di un algoritmo. Probabilmente avevi gli istinti giusti, solo l'esecuzione sbagliata. Trading Pilot rimuove completamente l'emozione. I stop-loss scattano automaticamente. Il bot si ferma se si raggiungono i limiti giornalieri. La strategia che scegli ha un win rate documentato e lo rispetta, ogni volta.",
  s4_result_no_time: "È esattamente per questo che è stato creato Trading Pilot. Zero grafici da guardare. Zero tempo davanti allo schermo. Attivi una strategia, imposti il livello di rischio e la dimensione del trade, e il bot gestisce entrata, gestione e uscita 24/7 su 20+ strumenti. La maggior parte degli utenti trascorre meno di 10 minuti a settimana a rivedere i risultati.",
  s4_modes_label: "Quattro strategie di Trading Pilot. Scegli la tua.",
  s4_mode1_title: "MA Crossover", s4_mode1_badge: "61% win rate",
  s4_mode1_desc: "Motore di Rilevamento Trend. Due medie mobili intelligenti tracciano il momentum. Fast MA incrocia sopra slow MA: Pilot entra. Incrocia sotto: esce. Preciso, implacabile. Funziona su qualsiasi asset.",
  s4_mode2_title: "RSI Reversal", s4_mode2_badge: "58% win rate · media +1.9R",
  s4_mode2_desc: "Rilevatore di Mean Reversion. Misura l'esaurimento del mercato. Quando la massa ha venduto troppo aggressivamente, Pilot compra il rimbalzo. Quando l'euforia raggiunge il picco, vende il top  una disciplina nessun umano può mantenere.",
  s4_mode3_title: "MACD Momentum", s4_mode3_badge: "63% win rate · media +2.7R",
  s4_mode3_desc: "Intercettore di Cambio di Momentum. Osserva la convergenza delle linee MACD e cattura i cambi di momentum in anticipo, spesso prima che il resto del mercato noti il movimento.",
  s4_mode_recommended: "Win rate più alto",
  s4_test1_text: "Ho configurato la strategia MA Crossover su BTCUSD e sono andato via. Mi sono svegliato con tre trade chiusi e una curva di equity positiva. Non ho toccato niente. Il bot l'ha fatto e basta.",
  s4_test2_text: "Avevo perso soldi due volte con il trading manuale. La differenza con Trading Pilot è il filtro Claude AI: mi ha fermato dall'entrare in un trade subito prima di un crollo dovuto a cattive notizie. Solo quello mi ha salvato più di quanto ho guadagnato nel primo mese.",
  s4_test3_text: "Uso la strategia MACD su EURUSD durante la sessione di Londra e la strategia RSI su Oro di notte. Due bot, configurati una volta, attivi mentre lavoro. Questo è quello che pensavo dovesse essere il trading automatizzato.",
  s4_stat1_label: "Strumenti supportati", s4_stat2_label: "Controlli di rischio per trade", s4_stat3_label: "Per iniziare",
  s4_urgency_title: "Attivazioni limitate oggi", s4_urgency_sub1: "Posti disponibili in esaurimento", s4_urgency_sub2: "Si azzera ogni 24 ore",
  s4_cta: "Attiva Trading Pilot →",

  s5_spots_one: "1 posto rimanente oggi",
  s5_spots_many: "{n} posti rimanenti oggi",
  s5_countdown_label: "Il tuo posto è riservato per",
  s5_expired: "Tempo scaduto",
  s5_expired_sub: "Quando questo scade, il tuo profilo si azzera e dovresti ricominciare da capo.",
  s5_spots_title: "Posti disponibili nella tua area",
  s5_spots_sub: "Si aggiorna ogni 24 ore",
  s5_spots_total: "/ 10 totali",
  s5_what_happens: "Cosa succede davvero se chiudi questa pagina?",
  s5_c1: "Il mercato continua a muoversi con o senza di te.",
  s5_c2: "Il tuo profilo scompare e dovresti rispondere a tutto di nuovo.",
  s5_c3: "Qualcun altro nella tua area occuperà il tuo posto.",
  s5_c4: "Le persone che si sono iscritte la settimana scorsa stanno già vedendo i primi risultati.",
  s5_qualify_label: "Prima di reclamare il tuo posto assicurati di avere i requisiti",
  s5_q1: "Hai un dispositivo con accesso a internet",
  s5_q2: "Puoi dedicare 10 minuti alla configurazione del tuo conto",
  s5_q3: "Capisci che il trading comporta dei rischi",
  s5_q4: "Puoi iniziare con un minimo di $250 (il tuo capitale di trading non una commissione, prelevabile in qualsiasi momento)",
  s5_qualify_footer: "Se tutto quanto sopra si applica a te, il tuo posto è riservato qui sotto.",
  s5_cta: "Attiva Trading Pilot adesso →",
  s5_cta_sub: "Incluso gratis · funziona su tutti i 20+ strumenti · nessuna carta di credito",

  s6_progress_label: "Quasi fatto…",
  s6_headline: "Ultimo passaggio configura il tuo conto",
  s6_subtext: "Il tuo profilo è pronto. Dicci solo dove inviare il tuo accesso e uno specialista di trading ti contatterà per iniziare.",
  s6_min_deposit_label: "Importo minimo iniziale:",
  s6_specialist_role: "Specialista Trading Senior",
  s6_specialist_quote: "Esaminerò personalmente il tuo profilo e ti guiderò nella configurazione del tuo primo trade durante la chiamata di onboarding. Circa 20 minuti. Nessuna pressione, solo rispondere alle tue domande.",
  s6_specialist_online: "Online adesso di solito risponde entro 2 ore",
  s6_step1_title: "Dove dobbiamo inviare il tuo accesso?",
  s6_step1_sub: "10 secondi. Nessuna carta richiesta.",
  s6_email_label: "Indirizzo email",
  s6_email_placeholder: "tu@esempio.com",
  s6_continue_btn: "Continua →",
  s6_no_spam: "🔒 Non inviamo spam né vendiamo i tuoi dati.",
  s6_confirmed_label: "Email confermata",
  s6_change: "Modifica",
  s6_first_name_label: "Nome", s6_last_name_label: "Cognome",
  s6_fname_placeholder: "Nome", s6_lname_placeholder: "Cognome",
  s6_phone_label: "Numero di telefono",
  s6_phone_sub: "Uno specialista ti contatterà su questo numero.",
  s6_loading_btn: "Configurazione in corso…",
  s6_confirm_btn: "Andiamo →",
  s6_consent_text: "Acconsento a essere contattato da uno specialista di trading e confermo di aver letto i Termini e l'Informativa sulla Privacy. Comprendo che il trading comporta rischi, il deposito minimo iniziale è di $250 e ho 18 anni o più.",
  s6_trust1: "🔒 Sicuro e privato", s6_trust2: "Nessuna carta di credito", s6_trust3: "Nessun impegno",
  s6_privacy_note: "🔒 I tuoi dati sono privati e non verranno mai condivisi o venduti.",
  s6_min_note: "Deposito minimo per iniziare:",
  s6_terms_note: "Continuando accetti i nostri",
  s6_terms_link: "Termini",
  s6_and: "e",
  s6_privacy_link: "Informativa sulla Privacy",

  err_email: "Inserisci un indirizzo email valido.",
  err_email_personal: "Usa il tuo indirizzo email personale.",
  err_first_name: "Inserisci il tuo nome.",
  err_last_name: "Inserisci il tuo cognome.",
  err_full_name: "Inserisci il tuo nome completo.",
  err_phone: "Inserisci il tuo numero di telefono.",
  err_phone_invalid: "Inserisci un numero di telefono valido.",
  err_too_many: "Troppi tentativi. Aggiorna la pagina e riprova.",
  err_rate_limit: "Troppi tentativi. Attendi un minuto e riprova.",
  err_generic: "Qualcosa è andato storto. Aggiorna la pagina e riprova.",
  err_network: "Problema di rete. Controlla la connessione e riprova.",

  ticker_joined: "{name} da {city} si è appena iscritto",
  ticker_trade: "{name} da {city} ha appena chiuso un trade da {amount}",
  ticker_on_page: "{name} da {city} è su questa pagina adesso",
  ticker_mins_ago: "{n} min fa",

  exit_warning: "Attenzione",
  exit_headline: "Aspetta  eri così vicino",
  exit_body_1: "Dal momento in cui hai aperto questa pagina, le persone sulla stessa piattaforma hanno guadagnato:",
  exit_still_climbing: "Quel numero sta ancora salendo adesso.",
  exit_body_2: "Non devi impegnarti a nulla. Completa solo l'ultimo passaggio  richiede meno di 60 secondi e puoi sempre decidere dopo.",
  exit_cta: "Continua da dove ero →",
  exit_or: "oppure",
  exit_soft_prompt: "Non sei pronto? Lascia la tua email e ti mandiamo la guida gratuita.",
  exit_email_placeholder: "tua@email.it",
  exit_send_btn: "Invia",
  exit_sent: "✓ Ricevuto! Controlla la tua casella a breve.",
  exit_no_thanks: "No grazie, non sono interessato",

  risk_label: "Avvertenza sul rischio:",
  risk_body: "Il trading comporta rischi. Le performance passate non sono indicative dei risultati futuri. Capitale a rischio. Il valore degli investimenti può sia aumentare che diminuire. Dovresti fare trading solo con denaro che puoi permetterti di perdere. I risultati simulati e storici non garantiscono le performance future.",
  risk_compact: "Capitale a rischio. Le performance passate non sono indicative dei risultati futuri.",
  risk_regulated_by: "Regolamentato da",

  s2b_step_label: "Come funziona il trading automatizzato",
  s2b_step_duration: "2 min",
  s2b_headline: "Il trading automatizzato è come si costruiscono",
  s2b_headline_em: "rendimenti costanti",
  s2b_headline_end: "non guardando i grafici.",
  s2b_subtext: "I trader di maggior successo non stanno incollati agli schermi. Utilizzano algoritmi basati su regole che eseguono con precisione  24/7, senza emozioni, senza esitazione. Ecco perché è così potente.",
  s2b_counter_label: "Generato dai bot Trading Pilot da quando hai aperto questa pagina",
  s2b_counter_sub: "Ogni tick è un'operazione automatizzata reale chiusa su un conto live.",
  s2b_p1_title: "Il mercato opera 24 ore al giorno  l'automazione non manca mai un movimento",
  s2b_p1_body: "Nessun essere umano può monitorare EUR/USD, Oro e il Nasdaq contemporaneamente alle 3 di notte. Un bot può. Ogni tick, ogni pattern, ogni segnale  controllato ed eseguito in millisecondi senza stanchezza.",
  s2b_p1_stat: "Il Forex processa da solo $7,5 trilioni al giorno  la grande maggioranza gestita da algoritmi.",
  s2b_p2_title: "L'emozione è il motivo principale per cui i trader perdono soldi",
  s2b_p2_body: "La paura ti impedisce di entrare in un trade valido. L'avidità ti tiene dentro troppo a lungo. Il panico ti fa uscire esattamente nel momento sbagliato. Gli algoritmi non hanno questi difetti  seguono le regole ogni volta.",
  s2b_p2_stat: "Oltre il 70% delle perdite dei trader retail è collegato a decisioni emotive.",
  s2b_p3_title: "Quattro strategie collaudate  ognuna per condizioni di mercato diverse",
  s2b_p3_body: "MA Crossover individua i trend sostenuti. RSI Reversal rileva l'esaurimento del mercato. MACD Momentum intercetta i cambi di momentum. Pure Momentum cavalca i breakout. Scegli una  o fai girare più bot insieme.",
  s2b_p3_stat: "Win rate combinati: 55–63% a seconda della strategia e delle condizioni di mercato.",
  s2b_p4_title: "Sei livelli di protezione del rischio su ogni singolo trade",
  s2b_p4_body: "Stop-loss fisso. Uscita automatica al take-profit. Interruttore automatico per la perdita giornaliera massima. Cap sulle operazioni giornaliere. Filtraggio con barre di conferma. Monitoraggio equity in tempo reale. Il tuo capitale è sempre protetto.",
  s2b_p4_stat: "Il rischio è definito prima che ogni trade si apra  non gestito in preda al panico.",
  s2b_p5_title: "Claude AI filtra il sentiment delle notizie prima di ogni trade",
  s2b_p5_body: "Un segnale tecnico perfetto prima di un evento negativo? Pilot verifica il sentiment di Claude AI e aspetta. Segnale confermato con sentiment positivo? Agisce con piena convinzione  un vantaggio che nessun trader manuale può replicare.",
  s2b_p5_stat: "Il filtro AI sul sentiment riduce i falsi ingressi durante eventi di alta volatilità.",
  s2b_p6_title: "Inizia con $250 e scala al tuo ritmo",
  s2b_p6_body: "Non serve un grande conto per iniziare. Trading Pilot opera da un deposito minimo di $250  il tuo capitale di trading, nel tuo conto di brokeraggio, prelevabile in qualsiasi momento tu voglia.",
  s2b_p6_stat: "Capitale minimo: $250. I tuoi soldi. Il tuo conto. Prelievo in qualsiasi momento.",
  s2b_why_headline: "Perché l'automazione batte costantemente il trading manuale",
  s2b_why_text1: "I trader di massimo successo  Jim Simons, Ray Dalio, Paul Tudor Jones  si sono tutti affidati a sistemi algoritmici. Non perché sia più facile, ma perché nessun essere umano può eguagliare la costanza e la disciplina di un algoritmo ben progettato.",
  s2b_why_text2: "Il Medallion Fund di Simons ha reso in media il 66% annuo per 30 anni  gestito puramente da algoritmi, giorno e notte. Lo stesso principio è ora disponibile ai trader retail attraverso Trading Pilot.",
  s2b_why_text3: "Il prossimo passo ti mostra esattamente come funziona.",
  s2b_solution_label: "La soluzione",
  s2b_tp_headline: "Ecco Trading Pilot",
  s2b_tp_sub: "Il primo motore di intelligenza di trading autonoma che fonde segnali tecnici in tempo reale con il sentiment delle notizie di Claude AI  eseguendo trade 24/7 con la disciplina che nessun essere umano può mantenere.",
  s2b_claude_title: "Motore di Sentiment Claude AI",
  s2b_claude_body: "Prima di ogni trade, Pilot interroga Claude AI per il sentiment live delle notizie su quell'asset. Un crossover perfetto con titoli negativi? Pilot aspetta. Segnale confermato con sentiment rialzista? Pilot agisce con piena convinzione.",
  s2b_fact1_heading: "Guarda il mercato al posto tuo",
  s2b_fact1_detail: "Trading Pilot scansiona ogni tick di prezzo, ogni minuto, su 20+ strumenti  24/7 senza esitazione ed esecuzione dei segnali in sub-millisecondi. Il mercato non dorme mai, e nemmeno Pilot.",
  s2b_fact2_heading: "Quattro strategie collaudate, non congetture",
  s2b_fact2_detail: "MA Crossover (61% win rate), RSI Reversal (58%), MACD Momentum (63%), Pure Momentum (55%). Ognuna progettata per una diversa condizione di mercato. Ne scegli una  o fai girare più pilot contemporaneamente su asset diversi.",
  s2b_fact3_heading: "Sei livelli di protezione del rischio di grado istituzionale",
  s2b_fact3_detail: "Stop-loss fisso su ogni trade. Lock del take-profit. Interruttore automatico per la perdita giornaliera massima. Cap sul numero massimo di trade giornalieri. Filtraggio con barre di conferma. Monitoraggio in tempo reale della curva di equity. Il tuo capitale è sempre protetto.",
  s2b_advocates_label: "Chi lo fa da decenni",
  s2b_adv_disclaimer: "Questi individui non sono affiliati né approvano Trading Pilot. Il loro uso documentato pubblicamente di sistemi di trading algoritmico e basato su regole dimostra il potere dell'automazione.",
  s2b_adv1_title: "Leggenda del trading quantitativo di Renaissance Technologies",
  s2b_adv1_quote: "Il Medallion Fund, gestito interamente da algoritmi matematici, ha reso in media il 66% annuo per 30 anni  il record di investimento più straordinario della storia.",
  s2b_adv1_tag: "66% di rendimento annuo · Puramente algoritmico",
  s2b_adv2_title: "Bridgewater Associates, il più grande hedge fund al mondo",
  s2b_adv2_quote: "Dalio ha costruito Bridgewater su un sistema che chiama 'La Macchina'  un insieme di algoritmi e principi che eliminano le emozioni umane da ogni decisione di investimento.",
  s2b_adv2_tag: "$160 miliardi di AUM · Algoritmo prima di tutto",
  s2b_adv3_title: "Berkshire Hathaway, l'investitore più famoso al mondo",
  s2b_adv3_quote: "\"Il mercato azionario è un dispositivo per trasferire denaro dagli impazienti ai pazienti.\" I sistemi impongono la pazienza. Gli esseri umani quasi mai ci riescono.",
  s2b_adv3_tag: "Disciplina sulle emozioni · Pensiero basato su regole",
  s2b_adv4_title: "Tudor Investment Corp, leggenda del macro trading",
  s2b_adv4_quote: "Jones ha pionierato strategie sistematiche guidate da computer negli anni '80 e ha sempre sostenuto un'esecuzione dei trade basata su regole, senza emozioni.",
  s2b_adv4_tag: "Strategie sistematiche dagli anni '80",
  s2b_cta_box_p1: "Ora ti mostriamo esattamente come Trading Pilot si sarebbe comportato sul mercato della settimana scorsa.",
  s2b_cta_box_p2: "Logica di strategia reale. Dati di grafico reali. Sentiment Claude AI live.",
  s2b_cta: "Mostrami come funziona →",
  s2b_cta_sub: "Accesso gratuito · Nessuna carta di credito · 60 secondi per configurare",

  s2c_badge: "Simulazione Live · Claude AI Attivo",
  s2c_headline: "Guarda Trading Pilot Pensare in Tempo Reale",
  s2c_subtext: "Scegli una strategia. Guarda come il bot rileva un segnale, verifica il sentiment live delle notizie tramite Claude AI, poi esegue o sopprime il trade  automaticamente.",
  s2c_win_rate: "{n}% win rate",
  s2c_how_works: "Come funziona {name}",
  s2c_risk_label: "Controlli di rischio integrati  ogni strategia",
  s2c_sl_title: "Stop-Loss", s2c_sl_desc: "Stop fisso su ogni trade",
  s2c_tp_title: "Take-Profit", s2c_tp_desc: "Uscita automatica al target",
  s2c_dl_title: "Cap perdita giornaliera", s2c_dl_desc: "Il bot si ferma se raggiunto il limite",
  s2c_mt_title: "Max trade giornalieri", s2c_mt_desc: "Nessun overtrading nel rumore",
  s2c_running: "Simulazione in corso…",
  s2c_replay: "↺ Riesegui la simulazione",
  s2c_cta: "Voglio Trading Pilot che lavori per me →",
  s2c_cta_sub: "Accesso gratuito · 60 secondi · Nessuna carta di credito",
  s2c_scanning: "IN SCANSIONE",
  s2c_complete: "COMPLETATO",
  s2c_idle: "INATTIVO",
  s2c_buy_signal: "Segnale BUY",
  s2c_sell_signal: "Segnale SELL",

  s2d_badge: "Guarda fare trading dal vivo",
  s2d_headline: "Conto da $250. Bot che fa trading EUR/USD. Completamente automatico.",
  s2d_subtext: "Guarda TradePilot individuare opportunità ed effettuare trade in tempo reale mentre tu non fai assolutamente nulla.",
  s2d_balance_label: "Saldo del Conto",
  s2d_status_initial: "TradePilot sta monitorando il mercato...",
  s2d_status_scanning: "Scansione di ogni tick di prezzo. In attesa del momento giusto...",
  s2d_status_pattern: "Individuato un pattern in formazione. La linea veloce incrocia quella lenta...",
  s2d_status_trade1: "Trade #1 aperto  il bot è nel mercato adesso.",
  s2d_status_tp1: "Trade #1 chiuso con profitto!",
  s2d_status_trade2: "Secondo setup individuato  il bot entra di nuovo nel mercato.",
  s2d_status_tp2: "Secondo trade chiuso con profitto!",
  s2d_status_done: "Sessione completata. 2 trade. 2 vittorie. Zero sforzo da parte tua.",
  s2d_trade_open: "TRADE APERTO",
  s2d_scanning: "IN SCANSIONE",
  s2d_complete: "COMPLETATO",
  s2d_standby: "IN ATTESA",
  s2d_milestone_activated: "Bot attivato  monitoraggio mercato",
  s2d_milestone_activated_sub: "Scansione di ogni tick in cerca di un segnale...",
  s2d_milestone_trade1: "Trade #1 aperto",
  s2d_milestone_trade1_sub: "Il bot è entrato al momento giusto.",
  s2d_milestone_tp1: "+${amount} profitto bloccato",
  s2d_milestone_tp1_sub: "Primo trade chiuso in positivo.",
  s2d_milestone_trade2: "Secondo trade aperto",
  s2d_milestone_trade2_sub: "Il bot ha individuato un'altra opportunità.",
  s2d_milestone_tp2_sub: "Entrambi i trade chiusi in positivo.",
  s2d_watch_step1_title: "Il bot guarda",
  s2d_watch_step1_desc: "Ogni movimento di prezzo, 24/7",
  s2d_watch_step2_title: "Individua l'opportunità",
  s2d_watch_step2_desc: "Rileva il momento giusto automaticamente",
  s2d_watch_step3_title: "Blocca il profitto",
  s2d_watch_step3_desc: "Chiude il trade al prezzo target",
  s2d_sim_complete_label: "Simulazione completata",
  s2d_started_with: "Iniziato con",
  s2d_ended_with: "Terminato con",
  s2d_trade1_label: "Trade 1: EUR/USD",
  s2d_trade2_label: "Trade 2: EUR/USD",
  s2d_result_box: "Non hai fatto nulla. Il bot ha monitorato il grafico, individuato due opportunità, aperto entrambi i trade e chiusi in profitto. Questo è quello che TradePilot fa per te ogni giorno.",
  s2d_start_btn: "▶  Guarda fare trading dal vivo",
  s2d_running_note: "Simulazione in corso  guarda il grafico sopra...",
  s2d_cta: "Voglio questo attivo sul mio conto →",
  s2d_watch_again: "↺ Guarda di nuovo",
  s1_adv1: "Intervento manuale minimo",
  s1_adv2: "Nessuna esperienza richiesta",
  s1_adv3: "Prelievo in 24–48h",
  s5_direct_note: "Stai accedendo tramite un link di registrazione diretto  questo bypassa la lista d'attesa pubblica e riserva il tuo posto immediatamente. Una volta che lasci questa pagina, questo posto non può essere garantito.",
  s2d_withdrawal_title: "Prelievi recenti dalla tua regione",
  s2d_withdrawal_verified: "verificato · account reali",
};

// ── GERMAN ────────────────────────────────────────────────────────────────────
const de: T = {
  live: "Live",
  watching: "{n} schauen gerade zu",
  ssl_secured: "SSL-gesichert",

  footer_risk_prefix: "Risikohinweis:",
  footer_risk_body: "Der Handel mit Finanzinstrumenten ist mit erheblichen Risiken verbunden. Preise können schwanken und Sie könnten mehr als Ihre anfängliche Einzahlung verlieren. Handeln Sie nur mit Kapital, das Sie sich leisten können zu verlieren. Vergangene Ergebnisse sind kein Indikator für zukünftige Resultate. Die Mindesteinzahlung beträgt $250.",
  footer_terms: "AGB",
  footer_privacy: "Datenschutz",
  footer_deposits: "Warum Einzahlungen scheitern",
  footer_copyright: "© 2026 TradePilot",

  s1_headline: "Die KI, die für dich handelt. 24/7. Vier bewährte Strategien. Null Emotionen.",
  s1_subtext: "Trading Pilot ist die erste autonome Trading-Intelligence-Engine, die Echtzeit-Signale mit Claude AI News-Sentiment verbindet  und Trades rund um die Uhr mit einer Disziplin ausführt, die kein Mensch aufrechterhalten kann. Vier kampferprobte Strategien. Sechs Risikoschichten. Ein Klick zum Aktivieren.",
  s1_cta_above: "Trading Pilot aktivieren →",
  s1_profit_label: "Heute von Trading Pilot Bots generiert",
  s1_profit_sublabel: "Live · wird alle paar Sekunden aktualisiert · 20+ Instrumente",
  s1_real_accounts: "Aktive Bots",
  s1_challenge_title: "Passiert gerade jetzt",
  s1_challenge_headline: "Während du das liest, haben {n} Personen heute ihren ersten Trading Pilot Bot aktiviert.",
  s1_challenge_sub: "Keine Profi-Trader. Normale Menschen, die ihr Risikolevel eingestellt, eine Strategie gewählt und die KI den Rest erledigen lassen haben. Das Einzige, was sie von dir trennt, ist, dass sie auf Aktivieren geklickt haben.",
  s1_daily_cap: "Tägliche Aktivierungen: Limit 100",
  s1_mind_label: "Kurze Frage",
  s1_mind_question: "Was passiert mit dem Markt, während du schläfst?",
  s1_mind_nothing: "Er bewegt sich ohne mich",
  s1_mind_works: "Ich habe einen Bot laufen",
  s1_mind_nothing_title: "Der Markt schläft nie. Trading Pilot auch nicht.",
  s1_mind_nothing_body: "Während du schläfst, scannt Trading Pilot jeden Preistick über 20+ Instrumente, sendet präzise Einstiegssignale und verwaltet offene Positionen 24/7  ohne Emotionen, ohne Zögern und mit Sub-Millisekunden-Ausführung. Das ist der Vorteil, den Menschen gerade nutzen.",
  s1_mind_nothing_footer: "Genau das werden wir dir in unter 60 Sekunden zeigen.",
  s1_mind_works_title: "Trading Pilot gibt diesem Vorteil ein Claude AI Gehirn.",
  s1_mind_works_body: "Jedes Signal, das Trading Pilot auslöst, wird mit Live-Marktnachrichten über Claude AI Sentiment-Analyse gegengeprüft, bevor ein einziger Trade gesetzt wird. Ein perfektes technisches Setup bei negativen Nachrichten? Pilot wartet. Bestätigtes Signal mit bullishem Sentiment? Pilot handelt mit voller Überzeugung.",
  s1_activity_title: "Live-Auszahlungen",
  s1_activity_verified: "verifiziert · echte Konten",
  s1_trust_t1: "4", s1_trust_t2: "KI-Strategien",
  s1_trust_c1: "24/7", s1_trust_c2: "Autonome Ops",
  s1_trust_f1: "< 1ms", s1_trust_f2: "Signal-Latenz",
  s1_deposit_title: "Eine Sache, die du vor der Aktivierung wissen solltest",
  s1_deposit_body: "Um Trading Pilot auf einem Live-Konto einzusetzen, verlangen Broker ein Mindestkapital von $250. Das ist keine Gebühr. Es ist dein eigenes Handelskapital, auf deinem Brokerkonto, das du kontrollierst und jederzeit abheben kannst. Trading Pilot selbst ist kostenlos dabei.",
  s1_deposit_own1: "Dein Geld", s1_deposit_own2: "Keine Gebühr",
  s1_deposit_with1: "Auszahlbar", s1_deposit_with2: "Jederzeit",
  s1_deposit_reg1: "Reguliert", s1_deposit_reg2: "Broker-verwahrt",
  s1_cta_main: "Trading Pilot aktivieren. Live erleben →",
  s1_cta_sub: "In unter 60 Sekunden einsatzbereit · keine Kreditkarte nötig",

  s2_step1: "Dein Ziel", s2_step2: "Kurzes Quiz", s2_step3: "Zugang erhalten",
  s2_missed_label: "Während du das liest, haben unsere Bots generiert",
  s2_missed_sub: "Der Markt macht keine Pause. Automatisierung schläft nie.",
  s2_question_label: "Kurze Frage",
  s2_headline: "Welche Art von Trading-Setup suchst du?",
  s2_subtext: "Wähle das Nächstliegende  es bestimmt deine Strategieempfehlung.",
  s2_opt1_head: "Ich möchte automatisch handeln  KI, die 24/7 für mich tradet",
  s2_opt1_sub: "Keine Charts-Beobachtung, kein Stress. Strategie eingestellt, Risiko gesetzt, Bot erledigt den Rest",
  s2_opt2_head: "Ich habe Trading versucht  ich will Automatisierung, die wirklich funktioniert",
  s2_opt2_sub: "Manuelles Trading ist anstrengend. Ich will ein System, das mit Disziplin ausführt, nicht mit Emotionen",
  s2_opt3_head: "Ich will passive Erträge aus Forex, Gold oder Indizes",
  s2_opt3_sub: "Ich will einen Bot, der im Hintergrund läuft, während ich mein Leben lebe",
  s2_footer: "Deine Antwort hilft uns, die richtige Strategie für dich zu finden",
  s2_hint: "👆 Tippe auf die Option, die dich am besten beschreibt",
  s3_hint: "Wähle eine Antwort, um fortzufahren",
  s2c_scroll_hint: "Scrolle nach unten, um die Simulation live zu sehen",
  s2c_strategy_hint: "Tippe oben auf eine Strategie, um sie zu wechseln und abzuspielen",

  s3_progress_label: "Dein Strategieprofil wird erstellt…",
  s3_question_label: "Frage {q} von {total}",
  s3_footer: "Es gibt keine richtigen oder falschen Antworten  sie helfen uns, dir die beste Strategie zuzuordnen",
  s3_q1: "Welchen Markt soll dein Bot handeln?",
  s3_a1_1: "Forex (EUR/USD, GBP/JPY, EUR/GBP…)",
  s3_a1_2: "Rohstoffe (Gold, Öl, Silber…)",
  s3_a1_3: "Indizes (Nasdaq, US30, S&P 500…)",
  s3_a1_4: "Lass die KI das beste Instrument wählen",
  s3_q2: "Wie viel Kontrolle möchtest du behalten?",
  s3_a2_1: "Vollautomatisch  einfach 24/7 laufen lassen",
  s3_a2_2: "Zeig mir Signale  ich bestätige vor jedem Trade",
  s3_a2_3: "Ich möchte zuerst zuschauen und lernen, wie der Bot handelt",
  s3_a2_4: "Nicht sicher  zeig mir, was am besten funktioniert",
  s3_q3: "Wie hoch ist dein ungefähres Startkapital?",
  s3_a3_1: "Starte mit dem Minimum ($250)",
  s3_a3_2: "$500 – $1.000",
  s3_a3_3: "$1.000 – $5.000",
  s3_a3_4: "$5.000+",

  s4_loading_1: "Deine Antworten werden gelesen…",
  s4_loading_2: "Trader mit ähnlichem Hintergrund werden gesucht…",
  s4_loading_3: "Es wird geprüft, was bei ihnen funktioniert hat…",
  s4_loading_4: "Dein Passgenauigkeitswert wird berechnet…",
  s4_loading_5: "Fertig hier ist, was wir gefunden haben.",
  s4_fit_label: "Dein Passgenauigkeitswert",
  s4_fit_sub: "Wie gut du zu Tradern passt, die tatsächlich profitabel sind",
  s4_result_headline: "Was deine Antworten wirklich bedeuten:",
  s4_result_watching: "Leute, die sich informieren, bevor sie handeln, betreiben in der Regel Bots, die Bestand haben. Das bist du. Du bist nicht hier wegen Hype  du willst verstehen, wie das System funktioniert. Trading Pilot ist genau für diese Denkweise gebaut: Strategieparameter einmal setzen, die KI mit Disziplin ausführen lassen, die Equity-Kurve beim Compounding verfolgen.",
  s4_result_tried: "Manuelles Trading scheitert, weil Menschen die Disziplin eines Algorithmus nicht aufrechterhalten können. Du hattest wahrscheinlich die richtigen Instinkte, nur die falsche Ausführung. Trading Pilot entfernt die Emotion vollständig. Feste Stop-Losses lösen automatisch aus. Der Bot hält an, wenn tägliche Limits erreicht werden. Die Strategie, die du wählst, hat eine dokumentierte Win Rate  und hält sich jedes Mal daran.",
  s4_result_no_time: "Genau dafür wurde Trading Pilot gebaut. Null Charts zu beobachten. Null Bildschirmzeit nötig. Du aktivierst eine Strategie, stellst dein Risikolevel und Handelsvolumen ein, und der Bot übernimmt Einstieg, Verwaltung und Ausstieg 24/7 über 20+ Instrumente. Die meisten Nutzer verbringen weniger als 10 Minuten pro Woche mit der Überprüfung der Ergebnisse.",
  s4_modes_label: "Vier Trading Pilot Strategien. Wähle deine Waffe.",
  s4_mode1_title: "MA Crossover", s4_mode1_badge: "61% Win Rate",
  s4_mode1_desc: "Trend-Erkennungs-Engine. Zwei intelligente gleitende Durchschnitte verfolgen den Momentum. Fast MA kreuzt über Slow MA: Pilot kauft. Kreuzt darunter: Pilot verkauft. Klar, präzise, unerbittlich. Funktioniert auf jeder Asset-Klasse.",
  s4_mode2_title: "RSI Reversal", s4_mode2_badge: "58% Win Rate · Ø +1.9R",
  s4_mode2_desc: "Mean-Reversion-Detektor. Misst Markterschöpfung. Wenn die Masse zu aggressiv verkauft hat, kauft Pilot den Rebound. Wenn Euphorie den Höhepunkt erreicht, verkauft er den Top  eine Disziplin, die kein Mensch aufrechterhalten kann.",
  s4_mode3_title: "MACD Momentum", s4_mode3_badge: "63% Win Rate · Ø +2.7R",
  s4_mode3_desc: "Momentum-Shift-Interceptor. Beobachtet MACD-Linien-Konvergenz und fängt Momentum-Shifts früh auf  oft bevor der Rest des Marktes die Bewegung überhaupt bemerkt.",
  s4_mode_recommended: "Höchste Win Rate",
  s4_test1_text: "Ich habe die MA Crossover Strategie auf BTCUSD eingerichtet und bin weggegangen. Bin mit drei geschlossenen Trades und einer positiven Equity-Kurve aufgewacht. Ich habe wirklich nichts angefasst. Der Bot hat es einfach gemacht.",
  s4_test2_text: "Ich hatte zweimal Geld verloren beim manuellen Trading. Der Unterschied mit Trading Pilot ist der Claude AI Filter: Er hat mich davon abgehalten, genau vor einem schlechten News-Einbruch einzusteigen. Das allein hat mir mehr gespart, als ich im ersten Monat verdient hatte.",
  s4_test3_text: "Ich lasse die MACD Strategie auf EURUSD während der Londoner Session und die RSI Strategie auf Gold über Nacht laufen. Zwei Bots, einmal eingerichtet, laufen während ich arbeite. Genau das dachte ich, was automatisiertes Trading sein sollte.",
  s4_stat1_label: "Unterstützte Instrumente", s4_stat2_label: "Risikokontrollen pro Trade", s4_stat3_label: "Zum Starten",
  s4_urgency_title: "Begrenzte Aktivierungen heute", s4_urgency_sub1: "Plätze füllen sich schnell", s4_urgency_sub2: "Wird alle 24 Stunden zurückgesetzt",
  s4_cta: "Trading Pilot aktivieren →",

  s5_spots_one: "1 Platz heute noch verfügbar",
  s5_spots_many: "{n} Plätze heute noch verfügbar",
  s5_countdown_label: "Dein Platz ist reserviert für",
  s5_expired: "Zeit abgelaufen",
  s5_expired_sub: "Wenn das abläuft, wird dein Profil zurückgesetzt und du müsstest von vorne anfangen.",
  s5_spots_title: "Freie Plätze in deiner Region",
  s5_spots_sub: "Wird alle 24 Stunden aktualisiert",
  s5_spots_total: "/ 10 gesamt",
  s5_what_happens: "Was passiert wirklich, wenn du das schließt?",
  s5_c1: "Der Markt bewegt sich weiter mit oder ohne dich.",
  s5_c2: "Dein Profil verschwindet und du müsstest alles erneut beantworten.",
  s5_c3: "Jemand anderes in deiner Region nimmt deinen Platz.",
  s5_c4: "Menschen, die letzte Woche angemeldet haben, sehen bereits erste Ergebnisse.",
  s5_qualify_label: "Bevor du deinen Platz beanspruchst stelle sicher, dass du qualifiziert bist",
  s5_q1: "Du hast ein Gerät mit Internetzugang",
  s5_q2: "Du kannst 10 Minuten für die Kontoeinrichtung entbehren",
  s5_q3: "Du verstehst, dass Trading mit Risiken verbunden ist",
  s5_q4: "Du kannst mit mindestens $250 beginnen (dein Handelskapital keine Gebühr, jederzeit auszahlbar)",
  s5_qualify_footer: "Wenn all das oben auf dich zutrifft, ist dein Platz unten reserviert.",
  s5_cta: "Trading Pilot jetzt aktivieren →",
  s5_cta_sub: "Kostenlos dabei · funktioniert auf allen 20+ Instrumenten · keine Kreditkarte",

  s6_progress_label: "Fast fertig…",
  s6_headline: "Letzter Schritt richte dein Konto ein",
  s6_subtext: "Dein Profil ist fertig. Sag uns einfach, wohin wir deinen Zugang schicken sollen, und ein Trading-Spezialist wird sich melden, um dich zu starten.",
  s6_min_deposit_label: "Mindestanlagebetrag:",
  s6_specialist_role: "Senior Trading-Spezialist",
  s6_specialist_quote: "Ich werde dein Profil persönlich prüfen und dich beim Einrichten deines ersten Trades in unserem Onboarding-Gespräch begleiten. Etwa 20 Minuten. Kein Druck, nur deine Fragen beantworten.",
  s6_specialist_online: "Jetzt online antwortet normalerweise innerhalb von 2 Std.",
  s6_step1_title: "Wohin sollen wir deinen Zugang schicken?",
  s6_step1_sub: "10 Sekunden. Keine Karte nötig.",
  s6_email_label: "E-Mail-Adresse",
  s6_email_placeholder: "du@beispiel.com",
  s6_continue_btn: "Weiter →",
  s6_no_spam: "🔒 Wir spammen nicht und verkaufen keine Daten.",
  s6_confirmed_label: "E-Mail bestätigt",
  s6_change: "Ändern",
  s6_first_name_label: "Vorname", s6_last_name_label: "Nachname",
  s6_fname_placeholder: "Vorname", s6_lname_placeholder: "Nachname",
  s6_phone_label: "Telefonnummer",
  s6_phone_sub: "Ein echter Mensch wird dich zur Einrichtung kontaktieren.",
  s6_loading_btn: "Wird eingerichtet…",
  s6_confirm_btn: "Los geht's →",
  s6_consent_text: "Ich stimme zu, von einem Trading-Spezialisten kontaktiert zu werden, und bestätige, dass ich die AGB und Datenschutzerklärung gelesen habe. Ich verstehe, dass Trading Risiken beinhaltet, die Mindesteinzahlung $250 beträgt und ich 18 Jahre oder älter bin.",
  s6_trust1: "🔒 Sicher & privat", s6_trust2: "Keine Kreditkarte", s6_trust3: "Keine Verpflichtung",
  s6_privacy_note: "🔒 Deine Daten werden privat gehalten und niemals geteilt oder verkauft.",
  s6_min_note: "Mindesteinzahlung zum Starten:",
  s6_terms_note: "Mit dem Fortfahren stimmst du unseren",
  s6_terms_link: "AGB",
  s6_and: "und der",
  s6_privacy_link: "Datenschutzerklärung zu",

  err_email: "Bitte gib eine gültige E-Mail-Adresse ein.",
  err_email_personal: "Bitte verwende deine persönliche E-Mail-Adresse.",
  err_first_name: "Bitte gib deinen Vornamen ein.",
  err_last_name: "Bitte gib deinen Nachnamen ein.",
  err_full_name: "Bitte gib deinen vollständigen Namen ein.",
  err_phone: "Bitte gib deine Telefonnummer ein.",
  err_phone_invalid: "Bitte gib eine gültige Telefonnummer ein.",
  err_too_many: "Zu viele Versuche. Bitte aktualisiere die Seite und versuche es erneut.",
  err_rate_limit: "Zu viele Versuche. Bitte warte eine Minute und versuche es erneut.",
  err_generic: "Etwas ist schiefgelaufen. Bitte aktualisiere die Seite und versuche es erneut.",
  err_network: "Netzwerkproblem. Bitte überprüfe deine Verbindung und versuche es erneut.",

  ticker_joined: "{name} aus {city} ist gerade beigetreten",
  ticker_trade: "{name} aus {city} hat gerade einen {amount} Trade geschlossen",
  ticker_on_page: "{name} aus {city} ist gerade auf dieser Seite",
  ticker_mins_ago: "vor {n} Min.",

  exit_warning: "Warnung",
  exit_headline: "Warte  du warst so nah dran",
  exit_body_1: "Seit du diese Seite geöffnet hast, haben Menschen auf derselben Plattform verdient:",
  exit_still_climbing: "Diese Zahl steigt gerade noch weiter.",
  exit_body_2: "Du musst dich zu nichts verpflichten. Schließ einfach den letzten Schritt ab  er dauert unter 60 Sekunden und du kannst danach immer noch entscheiden.",
  exit_cta: "Weiter, wo ich aufgehört habe →",
  exit_or: "oder",
  exit_soft_prompt: "Noch nicht bereit? Hinterlasse deine E-Mail und wir schicken dir den kostenlosen Leitfaden.",
  exit_email_placeholder: "deine@email.de",
  exit_send_btn: "Senden",
  exit_sent: "✓ Erhalten! Schau bald in deinen Posteingang.",
  exit_no_thanks: "Nein danke, ich bin nicht interessiert",

  risk_label: "Risikohinweis:",
  risk_body: "Trading ist mit Risiken verbunden. Vergangene Ergebnisse sind kein Indikator für zukünftige Resultate. Kapital ist gefährdet. Der Wert von Investitionen kann steigen und fallen. Du solltest nur mit Geld handeln, das du dir leisten kannst zu verlieren. Simulierte und historische Ergebnisse garantieren keine zukünftige Performance.",
  risk_compact: "Kapital gefährdet. Vergangene Ergebnisse sind kein Indikator für zukünftige Resultate.",
  risk_regulated_by: "Reguliert von",

  s2b_step_label: "Wie automatisiertes Trading funktioniert",
  s2b_step_duration: "2 Min.",
  s2b_headline: "Automatisiertes Trading ist, wie",
  s2b_headline_em: "konsistente Gewinne erzielt werden",
  s2b_headline_end: "nicht durch Charts-Beobachtung.",
  s2b_subtext: "Die erfolgreichsten Trader sitzen nicht klebend an ihren Bildschirmen. Sie setzen regelbasierte Algorithmen ein, die präzise ausführen  24/7, ohne Emotionen, ohne Zögern. Hier ist, warum es so mächtig ist.",
  s2b_counter_label: "Von Trading Pilot Bots seit du diese Seite geöffnet hast generiert",
  s2b_counter_sub: "Jeder Tick ist ein echter automatisierter Trade auf einem Live-Konto.",
  s2b_p1_title: "Der Markt handelt 24 Stunden am Tag  Automatisierung verpasst keine Bewegung",
  s2b_p1_body: "Kein Mensch kann EUR/USD, Gold und den Nasdaq gleichzeitig um 3 Uhr morgens scannen. Ein Bot kann. Jeder Preistick, jedes Muster, jedes Signal  in Millisekunden ohne Ermüdung gecheckt und ausgeführt.",
  s2b_p1_stat: "Forex allein verarbeitet täglich $7,5 Billionen  der Großteil von Algorithmen gehandelt.",
  s2b_p2_title: "Emotionen sind der Grund Nr. 1, warum Trader Geld verlieren",
  s2b_p2_body: "Angst hält dich davon ab, einen gültigen Trade einzugehen. Gier hält dich zu lange drin. Panik lässt dich genau zum falschen Zeitpunkt aussteigen. Algorithmen haben keinen dieser Fehler  sie befolgen die Regeln jedes Mal.",
  s2b_p2_stat: "Über 70% der Verluste von Retail-Tradern sind mit emotionalen Entscheidungen verbunden.",
  s2b_p3_title: "Vier bewährte Strategien  jede für andere Marktbedingungen",
  s2b_p3_body: "MA Crossover erkennt anhaltende Trends. RSI Reversal erkennt Markterschöpfung. MACD Momentum fängt früh Momentum-Shifts. Pure Momentum reitet Ausbrüche. Lass einen oder mehrere Bots gleichzeitig laufen.",
  s2b_p3_stat: "Kombinierte Win Rates: 55–63% je nach Strategie und Marktbedingungen.",
  s2b_p4_title: "Sechs Schichten Risikoschutz bei jedem einzelnen Trade",
  s2b_p4_body: "Fester Stop-Loss. Automatischer Take-Profit-Ausstieg. Tages-Verlust-Schutzschalter. Tages-Trade-Begrenzung. Bestätigungsbalken-Filterung. Echtzeit-Equity-Überwachung. Dein Kapital ist immer automatisch geschützt.",
  s2b_p4_stat: "Das Risiko wird definiert, bevor jeder Trade öffnet  nicht in Panik reagiert.",
  s2b_p5_title: "Claude AI filtert News-Sentiment vor jedem Trade",
  s2b_p5_body: "Ein perfektes technisches Signal vor einem negativen Nachrichtenereignis? Pilot prüft zuerst das Claude AI Sentiment und wartet. Bestätigtes Bullish-Signal mit positivem Sentiment? Es handelt mit voller Überzeugung  ein Vorteil, den kein manueller Trader replizieren kann.",
  s2b_p5_stat: "KI-Sentiment-Filterung reduziert Falscheinträge in hochvolatilen Nachrichtenereignissen.",
  s2b_p6_title: "Starte mit $250 und skaliere in deinem eigenen Tempo",
  s2b_p6_body: "Du brauchst kein großes Konto, um loszulegen. Trading Pilot arbeitet ab einer Mindesteinzahlung von $250  dein eigenes Handelskapital, auf deinem Brokerkonto, jederzeit auszahlbar nach Wunsch.",
  s2b_p6_stat: "Mindestkapital: $250. Dein Geld. Dein Konto. Jederzeit abheben.",
  s2b_why_headline: "Warum Automatisierung manuelles Trading konsequent übertrifft",
  s2b_why_text1: "Die erfolgreichsten Trader der Welt  Jim Simons, Ray Dalio, Paul Tudor Jones  sind alle auf algorithmische Systeme umgestiegen. Nicht weil es einfacher ist, sondern weil kein Mensch an Konsistenz und Disziplin mit einem gut konzipierten Algorithmus mithalten kann.",
  s2b_why_text2: "Simons' Medallion Fund erzielte über 30 Jahre hinweg durchschnittlich 66% Jahresrendite  rein durch Algorithmen, rund um die Uhr. Dasselbe Prinzip steht jetzt Retail-Tradern durch Trading Pilot zur Verfügung.",
  s2b_why_text3: "Der nächste Schritt zeigt dir genau, wie es funktioniert.",
  s2b_solution_label: "Die Lösung",
  s2b_tp_headline: "Lerne Trading Pilot kennen",
  s2b_tp_sub: "Die erste autonome Trading-Intelligence-Engine, die technische Echtzeitsignale mit Claude AI News-Sentiment verbindet  und Trades 24/7 mit einer Disziplin ausführt, die kein Mensch aufrechterhalten kann.",
  s2b_claude_title: "Claude AI Sentiment Engine",
  s2b_claude_body: "Vor jedem Trade fragt Pilot Claude AI nach dem Live-News-Sentiment für diesen Asset. Perfekter Crossover mit negativen Schlagzeilen? Pilot wartet. Bestätigtes Signal mit bullishem Sentiment? Pilot handelt mit voller Überzeugung.",
  s2b_fact1_heading: "Es beobachtet den Markt für dich",
  s2b_fact1_detail: "Trading Pilot scannt jeden Preistick, jede Minute, über 20+ Instrumenten  24/7 ohne Zögern und mit Signalausführung in unter einer Millisekunde. Der Markt schläft nie, und Pilot auch nicht.",
  s2b_fact2_heading: "Vier kampferprobte Strategien, kein Rätselraten",
  s2b_fact2_detail: "MA Crossover (61% Win Rate), RSI Reversal (58%), MACD Momentum (63%), Pure Momentum (55%). Jede für eine andere Marktbedingung entwickelt. Du wählst eine  oder lässt mehrere Pilots gleichzeitig auf verschiedenen Assets laufen.",
  s2b_fact3_heading: "Sechs Schichten institutionellem Risikoschutz",
  s2b_fact3_detail: "Fester Stop-Loss bei jedem Trade. Take-Profit-Sperre. Tages-Verlust-Schutzschalter. Maximale Tages-Trade-Begrenzung. Bestätigungsbalken-Filterung. Echtzeit-Equity-Kurven-Überwachung. Dein Kapital ist immer geschützt.",
  s2b_advocates_label: "Wer das seit Jahrzehnten macht",
  s2b_adv_disclaimer: "Diese Personen sind nicht mit Trading Pilot verbunden und empfehlen es nicht. Ihr öffentlich dokumentierter Einsatz von algorithmischen und regelbasierten Handelssystemen zeigt die Kraft der Automatisierung.",
  s2b_adv1_title: "Legende des quantitativen Tradings bei Renaissance Technologies",
  s2b_adv1_quote: "Der Medallion-Fonds, der vollständig von mathematischen Algorithmen gesteuert wird, erzielte über 30 Jahre durchschnittlich 66% Jahresrendite  die größte Anlageperformance der Geschichte.",
  s2b_adv1_tag: "66% Jahresrendite · Rein algorithmisch",
  s2b_adv2_title: "Bridgewater Associates, der weltweit größte Hedgefonds",
  s2b_adv2_quote: "Dalio baute Bridgewater auf einem System, das er 'Die Maschine' nennt  ein Regelwerk aus Algorithmen und Prinzipien, das menschliche Emotionen aus jeder Anlageentscheidung entfernt.",
  s2b_adv2_tag: "$160 Mrd. AUM · Algorithmus-first",
  s2b_adv3_title: "Berkshire Hathaway, der bekannteste Investor der Welt",
  s2b_adv3_quote: "\"Der Aktienmarkt ist ein Gerät zum Übertragen von Geld von den Ungeduldigen zu den Geduldigen.\" Systeme erzwingen Geduld. Menschen schaffen das fast nie.",
  s2b_adv3_tag: "Disziplin statt Emotionen · Regelbasiertes Denken",
  s2b_adv4_title: "Tudor Investment Corp, Legende des Makro-Tradings",
  s2b_adv4_quote: "Jones pionierte in den 1980er Jahren computergestützte systematische Strategien und hat sich stets für regelbasiertes, emotionsfreies Handeln eingesetzt.",
  s2b_adv4_tag: "Systematische Strategien seit den 80er Jahren",
  s2b_cta_box_p1: "Lass uns dir nun genau zeigen, wie Trading Pilot auf dem Markt der letzten Woche agiert hätte.",
  s2b_cta_box_p2: "Echte Strategielogik. Echte Chartdaten. Claude AI Sentiment live.",
  s2b_cta: "Zeig mir, wie es funktioniert →",
  s2b_cta_sub: "Kostenloser Zugang · Keine Kreditkarte · 60 Sekunden zum Einrichten",

  s2c_badge: "Live-Simulation · Claude AI Aktiv",
  s2c_headline: "Sieh Trading Pilot in Echtzeit denken",
  s2c_subtext: "Wähle eine Strategie. Sieh, wie der Bot ein Signal erkennt, das Live-News-Sentiment via Claude AI prüft, dann den Trade auslöst oder unterdrückt  automatisch.",
  s2c_win_rate: "{n}% Win Rate",
  s2c_how_works: "Wie {name} funktioniert",
  s2c_risk_label: "Eingebaute Risikokontrollen  jede Strategie",
  s2c_sl_title: "Stop-Loss", s2c_sl_desc: "Fester Stop bei jedem Trade",
  s2c_tp_title: "Take-Profit", s2c_tp_desc: "Auto-Ausstieg bei deinem Ziel",
  s2c_dl_title: "Tages-Verlust-Cap", s2c_dl_desc: "Bot hält an wenn Limit erreicht",
  s2c_mt_title: "Max. Tages-Trades", s2c_mt_desc: "Kein Überhandeln in Rauschen",
  s2c_running: "Simulation läuft…",
  s2c_replay: "↺ Simulation erneut ausführen",
  s2c_cta: "Ich will TradePilot für mich arbeiten lassen →",
  s2c_cta_sub: "Kostenloser Zugang · 60 Sekunden · Keine Kreditkarte",
  s2c_scanning: "SCANNT",
  s2c_complete: "ABGESCHLOSSEN",
  s2c_idle: "BEREIT",
  s2c_buy_signal: "KAUF-Signal",
  s2c_sell_signal: "VERKAUF-Signal",

  s2d_badge: "Live traden zusehen",
  s2d_headline: "$250-Konto. Bot handelt EUR/USD. Vollautomatisch.",
  s2d_subtext: "Sieh zu, wie TradePilot Chancen entdeckt und Trades in Echtzeit ausführt, während du absolut nichts tust.",
  s2d_balance_label: "Kontostand",
  s2d_status_initial: "TradePilot beobachtet den Markt...",
  s2d_status_scanning: "Scannt jeden Preistick. Sucht den richtigen Moment...",
  s2d_status_pattern: "Muster entdeckt. Schnelle Linie kreuzt langsame Linie...",
  s2d_status_trade1: "Trade #1 geöffnet  Bot ist jetzt im Markt.",
  s2d_status_tp1: "Trade #1 mit Gewinn geschlossen!",
  s2d_status_trade2: "Zweites Setup entdeckt  Bot tritt erneut in den Markt ein.",
  s2d_status_tp2: "Zweiter Trade mit Gewinn geschlossen!",
  s2d_status_done: "Sitzung abgeschlossen. 2 Trades. 2 Gewinne. Null Aufwand von dir.",
  s2d_trade_open: "TRADE OFFEN",
  s2d_scanning: "SCANNT",
  s2d_complete: "ABGESCHLOSSEN",
  s2d_standby: "BEREIT",
  s2d_milestone_activated: "Bot aktiviert  Markt wird beobachtet",
  s2d_milestone_activated_sub: "Scannt jeden Tick nach einem Signal...",
  s2d_milestone_trade1: "Trade #1 geöffnet",
  s2d_milestone_trade1_sub: "Bot ist zum richtigen Zeitpunkt eingetreten.",
  s2d_milestone_tp1: "+${amount} Gewinn gesichert",
  s2d_milestone_tp1_sub: "Erster Trade im Plus geschlossen.",
  s2d_milestone_trade2: "Zweiter Trade geöffnet",
  s2d_milestone_trade2_sub: "Bot hat eine weitere Chance entdeckt.",
  s2d_milestone_tp2_sub: "Beide Trades im Plus geschlossen.",
  s2d_watch_step1_title: "Bot beobachtet",
  s2d_watch_step1_desc: "Jede Preisbewegung, 24/7",
  s2d_watch_step2_title: "Entdeckt Chance",
  s2d_watch_step2_desc: "Erkennt den richtigen Moment automatisch",
  s2d_watch_step3_title: "Sichert Gewinn",
  s2d_watch_step3_desc: "Schließt den Trade zu deinem Zielpreis",
  s2d_sim_complete_label: "Simulation abgeschlossen",
  s2d_started_with: "Gestartet mit",
  s2d_ended_with: "Beendet mit",
  s2d_trade1_label: "Trade 1: EUR/USD",
  s2d_trade2_label: "Trade 2: EUR/USD",
  s2d_result_box: "Du hast nichts getan. Der Bot hat den Chart beobachtet, zwei Chancen entdeckt, beide Trades eröffnet und sie mit Gewinn geschlossen. Das macht TradePilot jeden Tag für dich.",
  s2d_start_btn: "▶  Live traden zusehen",
  s2d_running_note: "Simulation läuft  beobachte den Chart oben...",
  s2d_cta: "Ich will das auf meinem Konto laufen haben →",
  s2d_watch_again: "↺ Nochmal ansehen",
  s1_adv1: "Minimaler manueller Aufwand",
  s1_adv2: "Keine Erfahrung nötig",
  s1_adv3: "Auszahlung in 24–48h",
  s5_direct_note: "Du nutzt einen direkten Registrierungslink  dieser umgeht die öffentliche Warteliste und reserviert deinen Platz sofort. Sobald du diese Seite verlässt, kann dieser Platz nicht garantiert werden.",
  s2d_withdrawal_title: "Aktuelle Auszahlungen aus deiner Region",
  s2d_withdrawal_verified: "verifiziert · echte Konten",
};

// ── FRENCH ────────────────────────────────────────────────────────────────────
const fr: T = {
  live: "Live",
  watching: "{n} personnes regardent maintenant",
  ssl_secured: "Connexion SSL sécurisée",

  footer_risk_prefix: "Avertissement sur les risques :",
  footer_risk_body: "Le trading d'instruments financiers comporte des risques importants. Les prix peuvent fluctuer et vous pourriez perdre plus que votre dépôt initial. Ne tradez qu'avec du capital que vous pouvez vous permettre de perdre. Les performances passées ne préjugent pas des résultats futurs. Le dépôt minimum de départ est de 250 $.",
  footer_terms: "CGU",
  footer_privacy: "Confidentialité",
  footer_deposits: "Pourquoi les dépôts échouent",
  footer_copyright: "© 2026 TradePilot",

  s1_headline: "Des gens ordinaires gagnent vraiment de l'argent avec le trading. Alors pourquoi pas toi ?",
  s1_subtext: "Pas des banquiers. Pas des hedge funds. Des gens normaux des enseignants, des chauffeurs, des parents qui en avaient assez de regarder depuis les coulisses. Ils ont tous commencé exactement là où tu es maintenant.",
  s1_cta_above: "Montre-moi comment ça marche",
  s1_profit_label: "Total gagné par nos traders aujourd'hui",
  s1_profit_sublabel: "En direct · se met à jour toutes les quelques secondes",
  s1_real_accounts: "Comptes réels",
  s1_challenge_title: "Ça se passe maintenant",
  s1_challenge_headline: "Pendant que tu lis ceci, {n} personnes ont passé leur premier trade aujourd'hui.",
  s1_challenge_sub: "Pas des investisseurs. Pas des riches. Juste des gens qui ont arrêté de dire \"peut-être un jour\" et ont cliqué sur un bouton. La seule chose qui les distingue de toi en ce moment, c'est ce bouton.",
  s1_daily_cap: "Limite journalière : 100 places",
  s1_mind_label: "Question rapide",
  s1_mind_question: "Qu'est-ce que ton argent fait pendant que tu dors ?",
  s1_mind_nothing: "Pratiquement rien",
  s1_mind_works: "Il travaille pour moi",
  s1_mind_nothing_title: "C'est le fossé. Et il est comblable.",
  s1_mind_nothing_body: "Un compte épargne te rapporte ~0,5 % par an. Le marché bouge autant en quelques minutes. Les gens qui gagnent de l'argent ne sont pas plus intelligents ils ont juste appris à être du bon côté de ces mouvements.",
  s1_mind_nothing_footer: "C'est exactement ce que nous allons te montrer.",
  s1_mind_works_title: "Alors tu sais déjà pourquoi tu es là.",
  s1_mind_works_body: "Tu comprends le principe. Ce que nous te montrerons, c'est la façon la plus rapide et la moins risquée de l'appliquer sans expérience, sans diplôme de finance, sans passer des heures devant des graphiques.",
  s1_activity_title: "Retraits en direct",
  s1_activity_verified: "vérifié · comptes réels",
  s1_trust_t1: "47 000+", s1_trust_t2: "Traders inscrits",
  s1_trust_c1: "Disponible dans", s1_trust_c2: "ton pays",
  s1_trust_f1: "Gratuit", s1_trust_f2: "Pour s'inscrire",
  s1_deposit_title: "Une chose à savoir avant de continuer",
  s1_deposit_body: "Pour trader, les brokers exigent un dépôt de départ minimum de 250 $. Ce n'est pas des frais versés à nous c'est ton propre capital de trading, sur ton compte, que tu contrôles et peux retirer à tout moment.",
  s1_deposit_own1: "Ton argent", s1_deposit_own2: "Pas des frais",
  s1_deposit_with1: "Retirable", s1_deposit_with2: "À tout moment",
  s1_deposit_reg1: "Régulé", s1_deposit_reg2: "Détenu par le broker",
  s1_cta_main: "Montre-moi exactement comment ça fonctionne",
  s1_cta_sub: "60 secondes pour s'inscrire · aucune carte requise",

  s2_step1: "Ta situation", s2_step2: "Quiz rapide", s2_step3: "Obtenir l'accès",
  s2_missed_label: "Pendant que tu lis ceci, nos traders ont gagné",
  s2_missed_sub: "Le marché ne s'arrête pour personne.",
  s2_question_label: "Question rapide",
  s2_headline: "Sois honnête laquelle c'est toi ?",
  s2_subtext: "Dans tous les cas, on est là pour toi. Choisis juste ce qui te ressemble le plus.",
  s2_opt1_head: "Je vois des gens gagner de l'argent avec le trading et je me demande pourquoi je n'ai pas encore commencé",
  s2_opt1_sub: "Je sais que c'est possible je n'ai juste pas encore fait le premier pas",
  s2_opt2_head: "J'ai déjà essayé le trading sans succès j'ai perdu de l'argent et je me suis découragé",
  s2_opt2_sub: "Je crois toujours que ça marche, je n'avais juste pas la bonne approche",
  s2_opt3_head: "Je n'ai pas le temps de passer mes journées à regarder des graphiques j'ai un travail, une famille, une vie",
  s2_opt3_sub: "S'il y a un moyen de le faire sans que ça devienne un second emploi, je suis intéressé",
  s2_footer: "Ta réponse nous aide à personnaliser ce que tu verras ensuite",
  s2_hint: "👆 Appuie sur l'option qui te décrit le mieux",
  s3_hint: "Sélectionne une réponse pour continuer",
  s2c_scroll_hint: "Fais défiler pour regarder la simulation en direct",
  s2c_strategy_hint: "Appuie sur une stratégie ci-dessus pour la changer et rejouer",

  s3_progress_label: "Création de ton profil en cours…",
  s3_question_label: "Question {q} sur {total}",
  s3_footer: "Il n'y a pas de bonne ou mauvaise réponse elles nous aident juste à te montrer ce qui est vraiment pertinent pour toi",
  s3_q1: "Qu'est-ce qui te retient vraiment de trader en ce moment ?",
  s3_a1_1: "Honnêtement, je ne sais pas par où commencer",
  s3_a1_2: "J'ai peur de perdre de l'argent",
  s3_a1_3: "Je n'ai tout simplement pas le temps de tout comprendre",
  s3_a1_4: "J'ai déjà essayé une fois et ça s'est mal passé",
  s3_q2: "Si quelque chose te montrait un trade clair et à faible risque est-ce que tu le ferais ?",
  s3_a2_1: "Oui, tout de suite",
  s3_a2_2: "Probablement j'aurais besoin d'une explication rapide d'abord",
  s3_a2_3: "Peut-être j'y réfléchirais un peu",
  s3_a2_4: "Probablement pas, j'y réfléchirais trop",
  s3_q3: "Que signifierait vraiment un revenu supplémentaire de 1 000 à 3 000 $ par mois pour ta vie ?",
  s3_a3_1: "Enfin rembourser mes dettes",
  s3_a3_2: "Réduire mes heures de travail",
  s3_a3_3: "Simplement respirer plus librement chaque mois",
  s3_a3_4: "Construire quelque chose de concret pour mon avenir",

  s4_loading_1: "Lecture de tes réponses…",
  s4_loading_2: "Recherche de traders avec un profil similaire…",
  s4_loading_3: "Vérification de ce qui a fonctionné pour eux…",
  s4_loading_4: "Calcul de ton score de compatibilité…",
  s4_loading_5: "Terminé voici ce que nous avons trouvé.",
  s4_fit_label: "Ton score de compatibilité",
  s4_fit_sub: "À quel point tu ressembles aux traders qui sont réellement profitables",
  s4_result_headline: "Ce que tes réponses signifient vraiment :",
  s4_result_watching: "Les personnes qui prennent le temps de se renseigner avant de se lancer ont tendance à rester plus longtemps et à mieux s'en sortir. C'est toi. Tu ne t'es pas lancé aveuglément et ça joue en ta faveur une fois que tu as la bonne configuration.",
  s4_result_tried: "Voilà la chose avoir perdu de l'argent avant ne signifie pas que le trading n'est pas fait pour toi. Ça signifie généralement juste que les outils n'étaient pas bien configurés. Les traders qui ont eu des difficultés au début et qui ont ensuite retourné la situation sont souvent les plus constants. Tu sais déjà ce qu'il ne faut pas faire ce qui t'avantage.",
  s4_result_no_time: "Bonne nouvelle c'est exactement pour ça que la plateforme a été construite. La majorité des personnes qui l'utilisent ont un emploi à temps plein, une famille et zéro temps libre pour regarder des graphiques. C'est pourquoi le trading automatisé et le copy trading existent : le travail lourd est fait pour toi. Tu décides combien allouer, le système s'occupe du reste.",
  s4_modes_label: "Trois façons de trader tu choisis ce qui correspond à ta vie",
  s4_mode1_title: "Trading automatisé", s4_mode1_badge: "Le plus populaire",
  s4_mode1_desc: "Règle ton niveau de risque une seule fois. La plateforme place et gère automatiquement les trades 24h/5j basé sur des stratégies éprouvées. Tu n'as rien à surveiller.",
  s4_mode2_title: "Copy trading", s4_mode2_badge: "Idéal pour les débutants",
  s4_mode2_desc: "Choisis un trader expert à suivre. Chaque trade qu'il fait est automatiquement copié sur ton compte, proportionnellement à ton solde.",
  s4_mode3_title: "Trading manuel", s4_mode3_badge: "Contrôle total",
  s4_mode3_desc: "Place tes propres trades en utilisant des graphiques en direct, des signaux et des outils d'analyse. Idéal pour ceux qui veulent être actifs et apprendre les marchés.",
  s4_mode_recommended: "Recommandé pour toi",
  s4_test1_text: "Il y a quatre mois j'étais exactement là où tu es maintenant. Vraiment aucune idée. Maintenant la première chose que je vérifie le matin ce n'est pas mon réveil c'est ce qui s'est fermé pendant la nuit.",
  s4_test2_text: "J'avais brûlé de l'argent deux fois en essayant de trader seul. Ça semblait différent dès le début ça te dit quoi faire au lieu de te laisser deviner.",
  s4_test3_text: "Un collègue m'a montré ça et j'étais sceptique. Trois semaines plus tard j'avais récupéré tout ce que j'avais perdu lors de ma première tentative. J'aurais aimé le trouver plus tôt.",
  s4_stat1_label: "Personnes déjà inscrites", s4_stat2_label: "Profitable sous 90 jours", s4_stat3_label: "Pour démarrer",
  s4_urgency_title: "Places limitées aujourd'hui", s4_urgency_sub1: "Il n'en reste que quelques-unes", s4_urgency_sub2: "Se réinitialise toutes les 24 heures",
  s4_cta: "Réserver ma place gratuite",

  s5_spots_one: "1 place restante aujourd'hui",
  s5_spots_many: "{n} places restantes aujourd'hui",
  s5_countdown_label: "Ta place est réservée pendant",
  s5_expired: "Temps expiré",
  s5_expired_sub: "Une fois expiré, ton profil se réinitialise et tu devrais tout recommencer.",
  s5_spots_title: "Places disponibles dans ta zone",
  s5_spots_sub: "Se rafraîchit toutes les 24 heures",
  s5_spots_total: "/ 10 au total",
  s5_what_happens: "Que se passe-t-il vraiment si tu fermes ceci ?",
  s5_c1: "Le marché continue de bouger avec ou sans toi.",
  s5_c2: "Ton profil disparaît et tu devrais tout répondre à nouveau.",
  s5_c3: "Quelqu'un d'autre dans ta zone prend ta place.",
  s5_c4: "Les personnes inscrites la semaine dernière voient déjà leurs premiers résultats.",
  s5_qualify_label: "Avant de réclamer ta place vérifie que tu es qualifié",
  s5_q1: "Tu as un appareil avec accès à internet",
  s5_q2: "Tu peux consacrer 10 minutes à la configuration de ton compte",
  s5_q3: "Tu comprends que le trading comporte des risques",
  s5_q4: "Tu es capable de commencer avec un minimum de 250 $ (ton capital de trading pas des frais, entièrement retirable)",
  s5_qualify_footer: "Si tout ce qui précède s'applique à toi, ta place est réservée ci-dessous.",
  s5_cta: "Réserver ma place gratuite maintenant",
  s5_cta_sub: "Gratuit · sans engagement · prend environ 45 secondes",

  s6_progress_label: "Presque terminé…",
  s6_headline: "Dernière étape configurons ton compte",
  s6_subtext: "Ton profil est prêt. Dis-nous juste où envoyer ton accès et un spécialiste du trading te contactera pour te lancer.",
  s6_min_deposit_label: "Montant minimum de départ :",
  s6_specialist_role: "Spécialiste Trading Senior",
  s6_specialist_quote: "Je vais personnellement examiner ton profil et te guider dans la configuration de ton premier trade lors de notre appel d'intégration. Environ 20 minutes. Aucune pression, juste répondre à tes questions.",
  s6_specialist_online: "En ligne maintenant répond généralement sous 2 h",
  s6_step1_title: "Où doit-on envoyer ton accès ?",
  s6_step1_sub: "10 secondes. Aucune carte requise.",
  s6_email_label: "Adresse e-mail",
  s6_email_placeholder: "toi@exemple.com",
  s6_continue_btn: "Continuer →",
  s6_no_spam: "🔒 Nous ne spammons jamais ni ne vendons tes données.",
  s6_confirmed_label: "E-mail confirmé",
  s6_change: "Modifier",
  s6_first_name_label: "Prénom", s6_last_name_label: "Nom de famille",
  s6_fname_placeholder: "Prénom", s6_lname_placeholder: "Nom",
  s6_phone_label: "Numéro de téléphone",
  s6_phone_sub: "Un vrai spécialiste te contactera pour t'aider à t'installer.",
  s6_loading_btn: "Configuration en cours…",
  s6_confirm_btn: "C'est parti →",
  s6_consent_text: "J'accepte d'être contacté par un spécialiste du trading et confirme avoir lu les CGU et la Politique de confidentialité. Je comprends que le trading comporte des risques, le dépôt minimum de départ est de 250 $ et j'ai 18 ans ou plus.",
  s6_trust1: "🔒 Sécurisé et privé", s6_trust2: "Sans carte de crédit", s6_trust3: "Sans engagement",
  s6_privacy_note: "🔒 Tes informations sont privées et ne seront jamais partagées ni vendues.",
  s6_min_note: "Dépôt minimum pour commencer :",
  s6_terms_note: "En continuant tu acceptes nos",
  s6_terms_link: "CGU",
  s6_and: "et notre",
  s6_privacy_link: "Politique de confidentialité",

  err_email: "Veuillez entrer une adresse e-mail valide.",
  err_email_personal: "Veuillez utiliser ton adresse e-mail personnelle.",
  err_first_name: "Veuillez entrer ton prénom.",
  err_last_name: "Veuillez entrer ton nom de famille.",
  err_full_name: "Veuillez entrer ton nom complet.",
  err_phone: "Veuillez entrer ton numéro de téléphone.",
  err_phone_invalid: "Veuillez entrer un numéro de téléphone valide.",
  err_too_many: "Trop de tentatives. Veuillez actualiser la page et réessayer.",
  err_rate_limit: "Trop de tentatives. Veuillez attendre une minute et réessayer.",
  err_generic: "Une erreur s'est produite. Veuillez actualiser la page et réessayer.",
  err_network: "Problème de réseau. Veuillez vérifier ta connexion et réessayer.",

  ticker_joined: "{name} de {city} vient de rejoindre",
  ticker_trade: "{name} de {city} vient de clôturer un trade de {amount}",
  ticker_on_page: "{name} de {city} est sur cette page en ce moment",
  ticker_mins_ago: "il y a {n} min",

  exit_warning: "Attention",
  exit_headline: "Attends  tu étais si proche",
  exit_body_1: "Depuis que tu as ouvert cette page, des gens sur la même plateforme ont gagné :",
  exit_still_climbing: "Ce chiffre continue de grimper en ce moment.",
  exit_body_2: "Tu n'as pas à t'engager à quoi que ce soit. Termine juste la dernière étape  ça prend moins de 60 secondes et tu peux toujours décider après.",
  exit_cta: "Continuer là où j'en étais →",
  exit_or: "ou",
  exit_soft_prompt: "Pas encore prêt ? Laisse ton e-mail et on t'envoie le guide gratuit.",
  exit_email_placeholder: "ton@email.fr",
  exit_send_btn: "Envoyer",
  exit_sent: "✓ Reçu ! Vérifie ta boîte de réception sous peu.",
  exit_no_thanks: "Non merci, je ne suis pas intéressé",

  risk_label: "Avertissement sur les risques :",
  risk_body: "Le trading comporte des risques. Les performances passées ne préjugent pas des résultats futurs. Capital à risque. La valeur des investissements peut monter ou baisser. Tu ne devrais trader qu'avec de l'argent que tu peux te permettre de perdre. Les résultats simulés et historiques ne garantissent pas les performances futures.",
  risk_compact: "Capital à risque. Les performances passées ne préjugent pas des résultats futurs.",
  risk_regulated_by: "Régulé par",

  s2b_step_label: "Pourquoi cela te concerne",
  s2b_step_duration: "2 min de lecture",
  s2b_headline: "Le système est conçu pour",
  s2b_headline_em: "faire travailler ton argent pour eux",
  s2b_headline_end: "pas pour toi.",
  s2b_subtext: "Tu vas travailler. Tu économises. Tu essaies de faire ce qu'il faut. Et à chaque tournant, la hausse des coûts, les faibles intérêts et les impôts grignotent tes progrès. Voici ce qui se passe vraiment avec ton argent en ce moment.",
  s2b_counter_label: "Valeur perdue à cause de l'inflation depuis que tu as ouvert cette page",
  s2b_counter_sub: "Dans le monde entier, l'inflation détruit le pouvoir d'achat chaque seconde. Tes économies inactives en font partie.",
  s2b_p1_title: "Les impôts prennent 20–45% de tout ce que tu gagnes",
  s2b_p1_body: "Avant que tu voies un centime, les gouvernements prennent leur part. Le travailleur moyen perd près d'un tiers de ses revenus avant qu'ils n'atteignent jamais son compte bancaire.",
  s2b_p1_stat: "£12 570 perdus annuellement sur un salaire moyen britannique rien qu'en impôts.",
  s2b_p2_title: "L'inflation détruit silencieusement tes économies",
  s2b_p2_body: "Ta banque te verse 0,1%. L'inflation tourne à 4–6%. Chaque année où tes économies restent immobiles, elles perdent de la valeur réelle. Épargner davantage ne résout pas ce problème.",
  s2b_p2_stat: "£10 000 épargnés aujourd'hui ne valent que £9 400 en termes réels l'année prochaine.",
  s2b_p3_title: "Carburant, nourriture, énergie : les coûts ne cessent d'augmenter",
  s2b_p3_body: "Le prix de tout ce dont tu as besoin continue de grimper. Ton revenu ne suit pas. L'écart entre ce que tu gagnes et ce que tu dépenses se creuse chaque année.",
  s2b_p3_stat: "Les factures moyennes des ménages britanniques ont augmenté de £1 800+ en une seule année.",
  s2b_p4_title: "Indépendant ? Tu n'as pas le temps de trader",
  s2b_p4_body: "Gérer ta propre entreprise consomme déjà 60+ heures par semaine. Rester devant des graphiques à regarder les bougies bouger n'est pas une option. Pourtant ton argent travaille encore contre toi.",
  s2b_p4_stat: "67% des indépendants n'ont pas de stratégie d'investissement active.",
  s2b_p5_title: "Ton argent à la banque perd de la valeur chaque jour",
  s2b_p5_body: "Les banques ne récompensent pas la fidélité  elles récompensent tes dépôts en te payant presque rien. Pendant ce temps, elles prêtent ce même argent à 8–25% d'intérêt. Tu leur rends service.",
  s2b_p5_stat: "Les banques de réseau paient en moyenne 0,1–1,5% d'intérêt contre 5%+ d'inflation.",
  s2b_p6_title: "Les retraites couvrent à peine l'essentiel",
  s2b_p6_body: "Des décennies de cotisations. Une vie de travail. Et une retraite qui couvre à peine le loyer, la nourriture et le chauffage. La retraite qu'on t'avait promise ne va pas aussi loin qu'elle le devrait.",
  s2b_p6_stat: "Retraite moyenne britannique : £13 000/an. Coût de la vie moyen : £17 000.",
  s2b_why_headline: "Ce qu'on ne te dit pas",
  s2b_why_text1: "Les ultra-riches ont compris ça il y a des décennies. Ils ne gèrent pas l'argent manuellement. Ils déploient des systèmes automatisés qui travaillent pour eux 24 heures sur 24  qu'ils dorment, soient en vacances ou vivent leur vie.",
  s2b_why_text2: "Les algorithmes de Jim Simons tournaient pendant qu'il dormait et ont fait de lui un milliardaire. La machine de Ray Dalio ne prend jamais un jour de congé. La différence c'est que ces systèmes n'étaient pas disponibles aux gens ordinaires.",
  s2b_why_text3: "Jusqu'à Trading Pilot.",
  s2b_solution_label: "La solution",
  s2b_tp_headline: "Voici Trading Pilot",
  s2b_tp_sub: "Le premier moteur d'intelligence de trading autonome qui fusionne des signaux techniques en temps réel avec le sentiment d'actualité de Claude AI  exécutant des trades 24h/7j avec une discipline qu'aucun humain ne peut maintenir.",
  s2b_claude_title: "Moteur de Sentiment Claude AI",
  s2b_claude_body: "Avant chaque trade, Pilot interroge Claude AI pour le sentiment d'actualité en direct sur cet actif. Un crossover parfait avec des titres négatifs ? Pilot attend. Signal confirmé avec sentiment haussier ? Pilot agit avec pleine conviction.",
  s2b_fact1_heading: "Il surveille le marché à ta place",
  s2b_fact1_detail: "Trading Pilot scanne chaque tick de prix, chaque minute, sur 20+ instruments  24h/7j sans hésitation et avec une exécution des signaux en sous-milliseconde. Le marché ne dort jamais, et Pilot non plus.",
  s2b_fact2_heading: "Quatre stratégies éprouvées, pas des suppositions",
  s2b_fact2_detail: "MA Crossover (61% win rate), RSI Reversal (58%), MACD Momentum (63%), Pure Momentum (55%). Chacune conçue pour une condition de marché différente. Tu en choisis une  ou tu fais tourner plusieurs pilots simultanément sur différents actifs.",
  s2b_fact3_heading: "Six couches de protection du risque de niveau institutionnel",
  s2b_fact3_detail: "Stop-loss fixe sur chaque trade. Verrouillage du take-profit. Disjoncteur de perte journalière maximale. Plafond de trades journaliers maximum. Filtrage par barre de confirmation. Surveillance en temps réel de la courbe d'équité. Ton capital est toujours protégé.",
  s2b_advocates_label: "Qui fait ça depuis des décennies",
  s2b_adv_disclaimer: "Ces personnes ne sont pas affiliées à Trading Pilot et ne l'approuvent pas. Leur utilisation documentée publiquement de systèmes de trading algorithmique et basé sur des règles démontre la puissance de l'automatisation.",
  s2b_adv1_title: "Légende du trading quantitatif chez Renaissance Technologies",
  s2b_adv1_quote: "Le Medallion Fund, entièrement géré par des algorithmes mathématiques, a affiché un rendement annuel moyen de 66% sur 30 ans  le meilleur palmarès d'investissement de l'histoire.",
  s2b_adv1_tag: "66% de rendement annuel · Purement algorithmique",
  s2b_adv2_title: "Bridgewater Associates, le plus grand hedge fund au monde",
  s2b_adv2_quote: "Dalio a construit Bridgewater sur un système qu'il appelle 'La Machine'  un ensemble d'algorithmes et de principes qui éliminent les émotions humaines de chaque décision d'investissement.",
  s2b_adv2_tag: "160 Mds AUM · Algorithme d'abord",
  s2b_adv3_title: "Berkshire Hathaway, l'investisseur le plus célèbre du monde",
  s2b_adv3_quote: "\"La bourse est un mécanisme permettant de transférer de l'argent des impatients aux patients.\" Les systèmes imposent la patience. Les humains ne le peuvent presque jamais.",
  s2b_adv3_tag: "Discipline sur les émotions · Pensée basée sur des règles",
  s2b_adv4_title: "Tudor Investment Corp, légende du trading macro",
  s2b_adv4_quote: "Jones a été pionnier des stratégies systématiques informatisées dans les années 1980 et a toujours prôné une exécution des trades basée sur des règles, sans émotion.",
  s2b_adv4_tag: "Stratégies systématiques depuis les années 80",
  s2b_cta_box_p1: "Laisse-nous maintenant te montrer exactement comment Trading Pilot aurait agi sur le marché de la semaine dernière.",
  s2b_cta_box_p2: "Logique de stratégie réelle. Données de graphique réelles. Sentiment Claude AI en direct.",
  s2b_cta: "Montre-moi comment ça fonctionne →",
  s2b_cta_sub: "Accès gratuit · Pas de carte de crédit · 60 secondes pour configurer",

  s2c_badge: "Simulation Live · Claude AI Actif",
  s2c_headline: "Regarde Trading Pilot Penser en Temps Réel",
  s2c_subtext: "Choisis une stratégie. Vois comment le bot détecte un signal, vérifie le sentiment d'actualité en direct via Claude AI, puis déclenche ou supprime le trade  automatiquement.",
  s2c_win_rate: "{n}% win rate",
  s2c_how_works: "Comment {name} fonctionne",
  s2c_risk_label: "Contrôles de risque intégrés  chaque stratégie",
  s2c_sl_title: "Stop-Loss", s2c_sl_desc: "Stop fixe sur chaque trade",
  s2c_tp_title: "Take-Profit", s2c_tp_desc: "Sortie automatique à ton objectif",
  s2c_dl_title: "Cap perte journalière", s2c_dl_desc: "Le bot s'arrête si le limite est atteinte",
  s2c_mt_title: "Max trades journaliers", s2c_mt_desc: "Pas de surtrading dans le bruit",
  s2c_running: "Simulation en cours…",
  s2c_replay: "↺ Relancer la simulation",
  s2c_cta: "Je veux TradePilot qui travaille pour moi →",
  s2c_cta_sub: "Accès gratuit · 60 secondes · Pas de carte de crédit",
  s2c_scanning: "EN COURS",
  s2c_complete: "TERMINÉ",
  s2c_idle: "EN ATTENTE",
  s2c_buy_signal: "Signal ACHAT",
  s2c_sell_signal: "Signal VENTE",

  s2d_badge: "Regarder trader en direct",
  s2d_headline: "Compte de 250$. Bot tradant EUR/USD. Entièrement automatisé.",
  s2d_subtext: "Regarde TradePilot repérer des opportunités et effectuer des trades en temps réel pendant que tu ne fais absolument rien.",
  s2d_balance_label: "Solde du Compte",
  s2d_status_initial: "TradePilot surveille le marché...",
  s2d_status_scanning: "Scan de chaque tick de prix. En attente du bon moment...",
  s2d_status_pattern: "Motif repéré. La ligne rapide croise la ligne lente...",
  s2d_status_trade1: "Trade #1 ouvert  le bot est dans le marché maintenant.",
  s2d_status_tp1: "Trade #1 fermé avec profit !",
  s2d_status_trade2: "Deuxième configuration repérée  le bot entre à nouveau sur le marché.",
  s2d_status_tp2: "Deuxième trade fermé avec profit !",
  s2d_status_done: "Session terminée. 2 trades. 2 victoires. Zéro effort de ta part.",
  s2d_trade_open: "TRADE OUVERT",
  s2d_scanning: "EN COURS",
  s2d_complete: "TERMINÉ",
  s2d_standby: "EN ATTENTE",
  s2d_milestone_activated: "Bot activé  surveillance du marché",
  s2d_milestone_activated_sub: "Scan de chaque tick en recherche d'un signal...",
  s2d_milestone_trade1: "Trade #1 ouvert",
  s2d_milestone_trade1_sub: "Le bot est entré au bon moment.",
  s2d_milestone_tp1: "+${amount} profit sécurisé",
  s2d_milestone_tp1_sub: "Premier trade fermé en positif.",
  s2d_milestone_trade2: "Deuxième trade ouvert",
  s2d_milestone_trade2_sub: "Le bot a repéré une autre opportunité.",
  s2d_milestone_tp2_sub: "Les deux trades fermés en positif.",
  s2d_watch_step1_title: "Le bot surveille",
  s2d_watch_step1_desc: "Chaque mouvement de prix, 24h/7j",
  s2d_watch_step2_title: "Repère l'opportunité",
  s2d_watch_step2_desc: "Détecte le bon moment automatiquement",
  s2d_watch_step3_title: "Sécurise le profit",
  s2d_watch_step3_desc: "Ferme le trade à ton prix cible",
  s2d_sim_complete_label: "Simulation terminée",
  s2d_started_with: "Commencé avec",
  s2d_ended_with: "Terminé avec",
  s2d_trade1_label: "Trade 1 : EUR/USD",
  s2d_trade2_label: "Trade 2 : EUR/USD",
  s2d_result_box: "Tu n'as rien fait. Le bot a surveillé le graphique, repéré deux opportunités, ouvert les deux trades et les a fermés avec profit. C'est ce que TradePilot fait pour toi chaque jour.",
  s2d_start_btn: "▶  Regarder trader en direct",
  s2d_running_note: "Simulation en cours  regarde le graphique ci-dessus...",
  s2d_cta: "Je veux ça sur mon compte →",
  s2d_watch_again: "↺ Regarder à nouveau",
  s1_adv1: "Travail manuel minimal",
  s1_adv2: "Aucune expérience requise",
  s1_adv3: "Retrait sous 24–48h",
  s5_direct_note: "Tu accèdes via un lien d'inscription direct  il contourne la liste d'attente publique et réserve ta place immédiatement. Une fois que tu quittes cette page, cette place ne peut être garantie.",
  s2d_withdrawal_title: "Retraits récents dans ta région",
  s2d_withdrawal_verified: "vérifié · comptes réels",
};

// ── SPANISH ───────────────────────────────────────────────────────────────────
const es: T = {
  live: "En vivo",
  watching: "{n} personas viendo ahora",
  ssl_secured: "Conexión SSL segura",

  footer_risk_prefix: "Advertencia de riesgo:",
  footer_risk_body: "El trading de instrumentos financieros conlleva riesgos significativos. Los precios pueden fluctuar y podrías perder más de tu depósito inicial. Opera solo con capital que puedas permitirte perder. El rendimiento pasado no es indicativo de resultados futuros. El depósito mínimo de inicio es de $250.",
  footer_terms: "Términos",
  footer_privacy: "Privacidad",
  footer_deposits: "Por qué fallan los depósitos",
  footer_copyright: "© 2026 TradePilot",

  s1_headline: "Personas normales están ganando dinero real con el trading. ¿Y tú por qué no?",
  s1_subtext: "No son banqueros. No son fondos de inversión. Personas normales maestros, conductores, padres que se cansaron de mirar desde las gradas. Todos empezaron exactamente donde estás tú ahora.",
  s1_cta_above: "Muéstrame cómo funciona",
  s1_profit_label: "Total ganado por nuestros traders hoy",
  s1_profit_sublabel: "En directo · se actualiza cada pocos segundos",
  s1_real_accounts: "Cuentas reales",
  s1_challenge_title: "Está pasando ahora mismo",
  s1_challenge_headline: "Mientras lees esto, {n} personas han hecho su primer trade hoy.",
  s1_challenge_sub: "No son inversores. No son ricos. Solo personas que dejaron de decir \"quizás algún día\" y pulsaron un botón. Lo único que les separa de ti ahora mismo es ese botón.",
  s1_daily_cap: "Límite diario: 100 plazas",
  s1_mind_label: "Pregunta rápida",
  s1_mind_question: "¿Qué hace tu dinero mientras duermes?",
  s1_mind_nothing: "Prácticamente nada",
  s1_mind_works: "Trabaja para mí",
  s1_mind_nothing_title: "Esa es la brecha. Y se puede cerrar.",
  s1_mind_nothing_body: "Una cuenta de ahorro te da ~0,5% al año. El mercado se mueve esa cantidad en minutos. Las personas que ganan dinero no son más inteligentes simplemente aprendieron a estar en el lado correcto de esos movimientos.",
  s1_mind_nothing_footer: "Eso es exactamente lo que te vamos a mostrar.",
  s1_mind_works_title: "Entonces ya sabes por qué estás aquí.",
  s1_mind_works_body: "Entiendes el principio. Lo que te mostraremos es la forma más rápida y con menos riesgo de aplicarlo sin experiencia, sin título de finanzas, sin pasar horas delante de gráficos.",
  s1_activity_title: "Retiros en directo",
  s1_activity_verified: "verificado · cuentas reales",
  s1_trust_t1: "47.000+", s1_trust_t2: "Traders dentro",
  s1_trust_c1: "Disponible en", s1_trust_c2: "tu país",
  s1_trust_f1: "Gratis", s1_trust_f2: "Para unirse",
  s1_deposit_title: "Una cosa que debes saber antes de continuar",
  s1_deposit_body: "Para operar, los brokers requieren un depósito mínimo de inicio de $250. No es una comisión para nosotros es tu propio capital de trading, en tu cuenta, que controlas tú y puedes retirar en cualquier momento.",
  s1_deposit_own1: "Tu dinero", s1_deposit_own2: "No es una comisión",
  s1_deposit_with1: "Retirable", s1_deposit_with2: "En cualquier momento",
  s1_deposit_reg1: "Regulado", s1_deposit_reg2: "Custodiado por broker",
  s1_cta_main: "Muéstrame exactamente cómo funciona esto",
  s1_cta_sub: "60 segundos para empezar · sin tarjeta de crédito",

  s2_step1: "Tu situación", s2_step2: "Quiz rápido", s2_step3: "Obtener acceso",
  s2_missed_label: "Mientras lees esto, nuestros traders han ganado",
  s2_missed_sub: "El mercado no hace pausas por nadie.",
  s2_question_label: "Pregunta rápida",
  s2_headline: "Sé honesto ¿cuál eres tú?",
  s2_subtext: "De cualquier manera te tenemos cubierto. Elige la que más se acerque.",
  s2_opt1_head: "Veo a gente ganar dinero con el trading y me pregunto por qué yo no he empezado todavía",
  s2_opt1_sub: "Sé que es posible simplemente no he dado el primer paso",
  s2_opt2_head: "Ya intenté hacer trading y no me fue bien perdí dinero y me desanimé",
  s2_opt2_sub: "Sigo creyendo que funciona, solo que no tenía el enfoque correcto",
  s2_opt3_head: "No tengo tiempo para estar todo el día mirando gráficos tengo trabajo, familia, vida",
  s2_opt3_sub: "Si hay una forma de hacerlo sin que se convierta en un segundo trabajo, me interesa",
  s2_footer: "Tu respuesta nos ayuda a personalizar lo que verás a continuación",
  s2_hint: "👆 Toca la opción que mejor te describe",
  s3_hint: "Selecciona una respuesta para continuar",
  s2c_scroll_hint: "Desplázate hacia abajo para ver la simulación en vivo",
  s2c_strategy_hint: "Toca una estrategia de arriba para cambiarla y reproducirla",

  s3_progress_label: "Creando tu perfil…",
  s3_question_label: "Pregunta {q} de {total}",
  s3_footer: "No hay respuestas correctas o incorrectas solo nos ayudan a mostrarte lo que es realmente relevante para ti",
  s3_q1: "¿Qué te frena realmente de hacer trading ahora mismo?",
  s3_a1_1: "Honestamente, no sé por dónde empezar",
  s3_a1_2: "Tengo miedo de perder dinero",
  s3_a1_3: "Simplemente no tengo tiempo para entenderlo todo",
  s3_a1_4: "Lo intenté una vez antes y salió mal",
  s3_q2: "Si algo te mostrara un trade claro y de bajo riesgo ¿lo harías?",
  s3_a2_1: "Sí, enseguida",
  s3_a2_2: "Probablemente querría una explicación rápida primero",
  s3_a2_3: "Quizás lo pensaría un poco",
  s3_a2_4: "Probablemente no, le daría demasiadas vueltas",
  s3_q3: "¿Qué significaría de verdad para tu vida tener $1.000–$3.000 extra al mes?",
  s3_a3_1: "Por fin liquidar mis deudas",
  s3_a3_2: "Reducir mis horas de trabajo",
  s3_a3_3: "Simplemente respirar más tranquilo cada mes",
  s3_a3_4: "Construir algo real para mi futuro",

  s4_loading_1: "Leyendo tus respuestas…",
  s4_loading_2: "Buscando traders con un perfil similar…",
  s4_loading_3: "Comprobando qué funcionó para ellos…",
  s4_loading_4: "Calculando tu puntuación de compatibilidad…",
  s4_loading_5: "Listo esto es lo que encontramos.",
  s4_fit_label: "Tu puntuación de compatibilidad",
  s4_fit_sub: "Cuánto te pareces a los traders que son realmente rentables",
  s4_result_headline: "Lo que realmente significan tus respuestas:",
  s4_result_watching: "Las personas que se toman un poco de tiempo para informarse antes de lanzarse tienden a quedarse más tiempo y a ir mejor. Eres tú. No te has lanzado a ciegas y eso juega a tu favor una vez que tienes la configuración adecuada.",
  s4_result_tried: "Aquí está la cuestión haber perdido dinero antes no significa que el trading no sea para ti. Generalmente solo significa que las herramientas no estaban bien configuradas. Los traders que tuvieron dificultades al principio y luego dieron la vuelta son a menudo los más consistentes. Ya sabes qué no hacer, lo que te pone por delante.",
  s4_result_no_time: "Buena noticia para esto exactamente fue construida la plataforma. La mayoría de las personas dentro tienen trabajos a tiempo completo, familias y cero tiempo libre para mirar gráficos. Por eso existen el trading automatizado y el copy trading: el trabajo pesado se hace por ti. Tú decides cuánto asignar, el sistema se encarga del resto.",
  s4_modes_label: "Tres formas de hacer trading tú eliges la que encaja con tu vida",
  s4_mode1_title: "Trading automatizado", s4_mode1_badge: "El más popular",
  s4_mode1_desc: "Configura tu nivel de riesgo una vez. La plataforma coloca y gestiona trades automáticamente 24/5 basándose en estrategias probadas. No necesitas vigilar nada.",
  s4_mode2_title: "Copy trading", s4_mode2_badge: "Ideal para principiantes",
  s4_mode2_desc: "Elige a un trader experto para seguir. Cada trade que hace se replica automáticamente en tu cuenta, en proporción a tu saldo.",
  s4_mode3_title: "Trading manual", s4_mode3_badge: "Control total",
  s4_mode3_desc: "Coloca tus propios trades usando gráficos en directo, señales y herramientas de análisis. Ideal para quienes quieren ser activos y aprender los mercados.",
  s4_mode_recommended: "Recomendado para ti",
  s4_test1_text: "Hace cuatro meses estaba exactamente donde tú estás ahora. De verdad no tenía ni idea. Ahora lo primero que reviso por la mañana no es la alarma sino lo que cerró durante la noche.",
  s4_test2_text: "Había quemado dinero dos veces intentando hacer trading solo. Esto se sentía diferente desde el principio te dice qué hacer en lugar de dejarte adivinar.",
  s4_test3_text: "Un compañero del trabajo me mostró esto y era escéptico. Tres semanas después había recuperado todo lo que perdí en mi primer intento. Ojalá lo hubiera encontrado antes.",
  s4_stat1_label: "Personas ya dentro", s4_stat2_label: "Rentables en 90 días", s4_stat3_label: "Para empezar",
  s4_urgency_title: "Plazas limitadas hoy", s4_urgency_sub1: "Solo quedan unas pocas", s4_urgency_sub2: "Se reinicia cada 24 horas",
  s4_cta: "Reservar mi plaza gratuita",

  s5_spots_one: "1 plaza restante hoy",
  s5_spots_many: "{n} plazas restantes hoy",
  s5_countdown_label: "Tu plaza está reservada durante",
  s5_expired: "Tiempo expirado",
  s5_expired_sub: "Cuando esto expire tu perfil se reinicia y tendrías que empezar desde cero.",
  s5_spots_title: "Plazas abiertas en tu área",
  s5_spots_sub: "Se actualiza cada 24 horas",
  s5_spots_total: "/ 10 en total",
  s5_what_happens: "¿Qué pasa realmente si cierras esto?",
  s5_c1: "El mercado sigue moviéndose con o sin ti.",
  s5_c2: "Tu perfil desaparece y tendrías que responder todo de nuevo.",
  s5_c3: "Alguien más en tu área ocupa tu plaza.",
  s5_c4: "Las personas que se registraron la semana pasada ya están viendo sus primeros resultados.",
  s5_qualify_label: "Antes de reclamar tu plaza asegúrate de que cumples los requisitos",
  s5_q1: "Tienes un dispositivo con acceso a internet",
  s5_q2: "Puedes dedicar 10 minutos a configurar tu cuenta",
  s5_q3: "Entiendes que el trading conlleva riesgos",
  s5_q4: "Puedes empezar con un mínimo de $250 (tu capital de trading no una comisión, totalmente retirable)",
  s5_qualify_footer: "Si todo lo anterior se aplica a ti, tu plaza está reservada abajo.",
  s5_cta: "Asegurar mi plaza gratuita ahora",
  s5_cta_sub: "Gratis · sin obligación · tarda unos 45 segundos",

  s6_progress_label: "Casi listo…",
  s6_headline: "Último paso configuremos tu cuenta",
  s6_subtext: "Tu perfil está listo. Solo dinos dónde enviarte el acceso y un especialista en trading se pondrá en contacto contigo para empezar.",
  s6_min_deposit_label: "Importe mínimo de inicio:",
  s6_specialist_role: "Especialista Trading Senior",
  s6_specialist_quote: "Voy a revisar personalmente tu perfil y a guiarte en la configuración de tu primer trade en nuestra llamada de incorporación. Unos 20 minutos. Sin presión, solo respondiendo tus preguntas.",
  s6_specialist_online: "En línea ahora normalmente responde en 2 h",
  s6_step1_title: "¿Dónde debemos enviarte el acceso?",
  s6_step1_sub: "10 segundos. Sin tarjeta.",
  s6_email_label: "Dirección de correo electrónico",
  s6_email_placeholder: "tu@ejemplo.com",
  s6_continue_btn: "Continuar →",
  s6_no_spam: "🔒 Nunca enviamos spam ni vendemos tus datos.",
  s6_confirmed_label: "Correo confirmado",
  s6_change: "Cambiar",
  s6_first_name_label: "Nombre", s6_last_name_label: "Apellido",
  s6_fname_placeholder: "Nombre", s6_lname_placeholder: "Apellido",
  s6_phone_label: "Número de teléfono",
  s6_phone_sub: "Un especialista real te contactará para ayudarte con la configuración.",
  s6_loading_btn: "Configurando…",
  s6_confirm_btn: "¡Vamos! →",
  s6_consent_text: "Acepto ser contactado por un especialista en trading y confirmo haber leído los Términos y la Política de privacidad. Entiendo que el trading conlleva riesgos, el depósito mínimo de inicio es de $250 y tengo 18 años o más.",
  s6_trust1: "🔒 Seguro y privado", s6_trust2: "Sin tarjeta de crédito", s6_trust3: "Sin compromiso",
  s6_privacy_note: "🔒 Tus datos son privados y nunca se compartirán ni venderán.",
  s6_min_note: "Depósito mínimo para empezar:",
  s6_terms_note: "Al continuar aceptas nuestros",
  s6_terms_link: "Términos",
  s6_and: "y nuestra",
  s6_privacy_link: "Política de privacidad",

  err_email: "Por favor introduce una dirección de correo válida.",
  err_email_personal: "Por favor usa tu dirección de correo personal.",
  err_first_name: "Por favor introduce tu nombre.",
  err_last_name: "Por favor introduce tu apellido.",
  err_full_name: "Por favor introduce tu nombre completo.",
  err_phone: "Por favor introduce tu número de teléfono.",
  err_phone_invalid: "Por favor introduce un número de teléfono válido.",
  err_too_many: "Demasiados intentos. Por favor recarga la página e inténtalo de nuevo.",
  err_rate_limit: "Demasiados intentos. Por favor espera un minuto e inténtalo de nuevo.",
  err_generic: "Algo salió mal. Por favor recarga la página e inténtalo de nuevo.",
  err_network: "Problema de red. Por favor comprueba tu conexión e inténtalo de nuevo.",

  ticker_joined: "{name} de {city} acaba de unirse",
  ticker_trade: "{name} de {city} acaba de cerrar un trade de {amount}",
  ticker_on_page: "{name} de {city} está en esta página ahora mismo",
  ticker_mins_ago: "hace {n} min",

  exit_warning: "Advertencia",
  exit_headline: "Espera  estabas tan cerca",
  exit_body_1: "Desde que abriste esta página, personas en la misma plataforma han ganado:",
  exit_still_climbing: "Ese número sigue subiendo ahora mismo.",
  exit_body_2: "No tienes que comprometerte a nada. Solo completa el último paso  tarda menos de 60 segundos y siempre puedes decidir después.",
  exit_cta: "Continuar donde lo dejé →",
  exit_or: "o",
  exit_soft_prompt: "¿No estás listo? Deja tu email y te enviamos la guía gratuita.",
  exit_email_placeholder: "tu@email.com",
  exit_send_btn: "Enviar",
  exit_sent: "✓ ¡Recibido! Revisa tu bandeja de entrada pronto.",
  exit_no_thanks: "No gracias, no estoy interesado",

  risk_label: "Advertencia de riesgo:",
  risk_body: "El trading conlleva riesgos. El rendimiento pasado no es indicativo de resultados futuros. Capital en riesgo. El valor de las inversiones puede subir y bajar. Solo deberías operar con dinero que puedas permitirte perder. Los resultados simulados e históricos no garantizan el rendimiento futuro.",
  risk_compact: "Capital en riesgo. El rendimiento pasado no es indicativo de resultados futuros.",
  risk_regulated_by: "Regulado por",

  s2b_step_label: "Por qué esto te importa",
  s2b_step_duration: "2 min de lectura",
  s2b_headline: "El sistema está diseñado para",
  s2b_headline_em: "hacer trabajar tu dinero para ellos",
  s2b_headline_end: "no para ti.",
  s2b_subtext: "Vas a trabajar. Ahorras. Intentas hacer lo correcto. Y en cada paso, los costes crecientes, los bajos intereses y los impuestos erosionan tu progreso. Esto es lo que está pasando realmente con tu dinero ahora mismo.",
  s2b_counter_label: "Valor perdido por la inflación desde que abriste esta página",
  s2b_counter_sub: "En todo el mundo, la inflación destruye el poder adquisitivo cada segundo. Tus ahorros inactivos son parte de eso.",
  s2b_p1_title: "Los impuestos se llevan el 20–45% de todo lo que ganas",
  s2b_p1_body: "Antes de ver un céntimo, los gobiernos se llevan su parte. El trabajador medio pierde casi un tercio de sus ingresos antes de que lleguen a su cuenta.",
  s2b_p1_stat: "£12.570 perdidos al año en un salario medio del Reino Unido solo en impuestos.",
  s2b_p2_title: "La inflación está destruyendo silenciosamente tus ahorros",
  s2b_p2_body: "Tu banco te paga el 0,1%. La inflación corre al 4–6%. Cada año que tus ahorros permanecen quietos, pierden valor real. Ahorrar más no soluciona este problema.",
  s2b_p2_stat: "£10.000 ahorrados hoy valen solo £9.400 en términos reales el año que viene.",
  s2b_p3_title: "Combustible, comida, energía: los costes no dejan de subir",
  s2b_p3_body: "El precio de todo lo que necesitas sigue subiendo. Tus ingresos no siguen el ritmo. La brecha entre lo que ganas y lo que gastas se amplía cada año.",
  s2b_p3_stat: "Las facturas medias de los hogares del Reino Unido subieron £1.800+ en un solo año.",
  s2b_p4_title: "¿Autónomo? No tienes tiempo para hacer trading",
  s2b_p4_body: "Gestionar tu propio negocio ya consume 60+ horas a la semana. Sentarse frente a gráficos mirando cómo se mueven las velas no es una opción. Sin embargo tu dinero sigue trabajando en tu contra.",
  s2b_p4_stat: "El 67% de los autónomos no tiene una estrategia de inversión activa.",
  s2b_p5_title: "Tu dinero en el banco pierde valor cada día",
  s2b_p5_body: "Los bancos no premian la fidelidad  premian tus depósitos pagándote casi nada. Mientras tanto prestan ese mismo dinero al 8–25% de interés. Les estás haciendo un favor.",
  s2b_p5_stat: "Los bancos de calle pagan de media el 0,1–1,5% de interés frente al 5%+ de inflación.",
  s2b_p6_title: "Las pensiones apenas cubren lo básico",
  s2b_p6_body: "Décadas de cotizaciones. Una vida de trabajo. Y una pensión que apenas cubre el alquiler, la comida y la calefacción. La jubilación que te prometieron no llega tan lejos como debería.",
  s2b_p6_stat: "Pensión media del Reino Unido: £13.000/año. Coste de vida medio: £17.000.",
  s2b_why_headline: "Lo que no te cuentan",
  s2b_why_text1: "Los ultra-ricos lo descubrieron hace décadas. No gestionan el dinero manualmente. Despliegan sistemas automatizados que trabajan para ellos 24 horas al día  estén durmiendo, de vacaciones o viviendo su vida.",
  s2b_why_text2: "Los algoritmos de Jim Simons funcionaban mientras dormía y lo hicieron millonario. La máquina de Ray Dalio nunca se toma un día libre. La diferencia es que esos sistemas no estaban disponibles para la gente común.",
  s2b_why_text3: "Hasta Trading Pilot.",
  s2b_solution_label: "La solución",
  s2b_tp_headline: "Conoce a Trading Pilot",
  s2b_tp_sub: "El primer motor de inteligencia de trading autónomo que fusiona señales técnicas en tiempo real con el sentimiento de noticias de Claude AI  ejecutando trades 24/7 con una disciplina que ningún ser humano puede mantener.",
  s2b_claude_title: "Motor de Sentimiento Claude AI",
  s2b_claude_body: "Antes de cada trade, Pilot consulta a Claude AI el sentimiento live de noticias sobre ese activo. ¿Un cruce perfecto con titulares negativos? Pilot espera. ¿Señal confirmada con sentimiento alcista? Pilot actúa con plena convicción.",
  s2b_fact1_heading: "Vigila el mercado por ti",
  s2b_fact1_detail: "Trading Pilot escanea cada tick de precio, cada minuto, en más de 20 instrumentos  24/7 sin dudas y con ejecución de señales en sub-milisegundos. El mercado nunca duerme, y tampoco Pilot.",
  s2b_fact2_heading: "Cuatro estrategias probadas en batalla, no suposiciones",
  s2b_fact2_detail: "MA Crossover (61% win rate), RSI Reversal (58%), MACD Momentum (63%), Pure Momentum (55%). Cada una diseñada para una condición de mercado diferente. Eliges una  o corres varios pilots simultáneamente en diferentes activos.",
  s2b_fact3_heading: "Seis capas de protección de riesgo de grado institucional",
  s2b_fact3_detail: "Stop-loss fijo en cada trade. Bloqueo del take-profit. Disyuntor de pérdida diaria máxima. Límite de trades diarios máximos. Filtrado de barra de confirmación. Monitorización en tiempo real de la curva de equity. Tu capital siempre está protegido.",
  s2b_advocates_label: "Quién lleva décadas haciéndolo",
  s2b_adv_disclaimer: "Estas personas no están afiliadas ni respaldan a Trading Pilot. Su uso documentado públicamente de sistemas de trading algorítmico y basado en reglas demuestra el poder de la automatización.",
  s2b_adv1_title: "Leyenda del trading cuantitativo de Renaissance Technologies",
  s2b_adv1_quote: "El Fondo Medallion, gestionado íntegramente por algoritmos matemáticos, promedió un 66% de rentabilidad anual durante 30 años  el mayor historial de inversión de la historia.",
  s2b_adv1_tag: "66% de rentabilidad anual · Puramente algorítmico",
  s2b_adv2_title: "Bridgewater Associates, el mayor hedge fund del mundo",
  s2b_adv2_quote: "Dalio construyó Bridgewater sobre un sistema que llama 'La Máquina'  un conjunto de algoritmos y principios que eliminan las emociones humanas de cada decisión de inversión.",
  s2b_adv2_tag: "$160B AUM · El algoritmo primero",
  s2b_adv3_title: "Berkshire Hathaway, el inversor más famoso del mundo",
  s2b_adv3_quote: "\"La bolsa es un mecanismo para transferir dinero de los impacientes a los pacientes.\" Los sistemas imponen la paciencia. Los humanos casi nunca pueden.",
  s2b_adv3_tag: "Disciplina sobre las emociones · Pensamiento basado en reglas",
  s2b_adv4_title: "Tudor Investment Corp, leyenda del trading macro",
  s2b_adv4_quote: "Jones fue pionero de estrategias sistemáticas informatizadas en la década de 1980 y siempre ha abogado por una ejecución de operaciones basada en reglas y libre de emociones.",
  s2b_adv4_tag: "Estrategias sistemáticas desde los años 80",
  s2b_cta_box_p1: "Ahora te mostraremos exactamente cómo habría actuado Trading Pilot en el mercado de la semana pasada.",
  s2b_cta_box_p2: "Lógica de estrategia real. Datos de gráfico reales. Sentimiento Claude AI en vivo.",
  s2b_cta: "Muéstrame cómo funciona →",
  s2b_cta_sub: "Acceso gratuito · Sin tarjeta de crédito · 60 segundos para configurar",

  s2c_badge: "Simulación en Vivo · Claude AI Activo",
  s2c_headline: "Ve a Trading Pilot Pensar en Tiempo Real",
  s2c_subtext: "Elige una estrategia. Ve cómo el bot detecta una señal, comprueba el sentimiento de noticias en vivo a través de Claude AI, luego dispara o suprime el trade  automáticamente.",
  s2c_win_rate: "{n}% win rate",
  s2c_how_works: "Cómo funciona {name}",
  s2c_risk_label: "Controles de riesgo integrados  cada estrategia",
  s2c_sl_title: "Stop-Loss", s2c_sl_desc: "Stop fijo en cada trade",
  s2c_tp_title: "Take-Profit", s2c_tp_desc: "Salida automática en tu objetivo",
  s2c_dl_title: "Cap pérdida diaria", s2c_dl_desc: "El bot se para si se alcanza el límite",
  s2c_mt_title: "Máx. trades diarios", s2c_mt_desc: "Sin overtrading en el ruido",
  s2c_running: "Simulación en curso…",
  s2c_replay: "↺ Ejecutar simulación de nuevo",
  s2c_cta: "Quiero que TradePilot trabaje para mí →",
  s2c_cta_sub: "Acceso gratuito · 60 segundos · Sin tarjeta de crédito",
  s2c_scanning: "ESCANEANDO",
  s2c_complete: "COMPLETADO",
  s2c_idle: "EN ESPERA",
  s2c_buy_signal: "Señal COMPRA",
  s2c_sell_signal: "Señal VENTA",

  s2d_badge: "Ver trading en vivo",
  s2d_headline: "Cuenta de $250. Bot operando EUR/USD. Completamente automatizado.",
  s2d_subtext: "Mira a TradePilot detectar oportunidades y realizar trades en tiempo real mientras tú no haces absolutamente nada.",
  s2d_balance_label: "Saldo de la Cuenta",
  s2d_status_initial: "TradePilot está monitorizando el mercado...",
  s2d_status_scanning: "Escaneando cada tick de precio. Buscando el momento adecuado...",
  s2d_status_pattern: "Patrón detectado. La línea rápida cruzando la línea lenta...",
  s2d_status_trade1: "Trade #1 abierto  el bot está en el mercado ahora.",
  s2d_status_tp1: "¡Trade #1 cerrado con beneficio!",
  s2d_status_trade2: "Segunda configuración detectada  el bot vuelve a entrar al mercado.",
  s2d_status_tp2: "¡Segundo trade cerrado con beneficio!",
  s2d_status_done: "Sesión completada. 2 trades. 2 victorias. Cero esfuerzo de tu parte.",
  s2d_trade_open: "TRADE ABIERTO",
  s2d_scanning: "ESCANEANDO",
  s2d_complete: "COMPLETADO",
  s2d_standby: "EN ESPERA",
  s2d_milestone_activated: "Bot activado  vigilando el mercado",
  s2d_milestone_activated_sub: "Escaneando cada tick en busca de una señal...",
  s2d_milestone_trade1: "Trade #1 abierto",
  s2d_milestone_trade1_sub: "El bot entró en el momento correcto.",
  s2d_milestone_tp1: "+${amount} beneficio asegurado",
  s2d_milestone_tp1_sub: "Primer trade cerrado en positivo.",
  s2d_milestone_trade2: "Segundo trade abierto",
  s2d_milestone_trade2_sub: "El bot detectó otra oportunidad.",
  s2d_milestone_tp2_sub: "Ambos trades cerrados en positivo.",
  s2d_watch_step1_title: "El bot vigila",
  s2d_watch_step1_desc: "Cada movimiento de precio, 24/7",
  s2d_watch_step2_title: "Detecta oportunidad",
  s2d_watch_step2_desc: "Detecta el momento correcto automáticamente",
  s2d_watch_step3_title: "Asegura el beneficio",
  s2d_watch_step3_desc: "Cierra el trade a tu precio objetivo",
  s2d_sim_complete_label: "Simulación completada",
  s2d_started_with: "Empezado con",
  s2d_ended_with: "Terminado con",
  s2d_trade1_label: "Trade 1: EUR/USD",
  s2d_trade2_label: "Trade 2: EUR/USD",
  s2d_result_box: "No hiciste nada. El bot monitorizó el gráfico, detectó dos oportunidades, abrió ambos trades y los cerró con beneficio. Eso es lo que TradePilot hace por ti cada día.",
  s2d_start_btn: "▶  Ver trading en vivo",
  s2d_running_note: "Simulación en curso  mira el gráfico de arriba...",
  s2d_cta: "Quiero esto funcionando en mi cuenta →",
  s2d_watch_again: "↺ Ver de nuevo",
  s1_adv1: "Trabajo manual mínimo",
  s1_adv2: "Sin experiencia necesaria",
  s1_adv3: "Retira en 24–48h",
  s5_direct_note: "Estás accediendo a través de un enlace de registro directo  esto evita la lista de espera pública y reserva tu lugar inmediatamente. Una vez que abandones esta página, este lugar no puede garantizarse.",
  s2d_withdrawal_title: "Retiros recientes en tu región",
  s2d_withdrawal_verified: "verificado · cuentas reales",
};

// ── Export ────────────────────────────────────────────────────────────────────
export const locales: Record<Locale, T> = { en, it, de, fr, es };



