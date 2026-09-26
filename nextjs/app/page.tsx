import { fetchCanvasPage } from '@/lib/drupal';
import { CanvasTreeRenderer } from '@/components/canvas/CanvasTreeRenderer';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';


export default async function HomePage() {
  const pageData = await fetchCanvasPage('/home');

  if (!pageData) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-xl">
        <h1 className="text-3xl font-bold mb-4">Connecting to Drupal Canvas...</h1>
        <p className="text-muted-foreground mb-6">
          Make sure Drupal Lerd is running at <code>https://drupal-lerd.test</code>.
        </p>
      </div>
    );
  }

  return (
    <main>
      <CanvasTreeRenderer tree={pageData.component_tree} />
    </main>
  );
}
