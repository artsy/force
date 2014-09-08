_ = require 'underscore'
{ API_URL } = require('sharify').data
Backbone = require 'backbone'
RelatedLinksView = require '../view.coffee'

class Representation extends Backbone.Model
  href: ->
    "/#{@get('partner').default_profile_id}"

  name: ->
    @get('partner').name

module.exports = class RelatedRepresentationsLinksView extends RelatedLinksView
  headerTemplate: _.template '<h2>Gallery Representation</h2>'
  wrapperTemplate: _.template '<div class="related-represenations-links"><%= links %></div>'

  initialize: (options = {}) ->
    @collection = new Backbone.Collection [], model: Representation
    @collection.url = "#{API_URL}/api/v1/artist/#{options.id}/partner_artists"
    @collection.fetch
      data: size: 20
      success: (collection, response, options) =>
        @collection.reset(@collection.where represented_by: true)
    super
