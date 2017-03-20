_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'

# Mapping between the user attribute, the step, and a predicate
# that should return true if they are "completed"
#
# TODO: Edited from the personalize app to always do the same steps, if this
# goes somewhere we'll want to get smart about it again.
#
attributeMap =
  # Set to 1 by default in Gravity
  collector_level:
    value: 'collect'
    predicate: -> true
  price_range:
    value: 'price_range'
    predicate: -> false
  location:
    value: 'location'
    predicate: -> true

module.exports = class PersonalizeState extends Backbone.Model
  defaults:
    levels: ['Yes, I buy art', 'Interested in starting', 'Just looking and learning']
    current_step: 'collect'
    current_level: 2 # Interested in starting
    #
    # TODO: Edited from the personalize app to always do the same steps, if this
    # goes somewhere we'll want to get smart about it again.
    #
    __steps__:
      new_1: ['categories', 'collect', 'favorites', 'artists', 'price_range', 'thank_you']
      new_2: ['categories', 'collect', 'favorites', 'artists', 'price_range', 'thank_you']
      new_3: ['categories', 'collect', 'favorites', 'artists', 'price_range', 'thank_you']
      existing_1: ['categories', 'collect', 'favorites', 'artists', 'price_range', 'thank_you']
      existing_2: ['categories', 'collect', 'favorites', 'artists', 'price_range', 'thank_you']
      existing_3: ['categories', 'collect', 'favorites', 'artists', 'price_range', 'thank_you']


  initialize: (options = {}) ->
    { @user } = options
    @listenTo this, 'transition:next', @next
    @resetSteps()
    super

  get: (attr) ->
    return @get('__steps__')[@stepKey()] if attr is 'steps'
    super

  resetSteps: ->
    @set 'current_step', @steps()[0]

  # Steps that are complete at initialization
  #
  # return {Array}
  completedSteps: ->
    @__completedSteps__ ?= _.compact _.map attributeMap, (x) =>
      x.value if x.predicate.call this

  stepKey: ->
    "#{@reonboardingKey()}_#{@get('current_level')}"

  reonboardingKey: ->
    if @get('reonboarding') then 'existing' else 'new'

  steps: ->
    _.without [@get 'steps'].concat(@completedSteps())...

  currentStepIndex: ->
    _.indexOf @steps(), @get('current_step')

  currentStepLabel: ->
    _.map(@get('current_step').split('_'), _s.capitalize).join ' '

  stepDisplay: ->
    "Step #{(@currentStepIndex() + 1)} of #{@steps().length}"

  almostDone: ->
    (@currentStepIndex() + 1) is @steps().length

  percentDone: ->
    "#{Math.round (@currentStepIndex() + 1) / (@steps().length - 1) * 100}%"

  next: ->
    if @currentStepIndex() + 1 >= @steps().length
      return @trigger 'done'
    @set 'current_step', @steps()[@currentStepIndex() + 1]
