# Site Content Architecture

**Status:** v0.1 draft — starting point. Subsections are expected to expand over time.

**Seven top-level sections.** Each is a standalone pillar, but the site's thesis is the *interrelationship* between them (see [Cross-Cutting Threads](#cross-cutting-threads)).

| # | Section | Slug | One-line framing |
|---|---------|------|------------------|
| 1 | Threat Intelligence | `/threat-intel` | Turning raw signal into decisions people act on |
| 2 | Identity & Access Management | `/iam` | Who/what gets access, proven and enforced |
| 3 | Application Security | `/appsec` | Building it right before it ships |
| 4 | Governance, Risk & Compliance | `/grc` | Obligations mapped to controls, controls mapped to evidence |
| 5 | Penetration Testing | `/pentest` | Adversarial validation of everything above |
| 6 | AI & Automation Engineering | `/ai-automation` | The tooling layer that scales the rest |
| 7 | Detection Engineering & SecOps | `/detection-eng` | Turning knowledge of attacks into durable, tested detections |

---

## 1. Threat Intelligence
`/threat-intel`

### 1.1 Report Writing
- Intelligence report formats (tactical, operational, strategic)
- BLUF structure and executive summaries
- Confidence language and estimative probability (ICD 203)
- Source grading and reliability scales (Admiralty/NATO)
- Templates: incident brief, threat actor profile, campaign writeup, weekly digest
- Common failure modes: burying the finding, unqualified confidence, no "so what"

### 1.2 Statistics & Data Analytics
- Base rates, prevalence, and why most detections are false positives
- Descriptive vs. inferential framing for security data
- Time-series analysis for detection trends
- Cohort and survival analysis for vulnerability remediation
- Sampling bias in telemetry and log data
- Common statistical abuses in vendor threat reports

### 1.3 Data Visualization
- Chart selection by question type
- Visualizing uncertainty (error bars, ranges, fan charts)
- Heatmaps, attack path graphs, kill-chain timelines
- Dashboard design for SOC vs. executive audiences
- Tooling: Python (matplotlib/plotly), Grafana, Kibana, Sigma-driven views
- Anti-patterns: red/yellow/green theater, 3D pie charts, meaningless risk quadrants

### 1.4 Risk Prioritization
- CVSS vs. EPSS vs. SSVC — what each is actually for
- KEV catalog and exploit-in-the-wild signals
- Asset criticality and business context weighting
- Threat-informed defense: prioritizing by observed adversary behavior
- Building a defensible prioritization model
- Quantitative approaches (FAIR, loss exceedance curves)

### 1.5 Effective Communication
- Writing for the audience: engineer, director, board
- Translating technical findings into business impact
- Briefing formats and time-boxing
- Handling uncertainty without hedging into uselessness
- Narrative structure for incident retrospectives

### 1.6 Collection & Sourcing *(placeholder — to expand)*
- OSINT tradecraft and operational security
- Feed evaluation and deduplication
- Internal telemetry as intelligence source
- Structured formats: STIX/TAXII, MISP

---

## 2. Identity & Access Management
`/iam`

### 2.1 AWS Identity
- IAM policy evaluation logic (explicit deny → SCP → boundary → identity/resource)
- Roles vs. users; STS and temporary credentials
- Cross-account trust and the confused deputy problem
- Common misconfigs: wildcard actions, overly broad trust policies, unrotated access keys, `iam:PassRole` chains
- Privilege escalation paths in IAM
- Solutions: permissions boundaries, SCPs, Access Analyzer, least-privilege generation from CloudTrail

### 2.2 Azure Identity
- Entra ID objects: users, groups, service principals, managed identities
- Azure RBAC vs. Entra roles — the two-plane confusion
- Conditional Access policy design
- Common misconfigs: overprivileged service principals, stale app registrations, consent grant abuse, unscoped Owner assignments
- Solutions: PIM, Access Reviews, workload identity federation

### 2.3 Multi-Cloud & Federation
- SAML, OIDC, SCIM — how they actually differ
- Federated access patterns across AWS/Azure/GCP
- Secrets management (Vault, Secrets Manager, Key Vault)
- Machine-to-machine auth and mTLS

