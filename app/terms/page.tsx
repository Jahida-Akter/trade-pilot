export const dynamic = "force-static";

export default function TermsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111827", fontFamily: "'Segoe UI', system-ui, Arial, sans-serif", lineHeight: 1.7 }}>

      <header style={{ borderBottom: "1px solid #e5e7eb", padding: "14px 32px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <a href="/" style={{ fontSize: 18, fontWeight: 700, color: "#111827", textDecoration: "none" }}>Trade Pilot</a>
          <nav style={{ display: "flex", gap: 20, fontSize: 13 }}>
            <a href="/terms"   style={{ color: "#111827", fontWeight: 600, textDecoration: "none" }}>Terms of Service</a>
            <a href="/privacy" style={{ color: "#6b7280", textDecoration: "none" }}>Privacy Policy</a>
          </nav>
        </div>
      </header>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "52px 32px 64px" }}>

        <h1 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 800, color: "#111827", marginBottom: 4, marginTop: 0 }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 40 }}>
          Effective Date: April 1, 2026 &nbsp;&middot;&nbsp; Last updated: April 1, 2026
        </p>

        <p style={{ fontSize: 14, color: "#4b5563", marginBottom: 36, lineHeight: 1.85 }}>
          Welcome to Trade Pilot (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing or using our platform, you agree
          to be bound by these Terms of Service. Please read them carefully. If you do not agree, do not
          use our platform.
        </p>

        {/* 1 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            1. Nature of the Service
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 12px", lineHeight: 1.8 }}>
            Trade Pilot provides:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 12, lineHeight: 2 }}>
            <li>Educational content about financial markets</li>
            <li>Market insights and general informational tools</li>
            <li>Technology that may connect users with regulated third-party service providers</li>
          </ul>
          <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderLeft: "4px solid #f59e0b", borderRadius: 6, padding: "12px 18px", fontSize: 13, color: "#78350f", lineHeight: 1.7 }}>
            <strong>Important:</strong> Trade Pilot does <strong>not</strong> provide financial, investment,
            or trading advice. All content is for informational and educational purposes only.
          </div>
        </section>

        {/* 2 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            2. No Guarantees
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 8px", lineHeight: 1.8 }}>
            We do not guarantee:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 12, lineHeight: 2 }}>
            <li>Profits or investment returns of any kind</li>
            <li>Specific trading outcomes</li>
            <li>The accuracy, completeness, or timeliness of any information presented</li>
          </ul>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 8px", lineHeight: 1.8 }}>
            Any examples, scenarios, or simulations shown on the platform are:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 0, lineHeight: 2 }}>
            <li>Illustrative only and not predictive of real results</li>
            <li>Not a guarantee of future performance</li>
            <li>Not representative of the typical user experience</li>
          </ul>
        </section>

        {/* 3 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            3. User Responsibility
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 8px", lineHeight: 1.8 }}>
            By using this platform, you acknowledge and agree that:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 0, lineHeight: 2 }}>
            <li>You are solely responsible for your own financial decisions</li>
            <li>You understand that financial markets carry significant risk</li>
            <li>You will not rely solely on this platform when making financial decisions</li>
            <li>You will seek independent professional advice where appropriate</li>
          </ul>
        </section>

        {/* 4 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            4. Eligibility
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 8px", lineHeight: 1.8 }}>
            To use this service, you must:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 12, lineHeight: 2 }}>
            <li>Be at least 18 years of age</li>
            <li>Have the legal capacity to enter into binding agreements in your jurisdiction</li>
            <li>Not be located in a jurisdiction where use of this service is prohibited by law</li>
          </ul>
          <p style={{ fontSize: 14, color: "#4b5563", margin: 0, lineHeight: 1.8 }}>
            By using this platform, you represent and warrant that you meet these requirements.
          </p>
        </section>

        {/* 5 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            5. Account &amp; Information
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 8px", lineHeight: 1.8 }}>
            If you provide personal information through this platform, you agree that:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 0, lineHeight: 2 }}>
            <li>All information you submit must be accurate, current, and truthful</li>
            <li>You are responsible for the confidentiality of any credentials or access you receive</li>
            <li>You agree not to misuse or attempt to exploit the platform</li>
            <li>Providing false or misleading information may result in immediate termination of access</li>
          </ul>
        </section>

        {/* 6 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            6. Acceptable Use
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 8px", lineHeight: 1.8 }}>
            You agree <strong>not</strong> to:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 0, lineHeight: 2 }}>
            <li>Use the platform for any unlawful purpose or in violation of applicable laws</li>
            <li>Attempt to hack, disrupt, reverse-engineer, or otherwise interfere with the platform</li>
            <li>Submit false, misleading, or fraudulent information</li>
            <li>Use automated tools, bots, or scrapers to access the platform</li>
            <li>Infringe upon the intellectual property rights of Trade Pilot or any third party</li>
          </ul>
        </section>

        {/* 7 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            7. Third-Party Services
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 12px", lineHeight: 1.8 }}>
            Trade Pilot may connect users with regulated third-party service providers, including financial
            platforms and brokers. Where this occurs:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 12, lineHeight: 2 }}>
            <li>We do not control third-party services and are not responsible for their actions, decisions, or outcomes</li>
            <li>Your relationship with any third-party provider is governed by that provider&apos;s own terms and conditions</li>
            <li>We recommend you review the terms and regulatory status of any provider before engaging with them</li>
          </ul>
          <p style={{ fontSize: 14, color: "#4b5563", margin: 0, lineHeight: 1.8 }}>
            Any links to external websites are provided for convenience only and do not constitute an
            endorsement of those sites or their content.
          </p>
        </section>

        {/* 8 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            8. Limitation of Liability
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 12px", lineHeight: 1.8 }}>
            To the maximum extent permitted by applicable law, Trade Pilot and its operators, directors,
            employees, and affiliates shall not be liable for:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 12, lineHeight: 2 }}>
            <li>Any financial or trading losses you may incur</li>
            <li>Any indirect, incidental, special, or consequential damages</li>
            <li>Loss of data, revenue, or business opportunity</li>
            <li>Actions or omissions of any third-party service provider</li>
          </ul>
          <p style={{ fontSize: 14, color: "#4b5563", margin: 0, lineHeight: 1.8 }}>
            Your use of this platform is entirely at your own risk.
          </p>
        </section>

        {/* 9 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            9. No Professional Advice
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 12px", lineHeight: 1.8 }}>
            Nothing on this platform constitutes:
          </p>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 22, marginBottom: 12, lineHeight: 2 }}>
            <li>Financial or investment advice</li>
            <li>Legal or tax advice</li>
            <li>A personal recommendation to buy or sell any financial instrument</li>
          </ul>
          <p style={{ fontSize: 14, color: "#4b5563", margin: 0, lineHeight: 1.8 }}>
            You should always consult a qualified, independently regulated professional before making any
            financial, legal, or tax decisions.
          </p>
        </section>

        {/* 10 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            10. Intellectual Property
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: 0, lineHeight: 1.8 }}>
            All content, design, text, graphics, and technology on this platform are the property of
            Trade Pilot or its licensors and are protected by applicable copyright and intellectual property
            laws. You may not reproduce, copy, distribute, or create derivative works from any part of
            this platform without our prior written consent.
          </p>
        </section>

        {/* 11 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            11. Changes to the Service
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: 0, lineHeight: 1.8 }}>
            We reserve the right to modify, suspend, or discontinue any part of the platform at any time
            without notice. We may also update these Terms of Service at any time. The &quot;Last updated&quot;
            date at the top of this page reflects the most recent revision. Continued use of the platform
            after changes are posted constitutes your acceptance of the updated Terms.
          </p>
        </section>

        {/* 12 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            12. Termination
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: 0, lineHeight: 1.8 }}>
            We may suspend or terminate your access to the platform immediately and without prior notice if
            we determine, in our sole discretion, that you have violated these Terms, engaged in fraudulent
            or abusive behaviour, or if required to do so by applicable law or a regulatory authority.
          </p>
        </section>

        {/* 13 */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            13. Governing Law
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: 0, lineHeight: 1.8 }}>
            These Terms of Service shall be governed by and construed in accordance with applicable
            international laws and regulations. If any provision of these Terms is found to be invalid or
            unenforceable, the remaining provisions shall continue in full force and effect.
          </p>
        </section>

        {/* 14 */}
        <section style={{ marginBottom: 0 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14, marginTop: 0, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
            14. Contact Us
          </h2>
          <p style={{ fontSize: 14, color: "#4b5563", margin: "0 0 12px", lineHeight: 1.8 }}>
            If you have any questions about these Terms of Service, please contact us:
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
            <a href="/terms"   style={{ color: "#9ca3af", textDecoration: "none" }}>Terms of Service</a>
            <a href="/privacy" style={{ color: "#9ca3af", textDecoration: "none" }}>Privacy Policy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}