_ = require 'underscore'
{ parse } = require 'url'

redirectFallback = '/'
whitelistHosts = [
  'internal'
  'localhost'
  'artsy.net'
]
whitelistProtocols = [
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
  _.contains(whitelistProtocols, parsed.protocol) and
  _.contains(whitelistHosts, bareHost(parsed.hostname))

module.exports = (address) ->
  if safeAddress(address) then address else redirectFallback
