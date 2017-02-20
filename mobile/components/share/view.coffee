_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class ShareView extends Backbone.View

  events:
    'click .share-menu-modal': 'toggleShare'
    'click a.share-toggle': 'toggleShare'

  initialize: (options) ->
    @$el.html template
      description: options.description
      url: location.href
      imageUrl: options.imageUrl

  toggleShare: (e) ->
    e.preventDefault()
    $menu = @$('.share-menu')
    $modal = @$('.share-menu-modal')
    windowHeight = $(window).height()
    shareMenuHeight = $menu.height()
    @$('.share-menu').css('top': windowHeight - shareMenuHeight)    
    if $menu.hasClass 'is-visible' and $modal.hasClass 'is-visible'
      $menu.toggleClass 'is-visible'
      _.delay (-> $menu.toggle()), 250
      id = _.last location.href.match('/')
      resource = _.first _.last location.href.match('/'), 2
      $modal.toggleClass 'is-visible'
      _.delay (-> $modal.toggle()), 250
    else
      $menu.toggle()
      _.defer -> $menu.toggleClass('is-visible')
      $modal.toggle()
      _.defer -> $modal.toggleClass('is-visible')
