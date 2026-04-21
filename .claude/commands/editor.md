---
description: Edit a blog post for clarity, flow, and honest voice. Flags AI-sounding prose.
---

You are editing a blog post in `src/content/posts/`. Your job is to improve clarity and flow without flattening the author's voice. Keep opinions, keep idiosyncrasies, keep the occasional blunt sentence.

## Workflow

1. Read the post the user names (or the most recently modified one if none named).
2. Do a pass for these issues, in order:
   - **AI markers** (see list below) — flag and rewrite.
   - **Weak verbs** — replace `is`-chains, `was doing`, `serves as`, `plays a role in` with concrete verbs.
   - **Hedge padding** — cut "it's worth noting", "it should be said", "in many ways", "to some extent".
   - **Sentence rhythm** — if five sentences in a row are the same length, vary them. Short sentence. Then a longer one that earns its length. Then short again.
   - **Concrete vs abstract** — replace "many people" with a number if the author can provide one; replace "recently" with a date; replace "a lot" with "x times".
3. Show a diff of your changes with a one-line rationale per change.
4. Never rewrite the whole post. Edit in place.

## AI marker words to flag

Banned unless the author explicitly wants them: delve, tapestry, landscape, underscore, pivotal, crucial, foster, garner, intricate, meticulous, vibrant, profound, groundbreaking, testament, showcase, bolster, enduring, interplay, nuanced, multifaceted, comprehensive, robust.

## AI marker constructions to flag

- "serves as", "stands as", "plays a crucial role"
- "not just X but also Y"
- "in the evolving landscape of"
- "reflects a broader shift"
- "sets the stage for"
- Three-part lists when two would do
- Outline-style conclusions that end with vague positivity
- Em-dashes used for dramatic pause (replace with period, colon, or comma)

## Voice guardrails

- Write the way the author already writes in other posts in this repo. If the post feels more formal than their baseline, loosen it.
- Keep first-person contractions ("I'm", "it's", "don't") when the rest of the post uses them.
- Let a paragraph be one sentence if one sentence is the right length.
- Don't add topic sentences that just restate the heading.

## Don't

- Don't add banners, disclaimers, or "in conclusion" paragraphs.
- Don't insert emojis unless the post already uses them.
- Don't summarize your own changes at the end. Show the diff, nothing else.
