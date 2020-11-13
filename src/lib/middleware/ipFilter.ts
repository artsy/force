import type { RequestHandler } from "express"

import { IpFilter as ipfilter } from "express-ipfilter"

export function ipFilter(IP_DENYLIST: string): RequestHandler {
  return ipfilter(IP_DENYLIST.split(","), {
    allowedHeaders: ["x-forwarded-for"],
    log: false,
    mode: "deny",
  })
}
