#
# Javascript package for the artwork app
#

require 'jquery'

hash =
  '^/artwork/.*/ask_specialist': ->
    require('../apps/artwork/components/bid/client/bootstrap')()

  '^/artwork/.*/auction-results': ->

# On DOM load iterate through the hash and load that artwork page's JS
$ ->
  for regexStr, load of hash
    if location.pathname.match(new RegExp regexStr)
      load()
      break
