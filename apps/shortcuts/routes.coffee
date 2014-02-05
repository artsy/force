Shortcut = require '../../models/shortcut'

@index = (req, res) ->
  new Shortcut(short: req.params.short).fetch
    cache  : true
    success: (shortcut) ->
      res.redirect shortcut.get('long')
    error: res.backboneError
