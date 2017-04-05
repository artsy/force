_ = require 'underscore'
activatePulldowns = require '../../../components/hover_pulldown/index'
ResultsListView = require '../../../components/results_list/view'
TypeaheadView = require '../../../components/typeahead/view'
User = require '../../../models/user'
stage = require './stage'

module.exports.init = ->
  $('.sg-component-rendered a:not([disabled])').click (e) ->
    e.preventDefault()
    ($this = $(this)).addClass 'is-loading'
    _.delay ->
      $this.removeClass 'is-loading'
    , 1000

  $('.artsy-toggle').click (e) ->
    e.preventDefault()
    $this = $(this)
    $toggle = if $this.is '.artsy-toggle-label' then $this.prev() else $this.closest 'a.artsy-toggle'
    $toggle.attr 'data-state': if $toggle.is "[data-state='on']" then 'off' else 'on'

  activatePulldowns()

  stage()
