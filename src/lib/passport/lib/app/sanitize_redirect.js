//
// Cleans out urls so they are safe to redirect to inside of an artsy.net app.
// Code stolen from Force, thanks @dzucconi!
//
const parse = require("url").parse

const redirectFallback = "/"
const allowlistHosts = ["internal", "localhost", "artsy.net"]
const allowlistProtocols = ["http:", "https:", null]

const bareHost = function (hostname) {
  if (hostname == null) return "internal"
  const hostParts = hostname.split(".")
  return hostParts.slice(hostParts.length - 2).join(".")
}

const normalizeAddress = function (address) {
  return address.replace(/^http(s?):\/+/, "http://").replace(/\s/g, "")
}

const safeAddress = function (address) {
  let parsed = parse(normalizeAddress(address), false, true)
  return (
    allowlistProtocols.indexOf(parsed.protocol) !== -1 &&
    allowlistHosts.indexOf(bareHost(parsed.hostname)) !== -1
  )
}

module.exports = function (address) {
  return safeAddress(address) ? address : redirectFallback
}
