{ extend } = require 'underscore'
metaphysics = require '../../../lib/metaphysics'
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
        title
        date
        sale_message
        href
        fair {
          id
          name
          end_at
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
  send = query: query, variables: req.params
  metaphysics send
    .then ({ artwork }) ->
      cookie = req.cookies['purchase-inquiry']
      cachedData = JSON.parse cookie if cookie
      purchase = cachedData if cachedData?.artwork_id is artwork.id
      res.redirect "/artwork/#{req.params.id}"
    .catch next

@thankYou = (req, res, next) ->
  query = """
    query artwork($id: String!) {
      artwork(id: $id) {
        id
        _id
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
  send = query: query, variables: req.params
  metaphysics send
    .then ({ artwork }) ->
      res.redirect "/artwork/#{req.params.id}"
    .catch next
