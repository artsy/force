@index = (req, res) ->
  res.redirect '/posts/featured'

@featured = (req, res) ->
  res.render 'template',

@personalized = (req, res) ->
  res.render 'template'

@all = (req, res) ->
  unless req.user?.isAdmin()
    return res.redirect '/posts/featured'
  res.render 'template'
