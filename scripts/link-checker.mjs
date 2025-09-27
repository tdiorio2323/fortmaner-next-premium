#!/usr/bin/env node
import { readFileSync } from 'fs';
import { createServer } from 'vite';

const primaryRoutes = [
  '/',
  '/men',
  '/ladies',
  '/kids',
  '/accessories',
  '/shop-all',
  '/search?q=hoodie',
  '/contact',
  '/demo',
];

const collectionRoute = (handle) => {
  switch (handle) {
    case 'men':
      return '/men';
    case 'women':
      return '/ladies';
    case 'kids':
      return '/kids';
    case 'accessories':
      return '/accessories';
    case 'hats':
      return '/hats';
    case 'fw':
      return '/shop/fw';
    case 'ss':
      return '/shop/ss';
    case 'capsules':
      return '/shop/capsules';
    case 'shop-all':
      return '/shop-all';
    default:
      return `/collections/${handle}`;
  }
};

function getCollectionRoutes() {
  const data = JSON.parse(readFileSync(new URL('../src/data/collections.json', import.meta.url), 'utf8'));
  return (data.collections || [])
    .filter((collection) => collection?.handle)
    .map((collection) => collectionRoute(collection.handle));
}

function getSampleProductRoutes(limit = 3) {
  const primary = JSON.parse(readFileSync(new URL('../src/data/products.json', import.meta.url), 'utf8'));
  const extended = JSON.parse(readFileSync(new URL('../src/data/products-complete.json', import.meta.url), 'utf8'));
  const handles = new Map();
  [...primary, ...extended].forEach((product) => {
    const handle = product.handle || product.slug;
    if (!handle) return;
    handles.set(handle, `/product/${handle}`);
  });
  return Array.from(handles.values()).slice(0, limit);
}

async function main() {
  const paths = Array.from(new Set([
    ...primaryRoutes,
    ...getCollectionRoutes(),
    ...getSampleProductRoutes(),
  ]));

  const server = await createServer({ server: { port: 0, host: '127.0.0.1' } });
  await server.listen();
  const address = server.httpServer?.address();
  const port = typeof address === 'object' && address ? address.port : server.config.server.port || 4173;
  const base = `http://127.0.0.1:${port}`;

  const failures = [];
  for (const path of paths) {
    const url = base + path;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        failures.push({ path, status: response.status });
      }
    } catch (error) {
      failures.push({ path, status: 'FETCH_ERROR', details: error?.message });
    }
  }

  await server.close();

  if (failures.length) {
    console.error('Broken internal links detected:\n');
    for (const failure of failures) {
      console.error(`- ${failure.path} → ${failure.status}${failure.details ? ` (${failure.details})` : ''}`);
    }
    process.exitCode = 1;
  } else {
    console.log(`Checked ${paths.length} internal routes – no 404s detected.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
