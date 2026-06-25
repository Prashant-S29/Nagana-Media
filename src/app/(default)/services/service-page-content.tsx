import type { ServicePageContent } from "./_components/ServiceDetailPage";

const tile = (name: string, stage: string, sprint: string, signal: string) => ({
  name,
  stage,
  sprint,
  signal,
});

export const salesEnablementContent: ServicePageContent = {
  slug: "sales-enablement",
  kicker: "Sales Enablement",
  eyebrow: "Sales Enablement",
  headline: (
    <>
      Assets that <span className="text-brand">close</span>
      <br /> the deal.
    </>
  ),
  intro: (
    <>
      Your sales team is in a room with buyers who already know the landscape.{" "}
      <strong className="text-white">
        What they carry into that conversation either shortens the cycle or
        extends it.
      </strong>{" "}
      We build everything they need to shorten it.
    </>
  ),
  primaryCta: { label: "Talk to the Team", href: "/contact" },
  secondaryCta: { label: "See all services", href: "/services" },
  deliverablesLabel: "What We Build",
  deliverablesTitle: "Every deliverable, mapped.",
  deliverablesDescription:
    "From first pitch to signed contract. Built for the specific buyer roles inside a B2B technology sales cycle.",
  clusters: [
    {
      label: "Cluster",
      title: " 01. Pitch and Presentation Assets",
      description:
        "Decks built for every room your sales team walks into. Discovery calls, demos, CFO presentations, board meetings, and partner pitches.",
      tiles: [
        tile(
          "Sales Presentation (Discovery)",
          "BoFu",
          "30 / 90 / 200 / 365-day",
          "Opens the conversation with the right questions framed.",
        ),
        tile(
          "Sales Presentation (Demo)",
          "BoFu",
          "30 / 90 / 200 / 365-day",
          "Converts interest into a serious evaluation.",
        ),
        tile(
          "Sales Presentation (Business Case)",
          "BoFu",
          "90 / 200 / 365-day",
          "Built for CFOs and economic buyers. ROI front and center.",
        ),
        tile(
          "Board Meeting Presentation",
          "Internal",
          "30 / 90 / 200 / 365-day",
          "Executive alignment. Crisp, structured, defensible.",
        ),
        tile(
          "Internal Pitch Deck",
          "Internal",
          "30 / 90 / 200 / 365-day",
          "Gets internal stakeholders bought in before the external pitch.",
        ),
        tile(
          "Investor / Funding Deck",
          "Internal",
          "90 / 200 / 365-day",
          "Capital raise support. Story-first, numbers-ready.",
        ),
        tile(
          "Partner Pitch Deck",
          "BoFu",
          "90 / 200 / 365-day",
          "Channel and alliance growth. Positioned for the partner's ICP.",
        ),
      ],
    },
    {
      label: "Cluster",
      title: " 02. Collateral and Leave-Behinds",
      description:
        "What your buyers take away from every meeting. One-pagers that stick. Brochures that answer the next five questions before the buyer asks.",
      tiles: [
        tile(
          "Product One-Pager",
          "MoFu / BoFu",
          "30 / 90 / 200 / 365-day",
          "Quick leave-behind. Answers the top three objections on one page.",
        ),
        tile(
          "Service / Solution Brochure",
          "MoFu / BoFu",
          "90 / 200 / 365-day",
          "Full capability overview. 4 to 8 pages. Brand-consistent.",
        ),
        tile(
          "Case Study",
          "BoFu",
          "90 / 200 / 365-day",
          "Social proof built for web publication and AI citation.",
        ),
        tile(
          "Proposal Framework / Template",
          "BoFu",
          "30 / 90-day",
          "Speed-to-close asset. Reps send faster, buyers decide sooner.",
        ),
      ],
    },
    {
      label: "Cluster",
      title: " 03. Competitive and Objection Assets",
      description:
        "What reps reach for when a buyer brings up a competitor, questions your price, or goes quiet. Built to be used in the room, not read later.",
      tiles: [
        tile(
          "Sales Battlecard (Competitor)",
          "BoFu",
          "30 / 90 / 200 / 365-day",
          "Competitive displacement. Answer in ten seconds, mid-call.",
        ),
        tile(
          "Battlecard (Objection Handling)",
          "BoFu",
          "30 / 90 / 200 / 365-day",
          "Rep confidence. Win rate improvement.",
        ),
        tile(
          "Battlecard (Pricing Defense)",
          "BoFu",
          "90 / 200 / 365-day",
          "Protects margin. Reframes value before discount conversation starts.",
        ),
        tile(
          "Competitive Positioning Brief",
          "MoFu / BoFu",
          "90 / 200 / 365-day",
          "Category narrative control. 2 to 4 pages your team actually reads.",
        ),
        tile(
          "ROI / Value Justification Tool",
          "BoFu",
          "90 / 200 / 365-day",
          "Converts the economic buyer. Numbers they can take to their CFO.",
        ),
      ],
    },
    {
      label: "Cluster",
      title: " 04. Training and Enablement",
      description:
        "The internal layer. Playbooks, onboarding, and knowledge bases that make every rep perform like your best one.",
      tiles: [
        tile(
          "Sales Playbook",
          "Internal",
          "90 / 200 / 365-day",
          "Outbound sequences, discovery frameworks, closing scripts.",
        ),
        tile(
          "Onboarding Training Material",
          "Internal",
          "90 / 200 / 365-day",
          "Cuts ramp time. New reps get up to speed faster.",
        ),
        tile(
          "Product Knowledge Repository",
          "Internal",
          "200 / 365-day",
          "Single source of truth. Technical questions answered before the call.",
        ),
      ],
    },
  ],
  faqDescription:
    "What B2B sales and marketing leaders ask before engaging on sales enablement.",
  faqs: [
    {
      question:
        "What is sales enablement and why does it matter for B2B technology companies?",
      answer:
        "Sales enablement is the set of assets, tools, and knowledge that helps your sales team have better conversations and close faster. In B2B technology, where sales cycles are long and buying committees are large, the right asset at the right moment can move a deal from stalled to signed.",
    },
    {
      question: "How is a battlecard different from a competitive brief?",
      answer:
        "A battlecard is a one-page reference a rep uses mid-call. Speed and clarity are the whole point. A competitive brief is a longer internal document for deeper preparation, used in training and planning, not during live conversations.",
    },
    {
      question: "Do you build the decks in PowerPoint or another format?",
      answer:
        "We deliver in whatever format your team uses. PowerPoint is most common for enterprise sales teams. We also deliver in Google Slides or as polished PDFs where that makes more sense for the use case.",
    },
    {
      question: "Can you build sales assets for a product launch?",
      answer:
        "Yes. Launch-specific bundles are one of our most common engagements: pitch deck, product one-pager, battlecard set, and a case study or proof point document. We can deliver a full launch asset set within a 30-day sprint.",
    },
    {
      question: "Do your case studies get picked up by AI?",
      answer:
        "When published on your website with proper schema and entity markup, yes. A case study is both a buyer trust asset and an AI citation asset when it is structured correctly. We build them to serve both functions.",
    },
  ],
  cta: {
    title: "Tell us what you need closed.",
    description:
      "We will tell you which assets get you there. No retainer required to start.",
    label: "Talk to the Team",
    href: "/contact",
  },
};

