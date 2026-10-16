# Webshare.space: portfolio case-study evidence brief

> **Temporary working file. Do not commit.** Source material for a personal portfolio page.
> Built read-only from `main` at `981d0812` (2026-10-15): code, `webshare/docs/`, and Git history.
> No GitHub issues, PR review threads, dashboards, analytics or production systems were consulted.
>
> Sections A–D are written to be public-safe. The **Internal source index** at the end names PRs
> and documents so you can check each claim. Keep that part private.

## Owner-approved portfolio scope — October 16, 2026

The owner confirmed the following summaries are accurate and may be shown publicly:

- Integrated browser-side encryption.
- Built multipart upload across the browser and Rust backend.
- Rebuilt downloads to recover from interruptions, with page-reload recovery on supported browsers.
- Reduced unnecessary initial JavaScript loading.

The owner also confirmed and approved both measurements for the portfolio:

- **62% smaller initial gzipped JavaScript payload**, explicitly labeled as a build measurement.
- **Transfers tested up to 15 GB**, explicitly labeled as sandbox results.

Use **built** or **implemented**; production deployment remains unconfirmed. This approval is
limited to these summaries and measurements. It does not approve other inferred reasoning,
design authorship, internal technical details, provider names, screenshots, or stronger security
claims elsewhere in this brief. Mention Webshare.space without an external product link.
The original evidence labels and follow-up questions below are retained; this section resolves
only the specific confirmations listed above.

## How to read the labels

| Label | Meaning |
|---|---|
| **[OWNER]** | You supplied this. Not checked against anything |
| **[REPO]** | Shown by code, docs or Git history on `main` |
| **[REPO, yours]** | Shown by history, and the commits are authored under your identity |
| **[INFERENCE: owner confirmation required]** | A plausible explanation drawn from the evidence. It is not a recorded fact |
| **[UNKNOWN]** | Nothing in the repository settles it |
| **[PROPOSED VERIFICATION]** | A check you could run. It is not evidence |

Status vocabulary: **implemented** (code on `main`), **tested** (a recorded test or run result),
**released** (reached production, which the repository cannot show), **planned** (a roadmap item).

**Attribution basis.** You started on **2025-04-15** [OWNER]. Until October 2025 you and a
colleague worked on a shared frontend branch and reviewed each other's code. It merged into `main`
on 2025-10-09 [OWNER]. Per-commit attribution on `main` therefore starts that day. It covers 207
of `main`'s 489 commits, authored under your Git identity.

---

# A. Evidence-based brief

## 1. Product context and starting point

### What the app does

**[REPO]** Webshare.space is a web app for sharing files with end-to-end encryption. A sender's
browser encrypts the files before upload. The recipient's browser decrypts them after download.
The service stores ciphertext plus encrypted metadata, and hands out short-lived storage links.

**Who it is for. [INFERENCE: owner confirmation required]** People who need to send files,
including large ones, to someone without trusting the hosting service with the contents. No
target-segment or persona document was found in the repository.

### Sender-to-recipient journey (plain language)

1. **Create a share.** The sender opens the site, accepts the user agreement and creates a share.
   The browser generates a random access code and a random file key. **[REPO]**
2. **Configure it.** The sender can set an expiration date and a message (the message is also
   encrypted), and choose between two access modes. "Anyone with the link" puts the code in the
   part of the link the browser never sends to a server. "Require access code" makes the recipient
   type it. **[REPO]**
3. **Add files.** Each file is encrypted in the browser and uploaded in parts, with a progress bar
   and per-file interrupt, resume and remove actions. **[REPO]**
4. **Enable and send.** The sender enables the share and sends the link or a QR code. An enabled
   share cannot be changed, but it can be disabled. **[REPO]**
5. **Open and preview.** The recipient opens the link, enters the code if asked, and sees the
   file list. Some file types can be previewed in the page. **[REPO]**
6. **Download.** The recipient confirms, and the browser fetches, decrypts and saves the files.
   It saves one file directly, or several as a ZIP. Each file can be paused and resumed. On
   supported browsers the transfer survives dropped connections and page reloads. **[REPO]**

A payment step for enabling shares is implemented in code (a pricing model, a payment modal and
a Stripe integration). **[REPO]** Whether it is live is **[UNKNOWN]**.

### Features central to that journey

| Feature | Why it is central |
|---|---|
| Browser-side encryption and decryption | It is the product's core promise |
| Access code and the two access modes | The code gates access and unlocks the file key |
| Large-file upload (multipart) | Without it, real-world file sizes fail |
| Recipient download pipeline (stream, decrypt, save, resume) | This is where the recipient actually gets the files |
| Share lifecycle (draft → enabled → disabled, expiration) | It controls what a recipient can see, and when |

Secondary features: file preview, QR code, English/Vietnamese UI, SEO pages and payments.

### State of the product before the E2EE work

**[OWNER]** You joined on 2025-04-15, when the web frontend was at an early stage. From then until
October 2025 you and a colleague built it on a shared branch, which merged into `main` on
2025-10-09. The state below therefore includes your own first six months of work. It is a
baseline for the later stories, not a description of what you inherited.

**[REPO] What the repository shows just before the E2EE work (early November 2025):**

| Area | State |
|---|---|
| Frontend stack | React 19, Vite, JavaScript (no TypeScript files), Redux Toolkit, MUI, Tailwind |
| Encryption | Storage-side encryption with a key supplied per request. No browser-side encryption library in the frontend |
| Size limits | 100 MB per file and 1 GB per share, set in backend config |
| Download | Streaming through a third-party service-worker helper (StreamSaver), with ZIP for multiple files |
| Telemetry | The web-vitals library was already reporting INP, LCP and FCP to the backend |
| Testing | Unit and Playwright suites existed, both mostly written by a colleague in October 2025 |

### Constraints supported by evidence

| Constraint | Evidence [REPO] |
|---|---|
| **Privacy: the server must not see plaintext** | Encryption and decryption run only in the browser. The server handles ciphertext, encrypted metadata and an Argon2-derived verifier |
| **Browser memory** | An early upload path held about 2 GB of RAM for a 1 GB file and crashed the tab. Downloads that buffered a whole file killed tabs too. Six parallel 16 MiB ranges killed the iPhone's service worker |
| **Network path timeouts** | A reverse proxy with a ~22 s request timeout returned 502 on 100 MB part uploads over slow links |
| **Short-lived storage links** | Download links last seconds, but a multi-GB transfer runs much longer |
| **Chained encryption format** | Each block needs the state left by the one before it, so you cannot decrypt an arbitrary byte range on its own |
| **Browser differences** | WebKit (all iOS browsers) needed special handling. Firefox reaches storage over HTTP/1.1 (six connections). Specific Safari versions cut downloads short. Private windows may have no service worker |
| **Storage-provider limits** | At most 10,000 parts per upload. Every part except the last must be the same size. The provider rejected one checksum mode. CORS must expose specific headers |
| **Mobile devices** | Smaller default part sizes and a lower size ceiling on phones. iOS reports storage figures that are unreliable for preflight checks |

