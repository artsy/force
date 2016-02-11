_ = require 'underscore'
HeroShowsCarousel = require '../components/hero_shows_carousel/view.coffee'
HeroArtworksCarousel = require '../components/hero_artworks_carousel/view.coffee'
ArtistsListView = require '../components/artists_list/view.coffee'
ArtistsGridView = require '../components/artists_grid/view.coffee'
NewsView = require '../components/news/view.coffee'
FixedCellsCountCarousel = require '../components/fixed_cells_count_carousel/view.coffee'
PartnerShows = require '../../../collections/partner_shows.coffee'
Articles = require '../../../collections/articles.coffee'
aboutTemplate = -> require('../components/about/index.jade') arguments...
showsTemplate = -> require('../components/fixed_cells_count_carousel/shows.jade') arguments...
fairBoothsTemplate = -> require('../components/fixed_cells_count_carousel/fair_booths.jade') arguments...
articlesTemplate = -> require('../components/fixed_cells_count_carousel/articles.jade') arguments...

module.exports = (partner, profile) ->
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
        name: 'about'
        template: galleryOneAbout(partner, profile)
        title: 'About'
      ,
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
      ,
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
        name: 'about'
        template: galleryTwoAbout(partner, profile)
        title: 'About'
      ,
        name: 'news'
        component: NewsView
        options: partner: partner
        title: 'News'
      ,
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
      ,
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
      ,
        name: 'artists'
        component: galleryTwoArtists(partner)
        options: partner: partner
        title: galleryTwoArtistsTitle(partner)
        viewAll: galleryTwoArtistsViewAll(partner)
      ,
        name: 'articles'
        component: FixedCellsCountCarousel
        options:
          partner: partner
          collection: new Articles
          fetchOptions: partner_id: partner.get('_id'), published: true, limit: 9, sort: '-published_at'
          template: articlesTemplate
        title: 'Articles'
        viewAll: "#{partner.href()}/articles"
    ]

    gallery_three: [
        name: 'hero'
        component: galleryThreeHero(partner)
        options: galleryThreeHeroOptions(partner)
      ,
        name: 'about'
        template: galleryThreeAbout(partner, profile)
        title: 'About'
      ,
        name: 'news'
        component: NewsView
        options: partner: partner
        title: 'News'
      ,
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
      ,
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
      ,
        name: 'artists'
        component: galleryThreeArtists(partner)
        options: partner: partner
        title: galleryThreeArtistsTitle(partner)
        viewAll: galleryThreeArtistsViewAll(partner)
      ,
        name: 'articles'
        component: FixedCellsCountCarousel
        options:
          partner: partner
          collection: new Articles
          fetchOptions: partner_id: partner.get('_id'), published: true, limit: 9, sort: '-published_at'
          template: articlesTemplate
        title: 'Articles'
        viewAll: "#{partner.href()}/articles"
    ]

  contract[partner.get('profile_layout')] or []

# gallery_one layout helpers
galleryOneAbout = (partner, profile) ->
  aboutTemplate profile: profile if profile.get('full_bio')

# gallery_two layout helpers
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

galleryTwoAbout = galleryOneAbout

# gallery_three layout helpers
galleryThreeHero = galleryTwoHero
galleryThreeHeroOptions = galleryTwoHeroOptions
galleryThreeAbout = galleryOneAbout
galleryThreeArtists = galleryTwoArtists
galleryThreeArtistsTitle = galleryTwoArtistsTitle
galleryThreeArtistsViewAll = galleryTwoArtistsViewAll
