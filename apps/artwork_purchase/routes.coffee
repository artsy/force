{ extend } = require 'underscore'
{ NODE_ENV, PURCHASE_FLOW } = require('sharify').data
metaphysics = require '../../lib/metaphysics'
Artwork = require '../../models/artwork'
request = require 'superagent'
PendingOrder = require '../../models/pending_order'
User = require '../../models/user.coffee'
splitTest = require '../../components/split_test/index.coffee'
Fair = require '../../models/fair.coffee'

@index = (req, res, next) ->
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
        fair {
          id
          name
        }
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

  return if metaphysics.debug req, res, send
  inPurchaseTestGroup = res.locals.sd.PURCHASE_FLOW is 'purchase'
  notProduction = res.locals.sd.NODE_ENV is 'development' or
    res.locals.sd.NODE_ENV is 'staging' or
    res.locals.sd.NODE_ENV is 'test'
  return res.redirect "/artwork/#{req.params.id}" unless inPurchaseTestGroup and notProduction
  send = query: query, variables: req.params
  metaphysics send
    .then ({ artwork }) ->
      cookie = req.cookies['purchase-inquiry']
      cachedData = JSON.parse cookie if cookie
      purchase = cachedData if cachedData?.artwork_id is artwork.id
      return res.redirect "/artwork/#{req.params.id}" unless artwork.is_purchasable
      fair = new Fair artwork.fair if artwork.fair
      res.locals.sd.ARTWORK = artwork
      res.render 'index', {
        artwork,
        fair,
        purchase,
        user: req.user
      }

    .catch next

@thankYou = (req, res, next) ->
  query = """
    query artwork($id: String!) {
      artwork(id: $id) {
        id
        _id
        is_purchasable
        href
        partner{
          name
        }
        image {
          url(version: "square")
        }
      }
    }

  """
  return if metaphysics.debug req, res, send
  inPurchaseTestGroup = res.locals.sd.PURCHASE_FLOW is 'purchase'
  notProduction = res.locals.sd.NODE_ENV is 'development' or
    res.locals.sd.NODE_ENV is 'staging' or
    res.locals.sd.NODE_ENV is 'test'
  return res.redirect "/artwork/#{req.params.id}" unless inPurchaseTestGroup and notProduction
  send = query: query, variables: req.params
  metaphysics send
    .then ({ artwork }) ->
      return res.redirect "/artwork/#{req.params.id}" unless artwork.is_purchasable
      res.locals.sd.ARTWORK = artwork
      res.render 'success', { artwork }
    .catch next
