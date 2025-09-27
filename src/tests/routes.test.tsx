import type { ReactNode } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Men from '@/pages/Men';
import Ladies from '@/pages/Ladies';
import Kids from '@/pages/Kids';
import Accessories from '@/pages/Accessories';
import ShopAll from '@/pages/ShopAll';
import SearchPage from '@/pages/Search';
import ProductDetail from '@/pages/ProductDetail';
import { CartProvider } from '@/context/CartContext';
import { TooltipProvider } from '@/components/ui/tooltip';

vi.mock('@/hooks/useCatalog', async (orig) => {
  const actual = await orig();
  return { ...actual, ...(await import('./__mocks__/useCatalog')) };
});

function renderWithProviders(ui: ReactNode, route = '/') {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

describe('route smoke tests', () => {
  it('renders men collection', async () => {
    renderWithProviders(<Men />);
    expect(await screen.findByRole('heading', { name: "Men's Collection" })).toBeInTheDocument();
  });

  it('renders women collection', async () => {
    renderWithProviders(<Ladies />);
    expect(await screen.findByRole('heading', { name: "Women's Collection" })).toBeInTheDocument();
  });

  it('renders kids collection', async () => {
    renderWithProviders(<Kids />);
    expect(await screen.findByRole('heading', { name: 'Kids Collection' })).toBeInTheDocument();
  });

  it('renders accessories', async () => {
    renderWithProviders(<Accessories />);
    expect(await screen.findByRole('heading', { name: 'Accessories Collection' })).toBeInTheDocument();
  });

  it('renders shop all listing', async () => {
    renderWithProviders(<ShopAll />);
    expect(await screen.findByRole('heading', { name: 'Shop All' })).toBeInTheDocument();
  });

  it('renders search results', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/search" element={<SearchPage />} />
      </Routes>,
      '/search?q=hoodie'
    );
    expect(await screen.findByRole('heading', { name: /Search/i })).toBeInTheDocument();
  });

  it('renders product detail', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/product/:slug" element={<ProductDetail />} />
      </Routes>,
      '/product/jaguar-tee'
    );
    expect(await screen.findByRole('heading', { name: /Jaguar Tee/i })).toBeInTheDocument();
  });
});
