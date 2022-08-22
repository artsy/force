/* eslint-disable jest/no-done-callback */
jest.mock("redis", () => ({
  createClient: () => {
    const localCache = new Map()
    return {
      set: (key, val) => {
        localCache.set(key, val)
      },
      get: (key, cb) => {
        const val = localCache.get(key)
        cb(val)
      },
      expire: () => {
        return null
      },
      flushall: cb => {
        localCache.clear()
        cb()
      },
      on: () => {},
    }
  },
}))

let cache
describe("#cache", () => {
  const OLD_ENV = process.env
  beforeAll(async () => {
    process.env = {
      ...OLD_ENV,
      OPENREDIS_URL: "test",
      NODE_ENV: "production",
    }
    cache = (await import("../cache")).cache
    cache.setup(() => {})
  })

  afterAll(() => {
    process.env = OLD_ENV
  })

  it("should find cached values", done => {
    const key = "TEST_KEY"
    cache.set(key, "test", null)
    cache.get(key, val => {
      expect(val).toBe("test")
      done()
    })
  })

  it("should clear the cache", done => {
    const key = "TEST_KEY"
    cache.set(key, "test", null)
    cache.get(key, val => {
      expect(val).toBe("test")
      cache.flushall(() => {
        cache.get(key, val => {
          expect(val).toBeUndefined()
          done()
        })
      })
    })
  })
})
