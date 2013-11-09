Backbone = require 'backbone'
Backbone.$ = $
HeaderView = require './header/view.coffee'

$ ->
  new HeaderView el: $('#main-layout-header'), $window: $(window)