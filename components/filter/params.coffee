#
# A model that stores the state of the filter params and syncs them to
# the /api/v1/search/filtered/:model/:id/suggest API.
# This model will store the query params like `price_range` in it's attributes and fetch
# on `change`. The various filtering views will bind to this models events to know when to
# update.
#

Backbone = require 'backbone'

module.exports = class FilterParams extends Backbone.Model

  initialize: ->
    @on 'change', => @fetch data: @toJSON()