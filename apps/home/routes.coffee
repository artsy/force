_ = require 'underscore'
Q = require 'bluebird-q'
{ parse } = require 'url'
Backbone = require 'backbone'
sd = require('sharify').data
HeroUnits = require '../../collections/hero_units'
Items = require '../../collections/items'
{ client } = require '../../lib/cache'
welcomeHero = require './heros/welcome'
fallbackHero = require './heros/fallback'
FilterArtworks = require '../../collections/filter_artworks'

getRedirectTo = (req) ->
  req.body['redirect-to'] or
  req.query['redirect-to'] or
  req.query['redirect_uri'] or
  parse(req.get('Referrer') or '').path or
  '/'

positionWelcomeHeroMethod = (req, res) ->
  method = if req.cookies?['hide-welcome-hero']? then 'push' else 'unshift'
  res.cookie 'hide-welcome-hero', '1', expires: new Date(Date.now() + 31536000000)
  method

@index = (req, res, next) ->
  return next() if req.user?.hasLabFeature 'Personalized Homepage'
  heroUnits = new HeroUnits

  # homepage:featured-sections
  featuredLinks = new Items [], id: '529939e2275b245e290004a0', item_type: 'FeaturedLink'
  # homepage:explore
  exploreSections = new Items [], id: '54528dc072616942f91f0200', item_type: 'FeaturedLink'
  # homepage:featured-artists
  featuredArtists = new Items [], id: '523089cd139b214d46000568', item_type: 'FeaturedLink'
  # homepage:featured-links
  featuredArticles = new Items [], id: '5172bbb97695afc60a000001', item_type: 'FeaturedLink'
  # homepage:featured-shows
  featuredShows = new Items [], id: '530ebe92139b21efd6000071', item_type: 'PartnerShow'

  timeToCacheInSeconds = 300 # 5 Minutes

  jsonLD = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "url": "https://www.artsy.net/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.artsy.net/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  Q.allSettled _.compact [
    heroUnits.fetch(cache: true, cacheTime: timeToCacheInSeconds)
    featuredLinks.fetch(cache: true)
    exploreSections.fetch(cache: true) unless req.user?
    featuredArtists.fetch(cache: true, cacheTime: timeToCacheInSeconds)
    featuredArticles.fetch(cache: true, cacheTime: timeToCacheInSeconds)
    featuredShows.fetch(cache: true, cacheTime: timeToCacheInSeconds)
  ]
    .then ->
      if req.user?
        heroUnits.push fallbackHero if heroUnits.length is 0
      else
        heroUnits[positionWelcomeHeroMethod(req, res)](welcomeHero)

      res.locals.sd.HERO_UNITS = heroUnits.toJSON()
      res.render 'index',
        heroUnits: heroUnits
        featuredLinks: featuredLinks
        exploreSections: exploreSections
        featuredArtists: featuredArtists
        featuredArticles: featuredArticles
        featuredShows: featuredShows
        jsonLD: JSON.stringify jsonLD

@redirectToSignup = (req, res) ->
  res.redirect "/sign_up"

@redirectLoggedInHome = (req, res, next) ->
  pathname = parse(req.url or '').pathname
  req.query['redirect-to'] = '/' if pathname is '/log_in' or pathname is '/sign_up'
  if req.user? then res.redirect getRedirectTo(req) else next()
