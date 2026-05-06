# AI-Alert — Technical Documentation

---

## Architecture Overview

```
User Query
    │
    ▼
┌─────────────────────┐
│   Playwright Spec   │  ← Orchestrator — drives the test flow
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│     MCP Client      │  ← Manages connection + conversation history
│  executeOrchestrated│
│       Flow()        │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  WeatherOrchestrator│  ← Sends messages + tools to local AI
│  recursiveToolModel │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│   Ollama / Qwen     │  ← Local AI model, decides which tool to call
└────────┬────────────┘
         │ tool_calls
         ▼
┌─────────────────────┐
│    MCP Server       │  ← Exposes tools via MCP protocol
│  getStateCode       │
│  ingestAlertsFor    │
│       State         │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│     MCP Facade      │  ← Orchestrates Gateway + Ingestion
└────────┬────────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌──────────┐
│Gateway │ │Ingestion │  ← Gateway resolves state code
│        │ │          │    Ingestion fetches from NWS
└───┬────┘ └────┬─────┘
    │            │
    ▼            ▼
┌─────────────────────┐
│     Repository      │  ← Drizzle ORM — all DB operations
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│     PostgreSQL      │  ← alerts table + states table
└─────────────────────┘
```

---

## Components

| Component | Responsibility |
|-----------|---------------|
| Playwright Spec | Test orchestration and assertions |
| MCP Client | Manages Ollama connection and conversation history |
| WeatherOrchestrator | Sends prompts and tool definitions to the AI model |
| MCP Server | Exposes tools via Model Context Protocol |
| MCP Facade | Coordinates Gateway and Ingestion per user query |
| MCP Gateway | Resolves state name to NWS state code via Postgres |
| Ingestion | Fetches alerts from NWS API and stores them |
| Repository | All database read/write operations via Drizzle ORM |
| PostgreSQL | Persistent storage for alerts and states |
| Ollama + Qwen | Local AI model — free, no API costs |

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
1. User asks: "What is the weather in Virginia?"
2. Orchestrator sends question + tool definitions to Qwen
3. Qwen calls getStateCode("Virginia")
4. Gateway queries states table → returns "VA"
5. Qwen calls ingestAlertsForState("VA")
6. Ingestion fetches https://api.weather.gov/alerts/active/area/VA
7. Alerts stored in PostgreSQL with stateCode = "VA"
8. Filtered alerts returned to Qwen
9. Qwen formulates human readable answer
10. Playwright asserts on response content
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
stateCode     text  FK → states.code

states
──────────────────────────
code          text  PK
name          text
```

---

