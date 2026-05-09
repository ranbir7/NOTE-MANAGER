'use client';

import { Button } from '@/src/components/ui/button';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ConfirmDialog({ open, title, description, onConfirm, onCancel, loading }: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div className="bg-background border border-border w-full max-w-sm mx-4 p-8">
        <h2 id="dialog-title" className="font-heading text-xl font-semibold text-foreground mb-2">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm mb-8">{description}</p>
        <div className="flex gap-3">
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
