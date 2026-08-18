# Site Content Architecture

**Status:** v0.1 draft — starting point. Subsections are expected to expand over time.

**Ten top-level sections.** Each is a standalone pillar, but the site's thesis is the *interrelationship* between them (see [Cross-Cutting Threads](#cross-cutting-threads)).

| # | Section | Slug | One-line framing |
|---|---------|------|------------------|
| 1 | Threat Intelligence | `/threat-intel` | Turning raw signal into decisions people act on |
| 2 | Identity & Access Management | `/iam` | Who/what gets access, proven and enforced |
| 3 | Application Security | `/appsec` | Building it right before it ships |
| 4 | Governance, Risk & Compliance | `/grc` | Obligations mapped to controls, controls mapped to evidence |
| 5 | Penetration Testing & Red Teaming | `/pentest` | Adversarial validation of everything above |
| 6 | AI & Automation Engineering | `/ai-automation` | The tooling layer that scales the rest |
| 7 | Detection Engineering & SecOps | `/detection-eng` | Turning knowledge of attacks into durable, tested detections |
| 8 | Cloud & Infrastructure Security | `/cloud-infra` | The substrate everything else runs on |
| 9 | Incident Response & Digital Forensics | `/dfir` | What happens once prevention has already failed |
| 10 | Data Security & Privacy Engineering | `/data-privacy` | Protecting the thing all of it exists to protect |

---

## 1. Threat Intelligence
`/threat-intel`

Two layers. §1.1–1.7 are analyst craft — the skills that make an individual piece of
intelligence good. §1.8–1.11 are the process and program layer — the machinery that decides
what gets worked on, for whom, and where it flows. The §1/§7 boundary (see Open Questions)
holds throughout: §1 owns deciding and communicating what matters; §7 owns operationalizing
it as detections.

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
Grown a third level. The hub keeps the four-input model, the base-rate argument, the failure
modes and the FAIR/loss-exceedance note; the three scoring systems each earn a reference page.
- Asset criticality and business context weighting; threat-informed defense
- Building a defensible prioritization model; quantitative approaches (FAIR, loss exceedance)
- **1.4.1 CVSS** — base/temporal/environmental, the vector string, why the base score is not a
  priority, what changed in v4.0
- **1.4.2 EPSS & KEV** — probability of exploitation vs. confirmed exploitation, threshold use,
  why absence from KEV is not safety
- **1.4.3 SSVC** — the decision tree, its four outcomes, the inputs it forces you to know

### 1.5 Effective Communication
- Writing for the audience: engineer, director, board
- Translating technical findings into business impact
- Briefing formats and time-boxing
- Handling uncertainty without hedging into uselessness
- Narrative structure for incident retrospectives

### 1.6 Collection & Sourcing
- OSINT tradecraft and operational security
- Feed evaluation and deduplication
- Internal telemetry as intelligence source
- Structured formats: STIX/TAXII, MISP

### 1.7 Analytic Methods & Attribution
- Models and what each is for: Cyber Kill Chain, Diamond Model (pivoting as the point),
  ATT&CK as vocabulary rather than analytic framework
- Structured analytic techniques: ACH, key assumptions check, devil's advocacy
- Activity clustering — the evidence hierarchy, and commodity tooling as the weakest link
- Levels of attribution: cluster → group → organization → individual → state, and why
  defensive work rarely needs past the first
- Actor naming across vendors: aliases, not a shared namespace
- Pyramid of Pain and why behavioural conclusions outlive indicators

### 1.8 The Intelligence Lifecycle
Grown a third level. The hub keeps the six phases, the report-factory argument, the
critiques and the working-week mapping; the three parts of the loop no other subsection
owns each earn a page.
- The classic cycle: direction → collection → processing → analysis → dissemination → feedback
- Honest critiques of the cycle — where the neat loop breaks against real analyst workflow
- Mapping the abstraction onto a working team's actual week
- The mirror-image loop in §7.2 (detection lifecycle) — same shape, different artifact
- **1.8.1 F3EAD** — the targeting cycle translated to defense phase by phase, exploit as
  the phase defenders waste, wiring the fast loop to the slow one, when it's the wrong model
- **1.8.2 Processing & Enrichment** — the canonical store, dedup as provenance accounting,
  enrichment joins, indicator decay, automation and the hallucination line (ties to §6.5/§6.3)
