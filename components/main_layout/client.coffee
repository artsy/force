Backbone    = require 'backbone'
Backbone.$  = $
HeaderView  = require './header/view.coffee'
FooterView  = require './footer/view.coffee'
sd          = require('sharify').data

require '../../node_modules/typeahead.js/dist/typeahead.min.js'
require('jquery.transition')($, document)

$.ajaxSettings.headers =
  'X-XAPP-TOKEN':   sd.GRAVITY_XAPP_TOKEN
  'X-ACCESS-TOKEN': sd.GRAVITY_ACCESS_TOKEN

$ ->
  new HeaderView el: $('#main-layout-header'), $window: $(window)
  new FooterView el: $('#main-layout-footer')
