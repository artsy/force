CurrentUser = require '../../models/current_user'

@shipping = (req, res) ->
  return res.redirect('/') unless req.user
  req.user.fetchPendingOrder
    success: (order) ->
      res.locals.sd.ORDER = order.toJSON()
      res.render 'templates/shipping', { order: order }
    error: ->
      res.redirect '/'

@checkout = (req, res) ->
  return res.redirect('/') unless req.user
  req.user.fetchPendingOrder
    success: (order) ->
      res.locals.sd.ORDER = order.toJSON()
      res.render 'templates/checkout', { order: order }
    error: ->
      res.redirect '/'

@complete = (req, res) ->
  return res.redirect('/') unless req.user
  req.user.fetchPendingOrder
    success: (order) ->
      res.locals.sd.ORDER = order.toJSON()
      res.render 'templates/complete', { order: order }
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
