_ = require 'underscore'
HeroShowsCarousel = require '../components/hero_shows_carousel/view.coffee'
HeroArtworksCarousel = require '../components/hero_artworks_carousel/view.coffee'
ArtistsListView = require '../components/artists_list/view.coffee'
ArtistsGridView = require '../components/artists_grid/view.coffee'
NewsView = require '../components/news/view.coffee'
FixedCellsCountCarousel = require '../components/fixed_cells_count_carousel/view.coffee'
ShowsGrid = require '../client/shows_grid.coffee'
LocationsView = require '../components/locations/view.coffee'
{ PartnerShows } = require '../../../collections/partner_shows'
{ Articles } = require '../../../collections/articles'
aboutTemplate = -> require('../components/about/index.jade') arguments...
showsTemplate = -> require('../components/fixed_cells_count_carousel/shows.jade') arguments...
fairBoothsTemplate = -> require('../components/fixed_cells_count_carousel/fair_booths.jade') arguments...
articlesTemplate = -> require('../components/fixed_cells_count_carousel/articles.jade') arguments...

module.exports = (partner, profile) ->
  contract =
    institution: [
      configurable2ShowsHero partner, profile
      aboutSection partner, profile
      newsSection partner, profile
      showsCarousel partner, profile
      fairBoothsSection partner, profile
      configurableArtists partner, profile
      articlesSection partner, profile
    ]
    gallery_default: [
      showsGrid partner, profile
      possiblyUnclaimedPartnerArtists partner, profile
      locationsSection partner, profile
    ]
    gallery_one: [
      oneShowOnlyHero partner, profile
      aboutSection partner, profile
      showsCarousel partner, profile
      fairBoothsSection partner, profile
      artistsGrid partner, profile
    ]
    gallery_two: [
      configurable2ShowsHero partner, profile
      aboutSection partner, profile
      newsSection partner, profile
      showsCarousel partner, profile
      fairBoothsSection partner, profile
      configurableArtists partner, profile
      articlesSection partner, profile
    ]
    gallery_three: [
      configurable10ShowsHero partner, profile
      aboutSection partner, profile
      newsSection partner, profile
      showsCarousel partner, profile
      fairBoothsSection partner, profile
      configurableArtists partner, profile
      articlesSection partner, profile
    ]
    gallery_four: [
      configurable10ShowsHero partner, profile
      aboutSection partner, profile
      newsSection partner, profile
      showsCarousel partner, profile
      fairBoothsSection partner, profile
      configurableArtists partner, profile
      articlesSection partner, profile
    ]
    gallery_five: [
      configurable10ShowsHero partner, profile
      aboutSection partner, profile
      newsSection partner, profile
      showsCarousel partner, profile
      fairBoothsSection partner, profile
      configurableArtists partner, profile
      articlesSection partner, profile
    ]
    gallery_six: [
      configurable10ShowsHero partner, profile
      aboutSection partner, profile
      newsSection partner, profile
      showsCarousel partner, profile
      fairBoothsSection partner, profile
      configurableArtists partner, profile
      articlesSection partner, profile
    ]
    gallery_seven: [
      oneShowOnlyHero partner, profile
      aboutSection partner, profile
      showsCarousel partner, profile
      fairBoothsSection partner, profile
      artistsGrid partner, profile
    ]
    gallery_eight: [
      configurable10ShowsHero partner, profile
      aboutSection partner, profile
      newsSection partner, profile
      showsCarousel partner, profile
      fairBoothsSection partner, profile
      configurableArtists partner, profile
      articlesSection partner, profile
    ]

  contract[partner.get('profile_layout')] or []

#
# Hero Section
#
oneShowOnlyHero = (partner, profile) ->
  name: 'hero'
  component: HeroShowsCarousel
  options: partner: partner, maxNumberOfShows: 1

