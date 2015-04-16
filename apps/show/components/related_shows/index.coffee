Q = require 'q'
_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
{ resize } = require '../../../../components/resizer/index.coffee'
PartnerShows = require '../../../../collections/partner_shows.coffee'
InstallShots = require '../../../../collections/install_shots.coffee'
template = -> require('./template.jade') arguments...
relatedShowsTemplate = -> require('./related_show.jade') arguments...
{ Cities, FeaturedCities } = require 'places'

module.exports = class RelatedShowsView extends Backbone.View

  initialize: ( options ) ->
    @el = options.el 
    @show = options.model 
    @title = options.title || "Current Shows in #{@show.formatCity()}"
    @location = options.model.location().get('coordinates')    
    @render()

  postrender: ->
    relatedShows = new PartnerShows
    relatedShows.fetch 
      data:
        status: 'running'
        near: [ @location['lat'], @location['lng'] ].toString()
        sort: '-start_at'
        displayable: true
        size: 10
        at_a_fair: false
      success: (relatedShows) =>
        for show in relatedShows.models
          @fetchInstallShotsForShow(show)

  render: -> 
    @$el.html template
      title: @title
    @postrender() 
    this

  fetchInstallShotsForShow: (show) =>
    dfd = Q.defer()

    show.installShots = new InstallShots
    show.installShots.fetch
      cache: @cache
      data: default: false, size: 2
      url: "#{sd.API_URL}/api/v1/partner_show/#{show.id}/images"
      error: dfd.reject
      success: (installShots, response, options) =>
        if installShots.length
          resizedInstallShots = for shot in installShots.models
                resize(shot.get('image_urls')['large'], {height: 275})
          $('#related-shows-children').append relatedShowsTemplate(show: show, showImages: resizedInstallShots)
          
          dfd.resolve 
        else
          show.related().artworks.fetch
            data:
              size: 2
            error: dfd.reject  
            success: (artworks) =>
              resizedArtworks = for artwork in artworks.models
                resize(artwork.defaultImageUrl('large'), {height: 275})
              $('#related-shows-children').append relatedShowsTemplate(show: show, showImages: resizedArtworks ) 
    dfd.promise