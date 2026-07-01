# Smart Lab – UI Page Specifications

> **Scope:** 10 pages covering sections 1.1–1.12.
> Section 1.8 (Automated Requests) has no dedicated page — its workflow and request management features are surfaced as embedded components within relevant module pages (primarily Waste Management and Sample Tracking). Section 1.9 (Risk Intelligence) is excluded from the UI scope.

---

## Page 1 — AI Assistant (`/ai-assistant`)

**Source:** Section 1.1 — Laboratory AI Copilot

### Purpose
Central conversational hub where lab personnel query SOPs, manuals, chemical guidance, MSDS sheets, and summaries in natural language. Supports Arabic and English.

### Layout
- **Full-screen chat interface** as the primary focus (similar to a chat application).
- **Top bar:** Language toggle (AR / EN), session history icon, user avatar.
- **Left sidebar (collapsible):** Past conversation sessions grouped by date; "New Chat" button at the top.
- **Main chat area:** Message thread with user and AI bubbles; AI responses can include expandable document cards (SOP, MSDS, report snippets).
- **Bottom input bar:** Text field with mic icon (voice input), send button, and an attachment icon for uploading documents to query against.

### Key Components

| Component | Description |
|---|---|
| Chat Bubble (AI) | Markdown-rendered response with source citation badge (e.g., "SDS — Acetone Rev 3") |
| Chat Bubble (User) | Plain text, right-aligned |
| Document Result Card | Inline expandable card showing matched document title, section excerpt, and a "View Full Document" link |
| Quick Action Chips | Pre-built prompt shortcuts: "Find SOP", "Get MSDS", "Summarize Report", "Chemical Guidance" |
| Language Toggle | Switches UI and AI response language between Arabic (RTL layout) and English |

### States
- **Empty / New Chat:** Illustrated welcome screen with suggested queries.
- **Typing:** Animated AI loading indicator (dots).
- **Error:** Inline error banner with retry option.
- **No Result:** AI response card stating no document was found, with a suggestion to rephrase.

### Notes
- RTL layout must flip correctly when Arabic is selected (sidebar moves to right, text aligns right).
- MSDS and SOP results should be linkable/downloadable, not just displayed as text.

---

## Page 2 — Computer Vision (`/computer-vision`)

**Source:** Section 1.2

### Purpose
Live monitoring dashboard showing camera feeds and real-time AI detection overlays for PPE compliance, restricted zones, occupancy, unsafe behaviour, and fire/smoke detection.

### Layout
- **Top stats bar:** Total cameras active, active alerts count, PPE compliance %, current occupancy.
- **Main grid:** Camera feed tiles (2×3 or 3×3 grid, user-configurable). Each tile shows the live or latest frame with bounding box overlays.
- **Right panel:** Alert feed — chronological list of detection events with timestamp, camera ID, event type, and severity badge.
- **Bottom drawer (expandable):** Timeline scrubber to review recent recordings per camera.

### Key Components

| Component | Description |
|---|---|
| Camera Tile | Live frame + overlay bounding boxes colour-coded by violation type; camera label and status dot |
| Alert Card | Icon + event type label + camera ref + timestamp + severity badge (Low / Medium / High / Critical) |
| Detection Legend | Colour key: PPE = green/red, Restricted Zone = amber, Fire/Smoke = red pulsing, Occupancy = blue |
| Occupancy Counter | Per-area badge showing current count vs. max allowed |
| Filter Bar | Filter alert feed by detection type, severity, or camera zone |

### Detection Types & Visual Coding

| Detection | Overlay Colour | Alert Severity |
|---|---|---|
| PPE Compliant | Green | — |
| PPE Violation | Red | High |
| Restricted Area Breach | Amber | High |
| Unauthorized Entry | Red | Critical |
| Unsafe Behaviour | Orange | Medium–High |
| Fire / Smoke | Red (pulsing) | Critical |
| Occupancy Normal | Blue | — |
| Occupancy Exceeded | Purple | Medium |

