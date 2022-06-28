import { Router } from "express"
import { cache } from "lib/cache"
import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"

const adminServerRoutes = Router()

adminServerRoutes
  .get("/admin/debug-test", (_req, res) => {
    res.send("Hello World")
  })
  .post("/admin/clear-cache", (req: ArtsyRequest, res: ArtsyResponse, next) => {
    if (req.user?.get("type") !== "Admin") {
      res.status(403).send({
        status: 403,
        message: "You must be logged in as an admin to clear the cache.",
      })
    }

    cache.flushall(() => {
      res.status(200).send({ status: 200, message: "Cache cleared." })
    })
  })

export { adminServerRoutes }
