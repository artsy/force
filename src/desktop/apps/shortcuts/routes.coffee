{ Shortcut } = require '../../models/shortcut'

@index = (req, res, next) ->
  next() unless req.params.short
  new Shortcut(id: req.params.short.toLowerCase()).fetch
    cache: true
    success: (shortcut) ->
      res.redirect shortcut.get('long')
    error: -> next()