### States
- **All Clear:** Feeds running, no active alerts, compliance indicators green.
- **Active Alert:** Affected tile pulses with coloured border; alert card pinned to top of right panel; optional audio cue.
- **Camera Offline:** Tile shows grey placeholder with "Feed Unavailable" and last-seen timestamp.
- **Loading:** Skeleton tile placeholders on initial load.

---

## Page 3 — Smart Inventory (`/inventory`)

**Source:** Section 1.3

### Purpose
Real-time inventory management dashboard for chemicals, samples, and lab assets — with stock levels, expiry status, consumption trends, and reorder recommendations.

### Layout
- **Top KPI strip:** Total items tracked, low-stock count, expiring-soon count, pending reorders.
- **Left sidebar:** Category filter tree (Chemicals, Samples, Assets, Cylinders).
- **Main content area (tabs):**
  - **Dashboard tab:** Summary cards + consumption trend chart + expiry heatmap.
  - **Inventory List tab:** Searchable/filterable data table of all items.
  - **Reorder tab:** List of AI-recommended reorders with approve/reject actions.
- **Top-right:** Scan button (opens barcode/QR scanner modal).

### Key Components

| Component | Description |
|---|---|
| KPI Card | Icon + metric value + delta vs last period |
| Inventory Table Row | Item name, category, location, quantity, unit, expiry date, status badge |
| Status Badge | In Stock (green) / Low Stock (amber) / Out of Stock (red) / Expiring Soon (orange) |
| Consumption Chart | Line chart — daily/weekly/monthly toggle — per category or item |
| Expiry Heatmap | Calendar-style view showing density of items expiring per date |
| Reorder Card | Item name + current qty + recommended qty + estimated lead time + ERP push button |
| Scan Modal | Camera view for barcode/QR capture with auto-populate on successful scan |

### States
- **Normal:** Table populated, KPIs green.
- **Low Stock Alert:** Amber badge on item row; KPI card highlighted amber.
- **Expiring Soon:** Orange date cell in table; expiry heatmap cell turns orange/red.
- **Empty Category:** Friendly empty state with "Add Item" CTA.

### Notes
- Reorder recommendations should show confidence score and basis (e.g., "Based on 30-day consumption trend").
- ERP (SAP) push button should confirm before submitting.

---

## Page 4 — Sample Tracking (`/sample-tracking`)

**Source:** Sections 1.4 + 1.8 (Automated Requests integrated here)

### Purpose
End-to-end chain of custody for all operational samples, with workflow tracking from collection through approval — including digital service request management embedded in sample workflows.

### Layout
- **Top filters:** Date range, status filter, assigned lab section.
- **Main content (two panels):**
  - **Left — Sample List:** Scrollable list of samples with ID, type, current status, and assigned technician.
  - **Right — Sample Detail Panel:** Opens on row click; shows full lifecycle timeline, audit trail, and action buttons.
- **Floating action button:** "New Sample" / "Submit Request" (opens request modal — 1.8 integration).

### Key Components

| Component | Description |
|---|---|
| Sample List Row | QR/Barcode badge + Sample ID + Sample Type + Status chip + Assigned To |
| Status Chip | Collected → In Transit → Testing → Under Review → Approved → Disposed |
| Lifecycle Timeline | Vertical stepper showing each stage with timestamp and responsible user |
| Audit Trail Table | Chronological log of all actions: user, action, timestamp, notes |
| Request Modal (1.8) | Form to submit a lab service request; triggers approval workflow; shows SLA countdown |
| Approval Workflow Panel | Pending approvals queue with approve/reject/comment actions; escalation indicator |
| Scan to Track Button | Camera-based QR/barcode scan to instantly look up a sample |

### Workflow States (Chain of Custody)

| Stage | Colour | Action Available |
|---|---|---|
| Collected | Blue | Assign, Transfer |
| In Transit | Amber | Confirm Receipt |
| Testing | Purple | Log Result |
| Under Review | Orange | Approve / Reject |
| Approved | Green | Archive |
| Disposed | Grey | View Only |

### Notes
- Automated Requests (1.8): Request submissions, approval routing, notifications, and SLA tracking are embedded as a secondary workflow inside this page. No standalone page is needed.
- LIMS integration touchpoints should show sync status (Last synced: timestamp).

