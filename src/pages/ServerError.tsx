import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Home } from 'lucide-react';

const ServerError = () => {
  useEffect(() => {
    document.title = '500 - Something went wrong | Fort Maner';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'An unexpected error occurred while loading Fort Maner. Please try again or return home.');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-brand-black">500</h1>
        <p className="mt-4 text-lg font-semibold">Something went wrong</p>
        <p className="mt-3 text-muted-foreground">
          Our team has been notified. Refresh the page or return to the homepage while we sort this out.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => window.location.reload()} variant="secondary" className="flex items-center justify-center gap-2">
            <RefreshCcw className="h-4 w-4" />
            Try again
          </Button>
          <Button asChild className="flex items-center justify-center gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Go home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
