# AI-Alert — Use Cases

---

## System Context

Our product offers weather advice based on official data retrieved dynamically from the NWS (US National Weather Service).

---

## Use Cases

### UC1 — User receives responses based on queries that include a State Name ✅ Implemented

Our product takes the user's input, extracts the state name from it and performs a query to the NWS API. It then shows the results, if any.

### UC2 — The Agent recognizes different location input types besides State Name 🔲 Pending

Covers cities, villages and latitude/longitude geo information provided by the user.

### UC3 — User can request a report for the last month to see the weather evolution 🔲 Pending

Allows the user to query historical weather data and observe alert trends over time.

## UC4 — User receives visual weather guidance through the React Frontend ✅ Implemented

The user can select a US state on the rendered map and get a Railway response based on his input rendered in the frontend.

## UC5 — User accesses the application from a mobile device ✅ Implemented

Explicit element sizing and positionining rules were made for different mobile view proportions 
