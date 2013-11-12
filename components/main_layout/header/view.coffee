Backbone        = require 'backbone'
SearchBarView   = require './search_bar/view.coffee'

module.exports = class HeaderView extends Backbone.View
  initialize: (options) ->
    { @$window } = options
    @$welcomeHeader = @$('#main-layout-welcome-header')
    @$window.on 'scroll', @hideWelcomeHeader

    @searchBarView = new SearchBarView
      el:       @$('#main-layout-search-bar-container')
      $input:   @$('#main-layout-search-bar-input')

  hideWelcomeHeader: =>
    return if @$window.scrollTop() < @$welcomeHeader.height()
    @$welcomeHeader.hide()
    @$window.off 'scroll', @hideWelcomeHeader
    @$window.scrollTop(0)
