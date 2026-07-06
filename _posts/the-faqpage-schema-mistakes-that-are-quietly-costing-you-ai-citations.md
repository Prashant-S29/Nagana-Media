---
title: The FAQPage Schema Mistakes That Are Quietly Costing You AI Citations
excerpt: Google removed FAQ rich results from search on May 7, 2026. The schema
  itself did not die, and the mistakes teams are making with it right now are
  costing them AI citations they do not realize they are losing.
coverImage: /assets/blog/uploads/b12t2-aeo-schema.webp
date: 2026-07-06T07:26:00.000Z
author:
  name: Sai Archith
  picture: /assets/blog/authors/nagana.webp
metaTitle: The FAQPage Schema Mistakes That Are Quietly Costing You AI Citations
metaDescription: Google removed FAQ rich results from search on May 7, 2026. The
  schema itself did not die, and the mistakes teams are making with it right now
  are costing them AI citations they do not realize they are losing.
primaryKeyword: FAQPage Schema Mistakes
secondaryKeywords:
  - AI citations
  - FAQ rich results
  - AEO strategy
  - GEO strategy
  - B2B technology companies
---
On May 7, 2026, Google removed FAQ rich results from search entirely. The expandable question dropdowns that used to appear beneath organic listings are gone, on every vertical, with no exceptions remaining. The Search Console FAQ report and Rich Results Test support follow in June 2026. Search Console API support for FAQ data is removed in August 2026.

That is the factual sequence. What it means for B2B content teams is where the confusion starts, and where most teams are getting the response wrong in one of two opposite directions.

## What Actually Changed and What Did Not

FAQPage structured data, the schema.org markup type itself, is not deprecated. Google's own documentation confirms unused or non-rich-result-eligible structured data does not harm a site. What Google removed is the visible SERP feature, the dropdown display beneath a search listing. The markup can remain on a page without penalty. It simply no longer triggers that specific visual treatment in Google Search.

This is not Google's first retirement of a rich result type. HowTo rich results were removed from desktop in 2023. Seven additional structured data types were pulled from search appearance in June 2025. FAQ rich results are the latest in a consistent pattern: Google retiring third-party SERP features that compete for visual real estate with its own AI Overview experience.

## The Two Overreactions, Both Wrong

The first overreaction: "schema is dead, remove all FAQ markup immediately." This is wrong. The markup causes no harm sitting on a page, and removing it site-wide is unnecessary engineering effort spent solving a problem that does not exist.

The second overreaction: "FAQ schema matters more than ever for [AI citation](https://share.google/sahPwmew4cg563Y7P), so add it everywhere." This is also wrong, and it is the more expensive mistake because it leads teams to keep investing in the wrong lever. Independent research analyzing pages that added JSON-LD schema over an eight-month window found zero meaningful AI citation uplift attributable to the schema markup itself, across Google AI Overviews, AI Mode, and ChatGPT. A separate December 2024 study found no correlation between schema markup coverage and citation rates across AI platforms. AI retrieval systems extract from visible HTML content during page fetching; hidden structured data is frequently not read at the point of citation selection.

The correlation that does exist, and that gets misread as causation constantly, is this: pages that earn AI citations are disproportionately likely to also carry FAQ schema. That is not because the schema earned the citation. It is because the kind of team that implements clean structured data is often also the kind of team that writes clear, well-organized, genuinely useful content, and it is the content doing the work.

## The Five Mistakes That Are Actually Costing You Citations

None of these mistakes are about whether schema is present. They are about what the schema wraps, and this is where most B2B technology sites are quietly losing ground.

### Mistake 1: Writing FAQ answers for the old rich result format instead of for AI extraction.

