export const useProductBySlug = (slug: string) => ({
  data:
    slug === 'jaguar-tee'
      ? { title: 'Jaguar Tee', images: [{ src: '/img.jpg' }], variants: [{ id: 'v1', price: 3200 }] }
      : null,
  isLoading: false,
  error: null,
});
