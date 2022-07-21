// @ts-check

import "./lib/loadenv"
// This must come before any other instrumented module.
// See https://docs.datadoghq.com/tracing/languages/nodejs/ for more info.
import "./lib/datadog"

// Needs to be first, due to sharify side-effects.
import { initializeMiddleware } from "./middleware"

import express from "express"
import chalk from "chalk"
import { startServer } from "./lib/startServer"
import server from "./server"

console.log(chalk.green(`\n[Force] NODE_ENV=${process.env.NODE_ENV}\n`))

export const app = express()

initializeMiddleware(app)

// Mount latest force
app.use("/", server)

// Boot
startServer(app)