export const marketingEnablementContent: ServicePageContent = {
  slug: "marketing-enablement",
  kicker: "Marketing Enablement",
  eyebrow: "Marketing Enablement",
  headline: (
    <>
      Content that gets <br />
      <span className="text-brand">found, cited,</span>
      <br /> and acted on.
    </>
  ),
  intro: (
    <>
      Most B2B content exists. It just doesn't{" "}
      <strong className="text-white">do anything</strong>. We build the content
      your buyers find when they ask AI, and the assets that move them from
      curious to ready to buy.
    </>
  ),
  primaryCta: { label: "Talk to the Team", href: "/contact" },
  secondaryCta: {
    label: "Get a free AI visibility audit",
    href: "/ai-seo-audit",
  },
  deliverablesLabel: "What We Build",
  deliverablesTitle: "Every deliverable, mapped.",
  deliverablesDescription:
    "Pick what you need. Bundle into a sprint. We handle the rest.",
  clusters: [
    {
      label: "Cluster",
      title: " 01. Content That Builds Pipeline",
      description:
        "ToFu and MoFu assets that establish category authority and get your brand cited by ChatGPT, Perplexity, and Google AI Mode.",
      tiles: [
        tile(
          "MoFu Blog (Thought Leadership)",
          "MoFu",
          "90 / 200 / 365-day",
          "Category authority. LLM citation signal.",
        ),
        tile(
          "BoFu Blog (Buyer Guide / ROI)",
          "BoFu",
          "90 / 200 / 365-day",
          "High purchase-intent query capture.",
        ),
        tile(
          "Technical Guide",
          "MoFu / BoFu",
          "200 / 365-day",
          "Expert entity signal. Attracts 6-figure deal conversations.",
        ),
        tile(
          "Pillar Page",
          "ToFu / MoFu",
          "90 / 200 / 365-day",
          "Topic cluster anchor. GEO entity foundation.",
        ),
        tile(
          "Content Cluster (Pillar + Spokes)",
          "ToFu to BoFu",
          "200 / 365-day",
          "Full topic authority for AI models.",
        ),
        tile(
          "Comparison Page",
          "BoFu",
          "90 / 200 / 365-day",
          "Competitive query capture at decision stage.",
        ),
        tile(
          "Alternative Page",
          "BoFu",
          "90 / 200 / 365-day",
          "Competitive displacement. Captures switching intent.",
        ),
        tile(
          "eBook",
          "MoFu",
          "90 / 200 / 365-day",
          "Lead gen + depth signal for AI citation.",
        ),
        tile(
          "Whitepaper",
          "MoFu / BoFu",
          "200 / 365-day",
          "Credibility + expert citation source.",
        ),
        tile(
          "LinkedIn Content Program",
          "ToFu / MoFu",
          "30 / 90 / 200 / 365-day",
          "Brand entity signal + thought leadership cadence.",
        ),
      ],
    },
    {
      label: "Cluster",
      title: " 02. Content That Converts",
      description:
        "BoFu assets and demand gen tools built to turn AI-referred traffic into pipeline.",
      tiles: [
        tile(
          "B2B Newsletter",
          "ToFu / MoFu",
          "90 / 200 / 365-day",
          "Owned audience build. Nurture channel.",
        ),
        tile(
          "Email Nurture Sequence",
          "MoFu",
          "90 / 200 / 365-day",
          "Pipeline acceleration. 5 to 10 part series.",
        ),
        tile(
          "Re-engagement Email Sequence",
          "BoFu",
          "200 / 365-day",
          "Revenue recovery from cold or stalled leads.",
        ),
        tile(
          "Onboarding Email Sequence",
          "Post-sale",
          "200 / 365-day",
          "Retention and expansion revenue.",
        ),
        tile(
          "PPC Ad Copy + Campaign Assets",
          "ToFu / BoFu",
          "90 / 200 / 365-day",
          "Paid intent capture. Aligned to buyer stage.",
        ),
        tile(
          "High-Converting Landing Page",
          "BoFu",
          "30 / 90 / 200 / 365-day",
          "Conversion + structured data for AI parsing.",
        ),
        tile(
          "ROI / Savings Calculator",
          "MoFu / BoFu",
          "90 / 200 / 365-day",
          "Lead magnet + LLM tool citation signal.",
        ),
        tile(
          "AI Readiness Assessment",
          "MoFu",
          "90 / 200 / 365-day",
          "Lead magnet + entity authority signal.",
        ),
        tile(
          "Benchmark Tool",
          "MoFu",
          "200 / 365-day",
          "Lead magnet. Often cited as research by AI.",
        ),
        tile(
          "Marketing Video (Explainer)",
          "ToFu / MoFu",
          "90 / 200 / 365-day",
          "Multi-format entity signal. Increases dwell.",
        ),
        tile(
          "Product Demo Video",
          "MoFu / BoFu",
          "90 / 200 / 365-day",
          "Conversion acceleration at evaluation stage.",
        ),
        tile(
          "Social Cut / Short-form Video",
          "ToFu",
          "30 / 90 / 200 / 365-day",
          "Reach + brand awareness. 60 to 90 seconds.",
        ),
      ],
    },
    {
      label: "Cluster",
      title: " 03. Web and Technical Foundation",
      description:
        "The infrastructure that makes everything else citable. Schema, llms.txt, and copy that tells AI exactly who you are.",
      tiles: [
        tile(
          "Website Copy (Full Site)",
          "All stages",
          "90 / 200 / 365-day",
          "Entity clarity. GEO foundation for every page.",
        ),
        tile(
          "Website Design + Development",
          "All stages",
          "200 / 365-day",
          "Technical AEO, llms.txt, schema from the ground up.",
        ),
        tile(
          "Schema Markup Implementation",
          "All stages",
          "30 / 90 / 200 / 365-day",
          "Structured data. Tells AI crawlers what to extract.",
        ),
        tile(
          "llms.txt Deployment",
          "All stages",
          "30 / 90-day",
          "Direct LLM crawl instruction. Fastest AEO win.",
        ),
      ],
    },
  ],
  extraSection: {
    label: "Structured Programs",
    title: "Pick your sprint.",
    description:
      "Every sprint is a managed program. We plan the calendar, brief the team, and ship on time.",
    cards: [
      {
        title: "30-Day Sprint",
        description:
          "Foundation layer. 8 to 12 assets. Audit plus quick wins. AI citation gaps closed fast.",
      },
      {
        title: "90-Day Sprint",
        description:
          "Full content cluster. Pillar page, supporting articles, one lead magnet. Authority starts compounding.",
      },
      {
        title: "200-Day Sprint",
        description:
          "Multi-cluster build. Email sequences, social integration, paid assets. Pipeline attribution begins.",
      },
      {
        title: "365-Day Sprint",
        description:
          "Full annual program. Quarterly re-audits. Compound authority that turns into predictable inbound.",
      },
    ],
  },
  faqDescription:
    "No boilerplate. The questions B2B tech marketers actually ask before engaging.",
  faqs: [
    {
      question:
        "What makes your blogs different from what other agencies produce?",
      answer:
        "Every article is structured for both human readers and AI extraction. That means clear entity references, traceable statistics, schema-ready headings, and content mapped to real buyer intent prompts, not keyword clusters. A blog from us is also a citation asset for ChatGPT and Perplexity.",
    },
    {
      question: "Do you write for our specific vertical?",
      answer:
        "Yes. We work exclusively in B2B technology: SaaS, fintech, enterprise software, iPaaS, supply chain, identity tech, and telecom. We do not work with lifestyle brands or generalist clients. Vertical fluency is the whole point.",
    },
    {
      question: "What is a content sprint and why does it matter?",
      answer:
        "A sprint is a managed production program with a fixed calendar, defined asset list, and a clear outcome. It replaces the 'we publish when we can' approach with something that actually compounds. Authority builds faster with a structured program than with one-off articles.",
    },
    {
      question: "Can we pick individual deliverables without a full sprint?",
      answer:
        "Yes. Our services are composable. If you need a pillar page and two landing pages, that's an engagement. You do not need to buy a full program to work with us.",
    },
    {
      question: "How long before we see results?",
      answer:
        "AI citation improvements from schema and llms.txt deployment typically show within 30 days. Content authority builds over 90 to 180 days depending on your current baseline. We run a quarterly re-audit to track citation movement and adjust.",
    },
  ],
  cta: {
    title: "Start with the audit.",
    description:
      "Find out where your brand is invisible to AI across six platforms. Free. Seven business days. No boilerplate report.",
    label: "Get a Free AI Visibility Audit",
    href: "/ai-seo-audit",
  },
};