- **1.8.3 Feedback & Product Health** — the four signals ranked, collection mechanisms,
  detection outcomes as unfiltered feedback, the product portfolio and retiring on purpose

### 1.9 Intelligence Requirements
- Requirements as questions, not topics: the PIR hierarchy and what makes a requirement answerable
- Decomposing a requirement into essential elements of information (EEIs)
- Standing vs. ad hoc requirements; the RFI workflow and its lifecycle
- Collection planning: mapping requirements to sources and exposing coverage gaps — this
  subsection decides *what* to collect; §1.6 is the craft of collecting it
- Review cadence, requirement retirement, and tagging output by the requirement it serves
- Requirements as the honest basis for program metrics: produced-against-requirement vs.
  produced-because-interesting
- Intake ties: §7.2 detection backlog, §4.6 risk register, §9.1 incident lessons

### 1.10 Sharing & Community
- TLP 2.0: what each label actually permits, and the common misreadings
- The ecosystem: ISACs/ISAOs, national CERTs, vendor trust groups, informal peer circles
- Sanitization and tearlines — sharing the behaviour without burning the source (ties to §1.7:
  behavioural conclusions travel better than indicators anyway)
- STIX/TAXII and MISP as sharing transport (format mechanics in §1.6)
- The free-rider problem: what contributing back actually buys
- Legal and contractual constraints on what can leave the building (ties to §4, §9.5)

### 1.11 Running a CTI Program
- Consumers first: mapping stakeholders (SOC, IR, vuln management, GRC, executives) and what
  each actually needs from intelligence
- Tactical / operational / strategic as products for different consumers, not team silos;
  geopolitical and sector threat landscape as the strategic tier's raw material
- Team shapes by scale: the one-analyst function vs. the dedicated team, and where CTI reports
  in the org chart
- Maturity assessment (CTI-CMM) and sequencing what to build first
- Vendor and feed procurement: evaluating against your own requirements (§1.9) rather than
  the vendor's demo scenario
- Program metrics beyond report counts (ties to §7.7)

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

### 2.3 GCP Identity
- Resource hierarchy (org → folder → project) and additive, inherited allow policies
- Basic vs. predefined vs. custom roles; why basic roles are the recurring finding
- Service accounts as principal *and* resource — the `actAs` / `getAccessToken` /
  `serviceAccountKeys.create` escalation primitives
- Default Compute Engine service account with Editor, reached via the metadata server
- Exported JSON keys as GCP's long-lived access key; Workload Identity Federation and GKE
  Workload Identity as the elimination path
- Guardrails: org policy constraints, Policy Analyzer and Recommender, IAM Deny policies

### 2.4 Active Directory & Hybrid Identity
- Why the on-prem directory is still the escalation path *upward* into the cloud
- Kerberos/NTLM design as attack surface: Kerberoasting, AS-REP roasting, delegation
  (unconstrained/constrained/RBCD), ACL paths and shadow admins, DCSync and forged tickets
- AD CS certificate template misconfiguration (the ESC classes)
- Enterprise Access Model, tiering, and the clean source principle; PAWs, LAPS, Protected
  Users, Credential Guard
- Hybrid seam: Entra Connect as Tier 0, PHS vs. PTA vs. ADFS, Golden SAML, seamless SSO
  (`AZUREADSSOACC`), and the cloud → on-prem paths (Intune, Azure Arc)

### 2.5 Multi-Cloud & Federation
- SAML, OIDC, SCIM — how they actually differ
- Federated access patterns across AWS/Azure/GCP
- Secrets management (Vault, Secrets Manager, Key Vault)
- Machine-to-machine auth and mTLS

### 2.6 Frameworks
Grown a third level. The hub keeps the three-framings framing and the where-each-fails
comparison; each framing earns a page.
- Comparing frameworks: where each fails in practice
- **2.6.1 Zero Trust** — NIST SP 800-207 machinery (PDP/PEP, identity as perimeter,
  microsegmentation), the CISA ZTMM gradient and sequencing, the three failure modes
  (purchase, rebranding, human-only assumptions)
- **2.6.2 Zero Knowledge** — ZK proofs in identity terms, PAKE/OPAQUE, verifiable
  credentials and selective disclosure, maturity honestly assessed (crypto ready,
  operations young)
- **2.6.3 Zero Knowledge Trust** — the five hard questions of delegated judgment, the
  trust paradox, VettID's ZKT framework presented with attribution (CC BY 4.0 corpus at
  github.com/vettid/zero-knowledge-trust) plus our independent assessment, and the
  standards substrate (RFC 8693, SPIFFE, MCP authorization, confidential computing)

