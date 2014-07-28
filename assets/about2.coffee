require('backbone').$ = $
require('../lib/vendor/jquery.ui.widget.js')
require('../lib/vendor/jquery.fileupload.js')
require('../lib/vendor/jquery.iframe-transport.js')
$ ->
  if location.pathname.match /// /about2/edit ///
    require('../apps/about2/client/edit.coffee').init()
  else
    require('../apps/about2/client/index.coffee').init()