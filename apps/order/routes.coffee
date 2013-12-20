CurrentUser = require '../../models/current_user'

@index = (req, res) ->
  return res.redirect('/') unless req.user
  req.user.fetchPendingOrder
    success: (order) =>
      res.render 'template', {order: order}
    error: ->
      res.redirect '/'

@resume = (req, res) ->
  unless ((token = req.query.token) && (orderId = req.params.id)) && req.user
    return res.redirect '/'
  req.user.resumeOrder orderId, token,
    success: ->
      res.redirect '/order'
    error: ->
      res.redirect '/'
