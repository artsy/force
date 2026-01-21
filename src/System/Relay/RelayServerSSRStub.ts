/**
 * Client-side stub for RelayServerSSR.
 * This is used to exclude the heavy server-side SSR module (and its `graphql` dependency)
 * from the client bundle.
 */
class RelayServerSSRStub {
  debug = false
  cache = new Map()

  getMiddleware() {
    return (next: any) => next
  }

  getCache() {
    return []
  }
}

export default RelayServerSSRStub
