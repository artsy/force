_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'

# Mapping between the user attribute, the step, and a predicate
# that should return true if they are "completed"
attributeMap =
  # Set to 1 by default in Gravity
  collector_level:
    value: 'collect'
    predicate: ->
      @user.get('collector_level') isnt 1 and
      @user.get('collector_level')?
  price_range:
    value: 'price_range'
    predicate: ->
      @user.related().collectorProfile.get('professional_buyer') or
      @user.get('price_range') isnt '-1:1000000000000' and @user.get('price_range')?
  location:
    value: 'location'
    predicate: -> @user.hasLocation()

module.exports = class PersonalizeState extends Backbone.Model
  defaults:
    levels: ['Yes, I buy art', 'Interested in starting', 'Just looking and learning']
    current_step: 'collect'
    current_level: 2 # Interested in starting
    __steps__:
      new_1: ['collect', 'categories', 'favorites', 'artists']
      new_2: ['collect', 'price_range', 'categories', 'favorites', 'artists']
      new_3: ['collect', 'price_range', 'bookmarks', 'artists']
      existing_1: ['collect', 'categories', 'favorites', 'artists']
      existing_2: ['collect', 'price_range', 'categories', 'favorites', 'artists']
      existing_3: ['collect', 'price_range', 'bookmarks', 'artists']

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

  next: ->
    if @currentStepIndex() + 1 >= @steps().length
      return @trigger 'done'
    @set 'current_step', @steps()[@currentStepIndex() + 1]
