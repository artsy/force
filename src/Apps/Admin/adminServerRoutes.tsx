import { Router } from "express"
import { sortBy } from "lodash"
import { cache } from "Server/cacheClient"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import { getUser } from "Utils/user"

const adminServerRoutes = Router()

/**
 * Clear entire Redis cache
 */
adminServerRoutes.post(
  "/admin/clear-cache",
  (req: ArtsyRequest, res: ArtsyResponse) => {
    checkIsAdmin(req, res)

    cache.redisClient.flushall(() => {
      res.status(200).send({ status: 200, message: "Cache cleared." })
    })
  }
)

/**
 * Fetch all cache keys
 */
adminServerRoutes.get(
  "/admin/cache-keys",
  async (req: ArtsyRequest, res: ArtsyResponse) => {
    checkIsAdmin(req, res)

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
  }
)

/**
 * Invalidate a specific cache key
 */
adminServerRoutes.delete(
  "/admin/cache-keys",
  async (req: ArtsyRequest, res: ArtsyResponse) => {
    checkIsAdmin(req, res)

    const key = JSON.stringify(req.body.key)

    cache.redisClient.del(key, (err, response) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }

      res.json({ success: response })
    })
  }
)

const checkIsAdmin = (req: ArtsyRequest, res: ArtsyResponse) => {
  const user = getUser(req.user)

  if (user?.type !== "Admin") {
    res.status(403).send({
      status: 403,
      message: "You must be logged in as an admin to clear the cache.",
    })

    return
  }
}

export { adminServerRoutes }
