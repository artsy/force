_ = require 'underscore'
HeroShowsCarousel = require '../components/hero_shows_carousel/view.coffee'
HeroArtworksCarousel = require '../components/hero_artworks_carousel/view.coffee'
ArtistsListView = require '../components/artists_list/view.coffee'
ArtistsGridView = require '../components/artists_grid/view.coffee'

module.exports = (partner) ->
  contract =
    institution: [
      { name: 'hero', component: HeroShowsCarousel, options: { partner: partner, maxNumberOfShows: 3 } }
    ]
    gallery_default: []
    gallery_one: [
        name: 'hero'
        component: HeroShowsCarousel
        options: partner: partner, maxNumberOfShows: 1
      ,
        name: 'artists'
        component: ArtistsGridView
        options: partner: partner
    ]

    gallery_two: [
        name: 'hero'
        component: galleryTwoHero(partner)
        options: galleryTwoHeroOptions(partner)
      ,
        name: 'artists'
        component: galleryTwoArtists(partner)
        options: partner: partner
        title: galleryTwoArtistsTitle(partner)
        viewAll: galleryTwoArtistsViewAll(partner)
    ]

    gallery_three: [
        name: 'hero'
        component: galleryThreeHero(partner)
        options: galleryThreeHeroOptions(partner)
      ,
        name: 'artists'
        component: galleryThreeArtists(partner)
        options: partner: partner
        title: galleryThreeArtistsTitle(partner)
        viewAll: galleryThreeArtistsViewAll(partner)
    ]

  contract[partner.get('profile_layout')] or []

# Layout gallery_two helpers
galleryTwoHero = (partner) ->
  if partner.get('profile_banner_display') is 'Shows'
    HeroShowsCarousel
  else if partner.get('profile_banner_display') is 'Artworks'
    HeroArtworksCarousel

galleryTwoHeroOptions = (partner) ->
  options =
    partner: partner
    maxNumberOfShows: 10 # HeroShowsCarousel options

  if partner.get('profile_banner_display') is 'Shows'
    _.pick options, 'partner', 'maxNumberOfShows'
  else
    _.pick options, 'partner'

galleryTwoArtists = (partner) ->
  if partner.get('profile_artists_layout') is 'Grid'
    ArtistsGridView
  else
    ArtistsListView

galleryTwoArtistsTitle = (partner) ->
  "Artists" if galleryTwoArtists(partner) is ArtistsListView

galleryTwoArtistsViewAll = (partner) ->
  "#{partner.href()}/artists" if galleryTwoArtists(partner) is ArtistsListView

# Layout gallery_three helpers
galleryThreeHero = galleryTwoHero
galleryThreeHeroOptions = galleryTwoHeroOptions
galleryThreeArtists = galleryTwoArtists
galleryThreeArtistsTitle = galleryTwoArtistsTitle
galleryThreeArtistsViewAll = galleryTwoArtistsViewAll
