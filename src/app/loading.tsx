export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        <div className="border-b border-border pb-8 mb-8">
          <div className="h-10 w-48 bg-muted animate-pulse mb-2" />
          <div className="h-4 w-64 bg-muted animate-pulse" />
        </div>
        <div className="border border-border p-8 mb-8">
          <div className="h-6 w-32 bg-muted animate-pulse mb-6" />
          <div className="h-10 w-full bg-muted animate-pulse mb-4" />
          <div className="h-24 w-full bg-muted animate-pulse mb-4" />
          <div className="h-10 w-28 bg-muted animate-pulse" />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border border-border p-6">
              <div className="h-5 w-2/3 bg-muted animate-pulse mb-3" />
              <div className="h-4 w-full bg-muted animate-pulse mb-2" />
              <div className="h-4 w-5/6 bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
