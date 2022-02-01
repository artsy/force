const ip = require("ip")

const resolveIPv4 = function (ipAddress) {
  if (ip.isV6Format(ipAddress) != null && ipAddress.indexOf("::ffff") >= 0) {
    return ipAddress.split("::ffff:")[1]
  }
  return ipAddress
}

//
// Set or append to list of X-Forwarded-For IP addresses (adapted from Force)
//
module.exports = function (req) {
  const ipAddress = resolveIPv4(req.connection.remoteAddress)
  if (req && req.headers && req.headers["x-forwarded-for"]) {
    return req.headers["x-forwarded-for"] + "," + ipAddress
  } else {
    return ipAddress
  }
}
