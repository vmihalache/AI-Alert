# AI-Alert — Test Cases

---

## UC1 — User receives responses based on queries that include a State Name

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