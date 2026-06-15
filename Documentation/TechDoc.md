# AI-Alert — Technical Documentation

---  

## Architecture Overview

User (Desktop / Mobile Browser)
│
▼
┌─────────────────────────────────────────┐
│             React Frontend              │
│                                         │
│  ┌─────────────────────┐                │
│  │      MapChart       │                │
│  │ React Simple Maps   │                │
│  └────────┬────────────┘                │
│           │                             │
│           ▼                             │
│  ┌─────────────────────┐                │
│  │       App.tsx       │                │
│  │ State Management    │                │
│  └────────┬────────────┘                │
│           │                             │
│           ▼                             │
│  ┌─────────────────────┐                │
│  │    HttpGateway      │                │
│  │ Retry Logic         │                │
│  └────────┬────────────┘                │
└───────────┼─────────────────────────────┘
│
▼
┌─────────────────────────────────────────┐
│            Railway Container            │
│                                         │
│  ┌─────────────────────┐                │
│  │   Express Server    │                │
│  │   /api/weather      │                │
│  │   /mcp              │                │
│  └────────┬────────────┘                │
│           │                             │
│           ▼                             │
│  ┌─────────────────────┐                │
│  │     MCP Client      │                │
│  │ executeOrchestrated │                │
│  │       Flow()        │                │
│  └────────┬────────────┘                │
│           │                             │
│           ▼                             │
│  ┌─────────────────────┐                │
│  │ WeatherOrchestrator │                │
│  │ recursiveToolModel  │                │
│  └────────┬────────────┘                │
│           │                             │
│           ▼                             │
│  ┌─────────────────────┐                │
│  │     MCP Server      │                │
│  │   getStateCode      │                │
│  │ ingestAlertsForState│                │
│  └────────┬────────────┘                │
│           │                             │
│           ▼                             │
│  ┌─────────────────────┐                │
│  │     MCP Facade      │                │
│  └────────┬────────────┘                │
│           │                             │
│      ┌────┴────┐                        │
│      ▼         ▼                        │
│  ┌────────┐ ┌──────────┐                │
│  │Gateway │ │Ingestion │                │
│  └───┬────┘ └────┬─────┘                │
│      │            │                     │
│      ▼            ▼                     │
│  ┌─────────────────────┐                │
│  │     Repository      │                │
│  │    Drizzle ORM      │                │
│  └─────────────────────┘                │
└─────────────────┬───────────────────────┘
│
┌─────────┴──────────┐
▼                    ▼
┌──────────────┐    ┌──────────────────┐
│ Neon         │    │ Groq API         │
│ PostgreSQL   │    │ Qwen3-32B        │
│ (cloud)      │    │ (cloud)          │
└──────────────┘    └──────────────────┘
│
▼
┌──────────────────┐
│ NWS API          │
│ Weather Alerts   │
└──────────────────┘

---

## Components

| Component | Responsibility |
|-----------|---------------|
| Express Server | Public HTTP entry point — `/api/weather` and `/mcp` routes |
| MCP Client | Manages connection to MCP server via Streamable HTTP |
| WeatherOrchestrator | Sends prompts and tool definitions to Groq AI |
| MCP Server | Exposes tools via Model Context Protocol over HTTP |
| MCP Facade | Coordinates Gateway and Ingestion per user query |
| MCP Gateway | Resolves state name to NWS state code via Postgres |
| Ingestion | Fetches alerts from NWS API and stores them |
| Repository | All database read/write operations via Drizzle ORM |
| Groq / Qwen3-32B | Cloud AI model — tool calling and response generation |
| Neon PostgreSQL | Cloud database — alerts and states tables |
| NWS API | Live US weather alerts by state — free, no key required |

---

## Design Patterns

| Pattern | Where Used |
|---------|-----------|
| Facade | MCP Facade coordinates Gateway and Ingestion behind a single interface |
| Gateway | MCP Gateway — single entry point for external data lookup |
| Repository | All database access abstracted behind the Repository class |
| Pipeline | Ingestion — fetch → transform → store as sequential steps |
| Orchestrator | WeatherOrchestrator manages the AI tool-calling loop |

