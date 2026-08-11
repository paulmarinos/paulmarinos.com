# For Your Review

Content flagged during authoring that warrants your eye before it represents you
professionally. Grouped by *why* it needs review, not by pillar. Nothing here is a known
error — these are places where I made a defensible call you may want to confirm, or where my
knowledge cutoff makes staleness likely.

**How to use this:** the highest-value passes are (1) the volatile-content items, which age
fastest, and (2) the opinionated-stance items, which take a position a reader could disagree
with. Tick items off as reviewed; delete the file when the site is done if you like.

---

## 1. Volatile content — verify against current sources

My knowledge has a cutoff. These are the places most likely to have drifted since, and the
ones where being wrong is most visible to a knowledgeable reader.

- [ ] **`pentest/tools-commands` (§5.3)** — the single most perishable page on the site.
  Tool names, flags, and default behaviour change; CrackMapExec→NetExec already happened
  once. Framed as orientation with a "verify against current documentation" caution, but
  worth a real pass. Confirm the commands still do what the page says and the tools are still
  the ones you'd reach for.
- [ ] **ATT&CK technique IDs** — used in `pentest/mitre-attack`, `pentest/cloud-pentesting`,
  `detection-eng/detection-quality`, `detection-eng/threat-hunting` (T1078, T1059, T1548,
  T1021). The matrix is renumbered and split regularly. Each page carries a "verify against
  current ATT&CK" note, but confirm the IDs and that the technique names still match.
- [ ] **`pentest/specialized-testing` (§5.7)** — the LLM section. Prompt-injection defenses
  and the OWASP LLM Top 10 move faster than anything else on the site. Flagged as a moving
  target in-page; check nothing has been superseded.
- [ ] **`threat-intel/risk-prioritization` (§1.4)** — I deliberately gave *no* specific
  percentages for "CVEs ever exploited" or EPSS coverage, and added a caution box telling
  readers to cite current KEV/EPSS figures. Confirm you're happy with that choice (no numbers
  rather than possibly-stale numbers).
- [ ] **Tool/framework names in `appsec/code-scanning` and `appsec/cicd-security`** — Semgrep,
  CodeQL, SonarQube, Checkov, tfsec, Terrascan, Sigstore, SLSA levels, OIDC patterns. Less
  volatile than the pentest tooling but still worth confirming the SLSA level descriptions and
  the GitHub Actions OIDC snippet against current docs.
- [ ] **The entire AI & Automation pillar (§6) is inherently perishable.** RAG techniques,
  vector-DB landscape, agent frameworks (LangGraph/CrewAI/AutoGen/MCP), and the OWASP LLM Top 10
  all move fast. Written to lean on *durable* framing over version-specific detail, and
  `securing-ai` and `rag` both carry in-page "verify against current sources" cautions. Two
  places most likely to date: the **vector-DB landscape** in `vector-databases` (pgvector/
  Qdrant/Weaviate/Milvus/Pinecone positioning) and the **agent-framework** names in
  `agent-orchestration`. Note: this pillar deliberately names no LLM provider or model — it's
  written about the engineering patterns, not a specific vendor's API.

## 2. Opinionated stances — confirm you'd defend these

Places where I took a clear position rather than staying neutral. All defensible; none are
the only reasonable view. Since this is your portfolio, the opinions should be *yours*.

- [ ] **`threat-intel/collection-sourcing` (§1.6)** — argues STIX/TAXII is often "ceremony
  around a list of indicators" unless you're exchanging at scale. A real position with
  detractors.
- [ ] **`detection-eng/soar-automation` (§7.6)** — argues auto-closing alerts is usually "a
  tuning problem wearing a costume." Opinionated.
- [ ] **`detection-eng/detection-as-code` (§7.1)** — candid that Sigma conversion is lossy and
  that native rules are sometimes the correct choice, against the common "Sigma is an
  unqualified good" framing.
- [ ] **`appsec/secure-coding` (§3.1)** — states memory-safe language choice should be a
  *default requirement* for new systems at a trust boundary. Strong claim about language
  choice as a control.
- [ ] **`appsec/sdlc` (§3.3)** — "shift-left is a myth, shift-everywhere is the honest
  version." Argues against a popular slogan.
- [ ] **`appsec/code-scanning` (§3.5)** — "the measure of a scanning program is findings
  fixed divided by developer time, not findings produced." Opinionated framing of program
  success.
