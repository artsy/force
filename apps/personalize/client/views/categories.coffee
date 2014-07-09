_                             = require 'underscore'
Q                             = require 'q'
StepView                      = require './step.coffee'
track                         = require('../../../../lib/analytics.coffee').track
OrderedSets                   = require '../../../../collections/ordered_sets.coffee'
Gene                          = require '../../../../models/gene.coffee'
{ setSkipLabel }              = require '../mixins/followable.coffee'
{ FollowButton, Following }   = require '../../../../components/follow_button/index.coffee'

template = -> require('../../templates/categories.jade') arguments...
suggestionTemplates =
  featured  : -> require('../../templates/featured_category.jade') arguments...
  secondary : -> require('../../templates/secondary_category.jade') arguments...

module.exports = class CategoriesView extends StepView
  keys:
    featured  : 'personalize:featured-suggested-categories-updated'
    secondary : 'personalize:secondary-suggested-categories'

  setSkipLabel: setSkipLabel

  events:
    'click .personalize-skip'               : 'advance'
    'click .personalize-category'           : 'followCategory'
    'click .personalize-secondary-category' : 'followCategory'

  initialize: (options) ->
    super

    @following = new Following null, kind: 'gene'

    @categories =
      featured  : new OrderedSets key: @keys.featured
      secondary : new OrderedSets key: @keys.secondary

    Q.allSettled(_.map @categories, (set) -> set.fetchAll()).then => @bootstrap()

  bootstrap: ->
    @$('#personalize-categories').html _.map(@categories, @setupCategories, this)
    @$('#personalize-category-anything-else').show()
    @setupFollowButtons()
    (@$textarea = @$('textarea')).one 'input', (e) => @setSkipLabel()

  followCategory: (e) ->
    $(e.currentTarget).find('.follow-button').click()

  setupFollowButton: (model, el) ->
    key = model.id
    @followButtonViews ?= {}
    @followButtonViews[key].remove() if @followButtonViews[key]?
    @followButtonViews[key] = new FollowButton
      analyticsUnfollowMessage : 'Unfollowed gene from personalize gene suggestions'
      analyticsFollowMessage   : 'Followed gene from personalize gene suggestions'
      modelName                : 'Gene'
      model                    : model
      el                       : el
      following                : @following

  setupFollowButtons: ->
    _.each @categories, (categories, key) =>
      @following.syncFollows categories.pluck('gene_id')
      categories.each (category) =>
        model   = new Gene id: category.get 'gene_id'
        el      = @$(".follow-button[data-id=#{category.get('gene_id')}]")
        button  = @setupFollowButton model, el
        @listenTo button, 'click', @setSkipLabel, this

  setupCategories: (categories, key) ->
    @categories[key] = categories.findWhere(key: @keys[key]).get('items')
    @categories[key].each (category) -> # Set gene_id based on the slugs
      category.set('gene_id', category.get('href').replace '/gene/', '')
    @renderCategories @categories[key], key

  renderCategories: (categories, key) ->
    categories.map((category) ->
      suggestionTemplates[key] category: category
    ).join ''

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
