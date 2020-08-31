#
# Assets for the Artists app
#

require 'jquery'

hash =

  '^/artists.*': ->
    require('../apps/artists/client.coffee').init()

# On DOM load iterate through the hash and load that app's JS
$ ->
  for regexStr, load of hash
    if location.pathname.replace(/\/$/,'').match(new RegExp regexStr)
      load()
      break
