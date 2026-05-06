# AI-Alert — Business Case

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

## Implementation Status

| Component | Status |
|-----------|--------|
| MCP Pipeline with Local AI | ✅ Implemented |
| Express Endpoint Creation | 🔲 Not done |
| Production Deployment and Configuration | 🔲 Not done |