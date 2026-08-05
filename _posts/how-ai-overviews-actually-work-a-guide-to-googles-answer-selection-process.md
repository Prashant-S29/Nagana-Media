---
title: "How AI Overviews Actually Work: A Guide to Google's Answer Selection Process"
excerpt: A page ranking 15th in Google can get cited in an AI Overview while the
  page ranking first gets ignored. That's not a theory; it's what network
  traffic analysis of Google's own infrastructure shows. Here's the actual
  pipeline.
coverImage: /assets/blog/uploads/guide-9-working-of-ai-overviews.webp
date: 2026-08-05T14:18:00.000Z
author:
  name: Abhijeet Singh
  picture: /assets/blog/authors/nagana.webp
metaTitle: "How AI Overviews Actually Work: A Guide to Google's Answer Selection Process"
metaDescription: A page ranking 15th in Google can get cited in an AI Overview
  while the page ranking first gets ignored. That's not a theory; it's what
  network traffic analysis of Google's own infrastructure shows. Here's the
  actual pipeline.
primaryKeyword: How AI Overviews Work
secondaryKeywords:
  - Google AI Overview selection process
  - AEO pipeline
  - Google generative search architecture
  - passage-level citation scoring
  - AI Overview traffic analysis
---
Here's a claim that sounds implausible until you see the traffic logs behind it. A page ranking fifteenth in Google's organic results can earn a citation in an AI Overview while the page sitting at position one gets ignored entirely for the same query. That's not a hypothesis. It's the conclusion of a network traffic analysis conducted by a team at Discovered Labs, who captured and reverse-engineered the actual requests Google's servers make when generating an AI Overview.

Most AEO advice describes what to do without ever explaining why it works mechanically. I want to do the opposite here. I want to walk through the actual pipeline, phase by phase, using the specific technical findings from that traffic analysis, so the tactical advice that follows has something real underneath it.

## What Actually Happens Between Typing a Search and Seeing an AI Overview?

According to the traffic capture, the whole process runs through five distinct phases, completing in roughly 2.5 to 3 seconds for a typical query, though complex queries can stretch to 5 seconds or longer.

The first phase is the initial search request itself. Google's server returns the main HTML page almost immediately, in about 495 milliseconds, but the AI Overview section of that page arrives empty, showing a "Searching..." loading state. Embedded in that initial response, invisible to a human reader but critical to what happens next, are several data attributes: a flag indicating AI Overview mode is active for this specific query, a lengthy encoded token controlling which model handles the request, and a reference to a separate loading mechanism that fires immediately after.

## How Does the AI Overview Content Actually Get Loaded?

This is the second phase, and it's the part most[ SEO](https://www.naganamedia.com/blogs/ai-seo-for-b2b-edtech-how-corporate-learning-buyers-use-ai-to-shortlist-training-platforms) advice completely misses. A second, separate request fires to an endpoint the traffic analysis identifies as `/async/folsrch`, carrying the original query along with the routing tokens generated in phase one. This is where the actual retrieval and generation work happens, entirely separate from the standard search results that loaded a moment earlier.

The practical implication is worth sitting with. The AI Overview isn't simply reading the organic results already displayed on the page. It's running an independent process, hitting a different endpoint, potentially pulling from a different set of sources than the ten blue links a human would scroll past.

## How Does Google Decide Which Sources to Cite?

This happens in what the traffic analysis identifies as phase three, and it's the single most important phase for anyone thinking about AI search visibility strategically.

The server classifies the query type – comparison, how-to, factual, or something more complex – and determines the relevant domain. Based on that classification, it queries Google's search index and retrieves a set of candidate documents. From there, the system extracts individual passages from those documents, scores each passage specifically for how well it addresses the query, and selects which passages actually get used for citation. This entire phase, retrieval through selection, takes approximately 200 milliseconds.

Two things about this phase deserve real attention. First, the system is scoring passages, not pages. A single piece of content can be extracted and cited multiple times across different queries, or even multiple times within a single AI Overview, if it contains several distinct passages that each answer a different part of the question. Second, and this is the finding that explains the fifteenth-position citation example from the opening of this piece, passage-level scoring runs independently from the page-level ranking signals that determine standard organic position. A page can rank poorly overall while still containing one exceptionally well-structured, directly relevant passage that scores highly enough to earn a citation.

