# My Active Bids

Small widget that indicates bids placed by the current user and if they're winning.

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
