Page = require '../../models/page'

@vanityUrl = (id) ->
  (req, res) ->
    new Page(id: id).fetch
      success: (page) -> res.render 'template', page: page
      error: res.backboneError