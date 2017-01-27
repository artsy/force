_ = require 'underscore'
Q = require 'bluebird-q'
{ parse } = require 'url'
Backbone = require 'backbone'
sd = require('sharify').data
Items = require '../../collections/items'
Articles = require '../../collections/articles'
{ client } = require '../../lib/cache'
metaphysics = require '../../lib/metaphysics.coffee'
viewHelpers = require './view_helpers.coffee'
welcomeHero = require './welcome'
browseCategories = require './browse_categories.coffee'
query = require './queries/initial'

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

maybeFetchHomepageRails = (req)->
  deferred = Q.defer()
  metaphysics(query: query, req: req)
    .then (data) -> deferred.resolve data
    .catch -> deferred.resolve home_page: { artwork_modules: [] }

  deferred.promise

@index = (req, res, next) ->
  return if metaphysics.debug req, res, { method: 'post', query: query }

  timeToCacheInSeconds = 300 # 5 Minutes

  # homepage:featured-sections
  featuredLinks = new Items [], id: '529939e2275b245e290004a0', item_type: 'FeaturedLink'
  # homepage:featured-links
  featuredArticles = new Articles
  # homepage:featured-shows
  featuredShows = new Items [], id: '530ebe92139b21efd6000071', item_type: 'PartnerShow'

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

  Q
    .all [
      maybeFetchHomepageRails req
      featuredLinks.fetch cache: true
      featuredArticles.fetch
        cache: true
        cacheTime: timeToCacheInSeconds
        data:
          published: true
          featured: true
          sort: '-published_at'
      featuredShows.fetch cache: true, cacheTime: timeToCacheInSeconds
    ]

    .then ([{ home_page }]) ->
      heroUnits = home_page.hero_units
      heroUnits[positionWelcomeHeroMethod(req, res)](welcomeHero) unless req.user?

      # always show followed artist rail for logged in users,
      # if we dont get results we will replace with artists TO follow
      if req.user and not _.findWhere home_page.artwork_modules, { key: 'followed_artists' }
        home_page.artwork_modules.unshift { key: 'followed_artists' }

      res.locals.sd.HERO_UNITS = heroUnits
      res.locals.sd.USER_HOME_PAGE = home_page.artwork_modules

      res.render 'index',
        heroUnits: heroUnits
        modules: home_page.artwork_modules
        featuredLinks: featuredLinks
        featuredArticles: featuredArticles
        featuredShows: featuredShows
        viewHelpers: viewHelpers
        browseCategories: browseCategories
        jsonLD: JSON.stringify jsonLD

    .catch next

@redirectToSignup = (req, res) ->
  res.redirect "/sign_up"

@redirectLoggedInHome = (req, res, next) ->
  pathname = parse(req.url or '').pathname
  req.query['redirect-to'] = '/' if pathname is '/log_in' or pathname is '/sign_up'
  if req.user? then res.redirect getRedirectTo(req) else next()
