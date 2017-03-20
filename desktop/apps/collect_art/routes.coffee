{ extend } = require 'underscore'
JSONPage = require '../../components/json_page'
resizer = require '../../components/resizer'
markdown = require '../../components/util/markdown'
Items = require '../../collections/items'

landing = new JSONPage name: 'collect-art'

@landing = (req, res, next) ->
  landing.get()
    .then (data) ->
      res.render 'landing', extend {},
        landing.data,
        resizer,
        markdown: markdown

    .catch next