### 2.4 Frameworks
- **Zero Trust:** NIST SP 800-207, policy decision/enforcement points, microsegmentation, maturity models (CISA ZTMM)
- **Zero Knowledge:** ZK proofs, ZK-based authentication, password-authenticated key exchange, privacy-preserving verification
- **Zero Knowledge Trust — agentic AI identity:** identity for non-human/agent actors, delegated authority and scoping, credential lifecycle for autonomous agents, on-behalf-of flows, revocation and containment, audit trails for agent actions
- Comparing frameworks: where each fails in practice

### 2.5 Governance of Identity *(placeholder — to expand)*
- Joiner/mover/leaver automation
- Entitlement review at scale
- Identity threat detection (ITDR)

---

## 3. Application Security
`/appsec`

### 3.1 Secure Coding Practices & Paradigms
- Input validation, output encoding, parameterization
- Memory safety and language choice as a control
- Secure defaults and fail-closed design
- Cryptographic hygiene: what to never hand-roll
- Language-specific guidance (Python, Go, JS/TS, Java, Rust)

### 3.2 Common Insecure Coding Pitfalls
- OWASP Top 10 — walked through with real code
- Injection families (SQL, command, template, LDAP, NoSQL)
- Deserialization and object injection
- SSRF and its cloud-metadata consequences
- Authn/authz flaws: IDOR, broken object-level authorization
- Race conditions and TOCTOU
- Secrets in source control
- Dependency confusion and supply chain

### 3.3 SDLC Best Practices
- Threat modeling (STRIDE, PASTA, attack trees) and when it's worth it
- Security requirements and abuse cases
- Design review gates
- Secure code review methodology
- Shift-left vs. shift-everywhere — honest tradeoffs

### 3.4 CI/CD & Platform Security
- GitHub: Actions security, OIDC to cloud, branch protection, CODEOWNERS, secret scanning, Dependabot
- GitLab: pipeline security, protected variables, runner isolation
- Pipeline attack surface: poisoned pipeline execution, dependency tampering, artifact integrity
- Signing and provenance: Sigstore, SLSA levels, SBOMs

### 3.5 Code Scanning
- **SAST:** how it works, taint analysis, tuning, false-positive management (Semgrep, CodeQL, SonarQube)
- **DAST:** crawling, auth handling, API scanning (ZAP, Burp, Nuclei)
- **SCA:** dependency and transitive risk, reachability analysis
- **IAST/RASP:** where they fit
- Building a scanning program people don't route around

### 3.6 API & Cloud-Native AppSec *(placeholder — to expand)*
- OWASP API Top 10
- Container and image security
- IaC scanning (Terraform, CloudFormation, Bicep)

---

## 4. Governance, Risk & Compliance
`/grc`

### 4.1 Common Frameworks
- NIST CSF 2.0 and SP 800-53
- ISO/IEC 27001 & 27002
- SOC 2 (Trust Services Criteria, Type I vs. Type II)
- FedRAMP (baselines, authorization paths, 20x/modernization)
- CIS Controls and benchmarks
- PCI DSS v4.x
- HITRUST, CMMC

### 4.2 Regulations by Industry
- Healthcare: HIPAA, HITECH
- Financial: GLBA, SOX, DORA, NYDFS 500
- Critical infrastructure: NERC CIP, TSA directives
- Federal/defense: FISMA, ITAR/EAR
- Consumer/retail: FTC Act, state breach laws

### 4.3 Regulations by Region
- EU: GDPR, NIS2, DORA, Cyber Resilience Act, EU AI Act
- US: state privacy patchwork (CCPA/CPRA, VCDPA, etc.), sectoral overlay
- UK: DPA 2018, UK GDPR
- APAC: PIPL, APPI, PDPA variants
- Cross-border transfer mechanisms

### 4.4 Data Handling
- Classification schemes that survive contact with users
- Data residency and sovereignty
- Retention and defensible deletion
- DLP program design
- Privacy engineering: minimization, pseudonymization, purpose limitation

### 4.5 Compliance Mapping
- Control crosswalks and the common-control approach
- Mapping one control set to many frameworks (OSCAL, SCF)
- Evidence collection and audit readiness
- Avoiding duplicate work across SOC 2 / ISO / FedRAMP