configurable2ShowsHero = (partner, profile) ->
  name: 'hero'
  component:
    switch partner.get('profile_banner_display')
      when 'Artworks' then HeroArtworksCarousel
      else HeroShowsCarousel
  options: (
    options =
      partner: partner
      maxNumberOfShows: 2 # HeroShowsCarousel options
    switch partner.get('profile_banner_display')
      when 'Artworks' then _.pick options, 'partner'
      else _.pick options, 'partner', 'maxNumberOfShows'
  )

configurable10ShowsHero = (partner, profile) ->
  name: 'hero'
  component:
    switch partner.get('profile_banner_display')
      when 'Artworks' then HeroArtworksCarousel
      else HeroShowsCarousel
  options: (
    options =
      partner: partner
      maxNumberOfShows: 10
    switch partner.get('profile_banner_display')
      when 'Artworks' then _.pick options, 'partner'
      else _.pick options, 'partner', 'maxNumberOfShows'
  )


#
# About Section
#
aboutSection = (partner, profile) ->
  name: 'about'
  template: aboutTemplate profile: profile if profile.get('full_bio')
  title: 'About'


#
# News Section
#
newsSection = (partner, parfile) ->
  name: 'news'
  component: NewsView
  options: partner: partner
  title: 'News'


#
# Shows Section
#
showsGrid = (partner, profile) ->
  name: 'shows'
  component: ShowsGrid
  options:
    partner: partner
    isCombined: true
    numberOfFeatured: if partner.claimed() then 1 else 0
    numberOfShows: 6
    seeAll: partner.claimed()
    heading: 'Shows & Fair Booths' unless partner.claimed()

showsCarousel = (partner, profile) ->
  name: 'shows'
  component: FixedCellsCountCarousel
  options:
    partner: partner
    collection: new PartnerShows
    fetchOptions: [
      { partner_id: partner.get('_id'), status: 'current', at_a_fair: false, displayable: true, size: 9, sort: 'start_at' }
      { partner_id: partner.get('_id'), status: 'closed', at_a_fair: false, displayable: true, size: 9, sort: '-end_at' }
    ]
    template: showsTemplate
  title: 'Shows'
  viewAll: "#{partner.href()}/shows"


#
# Fair Booths Section
#
fairBoothsSection = (partner, profile) ->
  name: 'fair-booths'
  component: FixedCellsCountCarousel
  options:
    partner: partner
    collection: new PartnerShows
    fetchOptions: [
      { partner_id: partner.get('_id'), status: 'current', at_a_fair: true, displayable: true, size: 9, sort: 'start_at' }
      { partner_id: partner.get('_id'), status: 'closed', at_a_fair: true, displayable: true, size: 9, sort: '-end_at' }
    ]
    template: fairBoothsTemplate
  title: 'Fair Booths'
  viewAll: "#{partner.href()}/shows"


#
# Artists Section
#
possiblyUnclaimedPartnerArtists = (partner, profile) ->
  name: 'artists'
  component: (
    ArtistsGridView if partner.claimed()
  )
  options: partner: partner

artistsGrid = (partner, profile) ->
  name: 'artists'
  component: ArtistsGridView
  options: partner: partner

configurableArtists = (partner, profile) ->
  name: 'artists'
  component:
    if partner.get('display_artists_section')
      switch partner.get('profile_artists_layout')
        when 'Grid' then ArtistsGridView
        else ArtistsListView
  options: partner: partner
  title: 'Artists' unless partner.get('profile_artists_layout') is 'Grid'
  viewAll: "#{partner.href()}/artists" unless partner.get('profile_artists_layout') is 'Grid'


#
# Locations Section
#
locationsSection = (partner, profile) ->
  name: 'locations'
  title: 'Locations'
  component: (
    LocationsView unless partner.claimed()
  )
  options: partner: partner


#
# Articles Section
#
articlesSection = (partner, profile) ->
  name: 'articles'
  component: FixedCellsCountCarousel
  options:
    partner: partner
    collection: new Articles
    fetchOptions: partner_id: partner.get('_id'), published: true, limit: 9, sort: '-published_at'
    template: articlesTemplate
  title: 'Articles'
  viewAll: "#{partner.href()}/articles"
