{API_URL} = require('sharify').data
Backbone = require 'backbone'
_ = require 'underscore'
Partner = require '../../../../models/partner.coffee'
suggestionTemplate = -> require('./suggestion.jade') arguments...

module.exports = class PartnerSearchView extends Backbone.View
  events:
    'blur .partners-search-input': 'inputBlur'
    'mousedown .icon-search': (e) -> e.preventDefault()

  initialize: ({type})->
    @$input = @$('.partners-search-input')
    @hound = new Bloodhound
      limit: 10
      identify: (obj) -> obj.id
      remote:
        url: "#{API_URL}/api/v1/match/partners?size=10&term=%QUERY" # Update this when new endpoint exists to include type.
        ajax:
          beforeSend: (xhr) =>
            xhr.setRequestHeader 'X-XAPP-TOKEN', sd.ARTSY_XAPP_TOKEN
      datumTokenizer: Bloodhound.tokenizers.whitespace
      queryTokenizer: Bloodhound.tokenizers.whitespace
    @hound.initialize()
    @$input.typeahead({
      hint: false
      highlight: true,
      minLength: 0
    }, {
      name: 'partner-name'
      source: @hound.ttAdapter()
      displayKey: 'name'
      template: 'custom'
      templates:
        suggestion: @suggestionTemplate
        empty: -> '' # Typeahead won't render the header for empty results unless 'empty' is defined
    })
    @typeahead = @$input.data().ttTypeahead
    @$input.on('typeahead:selected', @selected)

  selected: (e, suggestion, dataset) =>
    model = new Partner suggestion
    location.assign model.href()

  suggestionTemplate: (item) ->
    suggestionTemplate item: item

  inputBlur: (e) ->
    e.preventDefault()
    $target = $(e.target)
    $target.typeahead('val', '')

  remove: ->
    @$input.off('typeahead:selected', @selected)
    @$input.typeahead 'destroy'
    super()

