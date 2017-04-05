Backbone = require 'backbone'
bootstrap = require '../../../components/layout/bootstrap'
sd = require('sharify').data
Fair = require '../../../models/fair'
AutoCompleteView = require '../../../components/autocomplete/view'
featuredLinksTemplate = -> require('../templates/featured_links.jade') arguments...
imageNavItemTemplate = -> require('../templates/image_nav_item.jade') arguments...
primarySetTemplate = -> require('../templates/primary_set.jade') arguments...

module.exports.FairMainPageView = class FairMainPageView extends Backbone.View

  titleKeyHash:
    editorial: 'Read Highlights from the Fair'
    curator: 'Art world insiders share their selections'

  initialize: ->
    @renderFeaturedLinks()
    @attachAutoComplete()

  attachAutoComplete: ->
    @autoCompleteView = new AutoCompleteView el: @$('.js-autocomplete')
    @autoCompleteView.collection.url = "#{@autoCompleteView.collection.url()}?fair_id=#{@model.id}"

  renderFeaturedLinks: ->
    @model.fetchSetItems success: (setItems) =>
      html = ''
      keys = ['curator', 'editorial']
      for { set, items } in setItems when set.get('item_type') is 'FeaturedLink'
        items = items.filter (item) -> item.get('display_on_martsy')
        if set.get('key') in keys
          if items?.length > 0
            html += featuredLinksTemplate
              title: @titleKeyHash[set.get('key')]
              featuredLinks: items
              key: set.get('key')
        else if set.get('key') == 'primary'
          @renderPrimarySet set, items
      @$('#fair-page-featured-links').html(html)

  renderPrimarySet: (set, items) ->
    html = ""
    if items.length
      for item in items
        html += imageNavItemTemplate(
          href: item.get('href')
          imgSrc: item.imageUrl('small_square')
          labelTitle: item.get('title')
          labelInfo: item.get('subtitle')
        )
      @$('#fair-page-primary-featured-links').html html
    else
      html += primarySetTemplate(
        fair: @model
      )
    @$('#fair-page-primary-featured-links').html html

module.exports.init = ->
  bootstrap()
  new FairMainPageView
    model: new Fair sd.FAIR
    el: $('body')
