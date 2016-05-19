_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
# Sub-header
RelatedGenesView = require '../../../../components/related_links/types/artist_genes.coffee'
# Bottom sections
RelatedArticlesView = require '../../../../components/related_articles/view.coffee'
RelatedShowsView = require '../../../../components/related_shows/view.coffee'
ArtistFillwidthList = require '../../../../components/artist_fillwidth_list/view.coffee'
initWorksSection = require '../../components/works_section/index.coffee'
FollowButton = require '../../../../components/follow_button/view.coffee'
splitTest = require '../../../../components/split_test/index.coffee'
viewHelpers = require '../../view_helpers.coffee'
gradient = require '../../../../components/gradient_blurb/index.coffee'
template = -> require('../../templates/sections/overview.jade') arguments...
renderRail = require '../../components/rail/index.coffee'
mediator = require '../../../../lib/mediator.coffee'

module.exports = class OverviewView extends Backbone.View
  subViews: []
  fetches: []

  initialize: ({ @user, @statuses }) ->
    @listenTo mediator, 'artist:related:sync', @renderRails

  setupBlurb: ->
    gradient $('.artist-overview-header'),
      limit: 170,
      label: 'Read More',
      heightBreakOffset: 20
      onClick: =>
        @sticky.rebuild()
    _.defer => @$('.artist-blurb').addClass('is-fade-in')

  renderRails: (artist)->
    following = @following
    @$('.artist-related-rail').map ->
      section = ($el = $(this)).data('id')
      items = artist[section]
      return if not items
      renderRail _.extend $el: $el.find('.js-artist-rail'), { section, items, following }

  postRender: ->
    # Sub-header
    @setupRelatedGenes()
    # Main section
    { @filterView, @sticky } = initWorksSection
      el: @$('#artwork-section')
      model: @model
      allLoaded: => #
    @subViews.push @filterView

  setupRelatedGenes: ->
    subView = new RelatedGenesView(el: @$('.artist-related-genes'), id: @model.id)
    subView.collection.on 'sync', =>
      @setupBlurb()
    @subViews.push subView

  render: ->
    # Template expects plain JSON, not a Backbone model.
    @$el.html template
      artist: @model.toJSON()
      viewHelpers: viewHelpers
      statuses: @statuses
    _.defer => @postRender()
    this

  remove: ->
    @filterView.artworks.off 'sync'
    _.invoke @subViews, 'remove'
