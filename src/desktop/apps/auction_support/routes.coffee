Sale = require '../../models/sale.coffee'
buyersPremium = require '../../components/buyers_premium/index.coffee'

@buyersPremium = (req, res, next) ->
  new Sale(id: req.params.id).fetch
    error: res.backboneError
    success: (auction) ->
      buyersPremium auction, (err, html) ->
        return next err if err
        res.render 'buyers-premium', body: html
