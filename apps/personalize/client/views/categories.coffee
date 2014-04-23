StepView                      = require './step.coffee'
track                         = require('../../../../lib/analytics.coffee').track
OrderedSets                   = require '../../../../collections/ordered_sets.coffee'
Gene                          = require '../../../../models/gene.coffee'
{ setSkipLabel }              = require '../mixins/followable.coffee'
{ FollowButton, Following }   = require '../../../../components/follow_button/index.coffee'

template                      = -> require('../../templates/categories.jade') arguments...
suggestedCategoriesTemplate   = -> require('../../templates/suggested_categories.jade') arguments...

module.exports = class CategoriesView extends StepView
  key: 'personalize:suggested-categories'

  events:
    'click .personalize-skip' : 'advance'

  initialize: (options) ->
    super

    @following    = new Following null, kind: 'gene'
    @categories   = new OrderedSets key: @key

    @listenTo @categories, 'sync:complete', @setupCategories

    @categories.fetchAll()

  setSkipLabel: setSkipLabel

  setupFollowButton: (model, el) ->
    key = model.id
    @followButtonViews ?= {}
    @followButtonViews[key].remove() if @followButtonViews[key]?
    @followButtonViews[key] = new FollowButton
      analyticsUnfollowMessage : ""
      analyticsFollowMessage   : ""
      following                : @following
      model                    : model
      modelName                : 'Gene'
      el                       : el

  setupFollowButtons: ->
    @categories.each (category) =>
      model   = new Gene id: category.get 'gene_id'
      el      = @$(".follow-button[data-id=#{category.get('gene_id')}]")
      button  = @setupFollowButton model, el

      @listenTo button, 'click', => @setSkipLabel()

    @following.syncFollows @categories.pluck('gene_id')

  setupCategories: ->
    @categories = @categories.findWhere(key: @key).get 'items'
    @categories.each (category) -> # Set gene_id based on the slugs
      category.set('gene_id', category.get('href').replace '/gene/', '')
    @renderCategories()

  renderCategories: ->
    @$('#personalize-categories').html suggestedCategoriesTemplate(categories: @categories)
    @setupFollowButtons()
    (@$textarea = @$('textarea')).one 'input', (e) => @setSkipLabel()

  advance: ->
    @user.set notes: @$textarea.val() if @$textarea
    super

  render: ->
    @$el.html template(state: @state)
    this

  remove: ->
    if @categories.fullCollection? then @categories.fullCollection.map (category) =>
      @followButtonViews[category.get 'gene_id']?.remove()
    super