### 2.7 Governance of Identity
- Joiner/mover/leaver automation
- Entitlement review at scale
- Identity threat detection (ITDR)

### 2.8 Non-Human Identity
The cross-provider program for the identities that outnumber humans. §2.1–2.3 own each
provider's mechanics, §2.5 owns federation and secrets tooling, §2.6 owns agentic identity
frameworks; this subsection owns the estate-wide problem — the machine mirror of §2.7.
- What counts as an NHI: service accounts, roles, API keys, tokens, certificates, pipeline
  identities, agents — and why they are exempt from everything built for humans (no JML,
  no MFA, no owner)
- Sprawl and ownership: discovery and inventory across providers, SaaS tenants and CI
- Over-permissioning at machine scale; where CIEM, secrets management and ITDR each fit
  (one question per category, deliberately)
- The elimination path: short-lived credentials, OIDC workload identity federation
  (the §3.4 CI/CD case generalized), SPIFFE/SPIRE, brokered access
- Lifecycle: issuance, rotation, attestation, revocation — JML for machines
- The agent wrinkle: autonomous consumers of NHIs at machine speed (ties to §2.6, §6.4)
- Reference: OWASP Non-Human Identity Top 10

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
Grown a third level. OWASP Top 10 walked through with real code. The hub reframes the seven
families by the failure mode underneath them — untrusted-data-into-an-interpreter (injection,
deserialization, SSRF), an absent check (broken authorization, race conditions), and trusting
your own supply (secrets, dependencies) — and indexes the children; each family is its own page.
- **3.2.1 Injection** — SQL, command, template/SSTI, LDAP/NoSQL, second-order; parameterisation
- **3.2.2 Deserialization & Object Injection** — pickle/Java/YAML, gadget chains, data-only formats
- **3.2.3 SSRF & Cloud Metadata** — the 169.254.169.254 chain, allowlist-not-blocklist, IMDSv2
- **3.2.4 Broken Object-Level Authorization** — BOLA/BFLA/BOPLA as absent checks, data-layer fix
- **3.2.5 Race Conditions & TOCTOU** — check-use gaps, atomicity via conditional updates and constraints
- **3.2.6 Secrets in Source Control** — git history, rotation over deletion, push protection
- **3.2.7 Dependency Confusion & Supply Chain** — namespace confusion, lockfiles, resolver config;
  the provenance/SLSA half stays in §3.4

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

### 3.6 API & Cloud-Native AppSec
- OWASP API Top 10
- Container and image security
- IaC scanning (Terraform, CloudFormation, Bicep)
- **3.6.1 Kubernetes Workload Security** — image provenance and signing, admission control as a
  pipeline gate, the manifest as reviewable code, workload identity for outbound auth. The
  *workload* half of the Kubernetes split; cluster hardening is §8.3. First subsection to grow
  a third level — see Structural Notes.

---

## 4. Governance, Risk & Compliance
`/grc`

### 4.1 Common Frameworks
Third subsection to grow a third level, and the widest split so far: one page per framework
rather than by kind. The hub keeps the durable framing (frameworks differ in kind not detail;
what they share; choosing without collecting them all) plus a kind-grouped index; each child
is a real deep-dive on one framework.
- **4.1.1 NIST CSF 2.0** — the six functions as a coverage map, Tiers and Profiles, Govern
- **4.1.2 NIST SP 800-53** — the catalog and families, 800-53B baselines, OSCAL, the crosswalk
  denominator (and 800-171 as the near sibling)
- **4.1.3 ISO/IEC 27001 & 27002** — ISMS vs. control guidance, Annex A and the SoA, the
  certification cycle, the 27000 family
- **4.1.4 SOC 2** — Trust Services Criteria, Type I vs. II, reading the report, SOC 1/2/3
- **4.1.5 FedRAMP** — 800-53 baselines, authorization paths and the 3PAO, ConMon, 20x
- **4.1.6 PCI DSS v4.x** — the twelve requirements, scope reduction, the customized approach,
  validation (SAQ/ROC/ASV)
- **4.1.7 CIS Controls & Benchmarks** — the prioritized Controls and Implementation Groups, the
  prescriptive Benchmarks, why they double as posture baselines
- **4.1.8 HITRUST CSF** — harmonization of many sources, the e1/i1/r2 tiers, inheritance
- **4.1.9 CMMC** — certification of NIST 800-171, the three levels, FCI vs. CUI, the DFARS basis

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

