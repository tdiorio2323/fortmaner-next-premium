import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CatalogEmptyStateProps {
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}

export const CatalogEmptyState = ({
  title = 'Nothing to show yet',
  description = 'We are updating this collection. Check back soon or explore the latest drops.',
  actionHref = '/',
  actionLabel = 'Return home',
}: CatalogEmptyStateProps) => (
  <div className="rounded-2xl border border-dashed border-muted-foreground/40 bg-background/80 p-10 text-center shadow-sm">
    <h2 className="text-2xl font-semibold">{title}</h2>
    <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{description}</p>
    <Button asChild className="mt-6">
      <Link to={actionHref}>{actionLabel}</Link>
    </Button>
  </div>
);