### Current limitations and actual file-size limits

| Limit | Value | Status |
|---|---|---|
| Max file size, desktop browsers | 5 TB | **Configured default** [REPO]. Not tested at that size |
| Max file size, mobile browsers | 1 TB | **Configured default** [REPO]. Not tested at that size |
| Files per share | 20 | Configured [REPO] |
| Total size per share | No cap (removed May 2026) | Implemented [REPO, yours] |
| Largest transfer with recorded results | **15 GB** (download on desktop Chrome, Firefox, Mac Safari and iPhone Safari; upload on Firefox/Windows) | **Tested**, sandbox only [REPO] |
| Upload interrupt/resume | Files ≤ 10 GB, **same session only** | Implemented [REPO]. After a page refresh, unfinished uploads are cleaned up, not resumed |
| Download resume across a reload | Service-worker save path only | Implemented and tested on sandbox [REPO]. The fallback "Blob" path restarts |
| Download after the tab is closed | Not supported | Documented limit [REPO] |
| Native share sheet | ≤ 200 MB, single non-ZIP file | Implemented [REPO] |
| Fallback (Blob) save on WebKit | ≤ 200 MB | Implemented [REPO]. Measured: 900 MB killed an iPhone tab, 100 MB worked |
| Android download path | Not run in the parallel-fetch device sessions | Gap [REPO] |
| Production deployment of any item above | | **[UNKNOWN]** |

**Outdated or conflicting documentation to avoid quoting:**

- One multipart PR description says "6 GB" limits. A later change superseded it.
- The frontend multipart guide still says encryption runs on the main thread with 100 MB parts.
  The code now encrypts in a Web Worker and sizes parts between 100 MB and 512 MB.
- An earlier review section assumes 24-character access codes. Generated codes are 6 characters
  now, and the maximum length allowed is 24.
- Earlier docs and one PR describe a 2 GB "Blob vs stream" size threshold. It has been removed.

---

## 2. Your role and collaboration

### Frontend responsibilities and substantial changes

**[OWNER]** Full-stack Developer since 2025-04-15, responsible for the entire frontend. From April
to October 2025 you built it with a colleague on a shared branch.
**[REPO, yours]** Since that branch merged, you authored 183 of 208 frontend commits on `main`, and
every frontend commit from March 2026 onward except two small ones by the founder. The colleague
kept contributing frontend work (UI, Playwright, mobile) until January 2026.

Substantial frontend work under your identity, grouped:

| Area | Period | What |
|---|---|---|
| E2EE on the web client | Nov 2025 – Jan 2026 | Encryption utilities, key derivation in a Web Worker, encrypted create-share, upload, download, access-code change and metadata. Unit tests for the encryption modules |
| QA rounds for the public beta | Dec 2025 – Jul 2026 | Dozens of fixes labeled "QA2"…"QA5 – Public Beta" |
| Multipart upload integration | Mar – Jul 2026 | Streaming encrypt-and-upload, part checksums, progress, retries, interrupt/resume/cancel |
| Encrypted share message | May 2026 | End-to-end encryption of the share message, plus backward compatibility |
| Internationalization | Feb 2026 | English and Vietnamese UI and documents |
| Security headers / CSP | Mar – Apr 2026 | Content Security Policy enforcement, HSTS preload |
| SEO | Jun – Aug 2026 | Static prerendering of public routes, structured data, sitemap and robots |
| Performance | Jul – Sep 2026 | Self-hosted font, lazy routes, vendor chunk split, deferred crypto loading |
| File preview | Aug 2026 | Recipient-side preview, PDF rendering, ciphertext cache with prefetch budget |
| Payments UI | Jul – Sep 2026 | Payment plan, modal, enable gate |
| Recipient download pipeline | Sep – Oct 2026 | Rework, failure-mode mapping, resumable download, service-worker sink, parallel range fetch, cleanup roadmap |
| Testing | Throughout | Most Playwright commits (35 of 45). Unit tests across utils, store, workers, encryption and hooks. 100 unit-test files on `main` |
| Team tooling | 2026 | Project AI-assistant guidance and skills for code review, unit tests and Playwright tests |

### What your multipart-upload backend work covered

**[REPO, yours]** The first backend PR for multipart upload (Rust/Actix, March 2026) added:

- five endpoints: start an upload, presign a part URL, list received parts, complete and abort;
- multipart operations in the storage-wrapper library (about 300 lines of yours remain there);
- the size-limit config change from 100 MB to multi-GB, with the types widened to 64-bit;
- error mapping for the storage provider's multipart errors;
- a "list parts" recovery endpoint for a refreshed or crashed client;
- a fix for a stale abort after a complete succeeded but the registry write failed;
- the first backend multipart documentation.

Later you removed the per-share size cap in backend and frontend (May 2026).

**[OWNER]** The first version was complete and worked well in use.
**[REPO]** History supports that. About a month after it merged, the team removed the old
single-step upload endpoints "in favor of the existing multipart flow everywhere". So your
version became the only upload path. The founder's later work changed it for two reasons, and
neither was a defect fix:

| Kind | What changed |
|---|---|
| Reorganization | The handlers were moved onto the shared share-state pattern every endpoint now uses. The PR describes it as a refactor with "behavior preserved" |
| New product rules elsewhere | Enabled shares became immutable, storage quotas were removed, files move to their final storage location when a share is enabled, completion checks the assembled size for billing, and storage calls are timed |

Line counts shift with this kind of reorganization: about 260 of ~1,080 lines in today's handler
still trace to you. That is not a measure of how much of the design survived. Suggested framing:
**"I designed and built the multipart upload backend; the team later reorganized it into the
shared share-state model and extended it for payments."**

### Responsibilities that belonged to others or to existing systems [REPO]

