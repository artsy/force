_ = require 'underscore'
StepView = require './step'
Items = require '../../../../../collections/items'
Gene = require '../../../../../models/gene'
{ setSkipLabel } = require '../mixins/followable'
{ FollowButton, Following } = require '../../../../../components/follow_button/index'
template = -> require('../../templates/categories.jade') arguments...
categoryTemplate = -> require('../../templates/category.jade') arguments...

module.exports = class CategoriesView extends StepView
  setIds:
    '1': '5407293572616943604a0c00' # http://admin.artsy.net/set/5407293572616943604a0c00
    '2': '53bb0cd872616978b7621200' # http://admin.artsy.net/set/53bb0cd872616978b7621200
    # Level 3 users *currently* don't hit this step
    '3': '53bb0cd872616978b7621200' # http://admin.artsy.net/set/53bb0cd872616978b7621200

  setSkipLabel: setSkipLabel

  events:
    'click .artsy-primer-personalize-category': 'followCategory'
    'click .artsy-primer-personalize-secondary-category': 'followCategory'

  initialize: (options) ->
    super

    @following = new Following null, kind: 'gene'

    @categories = new Items [], id: @setIds[@state.get('current_level')], item_type: 'FeaturedLink'
    @categories.fetch()
    @listenToOnce @categories, 'sync', @bootstrap

    @listenTo @following, 'add', (follow) ->
      $(".follow-button[data-id=#{follow.get('gene').id}]")
        .parent()
        .find '.artsy-primer-personalize-following-overlay'
        .addClass 'is-clicked'
    @listenTo @following, 'remove', (follow) ->
      $(".follow-button[data-id=#{follow.get('gene').id}]")
        .parent()
        .find '.artsy-primer-personalize-following-overlay'
        .removeClass 'is-clicked'

  bootstrap: ->
    @$('#artsy-primer-personalize-categories').html @setupCategories @categories
    @$('#artsy-primer-personalize-category-anything-else').show()
    @setupFollowButtons @categories
    (@$textarea = @$('textarea')).one 'input', (e) => @setSkipLabel()

  followCategory: (e) ->
    $(e.currentTarget).find('.follow-button').click()

  setupFollowButton: (model, el) ->
    key = model.id
    @followButtonViews ?= {}
    @followButtonViews[key].remove() if @followButtonViews[key]?
    @followButtonViews[key] = new FollowButton
      context_page: "Personalize page"
      modelName: 'Gene'
      model: model
      el: el
      following: @following

  setupFollowButtons: (categories) ->
    @following.syncFollows categories.pluck('gene_id')
    categories.each (category) =>
      model = new Gene id: category.get 'gene_id'
      el = @$(".follow-button[data-id=#{category.get('gene_id')}]")
      button = @setupFollowButton model, el
      @listenTo button, 'click', @setSkipLabel, this

  setupCategories: (categories) ->
    categories.each (category) -> # Set gene_id based on the slugs
      category.set('gene_id', category.get('href').replace '/gene/', '')
    @renderCategories categories

  renderCategories: (categories) ->
    categories.map((category) ->
      categoryTemplate category: category
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