### 4.4 Compliance Mapping
- Control crosswalks and the common-control approach
- Mapping one control set to many frameworks (OSCAL, SCF)
- Evidence collection and audit readiness
- Avoiding duplicate work across SOC 2 / ISO / FedRAMP

### 4.5 GRC Engineering
- Compliance as code (OSCAL, OPA/Rego, Conftest)
- Automated evidence pipelines
- Continuous control monitoring
- Policy-as-code and drift detection
- Treating auditors as a downstream consumer of an API

### 4.6 Risk Management
- Risk register mechanics
- Qualitative vs. quantitative (FAIR)
- Third-party/vendor risk
- Exception and acceptance workflows

---

## 5. Penetration Testing & Red Teaming
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
Second subsection to grow a third level — the five tool families are the split, and the hub
keeps the phase-independent judgement (passive-before-active, loud-has-a-place). Format
throughout: command → what it does → what the output means → what to do next.
- **5.3.1 Recon & Enumeration** — nmap, masscan, amass/subfinder, dnsx, httpx, ffuf/feroxbuster
- **5.3.2 Web Application Testing** — Burp workbench, sqlmap, Nuclei, parameter and JWT tooling
- **5.3.3 Cloud** — ScoutSuite/Prowler posture, Pacu, ROADrecon/AzureHound, the GCP
  service-account path; posture-before-foothold vs. enumeration-after
- **5.3.4 Active Directory & Identity** — BloodHound, NetExec, Impacket (Kerberoast/DCSync/relay),
  Kerbrute, Responder, Certipy (AD CS ESC); the offensive mirror of §2.4
- **5.3.5 C2 & Post-Exploitation** — Sliver/Havoc/Mythic, listener and implant profiles,
  the detection surface; infrastructure and OPSEC depth stays in §5.5

### 5.4 MITRE ATT&CK
- Matrix structure: tactics, techniques, sub-techniques
- Cloud and container matrices
- ATT&CK Navigator for coverage mapping
- Purple teaming: Atomic Red Team, Caldera
- Mapping findings to ATT&CK for defensive handoff
- D3FEND and mitigation mapping

### 5.5 Red Team Operations
- Pentest vs. red team: breadth-first scope coverage vs. objective-based, stealth-constrained engagements
- Engagement design: objectives, rules of engagement, deconfliction, white cell
- Threat-informed adversary emulation — selecting an actor and emulating its TTPs
- C2 infrastructure and tradecraft (Sliver, Havoc, Mythic); redirectors and infrastructure OPSEC
- Detection evasion as a *measurement tool* — what got caught, what didn't, and why
- Blue team handoff: turning the engagement timeline into detection gaps (ties to §7.4)
- Measuring an engagement by defender response, not just objectives achieved

### 5.6 Report Writeups
- Report anatomy: exec summary, scope, methodology, findings, appendices
- Finding structure: description, impact, evidence, reproduction, remediation
- Severity ratings and justifying them
- Screenshot and evidence hygiene
- Retest and closure reporting
- Writing for the developer who has to fix it

### 5.7 Specialized Testing
- API and GraphQL
- Mobile
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

### 6.6 Securing AI Systems
- Prompt injection (direct and indirect)
- OWASP Top 10 for LLM Applications
- Tool-use authorization and blast radius
- Model supply chain
- Ties directly to §2.6 agent identity

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
- Data-plane logs are off by default on every provider (CloudTrail data events, Azure
  storage logs, GCP Data Access logs) — the standing coverage gap that surprises during IR

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

### 7.6 SOAR & Automation
- Automation candidates: enrichment, triage, containment, notification
- Playbook design and safe-guardrails for automated response
- Agent-assisted triage (ties to §6.5)
- Human approval gates for destructive actions

### 7.7 Program Metrics
- MTTD/MTTR and their limitations
- Coverage vs. capability reporting
- Detection engineering team models and staffing

---

## 8. Cloud & Infrastructure Security
`/cloud-infra`

The substrate. Every other pillar touches cloud through its own lens — §2 asks who may act
on it, §3 what runs on it, §5 how to break it, §7 how to see it. This section is the
platform itself: how it's architected, hardened, keyed, and kept in a known-good state.

