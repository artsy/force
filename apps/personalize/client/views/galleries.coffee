_             = require 'underscore'
Backbone      = require 'backbone'
StepView      = require './step.coffee'
Followable    = require '../mixins/followable.coffee'
OrderedSets   = require '../../../../collections/ordered_sets.coffee'

FollowButton      = require '../../../partners/client/follow_profiles_button.coffee'
FollowCollection  = require '../../../../collections/follow_profiles.coffee'

template                    = -> require('../../templates/galleries.jade') arguments...
suggestedGalleriesTemplate  = -> require('../../templates/suggested_galleries.jade') arguments...

module.exports = class GalleriesView extends StepView
  # Makes available:  [ #renderFollowed, #follow, #setupSearch ]
  # Attaches:         [ @searchBarView ]
  _.extend @prototype, Followable

  suggestedGalleriesKey: 'personalize:suggested-galleries'

  events:
    'click .personalize-skip'             : 'advance'
    'click .personalize-suggestions-more' : 'loadNextPage'
    'click .pfa-remove'                   : 'unfollow'

  initialize: (options) ->
    super

    @followCollection   = new FollowCollection
    @gallerySets        = new OrderedSets(key: @suggestedGalleriesKey)

    @gallerySets.fetchAll()

    @listenTo @gallerySets, 'sync:complete', @setupGalleries
    @listenTo @gallerySets, 'sync:complete', @autoFollow

    @initializeFollowable()

  loadNextPage: (e) ->
    e.preventDefault()
    ($target = $(e.currentTarget)).attr 'data-state', 'loading'
    @galleries.getNextPage().then ->
      $target.attr 'data-state', 'loaded'

  render: ->
    @$el.html template(state: @state)
    @setupSearch { mode: 'profiles', restrictType: 'PartnerGallery' }
    this

  setupGalleries: ->
    @$('#personalize-suggestions-container').attr 'data-state', 'loaded'
    @galleries = @gallerySets.findWhere(key: @suggestedGalleriesKey).get('items')
    @listenTo @galleries, 'sync', @renderGalleries
    @renderGalleries()

  setupFollowButton: (model, el) ->
    @followButtonViews ||= {}
    @followButtonViews[model.id].remove() if @followButtonViews[model.id]?
    @followButtonViews[model.id] = new FollowButton
      analyticsUnfollowMessage: "Unfollowed profile from personalize profile suggestions"
      analyticsFollowMessage:   "Followed profile from personalize profile suggestions"
      notes:                    'Followed from /personalize'
      collection:               @followCollection
      model:                    model
      el:                       el

  galleryRows: (n) ->
    _.compact @galleries.map (model, i) =>
      @galleries.slice(i, i + n) if i % n is 0

  autoFollow: ->
    ids = @galleries.pluck('id').slice 0, 12
    # Todo: depends on bulk follow endpoint

  renderGalleries: ->
    (@$suggestions ||= @$('#personalize-suggestions')).
      append suggestedGalleriesTemplate(galleryRows: @galleryRows(4))

    # Attach FollowButton views
    @galleries.each (gallery) =>
      @setupFollowButton gallery, @$suggestions.find(".follow-button[data-id='#{gallery.id}']")

    @followCollection.syncFollows @galleries.pluck('id')

  remove: ->
    @galleries.fullCollection.map (model) =>
      @followButtonViews[model.id].remove()
    super