- [ ] **`pentest/red-team-operations` (§5.5)** — "an engagement that evades everything and
  reports 'we won' has failed at its actual job." A deliberate reframing of red-team success
  that not everyone shares.
- [ ] **`ai-automation/agent-orchestration` (§6.4)** — "start with one agent; multi-agent as a
  starting architecture is complexity chosen ahead of need," and "frameworks can obscure what's
  happening — the core loop is simple enough to write directly." Opinionated against the
  multi-agent-framework default.
- [ ] **`ai-automation/vector-databases` (§6.2)** — "start with pgvector unless you have a
  reason not to." A real position against reaching for a dedicated vector DB.
- [ ] **`ai-automation/securing-ai` (§6.6)** — states prompt injection "is not fully solved and
  may not be fully solvable," and that the real control is authorization/blast-radius, not
  prompt hardening. Defensible and important, but a strong claim worth confirming you'd stand
  behind — it's the load-bearing argument of the pillar and the hinge to IAM §2.4.

## 3. Sensitive / dual-use framing — confirm the guardrails read right

Offensive and legally-adjacent material. I wrote all of it defensively and with explicit
authorization/caution notes, but this is the category where framing matters most.

- [ ] **`pentest/red-team-operations` (§5.5)** — opens with an authorization caution; evasion
  tradecraft is framed as "so defenders can build and test against it." Confirm the guardrail
  is prominent enough.
- [ ] **`pentest/tools-commands` (§5.3)** — C2 frameworks (Sliver, Havoc, Mythic) and AD
  attack tooling, framed as dual-use for authorized engagements and defenders. Check the
  authorization caution and that nothing reads as a how-to for unauthorized use.
- [ ] **`dfir/malware-analysis` (§9.4)** — the public-sandbox OPSEC warning (uploads can tip
  off an active intruder and disclose the victim). Real tradecraft, framed defensively;
  confirm you're comfortable with it.
- [ ] **`pentest/cloud-pentesting` (§5.2)** — IAM privesc chains and metadata abuse. Written
  as "what the enumeration looks for," with a provider rules-of-engagement caution. Confirm
  the framing.
- [ ] **`threat-intel/collection-sourcing` (§1.6)** — OSINT OPSEC section (interacting with
  adversary infrastructure can notify the operator). Defensive framing; confirm.

## 4. Legal content — the one place I'm explicitly out of my lane

- [ ] **`dfir/evidence-legal` (§9.5)** — chain of custody, legal hold, privilege, breach
  notification clocks. Opens with an explicit "not legal advice" note and stays structural
  rather than prescriptive (it describes how technical responders work *alongside* legal, not
  what the law requires). This is the article most worth a careful read, and the one where
  jurisdiction-specific detail is most likely to mislead if taken as guidance.

## 5. Illustrative code — confirm the fixes match your house style

Code examples are deliberately short and illustrative of the vulnerability *class*, not
runnable exploit material. Worth confirming the *fixes* are how you'd actually write them.

- [ ] **`appsec/secure-coding` (§3.1)** — parameterization, the fail-open vs. fail-closed
  auth pair, the crypto-hygiene list.
- [ ] **`appsec/insecure-coding` (§3.2)** — the TOCTOU atomic-update fix, the BOLA example,
  the SSRF/metadata snippet.
- [ ] **`appsec/cicd-security` (§3.4)** — the GitHub Actions OIDC YAML snippet.

## 6. Voice and calibration — a general pass

- [ ] **Maturity levels.** Each article declares `foundational` / `practitioner` / `advanced`.
  I calibrated these by feel; confirm they match how you'd rank the material. (Current spread:
  foundational for the communication/report/metrics pieces, advanced for forensics/RE/hunting
  and the two hardest detection and pentest topics.)
- [ ] **The "so what" voice.** Every article opens by naming the real problem and takes
  positions throughout. Confirm the register reads as *you* — confident and opinionated — and
  not as generic security writing. The landing pages set the tone you approved; the articles
  aim to match it.
- [ ] **British/American spelling.** I've used British spellings in places (organise,
  behaviour, prioritise) and American elsewhere. Pick one and I'll normalise the lot.

---

## Status

Pillars complete: **Threat Intelligence (§1), Identity & Access Management (§2), Application
Security (§3), AI & Automation Engineering (§6), Penetration Testing & Red Teaming (§5),
Detection Engineering & SecOps (§7), Incident Response & Digital Forensics (§9).** Remaining:
GRC (§4), Cloud & Infrastructure Security (§8), Data Security & Privacy Engineering (§10).