In one example captured during the traffic analysis, a search comparing OLED and QLED televisions returned citations from five specific domains, each of which had built dedicated, structured comparison content directly addressing the query. That pattern, structured content built specifically to answer a defined question, showed up consistently across the captured examples.

![Five-phase timeline diagram showing how Google AI Overviews are generated, including initial search async request retrieval and scoring, AI synthesis, and response delivery in under three seconds](/assets/blog/uploads/guide-9-info1-working-of-ai-infographic.webp)

## What Happens After Sources Are Selected?

Phase four is where the language model actually does its synthesis work, taking the user's original query alongside the retrieved passages and generating the response text. This phase is measurably the slowest part of the whole pipeline, consuming approximately 1,200 milliseconds for a standard query, with the model structuring the response to match the query type, generating the citation links back to specific sources, and running safety filtering before anything gets returned.

Phase five is simple by comparison. The generated content, along with its citation links, streams back as an HTML fragment, typically 290 to 350 kilobytes, and gets inserted into the placeholder container that was sitting empty since phase one.

## Why Does an AI Overview Sometimes Not Appear At All?

The traffic analysis captured several queries that returned an explicit "not available" message instead of a generated answer, which reveals something useful about exclusion criteria.

Queries with clear commercial or purchase intent seem to get handled differently, and in some captured cases were excluded from AI Overview generation entirely. A query like "should I buy this specific product from this specific retailer or somewhere else" leans toward transactional intent, which appears to route differently than an informational question.

Meta questions about Google's own products, asking directly about AI Overviews themselves, for instance, appeared to be excluded as well. Regional rollout also remains genuinely uneven. And a specific cookie value assigns individual users to one of what the traffic analysis identified as 98 simultaneously active experiment groups, meaning two people running an identical search at the same moment can see meaningfully different results, including one seeing an AI Overview and the other seeing none at all.

That last point matters practically. If you're checking your own AI Overview [visibility](https://www.naganamedia.com/blogs/b2b-brand-identity-for-tech-companies-how-design-choices-affect-ai-search-visibility) manually and seeing inconsistent results across different sessions or devices, that inconsistency may not be a mistake in your testing. It may be Google's actual experiment infrastructure doing exactly what it's designed to do.

## What Does Google Actually Measure About Its Own AI Overviews?

The traffic analysis also captured the performance telemetry Google sends back to itself, which is a useful signal for understanding what the system is actually optimizing for. Several named timing metrics track things like how quickly AI-generated content becomes visible, how long full model loading takes, and how quickly the interface becomes interactive for the user, with initial loading beginning in the 29 to 46 millisecond range and the interface becoming interactive within roughly 73 to 189 milliseconds in captured examples.

The pattern across these metrics suggests Google is optimizing hard for perceived speed, getting something visible to the user almost instantly, even when the actual generation work continues for another second or more behind the scenes.

## What Does All of This Actually Mean for How I Should Structure Content?

