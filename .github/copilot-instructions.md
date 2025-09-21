# Copilot Instructions for AI Agents

## Project Overview
- This is a React + TypeScript app for a movie ticket booking platform, structured for modularity and clarity.
- Main entry: `App.tsx` (root component), with routing and context setup.
- Pages are in `pages/` (e.g., `MoviesPage.tsx`, `BookingPage.tsx`), each representing a major UI route.
- Reusable UI components are in `components/` (e.g., `MovieCard.tsx`, `SeatMap.tsx`).
- Contexts for global state (e.g., `BookingContext.tsx`).
- Data mocks in `data/mockData.ts`.
- Service layer in `services/` for API and business logic (e.g., `tmdbService.ts`, `geminiService.ts`, `ratingService.ts`).

## Key Patterns & Conventions
- **Component Structure:**
  - Use functional components and React hooks.
  - Keep UI logic in `components/`, business/data logic in `services/`.
  - Use context for cross-page state (see `contexts/BookingContext.tsx`).
- **Type Safety:**
  - All types/interfaces are in `types.ts`.
  - Always type props and service responses.
- **Mock Data:**
  - Use `data/mockData.ts` for local development/testing.
- **API Integration:**
  - External APIs (e.g., TMDB, Gemini) are abstracted in `services/`.
  - API keys/secrets are loaded from `.env.local` (not in repo).

## Developer Workflows
- **Install:** `npm install`
- **Run Dev Server:** `npm run dev`
- **Environment:** Set `GEMINI_API_KEY` in `.env.local` for Gemini API access.
- **Build:** `npm run build`
- **No formal test suite** (add tests in future under `__tests__/` or similar).

## Integration Points
- **Gemini API:** Used via `services/geminiService.ts` for AI features.
- **TMDB API:** Used via `services/tmdbService.ts` for movie data.
- **Star Ratings:** Managed in `services/ratingService.ts` and `components/StarRating.tsx`.

## Project-Specific Advice
- When adding new pages, follow the pattern in `pages/` and update routing in `App.tsx`.
- For new data models, update `types.ts` and mock data as needed.
- Keep business logic out of UI components—use the `services/` layer.
- Use context for state shared across multiple pages (see `BookingContext.tsx`).

## Examples
- See `BookingPage.tsx` for booking flow, using context and service calls.
- See `MovieDetailPage.tsx` for API integration and UI composition.

---
For more, see `README.md` and explore the `services/`, `pages/`, and `components/` directories for patterns.
