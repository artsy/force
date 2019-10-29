_ = require 'underscore'
HeroShowsCarousel = require '../components/hero_shows_carousel/view.coffee'
HeroArtworksCarousel = require '../components/hero_artworks_carousel/view.coffee'
ArtistsListView = require '../components/artists_list/view.coffee'
ArtistsGridView = require '../components/artists_grid/view.coffee'
NewsView = require '../components/news/view.coffee'
FixedCellsCountCarousel = require '../components/fixed_cells_count_carousel/view.coffee'
ShowsGrid = require '../client/shows_grid.coffee'
LocationsView = require '../components/locations/view.coffee'
PartnerShows = require '../../../collections/partner_shows.coffee'
Articles = require '../../../collections/articles.coffee'
aboutTemplate = -> require('../components/about/index.jade') arguments...
showsTemplate = -> require('../components/fixed_cells_count_carousel/shows.jade') arguments...
fairBoothsTemplate = -> require('../components/fixed_cells_count_carousel/fair_booths.jade') arguments...
articlesTemplate = -> require('../components/fixed_cells_count_carousel/articles.jade') arguments...

module.exports = (partner, profile) ->
  contract =
    institution: [
      galleryTwoHero partner, profile
      galleryTwoAbout partner, profile
      galleryTwoNews partner, profile
      galleryTwoShows partner, profile
      galleryTwoFairBooths partner, profile
      galleryTwoArtists partner, profile
      galleryTwoArticles partner, profile
    ]
    gallery_default: [
      galleryDefaultShows partner, profile
      galleryDefaultArtists partner, profile
      galleryDefaultLocations partner, profile
    ]
    gallery_one: [
      galleryOneHero partner, profile
      galleryOneAbout partner, profile
      galleryOneShows partner, profile
      galleryOneFairBooths partner, profile
      galleryOneArtists partner, profile
    ]
    gallery_two: [
      galleryTwoHero partner, profile
      galleryTwoAbout partner, profile
      galleryTwoNews partner, profile
      galleryTwoShows partner, profile
      galleryTwoFairBooths partner, profile
      galleryTwoArtists partner, profile
      galleryTwoArticles partner, profile
    ]
    gallery_three: [
      galleryThreeHero partner, profile
      galleryThreeAbout partner, profile
      galleryThreeNews partner, profile
      galleryThreeShows partner, profile
      galleryThreeFairBooths partner, profile
      galleryThreeArtists partner, profile
      galleryThreeArticles partner, profile
    ]
    gallery_four: [
      galleryFourHero partner, profile
      galleryFourAbout partner, profile
      galleryFourNews partner, profile
      galleryFourShows partner, profile
      galleryFourFairBooths partner, profile
      galleryFourArtists partner, profile
      galleryFourArticles partner, profile
    ]
    gallery_five: [
      galleryFiveHero partner, profile
      galleryFiveAbout partner, profile
      galleryFiveNews partner, profile
      galleryFiveShows partner, profile
      galleryFiveFairBooths partner, profile
      galleryFiveArtists partner, profile
      galleryFiveArticles partner, profile
    ]
    gallery_six: [
      gallerySixHero partner, profile
      gallerySixAbout partner, profile
      gallerySixShows partner, profile
      gallerySixFairBooths partner, profile
      gallerySixArtists partner, profile
    ]
    gallery_seven: [
      gallerySevenHero partner, profile
      gallerySevenAbout partner, profile
      gallerySevenShows partner, profile
      gallerySevenFairBooths partner, profile
      gallerySevenArtists partner, profile
    ]

  contract[partner.get('profile_layout')] or []

#
# Sections for gallery_default layout.
#
galleryDefaultShows = (partner, profile) ->
  name: 'shows'
  component: ShowsGrid
  options:
    partner: partner
    isCombined: true
    numberOfFeatured: if partner.claimed() then 1 else 0
    numberOfShows: 6
    seeAll: partner.claimed()
    heading: 'Shows & Fair Booths' unless partner.claimed()

