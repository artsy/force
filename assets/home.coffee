require('backbone').$ = $
$ ->
  if sd.CURRENT_USER?.type == "Admin"
    require('../apps/home_2/client/index.coffee').init()
  else
    require('../apps/home/client/index.coffee').init()
