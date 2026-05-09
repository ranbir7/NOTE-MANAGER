'use client';

import { useState, useEffect, useCallback } from 'react';
import { Note } from '@/src/types/note';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Skeleton } from '@/src/components/ui/skeleton';
import { ConfirmDialog } from '@/src/components/ConfirmDialog';
import { EditNoteModal } from '@/src/components/EditNote';
import { NoteForm } from '@/src/components/notes/NoteForm';
import { ErrorBoundary } from '@/src/components/ErrorBoundary';
import { toast } from 'sonner';

function NotesSkeleton() {
  return (
    <div className="space-y-4" aria-label="Loading notes">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border border-border p-6">
          <Skeleton className="h-5 w-2/3 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border">
      <div className="text-5xl mb-4 opacity-20 select-none">✎</div>
      {searchTerm ? (
        <>
          <p className="font-heading text-xl text-foreground mb-2">No results found</p>
          <p className="text-muted-foreground text-sm">
            No notes match &quot;{searchTerm}&quot;. Try a different search term.
          </p>
        </>
      ) : (
        <>
          <p className="font-heading text-xl text-foreground mb-2">No notes yet</p>
          <p className="text-muted-foreground text-sm">Create your first note using the form above.</p>
        </>
      )}
    </div>
  );
}

export function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Note | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editTarget, setEditTarget] = useState<Note | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data: { id: number; title: string; body: string }[]) => {
        setNotes(
          data.slice(0, 20).map((item) => ({
            id: item.id,
            title: item.title,
            body: item.body,
          }))
        );
      })
      .catch(() => toast.error('Failed to load notes. Please refresh.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNoteAdded = useCallback((note: Note) => {
    setNotes((prev) => [note, ...prev]);
  }, []);

  const handleNoteUpdated = useCallback((updated: Note) => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete');
      setNotes((prev) => prev.filter((n) => n.id !== deleteTarget.id));
      toast.success('Note deleted successfully!');
    } catch {
      toast.error('Failed to delete note. Please try again.');
    } finally {
      setDeleteLoading(false);
      setDeleteTarget(null);
    }
  };

  return (
    <ErrorBoundary>
      {/* Header */}
      <div className="border-b border-border pb-8 mb-8">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground">Note Manager</h1>
        <p className="text-muted-foreground mt-1 text-sm">Capture, organise, and manage your notes.</p>
      </div>

      {/* Create Form */}
      <NoteForm onNoteAdded={handleNoteAdded} />

      {/* Search */}
      <div className="mb-6">
        <label htmlFor="search" className="sr-only">Search notes</label>
        <div className="relative max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm select-none" aria-hidden>⌕</span>
          <input
            id="search"
            type="search"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>
        {!loading && (
          <p className="text-xs text-muted-foreground mt-2">
            {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}{searchTerm ? ` matching "${searchTerm}"` : ''}
          </p>
        )}
      </div>

      {/* Notes List */}
      {loading ? (
        <NotesSkeleton />
      ) : filteredNotes.length === 0 ? (
        <EmptyState searchTerm={searchTerm} />
      ) : (
        <div className="grid gap-4">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="group">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold line-clamp-1 leading-snug">
                  {note.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
                  {note.body}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditTarget(note)}
                    aria-label={`Edit note: ${note.title}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteTarget(note)}
                    aria-label={`Delete note: ${note.title}`}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modals */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this note?"
        description={`"${deleteTarget?.title}" will be permanently deleted. This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteLoading}
      />

      <EditNoteModal
        note={editTarget}
        onClose={() => setEditTarget(null)}
        onSaved={handleNoteUpdated}
      />
    </ErrorBoundary>
  );
}
