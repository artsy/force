@index = (req, res) ->

  # If not logged in, send them to sign up to return to this handler
  res.render 'template'