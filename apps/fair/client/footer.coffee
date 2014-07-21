Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
footerTemplate = -> require('../templates/footer.jade') arguments...

module.exports = class FairFooter extends Backbone.View

  initialize: (options) ->
    @fair = options.fair
    @fair.fetchPrimarySets
      cache: false
      success: (primarySets) =>
        exploreItems = primarySets.where({ key: 'explore' })?[0]?.get('items').models
        primaryItems = primarySets.where({ key: 'primary' })?[0]?.get('items').models
        curatorItems = primarySets.where({ key: 'curator' })?[0]?.get('items').models
        editorialItems = primarySets.where({ key: 'editorial' })?[0]?.get('items').models

        @$el.html footerTemplate(
          editorialItems: editorialItems
          exploreItems: exploreItems
          primaryItems: primaryItems
          curatorItems: curatorItems
          fair: @fair
          profile: @model
        )