### 4.6 GRC Engineering
- Compliance as code (OSCAL, OPA/Rego, Conftest)
- Automated evidence pipelines
- Continuous control monitoring
- Policy-as-code and drift detection
- Treating auditors as a downstream consumer of an API

### 4.7 Risk Management *(placeholder — to expand)*
- Risk register mechanics
- Qualitative vs. quantitative (FAIR)
- Third-party/vendor risk
- Exception and acceptance workflows

---

## 5. Penetration Testing
`/pentest`

### 5.1 Web Application Pentesting
- Methodology (OWASP WSTG, PTES)
- Recon and mapping
- Authentication and session testing
- Authorization testing (vertical/horizontal)
- Injection and business logic flaws
- Client-side: XSS, CSRF, CORS, prototype pollution
- File upload, SSRF, XXE chains

### 5.2 Cloud Pentesting
- AWS: enumeration, IAM privesc chains, S3/metadata abuse, Lambda and ECS pivots
- Azure: Entra enumeration, managed identity abuse, storage and Key Vault paths, Azure→on-prem hops
- Kubernetes: RBAC abuse, pod escape, service account tokens
- Rules of engagement and provider policies

### 5.3 Tools & Commands
- Recon: nmap, amass, subfinder, httpx
- Web: Burp Suite, ZAP, ffuf, sqlmap, Nuclei
- Cloud: Pacu, ScoutSuite, Prowler, ROADrecon, AzureHound, Cloudsplaining
- AD/identity: BloodHound, Impacket, CrackMapExec/NetExec, Kerbrute
- C2 and post-ex: Sliver, Havoc, Mythic
- Format: command → what it does → what the output means → what to do next

### 5.4 MITRE ATT&CK
- Matrix structure: tactics, techniques, sub-techniques
- Cloud and container matrices
- ATT&CK Navigator for coverage mapping
- Purple teaming: Atomic Red Team, Caldera
- Mapping findings to ATT&CK for defensive handoff
- D3FEND and mitigation mapping

### 5.5 Report Writeups
- Report anatomy: exec summary, scope, methodology, findings, appendices
- Finding structure: description, impact, evidence, reproduction, remediation
- Severity ratings and justifying them
- Screenshot and evidence hygiene
- Retest and closure reporting
- Writing for the developer who has to fix it

### 5.6 Specialized Testing *(placeholder — to expand)*
- API and GraphQL
- Mobile
- Red team ops and detection evasion
- AI/LLM application testing

---

## 6. AI & Automation Engineering
`/ai-automation`

### 6.1 Retrieval-Augmented Generation
- Naive RAG and its failure modes
- Advanced RAG: query rewriting, HyDE, hybrid search, reranking
- Modular/agentic RAG
- GraphRAG and knowledge-graph retrieval
- Contextual retrieval and chunk enrichment
- Long-context vs. retrieval — when each wins
- Chunking strategies and evaluation

### 6.2 Vector Databases & Embeddings
- What embeddings actually encode
- Similarity metrics and index types (HNSW, IVF, PQ)
- Vector DB landscape: pgvector, Qdrant, Weaviate, Milvus, Pinecone
- Hybrid search (BM25 + dense) and fusion
- Metadata filtering and multi-tenancy
- Cost, latency, and recall tradeoffs

### 6.3 Verification & Evaluation
- Grounding and citation enforcement
- Hallucination detection strategies
- LLM-as-judge: uses and pitfalls
- Golden datasets and regression testing
- Guardrails and output schema validation
- Human-in-the-loop checkpoints

### 6.4 Agent Orchestration
- Single-agent vs. multi-agent — when multi is worth it
- Patterns: planner/executor, supervisor, reflection, tool-calling loops
- Frameworks: LangGraph, CrewAI, AutoGen, MCP
- Memory: short-term, long-term, episodic
- Error handling, retries, and loop termination
- Cost and latency control

### 6.5 Security Applications
- Automating triage and alert enrichment
- Agent-assisted report drafting
- Code review and scanning augmentation
- Compliance evidence automation
- Threat intel summarization pipelines

### 6.6 Securing AI Systems *(placeholder — to expand)*
- Prompt injection (direct and indirect)
- OWASP Top 10 for LLM Applications
- Tool-use authorization and blast radius
- Model supply chain
- Ties directly to §2.4 agent identity

