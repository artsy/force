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
      require('../apps/partner2/client/index').init()
    else if sd.PARTNER_NEW_LAYOUT is false
      require('../apps/partner/client/index').init()

  '''
  /galleries
  /institutions
  ''': require('../apps/galleries_institutions/client/index')

  '''
  /auction-partnerships
  /institution-partnerships
  /gallery-partnerships
  ''': require('../apps/partnerships/client/index').init

  '''
  /auction-partnerships/edit
  /institution-partnerships/edit
  /gallery-partnerships/edit
  ''': require('../apps/partnerships/client/edit').init

  '''
  /show/.*
  ''': require('../apps/show/client/index').init

  '''
  /shows
  ''': require('../apps/shows/client/index').init

for paths, init of routes
  for path in paths.split('\n')
    $(init) if location.pathname.match path
