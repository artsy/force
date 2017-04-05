Backbone = require 'backbone'
{ acquireArtwork } = require('../../../../components/acquire/view')

module.exports = class MetaDataView extends Backbone.View

  events:
    'click #artwork-page-edition-sets input[type=radio]': 'addEditionToOrder'
    'click .js-purchase': 'buy'

  initialize: ->
    @editionSetId = @$('#artwork-page-edition-sets li').first().find('input').val()

  addEditionToOrder: (e) ->
    @editionSetId = $(e.target).val()

  buy: (e) ->
    acquireArtwork @model, $(e.target), @editionSetId
