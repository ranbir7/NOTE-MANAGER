'use client';

import { useState, type FormEvent } from 'react';
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

type NoteFormProps = {
  onNoteAdded: (note: Note) => void;
};

export function NoteForm({ onNoteAdded }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sanitizedTitle = sanitize(title);
    const sanitizedBody = sanitize(body);

    const result = noteSchema.safeParse({ title: sanitizedTitle, body: sanitizedBody });
    if (!result.success) {
      const fieldErrors: { title?: string; body?: string } = {};
      result.error.issues.forEach((error) => {
        if (error.path[0] === 'title') fieldErrors.title = error.message;
        if (error.path[0] === 'body') fieldErrors.body = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: result.data.title,
          body: result.data.body,
          userId: 1,
        }),
      });

      if (!response.ok) throw new Error('Failed to create note');

      const data = await response.json();
      const newNote: Note = {
        id: data.id || Date.now(),
        title: result.data.title,
        body: result.data.body,
      };

      toast.success('Note created successfully!');
      onNoteAdded(newNote);
      setTitle('');
      setBody('');
    } catch {
      toast.error('Failed to create note. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-border p-8 mb-8">
      <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">New Note</h2>
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label htmlFor="title" className="block text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
            Title
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            aria-describedby={errors.title ? 'title-error' : undefined}
            className={errors.title ? 'border-destructive' : ''}
          />
          {errors.title && (
            <p id="title-error" role="alert" className="mt-1 text-xs text-destructive">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="body" className="block text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
            Body
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter note content"
            rows={4}
            aria-describedby={errors.body ? 'body-error' : undefined}
            className={`w-full px-3 py-2 border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none ${errors.body ? 'border-destructive' : 'border-input'
              }`}
          />
          {errors.body && (
            <p id="body-error" role="alert" className="mt-1 text-xs text-destructive">
              {errors.body}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-1">
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Note'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => { setTitle(''); setBody(''); setErrors({}); }}
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}
