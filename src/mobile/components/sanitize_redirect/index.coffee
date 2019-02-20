_ = require 'underscore'
{ parse } = require 'url'

redirectFallback = '/'
allowedHosts = [
  'internal'
  'localhost'
  'artsy.net'
]
allowedProtocols = [
  'http:'
  'https:'
  null
]

hasStatus = (args) ->
  args.length is 2 and typeof args[0] is 'number'

bareHost = (hostname) ->
  return 'internal' unless hostname?
  _.last(hostname.split('.'), subdomainOffset = 2).join '.'

normalizeAddress = (address) ->
  address.replace /^http(s?):\/+/, 'http://'

safeAddress = (address) ->
  parsed = parse(normalizeAddress(address), false, true)
  _.contains(allowedProtocols, parsed.protocol) and
  _.contains(allowedHosts, bareHost(parsed.hostname))

module.exports = (address) ->
  if safeAddress(address) then address else redirectFallback
