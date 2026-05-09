import { NoteList } from '@/src/components/notes';
import { ErrorBoundary } from '@/src/components/ErrorBoundary';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        <ErrorBoundary>
          <NoteList />
        </ErrorBoundary>
      </main>
    </div>
  );
}