A few specific, mechanically grounded recommendations follow directly from the pipeline above, rather than from general [AEO](https://www.naganamedia.com/blogs/perplexity-only-aeo-strategy-what-works-differently-than-chatgpt) folklore.

Since citation happens at the passage level during a 200-millisecond scoring window, structure content into distinct, self-contained sections, generally in the 200 to 400 word range, where each section can be understood and answered without requiring context from anywhere else on the page. A passage that depends on a sentence three paragraphs earlier to make sense is a passage that's harder to extract cleanly, regardless of how good the writing is.

Since organic ranking and passage-level citation appear to operate somewhat independently, don't assume that improving a page's overall search ranking is the only lever available. A page with mediocre overall ranking but one genuinely excellent, specifically-targeted section addressing a precise buyer question can still earn a citation that a better-ranked but less specific competitor misses.

Since query type visibly affects response format, match your content structure to the kind of question you're targeting. Comparison queries call for structured pros-and-cons formatting. How-to queries call for clear numbered sequences. Factual queries call for a direct answer stated plainly in the first sentence of the relevant section, not built up to gradually.

Since the captured citation examples consistently came from domains with independent third-party validation, in addition to strong on-page content, treat brand mentions and reviews across Reddit, industry publications, and review sites as a genuine input into citation likelihood, not just a general brand-awareness nice-to-have disconnected from AI search performance specifically.

## How Does This Connect to Google's Own Published Guidance?

Google published its own official guide to generative AI search optimization in May 2026, and it's worth being clear about how that document relates to the technical findings above, since they're not contradictory, but they are answering different questions. Google's guide focuses on content and quality principles: write genuinely useful, non-commodity content, maintain a clean technical foundation, and don't chase unnecessary tactics like llms.txt or content chunking. The traffic analysis above focuses on the mechanical layer underneath that guidance, showing specifically how and why passage-level structure and independent third-party validation function the way they do inside the actual retrieval pipeline.

Neither replaces the other. Google's guide tells you what to prioritize. Understanding the pipeline mechanics tells you why those priorities produce the results they do, which makes the guidance easier to apply consistently rather than as a checklist followed without context.

## Frequently Asked Questions

### Does ranking first in Google guarantee a citation in an AI Overview for the same query?

No. Traffic analysis of Google's[ AI Overview](https://www.naganamedia.com/blogs/how-to-appear-in-google-ai-overviews-naturally-a-complete-guide) infrastructure found that citation selection happens through independent passage-level scoring, separate from the page-level ranking signals that determine standard organic position. A page ranking well outside the top ten can still earn a citation if it contains a passage that scores highly for directly answering the specific query.

### How long does it actually take Google to generate an AI Overview?

Based on captured network traffic, the full process takes roughly 2.5 to 3 seconds for a typical query, broken into an initial page load of about 495 milliseconds, a source retrieval and scoring phase of about 200 milliseconds, and a language model synthesis phase of about 1,200 milliseconds. Complex queries can extend the total process to 5 seconds or more.

### Why does an AI Overview sometimes not appear for a query that seems like it should trigger one?

Several factors identified through traffic analysis can suppress an AI Overview: queries with strong commercial or transactional intent, meta questions about Google's own AI features, uneven regional rollout, and assignment to one of dozens of simultaneously active experiment groups that can produce different results for different users running an identical search.

### What content structure does the retrieval mechanism actually favor?

Since the system extracts and scores individual passages rather than evaluating a full page as a single unit, content structured into distinct, self-contained sections of roughly 200 to 400 words, each answering a specific question without depending on surrounding context, is more likely to be cleanly extracted and cited than content that builds an answer gradually across a full page.

### Does this technical pipeline analysis contradict Google's own official AI search guidance?

No, the two operate at different levels. Google's official guidance, published in its Search Central documentation, focuses on content quality principles and explicitly de-prioritizes certain technical tactics for its own systems. Independent traffic analysis of the underlying pipeline explains the mechanical reasons behind that guidance, particularly around passage-level structure and citation selection, without contradicting the stated priorities.

## References

Discovered Labs, Ben Moore, How Google AI Overviews Works, network traffic analysis and five-phase pipeline breakdown: <https://discoveredlabs.com/blog/how-google-ai-overviews-works>

MentionsAPI, Google AI Overviews Explained: What They Are and Why They Matter, query fan-out mechanics and click-through rate impact data: <https://mentionsapi.com/blog/google-ai-overviews-explained>

ContentDecoded, How Google Picks AI Overview Sources (Explained Simply), Information Gain and Semantic Completeness as named ranking factors: <https://contentdecoded.com/how-google-ai-overview-chooses-sources/>

IxieVerse, What Are Google AI Overviews? How They Work, Why They Matter and How to Win in 2026, source selection count and placement data: <https://ixieverse.com/blog/google-ai-overviews-explained/>

Google Search Central, Optimizing your website for generative AI features on Google Search, official content quality guidance: <https://developers.google.com/search/docs/fundamentals/ai-optimization-guide>
