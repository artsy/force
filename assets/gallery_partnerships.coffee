require('backbone').$ = $
require('../lib/vendor/jquery.ui.widget.js')
require('../lib/vendor/jquery.fileupload.js')
require('../lib/vendor/jquery.iframe-transport.js')
$ ->
  if location.pathname.match /\/gallery-partnerships\/edit$/
    require('../apps/gallery_partnerships/client/edit.coffee').init()
  else
    require('../apps/gallery_partnerships/client/index.coffee').init()
