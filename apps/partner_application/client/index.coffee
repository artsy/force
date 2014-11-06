sd = require('sharify').data
Backbone = require 'backbone'
{ track } = require '../../../lib/analytics.coffee'

module.exports.init = ->
  # Tracks partner type and shows / hides the gallery application form
  showHideGalleryForm = (partnerType) ->
    track.funnel("Partner application selected #{partnerType}") if partnerType
    if partnerType == 'Gallery'
      $('.gallery-application-form').show()
      $('.organization-name-label').text 'Gallery Name'
    else
      $('.gallery-application-form').hide()
      $('.organization-name-label').text 'Organization'

  if window.location.pathname.indexOf('/success') > -1
    track.funnel 'Visited Partner Application Success'
  else
    track.funnel 'Visited Partner Application'

  # Initialize the page for galleries
  if window.location.search?.indexOf('gallery') > -1
    showHideGalleryForm 'Gallery'
    $('.partner-type-select').val('Gallery').hide()
    $('.partner-type-label').hide()
  else
    showHideGalleryForm false

  $('.partner-type-select').change ->
    showHideGalleryForm $('.partner-type-select').val()

  $("input[type='submit']").click ->
    track.funnel "Partner application submitted"
