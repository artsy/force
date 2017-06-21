{ extend } = require 'underscore'
JSONPage = require '../../components/json_page'
resizer = require '../../components/resizer'
markdown = require '../../components/util/markdown'

page = new JSONPage name: 'gallery-partnerships'

@index = (req, res, next) ->
  page.get()
    .then (data) ->
      res.render 'index', extend {},
        page.data,
        resizer,
        markdown: markdown

    .catch next
