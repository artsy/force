require('backbone').$ = $
require('jquery-ui')
require('blueimp-file-upload')
require('jquery.iframe-transport')
$ ->
  if location.pathname.match(/\/edit$/)
    require('../apps/partnerships/client/edit.coffee').init()
  else
    require('../apps/partnerships/client/index.coffee').init()