The rich result era rewarded short, almost telegraphic answers, because the SERP display had limited space. That constraint no longer applies, and answers written to that old constraint are now a liability. Research tracking which sites get cited most often in ChatGPT and [Perplexity](https://share.google/GNAlVbgEIOjkol2Ku) found that well-structured FAQ content with answers between 80 and 150 words earns more citations than the 30-word answers built for the old accordion format. A short, hedged answer gives an AI model nothing to extract with confidence. A complete, specific answer with genuine context is what earns the citation.

### Mistake 2: Templated FAQ blocks with invented questions that exist only to hit keywords.

This is the practice that got the rich result feature killed in the first place, and it is still the single most common FAQ mistake on B2B sites. A question nobody has actually asked, written in a format that mimics a real buyer question, does not earn citations and does not help a human reader. If a question was written by working backward from a keyword rather than forward from a real buyer conversation, it should be rewritten or removed.

### Mistake 3: Multiple FAQPage schema blocks on a single URL.

Google's documentation is explicit that only one FAQPage definition belongs per page. Sites with multiple Q&A clusters spread across a page frequently implement multiple separate FAQPage schema blocks instead of nesting every question inside a single mainEntity array under one FAQPage definition. This is a validation error, not a content problem, but it is common enough and easy enough to check that it belongs on every technical audit.

### Mistake 4: Promotional language inside the Answer field.

"Our award-winning team" or "the best platform in the industry" inside a schema Answer field historically broke rich result eligibility, and current structured data validators still flag it. More importantly for AI citation purposes, promotional language inside what should be a direct factual answer weakens the extractability of the content regardless of the schema layer. An AI model evaluating whether to cite a passage is not persuaded by superlatives. It is looking for a specific, verifiable answer.

### Mistake 5: Treating FAQ schema as a substitute for visible, well-structured on-page content.

This is the most consequential mistake. AI retrieval systems extract from the visible page content a crawler fetches, not from the JSON-LD block alone. Structured Q&A pairs are easier to extract than unstructured prose, which is the real case for keeping FAQ content on a page, but a clean question heading paired with a self-contained prose answer performs the same extraction job with or without the schema wrapper. Teams that added FAQ schema to a page without also ensuring the visible content is clear, direct, and specific gained a markup layer that adds no citation value on its own.

## What To Do This Week

* **Export the FAQ rich results report** from Search Console while it is still available, before the June 2026 removal. This gives you a before-and-after baseline for any pages that previously carried FAQ rich results, useful for measuring the real impact of the change on click-through rate.
* **Audit existing FAQ content** against the five mistakes above, not against whether the schema markup validates. A page can have flawless JSON-LD and still be losing AI citations because the answers are thirty words long, promotional, or answer questions nobody asked.
* **Do not run a sitewide removal** of FAQPage schema. There is no evidence it causes harm, and the removal itself consumes engineering time that would be better spent improving the content quality of the highest-priority FAQ pages.
* **Redirect the structured data investment** your team was planning to make toward content quality instead: specific statistics with sources, named expert attribution, and answers with enough context that an AI model has something worth citing. The original Princeton and Georgia Tech research on generative engine optimization found that adding inline citations to primary sources improved AI citation rates by roughly 40%, adding specific statistics improved rates by roughly 37%, and adding named expert quotations improved rates by roughly 22%. None of those levers involve a schema tag. All of them involve what the content actually says.

- - -

## Frequently Asked Questions

### Did Google remove FAQPage structured data entirely in 2026?

No. Google removed the FAQ rich result, the visible expandable dropdown feature that used to appear beneath search listings, on May 7, 2026. The FAQPage schema.org markup type itself remains valid and is not deprecated. Sites can keep FAQ schema on their pages without penalty; it simply no longer triggers the visual rich result display in Google Search.

### Does FAQPage schema still help with AI citation in ChatGPT and Perplexity?

The evidence is mixed and leans toward the schema itself having limited direct effect. Independent research tracking pages that added JSON-LD schema over an eight-month window found no meaningful AI citation uplift attributable to the schema markup specifically. What correlates more strongly with AI citation is the underlying content quality: clear, direct, specific answers with genuine context, which AI models can extract and cite regardless of whether that content also carries FAQ schema markup.

### Should B2B technology companies remove FAQ schema from their websites after the May 2026 change?

No. There is no indication that FAQPage schema harms rankings or triggers any penalty when it remains on a page without producing a rich result. A sitewide removal is unnecessary engineering effort. The more useful action is auditing existing FAQ content for quality issues, thin answers written for the old rich result format, invented questions that do not reflect real buyer queries, and promotional language, regardless of whether the schema markup itself is removed or kept.

### What length should FAQ answers be for AI citation purposes in 2026?

Research tracking AI citation patterns in ChatGPT and Perplexity found that answers between 80 and 150 words earn more citations than the short, roughly 30-word answers that were optimized for the old Google rich result display. A complete answer with genuine context gives an AI model a defensible passage to extract and cite. A short, hedged answer written for a defunct SERP feature gives the model very little to work with.

### What should replace structured data investment as the priority for AI citation in 2026?

Content-level signals that independent research has shown to move AI citation rates: inline references to primary sources, specific named statistics rather than vague claims, and named expert attribution. These structural content changes have documented citation rate improvements in academic research on generative engine optimization, while schema markup on its own has not shown comparable causal effect in more recent analysis. The practical implication is to prioritize what the content says over how it is marked up.

- - -

## References

* **SEO Strategy Ltd**, [FAQ Schema After 7 May 2026: What Actually Changed, deprecation timeline and Floor 2 versus Floor 3 analysis](https://www.seostrategy.co.uk/learn/faq-schema-deprecation-2026-rich-result-vs-schema/)
* **The HOTH**, [Google Killed FAQ Rich Results: Why Your FAQ Content Still Matters, Ahrefs 38% AI Overview ranking correlation data](https://www.thehoth.com/blog/google-faq-rich-results-deprecated/)
* **SEOcrawl AI**, [Google FAQ Rich Results Removed in 2026, 80-150 word answer citation research](https://seocrawl.ai/blog/faq-structured-data-google-2026)
* **AuthorityTech**, [Schema Didn't Move AI Citations, Ahrefs matched difference-in-differences study, Princeton/Georgia Tech GEO research on citations, statistics, and expert quotes](https://authoritytech.io/curated/schema-markup-ai-citations-ahrefs-study-2026)
* **ALM Corp**, <https://almcorp.com/blog/google-faq-rich-results-no-longer-supported/>
