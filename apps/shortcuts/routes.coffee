Shortcut = require '../../models/shortcut'

@index = (req, res) ->
  console.log req.params.short, 'shortcut!!!!!!!!!!!!!!!!!!!!!'
  new Shortcut(short: req.params.short).fetch
    cache  : true
    success: (shortcut) ->
      console.log '!!!!!!!!!!!!!! >>> shortcut', shortcut
      res.redirect shortcut.get('long')
    error: res.backboneError
