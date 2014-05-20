require('backbone').$  = $
$ ->
  if location.pathname.match /// (.*)/collection/(.*) ///
    require('../apps/user_profile/client/collection.coffee').init()
  else
    require('../apps/user_profile/client/index.coffee').init()