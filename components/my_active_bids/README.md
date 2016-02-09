# My Active Bids

A component that renders a small widget around the site indicating which bids are currently in place and whether they're winning again or not.

## Client-side

````coffeescript
query = require '../../components/my_active_bids/query.coffee'
metaphysics = require '../../lib/metaphysics'
'myActiveBidsTemplate = -> require('../../components/my_active_bids/template.jade') arguments...

metaphysics(query).then (data) ->
  $('.el').html myActiveBidsTemplate(myActiveBids: data.me.bidder_positions)
````

## Server-side

````coffeescript
query = require '../components/my_active_bids/query.coffee'

(req, res, next) ->
  metaphysics(query).then (data) ->
    res.locals.myActiveBids = data.me.bidder_positions
````

````jade
block body
  include ../components/my_active_bids/template
````
