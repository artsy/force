require('backbone').$ = $
require('../lib/vendor/jquery.ui.widget.js')
require('../lib/vendor/jquery.fileupload.js')
require('../lib/vendor/jquery.iframe-transport.js')
$ -> analytics.ready ->
  if location.pathname.match(/\/gallery-partnerships\/edit$/) or location.pathname.match(/\/institution-partnerships\/edit$/)
    require('../apps/partnerships/client/edit.coffee').init()
  else
    require('../apps/partnerships/client/index.coffee').init()
