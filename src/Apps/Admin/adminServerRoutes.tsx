import { Router } from "express"
import { sortBy } from "lodash"
import { cache } from "Server/cacheClient"
import { ArtsyRequest } from "Server/middleware/artsyExpress"
import { getUser } from "Utils/user"

const adminServerRoutes = Router()

/**
 * Clear entire Redis cache
 */
adminServerRoutes.post("/admin/clear-cache", (req: ArtsyRequest, res) => {
  const user = getUser(req.user)

  if (user?.type !== "Admin") {
    res.status(403).send({
      status: 403,
      message: "You must be logged in as an admin to clear the cache.",
    })

    return
  }

  cache.redisClient.flushall(() => {
    res.status(200).send({ status: 200, message: "Cache cleared." })
  })
})

/**
 * Fetch all cache keys
 */
adminServerRoutes.get("/admin/cache-keys", async (req, res) => {
  cache.redisClient.keys("*", (err, keys) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    const sortedKeys = sortBy(
      keys.map(key => JSON.parse(key)),
      "queryId"
    )

    res.json({ keys: sortedKeys })
  })
})

/**
 * Invalidate a specific cache key
 */
adminServerRoutes.delete("/admin/cache-keys", async (req, res) => {
  const { key } = req.body

  cache.redisClient.del(key, (err, response) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    res.json({ success: response })
  })
})

/**
 * Invalidate cache keys by pattern
 */
adminServerRoutes.delete("/admin/cache-keys/pattern", async (req, res) => {
  const { pattern } = req.body

  const scanAndDelete = (cursor, pattern, keysDeleted) => {
    cache.redisClient.scan(
      cursor,
      "MATCH",
      pattern,
      "COUNT",
      "100",
      (error, reply) => {
        if (error) {
          return res.status(500).json({ error: error.message })
        }

        const newCursor = reply[0]
        const keys = reply[1]

        if (keys.length > 0) {
          cache.redisClient.del(keys, (err, response) => {
            if (err) {
              return res.status(500).json({ error: err.message })
            }
            keysDeleted += response
          })
        }

        if (newCursor === "0") {
          return res.json({ success: keysDeleted })
        } else {
          scanAndDelete(newCursor, pattern, keysDeleted)
        }
      }
    )
  }

  scanAndDelete("0", pattern, 0)
})

export { adminServerRoutes }