| Area | Owner (by history) |
|---|---|
| Registry (state machine), dirmap and most of the storage wrapper | Founder and a backend engineer |
| Backend rework for E2EE (API changes, owner tokens), CI, deploy and provisioning | Backend engineer |
| E2EE API design document | External document referenced by the backend PR. Its author is **[UNKNOWN]** |
| Share state machine spec, lifecycle settling, payments backend, observability | Founder |
| Fix aligning upload part sizes with the encryption preamble | Founder made a fix; you made two follow-ups |
| Flutter mobile app, including its encryption | Colleague |
| Sandbox and beta E2EE Playwright jobs in CI | Backend engineer |
| Cryptographic primitives | libsodium (third-party) |

### Built initially, extended or maintained?

| Item | Evidence |
|---|---|
| Multipart upload: backend and frontend | **Built** [REPO, yours]. Later reorganized and extended by the founder, with no defect fixes involved |
| Resumable download, service-worker save path, parallel range fetch | **Built initially** [REPO, yours] |
| Web E2EE integration | **Built** the web client's integration [REPO, yours]. Its API design came from elsewhere |
| Recipient download pipeline | **Extended, then reworked**. It existed before your rework, which replaced StreamSaver |
| Frontend app shell, Redux store, early UI | **Built with a colleague** on the shared branch (Apr–Oct 2025) [OWNER], then maintained and extended by you [REPO, yours] |
| Web-vitals telemetry | Arrived with the shared-branch merge. Who wrote it is not recorded on `main` |

### What remains unknown

- How work on the shared branch (April–October 2025) split between you and your colleague.
- Who designed the E2EE protocol and API, and who decided on presigned direct uploads, the
  service-worker save path and parallel range fetch. The docs record the reasoning, not who
  decided.
- Who ran the device measurements. Run records say "the tester".
- Team size [OWNER: "small"]. History shows about five regular human contributors, which is
  not the same thing as team size.
- Release dates to production.

---

## 3. Four contribution stories

### A. End-to-end encryption (web client)

**Confirmed scope. [REPO, yours]** Between November 2025 and January 2026 you integrated E2EE
into the web client. That covered encryption utilities, password key derivation moved into a Web
Worker, creating encrypted shares, encrypted upload, encrypted download, re-wrapping the key on
access-code change, and encrypted file metadata. Unit tests followed for each encryption module.
Later work extended it: the encrypted share message and a versioned encrypted-metadata format
(May 2026), then removal of the non-E2EE legacy paths (July 2026).

**Original problem. [REPO]** Before this work the repository shows storage-side encryption with a
per-request key. Files were not encrypted in the browser. The business motivation is not recorded.

**Where encryption happens.** **[REPO]**

| Step | Where | What |
|---|---|---|
| Create share | Browser | Generates a random file key (DEK), a random access code and two random salts |
| Protect the key | Browser | Derives one key from the access code with a memory-hard password hash and wraps the DEK with it. A separately salted derivation becomes the access verifier |
| Upload | Browser (Web Worker) | Encrypts each file with streaming authenticated encryption, in parts |
| Metadata and message | Browser | File names, sizes, types and the share message are encrypted with the DEK |
| Store | Server and storage | Hold ciphertext, the wrapped key, salts and the verifier |
| Download | Browser (page or service worker) | Derives keys from the code, unwraps the DEK, decrypts the stream and saves it |

**What the service can see. [REPO]** From the implementation the server receives ciphertext,
encrypted metadata, the wrapped key and an Argon2id-derived verifier. It also sees share
identifiers, ciphertext sizes, file counts, timestamps, expiration and enabled state. In "link only"
mode the access code sits in the URL fragment, which browsers do not send to servers.

**Caveat that must shape public wording. [REPO]** An internal security review of this design
records open findings about how the access verifier and the code are used. Do not publish the
specifics. Do not describe the system as "zero-knowledge", "audited" or "unbreakable". Neither an
independent audit nor resolution of those findings is evidenced. "Files are encrypted in the
browser before upload" is supported.

**Implemented versus integrated.** You integrated libsodium (third-party primitives) and built
the app's own layer on top of it. That layer covers the key packing and unpacking format, the
metadata format classes, the worker plumbing, the stream encrypt and decrypt glue, and its tests.
**[REPO, yours]** The overall scheme, meaning which keys, which derivations and the API shape,
followed an external design document. **[UNKNOWN]** whether you co-authored it.

**Progress, failures, unusable transfers. [REPO]**

- Upload progress combines encryption progress, network progress and a "liveness nudge". A
  monotonic gate stops the bar from ever moving backwards.
- A wrong code or an undecryptable key surfaces as a validation error, not a crash.
- Files whose encrypted metadata cannot be decrypted are counted. If some are readable, the list
  shows with a warning. If none are, the page shows an error state.
- Authenticated decryption means bytes spliced or corrupted at the wrong place fail to decrypt
  rather than producing wrong output. The docs state this. It is exercised indirectly by the
  hash-matching round-trip tests below.

**Interaction with large files, multipart and resume. [REPO]** This interaction is the core
technical difficulty of the project:

- Encryption is a single **chained** stream per file, so upload parts must line up with
  encryption chunk boundaries. The storage provider also requires equal part sizes, but the file
  header makes part 1 longer. The fix shortens the plaintext of part 1 so all ciphertext parts
  match. The founder wrote the first version and you wrote two follow-up fixes.
- Upload resume works because the encryption state after each part (about 52 bytes) can be
  serialized. Resuming from that state reproduces the same ciphertext.
- Download resume sidesteps the chain entirely (see story C).
- A parallel-decrypt format was considered and **not** planned. Measured decrypt speed was at
  least 5× every engine's download speed.

**Validation. [REPO]** Unit tests cover the encryption modules, workers and metadata classes. CI
runs E2EE Playwright jobs against sandbox and beta (set up by a colleague). Large-transfer
harness runs check SHA-256 of the downloaded file against the original (2 GB and 15 GB matched
on desktop Chrome, October 2026).

**Missing evidence and questions.** Who designed the scheme? Did the review's open findings get
fixed, and by whom? Has the web E2EE flow reached production, and when?

---

### B. Multipart upload

**Confirmed scope. [REPO, yours]** You wrote the backend (March 2026) and the frontend
integration (March 2026). Follow-ups through July 2026 moved encryption to a worker with a
pipelined loop, added interrupt/resume/cancel, and fixed resume and abort around the "complete"
step.

**Why multipart was needed. [REPO, recorded]**

1. Uploads were capped at **100 MB per file**.
2. An earlier upload path buffered the whole encrypted file in memory, twice. A 1 GB upload
   peaked near **2 GB of RAM** and the tab crashed with a generic network error.
