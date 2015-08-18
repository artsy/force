_ = require 'underscore'
JSONPage = require '../../components/json_page'
markdown = require '../../components/util/markdown'
page = new JSONPage name: 'contact'

@index = (req, res, next) ->
  page.get (err, data) ->
    return next err if err
    res.render 'index', _.extend {}, page.data, markdown: markdown
