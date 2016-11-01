{ extend } = require 'underscore'
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
  purchase_flow = res.locals.sd.PURCHASE_FLOW is 'purchase'
  return res.redirect "/artwork/#{req.params.id}" if not purchase_flow

  metaphysics send
    .then (data) ->
      res.locals.sd.ARTWORK = data.artwork
      res.render 'index', data

    .catch next

@thankYou = (req, res, next) ->
  purchase_flow = res.locals.sd.PURCHASE_FLOW is 'purchase'
  return res.redirect "/artwork/#{req.params.id}" if not purchase_flow
  res.redirect "/artwork/#{req.params.id}/checkout"
