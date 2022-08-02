import type { RequestHandler } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

import chalk from "chalk"
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

function skipAssets(req: ArtsyRequest, res: ArtsyResponse): boolean {
  return (
    req.originalUrl.startsWith("/assets") ||
    req.originalUrl.startsWith("/image")
  )
}

const BANNED_PARAMS = ["setup_intent_client_secret"]

function maskParams(initialUrl: string): string {
  const cleaned = BANNED_PARAMS.reduce((prevUrl, bannedParam) => {
    const paramToMask = new RegExp(`${bannedParam}=([^&]+)`)
    const url = prevUrl.replace(paramToMask, (match, matchedValue) =>
      match.replace(matchedValue, "[FILTERED]")
    )
    return url
  }, initialUrl)

  return cleaned
}

export function logFormat(
  tokens: any,
  req: ArtsyRequest,
  res: ArtsyResponse
): string {
  const url = maskParams(tokens.url(req, res))
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

export function morganMiddleware(options: Options): RequestHandler {
  if (options.development) {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    return morgan("dev", {
      skip: options.logAssets ? null : skipAssets,
    })
  }
  return morgan(logFormat, {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    skip: options.logAssets ? null : skipAssets,
  })
}