---

## Page 5 — Chemical Management (`/chemical-management`)

**Source:** Section 1.5

### Purpose
Lifecycle management for all lab chemicals — tracking, storage compliance, compatibility validation, expiry alerts, and MSDS access.

### Layout
- **Top KPI strip:** Total chemicals, compliance rate, expiring in 30 days, compatibility violations.
- **Main content (tabs):**
  - **Chemical Register tab:** Full searchable table of all chemicals with location, expiry, and compliance status.
  - **Storage Map tab:** Visual floor/rack map showing chemical locations with compliance colour overlay.
  - **Compliance tab:** List of storage violations and compatibility alerts with resolution CTAs.
  - **MSDS tab:** Searchable MSDS library (links to AI Assistant for inline querying).

### Key Components

| Component | Description |
|---|---|
| Chemical Table Row | Name, CAS No., location, quantity, expiry date, storage class, compliance badge |
| Compliance Badge | Compliant (green) / Violation (red) / Warning (amber) |
| Storage Map | Grid/rack visual; cells colour-coded by compliance; click cell to see occupant chemical |
| Compatibility Alert Card | Chemical A + Chemical B + violation description + recommended action |
| Expiry Alert Row | Chemical name + expiry date + days remaining + disposal/reorder CTA |
| MSDS Card | Chemical name + GHS pictograms + quick-access links (Hazards, PPE, Storage, Emergency) |

### States
- **Compliant:** All cells green on storage map; compliance tab shows 0 violations.
- **Violation Detected:** Red cell on map; alert badge on tab; Compliance tab auto-focused with violation card.
- **Expiry Warning:** Orange row in chemical register; banner at top of page if critical.

---

## Page 6 — Gas Cylinder Monitoring (`/gas-cylinders`)

**Source:** Section 1.6

### Purpose
Real-time monitoring of gas cylinder locations, pressure levels, leak events, and lifecycle status — with IoT sensor integration.

### Layout
- **Top KPI strip:** Total cylinders, cylinders in service, pressure alerts active, leak events today.
- **Main content (two columns):**
  - **Left — Cylinder Grid:** Card-per-cylinder view showing ID, gas type, location, pressure gauge, and status.
  - **Right — Alert & Event Feed:** Chronological list of pressure threshold breaches and leak detection events.
- **Bottom section:** Lifecycle table — cylinders due for inspection, refill, or retirement.

### Key Components

| Component | Description |
|---|---|
| Cylinder Card | Gas type icon + Cylinder ID + Location + Pressure gauge (radial/arc) + Status badge |
| Pressure Gauge | Arc gauge showing current PSI vs. safe range; colour-coded (green / amber / red) |
| Status Badge | In Service / Idle / Low Pressure / Leak Detected / Inspection Due / Retired |
| Alert Event Card | Icon + event type + cylinder ID + timestamp + severity + acknowledge button |
| Lifecycle Table | Cylinder ID + last inspection + next due + refill status + action button |
| Location Map | Optional floor map showing cylinder placement with status colour dots |

### States
- **Normal:** Gauges in green zone; no alerts.
- **Low Pressure:** Amber gauge on cylinder card; event card in feed.
- **Leak Detected:** Red pulsing badge on cylinder card; Critical alert card pinned at top; optional push notification.
- **Inspection Due:** Orange flag on lifecycle row; banner reminder.

### Notes
- IoT sensor data should show last-updated timestamp on each cylinder card (e.g., "Live — 2s ago" or "Last updated: 5 min ago").
- If IoT is unavailable, card shows "Sensor offline" with manual override input.

---

## Page 7 — Waste Management (`/waste-management`)

**Source:** Section 1.7

### Purpose
Track laboratory waste from generation to disposal, enforce segregation compliance via computer vision, and report on sustainability metrics.

### Layout
- **Top KPI strip:** Total waste generated (kg/L), compliant disposals %, active violations, hazardous waste pending.
- **Main content (tabs):**
  - **Overview tab:** Waste generation trend chart + compliance donut + recent activity feed.
  - **Waste Register tab:** Searchable table of all waste entries from generation to disposal.
  - **Segregation Monitoring tab:** Live camera feed view (integration with Computer Vision page) showing waste bins with CV overlays.
  - **Reports tab:** Exportable compliance and sustainability reports.

