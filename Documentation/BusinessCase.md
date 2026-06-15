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
- Response quality depends on the AI model and may vary between runs

---

## Implementation Status

| Component | Status |
|-----------|--------|
| MCP Pipeline with Local AI | ✅ Implemented |
| Express Endpoint Creation | ✅ Implemented
| Production Deployment and Configuration | ✅ Implemented

## React Frontend Implementation Status

The AI-Alert platform now includes a React-based user interface that allows users to interact with weather alerts through a visual map of the United States.

### Features Implemented

- Interactive US map using React Simple Maps
- State selection via mouse and touch interactions
- Dynamic weather alert retrieval through the Railway-hosted API
- Animated weather visualization using DotLottie animations
- AI-generated alert explanations rendered through a Markdown Typewriter component
- Mobile responsive layout support
- Loading state management and request throttling

### User Journey

1. User selects a US state on the map.
2. Frontend sends a request to the Railway API.
3. Backend retrieves weather alerts through the MCP pipeline.
4. AI model generates a human-readable response.
5. Frontend renders the response inside the analyst thought cloud.
6. Weather-specific animations are displayed inside the weather window.