3. Sending 100 MB parts *through* the backend hit a **~22 s reverse-proxy timeout** on slow
   links, giving 502 errors. Retries were then canceled by an idle timeout.

**How browser and backend coordinate. [REPO]**

| Step | Browser | Backend |
|---|---|---|
| Start | Encrypts the file metadata and asks to open an upload | Registers the file and opens a storage multipart upload in one call |
| Each part | Reads and encrypts the next part in a worker, computes a CRC32C checksum and asks for a part link | Returns a ~15-minute presigned link with the checksum signed in |
| Send | Sends the part **straight to object storage** and keeps the receipt (ETag) | Not in the data path |
| Finish | Sends the list of parts | Completes the storage upload and records the file as uploaded |
| Recover | Uses saved part receipts, or asks the server to list received parts | Lists parts from storage |
| Give up | Asks to abort | Aborts the storage upload, which frees its space |

**Retry, cancel, cleanup, ordering and integrity behavior that exists. [REPO]**

| Behavior | Detail |
|---|---|
| Retry | Per part. Network errors and 429/502/503/504 are retried. Each retry gets a fresh presigned link, so a long retry never hits an expired one |
| Stall detection | A part with no upload progress for a set period is aborted and reported as a timeout |
| Ordering | Parts go up sequentially. The worker encrypts part N+1 while part N uploads |
| Integrity | Storage checks a per-part CRC32C. Completion checks the assembled size (later work by the founder). Authenticated encryption protects content end to end |
| Cancel | Aborts the storage upload and removes the file record |
| Interrupt/resume | Same session only, for files ≤ 10 GB. Encryption state and part receipts are checkpointed in browser storage, and a resume continues from the next part |
| Ambiguous completion | If the "complete" request fails mid-flight, the client does **not** abort, because the upload may already be committed. The backend tells "already completed" apart from "aborted" by probing storage |
| Cleanup | Leftover checkpoints expire after 7 days. Stale uploads from an earlier session are aborted when the page loads. A storage lifecycle policy removes abandoned uploads |
| Memory | Bounded per part, roughly two parts' worth, instead of the whole file |

**Not present. [REPO]** Uploads cannot resume after a page refresh or browser restart, files
above 10 GB cannot be interrupted and resumed, and parts are not uploaded in parallel.

**Which backend pieces you wrote.** All of the first version: the endpoints, storage operations,
recovery paths and docs (see §2). The founder later reorganized it into the share-state model and
extended it for payments. Neither change was a defect fix.

**Validation. [REPO]**

- A recorded measurement: Firefox on Windows uploaded **1 GiB to 15 GB at 10.1–11.0 MB/s, with
  under 2 s of encryption stall** (2026-09-15, sandbox). Upload was network-bound, not
  crypto-bound.
- Several recorded bugs found and fixed: resume when the interrupt landed at the complete stage,
  aborted completion requests, and part-size mismatches.
- The docs list a verification procedure (CORS, a 1 GB upload, a checksum-corruption test, mobile
  checks). Whether those were run and what they returned is not recorded.
  **[PROPOSED VERIFICATION]**

**Missing evidence and questions.** What did the original issue say: user reports, or a planned
feature? Did you choose presigned direct uploads, or was it assigned? When was it released?

---

### C. Resumable download

**Confirmed scope. [REPO, yours]** All of it, September–October 2026: the pipeline rework,
failure-mode mapping, transfer instrumentation, byte-offset resume and per-file pause, the
service-worker save path, parallel range fetch, offline handling, reload survival and the cleanup
roadmap.

**Original problem. [REPO, recorded]**

- Storage download links are signed for seconds, but a multi-GB download runs far longer.
- Connections drop during long transfers.
- The chained encryption format means a naive resume would have to save and restore decryption
  state, which is fiddly and risks leaking key material.
- Before the rework, failures were silent. A save could show 100% with nothing written (no
  service worker). Safari tabs died on files over 2 GB. A truncated download could look complete.
  Two different code paths disagreed on what counted as success.

**What "resumable" means here. [REPO]** Within one transfer, a file keeps arriving when the
connection drops, its link expires, the user pauses or the browser goes offline. The fetch layer
reconnects **from the last byte received**, beneath decryption, so the decrypting stream sees one
unbroken run of bytes and no crypto state is ever saved.

**Which interruptions it recovers from. [REPO]**

| Interruption | Recovers? |
|---|---|
| Dropped connection or stalled request | Yes, on every save path. Retries give up after a few minutes with no progress, and the count resets after any progress |
| Expired storage link | Yes. A fresh link is leased on every reconnect |
| User pause (per file) | Yes. Pausing drops the connection so no mobile data is used. Resume reconnects without using up retries |
| Browser reports offline | Pauses everything and resumes when back online. A user pause is respected throughout |
| Page reload | Only on the service-worker save path, which keeps going and lets the reloaded page take over. The Blob fallback restarts |
| Closed tab or browser restart | **No.** It is reported as failed (on some browsers, promptly) |
| Share revoked mid-transfer | Stops at the next link lease (within ~20 s) with a "share changed" prompt |

**State retained. [REPO]** In memory: the byte offset per range, the per-file pause state and the
retry counts. The service worker holds the transfer and its key **in memory only**, never in
browser storage, and zeroes the key when the transfer ends. Nothing is checkpointed to disk for
downloads.

**Expiration, availability, encryption and integrity. [REPO]**

- Every reconnect gets a fresh link, so link expiration looks the same as any other reconnect.
- A refusal from the backend (revoked share, wrong code) fails at once instead of retrying.
- A range that comes back mismatched (whole object instead of range, wrong offsets) is refused
  outright. Even if one got through, authenticated decryption would fail rather than produce wrong
  bytes.
- Single-file saves now declare the expected size, so a truncated file is marked failed.
  Multi-file ZIPs still cannot do this. That is a documented limitation.

**Browser and device limitations. [REPO]**

- WebKit kills a service worker that buffers too much ahead. That forced a 32 MiB read-ahead
  budget.
- Safari 18.2–18.3 is routed to the Blob fallback.
- The Blob fallback on WebKit is capped at 200 MB.
- On cancel, Firefox and Safari leave partial files behind.
- The iOS downloads list shows 0 KB until done.
- An intermittent iPhone failure at the start of a Save is still open.
- Android was not run in the parallel-fetch sessions.

**Scenarios actually checked. [REPO]**

