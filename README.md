# Note Manager

A secure, full-featured note management application built with Next.js 15, TypeScript, and Tailwind CSS. Create, read, update, and delete notes with real-time search, input validation, XSS protection, and a clean, responsive UI.

**Live Demo → https://note-manager-kb1h-k2wr66qd7-ranbir7s-projects.vercel.app/**

---

## Features

### Core
- **Create** — Add notes with a title and body via a validated form
- **Read** — Fetch and display notes from the JSONPlaceholder API with skeleton loading states
- **Update** — Edit any note via a modal with pre-filled fields and live validation
- **Delete** — Remove notes with a confirmation dialog to prevent accidental deletion
- **Search** — Real-time filtering across note titles and body content

### Security
- **Schema validation** — All form inputs validated with Zod before any API call is made
- **XSS sanitization** — User-generated content stripped of all HTML tags using `isomorphic-dompurify` before submission
- **Error boundaries** — React Error Boundary wraps the main UI to catch and handle unexpected rendering errors gracefully
- **API error handling** — Every fetch call has try/catch with user-facing toast notifications on failure

### UI/UX
- **Skeleton loaders** — Shown during initial data fetch instead of blank screens
- **Toast notifications** — Success and error feedback for every CRUD action via `sonner`
- **Empty states** — Distinct views for "no notes yet" and "no search results"
- **Responsive layout** — Mobile-first design that works across all screen sizes
- **Accessible** — Proper ARIA labels, roles, and form associations throughout

---

## Tech Stack

| Technology --> Purpose |
|--------------|---------|
| Next.js 15 (App Router) --> Framework, routing, server/client components |
| TypeScript --> Full type safety across the entire codebase |
| Tailwind CSS v4 --> Utility-first styling |
| shadcn/ui --> Accessible, unstyled component primitives |
| Zod --> Schema-based input validation with TypeScript inference |
| isomorphic-dompurify --> XSS sanitization for user-generated content |
| sonner --> Toast notification system |
| JSONPlaceholder --> Mock REST API (`/posts` endpoint) |

---

## Project Structure

```
note-manager/
├── app/
│   ├── layout.tsx              # Root layout with font setup and Toaster
│   ├── page.tsx                # Home page (server component)
│   └── globals.css             # Tailwind imports and CSS theme tokens
├── src/
│   ├── components/
│   │   ├── notes/
│   │   │   ├── NoteList.tsx    # Main list with search, edit, delete
│   │   │   ├── NoteForm.tsx    # Create note form with validation
│   │   │   └── index.ts        # Barrel exports
│   │   ├── ui/
│   │   │   ├── button.tsx      # Button component (shadcn)
│   │   │   ├── card.tsx        # Card component (shadcn)
│   │   │   ├── input.tsx       # Input component (shadcn)
│   │   │   └── skeleton.tsx    # Skeleton loader (shadcn)
│   │   ├── ConfirmDialog.tsx   # Delete confirmation modal
│   │   ├── EditNote.tsx   # Edit note modal
│   │   └── ErrorBoundary.tsx   # React error boundary (class component)
│   ├── lib/
│   │   ├── utils.ts            # cn() helper for class merging
│   │   └── sanitize.ts         # DOMPurify wrapper for XSS protection
│   └── types/
│       └── note.ts             # Note interface
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ranbir7/NOTE-MANAGER.git
cd NOTE-MANAGER

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Technical Decisions

**Why Zod for validation?**
Zod provides TypeScript-first schema validation with automatic type inference. Defining a schema once gives both runtime validation and compile-time types — no duplication. Error messages are structured and easy to map to specific form fields.

**Why isomorphic-dompurify for sanitization?**
User input should never be trusted. Even though JSONPlaceholder doesn't persist data, sanitizing before every API call is the correct habit. `isomorphic-dompurify` works in both server and browser environments (important for Next.js SSR), and strips all HTML tags and attributes, preventing XSS attacks if the content were ever rendered as HTML.

**Why a React Error Boundary?**
React's built-in error handling only works via class components with `getDerivedStateFromError`. The Error Boundary wraps the entire notes UI so that if any unexpected rendering error occurs, users see a friendly fallback screen instead of a blank white page or a crash.

**Why client-side fetch instead of server-side?**
JSONPlaceholder is a public mock API with no authentication. Since notes need to be interactive (create, edit, delete update the UI instantly), managing state on the client with `useState` and `useEffect` is the pragmatic choice. A real application with a proper backend would use server components and server actions for data fetching.

**Why sonner for toasts?**
Sonner has a clean, minimal design that fits the app's aesthetic, supports `richColors` for semantic success/error states, and has a simple API (`toast.success()`, `toast.error()`) with no configuration overhead.

**JSONPlaceholder limitations**
JSONPlaceholder is a read-only mock API. POST, PUT, and DELETE requests return simulated responses but don't actually persist data. This means:
- Created notes appear in the UI but are lost on page refresh
- Notes with IDs above 100 (newly created ones) return a 404 on PUT — handled gracefully by updating state locally
- Delete requests return 200 but the note still exists on the server

This is expected behaviour for a mock API and is handled appropriately in the codebase.

---

## Deployment

The application is deployed on Vercel with zero configuration. Every push to the `main` branch triggers an automatic redeployment.

[Live Demo](https://note-manager-kb1h-6jif0b6jh-ranbir7s-projects.vercel.app/)
