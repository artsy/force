_ = require 'underscore'
StepView = require './step'
LocationSearchView = require '../../../../../components/location_search/index'
template = -> require('../../templates/next_step_artworks.jade') arguments...

module.exports = class NextStepView extends StepView

  events:
    'click .artsy-primer-next-step-button': 'advance'
    'click .overlay-button-save': 'removeWork'

  copy: [
    {
      header: 'Select Categories'
      label: 'Select as many as you like.'
    }
    {
      header: 'Select appealing works'
      label: 'Select at least five works.'
    }
    {
      header: 'Follow Artists'
      label: 'Select as many as you like.'
    }
    {
      header: 'Select Price Range'
      label: ''
    }
  ]

  initialize: ({ @user, @state }) =>
    @state.on 'change:current_step', @render
    @user.on 'personalize:favorite', (@favorites) => @render()
    @render()
    this

  removeWork: (e) ->
    @user.removeArtwork $(e.target).attr('data-id')

  render: =>
    if @state.get('current_step') is 'thank_you'
      return @$el.hide()
    else
      @$el.show()
    @$('.artsy-primer-next-step-progress-inner').width @state.percentDone()
    @$('.artsy-primer-next-step-header').html(
      @copy[@state.currentStepIndex()].header
    )
    @$('.artsy-primer-next-step-label').html(
      @copy[@state.currentStepIndex()].label
    )
    if @state.get('current_step') is 'favorites' and @favorites?.length < 5
      @$('.artsy-primer-next-step-button').attr('disabled', true)
    else
      @$('.artsy-primer-next-step-button').removeAttr('disabled')
    if @favorites?.length and @state.get('current_step') is 'favorites'
      @$('.artsy-primer-next-step-artworks').html template artworks: @favorites
    else
      @$('.artsy-primer-next-step-artworks').html ''
    this

  advance: ->
    @trigger 'advance'
    $('body, html').animate { scrollTop: 0 }, 400, 'swing'
