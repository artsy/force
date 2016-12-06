{ extend } = require 'underscore'
{ NODE_ENV, PURCHASE_FLOW } = require('sharify').data
metaphysics = require '../../lib/metaphysics'
Artwork = require '../../models/artwork'
request = require 'superagent'
PendingOrder = require '../../models/pending_order'
User = require '../../models/user.coffee'
splitTest = require '../../components/split_test/index.coffee'
query = """
  query artwork($id: String!) {
    artwork(id: $id) {
      id
      _id
      is_purchasable
      title
      date
      sale_message
      href
      partner{
        name
      }
      artist_names
      image {
        url(version: "square")
      }
    }
  }

"""

@index = (req, res, next) ->
  return if metaphysics.debug req, res, send
  # purchaseFlow = res.locals.sd.PURCHASE_FLOW is 'purchase'
  purchaseFlow = res.locals.sd.NODE_ENV is 'development' or res.locals.sd.NODE_ENV is 'staging'
  return res.redirect "/artwork/#{req.params.id}" if not purchaseFlow
  send = query: query, variables: req.params
  metaphysics send
    .then ({ artwork }) ->
      return res.redirect "/artwork/#{req.params.id}" if not artwork.is_purchasable
      res.locals.sd.ARTWORK = artwork
      res.render 'index', { artwork, user: req.user, bodyClass: 'minimal-header body-artwork-purchase' }
    .catch next

@thankYou = (req, res, next) ->
  return if metaphysics.debug req, res, send
  # purchaseFlow = res.locals.sd.PURCHASE_FLOW is 'purchase'
  purchaseFlow = res.locals.sd.NODE_ENV is 'development' or res.locals.sd.NODE_ENV is 'staging'
  console.log purchaseFlow
  return res.redirect "/artwork/#{req.params.id}" if not purchaseFlow
  send = query: query, variables: req.params
  metaphysics send
    .then ({ artwork }) ->
      return res.redirect "/artwork/#{req.params.id}" if not artwork.is_purchasable
      res.locals.sd.ARTWORK = artwork
      res.render 'success', { artwork }
    .catch next
