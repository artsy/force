_ = require 'underscore'
Backbone = require 'backbone'
PartnerArtists = require '../../../../collections/partner_artists.coffee'
require '../../../../../lib/promiseDone'
template = -> require('./index.jade') arguments...

module.exports = class PartnerArtistsGridView extends Backbone.View

  initialize: (options = {}) ->
    { @partner } = options

  startUp: ->
    @fetch().then(@group).then(@render).done()

  fetch: ->
    partnerArtists = new PartnerArtists()
    partnerArtists.url = "#{@partner.url()}/partner_artists"
    partnerArtists.fetchUntilEndInParallel()
      .then ->
        # Display represented artists or non- ones who have published artworks
        partnerArtists.filter (pa) ->
          pa.get('represented_by') or
          (pa.get('published_artworks_count') > 0 and pa.get('display_on_partner_profile') is true)

  group: (artists) =>
    groups = _.groupBy artists, (pa) -> pa.get 'represented_by'
    represented = label: "represented artists", list: groups.true or []
    nonrepresented = label: "works available by", list: groups.false or []

    groups = _.filter [represented, nonrepresented], (g) -> g.list.length > 0
    groups[0].label = "artists" if groups.length is 1
    groups

  render: (groups) =>
    return @remove() unless groups?.length > 0  # groups only contain non-empty groups.
    @$el.html template partner: @partner, groups: groups

  remove: ->
    @$el.closest('.partner2-overview-section').remove()
    super
