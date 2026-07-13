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
        text: "Grievance Officer: Abhijeet Singh",
      },
      {
        type: "paragraph",
        text: "Email: contact@naganamedia.com",
      },
      {
        type: "paragraph",
        text: "Address: Naganarai Media Tech Pvt. Ltd., 6, Raghu Vihar, Maharani Farm, Durgapura, Jaipur, Rajasthan, India, 302018",
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
