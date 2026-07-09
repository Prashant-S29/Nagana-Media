export type PolicyBlock =
  | { type: "paragraph"; text: string }
  | { type: "table"; rows: string[][] };

export interface PolicyDocument {
  slug: string;
  title: string;
  sourceFile: string;
  description: string;
  blocks: PolicyBlock[];
}

export const policies = [
  {
    slug: "privacy-compliance-audit",
    title: "Privacy Compliance Audit",
    sourceFile: "policies/Nagana_Media_Compliance_Audit09072026.docx",
    description:
      "Nagana Media currently operates naganamedia.com and processes personal data of website visitors, prospects, and B2B clients across India, the EU, and the United States, but has no published privacy policy, cookie consent",
    blocks: [
      {
        type: "paragraph",
        text: "GDPR (EU) · DPDP Act (India) · US State Privacy Laws (CCPA/CPRA and peers)",
      },
      {
        type: "paragraph",
        text: "Prepared for Naganarai Media Tech Pvt. Ltd. (Nagana Media) — July 2026",
      },
      {
        type: "paragraph",
        text: "1. Executive Summary",
      },
      {
        type: "paragraph",
        text: "Nagana Media currently operates naganamedia.com and processes personal data of website visitors, prospects, and B2B clients across India, the EU, and the United States, but has no published privacy policy, cookie consent mechanism, terms of service, or grievance/contact-handling process. This creates simultaneous exposure under three regimes at once: the EU General Data Protection Regulation (GDPR), India's Digital Personal Data Protection Act 2023 (DPDP Act) together with its 2025 Rules, and the patchwork of US state privacy laws led by California's CCPA/CPRA.",
      },
      {
        type: "paragraph",
        text: "The good news: because Nagana Media is an early-stage agency without large-scale data processing, the fix is primarily documentation, consent tooling, and process discipline rather than deep re-engineering. This audit identifies the gaps, explains why each regime applies, and lays out a prioritized remediation roadmap. The companion documents (Privacy Policy, Terms of Service, Cookie Policy, and a Data Processing Agreement template) operationalize the fixes.",
      },
      {
        type: "paragraph",
        text: "This audit and the accompanying documents are prepared to a high operational standard but do not constitute legal advice. DPDP Rules were only finalized in 2025 and enforcement guidance is still developing; California and other US state laws change most legislative sessions. Have an India-qualified counsel review the Privacy Policy and Grievance Officer designation, and consider a one-time review by US/EU counsel before heavy EU/US sales activity, especially once you sign your first EU enterprise client (e.g., Spherity).",
      },
      {
        type: "paragraph",
        text: "2. Why All Three Regimes Apply Simultaneously",
      },
      {
        type: "paragraph",
        text: "2.1 GDPR — extraterritorial reach",
      },
      {
        type: "paragraph",
        text: "GDPR applies not because Nagana Media has an EU office, but under Article 3(2): it applies to any organization, anywhere, that offers goods or services to individuals in the EU, or monitors their behavior (e.g., via analytics cookies on the website). Marketing content, audits, and consulting services pitched to EU-based contacts (Spherity in Germany is the clearest example already in your pipeline) trigger this.",
      },
      {
        type: "paragraph",
        text: "2.2 DPDP Act — home jurisdiction",
      },
      {
        type: "paragraph",
        text: "The DPDP Act applies to processing of digital personal data within India, and also to processing outside India if it relates to offering goods or services to persons in India. As an Indian-incorporated company (Naganarai Media Tech Pvt. Ltd., Jaipur), Nagana Media is squarely a Data Fiduciary under this law for any personal data it collects from Indian residents (employees, Indian vendors, Indian site visitors) and is expected to demonstrate compliance regardless of company size — there is no small-business carve-out for the core obligations, only for a narrower set of exemptions the government may notify for specific categories.",
      },
      {
        type: "paragraph",
        text: "2.3 US state laws — client-side exposure",
      },
      {
        type: "paragraph",
        text: "CCPA/CPRA and sibling state laws (Virginia's VCDPA, Colorado's CPA, Connecticut's CTDPA, Utah's UCPA, and newer ones like Texas TDPSA and Oregon OCPA) apply based on thresholds tied to revenue or volume of consumer data processed (commonly $25M+ annual revenue, or processing 50,000–100,000+ consumers'/devices' data annually, or deriving 50%+ revenue from selling personal data). Nagana Media, as a small agency, likely falls below every one of these thresholds today. However, two things matter here: first, thresholds change as you grow and as you close larger US clients; second, and more immediately, US enterprise buyers (the ones you are targeting, per your own positioning against Microsoft/IBM-caliber vendors) now expect CCPA-equivalent controls as a baseline vendor trust signal even when not legally mandated. Building to that standard now removes a future gap and shortens security/legal review cycles in enterprise sales.",
      },
      {
        type: "paragraph",
        text: "3. Applicability Matrix",
      },
      {
        type: "table",
        rows: [
          ["Trigger", "GDPR", "DPDP Act", "US State Laws"],
          [
            "Legal basis for applying to Nagana Media today",
            "Art. 3(2) — targeting/monitoring EU individuals via website + EU prospects",
            "Territorial + nationality — Indian entity processing Indian & any digital personal data",
            "Not yet at statutory thresholds; adopting voluntarily for enterprise credibility",
          ],
          [
            "Consent standard",
            "Opt-in, granular, freely given, withdrawable",
            "Free, specific, informed, unambiguous; Consent Manager for scaled processing",
            "Opt-out model (right to opt out of sale/share/targeted ads), plus opt-in for sensitive data & minors",
          ],
          [
            "Core individual rights",
            "Access, rectification, erasure, portability, restriction, objection",
            "Access, correction, erasure, grievance redressal, nomination (post-death)",
            "Know, delete, correct, opt-out, non-discrimination, portability",
          ],
          [
            "Mandatory role/contact",
            "Data Protection Officer (only if core activities require large-scale monitoring — not yet triggered for you)",
            "Grievance Officer — mandatory, name + contact must be published",
            "No mandated role at current scale; publish a privacy contact regardless",
          ],
          [
            "Breach notification",
            "Supervisory authority within 72 hours where feasible; affected individuals if high risk",
            "Data Protection Board of India + affected Data Principals, per Rules",
            "Varies by state; typically 'without unreasonable delay' to affected residents and AG",
          ],
          [
            "Cross-border transfer mechanism",
            "Standard Contractual Clauses / adequacy for transfers out of EEA",
            "Permitted by default except to government-blacklisted countries (none notified as of writing)",
            "No transfer restriction regime; contractual flow-down via DPA still best practice",
          ],
        ],
      },
      {
        type: "paragraph",
        text: "4. Current-State Findings (Gaps)",
      },
      {
        type: "paragraph",
        text: "Confirmed via site review. All of the following are currently absent from naganamedia.com:",
      },
      {
        type: "paragraph",
        text: "No Privacy Policy page or link anywhere on the site.",
      },
      {
        type: "paragraph",
        text: "No Cookie Policy, and no cookie consent banner — despite the site setting analytics/tracking cookies on load, which is a live violation under both GDPR (ePrivacy) and CPRA (no opt-out mechanism for tracking).",
      },
      {
        type: "paragraph",
        text: "No Terms of Service governing use of the site or the boundaries of service engagements.",
      },
      {
        type: "paragraph",
        text: "No footer legal links (Privacy / Terms / Cookies) — the baseline trust signal enterprise buyers scan for in seconds.",
      },
      {
        type: "paragraph",
        text: "No disclosure language on the contact/lead form about what happens to submitted data, retention, or right to withdraw.",
      },
      {
        type: "paragraph",
        text: "No named Grievance Officer or privacy contact — a hard DPDP requirement, not just best practice.",
      },
      {
        type: "paragraph",
        text: "No Record of Processing Activities (ROPA) — an internal document, not published, but expected under GDPR accountability principles and useful for your own operational clarity as you scale Hivig alongside Nagana Media.",
      },
      {
        type: "paragraph",
        text: "No Data Processing Agreement (DPA) template for clients or subprocessors (e.g., whatever email, CRM, or analytics tools you use) — needed both to flow down obligations to your vendors and to hand to enterprise clients who will ask for one during procurement/security review.",
      },
      {
        type: "paragraph",
        text: "No documented data retention schedule (how long lead-form submissions, contracts, or analytics data are kept).",
      },
      {
        type: "paragraph",
        text: "No process for handling a data subject/data principal access or deletion request if one arrives.",
      },
      {
        type: "paragraph",
        text: "5. Remediation Roadmap",
      },
      {
        type: "paragraph",
        text: "Tier 1 — Immediate (this week, blocking for any EU/US outreach)",
      },
      {
        type: "paragraph",
        text: "Publish Privacy Policy, Terms of Service, and Cookie Policy pages (drafts provided as companion documents).",
      },
      {
        type: "paragraph",
        text: "Add footer links to all three on every page (Prashant).",
      },
      {
        type: "paragraph",
        text: "Install a cookie consent banner (CookieYes, as already planned) configured for opt-in in EU/UK traffic and opt-out/GPC recognition for California traffic — most consent tools support geo-aware modes; verify this in CookieYes's plan tier.",
      },
      {
        type: "paragraph",
        text: "Add a one-line data-use disclosure + checkbox on the contact/lead form, linking to the Privacy Policy.",
      },
      {
        type: "paragraph",
        text: "Designate a named Grievance Officer (can be you, Abhijeet, initially) with a published email and response-time commitment — DPDP requires this to be identifiable, not just 'contact us'.",
      },
      {
        type: "paragraph",
        text: "Tier 2 — 30 days",
      },
      {
        type: "paragraph",
        text: "Stand up a lightweight ROPA: one internal spreadsheet listing what personal data you collect (site visitors, leads, clients, employees), why, where it's stored, who has access, and how long it's kept.",
      },
      {
        type: "paragraph",
        text: "Draft and adopt a Data Processing Agreement template to send to any subprocessor (hosting, email, CRM, analytics) and to offer clients who request one during vendor security review.",
      },
      {
        type: "paragraph",
        text: "Confirm which of your tools (analytics, email, CRM, hosting) store data outside India/EU, and note the transfer basis for each in the ROPA — this is mostly a documentation exercise, not a re-platforming one.",
      },
      {
        type: "paragraph",
        text: "Write and internally circulate a one-page breach response checklist: who to notify, within what timeframe, under which law, based on whose data was affected.",
      },
      {
        type: "paragraph",
        text: "Tier 3 — 60–90 days",
      },
      {
        type: "paragraph",
        text: "If naganamedia.com or Hivig site traffic from California, Virginia, or Colorado grows meaningfully, add a 'Do Not Sell or Share My Personal Information' / Global Privacy Control (GPC) recognition mechanism, even ahead of hitting statutory thresholds — this is the single most visible trust signal to US enterprise security teams.",
      },
      {
        type: "paragraph",
        text: "Before finalizing any contract with an EU client like Spherity, confirm whether Nagana Media needs an EU Article 27 representative (required if you have no EU establishment but regularly offer services to EU data subjects at scale — for a single client relationship this is often not yet triggered, but revisit as EU client count grows).",
      },
      {
        type: "paragraph",
        text: "Set an annual review cadence for all three policies — tie it to your existing content calendar rhythm so it doesn't get lost.",
      },
      {
        type: "paragraph",
        text: "Once Hivig launches (target October 2026), replicate the same policy stack for the Hivig domain rather than assuming the Nagana Media policies cover it — they are legally distinct offerings even if commonly owned.",
      },
      {
        type: "paragraph",
        text: "6. What 'On Par with Microsoft/IBM' Actually Means at Your Scale",
      },
      {
        type: "paragraph",
        text: "Enterprise vendors like Microsoft and IBM signal trust through three things you can replicate cheaply: (1) policies that are specific rather than templated boilerplate — naming your actual data flows, not generic placeholder language; (2) a visible, responsive privacy contact rather than a black hole; and (3) a willingness to sign a DPA without friction when a client's procurement team asks. You do not need a dedicated privacy team or a trust-center microsite to hit this bar — you need the four documents in this package published, linked, and kept current, plus a habit of saying yes quickly when a client's security questionnaire lands in your inbox.",
      },
      {
        type: "paragraph",
        text: "7. Companion Documents",
      },
      {
        type: "paragraph",
        text: "The following are provided as separate Word documents, ready to adapt and publish:",
      },
      {
        type: "paragraph",
        text: "Privacy Policy — covers GDPR, DPDP, and CCPA/state disclosures in one document, organized so EU, Indian, and US visitors can each find their specific rights section.",
      },
      {
        type: "paragraph",
        text: "Terms of Service — governs website use and general service engagement terms.",
      },
      {
        type: "paragraph",
        text: "Cookie Policy — cookie categories, purposes, and consent mechanism description, meant to pair with the CookieYes banner.",
      },
      {
        type: "paragraph",
        text: "Data Processing Agreement (DPA) template — for use with your own subprocessors and to offer clients during procurement review.",
      },
      {
        type: "paragraph",
        text: "Every bracketed [placeholder] in these documents needs a real value before publishing — registered address, grievance officer name/email, and specific tool names (CRM, analytics, hosting) are the ones most likely to need your input.",
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    sourceFile: "policies/Nagana_Media_Cookie_Policy09072026.docx",
    description:
      "This Cookie Policy explains how naganamedia.com uses cookies and similar tracking technologies, and how you can control them. It should be read alongside our Privacy Policy.",
    blocks: [
      {
        type: "paragraph",
        text: "Nagana Media (Naganarai Media Tech Pvt. Ltd.)",
      },
      {
        type: "paragraph",
        text: "Effective Date: [August 16, 2023] · Last Updated: [July 09, 2026]",
      },
      {
        type: "paragraph",
        text: "This Cookie Policy explains how naganamedia.com uses cookies and similar tracking technologies, and how you can control them. It should be read alongside our Privacy Policy.",
      },
      {
        type: "paragraph",
        text: "1. What Are Cookies",
      },
      {
        type: "paragraph",
        text: "Cookies are small text files placed on your device when you visit a website. They allow the site to recognize your device and remember information about your visit, such as preferences and browsing activity.",
      },
      {
        type: "paragraph",
        text: "2. Categories of Cookies We Use",
      },
      {
        type: "table",
        rows: [
          ["Category", "Purpose", "Consent Required?"],
          [
            "Strictly Necessary",
            "Core site functionality, security, load balancing",
            "No — cannot be disabled, but disclosed",
          ],
          [
            "Analytics",
            "Understanding site traffic and content performance (e.g., pages visited, session duration)",
            "Yes, for EU/UK visitors; opt-out honored for California/US visitors",
          ],
          [
            "Functional",
            "Remembering preferences (e.g., form field values) to improve usability",
            "Yes, where non-essential",
          ],
          [
            "Marketing / Advertising",
            "Currently not used for third-party advertising or retargeting",
            "N/A — none deployed as of the effective date",
          ],
        ],
      },
      {
        type: "paragraph",
        text: "3. Consent Management",
      },
      {
        type: "paragraph",
        text: "On your first visit, a cookie consent banner lets you accept, reject, or customize non-essential cookies. Visitors identified as located in the EU or UK are shown an opt-in banner (no non-essential cookies are set until you consent). Visitors identified as located in the US are shown an opt-out mechanism, and we honor Global Privacy Control (GPC) browser signals as a valid opt-out where our consent management platform supports it. You can change your preferences at any time via the consent management link in the site footer.",
      },
      {
        type: "paragraph",
        text: "4. Third-Party Cookies",
      },
      {
        type: "paragraph",
        text: "Some cookies are set by third-party service providers we use for analytics or site functionality (for example, [ANALYTICS PROVIDER]). These providers may process data under their own privacy policies; we select providers that offer appropriate data protection commitments and, where required, execute data processing agreements with them.",
      },
      {
        type: "paragraph",
        text: "5. Managing Cookies in Your Browser",
      },
      {
        type: "paragraph",
        text: "In addition to our consent tool, most browsers let you block or delete cookies directly through browser settings. Blocking strictly necessary cookies may affect site functionality.",
      },
      {
        type: "paragraph",
        text: "6. Updates to This Policy",
      },
      {
        type: "paragraph",
        text: 'We may update this Cookie Policy as our use of cookies changes. Check the "Last Updated" date for the most recent version.',
      },
      {
        type: "paragraph",
        text: "7. Contact",
      },
      {
        type: "paragraph",
        text: "Questions about this Cookie Policy can be directed to contact@naganamedia.com.",
      },
    ],
  },
  {
    slug: "data-processing-agreement",
    title: "Data Processing Agreement",
    sourceFile: "policies/Nagana_Media_DPA_Template09072026.docx",
    description:
      "Use this in two directions: (1) send it to your own subprocessors — hosting, email, CRM, analytics vendors — for them to sign as Processor to your Controller; and (2) offer it to enterprise clients who ask Nagana Media t",
    blocks: [
      {
        type: "paragraph",
        text: "Template — for use between Nagana Media and clients or subprocessors",
      },
      {
        type: "paragraph",
        text: "Version [2.1] · [Date: July 09, 2026]",
      },
      {
        type: "paragraph",
        text: "Use this in two directions: (1) send it to your own subprocessors — hosting, email, CRM, analytics vendors — for them to sign as Processor to your Controller; and (2) offer it to enterprise clients who ask Nagana Media to sign as their Processor/Sub-processor during procurement or security review. Bracketed terms need to be filled per relationship.",
      },
      {
        type: "paragraph",
        text: "1. Parties and Scope",
      },
      {
        type: "paragraph",
        text: 'This Data Processing Agreement ("DPA") is entered into between [CLIENT/CONTROLLER NAME] ("Controller") and Naganarai Media Tech Pvt. Ltd., operating as Nagana Media ("Processor"), and supplements the underlying services agreement between the parties (the "Agreement"). This DPA applies to the extent Nagana Media processes personal data on behalf of the Controller in the course of providing services under the Agreement.',
      },
      {
        type: "paragraph",
        text: "2. Nature and Purpose of Processing",
      },
      {
        type: "paragraph",
        text: "Subject matter: [describe, e.g., content production, marketing analytics, campaign execution]",
      },
      {
        type: "paragraph",
        text: "Duration: for the term of the Agreement, plus any post-termination retention required by law.",
      },
      {
        type: "paragraph",
        text: "Nature and purpose: processing personal data solely to deliver the contracted services.",
      },
      {
        type: "paragraph",
        text: "Categories of data subjects: [e.g., Controller's employees, prospects, customers]",
      },
      {
        type: "paragraph",
        text: "Categories of personal data: [e.g., name, business email, job title, engagement history]",
      },
      {
        type: "paragraph",
        text: "3. Processor Obligations",
      },
      {
        type: "paragraph",
        text: "Process personal data only on documented instructions from the Controller, including regarding international transfers, unless required otherwise by law.",
      },
      {
        type: "paragraph",
        text: "Ensure personnel authorized to process personal data are bound by confidentiality obligations.",
      },
      {
        type: "paragraph",
        text: "Implement appropriate technical and organizational security measures proportionate to the risk.",
      },
      {
        type: "paragraph",
        text: "Assist the Controller in responding to data subject/data principal rights requests to the extent the Processor holds relevant data.",
      },
      {
        type: "paragraph",
        text: "Notify the Controller without undue delay after becoming aware of a personal data breach affecting the Controller's data, and provide reasonably available information to help the Controller meet its own notification obligations.",
      },
      {
        type: "paragraph",
        text: "Delete or return all personal data at the end of the engagement, at the Controller's choice, except where retention is required by law.",
      },
      {
        type: "paragraph",
        text: "Make available information reasonably necessary to demonstrate compliance with this DPA, and allow for reasonable audits or inspections on reasonable notice.",
      },
      {
        type: "paragraph",
        text: "4. Sub-processors",
      },
      {
        type: "paragraph",
        text: "The Controller authorizes Nagana Media to engage sub-processors (e.g., hosting, email delivery, analytics providers) to support service delivery, provided Nagana Media: (a) maintains a current list of sub-processors available on request, (b) imposes data protection obligations on each sub-processor materially equivalent to those in this DPA, and (c) remains responsible for each sub-processor's performance. Nagana Media will provide reasonable advance notice of any new sub-processor to allow the Controller to object on reasonable data protection grounds.",
      },
      {
        type: "paragraph",
        text: "5. International Transfers",
      },
      {
        type: "paragraph",
        text: "Where personal data is transferred from the EEA/UK to India or another country, the parties agree that such transfer is governed by the European Commission's Standard Contractual Clauses (Controller-to-Processor module), incorporated by reference, or another legally recognized transfer mechanism then in effect. For personal data subject to the DPDP Act, transfer is permitted in the ordinary course except to any country specifically restricted by the Government of India.",
      },
      {
        type: "paragraph",
        text: "6. Liability and Indemnity",
      },
      {
        type: "paragraph",
        text: "Liability under this DPA is subject to the limitation of liability provisions in the underlying Agreement, except where applicable law prohibits limiting liability for data protection violations.",
      },
      {
        type: "paragraph",
        text: "7. Term and Termination",
      },
      {
        type: "paragraph",
        text: "This DPA remains in effect for as long as Nagana Media processes personal data on behalf of the Controller under the Agreement, and survives termination of the Agreement to the extent necessary to govern deletion/return of data and any residual obligations.",
      },
      {
        type: "paragraph",
        text: "8. Signatures",
      },
      {
        type: "paragraph",
        text: "Controller: _______________________     Date: ___________",
      },
      {
        type: "paragraph",
        text: "Processor (Naganarai Media Tech Pvt. Ltd.): _______________________     Date: ___________",
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    sourceFile: "policies/Nagana_Media_Privacy_Policy09072026.docx",
    description:
      'Naganarai Media Tech Pvt. Ltd., operating as Nagana Media ("Nagana Media," "we," "us," or "our"), is committed to protecting the privacy of everyone who visits our website, contacts us, or engages our services. This Priv',
    blocks: [
      {
        type: "paragraph",
        text: "Nagana Media (Naganarai Media Tech Pvt. Ltd.)",
      },
      {
        type: "paragraph",
        text: "Effective Date: [August 16, 2023] · Last Updated: [July 09, 2026]",
      },
      {
        type: "paragraph",
        text: 'Naganarai Media Tech Pvt. Ltd., operating as Nagana Media ("Nagana Media," "we," "us," or "our"), is committed to protecting the privacy of everyone who visits our website, contacts us, or engages our services. This Privacy Policy explains what personal data we collect, why, how we protect it, and the rights available to you depending on where you are located. It is organized to serve visitors and clients under the EU General Data Protection Regulation (GDPR), India\'s Digital Personal Data Protection Act 2023 (DPDP Act), and applicable US state privacy laws, in a single document.',
      },
      {
        type: "paragraph",
        text: "1. Who We Are",
      },
      {
        type: "paragraph",
        text: "Nagana Media is a B2B AI marketing and content agency operated by Naganarai Media Tech Pvt. Ltd., registered in Jaipur, Rajasthan, India, at 6, Raghu Vihar, Maharani Farm, Durgapura, Jaipur, Rajasthan, India (302018). For the purposes of GDPR and the DPDP Act, Nagana Media acts as the Data Controller / Data Fiduciary for personal data collected through naganamedia.com and in the course of client engagements, and as a Data Processor / Data Processor on behalf of clients where we handle end-customer data as part of a service engagement (this is governed separately by our Data Processing Agreement).",
      },
      {
        type: "paragraph",
        text: "2. Personal Data We Collect",
      },
      {
        type: "paragraph",
        text: "Contact and identity data: name, job title, company, email address, phone number — submitted via our contact form, LinkedIn outreach responses, or email.",
      },
      {
        type: "paragraph",
        text: "Engagement data: information shared during scoping calls, briefs, and content review cycles for active or prospective clients.",
      },
      {
        type: "paragraph",
        text: "Technical and usage data: IP address, browser type, device type, pages visited, referring source, and approximate location, collected via analytics and cookies (see our Cookie Policy).",
      },
      {
        type: "paragraph",
        text: "Communications: records of email and messaging correspondence with us.",
      },
      {
        type: "paragraph",
        text: "We do not knowingly collect sensitive categories of data (health, biometric, financial account details, government IDs) through the website, and we do not knowingly collect data from anyone under the age of 18.",
      },
      {
        type: "paragraph",
        text: "3. Why We Process Your Data (Purposes and Legal Bases)",
      },
      {
        type: "paragraph",
        text: "3.1 Purposes",
      },
      {
        type: "paragraph",
        text: "Responding to inquiries and providing quotes or proposals.",
      },
      {
        type: "paragraph",
        text: "Delivering contracted services (content strategy, AEO/GEO audits, campaign execution).",
      },
      {
        type: "paragraph",
        text: "Improving our website and understanding how it is used.",
      },
      {
        type: "paragraph",
        text: "Sending relevant updates to prospects and clients who have opted in.",
      },
      {
        type: "paragraph",
        text: "Meeting legal, accounting, and tax obligations.",
      },
      {
        type: "paragraph",
        text: "3.2 Legal bases (GDPR, Article 6)",
      },
      {
        type: "paragraph",
        text: "Contract: processing necessary to perform or take steps toward a service agreement.",
      },
      {
        type: "paragraph",
        text: "Legitimate interests: responding to inbound inquiries, securing our website, and direct marketing to business contacts where permitted, balanced against your rights.",
      },
      {
        type: "paragraph",
        text: "Consent: cookies that are not strictly necessary, and any marketing communications where consent is the applicable basis under local law.",
      },
      {
        type: "paragraph",
        text: "Legal obligation: tax, accounting, and regulatory recordkeeping.",
      },
      {
        type: "paragraph",
        text: "3.3 DPDP Act basis",
      },
      {
        type: "paragraph",
        text: 'Under the DPDP Act, we process personal data on the basis of your consent (for example, submitting our contact form or subscribing to updates) or for a "legitimate use" recognized under the Act, such as responding to a request you have made or for purposes you have voluntarily provided data for. Where consent is the basis, you may withdraw it at any time using the contact details in Section 9, and we will stop the relevant processing going forward, without affecting the lawfulness of processing before withdrawal.',
      },
      {
        type: "paragraph",
        text: "4. How We Share Personal Data",
      },
      {
        type: "paragraph",
        text: "We do not sell personal data. We share data only in the following circumstances:",
      },
      {
        type: "paragraph",
        text: "With service providers who support our operations (hosting, email delivery, analytics, CRM), bound by contract to protect the data and use it only for the purposes we specify.",
      },
      {
        type: "paragraph",
        text: "With professional advisors (accountants, lawyers) where necessary.",
      },
      {
        type: "paragraph",
        text: "Where required by law, regulation, or valid legal process.",
      },
      {
        type: "paragraph",
        text: "In connection with a business transaction (merger, acquisition, financing), subject to confidentiality protections.",
      },
      {
        type: "paragraph",
        text: "5. International Data Transfers",
      },
      {
        type: "paragraph",
        text: "As an India-based company serving clients in the EU and the US, personal data we collect may be transferred to and processed in India and other countries where our service providers operate. Where we transfer personal data out of the EEA, we rely on the European Commission's Standard Contractual Clauses or another recognized transfer mechanism. The DPDP Act permits cross-border transfer of personal data by default, except to countries specifically restricted by the Indian government (none have been notified as of the effective date of this policy).",
      },
      {
        type: "paragraph",
        text: "6. Data Retention",
      },
      {
        type: "paragraph",
        text: "We keep personal data only as long as necessary for the purposes described in this policy: engagement and contract records for the duration of the relationship and as required by Indian tax and corporate law thereafter (typically up to [RETENTION PERIOD] years), and lead/contact-form data for [RETENTION PERIOD] from last contact unless you ask us to delete it sooner or opt in to continued contact.",
      },
      {
        type: "paragraph",
        text: "7. Your Rights",
      },
      {
        type: "paragraph",
        text: "7.1 If you are in the European Economic Area or UK (GDPR)",
      },
      {
        type: "paragraph",
        text: "Right to access a copy of your personal data.",
      },
      {
        type: "paragraph",
        text: "Right to rectification of inaccurate data.",
      },
      {
        type: "paragraph",
        text: 'Right to erasure ("right to be forgotten"), subject to legal exceptions.',
      },
      {
        type: "paragraph",
        text: "Right to restrict or object to processing, including direct marketing.",
      },
      {
        type: "paragraph",
        text: "Right to data portability.",
      },
      {
        type: "paragraph",
        text: "Right to lodge a complaint with your local supervisory authority.",
      },
      {
        type: "paragraph",
        text: "7.2 If you are in India (DPDP Act)",
      },
      {
        type: "paragraph",
        text: "Right to access information about what personal data we process and the processing activities undertaken.",
      },
      {
        type: "paragraph",
        text: "Right to correction and updating of your personal data.",
      },
      {
        type: "paragraph",
        text: "Right to erasure of personal data that is no longer necessary for the purpose it was collected.",
      },
      {
        type: "paragraph",
        text: "Right to grievance redressal — you may raise a complaint with our Grievance Officer (Section 9), and if unresolved, escalate to the Data Protection Board of India.",
      },
      {
        type: "paragraph",
        text: "Right to nominate another individual to exercise your rights in the event of death or incapacity.",
      },
      {
        type: "paragraph",
        text: "7.3 If you are a US resident (CCPA/CPRA and similar state laws)",
      },
      {
        type: "paragraph",
        text: "Right to know what personal data we collect and how it is used.",
      },
      {
        type: "paragraph",
        text: "Right to delete personal data we hold about you, subject to exceptions.",
      },
      {
        type: "paragraph",
        text: "Right to correct inaccurate personal data.",
      },
      {
        type: "paragraph",
        text: "Right to opt out of the sale or sharing of personal data — Nagana Media does not sell personal data and does not share it for cross-context behavioral advertising.",
      },
      {
        type: "paragraph",
        text: "Right to non-discrimination for exercising any of these rights.",
      },
      {
        type: "paragraph",
        text: "We honor Global Privacy Control (GPC) signals as a valid opt-out request where technically supported by our cookie consent tool.",
      },
      {
        type: "paragraph",
        text: "7.4 Exercising your rights",
      },
      {
        type: "paragraph",
        text: "To exercise any right described above, contact us using the details in Section 9. We will verify your request and respond within the timeframe required by applicable law (generally 30 days under GDPR and DPDP, 45 days under CCPA, extendable in defined circumstances).",
      },
      {
        type: "paragraph",
        text: "8. Security",
      },
      {
        type: "paragraph",
        text: "We apply reasonable technical and organizational measures appropriate to our size and the nature of the data we process, including access controls, encrypted transmission where applicable, and vendor contracts requiring equivalent protections. No system is completely secure, and we encourage you to contact us promptly if you believe your data has been compromised.",
      },
      {
        type: "paragraph",
        text: "9. Grievance Officer and Contact",
      },
      {
        type: "paragraph",
        text: "For any privacy question, rights request, or grievance, contact:",
      },
      {
        type: "paragraph",
        text: "Grievance Officer: [NAME]",
      },
      {
        type: "paragraph",
        text: "Email: [PRIVACY EMAIL]",
      },
      {
        type: "paragraph",
        text: "Address: Naganarai Media Tech Pvt. Ltd., [REGISTERED ADDRESS], Jaipur, Rajasthan, India",
      },
      {
        type: "paragraph",
        text: "We aim to acknowledge grievances within 7 days and resolve them within 30 days, consistent with DPDP Act expectations.",
      },
      {
        type: "paragraph",
        text: "10. Changes to This Policy",
      },
      {
        type: "paragraph",
        text: 'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will post the updated version with a new "Last Updated" date, and where changes are material, we will provide additional notice as appropriate.',
      },
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    sourceFile: "policies/Nagana_Media_Terms_of_Service09072026.docx",
    description:
      'These Terms of Service ("Terms") govern your use of naganamedia.com (the "Site") and, at a general level, your engagement of services from Naganarai Media Tech Pvt. Ltd., operating as Nagana Media ("Nagana Media," "we," ',
    blocks: [
      {
        type: "paragraph",
        text: "Nagana Media (Naganarai Media Tech Pvt. Ltd.)",
      },
      {
        type: "paragraph",
        text: "Effective Date: [August 16, 2023] · Last Updated: [July 09, 2026]",
      },
      {
        type: "paragraph",
        text: 'These Terms of Service ("Terms") govern your use of naganamedia.com (the "Site") and, at a general level, your engagement of services from Naganarai Media Tech Pvt. Ltd., operating as Nagana Media ("Nagana Media," "we," "us"). Specific service engagements are further governed by a signed statement of work or services agreement; where the two conflict, the signed agreement controls.',
      },
      {
        type: "paragraph",
        text: "1. Acceptance of Terms",
      },
      {
        type: "paragraph",
        text: "By accessing or using the Site, or by engaging Nagana Media for services, you agree to these Terms. If you do not agree, please discontinue use of the Site.",
      },
      {
        type: "paragraph",
        text: "2. Use of the Site",
      },
      {
        type: "paragraph",
        text: "The Site and its content are provided for informational purposes about Nagana Media's services.",
      },
      {
        type: "paragraph",
        text: "You agree not to misuse the Site, including attempting unauthorized access, scraping content at scale, or interfering with normal operation.",
      },
      {
        type: "paragraph",
        text: "You agree to provide accurate information when submitting the contact form or any inquiry.",
      },
      {
        type: "paragraph",
        text: "3. Intellectual Property",
      },
      {
        type: "paragraph",
        text: "All content on the Site — including text, graphics, logos, and the Nagana Media name and branding — is owned by or licensed to Naganarai Media Tech Pvt. Ltd. and protected by applicable intellectual property law. You may not reproduce, distribute, or create derivative works from Site content without our prior written permission, except as necessary to share or reference our published articles with attribution.",
      },
      {
        type: "paragraph",
        text: "4. Client Deliverables and Ownership",
      },
      {
        type: "paragraph",
        text: "Ownership of deliverables produced under a specific client engagement (articles, audits, strategy documents, creative assets) is governed by the applicable services agreement or statement of work. In the absence of a specific agreement, Nagana Media retains ownership of working materials, templates, and methodologies used to produce deliverables, while final approved deliverables are licensed or assigned to the client as specified in the engagement terms.",
      },
      {
        type: "paragraph",
        text: "5. No Warranty",
      },
      {
        type: "paragraph",
        text: 'The Site and its content are provided "as is" without warranties of any kind, express or implied, including fitness for a particular purpose or non-infringement. Nagana Media does not guarantee specific marketing, SEO, or search visibility outcomes; any performance projections shared in proposals or reports are estimates, not guarantees.',
      },
      {
        type: "paragraph",
        text: "6. Limitation of Liability",
      },
      {
        type: "paragraph",
        text: "To the maximum extent permitted by applicable law, Nagana Media's aggregate liability arising from use of the Site or any related service shall not exceed the fees paid to Nagana Media for the specific engagement giving rise to the claim in the twelve months preceding the claim. Nagana Media is not liable for indirect, incidental, or consequential damages.",
      },
      {
        type: "paragraph",
        text: "7. Third-Party Links",
      },
      {
        type: "paragraph",
        text: "The Site may link to third-party websites or tools (for example, scheduling or analytics providers). We are not responsible for the content, privacy practices, or availability of third-party sites.",
      },
      {
        type: "paragraph",
        text: "8. Governing Law and Jurisdiction",
      },
      {
        type: "paragraph",
        text: "These Terms are governed by the laws of India. Subject to any dispute resolution clause in a signed client agreement, the courts of Jaipur, Rajasthan shall have exclusive jurisdiction over disputes arising from use of the Site. For clients based in the EU or US, the specific services agreement may separately specify a mutually agreed governing law and forum for that engagement.",
      },
      {
        type: "paragraph",
        text: "9. Changes to These Terms",
      },
      {
        type: "paragraph",
        text: 'We may update these Terms from time to time. Continued use of the Site after an update constitutes acceptance of the revised Terms. Material changes will be reflected by an updated "Last Updated" date.',
      },
      {
        type: "paragraph",
        text: "10. Contact",
      },
      {
        type: "paragraph",
        text: "Questions about these Terms can be directed to [contact@naganamedia.com], Naganarai Media Tech Pvt. Ltd., 6, Raghu Vihar, Maharani Farm, Jaipur, Rajasthan (302018), India.",
      },
    ],
  },
] satisfies PolicyDocument[];

export const getPolicyBySlug = (slug: string) =>
  policies.find((policy) => policy.slug === slug);
