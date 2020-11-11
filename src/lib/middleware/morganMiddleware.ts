import chalk from "chalk"
import type { Request, Response } from "express"
import morgan from "morgan"

function colorize(url: string, status: number): string {
  switch (false) {
    case !(status >= 500):
      return chalk.red(url + " " + status)
    case !(status >= 400):
      return chalk.yellow(url + " " + status)
    case !(status >= 300):
      return chalk.cyan(url + " " + status)
    case !(status >= 200):
      return chalk.green(url + " " + status)
    default:
      return chalk.white(url + " " + status)
  }
}

function skipAssets(req: Request, res: Response): boolean {
  return (
    req.originalUrl.startsWith("/assets") ||
    req.originalUrl.startsWith("/image")
  )
}

export function logFormat(tokens: any, req: Request, res: Response): string {
  const url = tokens.url(req, res)
  const status = tokens.status(req, res)

  return (
    chalk.blue(tokens.method(req, res)) +
    " " +
    colorize(url, status) +
    " " +
    chalk.cyan(tokens["response-time"](req, res) + "ms") +
    " " +
    chalk.white(tokens["remote-addr"](req, res)) +
    ' "' +
    chalk.white(tokens["user-agent"](req, res)) +
    '"'
  )
}

type Options = {
  development: boolean
  logAssets: boolean
}

export default function morganMiddleware(options: Options) {
  if (options.development) {
    return morgan("dev", {
      skip: options.logAssets ? null : skipAssets,
    })
  }
  return morgan(logFormat, {
    skip: options.logAssets ? null : skipAssets,
  })
}
