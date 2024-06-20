import express from "express"
import { router as router1 } from "./01-Spike/server"
import { router as router2 } from "./02-Markdown/server"
import { router as router3 } from "./03-Instruction-Experiments/server"
import { router as router4 } from "./04-Bio-Follows-Alerts/server"
import { router as router5 } from "./05-Near-Object-Rail/server"
import { router as router6 } from "./06-Discovery-Neartext/server"
import { router as router7 } from "./07-Curated-Discovery/server"

/*
 * Define API routes that can be collocated with each app experiment
 */

export const artAdvisorServerRoutes = express.Router()

artAdvisorServerRoutes.use("/api/advisor/1", router1)
artAdvisorServerRoutes.use("/api/advisor/2", router2)
artAdvisorServerRoutes.use("/api/advisor/3", router3)
artAdvisorServerRoutes.use("/api/advisor/4", router4)
artAdvisorServerRoutes.use("/api/advisor/5", router5)
artAdvisorServerRoutes.use("/api/advisor/6", router6)
artAdvisorServerRoutes.use("/api/advisor/7", router7)
