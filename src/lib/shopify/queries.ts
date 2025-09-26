export const SF_PRODUCTS = /* GraphQL */ `
  query Products($first: Int = 50) {
    products(first: $first) {
      nodes {
        id
        handle
        title
        description
        images(first: 8) { nodes { url } }
        variants(first: 20) {
          nodes { id title availableForSale sku price { amount } }
        }
      }
    }
  }
`;

export const SF_PRODUCT_BY_HANDLE = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      images(first: 8) { nodes { url } }
      variants(first: 20) {
        nodes { id title availableForSale sku price { amount } }
      }
    }
  }
`;

export const SF_CART_CREATE = /* GraphQL */ `
  mutation CartCreate {
    cartCreate { cart { id checkoutUrl } }
  }
`;

export const SF_CART_LINES_ADD = /* GraphQL */ `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;