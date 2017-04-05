_ = require 'underscore'
Backbone = require 'backbone'
Tag = require '../../models/tag'
scrollFrame = require 'scroll-frame'
ShareView = require '../../components/share/view'
{ TAG } = sd = require('sharify').data
{ setupFilter } = require '../../components/filter2/index'
aggregationParams = require './aggregations'

module.exports.init = ->
  tag = new Tag TAG

  new ShareView
    el: $('#tag-share-buttons')

  scrollFrame '#tag-filter a' unless sd.EIGEN

  { params } = setupFilter
    el: $ '#tag-filter'
    defaultHeading: tag.get('name')
    stuckParam: { 'tag_id': tag.id }
    aggregations: aggregationParams
    filterRoot: tag.href() + '/artworks'
