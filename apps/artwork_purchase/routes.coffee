{ extend } = require 'underscore'
{ NODE_ENV, PURCHASE_FLOW } = require('sharify').data
metaphysics = require '../../lib/metaphysics'
Artwork = require '../../models/artwork'
request = require 'superagent'
PendingOrder = require '../../models/pending_order'
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
  send = query: query, variables: req.params
  return if metaphysics.debug req, res, send
  # purchaseFlow = res.locals.sd.PURCHASE_FLOW is 'purchase'
  purchaseFlow = (res.locals.sd.NODE_ENV is 'development' or res.locals.sd.NODE_ENV is 'staging')
  return res.redirect "/artwork/#{req.params.id}" if not purchaseFlow
  metaphysics send
    .then ({ artwork }) ->
      return res.redirect "/artwork/#{req.params.id}" if not artwork.is_purchasable
      res.locals.sd.ARTWORK = artwork
      res.render 'index', { artwork }

    .catch next

@thankYou = (req, res, next) ->
  # purchaseFlow = res.locals.sd.PURCHASE_FLOW is 'purchase'
  purchaseFlow = res.locals.sd.NODE_ENV is 'development' or res.locals.sd.NODE_ENV is 'staging'
  return res.redirect "/artwork/#{req.params.id}" if not purchaseFlow
  res.redirect "/artwork/#{req.params.id}/checkout"