---

## 7. Detection Engineering & SecOps
`/detection-eng`

### 7.1 Detection as Code
- Detections as versioned, reviewed, tested artifacts
- Repo structure, branching, and peer review for rules
- CI/CD for detection content
- Sigma as a portable rule format; backend conversion
- Vendor-native languages: KQL, SPL, EQL, Lucene/ES-QL
- Metadata standards: ATT&CK mapping, severity, owner, data source, false-positive notes

### 7.2 Detection Lifecycle
- Idea intake: threat intel, pentest findings, incident lessons, hunt results
- Hypothesis → data availability check → rule → tune → deploy → monitor → retire
- Detection backlog prioritization (ties to §1.4)
- Rule health monitoring: volume drift, silent failure, data source outages
- Deprecation discipline — the rules nobody owns

### 7.3 Data Pipeline & Log Engineering
- Log sources by tier: endpoint, identity, network, cloud control plane, application
- Cloud telemetry: CloudTrail, GuardDuty, Azure Activity/Entra sign-in logs, Defender
- Normalization and schemas: OCSF, ECS, ASIM
- Enrichment: asset, identity, geo, threat intel joins
- Pipeline tooling (Cribl, Vector, Fluent Bit) and cost control
- Log coverage gap analysis — knowing what you can't see

### 7.4 Detection Quality & Testing
- Precision, recall, and why alert volume is a bad metric
- Unit testing detections against synthetic and replayed events
- Atomic Red Team and adversary emulation for validation (ties to §5.4)
- Detection coverage mapping with ATT&CK Navigator
- Tuning without gutting: allowlisting vs. narrowing vs. suppressing
- The alert fatigue math (base rates — ties to §1.2)

### 7.5 Threat Hunting
- Hypothesis-driven vs. baseline/anomaly-driven hunting
- Structured hunt methodology and documentation
- Turning successful hunts into permanent detections
- Hunting in cloud and identity data specifically
- Measuring hunt program value

### 7.6 Incident Response Operations
- IR lifecycle (NIST SP 800-61) and playbook design
- Triage workflows and severity declaration
- Cloud IR specifics: snapshotting, credential revocation, blast radius scoping
- Identity-centric containment (ties to §2)
- Forensic evidence handling and chain of custody
- Postmortems and blameless retrospectives

### 7.7 SOAR & Automation
- Automation candidates: enrichment, triage, containment, notification
- Playbook design and safe-guardrails for automated response
- Agent-assisted triage (ties to §6.5)
- Human approval gates for destructive actions

### 7.8 Program Metrics *(placeholder — to expand)*
- MTTD/MTTR and their limitations
- Coverage vs. capability reporting
- Detection engineering team models and staffing

---

## Cross-Cutting Threads

The site's differentiator is the connective tissue. Candidate cross-section pieces:

- **Pentest finding → GRC control gap → AppSec fix → threat intel context.** One vulnerability traced through all four lenses.
- **IAM misconfig as the shared root cause.** Same finding, four different reporting audiences.
- **Agentic AI identity.** §2.4 (Zero Knowledge Trust) × §6.4 (orchestration) × §6.6 (securing AI).
- **Risk prioritization as the universal problem.** §1.4 methods applied to AppSec backlogs, GRC findings, and pentest reports.
- **Automation of the compliance-to-evidence pipeline.** §4.6 × §6.5.
- **Communication as a technical skill.** §1.5 applied to §5.5 pentest reports and §4.x audit narratives.
- **Purple team loop.** §5.4 emulation → §7.4 detection validation → §7.2 backlog → §1.4 prioritization. The full circuit from adversary technique to tested detection.
- **The telemetry gap.** §7.3 log coverage analysis as the shared prerequisite for detection, IR, threat hunting, and §4.x audit evidence.

---

## Structural Notes

- **Per-section landing page:** what this is, why it matters, how it connects to the other six, then subsection index.
- **Content types to support:** deep-dive articles, cheatsheets/command references, templates (report, policy, threat model), walkthroughs/labs, and a glossary.
- **Suggested tagging axes:** section, cloud provider (AWS/Azure/GCP/multi), framework (NIST/ISO/SOC2/FedRAMP), maturity level (foundational/practitioner/advanced), content type.
- **Recommended cross-link discipline:** every article links to at least one article in a different top-level section.