| Scenario | How | Result |
|---|---|---|
| Socket reset mid-file (Chromium) | Automated Playwright test with a local storage server, single and parallel ranges, hash check | Passes. It proves the reconnect code, not real device network stacks |
| Pause longer than the link lifetime | Manual on sandbox: Chrome, Firefox, Mac Safari | Resumed with one reconnect |
| Five-minute pause, revoke-while-paused, cancel-while-paused, multi-file archive | Manual on sandbox | Passed |
| Five-minute Wi-Fi outage | Manual, Mac Safari | Resumed |
| Reload mid-download | Manual: Mac Safari, iPhone Safari, Chrome | Continued to completion |
| Close tab mid-download | Manual, Mac Safari | Marked aborted |
| 2 GB and 15 GB integrity | Harness with SHA-256 | Matched (desktop Chrome) |
| A real, hand-forced dropped connection on a device | Four methods tried | **Could not be reproduced.** The OS rode it out. Covered by automated tests only |

**Measured results (lab, sandbox, small samples). [REPO]** See §4's challenge for the numbers.

**Missing evidence and questions.** Did you run the device sessions yourself? Which of this is in
production?

---

### D. Core Web Vitals and performance

**Confirmed scope. [REPO, yours]**

| Change | Category |
|---|---|
| Self-hosted Inter font, latin + Vietnamese subsets, with `font-display: optional`. The code comment states this was chosen to avoid layout shift. External font hosts removed from the CSP | Layout stability (CLS), loading |
| Lazy-loaded routes and modal sections. Split vendor chunks. gzip for text and scripts | Loading |
| Cryptography library loaded only when needed, warmed during idle time on the upload page, kept out of prerendered pages | Loading |
| Narrowed two broad Redux selectors to per-field subscriptions | Interaction responsiveness (fewer re-renders) **[INFERENCE: owner confirmation required]** |
| Encryption moved to a reused Web Worker. An earlier version yielded to the event loop every ~16 ms | Interaction responsiveness during uploads |
| Static prerendering of the six public routes | Loading and SEO. The stated goal was SEO |
| Draft edit state restored synchronously, which removed a "flashing page" | Visual stability **[INFERENCE: owner confirmation required]** |
| Skeleton loading states for the download and edit pages | Perceived loading, and possibly layout stability **[INFERENCE: owner confirmation required]** |
| AVIF image replacing an emoji icon | Loading (minor) |
| Retry for failed lazy-chunk loads | Reliability, not speed |

**Pages and metrics targeted. [REPO]** The bundle work targeted every route, explicitly including
the prerendered marketing and documentation pages "which never encrypt anything".

**Result. [REPO, yours]** The initial JavaScript payload became **62% smaller (gzip)**. This was
checked on all six prerendered routes and the app shell, from the production build, in September
2026. It is a build measurement, so the public copy states the 62% reduction and claims no Web
Vitals score.

The same investigation measured a proposed state-library migration (Redux to Zustand + React
Query) first. It came out slightly larger, so the team kept Redux and fixed what was actually
large. **[REPO, yours]**

---

## 4. Decisions, architecture and a deeper challenge

### Recommended stories (strongest first)

1. **Resumable large-file download.** It has the strongest evidence of any story. You authored
   all of it. It has a documented design rationale, rejected alternatives, dated measurements on
   real devices, automated tests and stated limits.
2. **Multipart upload, browser and backend.** It shows full-stack range. The original failure
   (memory crash, proxy timeouts, 100 MB cap) is recorded, and your version became the only upload
   path. Later reorganization by the founder preserved its behavior.
3. **End-to-end encryption on the web client.** It is the product's core and clearly yours as
   integration work. Present it as integration and engineering around a scheme, not as protocol
   design, and keep the security wording conservative.

Performance works best as a supporting card, built around the 62% reduction.

### Two meaningful technical decisions

**Decision 1: send upload parts straight to storage through presigned links.**

- *Documented rationale [REPO]:* the backend never holds file data. Uploads no longer pass through
  the reverse proxy whose timeout produced 502s. Memory is bounded per part. Each part's checksum
  is signed into its link, so storage rejects tampered or corrupted parts.
- *Recorded trade-offs [REPO]:* the storage bucket needs CORS rules (expose the receipt header,
  allow the checksum header). Completion now has to tell an ambiguous success apart from a failure.
- *Interpretation [INFERENCE: owner confirmation required]:* this is also what keeps the service's
  bandwidth and memory costs independent of file size.
- *Alternatives:* the previous design (parts through the backend) is recorded as what failed. No
  other alternative is recorded.

**Decision 2: reconnect beneath decryption, and save through a service worker.**

- *Documented rationale [REPO]:* resuming below the decrypt layer means no decryption state is ever
  checkpointed, which avoids the chained-format problem and the risk of leaking keys. The service
  worker acts as the server for an ordinary browser download. The page never holds the bytes,
  nothing lands in origin storage, and the transfer survives a reload.
- *Alternatives recorded as rejected [REPO]:*
  - OPFS staging on WebKit: it decrypted to storage first, needed twice the disk, and no API
    reports when the copy ends.
  - StreamSaver: page-fed chunks with no backpressure, which killed iOS tabs.
  - The File System Access picker: Chromium only, no reload survival.
  - A native ciphertext download plus a local decrypt pass: two steps, twice the disk, and opaque
    file names.
  - A parallel-decrypt format: no engine was decrypt-bound.
  - Parallel range fetch was chosen "over a retry-only fix and over doing nothing".
- *Interpretation [INFERENCE: owner confirmation required]:* this design keeps one shared fetch and
  decrypt pipeline for every browser, instead of a branch per browser.

### System in five steps (generic, public-safe)

1. **Browser: prepare.** It generates a random file key and an access code, derives a wrapping key
   from the code, and encrypts the file key and the metadata.
2. **Browser to backend: register.** The app server records the share and file entries in a
   state-machine registry and issues an owner token. It stores only ciphertext-side data.
3. **Browser to storage: upload.** For each part, the browser encrypts in a worker and gets a
   short-lived signed link from the app server. It then sends the part straight to S3-compatible
   object storage, with a checksum. The app server completes the upload.
4. **Recipient browser: unlock.** The recipient opens the link, derives the keys from the access
   code, gets the wrapped key, and decrypts the file list and metadata.
5. **Recipient browser: download.** A service worker leases signed links and fetches the file as
   parallel byte ranges, reconnecting from the last byte when needed. It decrypts in order and
   streams the result to the browser's own download.

| Browser does | Backend does |
|---|---|
| All encryption and decryption, and key derivation | Authenticate owner and recipient requests |
| Part sizing, checksums, retries, resume, progress | Share state machine and expiration |
| Range planning, reconnection, decrypt-and-save | Issue short-lived signed storage links |
| ZIP assembly, preview | Start, complete and abort multipart uploads, and reconcile partial failures |

