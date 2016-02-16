require('backbone').$ = $
$ ->
  if location.pathname.match('info')
    require('../apps/fair_info/client/index.coffee').init()
  else
    require('../apps/fair/client/index.coffee').init()
