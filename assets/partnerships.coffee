require('backbone').$ = $
require('../lib/vendor/jquery.ui.widget.js')
require('../lib/vendor/jquery.fileupload.js')
require('../lib/vendor/jquery.iframe-transport.js')
$ ->
  if location.pathname.match(/\/edit$/)
    require('../apps/partnerships/client/edit.coffee').init()
  else
    require('../apps/partnerships/client/index.coffee').init()
