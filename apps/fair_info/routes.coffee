@assignFair = (req, res, next) ->
  res.locals.fair = res.locals.profile?.related().owner
  next()

@index = (req, res) ->
  res.render("index")

@visitors = (req, res) ->
  res.render("visitors")

@programming = (req, res) ->
  res.render("programming")