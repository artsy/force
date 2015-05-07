_ = require 'underscore'
Backbone = require 'backbone'
Tag = require '../../models/tag.coffee'
scrollFrame = require 'scroll-frame'
qs = require 'querystring'
FilterArtworks = require '../../collections/filter_artworks.coffee'
FilterView = require '../../components/filter2/view.coffee'
FilterRouter = require '../../components/filter2/router/index.coffee'
ShareView = require '../../components/share/view.coffee'
{ API_URL, TAG, FILTER_ROOT } = require('sharify').data

module.exports.init = ->
  tag = new Tag TAG

  new ShareView 
    el: $('#tag-share-buttons')

  scrollFrame '#tag-filter a'

  queryParams = qs.parse(location.search.replace(/^\?/, ''))
  params = new Backbone.Model _.extend queryParams, { page: 1, size: 10, tag_id: tag.id }

  collection = new FilterArtworks

  new FilterView
    el: $ '#tag-filter'
    collection: collection
    params: params
    stuckFacet: tag

  new FilterRouter
    params: params
    urlRoot: FILTER_ROOT
    stuckParam: 'tag'

  collection.fetch
    data: params.toJSON()
    success: ->
      collection.trigger 'initial:fetch'

  Backbone.history.start pushState: true