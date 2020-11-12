import { IpFilter as ipfilter } from "express-ipfilter"

export default function ipFilter(IP_DENYLIST: string) {
  return ipfilter(IP_DENYLIST.split(","), {
    allowedHeaders: ["x-forwarded-for"],
    log: false,
    mode: "deny",
  })
}
