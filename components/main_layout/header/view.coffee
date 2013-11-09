Backbone = require 'backbone'

module.exports = class HeaderView extends Backbone.View
  
  initialize: (options) ->
    { @$window } = options
    @$welcomeHeader = @$('#main-layout-welcome-header')
    @$window.on 'scroll', @hideWelcomeHeader

  hideWelcomeHeader: =>
    return if @$window.scrollTop() < @$welcomeHeader.height()
    @$welcomeHeader.hide()
    @$window.off 'scroll', @hideWelcomeHeader
    @$window.scrollTop(0)