### Deeper challenge: making very large downloads fast *and* survivable on an iPhone

**Problem. [REPO]** Recipients downloaded at a fraction of what the browser could decrypt. On
desktop Chrome, a single request delivered about 16–21 MB/s on a 15 GB file.

**Investigation. [REPO, recorded]**

- *Instrumentation first.* A transfer-logging mode and a large-transfer harness separated fetch,
  decrypt and save time, and checked SHA-256 of the result.
- *Decryption was not the bottleneck.* Decrypt speed was **122–378 MB/s** depending on the engine,
  at least 5× each engine's download speed.
- *A measurement gate before building.* With no app code, the team compared one request against
  2, 4 and 6 parallel requests. Six ran about **2.0–2.5× faster** on desktop Chrome and Firefox
  (October 2026, office network).
- *The host can be the bug.* Two early "pipeline defects" were the machine: a desktop hitting
  swap, and an iPhone near full storage. The team then set minimum host requirements.

**Change. [REPO, yours]** The file is fetched as up to six byte-ranges at once and handed to
decryption in order. Each range reconnects independently, and one signed link is shared for 20 s
instead of one per range. The first build used six 16 MiB ranges.

**Second problem found by validation. [REPO]** On the iPhone, a 15 GB save **died at 1.5–1.9 GB in
3 of 3 runs**. A single request did not die. A memory probe showed six full ranges sitting ahead
of a slow save, about 100 MB held. The next build capped read-ahead at **32 MiB**, used 8 MiB
ranges, and split the back half of a lagging range so all six slots stayed busy.

**Validation. [REPO]** (sandbox, small samples, networks not always recorded)

| Device | One request | Parallel (final build) |
|---|---|---|
| iPhone Safari, 15 GB | ~17 MB/s, run stopped at 53% | **30.3 MB/s, completed** |
| iPhone Safari, 2 GB | 29.7 MB/s | 44.7 MB/s |
| MacBook Safari, 2 GB | 36.6 MB/s | 117.8 MB/s (first parallel build), 54.9 MB/s (final build, separate session) |
| Desktop Chrome, 15 GB | ~19–21 MB/s | ~45 MB/s (first parallel build) |
| Windows Firefox, 15 GB | not recorded | 59.5–68.8 MB/s (first parallel build) |

**Remaining limitations. [REPO]**

- An intermittent iPhone failure at the start of a Save is still open.
- Android was not measured.
- Firefox reached 77–90% of its gate.
- One final-build desktop run was voided because of network congestion.
- A cleanup roadmap (PRs 5–11) is in progress to split and consolidate the download modules.

---

## 5. Outcomes, lessons and evolution

### What demonstrably changed

**Functional results. [REPO]** (implemented, and tested on sandbox where stated)

- Files are encrypted in the browser. The storage-side-key model was retired.
- The per-file limit went from 100 MB to a configured multi-terabyte limit. Transfers are tested
  to 15 GB.
- Uploads interrupted in the same session continue from the last part instead of from zero.
- Downloads continue through dropped connections, expired links, pauses, offline periods and (on
  the service-worker path) reloads.
- Silent download failures (false 100%, truncated files reported as complete, empty archives
  reported as success) became reported failures.
- English and Vietnamese UI, file preview, prerendered public pages.

**Measured performance results. [REPO]** (lab and build measurements, not field data)

- Initial JavaScript payload: **62% smaller (gzip)**.
- Recipient download throughput with parallel ranges: about **1.4–3.2×** a single request,
  depending on device. A 15 GB iPhone download went from failing to completing.

**Business outcomes. [UNKNOWN]** No user counts, retention, revenue, support-ticket or feedback
data is in the repository.

**Maintainer-facing changes. [REPO]** A failure-mode table for every way a save can end. A
workflow map of every download file. Runbooks with pass and fail criteria for device testing. A
transfer-settings panel replacing hidden URL overrides. Versioned encrypted-metadata classes. Most
of the Playwright suite, plus 100 unit-test files.

### Lessons the work supports (personal reflections: confirm before publishing)

1. *Measure before building.* A no-code throughput gate justified parallel fetch, and a bundle
   measurement killed a library migration. **[INFERENCE: owner confirmation required]**
2. *In browser crypto, memory is the real constraint.* Most of the hard failures were tabs or
   workers killed by buffering, not by slow crypto. **[INFERENCE: owner confirmation required]**
3. *Put recovery in the layer that knows the least.* Reconnecting beneath decryption made resume
   simple and kept keys out of storage. **[INFERENCE: owner confirmation required]**
4. *"Finished" is the outcome every failure imitates.* Several bugs were false successes, so the
   evidence standard became a logged reconnect or a matching hash. **[INFERENCE: owner
   confirmation required]**

### Milestones (dates from Git history on `main`; merge date ≠ release date)

| Date | Milestone |
|---|---|
| Nov – Dec 2025 | Web client switched to browser-side E2EE (create, upload, download, access-code change, metadata) |
| Mar 2026 | Multipart upload: backend endpoints (11 Mar), frontend integration (22 Mar) |
| Sep – Oct 2026 | Resumable download (25 Sep), service-worker save path on all engines (7 Oct), parallel range fetch (8 Oct), offline and reload survival (13 Oct) |

### Reasonable to revisit (future work, not done)

- Upload resume after a page refresh. It would need the user to re-select the file, but the
  checkpoint already holds everything else.
- Parallel part uploads. Measured upload was link-bound at ~10–11 MB/s on one connection.
- Close the open items from the internal security review before making stronger privacy claims.
- Android device runs. A fix for the intermittent iPhone Save failure.
- Finish the download cleanup roadmap. Fold the outdated multipart docs into the current state.

---

## 6. Visual evidence (up to three)

