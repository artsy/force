import { Router } from "express"
import { cache } from "Server/cache"
import { ArtsyRequest } from "Server/middleware/artsyExpress"
import { getUser } from "Utils/user"

const adminServerRoutes = Router()

adminServerRoutes.post("/admin/clear-cache", (req: ArtsyRequest, res) => {
  const user = getUser(req.user)

  if (user?.type !== "Admin") {
    res.status(403).send({
      status: 403,
      message: "You must be logged in as an admin to clear the cache.",
    })

    return
  }

  cache.flushall(() => {
    res.status(200).send({ status: 200, message: "Cache cleared." })
  })
})

export { adminServerRoutes }
