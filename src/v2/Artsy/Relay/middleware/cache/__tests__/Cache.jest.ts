/**
 * @jest-environment node
 */

import { Cache } from "../Cache"

jest.mock("lib/environment")

describe("Cache", () => {
  const getCache = (props = {}) => {
    return new Cache({
      size: 10,
      ttl: 900000,
      ...props,
    })
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe("enableServerSideCaching", () => {
    it("disables if disableServerSideCache=false", () => {
      const cache = getCache({ disableServerSideCache: true })
      expect(cache.enableServerSideCache).toBe(false)
    })

    it("enables if disableServerSideCache=true", () => {
      const cache = getCache({ disableServerSideCache: false })
      expect(cache.enableServerSideCache).toBe(true)
    })
  })

  it("initializes a relay cache", () => {
    const spy = jest.spyOn(Cache.prototype, "initRelayCache")
    const cache = getCache()
    expect(spy).toHaveBeenCalled()
    expect(cache.relayCache).toBeTruthy()
  })

  it("initializes a redis cache", () => {
    const spy = jest.spyOn(Cache.prototype, "initRedisCache")
    const cache = getCache()
    expect(spy).toHaveBeenCalled()
    expect(cache.redisCache).toBeTruthy()
  })

  it("returns a cache key", () => {
    const cache = getCache()
    expect(cache.getCacheKey("ArtistQuery", { slug: "picasso" })).toEqual(
      JSON.stringify({
        queryId: "ArtistQuery",
        variables: {
          slug: "picasso",
        },
      })
    )
  })

  describe("setting and getting cache", () => {
    describe("client", () => {
      it("sets / gets the cache by cacheKey", async () => {
        const cache = getCache()
        cache.enableServerSideCache = false
        const queryId = "ArtistQuery"
        const variables = { slug: "picasso" }
        const response = { data: { artist: { slug: "picasso" } } }
        const options = { cacheConfig: { force: false } }
        cache.set(queryId, variables, response, options)
        expect(await cache.get(queryId, variables)).toEqual(
          expect.objectContaining({ data: { artist: { slug: "picasso" } } })
        )
      })
    })

    describe("server", () => {
      it("does not set cache if enableServerSideCaching=false", async () => {
        const cache = getCache()
        cache.enableServerSideCache = false
        cache.redisCache.get = jest.fn()
        const queryId = "ArtistQuery"
        const variables = { slug: "picasso" }
        const response = { data: { artist: { slug: "picasso" } } }
        const options = { cacheConfig: { force: false } }
        cache.set(queryId, variables, response, options)
        await cache.get(queryId, variables)
        expect(cache.redisCache.get).not.toHaveBeenCalled()
      })

      it("does not set cache if cacheConfig.force=true", async () => {
        const cache = getCache()
        cache.enableServerSideCache = true
        cache.redisCache.get = jest.fn()
        const queryId = "ArtistQuery"
        const variables = { slug: "picasso" }
        const response = { data: { artist: { slug: "picasso" } } }
        const options = { cacheConfig: { force: true } }
        cache.set(queryId, variables, response, options)
        await cache.get(queryId, variables)
        expect(cache.redisCache.get).not.toHaveBeenCalled()
      })

      it("gets / sets the cache by cacheKey", async () => {
        const cache = getCache()
        cache.enableServerSideCache = true
        cache.relayCache.get = jest.fn()
        const queryId = "ArtistQuery"
        const variables = { slug: "picasso" }
        const response = { data: { artist: { slug: "picasso" } } }
        const options = { cacheConfig: { force: false } }

        cache.redisCache = {
          get: () => Promise.resolve(JSON.stringify(response)),
          set: () => Promise.resolve(),
        } as any

        cache.set(queryId, variables, response, options)
        const res = await cache.get(queryId, variables)
        expect(res).toEqual(response)
      })
    })
  })

  describe("cache.clear", () => {
    it("clears all caches", () => {
      const cache = getCache()
      cache.enableServerSideCache = true
      const relaySpy = jest.fn()
      cache.relayCache.clear = relaySpy
      cache.clear()
      expect(relaySpy).toHaveBeenCalled()
    })
  })
})
