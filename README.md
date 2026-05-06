# AI-Alert

**Company:** AI-Alert

**Scope:** Provides state-level weather alert monitoring for the US based on user queries.

---

## Overview

A local AI agent based system that draws results from the NWS (US National Weather Service) API to show relevant advice and alerts to people who want to know if it is safe to travel through a certain US state.

---

## Domain Rules

- Results are shown only if the NWS API returns data for the requested state
- Queries are reliable only if they mention the state name — not lower level locations or latitude/longitude geo information
- Queries are not reliable if the user wants reports based on complex dates or timelines
- Response quality depends on the local AI model and may vary between runs

---

## Use Cases

### UC1 — User receives responses based on queries that include a State Name ✅ Implemented

Our product takes the user's input, extracts the state name from it and performs a query to the NWS API. It then shows the results, if any.

### UC2 — The Agent recognizes different location input types besides State Name 🔲 Pending

Covers cities, villages and latitude/longitude geo information provided by the user.

### UC3 — User can request a report for the last month to see the weather evolution 🔲 Pending

Allows the user to query historical weather data and observe alert trends over time.

---

## Test Cases

### UC1 — User receives responses based on queries that include a State Name

- **TC-001** — Should return a response for a state with active alerts
- **TC-002** — Should return a response for a state with no active alerts
- **TC-003** — Should handle Washington DC as a valid location
- **TC-004** — Should store ingested alerts in the database with the correct state code
- **TC-005** — Should not store duplicate alerts on repeated ingestion
- **TC-006** — Should return alerts filtered by the correct state

### UC2 — Agent recognizes different location input types 🔲 Pending

- **TC-007** — Should handle a city name as input
- **TC-008** — Should handle latitude and longitude as input

### UC3 — User can request a report for the last month 🔲 Pending

- **TC-009** — Should return historical alerts for a given state
- **TC-010** — Should show weather evolution over the requested time period

---

## Implementation Status

| Component | Status |
|-----------|--------|
| MCP Pipeline with Local AI | ✅ Implemented |
| Express Endpoint Creation | 🔲 Not done |
| Production Deployment and Configuration | 🔲 Not done |

---

## Stack

TypeScript · Playwright · PostgreSQL · Drizzle ORM · MCP SDK · Ollama · NWS API
