_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'
StepView = require './step_view.coffee'
template = -> require('../templates/artists.jade') arguments...
resultsTemplate = -> require('../templates/results.jade') arguments...
followedTemplate = -> require('../templates/followed.jade') arguments...

class ArtistSearchResults extends Backbone.Collection
  url: "#{sd.API_URL}/api/v1/match/artists"

class ArtistsView extends StepView
  initialize: (options) ->
    super

    @service = new ArtistSearchResults
    @followed = new Backbone.Collection

    @search = _.throttle @_search, 250

    @listenTo @followed, 'add', @renderResults
    @listenTo @followed, 'add', @renderFollowed
    @listenTo @followed, 'add', @resetResults

  events: -> _.extend super,
    'click #skip': 'advance'
    'keydown input': -> @search()
    'click .follow': 'follow'
    'click #continue': 'advance'

  _search: ->
    term = _s.trim @$('input').val()

    if @term != term && term != ''
      @term = term

      @renderLoadingSpinner()
      @service.fetch
        data: { term: term }
        success: (results) =>
          @results = results
          @renderResults()
        error: =>
          @advance() # If something goes wrong just bail

  renderLoadingSpinner: ->
    @$('.autocomplete-input-results').html '<div class="loading-spinner"></div>'

  renderResults: ->
    @focus() # Ensure focus
    @$('#continue').addClass 'is-hidden'
    @$('.autocomplete-input-results').html resultsTemplate(results: @results.toJSON())

  renderFollowed: ->
    list = "#{@followed.pluck('name').join(', ')}."
    @$('#personalize-followed-container').html followedTemplate(list: list)

  follow: (e) ->
    e.preventDefault()
    @$('input').focus()
    artist = @results.get $(e.target).data('id')
    artist.set 'followed', true
    @user.followArtist artist.id
    @followed.unshift artist

  deactivate: ->
    @$('.autocomplete-input-container').removeClass('is-active')

  resetResults: ->
    @$('input').val ''
    @$('.autocomplete-input-results').html ''
    @results.reset()
    @$('#continue').removeClass 'is-hidden'

  render: ->
    @$el.html template(state: @state.toJSON())
    this

module.exports.ArtistsView = ArtistsView
