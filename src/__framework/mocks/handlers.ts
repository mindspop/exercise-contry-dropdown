// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import { continents, countries } from "countries-list";

export const handlers = [
  http.get("/api/continents", () => {
    return HttpResponse.json(continents);
  }),
  http.get("/api/countries", () => {
    return HttpResponse.json(countries);
  }),
];
