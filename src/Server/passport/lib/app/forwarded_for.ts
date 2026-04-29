import ip from "ip"

interface ForwardedForRequest {
  connection: { remoteAddress?: string }
  headers?: Record<string, string | string[] | undefined>
}

const resolveIPv4 = (ipAddress: string) => {
  if (ip.isV6Format(ipAddress) != null && ipAddress.indexOf("::ffff") >= 0) {
    return ipAddress.split("::ffff:")[1]
  }
  return ipAddress
}

//
// Set or append to list of X-Forwarded-For IP addresses (adapted from Force)
//
const forwardedFor = (req: ForwardedForRequest) => {
  const ipAddress = resolveIPv4(req.connection.remoteAddress as string)
  if (req && req.headers && req.headers["x-forwarded-for"]) {
    return `${req.headers["x-forwarded-for"]},${ipAddress}`
  } else {
    return ipAddress
  }
}

export default forwardedFor

module.exports = forwardedFor
