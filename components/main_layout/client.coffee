Backbone    = require 'backbone'
Backbone.$  = $
HeaderView  = require './header/view.coffee'

require '../../node_modules/typeahead.js/dist/typeahead.min.js'

$ ->
  new HeaderView el: $('#main-layout-header'), $window: $(window)