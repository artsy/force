_ = require 'underscore'
activatePulldowns = require '../../components/hover_pulldown/index.coffee'
openInquiryQuestionnaireFor = require '../../components/inquiry_questionnaire/index.coffee'
Artwork = require '../../models/artwork.coffee'
CurrentUser = require '../../models/current_user.coffee'
LoggedOutUser = require '../../models/logged_out_user.coffee'

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

  if location.pathname is '/style-guide/stage'
    artwork = new Artwork partner: name: 'Gagosian Gallery'
    user = CurrentUser.orNull() or new LoggedOutUser

    $('.js-open').click (e) ->
      user.set email: 'damonzucconi@gmail.com', prequalified: !$(this).data('prequalify')
      openInquiryQuestionnaireFor user: user, artwork: artwork
