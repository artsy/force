{ extend } = require 'underscore'
metaphysics = require '../../lib/metaphysics'
Artwork = require '../../models/artwork'
request = require 'superagent'
PendingOrder = require '../../models/pending_order'
splitTest = require '../../components/split_test/index.coffee'
{ isEligible } = require './helpers.coffee'
query = """
  query artwork($id: String!) {
    artwork(id: $id) {
      id
      _id
      is_acquireable
      is_inquireable
      title
      date
      sale_message
      href
      partner{
        name
      }
      artist_names
      image{
        cropped(width:58, height:58){
          url
        }
      }
    }
  }

"""


@index = (req, res, next) ->
  send = query: query, variables: req.params

  return if metaphysics.debug req, res, send
  purchaseFlow = res.locals.sd.PURCHASE_FLOW is 'purchase'
  return res.redirect "/artwork/#{req.params.id}" if not purchaseFlow
  metaphysics send
    .then ({ artwork }) ->
      return res.redirect "/artwork/#{req.params.id}" if not isEligible artwork
      res.locals.sd.ARTWORK = artwork
      res.render 'index', { artwork }

    .catch next

@thankYou = (req, res, next) ->
  purchaseFlow = res.locals.sd.PURCHASE_FLOW is 'purchase'
  return res.redirect "/artwork/#{req.params.id}" if not purchaseFlow
  res.redirect "/artwork/#{req.params.id}/checkout"
