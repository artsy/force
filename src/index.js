// @ts-check

import "./Server/loadenv"
// This must come before any other instrumented module.
// See https://docs.datadoghq.com/tracing/languages/nodejs/ for more info.
import "./Server/datadog"

import express from "express"
import chalk from "chalk"
import { startServer } from "./Server/startServer"
import server from "server"

console.log(chalk.green(`\n[Force] NODE_ENV=${process.env.NODE_ENV}\n`))

export const app = express()

// Mount latest force
app.use("/", server)

// Boot
startServer(app)