**Boundaries.** §2 owns identity *policy* (evaluation logic, roles, federation); §8 owns
org-level *guardrail architecture* (SCPs and Azure Policy as blast-radius design). §3.6
owns IaC and container *scanning tools*; §8.5 owns the posture *program* they feed. Where
both could apply, the test is whether the subject is the workload or the substrate.

### 8.1 Cloud Architecture & Landing Zones
- Multi-account / multi-subscription structure as blast-radius design
- AWS Organizations and Control Tower, Azure management groups, GCP folders
- Environment separation, shared services, hub-and-spoke topologies
- Org-level guardrails: SCPs, Azure Policy, GCP Org Policy (architecture, not identity — see §2.1)
- Landing zones as code; baseline drift and re-baselining

### 8.2 Network Security & Segmentation
- VPC/VNet design, subnet tiering, private endpoints and service endpoints
- Egress control and DNS security — the exfiltration path nobody instruments
- Microsegmentation and east-west controls
- TLS termination, mTLS and service mesh
- ZTNA vs. VPN, and where each actually helps (ties to §2.6)

### 8.3 Workload & Container Security
- Minimal base images, image provenance and admission control (OPA/Gatekeeper, Kyverno)
- Kubernetes hardening: pod security standards, network policy, namespace and RBAC design
- Runtime security and workload isolation
- Serverless and managed-service posture — what the provider does and doesn't cover
- Host hardening and CIS benchmarks

### 8.4 Cryptography & Key Management
Grown a third level. The hub keeps what encryption defends against, key hierarchies and
envelope encryption, and the secrets-architecture boundary with §2.5; PKI and post-quantum
each earn a page, with condensed sections pointing down.
- KMS and HSM design, key hierarchies, envelope encryption
- Encryption at rest and in transit — what each actually defends against, and what it doesn't
- Secrets architecture vs. secrets management tooling (ties to §2.5)
- **8.4.1 PKI & Certificate Lifecycle** — certificates as §2.8's other credential class,
  internal CA design as trust blast-radius, ACME and shrinking public lifetimes forcing
  automation, revocation's failure and short lifetimes as the honest substitute, the
  expired-cert outage as a key-management failure (inventory feeds §7, signing feeds §3.4,
  admission control in §8.3 consumes it)
- **8.4.2 Post-Quantum Migration** — harvest-now-decrypt-later and the
  confidentiality-lifetime deadline, the NIST standards (ML-KEM/ML-DSA/SLH-DSA) and hybrid
  TLS, crypto agility as the real deliverable, inventory-first migration as a §4 evidence
  program sequenced by §10.3 data lifetime

### 8.5 Posture Management & Infrastructure as Code
- CSPM / CNAPP: what posture tooling genuinely catches, and what it only appears to
- IaC security across Terraform, CloudFormation and Bicep (tooling detail in §3.6)
- Drift detection and closed-loop remediation
- Benchmarks and well-architected security pillars as baselines
- Prioritizing posture findings so the queue stays finite (ties to §1.4)

### 8.6 Resilience & Recovery
- Backup and restore as a security control, not an ops concern
- Immutable and air-gapped backups; restore testing as the only real evidence
- DDoS and edge protection
- Multi-region failover and its security implications

### 8.7 The Shared Responsibility Model
The foundational framing the rest of the pillar assumes. Foundational-maturity anchor page.
- The line by service model: IaaS, PaaS, FaaS, SaaS — what the provider takes at each step,
  and what never transfers (configuration, identity, data, egress)
- Provider framings compared: AWS's model, Azure's service-tier version, GCP's "shared fate"
- Where the model breaks: managed-service gray zones, cross-tenant vulnerabilities, and the
  honest critique that the line moves only by contract, never by assumption
- Misconfiguration as the customer-side constant — why nearly every cloud breach lands
  above the line
- The model as a working tool: control-by-control ownership mapping for audits (ties to §4.4)
  and for incident scoping (ties to §9.1)

### 8.8 SaaS Security
- The posture problem: hundreds of admin consoles, no common control plane, insecure-by-
  default settings that nobody owns
- SSPM and the four control planes: identity, configuration, data exposure, telemetry
- OAuth app governance — the §2.2 consent-grant attack surface, managed as posture rather
  than incident
- Shadow SaaS and tenant sprawl discovery
- SaaS audit-log quality variance, and how detection inherits it (ties to §7.3)
- Boundaries: §2 owns the identity plane itself, §10.5 owns data egress; this subsection
  owns the SaaS platform posture program

---