| # | Visual | Shows | Supports claim | Proposed caption | Alt text | Redaction / approval |
|---|---|---|---|---|---|---|
| 1 | **Architecture diagram** you draw (not a screenshot) | The five steps in §4, with a line dividing "browser" from "server", ciphertext crossing it, and keys staying on the browser side | E2EE placement, direct-to-storage upload, recipient-side decrypt | "Everything sensitive happens in the browser. The server only ever sees ciphertext." | "Diagram: the sender's browser encrypts files and uploads parts directly to object storage; the app server only issues signed links and tracks share state; the recipient's browser fetches and decrypts." | Needs approval to disclose architecture at this level. Do not name the storage provider, hosts or internal service names. Do not reuse the repository's own diagram images without permission |
| 2 | **Recipient download in progress** (sandbox, dummy file) | A file card mid-transfer with pause and resume, then the same card resumed after pausing, ideally with the browser's download list | Per-file pause and resume, and progress | "Pause any file and pick up from the last byte, even after the download link expires." | "Download page showing a file paused at 42% with a resume button, and the same file continuing after resume." | Use a throwaway share with dummy file names. Crop or blur the URL bar, share ID, access code and QR code. Needs permission for product screenshots |
| 3 | **Bar chart** you make from the recorded numbers | One request vs parallel download MB/s per device | The throughput claim | "Fetching a file as parallel ranges ran 1.4–3.2× faster than a single request across tested devices." | "Bar chart comparing single-request and parallel download speed on iPhone, Mac and Windows browsers." | Numbers are internal measurements, so confirm you may publish them. Label as a build or sandbox measurement with its date |

---

# B. Proposed portfolio copy

All first-person claims below are limited to work authored under your identity. Bracketed labels
stay attached until you resolve them.

**Product summary (37 words)**

> Webshare.space is a file-sharing web app that encrypts files in the sender's browser before
> upload. Senders create a share, add files, and send a link; recipients open it, decrypt in
> their own browser, and save the files.

**Personal contribution summary (51 words)**

> As a full-stack developer on a small startup team, I'm responsible for the React web client. I
> integrated browser-side end-to-end encryption into upload and download, built multipart upload
> end to end, including its Rust backend endpoints, and made large downloads resumable
> across dropped connections, pauses and, on supported browsers, page reloads.

**Outcome line (supported, but needs disclosure approval for the numbers)**

> Took the app from a 100 MB per-file cap to encrypted transfers tested at 15 GB, and made the
> initial JavaScript payload 62% smaller.
> *[Sandbox and build measurements. Production release: owner confirmation required]*

### Contribution drafts

```yaml
- title: Resumable, large-file downloads in the browser
  summary: >
    I rebuilt how recipients download encrypted files so multi-gigabyte transfers keep going
    through dropped connections, expired links, pauses and page reloads, and run faster.
  problem: >
    Download links expire in seconds while large transfers take far longer, and the encryption
    format is chained, so a byte range can't be decrypted on its own. Failures were often
    silent: a save could report success with no file.
  change: >
    I moved reconnection beneath decryption: the fetch layer resumes from the last byte with a
    fresh link while decryption sees one unbroken stream. A service worker fetches, decrypts and
    streams straight into the browser's own download, and the file is fetched as several
    parallel ranges with a bounded read-ahead.
  reasoning: >
    Reconnecting below decryption means no decryption state or key is ever written to storage.
    Measurements showed decryption ran at least 5x faster than the network, so the bottleneck
    was the single request, not the crypto.
  tradeOff: >
    A closed tab can't resume, reload survival needs a working service worker, multi-file ZIPs
    can't detect truncation, and parallel ranges need a memory budget to avoid killing mobile
    workers. Android was not measured, and one intermittent iPhone failure is still open.
  evidence: >
    Automated tests sever the connection mid-file and check the result's hash. Manual sandbox
    runs covered pauses longer than the link lifetime, a five-minute Wi-Fi outage and mid-transfer
    reloads. A 15 GB iPhone download that failed at 1.5–1.9 GB completed at about 30 MB/s after
    the read-ahead budget. [Sandbox lab measurements; who ran them: owner confirmation required]

- title: Multipart encrypted upload, browser to backend
  summary: >
    I built multipart upload end to end: the first Rust/Actix endpoints and the browser side
    that encrypts, checksums and uploads each part directly to object storage.
  problem: >
    Uploads were capped at 100 MB. An earlier path buffered the whole encrypted file in memory
    (around 2 GB of RAM for a 1 GB file), and sending parts through the backend hit a reverse
    proxy timeout that returned 502s.
  change: >
    The backend now only opens, signs, lists, completes and aborts uploads; each encrypted part
    goes straight to storage through a short-lived signed link with a checksum. In the browser,
    a Web Worker encrypts the next part while the current one uploads, with per-part retries,
    stall detection, and in-session interrupt and resume.
  reasoning: >
    Keeping file bytes off the app server removes the proxy timeout and bounds memory per part;
    signing a checksum into each link lets storage reject corrupted parts.
  tradeOff: >
    Resume works only within the same session and for files up to 10 GB; parts upload
    sequentially; the storage bucket needs CORS rules. My backend became the app's only upload
    path; the team later reorganized it into a shared share-state model with its behavior
    unchanged.
  evidence: >
    A recorded sandbox run uploaded 1 GiB to 15 GB from Firefox at about 10–11 MB/s with under
    2 s of encryption stall, showing the path was network-bound. Bugs around resuming at the
    completion step were found and fixed. [Release date: owner confirmation required]

- title: End-to-end encryption in the web client
  summary: >
    I integrated browser-side end-to-end encryption into every web flow: creating a share,
    uploading, downloading, changing the access code, and encrypting file metadata and the
    share message.
  problem: >
    Files were previously encrypted on the storage side with a key sent per request, so the
    service had to be trusted with the key. [Business motivation: owner confirmation required]
  change: >
    Using libsodium, the browser generates a random key per share, wraps it with a key derived
    from the access code (in a Web Worker so the UI stays responsive), streams file encryption
    in parts, and encrypts file names and messages. I built the app's packing format, metadata
    format classes, worker plumbing and their unit tests.
  reasoning: >
    The scheme followed a team API design. [Who designed it and your role in decisions: owner
    confirmation required]
  tradeOff: >
    Chained stream encryption made large-file upload and resume harder: upload parts had to line
    up with encryption chunks and equal storage part sizes. The access code both unlocks and
    authorizes access, so its strength matters.
  evidence: >
    Unit tests cover every encryption module; CI runs encrypted end-to-end tests against
    sandbox and beta; large-transfer runs match SHA-256 hashes at 2 GB and 15 GB. No
    independent security audit is claimed.

- title: Front-end performance and loading
  summary: >
    I reduced what the app loads up front so pages that never encrypt anything no longer pay
    for the cryptography library.
  problem: >
    Every route, including static marketing and documentation pages, preloaded the full
    cryptography and UI-library code, even where nothing is encrypted.
  change: >
    Cryptography loads only when needed and warms up during idle time on the upload page; routes
    and modals load lazily; vendor code is split; the font is self-hosted with a display
    strategy chosen to avoid layout shift; public pages are prerendered; encryption runs off
    the main thread.
  reasoning: >
    A proposed state-library migration was measured first and came out larger, so effort went
    to what was actually big rather than to a rewrite.
  tradeOff: >
    Deferred loading means the first encryption on a page can wait for a chunk, which idle
    warm-up mitigates; first-time visitors may see the system font.
  evidence: >
    The initial JavaScript payload became 62% smaller (gzip), checked on all six prerendered
    routes (production build, September 2026).
```