galleryDefaultArtists = (partner, profile) ->
  name: 'artists'
  component: (
    ArtistsGridView if partner.claimed()
  )
  options: partner: partner

galleryDefaultLocations = (partner, profile) ->
  name: 'locations'
  title: 'Locations'
  component: (
    LocationsView unless partner.claimed()
  )
  options: partner: partner

#
# Sections for gallery_one layout.
#
galleryOneHero = (partner, profile) ->
  name: 'hero'
  component: HeroShowsCarousel
  options: partner: partner, maxNumberOfShows: 1

galleryOneAbout = (partner, profile) ->
  name: 'about'
  template: aboutTemplate profile: profile if profile.get('full_bio')
  title: 'About'

galleryOneShows = (partner, profile) ->
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

galleryOneFairBooths = (partner, profile) ->
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

galleryOneArtists = (partner, profile) ->
  name: 'artists'
  component: ArtistsGridView
  options: partner: partner

#
# Sections for gallery_two layout.
#
galleryTwoAbout = galleryOneAbout
galleryTwoShows = galleryOneShows
galleryTwoFairBooths = galleryOneFairBooths
galleryTwoHero = (partner, profile) ->
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

galleryTwoNews = (partner, parfile) ->
  name: 'news'
  component: NewsView
  options: partner: partner
  title: 'News'

galleryTwoArtists = (partner, profile) ->
  name: 'artists'
  component:
    if partner.get('display_artists_section')
      switch partner.get('profile_artists_layout')
        when 'Grid' then ArtistsGridView
        else ArtistsListView
  options: partner: partner
  title: 'Artists' unless partner.get('profile_artists_layout') is 'Grid'
  viewAll: "#{partner.href()}/artists" unless partner.get('profile_artists_layout') is 'Grid'

galleryTwoArticles = (partner, profile) ->
  name: 'articles'
  component: FixedCellsCountCarousel
  options:
    partner: partner
    collection: new Articles
    fetchOptions: partner_id: partner.get('_id'), published: true, limit: 9, sort: '-published_at'
    template: articlesTemplate
  title: 'Articles'
  viewAll: "#{partner.href()}/articles"

#
# Sections for gallery_three layout.
#
galleryThreeAbout = galleryTwoAbout
galleryThreeNews = galleryTwoNews
galleryThreeShows = galleryTwoShows
galleryThreeFairBooths = galleryTwoFairBooths
galleryThreeArtists = galleryTwoArtists
galleryThreeArticles = galleryTwoArticles
galleryThreeHero = (partner, profile) ->
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
# Sections for gallery_four layout.
#
galleryFourHero = galleryThreeHero
galleryFourAbout = galleryTwoAbout
galleryFourNews = galleryTwoNews
galleryFourShows = galleryTwoShows
galleryFourFairBooths = galleryTwoFairBooths
galleryFourArtists = galleryTwoArtists
galleryFourArticles = galleryTwoArticles

#
# Sections for gallery_five layout.
#
galleryFiveHero = galleryThreeHero
galleryFiveAbout = galleryThreeAbout
galleryFiveNews = galleryThreeNews
galleryFiveShows = galleryThreeShows
galleryFiveFairBooths = galleryThreeFairBooths
galleryFiveArtists = galleryThreeArtists
galleryFiveArticles = galleryThreeArticles

#
# Sections for gallery_six layout.
#
gallerySixHero = galleryOneHero
gallerySixAbout = galleryOneAbout
gallerySixShows = galleryOneShows
gallerySixFairBooths = galleryOneFairBooths
gallerySixArtists = galleryOneArtists

#
# Sections for gallery_seven layout.
#
gallerySevenHero = galleryOneHero
gallerySevenAbout = galleryOneAbout
gallerySevenShows = galleryOneShows
gallerySevenFairBooths = galleryOneFairBooths
gallerySevenArtists = galleryOneArtists