## 9. Incident Response & Digital Forensics
`/dfir`

What happens once prevention has already failed. §7 builds the detections that fire; this
section is everything after the alert is believed — containment, evidence, reconstruction,
and the answer to "what actually happened".

**Boundary with §7.** §7 owns detection engineering: writing, testing and maintaining the
rules. §9 owns response and investigation. Threat hunting stays in §7.5 because it is
hypothesis-driven discovery against a healthy environment; forensics here is
reconstruction of a known incident.

### 9.1 Incident Response Operations
- IR lifecycle (NIST SP 800-61) and playbook design
- Triage workflows, severity declaration, and incident command
- Identity-centric containment — usually the fastest lever (ties to §2)
- Cloud IR: snapshotting, credential revocation, blast radius scoping (ties to §8)
- Forensic readiness: the logging, retention and access decisions made *before* an incident
  that determine what an investigation can ever recover (ties to §7.3)
- Communications during an incident: stakeholders, counsel, customers, regulators
- Postmortems and blameless retrospectives

### 9.2 Digital Forensics
Grown a third level. The hub keeps the discipline — order of volatility, disk and memory
forensics, anti-forensics and the absence-of-evidence argument — plus a condensed cloud
section pointing down; the workload-type acquisition detail moved to the child.
- Order of volatility and sound acquisition
- Disk forensics: file systems, deleted data, artefacts of execution
- Memory forensics (Volatility) — what only RAM will tell you
- Endpoint, browser and mobile artefacts
- Anti-forensics and what absence of evidence is worth
- **9.2.1 Cloud Forensics** — forensic readiness as the early acquisition phase, then
  evidence by workload type: VM (snapshots, the memory problem, autoscaling races),
  container (image / writable layer / node), serverless (no body — logs, change history,
  artefact diffs), SaaS (vendor-decided evidence, the IdP as cross-SaaS backbone);
  bounded throughout by the §8.7 responsibility line

### 9.3 Timeline & Investigation Method
- Building a super-timeline and pivoting across artefact sources
- Root cause vs. proximate cause; establishing patient zero
- Scoping: proving the boundary of a compromise rather than assuming it
- Hypothesis discipline and confidence language under time pressure (ties to §1.1)
- Documenting an investigation so a second analyst reaches the same conclusion

### 9.4 Malware Analysis & Reverse Engineering
- Triage: static properties, strings, packing, similarity
- Dynamic analysis and sandboxing; detonation safety
- Unpacking and basic RE workflow
- Extracting IOCs and behavioural signatures that feed §7 and §1
- Capability assessment: what the sample can actually do

### 9.5 Evidence Handling & Legal
- Chain of custody and defensible process
- Legal hold, privilege, and working with counsel
- Regulatory breach notification clocks (ties to §4)
- Working with law enforcement and external IR firms

---

## 10. Data Security & Privacy Engineering
`/data-privacy`

Protecting the thing all of it exists to protect. §4 owns the obligation — what the
regulation requires. This section owns the engineering: how data is found, classified,
minimised, transformed and deleted in systems that are already running.

**Boundary with §4 and §8.** §4 is the regulatory requirement and audit evidence. §8.4 is
the key material and cryptographic primitives. §10 is the data itself — its lifecycle,
shape, and the controls applied to it.

### 10.1 Classification & Discovery
- Classification schemes that survive contact with users
- Automated discovery and labelling at scale
- Data mapping and lineage: knowing where it flows, not just where it sits
- Shadow data — copies, exports, backups, and analytics stores

### 10.2 Protection & Transformation
- Tokenization, masking and format-preserving encryption
- Pseudonymization vs. anonymization, and why the difference is legal as well as technical
- Re-identification risk and k-anonymity in practice
- Differential privacy — where it genuinely applies
- Encryption in use: confidential computing and its limits (ties to §8.4)

### 10.3 Lifecycle, Retention & Deletion
- Retention schedules and defensible deletion
- Deletion in systems that were never designed to forget — backups, logs, caches, derived data
- Right-to-erasure requests as an engineering problem
- Residency and sovereignty; cross-border transfer mechanisms (ties to §4.3)

### 10.4 Privacy Engineering
- Minimization and purpose limitation as design constraints
- Privacy by design, and threat modelling for privacy (LINDDUN)
- Consent and preference management as system state
- Privacy impact assessments that inform design rather than document it

