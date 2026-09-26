import { fetchCanvasPage } from '@/lib/drupal';
import { CanvasTreeRenderer } from '@/components/canvas/CanvasTreeRenderer';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';


export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const path = `/${slug ? slug.join('/') : ''}`;
  const pageData = await fetchCanvasPage(path);

  if (!pageData) {
    notFound();
  }

  return (
    <main>
      <div className="bg-slate-50 border-b border-border py-4 px-4">
        <div className="container mx-auto max-w-6xl text-xs text-muted-foreground flex items-center gap-2">
          <span>Decoupled Route:</span>
          <code className="bg-white px-2 py-0.5 rounded border border-border font-mono">{path}</code>
          <span>•</span>
          <span>Canvas Page ID: {pageData.id}</span>
        </div>
      </div>
      <CanvasTreeRenderer tree={pageData.component_tree} />
    </main>
  );
}
