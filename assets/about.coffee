require('backbone').$ = $
$ ->
  unless location.pathname.match /// about/page/.* ///
    require('../apps/about/client/index.coffee').init()
    require('../apps/about/client/easter_egg.coffee')()