### 10.5 Data Loss Prevention & Egress
- DLP programme design, and why most DLP is theatre
- Egress paths: endpoint, SaaS, cloud storage, AI tooling (ties to §8.2)
- Insider risk and the detection tradeoffs it forces (ties to §7)

### 10.6 Data Governance for AI
- Training-data provenance, licensing and consent
- PII in prompts, embeddings and vector stores (ties to §6.2)
- Model memorization and extraction risk
- Retention and deletion when data is baked into weights

---

## Cross-Cutting Threads

The site's differentiator is the connective tissue. **These are now written**, as pages under
`src/content/docs/threads/` — a directory deliberately *not* in the `pillars` table in
`astro.config.mjs`, so it never becomes an eleventh sidebar group. Each thread declares a spine
pillar in frontmatter (satisfying the schema and the cross-link check trivially, since a thread
is maximally cross-pillar) but lives in `threads/`, takes a neutral graph node colour rather than
a pillar colour, and is surfaced through the homepage's "Cross-cutting threads" section plus the
graph. This resolves the old open question about where threads live: neither pillar-of-origin nor
an eleventh pillar, but a sidebar-invisible shared home. They are the graph's densest connector
nodes by design — each spans five to eight pillars.

Ten written (the set featured on the homepage):

- **[One finding, five lenses](/threads/one-finding-five-lenses/).** IAM misconfig through pentest, AppSec, GRC, detection and intel — reported five ways. (Merges the original "pentest finding → …" and "IAM misconfig as shared root cause" entries.)
- **[The purple team loop](/threads/purple-team-loop/).** §5.4/§5.5 emulation → §7.4 validation → §7.2 backlog → §1.4 prioritization.
- **[Agentic AI identity](/threads/agentic-ai-identity/).** §2.6 (Zero Knowledge Trust) × §6.4 (orchestration) × §6.6 (securing AI).
- **[Risk prioritization as the universal problem](/threads/risk-prioritization-everywhere/).** §1.4 methods applied to AppSec, cloud posture, the detection backlog and the risk register.
- **[The substrate trace](/threads/the-substrate-trace/).** One network path as §8.2 flaw, §5.2 pivot, §7.3 blind spot, §4.x control gap.
- **[Alert to answer](/threads/alert-to-answer/).** §7 fires, §9.1 contains, §9.3 reconstructs, §9.4 analyses — lesson returns to §7.2.
- **[Deletion nobody can prove](/threads/deletion-nobody-can-prove/).** §10.3 defensible deletion vs. §4 audit evidence vs. §9.2 forensics.
- **[The telemetry gap](/threads/the-telemetry-gap/).** §7.3 log coverage as the shared prerequisite for detection, IR, hunting and audit.
- **[Communication as a technical skill](/threads/communication-as-a-technical-skill/).** §1.5 applied to §5.6 reports and §4.x audit narratives.
- **[The contract is the control](/threads/the-contract-is-the-control/).** For anything you don't operate, the leverage lives at signature time — §9.2.1 evidence tiers, §8.8 telemetry floors and the SSO tax, §8.7 responsibility acceptance, §1.11 feed procurement, §4.6 third-party risk done as clauses rather than questionnaires.

