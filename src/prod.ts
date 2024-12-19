import "./Server/loadenv"
// This must come before any other instrumented module.
// See https://docs.datadoghq.com/tracing/languages/nodejs/ for more info.
import "./Server/datadog"

import path from "path"
import chalk from "chalk"
import express from "express"
import { startServer } from "./Server/startServer"

console.log(chalk.green(`\n[Force] NODE_ENV=${process.env.NODE_ENV}\n`))

export const app = express()

const server = require(path.join(process.cwd(), `./dist/server/index.js`))

// Mount latest force
app.use("/", server)

const boot = async () => {
  try {
    await startServer(app)
  } catch (error) {
    console.log(chalk.red(`\n[Force] Error starting server: ${error}\n`))
  }
}

boot()
