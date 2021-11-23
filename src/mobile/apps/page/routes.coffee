{ Page } = require '../../../desktop/models/page'
{ APP_URL } = require '../../../config'

module.exports.vanityUrl = (id) ->
  (req, res) ->
    new Page(id: id).fetch
      success: (page) ->
        res.render 'template', page: page
      error: res.backboneError

module.exports.index = (req, res) ->
  new Page(id: req.params.id).fetch
    success: (page) -> res.render 'template', page: page
    error: res.backboneError
