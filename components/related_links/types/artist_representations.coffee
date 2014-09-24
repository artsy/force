_ = require 'underscore'
{ API_URL } = require('sharify').data
Backbone = require 'backbone'
RelatedLinksView = require '../view.coffee'
Partners = require '../../../collections/partners.coffee'
CurrentUser = require '../../../models/current_user.coffee'

module.exports = class RelatedRepresentationsLinksView extends RelatedLinksView
  headerTemplate: _.template '<h2>Gallery Representation</h2>'
  wrapperTemplate: _.template '<div class="related-represenations-links"><%= links %></div>'

  initialize: (options = {}) ->
    return unless CurrentUser.orNull()?.isAdmin()
    @collection = new Partners
    @collection.url = "#{API_URL}/api/v1/artist/#{options.id}/partners"
    @collection.fetch data: size: 20, represented_by: true
    super
