{ Page } = require '../../models/page'

@vanityUrl = (id) ->
  (req, res) ->
    new Page(id: id).fetch
      cache: true
      success: (page) -> res.render 'template', page: page
      error: res.backboneError

@index = (req, res) ->
  if req.params.id == "collector-faqs-selling-on-artsy"
    return res.redirect(301, "/consign")
  else
    return new Page(id: req.params.id).fetch
      cache: true
      success: (page) -> res.render 'template', page: page
      error: res.backboneError
