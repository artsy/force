require('backbone').$ = $
$ ->
  if location.pathname.match /// /about2/edit ///
    require('../apps/about2/client/edit.coffee').init()
  else
    require('../apps/about2/client/index.coffee').init()