### Key Components

| Component | Description |
|---|---|
| Waste Entry Row | Waste ID + type + classification + generated date + current stage + handler |
| Classification Badge | Chemical / Biological / Radioactive / General / Sharps — colour-coded |
| Compliance Status | Compliant (green) / Non-Compliant (red) / Pending (amber) |
| Segregation Camera Tile | Live feed with CV overlay detecting correct/incorrect bin usage |
| Bin Violation Alert | Waste type detected + bin ID + violation description + image snapshot |
| Trend Chart | Stacked bar chart — waste by classification per week/month |
| Compliance Donut | % compliant vs. non-compliant disposals for selected period |

### Waste Stages

| Stage | Colour |
|---|---|
| Generated | Blue |
| Stored | Amber |
| Collected | Purple |
| In Transit | Orange |
| Disposed | Green |
| Non-Compliant | Red |

---

## Page 8 — Demand Forecasting (`/demand-forecasting`)

**Source:** Section 1.10

### Purpose
AI-driven forecasting of chemical and consumable demand — visualising consumption trends, predicted needs, reorder timelines, and SAP procurement sync.

### Layout
- **Top KPI strip:** Forecast accuracy %, items with reorder recommended, pending SAP sync, stockouts prevented.
- **Main content (two sections):**
  - **Top — Forecast Chart Area:** Line chart showing historical consumption vs. AI-predicted demand per item or category; date range selector.
  - **Bottom — Reorder Recommendations Table:** Itemised list of AI-generated reorder suggestions.
- **Right sidebar:** Filters — item category, lab section, forecast horizon (7 / 30 / 90 days).

### Key Components

| Component | Description |
|---|---|
| Demand Forecast Chart | Dual line chart: actual (solid) + forecast (dashed) + safety stock threshold line |
| Forecast Horizon Toggle | 7-day / 30-day / 90-day selector affecting chart and recommendations |
| Reorder Row | Item name + current stock + forecasted need + reorder qty + suggested date + SAP push button |
| SAP Sync Badge | Shows last sync timestamp; "Sync Now" button; error state if connection lost |
| Confidence Indicator | Percentage or Low/Medium/High badge showing forecast confidence per item |
| Category Breakdown | Donut or bar chart splitting forecasted demand by chemical category |

### States
- **Forecast Available:** Chart renders with dashed prediction line; recommendations table populated.
- **Insufficient Data:** Empty chart with "Not enough consumption history" message and minimum data requirement note.
- **SAP Disconnected:** Warning banner; reorder rows show "Manual Order" fallback option.
- **Stockout Risk:** Red row highlight in recommendations table; critical badge on KPI strip.

---

## Page 9 — Chemical Compatibility Monitoring (`/compatibility-monitoring`)

**Source:** Section 1.11

### Purpose
Real-time validation of chemical storage against compatibility rules — detecting and alerting on unsafe chemical pairings and storage violations.

### Layout
- **Top KPI strip:** Total chemicals monitored, active compatibility violations, storage location violations, last scan timestamp.
- **Main content (two panels):**
  - **Left — Compatibility Matrix / Map:** Visual grid or storage-rack map showing chemical co-location with colour-coded compatibility status.
  - **Right — Violations & Alerts Panel:** List of active incompatibility detections with severity, chemicals involved, and recommended corrective action.
- **Bottom section:** Compliance dashboard summary with historical trend of violations.

### Key Components

| Component | Description |
|---|---|
| Storage Map / Matrix | Rack or zone grid; cells coloured by risk: Safe (green) / Warning (amber) / Incompatible (red) |
| Incompatibility Alert Card | Chemical A + Chemical B + risk reason + location + recommended action + acknowledge button |
| Risk Reason Tag | e.g., "Oxidiser + Flammable", "Acid + Base", "Reactive + Moisture-sensitive" |
| AI Safety Assistant Widget | Inline Q&A widget (powered by AI Assistant) for compatibility queries without leaving the page |
| Compliance Trend Chart | Line chart — violations per day/week over selected period |
| Corrective Action CTA | Button to log a corrective action, reassign storage, or notify responsible personnel |

