export const dynamic = "force-static";

export default function DisclaimerPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111827", fontFamily: "'Segoe UI', system-ui, Arial, sans-serif", lineHeight: 1.7 }}>

      <header style={{ borderBottom: "1px solid #e5e7eb", padding: "14px 32px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <a href="/" style={{ fontSize: 18, fontWeight: 700, color: "#111827", textDecoration: "none" }}>Trade Pilot</a>
          <nav style={{ display: "flex", gap: 20, fontSize: 13 }}>
            <a href="/terms"      style={{ color: "#6b7280", textDecoration: "none" }}>Terms of Service</a>
            <a href="/privacy"    style={{ color: "#6b7280", textDecoration: "none" }}>Privacy Policy</a>
            <a href="/disclaimer" style={{ color: "#111827", fontWeight: 600, textDecoration: "none" }}>Disclaimer</a>
          </nav>
        </div>
      </header>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "52px 32px 64px" }}>

        <h1 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 800, color: "#111827", marginBottom: 4, marginTop: 0 }}>
          Disclaimer
        </h1>
        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 40 }}>
          Effective Date: April 1, 2026 &nbsp;&middot;&nbsp; Last updated: April 1, 2026
        </p>

        <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderLeft: "4px solid #f59e0b", borderRadius: 6, padding: "14px 20px", fontSize: 13, color: "#78350f", lineHeight: 1.75, marginBottom: 40 }}>
          <strong>Important Notice:</strong> Trade Pilot provides informational and educational content only.
          Nothing on this platform constitutes financial, investment, or trading advice. By continuing to
          use this platform, you acknowledge and accept the terms of this Disclaimer in full.
        </div>

        {/* 1 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            1. General Information
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 12px", lineHeight: 1.8 }}>
            Trade Pilot provides informational and educational content only. The content available on this platform:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 0, lineHeight: 2 }}>
            <li>Does <strong>not</strong> constitute financial advice</li>
            <li>Does <strong>not</strong> constitute investment advice</li>
            <li>Should <strong>not</strong> be interpreted as a recommendation to trade or invest in any financial instrument</li>
            <li>Is provided for general informational purposes only and may not be suitable for your personal circumstances</li>
          </ul>
        </section>

        {/* 2 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            2. No Financial Advice
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 12px", lineHeight: 1.8 }}>
            Trade Pilot is <strong>not</strong> a broker, financial advisor, portfolio manager, or investment
            firm, and is not regulated as such. We do not:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 12, lineHeight: 2 }}>
            <li>Manage, hold, or safeguard client funds</li>
            <li>Execute trades or investment transactions on your behalf</li>
            <li>Provide personalised investment recommendations</li>
            <li>Act as an intermediary for any regulated financial service</li>
          </ul>
          <p style={{ fontSize: 14, color: "#4b5563", margin: 0, lineHeight: 1.8 }}>
            Any decisions you make based on information sourced from this platform are made entirely at
            your own discretion and risk.
          </p>
        </section>

        {/* 3 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            3. Risk Warning
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 12px", lineHeight: 1.8 }}>
            Trading financial markets involves significant risk of loss. You should be aware that:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 12, lineHeight: 2 }}>
            <li>You may lose part or all of the capital you invest</li>
            <li>Financial losses can occur rapidly and without warning</li>
            <li>Past market performance is not a reliable indicator of future results</li>
          </ul>
          <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderLeft: "4px solid #ef4444", borderRadius: 6, padding: "12px 18px", fontSize: 13, color: "#7f1d1d", lineHeight: 1.7 }}>
            <strong>You should only engage with financial markets using capital you can afford to lose entirely.</strong>{" "}
            If you are uncertain about the suitability of any financial activity for your situation, seek
            independent advice from a qualified professional.
          </div>
        </section>

        {/* 4 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            4. No Guarantees
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 12px", lineHeight: 1.8 }}>
            Trade Pilot makes no guarantees whatsoever regarding:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 12, lineHeight: 2 }}>
            <li>Profitability or positive financial outcomes</li>
            <li>The performance of any financial market, instrument, or strategy</li>
            <li>The completeness, accuracy, or timeliness of any information presented</li>
          </ul>
          <p style={{ fontSize: 14, color: "#4b5563", margin: 0, lineHeight: 1.8 }}>
            Any past performance figures, hypothetical scenarios, or simulated results shown on this
            platform are presented for illustrative purposes only and are <strong>not</strong> indicators
            of future results.
          </p>
        </section>

        {/* 5 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            5. Third-Party Services
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 12px", lineHeight: 1.8 }}>
            Trade Pilot may connect users with independent third-party platforms, brokers, or service
            providers. With respect to those third parties, we:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 12, lineHeight: 2 }}>
            <li>Do <strong>not</strong> own, operate, or control these services</li>
            <li>Do <strong>not</strong> guarantee their performance, reliability, or regulatory compliance</li>
            <li>Are <strong>not</strong> responsible for their actions, decisions, or the outcomes of using them</li>
            <li>Do <strong>not</strong> receive compensation that creates a conflict of interest in our content</li>
          </ul>
          <p style={{ fontSize: 14, color: "#4b5563", margin: 0, lineHeight: 1.8 }}>
            You are solely responsible for reviewing the terms, conditions, and regulatory status of any
            third-party service before engaging with it.
          </p>
        </section>

        {/* 6 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            6. Educational Simulations
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 12px", lineHeight: 1.8 }}>
            This platform may display examples, simulations, demonstrations, or hypothetical scenarios.
            These are:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 0, lineHeight: 2 }}>
            <li>Provided for educational and illustrative purposes only</li>
            <li>Not reflective of real trading conditions, fees, or market dynamics</li>
            <li>Potentially significantly different from live market results</li>
            <li>Not a guarantee or representation of what you could achieve</li>
          </ul>
        </section>

        {/* 7 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            7. Limitation of Liability
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 12px", lineHeight: 1.8 }}>
            To the fullest extent permitted by applicable law, Trade Pilot, its operators, directors,
            employees, and affiliates shall <strong>not</strong> be liable for:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 12, lineHeight: 2 }}>
            <li>Any financial or trading losses you may incur</li>
            <li>Missed market opportunities or foregone profits</li>
            <li>Decisions or actions taken based on content from this platform</li>
            <li>Any indirect, incidental, special, or consequential damages of any kind</li>
            <li>Losses arising from your use of, or inability to use, this platform</li>
          </ul>
          <p style={{ fontSize: 14, color: "#4b5563", margin: 0, lineHeight: 1.8 }}>
            Your use of this platform is entirely at your own risk.
          </p>
        </section>

        {/* 8 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            8. User Responsibility
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 12px", lineHeight: 1.8 }}>
            By accessing and using this platform, you acknowledge and agree that:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 0, lineHeight: 2 }}>
            <li>You understand the risks associated with financial markets</li>
            <li>You are acting independently and of your own free will</li>
            <li>You have not relied on this platform as the sole basis for any financial decision</li>
            <li>You will seek independent professional advice where appropriate before making any financial commitment</li>
          </ul>
        </section>

        {/* 9 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            9. Regulatory Notice
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: 0, lineHeight: 1.8 }}>
            Trade Pilot does not provide regulated financial services. We are not authorised or regulated
            by any financial regulatory authority including, but not limited to, the FCA (UK), ESMA (EU),
            SEC (US), or ASIC (AU). This platform operates solely as an informational and educational
            resource. If you require regulated financial services, you should engage directly with a
            licensed and regulated firm in your jurisdiction.
          </p>
        </section>

        {/* 10 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            10. Changes to This Disclaimer
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: 0, lineHeight: 1.8 }}>
            We reserve the right to update or modify this Disclaimer at any time without prior notice.
            Any changes will be reflected by the &quot;Last updated&quot; date at the top of this page.
            Continued use of the platform following any changes constitutes your acceptance of the
            revised Disclaimer.
          </p>
        </section>

        {/* 11 */}
        <section style={{ marginBottom: 0 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            11. Contact Us
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 12px", lineHeight: 1.8 }}>
            If you have any questions about this Disclaimer, please contact us:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 0, lineHeight: 2 }}>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@tradepilot.com" style={{ color: "#059669" }}>
                info@tradepilot.com
              </a>
            </li>
          </ul>
        </section>

      </div>

      <footer style={{ borderTop: "1px solid #e5e7eb", padding: "20px 32px" }}>
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            fontSize: 12,
            color: "#9ca3af",
          }}
        >
          <span>&copy; {new Date().getFullYear()} Trade Pilot. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="/terms"      style={{ color: "#9ca3af", textDecoration: "none" }}>Terms of Service</a>
            <a href="/privacy"    style={{ color: "#9ca3af", textDecoration: "none" }}>Privacy Policy</a>
            <a href="/disclaimer" style={{ color: "#9ca3af", textDecoration: "none" }}>Disclaimer</a>
          </div>
        </div>
      </footer>
    </main>
  );
}