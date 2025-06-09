const NO_CACHE = 0
const MINUTES_5 = 300 // In seconds

/**
 * This defines non-default cache TTLs for specific routes. Default is typically
 * 1 hour, is set via GRAPHQL_CACHE_TTL env var, and automatically applies to
 * all routes not defined here.
 */
export const serverCacheTTLs = {
  article: MINUTES_5,
  articles: MINUTES_5,
  auction: NO_CACHE,
  sale: NO_CACHE,
}
