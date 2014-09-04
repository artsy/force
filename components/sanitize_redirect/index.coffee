_ = require 'underscore'
{ parse } = require 'url'

redirectFallback = '/'

whitelistHosts = [
  'internal'
  'localhost'
  'artsy.net'
]

hasStatus = (args) ->
  args.length is 2 and typeof args[0] is 'number'

bareHost = (hostname) ->
  return 'internal' unless hostname?
  _.last(hostname.split('.'), subdomainOffset = 2).join '.'

safeAddress = (address) ->
  _.contains whitelistHosts, bareHost(parse(address).hostname)

module.exports = (address) ->
  if safeAddress(address) then address else redirectFallback
