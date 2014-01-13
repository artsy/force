@initial = (req, res) ->
  res.redirect '/personalize/collect'

@index = (req, res) ->
  return res.redirect('/') unless req.user
  res.render 'template'
