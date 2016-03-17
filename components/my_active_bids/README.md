# My Active Bids

Small widget that indicates bids placed by the current user and if they're winning.

## Polling View

The easiest way is to just render client-side and drop in this view which will poll for updates to keep things fresh.

````coffeescript
MyActiveBids = require '../../components/my_active_bids/view.coffee'
view = new MyActiveBids
  el: $('.home-active-bids')
  template: -> # Leave blank for default view
````

## DIY

Or build your own if you so desire.

### Client-side

````coffeescript
query = require '../../components/my_active_bids/query.coffee'
metaphysics = require '../../lib/metaphysics.coffee'
myActiveBidsTemplate = -> require('../../components/my_active_bids/template.jade') arguments...

user = CurrentUser.orNull()
metaphysics(query: query, req: user: user).then (data) ->
  $('.el').html myActiveBidsTemplate(myActiveBids: data.me.bidder_positions)
````

### Server-side

````coffeescript
query = require '../components/my_active_bids/query.coffee'

(req, res, next) ->
  metaphysics(query: query, req: req).then (data) ->
    res.locals.myActiveBids = data.me.bidder_positions
````

````jade
block body
  include ../components/my_active_bids/template
````
