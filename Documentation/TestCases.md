# AI-Alert — Test Cases

---

## UC1 — User receives responses based on queries that include a State Name ✅ Implemented

**TC-001** — Should return a response for a state with active alerts

**TC-002** — Should return a response for a state with no active alerts

**TC-003** — Should handle Washington DC as a valid location

**TC-004** — Should store ingested alerts in the database with the correct state code

**TC-005** — Should not store duplicate alerts on repeated ingestion

**TC-006** — Should return alerts filtered by the correct state

---

## UC2 — Agent recognizes different location input types 🔲 Pending

**TC-007** — Should handle a city name as input

**TC-008** — Should handle latitude and longitude as input

---

## UC3 — User can request a report for the last month 🔲 Pending

**TC-009** — Should return historical alerts for a given state

**TC-010** — Should show weather evolution over the requested time period

---

## UC4 — User receives visual weather guidance through the React Frontend ✅ Implemented

**TC-011** — Selecting a state should trigger a weather request

**TC-012** — Loading animation should appear while waiting for a response

**TC-013** — Weather response should render using MarkdownTypewriter

**TC-014** — Weather-specific animation should be selected correctly

**TC-015** — Loading state should prevent duplicate state requests

**TC-016** — Frontend retry logic should recover from temporary backend failures

---

## UC5 — User accesses the application from a mobile device ✅ Implemented

**TC-017** — Mobile touch interaction should identify a selected state

**TC-018** — Mobile layout should correctly reposition map, analyst, cloud and weather window

**TC-019** — Mobile scrolling should function inside the thought cloud

**TC-020** — Mobile weather animations