### States
- **Fully Compliant:** Matrix cells all green; violations panel shows "No active violations."
- **Warning Detected:** Amber cell on map; warning card in panel; non-blocking.
- **Critical Incompatibility:** Red pulsing cell; Critical badge; banner notification; optional push alert.
- **Scan Pending:** Cells shown with spinner overlay until validation sweep completes.

---

## Page 10 — Intelligent Root Cause Analysis (`/root-cause-analysis`)

**Source:** Section 1.12

### Purpose
AI-assisted incident investigation — analysing reports, generating summaries, identifying root causes, recommending CAPA actions, and enabling historical incident search.

### Layout
- **Top bar:** "New Incident" button (right), global search bar for incident history.
- **Main content (split view):**
  - **Left — Incident List:** Filterable list of all logged incidents sorted by date/severity.
  - **Right — Incident Detail Panel:** Opened on incident selection; shows full analysis, RCA, and CAPA recommendations.
- **Detail panel tabs:** Summary / Root Cause / CAPA / Timeline / Related Incidents.

### Key Components

| Component | Description |
|---|---|
| Incident List Row | Incident ID + title + date + severity badge + status (Open / Under Investigation / Closed) |
| AI Summary Card | Concise AI-generated paragraph summarising the incident; key events highlighted |
| Root Cause Card | Probable cause(s) ranked by AI confidence; contributing factors listed; evidence links |
| CAPA Card | Recommended corrective actions + preventive actions; assign to user; set due date; track status |
| Timeline View | Chronological event log with timestamps, users, equipment, and data source tags |
| Related Incidents Widget | AI-surfaced similar past incidents with similarity score and link |
| Historical Search Bar | Natural language search across all past incident reports and investigations |
| Confidence Score Badge | AI confidence % displayed alongside each root cause hypothesis |

### Incident Statuses

| Status | Colour | Meaning |
|---|---|---|
| Open | Red | Newly reported, not yet assigned |
| Under Investigation | Amber | RCA in progress |
| CAPA Assigned | Blue | Corrective actions defined and assigned |
| Closed | Green | Actions completed and verified |

### States
- **New Incident Form:** Modal with fields: title, date/time, location, description, involved personnel, linked equipment — AI auto-drafts summary on submit.
- **Analysis Loading:** Skeleton loaders in Summary/RCA tabs while AI processes.
- **No Incidents:** Empty state with "No incidents logged" illustration and "Report First Incident" CTA.
- **Search Results:** Matching incidents highlighted in list; AI provides a brief answer card above results.

---

## Global Notes

### Navigation
- **Top navigation bar** (or left sidebar for desktop) with icons + labels for all 10 pages.
- Active page highlighted; notification badge on pages with unresolved alerts.

### Shared Design Patterns
- All alert cards follow the same structure: icon + severity badge + description + timestamp + action button.
- All data tables support: column sorting, search/filter, CSV export, and pagination.
- All pages with IoT/live data show a "Last updated" timestamp and a connection status indicator.
- All pages support Arabic (RTL) and English (LTR) layout switching from a global language toggle.

### Accessibility
- Colour alone is never the only indicator — always pair with icon or text label.
- All interactive elements have accessible labels and keyboard navigation support.
- Alert severity levels: Info (blue) / Warning (amber) / High (orange) / Critical (red).

### Automated Requests (1.8) — Integration Note
Section 1.8 features (digital request management, approval workflows, task assignment, notifications, SLA escalation, LIMS/SAP integration) are **not a standalone page**. These capabilities are embedded as:
- Request submission modal on the Sample Tracking page (Page 4).
- Approval workflow panel within Sample Tracking and Chemical Management pages.
- Notification system surfaced globally via a top-bar notification bell across all pages.
- SAP/LIMS integration status shown contextually within Smart Inventory (Page 3) and Demand Forecasting (Page 8).