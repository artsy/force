{ extend } = require 'underscore'
JSONPage = require '../../components/json_page'
resizer = require '../../components/resizer'
markdown = require '../../components/util/markdown'
Items = require '../../collections/items'

landing = new JSONPage name: 'consignments/landing'

@landing = (req, res, next) ->
  recentlySold = new Items [], item_type: 'Artwork'
  inDemand = new Items [], item_type: 'Artist'

  landing.get()
    .then (data) ->
      { recently_sold, in_demand } = landing.data.sections

      recentlySold.id = recently_sold.set.id
      inDemand.id = in_demand.set.id

      Promise.all [
        recentlySold.fetch cache: true
        inDemand.fetch cache: true
      ]

    .then ->
      res.locals.sd.RECENTLY_SOLD = recentlySold.toJSON()

      res.render 'landing', extend {},
        landing.data,
        resizer,
        recentlySold: recentlySold
        inDemand: inDemand
        markdown: markdown

    .catch next
