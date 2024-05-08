import express from "express"
import { router as router1 } from "./01-Spike/server"
import { router as router2 } from "./02-Markdown/server"
import { router as router3 } from "./03-Instruction-Experiments/server"
import { router as router4 } from "./04-Bio-Follows-Alerts/server"

/*
 * Define API routes that can be colocated with each app experiment
 */

export const artAdvisorServerRoutes = express.Router()

artAdvisorServerRoutes.use("/api/advisor/1", router1)
artAdvisorServerRoutes.use("/api/advisor/2", router2)
artAdvisorServerRoutes.use("/api/advisor/3", router3)
artAdvisorServerRoutes.use("/api/advisor/4", router4)
