#
# Javascript package for the user settings app
#

require 'jquery'
sd = require('sharify').data

hash =

  '^/user/.*': ->
    require('../apps/user/client/view.coffee').init()

  '^/profile/.*': ->
    require('../apps/user/client/view.coffee').init()

# On DOM load iterate through the hash and load that app's JS
$ ->
  for regexStr, load of hash
    if location.pathname.replace(/\/$/,'').match(new RegExp regexStr)
      load()
      break
