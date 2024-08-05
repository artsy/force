const NO_CACHE = 0
const HOURS_24 = 86400000 // In milliseconds

/**
 * This defines non-default cache TTLs for specific routes. Default is typically
 * 1 hour, is set via GRAPHQL_CACHE_TTL env var, and automatically applies to
 * all routes not defined here.
 */
export const serverCacheTTLs = {
  artist: HOURS_24,
  artists: HOURS_24,
  artistSeries: HOURS_24,
  auction: NO_CACHE,
  categories: HOURS_24,
  collect: HOURS_24,
  collection: HOURS_24,
  collections: HOURS_24,
  gene: HOURS_24,
  sale: NO_CACHE,
}
