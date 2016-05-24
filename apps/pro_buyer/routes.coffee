{ extend } = require 'underscore'
JSONPage = require '../../components/json_page'
resizer = require '../../components/resizer'

module.exports = (page) ->
  index: (req, res, next) ->
    page
      .get()
      .then (data) ->
        res.render 'index', data

      .catch next
