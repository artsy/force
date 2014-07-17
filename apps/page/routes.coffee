Page = require '../../models/page'

@vanityUrl = (id) ->
  (req, res) ->
    new Page(id: id).fetch
      cache: true
      success: (page) -> res.render 'template', page: page
      error: res.backboneError

@index = (req, res) ->
  new Page(id: req.params.id).fetch
    cache: true
    success: (page) -> res.render 'template', page: page
    error: res.backboneError
