_ = require 'underscore'
Backbone = require 'backbone'
Tag = require '../../models/tag.coffee'
scrollFrame = require 'scroll-frame'
ShareView = require '../../components/share/view.coffee'
{ TAG } = require('sharify').data
{ setupFilter } = require '../../components/filter2/index.coffee'
aggregationParams = require './aggregations.coffee'

module.exports.init = ->
  tag = new Tag TAG

  new ShareView
    el: $('#tag-share-buttons')

  scrollFrame '#tag-filter a'

  { params } = setupFilter
    el: $ '#tag-filter'
    stuckFacet: tag
    stuckParam: 'tag_id'
    aggregations: aggregationParams
    forSale: 'false'