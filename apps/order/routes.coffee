CurrentUser = require '../../models/current_user.coffee'

fetchPendingOrder = (req, res, options) ->
  currentUser = req.user or new CurrentUser
  options.error = -> res.redirect '/'
  options.session_id = req.session?.id
  currentUser.fetchPendingOrder options

@shipping = (req, res) ->
  fetchPendingOrder req, res,
    success: (order) ->
      res.locals.sd.ORDER = order.toJSON()
      res.render 'templates/shipping', { order: order }

@checkout = (req, res) ->
  fetchPendingOrder req, res,
    success: (order) ->
      unless order.get('shipping_address')
        return res.redirect('/order')
      res.locals.sd.ORDER = order.toJSON()
      res.render 'templates/checkout', { order: order }

@complete = (req, res) ->
  fetchPendingOrder req, res,
    success: (order) ->
      res.locals.sd.ORDER = order.toJSON()
      res.render 'templates/complete', { order: order }

@resume = (req, res) ->
  unless (token = req.query.token) and (orderId = req.params.id)
    return res.redirect '/'

  currentUser = req.user or new CurrentUser
  currentUser.resumeOrder orderId, token,
    session_id: req.session?.id
    success: ->
      res.redirect '/order'
    error: ->
      res.redirect '/'
