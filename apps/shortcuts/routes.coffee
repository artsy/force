Shortcut = require '../../models/shortcut'

@index = (req, res, next) ->
  new Shortcut(id: req.params.short).fetch
    cache  : true
    success: (shortcut) ->
      res.redirect shortcut.get('long')
    error: res.backboneError