Not yet written (candidates): **Automation of the compliance-to-evidence pipeline**
(§4.5 × §6.5); **Encryption that proves nothing** (§8.4 key management vs. §4.x
"encrypted at rest" as an audit answer); **One line, five consequences** (the §8.7
responsibility line read through §4.4 control inheritance, §9.2.1 forensic reach, §8.8's
SaaS remainder, and §10's controller/processor split); **One incident, fully exploited**
(the learning sequel to Alert to answer: §9.1 retro → §1.8.1 exploit → §1.9 requirements
→ §7.2 detections → §1.10 tearline → §8 architecture fix).

---

## Structural Notes

- **Depth: three levels of content, two levels of navigation.** Pillar -> subsection ->
  article. A subsection stays a single page until it has enough to say, then becomes a
  directory: the existing page moves to `index.mdx` and becomes a hub that indexes its
  children, which sit beside it and are hidden from the sidebar. The sidebar therefore never
  grows past pillar -> subsection no matter how much lands underneath, and third-level
  articles are found through the hub, search, the graph and backlinks instead. Mechanics in
  `AGENTS.md`. Nine subsections have grown a third level so far, across a spectrum of split
  width: `appsec/api-cloud-native` and `dfir/digital-forensics` each split off a single
  sibling article (`kubernetes-workload-security`, `cloud-forensics`);
  `cloud-infra/cryptography-key-management` split into two (PKI & certificate lifecycle,
  post-quantum migration); `threat-intel/risk-prioritization` split into three
  (the CVSS / EPSS+KEV / SSVC scoring systems); `threat-intel/intelligence-lifecycle` into
  three (F3EAD, processing, feedback — the parts of the loop no other subsection owns);
  `iam/frameworks` into three (Zero Trust, Zero Knowledge, Zero Knowledge Trust);
  `pentest/tools-commands` into five phase pages; `appsec/insecure-coding` into seven
  vulnerability families; and `grc/common-frameworks` into nine, one per framework. In every case the hub is reduced to
  durable framing plus an index and the detail moves down, and the sidebar stays at
  pillar -> subsection.
  A fourth level is not planned — if a third-level article needs children, that is evidence
  the subsection above it should have been split.
- **Per-section landing page:** what this is, why it matters, how it connects to the other six, then subsection index.
- **Content types to support:** deep-dive articles, cheatsheets/command references, templates (report, policy, threat model), walkthroughs/labs, and a glossary.
- **Suggested tagging axes:** section, cloud provider (AWS/Azure/GCP/multi), framework (NIST/ISO/SOC2/FedRAMP), maturity level (foundational/practitioner/advanced), content type.
- **Recommended cross-link discipline:** every article links to at least one article in a different top-level section.

### Open Questions
- Should Frameworks (Zero Trust / ZK / ZKT) stay under IAM or graduate to its own top-level section as agentic identity content grows?
- Does AI/Automation split into "AI engineering" and "securing AI" once §6.6 fills out?
- Where exactly is the Threat Intel (§1) / Detection Engineering (§7) boundary? Current split: §1 is analysis and communication of adversary knowledge, §7 is operationalizing it. Hunting (§7.5) is the blurriest case.
- ~~Does Incident Response warrant its own pillar?~~ Resolved: graduated to §9 alongside forensics and malware analysis. §7 is now purely detection engineering.
- ~~Is threat hunting (§7.5) on the right side of the §7/§9 line?~~ Resolved once both were written: hunting is discovery in an environment presumed healthy, investigation is reconstruction of a known incident. The blur during a long-running compromise resolves on declaration — the activity changes discipline when an incident is declared, taking on evidence-handling, documentation and scope-proof obligations. Same analyst, same tools, different standard. Stated in §7.5 and §9.3.
- Does §10.6 (data governance for AI) stay in Data Security, or migrate to §6 as that pillar's "securing AI" half fills out?
- Does IaC security live in §3.6 (as a scanning tool) or §8.5 (as a posture program)? Current split is tooling vs. programme; watch whether that holds as both fill out.
- **Where does a glossary live?** `contentType: glossary` exists in the schema and nothing uses it. A site-wide glossary belongs to no pillar, but `src/content.config.ts` requires `pillar` on everything except `contentType: landing`, so it needs either a schema exemption or per-pillar glossaries. Per-pillar is the cheaper answer and probably the better one — a term means something slightly different in each, and the difference is the interesting part.
- **Where do the cross-cutting threads live?** Twelve are listed above and none are written, and by construction each belongs to two or more pillars. Options: file each under the pillar it starts from, or add an eleventh non-pillar section. Note the graph constraint if a new section is added — the colour slots are exhausted at ten (see `AGENTS.md`).
- **Section numbers in published prose.** Pages refer to "§8.4" and "§2.6", but the numbering only exists in this file, which is not published — so a reader has no way to resolve them. Either publish this document, or convert the references to named links. Roughly two dozen occurrences across the pillar overview pages.

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
pillar:       enum [threat-intel, iam, appsec, grc, pentest, ai-automation, detection-eng, cloud-infra, dfir, data-privacy]
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
- Compliance framework crosswalk table (§4.4), filterable
- Chart components for §1.3 data visualization articles

### Build Order
1. Scaffold Starlight, deploy a near-empty site to Pages, wire the custom domain. Prove the pipeline first.
2. Configure sidebar with all 7 pillars + content schema.
3. Write pillar landing pages (7 pages) — establishes voice and the interrelationship framing.
4. Seed 2–3 real articles per pillar, chosen to demonstrate cross-links.
5. Design pass: typography, color, custom landing page.
6. Interactive components.

**Note:** don't skip step 1. Custom domain DNS and SSL provisioning are the most common source of early friction; solve it while the site is trivial.
