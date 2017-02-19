{ DATA, PATHS } = require('sharify').data

JSONPageEditor = require '../components/json_page/client/editor.coffee'

require('backbone').$ = $
$ ->
  editor = new JSONPageEditor $el: $('.js-json-page-editor'), data: DATA, paths: PATHS
  editor.setup()
