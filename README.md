# Note Manager

A **Secure Task & Note Manager** built with Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui.

## Live Demo

> Deploy to Vercel and add your URL here.

## Features

| Feature | Implementation |
|---|---|
| Create notes | Validated form with Zod schema |
| Read notes | Fetched from JSONPlaceholder `/posts`, real-time search |
| Update notes | Modal editor with PUT request |
| Delete notes | Confirmation dialog before DELETE request |
| Input validation | Zod schema-based, client-side |
| XSS sanitization | `isomorphic-dompurify` strips all HTML tags |
| Error handling | React Error Boundary + toast notifications |
| Loading states | Skeleton loaders |
| Empty states | Contextual empty views for no-data and no-search-results |
| Responsive design | Mobile-first Tailwind layout |
| Toast notifications | `sonner` for CRUD feedback |

## Tech Stack

- **Next.js 15** — App Router, Server/Client Components
- **TypeScript** — Full type safety
- **Tailwind CSS v4** — Utility-first styling
- **shadcn/ui** — Accessible component primitives
- **Zod** — Schema-based input validation
- **isomorphic-dompurify** — XSS sanitization
- **sonner** — Toast notifications

## Setup

```bash
# 1. Clone & install
git clone <repo-url>
cd note-manager
npm install

# 2. Install the sanitization dependency
npm install isomorphic-dompurify
npm install -D @types/dompurify

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Folder Structure

```
src/
  components/
    notes/
      NoteList.tsx      # Main list, search, delete
      NoteForm.tsx      # Create note form
      index.ts          # Barrel exports
    ui/
      button.tsx
      card.tsx
      input.tsx
      skeleton.tsx
    ConfirmDialog.tsx   # Delete confirmation modal
    EditNoteModal.tsx   # Edit note modal
    ErrorBoundary.tsx   # React error boundary
  lib/
    utils.ts            # cn() helper
    sanitize.ts         # DOMPurify wrapper
  types/
    note.ts             # Note interface
app/
  page.tsx              # Home page
  layout.tsx            # Root layout with Toaster
  globals.css           # Tailwind + theme tokens
```

## Technical Decisions

- **Zod** was chosen for schema validation because it provides TypeScript-first type inference and clear error messages.
- **isomorphic-dompurify** sanitizes all user input before it hits the API to prevent XSS, stripping all HTML/script tags.
- **React Error Boundary** wraps the main list to gracefully handle any unexpected rendering errors.
- **Optimistic updates** are applied locally after successful API responses since JSONPlaceholder doesn't persist data.
- **Sonner** was chosen over react-hot-toast for its polished UI and `richColors` support.

## Deployment

```bash
npm run build
```

Deploy via [Vercel](https://vercel.com) by importing the GitHub repository.
