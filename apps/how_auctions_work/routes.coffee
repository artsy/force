_ = require 'underscore'
JSONPage = require '../../components/json_page'
resizer = require '../../components/resizer'
markdown = require '../../components/util/markdown'
page = new JSONPage name: 'how-auctions-work'

@index = (req, res, next) ->
  page.get (err, data) ->
    return next err if err
    res.render 'index', _.extend {}, page.data,
      markdown: markdown
      bidIncrements: require './bid_increments'