---

## Data Flow

```
1. Client POSTs to /api/weather with { question: "What is the weather in Virginia?" }
2. Express validates the request and calls executeOrchestratedFlow
3. Orchestrator sends question + tool definitions to Groq Qwen3-32B
4. Groq calls getStateCode("Virginia")
5. Gateway queries states table in Neon → returns "VA"
6. Groq calls ingestAlertsForState("VA")
7. Ingestion fetches https://api.weather.gov/alerts/active/area/VA
8. Alerts stored in Neon PostgreSQL with stateCode = "VA"
9. Filtered alerts returned to Groq
10. Groq formulates human readable answer
11. Express returns the response to the client
```

---

## Database Schema

```
alerts
──────────────────────────
id            text  PK
severity      text
urgency       text
certainty     text
description   text
areaDesc      text
sent          text
effective     text
onset         text
expires       text
ends          text
instruction   text
stateCode     text

states
──────────────────────────
code          text  PK
name          text
```

---

## Deployment

| Component | Platform | Notes |
|-----------|----------|-------|
| Express + MCP Server | Railway | Auto-deploys from GitHub main branch |
| PostgreSQL | Neon | Serverless, free tier |
| AI Model | Groq | Qwen3-32B, free tier, 14400 req/day |
| NWS API | Public | No key required |

---

## Transport

The MCP server uses **Streamable HTTP transport** (MCP protocol 2025-06-18). A fresh `StreamableHTTPServerTransport` instance is created per request — allowing the MCP server to handle concurrent connections without transport ownership conflicts.

Internal MCP communication (client → server) uses `localhost` within the Railway container. External clients communicate only with the Express `/api/weather` endpoint.

---

## Security

| Measure | Implementation |
|---------|---------------|
| Rate limiting | 10 requests per minute per IP via `express-rate-limit` |
| CORS | Configured via `cors` middleware |
| Input validation | Empty question rejected with 400 before reaching orchestrator |
| Credentials | All secrets via environment variables — never in code or git |

---

Frontend Architecture

User
│
▼
MapChart
│
▼
App.tsx
│
▼
HttpGateway
│
▼
Railway API
│
▼
WeatherPanel

Frontend Components

| Component          | Responsibility                                 |
| ------------------ | ---------------------------------------------- |
| App.tsx            | Central state management and API orchestration |
| MapChart           | State selection and user interaction           |
| WeatherPanel       | Weather visualization and response rendering   |
| HttpGateway        | HTTP communication and retry logic             |
| MarkdownTypewriter | Progressive markdown rendering                 |
| DotLottie          | Weather and UI animations                      |

Retry Logic

The frontend contains retry protection for Railway requests.

Configuration:

* Default retries: 3
* Retry delay: approximately 12 seconds
* Purpose: prevent stale weather responses when backend resources are temporarily unavailable

Mobile Support

The frontend supports mobile devices through:

* Touch state selection
* Responsive CSS media queries
* Dynamic label scaling
* Mobile-specific animation positioning

Weather Animation Mapping

Weather responses are analyzed for keywords:

Weather Animation Mapping

The frontend analyzes AI-generated weather responses and selects an appropriate weather animation.

Keywords evaluated:

* cold water
* thunderstorm
* thunder
* snow
* fire
* wind
* water
* rain
* flood
* rip
* beaches
* storm
* waves
* dust
* currents
* cold
* rivers






## Known Limitations

- Response consistency varies due to the non-deterministic nature of AI models
- Queries must reference a US state name — city or coordinate queries not yet supported
- Historical data queries not supported — current and near-future alerts only
- Free tier rate limits apply on both Groq
- Frontend weather animations rely on keyword matching and may not perfectly represent every alert scenario
- Mobile interactions depend on touch events and state label scaling and may behave differently across devices
- Frontend retry logic is tuned for Railway deployment behavior and may require adjustment if infrastructure changes