export const programManagementContent: ServicePageContent = {
  slug: "program-management",
  kicker: "Program Management",
  eyebrow: "Program Management",
  headline: (
    <>
      Strategy is worthless <br /> if it{" "}
      <span className="text-brand">never ships.</span>
    </>
  ),
  intro: (
    <>
      Most B2B marketing programs stall in the approval stage. Assets sit in
      review. Calendars slip.{" "}
      <strong className="text-white">
        We manage the full program so your marketing actually reaches the
        market.
      </strong>{" "}
      On time. On brief. Without the overhead of building an in-house team.
    </>
  ),
  primaryCta: { label: "Talk to the Team", href: "/contact" },
  secondaryCta: { label: "See all services", href: "/services" },
  deliverablesLabel: "What We Manage",
  deliverablesTitle: "Every deliverable, mapped.",
  deliverablesDescription:
    "From editorial calendar to final asset. We own the execution so your team stays focused on the business.",
  clusters: [
    {
      label: "Cluster",
      title: " 01. Sprint and Calendar Management",
      description:
        "Structured production programs with locked calendars, defined asset lists, and accountability at every stage.",
      tiles: [
        tile(
          "30-Day Content Sprint",
          "All stages",
          "30-day",
          "Foundation layer. 8 to 12 assets. AI citation gaps closed fast.",
        ),
        tile(
          "90-Day Content Sprint",
          "All stages",
          "90-day",
          "Full content cluster. Authority starts compounding.",
        ),
        tile(
          "200-Day Content Sprint",
          "All stages",
          "200-day",
          "Multi-cluster build. Pipeline attribution begins.",
        ),
        tile(
          "365-Day Content Sprint",
          "All stages",
          "365-day",
          "Full annual program. Compound authority. Predictable inbound.",
        ),
        tile(
          "Editorial Calendar Lock-In (Monthly)",
          "All stages",
          "30 / 90 / 200 / 365-day",
          "Consistent publishing cadence. No last-minute scrambles.",
        ),
        tile(
          "Editorial Calendar Lock-In (Quarterly)",
          "All stages",
          "90 / 200 / 365-day",
          "Aligned to your GTM priorities and product roadmap.",
        ),
        tile(
          "Quarterly AI Visibility Re-Audit",
          "All stages",
          "90 / 200 / 365-day",
          "Citation gap tracking. Course-correct before the quarter is lost.",
        ),
      ],
    },
    {
      label: "Cluster",
      title: " 02. Team and Vendor Deployment",
      description:
        "The fractional team that fills your gaps. No full-time headcount. No hiring cycles. The right specialist for each deliverable.",
      tiles: [
        tile(
          "Fractional Writer Deployment",
          "All stages",
          "30 / 90 / 200 / 365-day",
          "Consistent voice. B2B tech vertical expertise.",
        ),
        tile(
          "Fractional Designer Deployment",
          "All stages",
          "30 / 90 / 200 / 365-day",
          "Brand-consistent assets across every deliverable.",
        ),
        tile(
          "Fractional Web Developer Deployment",
          "All stages",
          "90 / 200 / 365-day",
          "Technical AEO implementation. Schema, speed, structure.",
        ),
        tile(
          "Fractional Growth Marketer",
          "All stages",
          "90 / 200 / 365-day",
          "Demand gen, paid channels, and conversion optimization.",
        ),
        tile(
          "Agency / Vendor Coordination",
          "All stages",
          "90 / 200 / 365-day",
          "Single point of accountability. You brief once. We manage the rest.",
        ),
        tile(
          "Content Approval Workflow Setup",
          "Internal",
          "30-day",
          "Bottleneck elimination. Assets stop sitting in review.",
        ),
        tile(
          "Brand Consistency QA",
          "All stages",
          "30 / 90 / 200 / 365-day",
          "Message discipline across every asset and channel.",
        ),
      ],
    },
    {
      label: "Cluster",
      title: " 03. Delivery and Performance",
      description:
        "Web builds, landing pages, asset libraries, and the reporting that proves marketing is moving pipeline.",
      tiles: [
        tile(
          "Website Design + Build Project",
          "All stages",
          "200 / 365-day",
          "AEO-ready web infrastructure from the ground up.",
        ),
        tile(
          "Landing Page Build + Optimisation",
          "BoFu",
          "30 / 90 / 200 / 365-day",
          "Conversion plus structured data. Built to be cited and clicked.",
        ),
        tile(
          "Asset Library Management",
          "Internal",
          "90 / 200 / 365-day",
          "Content reuse and efficiency. Stop recreating things that exist.",
        ),
        tile(
          "Monthly Performance Tracking + Reporting",
          "All stages",
          "90 / 200 / 365-day",
          "Revenue attribution clarity. What is working and what to cut.",
        ),
        tile(
          "Pipeline Attribution Framework",
          "All stages",
          "200 / 365-day",
          "Proves marketing ROI. Built for CFO and board visibility.",
        ),
      ],
    },
  ],
  extraSection: {
    label: "The Fractional Team",
    title: "Senior expertise. No overhead.",
    description:
      "You get the specialist the deliverable needs. Not a generalist junior who figures it out as they go.",
    cards: [
      {
        title: "Content Strategist",
        description:
          "AEO and GEO strategy, brief architecture, cluster planning, and editorial direction.",
      },
      {
        title: "B2B Writer",
        description:
          "Technical B2B copy in the voice and vertical fluency your buyers expect.",
      },
      {
        title: "Designer",
        description:
          "Decks, one-pagers, infographics, and web assets aligned to brand guidelines.",
      },
      {
        title: "Web Developer",
        description:
          "Schema implementation, landing page builds, speed optimisation, llms.txt.",
      },
    ],
  },
  faqDescription:
    "What B2B technology leaders ask before handing over program management.",
  faqs: [
    {
      question: "What does a content sprint include exactly?",
      answer:
        "Every sprint starts with a planning session to lock the asset list, calendar, and brief templates. We then manage production, review cycles, and delivery. You have one point of contact throughout. At the end of the sprint, you have a set of published or publication-ready assets, a performance baseline, and a recommendation for the next phase.",
    },
    {
      question: "How is this different from a content agency retainer?",
      answer:
        "A retainer typically sells you a block of hours or a fixed number of articles per month. A sprint is a program with a defined outcome, a timeline, and a delivery plan. You know what you are getting, when it arrives, and what it is supposed to do for your pipeline.",
    },
    {
      question: "Do we need a full team already in place to work with you?",
      answer:
        "No. That is the whole point of fractional deployment. We plug the gaps you have, whether that is a missing writer, a designer, a web developer, or the strategic oversight layer. You brief us on the outcome you need and we build the team around it.",
    },
    {
      question:
        "How do you handle approval workflows with our internal stakeholders?",
      answer:
        "We set the workflow up in the first week. Two rounds of review are standard. We build the brief to reduce the number of revisions by getting alignment on direction before production starts, not after.",
    },
    {
      question: "What does the quarterly AI visibility re-audit cover?",
      answer:
        "It retests the 50-plus buyer intent prompts from your original audit across all six AI platforms. We track whether citation frequency has moved, which competitors have gained or lost ground, and where new content gaps have appeared. The output is a prioritized action plan for the next sprint.",
    },
  ],
  cta: {
    title: "Ready to stop planning and start shipping?",
    description:
      "Tell us what is stalled. We will tell you how fast we can move it.",
    label: "Talk to the Team",
    href: "/contact",
  },
};