### Optional sections (only where supported)

**Decisions.** Use Decision 1 and Decision 2 from §4. Keep the "documented rationale" and the
"interpretation" lines separate on the page.

**Architecture.** Use the five-step list and the browser/backend table from §4 as written.

**Challenge.** Use §4's iPhone throughput story. It is the one with a recorded problem,
investigation, change, validation and limitation.

**Outcomes.** Use the functional list and the two measured results from §5. Leave out business
outcomes.

**Lessons.** Use §5's four lessons only after confirming they match your own view.

**Milestones.** Use the three rows from §5 and call them "merged", not "launched", until you
confirm release dates.

---

# C. Claim / evidence table

| Claim | Evidence type and finding | Ownership confidence | Missing confirmation |
|---|---|---|---|
| Files are encrypted in the browser before upload | Code and docs: encryption runs in the browser and a worker; the server handles ciphertext | High (web integration authored by you) | Scheme authorship; production date |
| No independent audit; open internal review items | Internal review document with open findings | n/a | Whether they were fixed; do not publish specifics |
| Designed and built the multipart upload backend in Rust/Actix | History: backend PR authored by you, March 2026; it became the only upload path a month later; the later reorganization is recorded as "behavior preserved" | High | Whether you chose the presigned design |
| Built browser multipart integration | History: frontend PR and follow-ups authored by you | High | — |
| Per-file limit 100 MB → multi-TB configured | Config history; your PRs raised and removed caps | High | Production values (deploy-time overrides possible) |
| Transfers tested to 15 GB | Dated run records, sandbox | Medium-high for authorship of the code; who ran tests unknown | Who ran the runs; production behavior |
| Upload resume within a session (≤10 GB) | Code and docs; bug-fix history | High | Release |
| Upload network-bound at ~10–11 MB/s | One recorded measurement, Firefox/Windows, Sept 2026 | Medium | Who measured; network conditions |
| Downloads resume from last byte through drops, expiration, pause, offline | Code, docs, automated reset test, manual sandbox runs | High | Release; real device network drop not reproduced by hand |
| Downloads survive a reload (service-worker path) | Manual runs: Mac Safari, iPhone Safari, Chrome | High | Firefox close/reload runs; release |
| Parallel ranges ~1.4–3.2× faster | Gate sessions and app runs, Oct 2026, small samples | High for code; medium for numbers | Who ran; network not always recorded |
| iPhone 15 GB: failed at 1.5–1.9 GB → completed at 30.3 MB/s | Run records plus a memory probe | High | Disclosure approval |
| Initial JavaScript 62% smaller (gzip) | Production-build measurement in PR, Sept 2026 | High | Disclosure approval |
| Font change avoids layout shift | Code comment states intent; no measurement | High (yours), intent only | Measurement |
| Owned the whole frontend | Owner statement; built with a colleague April–October 2025, then 183 of 208 frontend commits, sole author since March 2026 | High | — |
| Started 2025-04-15 | Owner statement | High | — |

---

# D. Follow-up questions (prioritized)

1. **Release status.** Which of these reached production, and roughly when: web E2EE, multipart
   upload, upload resume, resumable download, the service-worker save path, parallel fetch, and
   the bundle work? Until then the copy says "built" or "merged", never "shipped".
2. **E2EE decision authority.** Who wrote the E2EE API design, and did you shape it? Were the
   review's open findings resolved? This decides between "integrated" and "designed", and how
   strong the privacy wording can be.
3. **Measurements.** Did you run the device and throughput sessions yourself (iPhone, Mac, Windows
   Firefox and Chrome)? If so, you can write "I measured".
4. **Disclosure permissions.** May the portfolio cite internal measurements, name the crypto
   library and primitives, mention the storage provider type, and show sandbox screenshots? Who
   can approve this?
5. **Motivation and ownership of the big choices.** Did you propose presigned direct uploads, the
   service-worker save path and parallel fetch, or were they assigned? What prompted multipart:
   user reports, beta QA, or the roadmap?
6. **Team and outcomes.** How large was the team? Is there any shareable outcome, such as
   beta-user feedback, fewer support issues or adoption, that you are allowed to mention?

---

# Internal source index (do not publish)

For your own checking. PR numbers refer to merged commits on `main`.

| Topic | Where |
|---|---|
| Pre-E2EE state | Frontend `package.json` and backend `config.toml` at the parent of #495; frontend import commits #411, #441, #444 |
| E2EE web integration | #495, #498, #500, #505, #508, #516, #518, #536, #539; tests #540, #543, #571, #604, #669; message #693/#694; metadata classes #689/#700; legacy removal #774. Backend rework by a colleague: #484 |
| Security review | `webshare/docs/security-concerns.md` (internal only) |
| Access modes | `webshare/docs/share-space-access.md` |
| Multipart backend | #619; later reorganization and extensions #732, #769, #778, #783, #804, #839 (founder) |
| Multipart frontend | #635, #642, #667, #705, #678, #756, #761, #830, #831; founder fix ec29864f |
| Multipart docs | `webshare/docs/multipart-upload/*.md` (frontend.md partly outdated), `interrupt-resume-upload.md` |
| Size limits | `webshare/config.toml`, `frontend/src/constants/environment.js`; #637, #702, #703 |
| Download rework | #840, #841, #843, #847, #850–#853, #857, #860, #861, #863, #864, #866, #867, #870, #872, #873, #875 |
| Download docs | `download-pipeline.md`, `resumable-download.md`, `download/parallel-fetch.md`, `download/parallel-fetch-runs.md`, `download/service-worker-sink*.md`, `download/measuring-large-transfers.md`, `download/clean-up-roadmap.md` |
| Automated resume test | `frontend/playwright/ResumableDownload.spec.js` |
| Performance | #490, #745, #749, #755, #822, #838; `frontend/src/index.css` font comment; web-vitals handler arrived with the shared-branch code (#411) |
| Testing | 100 unit-test files and 6 Playwright specs on `main`; CI E2EE jobs #607, #610 (colleague) |
