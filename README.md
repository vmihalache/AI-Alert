# AI-Alert

**Company:** AI-Alert

**Scope:** Provides state-level weather alert monitoring for the US based on user queries.

**Live API:** `https://ai-alert-production.vercel.app/`

---

## Overview

A cloud-deployed AI agent system that draws results from the NWS (US National Weather Service) API to show relevant advice and alerts to people who want to know if it is safe to travel through a certain US state.

The system uses a **Model Context Protocol (MCP) server** to connect a cloud-hosted AI model (Groq / Qwen3-32B) to a PostgreSQL database, enabling natural language queries about active weather alerts across the United States.

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
| MCP Pipeline with Cloud AI (Groq) | ✅ Implemented |
| Express API Server | ✅ Implemented |
| Railway Deployment | ✅ Live |
| Neon PostgreSQL | ✅ Live |
| React Frontend  |✅ Live   |

---

## Usage

Send a POST request to the live API:

```
POST https://ai-alert-production.up.railway.app/api/weather
Content-Type: application/json

{
  "question": "What is the weather in Virginia?"
}
```

## React Frontend

The application includes a React frontend that communicates with the Railway-hosted Express API.

### Frontend Components

#### App.tsx

Coordinates communication between:

* MapChart
* WeatherPanel
* HTTP Gateway

Responsibilities:

* State management
* API request orchestration
* Loading state handling
* Weather response propagation

#### MapChart

Built with React Simple Maps.

Responsibilities:

* Display US state map
* Handle hover interactions
* Handle touch interactions for mobile devices
* Trigger weather requests for selected states

#### WeatherPanel

Responsibilities:

* Display AI-generated weather reports
* Display loading animations
* Display weather-specific Lottie animations
* Render markdown responses using MarkdownTypewriter

### Frontend Stack

* React
* TypeScript
* React Simple Maps
* D3 Geo
* DotLottie
* Markdown Typewriter
* Railway API Integration

### Frontend Request Flow

User Click
→ MapChart
→ App.tsx
→ HttpGateway
→ Railway API
→ MCP Pipeline
→ AI Response
→ WeatherPanel

## Use Cases

### UC1 — User receives responses based on queries that include a State Name
Status: ✅ Implemented
### UC2 — The Agent recognizes different location input types besides State Name 
Status: 🔲 Pending
### UC3 — User can request a report for the last month to see the weather evolution 
🔲 Pending
### UC4 — User receives visual weather guidance through the React Frontend 
Status: ✅ Implemented
### UC5 — User accesses the application from a mobile device 
Status: ✅ Implemented

---

## Stack

TypeScript · React · React Simple Maps · D3 Geo · DotLottie · Markdown Typewriter · Playwright · PostgreSQL (Neon) · Drizzle ORM · MCP SDK · Groq (Qwen3-32B) · NWS API · Express · Railway
