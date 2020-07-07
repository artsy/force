/**
 * @jest-environment node
 */

import { Cache } from "../Cache"
jest.mock("lib/isServer")
jest.mock("lib/cacheClient", () => {
  return {
    cache: {
      get: () =>
        Promise.resolve(
          JSON.stringify({ data: { artist: { slug: "picasso" } } })
        ),
      set: jest.fn(),
    },
  }
})
import { cache as cacheClient } from "lib/cacheClient"

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
    it("disables if disableServerSideCache=true", () => {
      process.env.ENABLE_SERVER_SIDE_CACHE = "true"
      const cache = getCache({ disableServerSideCache: true })
      expect(cache.enableServerSideCache).toBe(false)
    })

    it("enables if disableServerSideCache=false", () => {
      process.env.ENABLE_SERVER_SIDE_CACHE = "true"
      const cache = getCache({ disableServerSideCache: false })
      expect(cache.enableServerSideCache).toBe(true)
    })

    describe("env var overides via ENABLE_SERVER_SIDE_CACHE", () => {
      it("enables if disableServerSideCache=false", () => {
        process.env.ENABLE_SERVER_SIDE_CACHE = "false"
        const cache = getCache({ disableServerSideCache: false })
        expect(cache.enableServerSideCache).toBe(false)
      })
    })
  })

  it("initializes a relay cache", () => {
    const spy = jest.spyOn(Cache.prototype, "initRelayCache")
    const cache = getCache()
    expect(spy).toHaveBeenCalled()
    expect(cache.relayCache).toBeTruthy()
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
        const cacheSpy = jest.spyOn(cacheClient, "set")
        const cache = getCache()
        cache.enableServerSideCache = false
        const queryId = "ArtistQuery"
        const variables = { slug: "picasso" }
        const response = { data: { artist: { slug: "picasso" } } }
        const options = { cacheConfig: { force: false } }
        cache.set(queryId, variables, response, options)
        await cache.get(queryId, variables)
        expect(cacheSpy).not.toHaveBeenCalled()
      })

      it("does not set cache if cacheConfig.force=true", async () => {
        const cacheSpy = jest.spyOn(cacheClient, "get")
        const cache = getCache()
        cache.enableServerSideCache = true
        const queryId = "ArtistQuery"
        const variables = { slug: "picasso" }
        const response = { data: { artist: { slug: "picasso" } } }
        const options = { cacheConfig: { force: true } }
        cache.set(queryId, variables, response, options)
        await cache.get(queryId, variables)
        expect(cacheSpy).not.toHaveBeenCalled()
      })

      it("gets / sets the cache by cacheKey", async () => {
        const cache = getCache()
        cache.enableServerSideCache = true
        cache.relayCache.get = jest.fn()
        const queryId = "ArtistQuery"
        const variables = { slug: "picasso" }
        const options = { cacheConfig: { force: false } }
        const cacheResp = { data: { artist: { slug: "picasso" } } }
        cache.set(queryId, variables, cacheResp, options)
        const res = await cache.get(queryId, variables)
        expect(res).toEqual(cacheResp)
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
