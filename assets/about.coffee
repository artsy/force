require('backbone').$ = $
require('../lib/vendor/jquery.ui.widget.js')
require('../lib/vendor/jquery.fileupload.js')
require('../lib/vendor/jquery.iframe-transport.js')
$ ->
  if location.pathname.match /// /about/edit ///
    require('../apps/about/client/edit.coffee').init()
  else unless location.pathname.match /// about/page/.* ///
    require('../apps/about/client/index.coffee').init()
    require('../apps/about/client/easter_egg.coffee')()