### Open Questions
- Should Frameworks (Zero Trust / ZK / ZKT) stay under IAM or graduate to its own top-level section as agentic identity content grows?
- Does AI/Automation split into "AI engineering" and "securing AI" once §6.6 fills out?
- Where exactly is the Threat Intel (§1) / Detection Engineering (§7) boundary? Current split: §1 is analysis and communication of adversary knowledge, §7 is operationalizing it. Hunting (§7.5) is the blurriest case.
- Does Incident Response (§7.6) eventually warrant its own pillar, or stay under SecOps?

---

## Implementation

**Stack (locked):** Astro + Starlight, hosted on GitHub Pages, custom domain.

| Concern | Choice |
|---|---|
| Framework | Astro |
| Theme base | Starlight (customized, not stock) |
| Content format | Markdown / MDX |
| Search | Pagefind (bundled with Starlight, static, no service) |
| Deploy | GitHub Actions → GitHub Pages |
| Repo visibility | Public (required on GitHub Free) |
| Domain | Custom apex or `www` subdomain, free auto-provisioned SSL |
| Interactive components | React islands, only where needed (charts, matrices) |

### Repo Layout
```
/
├── astro.config.mjs          # Starlight config, sidebar = the 7 pillars
├── src/
│   ├── content/
│   │   ├── config.ts         # content collection schema (tag validation)
│   │   └── docs/
│   │       ├── index.mdx     # landing page
│   │       ├── threat-intel/
│   │       ├── iam/
│   │       ├── appsec/
│   │       ├── grc/
│   │       ├── pentest/
│   │       ├── ai-automation/
│   │       └── detection-eng/
│   ├── components/           # overrides + interactive islands
│   └── styles/custom.css     # design token overrides
├── public/                   # static assets, CNAME
└── .github/workflows/deploy.yml
```

### Frontmatter Schema
Enforce the tagging axes at build time via `src/content/config.ts` so tags can't silently rot:

```
title:        string
description:  string
pillar:       enum [threat-intel, iam, appsec, grc, pentest, ai-automation, detection-eng]
contentType:  enum [deep-dive, cheatsheet, template, walkthrough, glossary]
maturity:     enum [foundational, practitioner, advanced]
cloud:        enum[] [aws, azure, gcp, multi]        # optional
frameworks:   string[]                                # NIST, ISO27001, SOC2, FedRAMP...
attack:       string[]                                # ATT&CK technique IDs, optional
relatedTo:    string[]                                # cross-pillar links — enforce ≥1
updated:      date
```

`relatedTo` is what operationalizes the cross-link discipline. Consider a build-time check that fails if an article has no link outside its own pillar.

### Design Direction — Avoiding Default Starlight
Stock Starlight is instantly recognizable. Since the site doubles as a portfolio signal, override at minimum:

- **Typography:** replace the default system stack. A distinctive display face for headings + a readable body serif or grotesk.
- **Color:** custom Starlight CSS variables. Avoid the default blue/purple accent. Dark mode as the primary design target, light mode as the derivative.
- **Landing page:** fully custom, not the stock hero component. This is the page recruiters see.
- **Section landing pages:** custom layout showing the pillar's relationship to the other six.
- **Spacing/rhythm:** widen the content measure, tune the vertical rhythm — the default reads as "docs site."

### Interactive Components (Phase 2)
Astro islands, added only where they earn their place:
- ATT&CK coverage matrix (§5.4 / §7.4)
- Cross-pillar relationship graph — the visual thesis of the site
- Compliance framework crosswalk table (§4.5), filterable
- Chart components for §1.3 data visualization articles

### Build Order
1. Scaffold Starlight, deploy a near-empty site to Pages, wire the custom domain. Prove the pipeline first.
2. Configure sidebar with all 7 pillars + content schema.
3. Write pillar landing pages (7 pages) — establishes voice and the interrelationship framing.
4. Seed 2–3 real articles per pillar, chosen to demonstrate cross-links.
5. Design pass: typography, color, custom landing page.
6. Interactive components.

**Note:** don't skip step 1. Custom domain DNS and SSL provisioning are the most common source of early friction; solve it while the site is trivial.
