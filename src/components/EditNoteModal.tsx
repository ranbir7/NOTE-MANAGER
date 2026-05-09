'use client';

import { useState, type FormEvent, useEffect } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { Note } from '@/src/types/note';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { sanitize } from '@/src/lib/sanitize';

const noteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  body: z.string().min(1, 'Body is required').max(500, 'Body must be less than 500 characters'),
});

interface EditNoteModalProps {
  note: Note | null;
  onClose: () => void;
  onSaved: (updated: Note) => void;
}

export function EditNoteModal({ note, onClose, onSaved }: EditNoteModalProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
      setErrors({});
    }
  }, [note]);

  if (!note) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sanitizedTitle = sanitize(title);
    const sanitizedBody = sanitize(body);

    const result = noteSchema.safeParse({ title: sanitizedTitle, body: sanitizedBody });
    if (!result.success) {
      const fieldErrors: { title?: string; body?: string } = {};
      result.error.issues.forEach((err) => {
        if (err.path[0] === 'title') fieldErrors.title = err.message;
        if (err.path[0] === 'body') fieldErrors.body = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      if (note.id <= 100) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${note.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: note.id, title: result.data.title, body: result.data.body, userId: 1 }),
        });
        if (!response.ok) throw new Error('Failed to update note');
      }

      toast.success('Note updated successfully!');
      onSaved({ id: note.id, title: result.data.title, body: result.data.body });
      onClose();
    } catch {
      toast.error('Failed to update note. Please try again.');
    } finally {
      setLoading(false);
    }

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-modal-title"
      >
        <div className="bg-background border border-border w-full max-w-lg mx-4 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 id="edit-modal-title" className="font-heading text-xl font-semibold">Edit Note</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors text-xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="edit-title" className="block text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                Title
              </label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="edit-body" className="block text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                Body
              </label>
              <textarea
                id="edit-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                className={`w-full px-3 py-2 border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none ${errors.body ? 'border-destructive' : 'border-input'}`}
              />
              {errors.body && <p className="mt-1 text-xs text-destructive">{errors.body}</p>}
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
