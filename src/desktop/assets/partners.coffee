sd = require('sharify').data
require('jquery-ui')
require('blueimp-file-upload')
require('jquery.iframe-transport')
require('backbone').$ = $

routes =
  '''
  .*
  ''': ->
    if sd.PARTNER_NEW_LAYOUT is true
      require('../apps/partner2/client/index.coffee').init()
    else if sd.PARTNER_NEW_LAYOUT is false
      require('../apps/partner/client/index.coffee').init()

  '''
  /galleries
  /institutions
  ''': require('../apps/galleries_institutions/client/index.coffee')

  '''
  /auction-partnerships
  /institution-partnerships
  ''': require('../apps/partnerships/client/index.coffee').init

  '''
  /show/.*
  ''': require('../apps/show/client/index.coffee').init

  '''
  /shows
  ''': require('../apps/shows/client/index.coffee').init

for paths, init of routes
  for path in paths.split('\n')
    $(init) if location.pathname.match path
