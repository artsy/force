_ = require 'underscore'

@index = (req, res) ->
  req.user.fetch
    success: (model, response, options) ->
      res.locals.sd.CURRENT_USER =
        _.extend(response, res.locals.sd.CURRENT_USER)
      res.render 'template'
