module.exports = (req, res, next) ->
  if req.user?.get('type') isnt 'Admin'
    err = new Error 'You must be logged in as an admin'
    err.status = 403
    next err
  else
    next()
