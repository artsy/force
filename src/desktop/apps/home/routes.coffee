_ = require 'underscore'
Q = require 'bluebird-q'
{ parse } = require 'url'
Backbone = require 'backbone'
sd = require('sharify').data
Items = require '../../collections/items'
{ client } = require '../../lib/cache'
metaphysics = require '../../../lib/metaphysics.coffee'
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

fetchMetaphysicsData = (req)->
  deferred = Q.defer()
  metaphysics(query: query, req: req)
    .then (data) -> deferred.resolve data
    .catch (err) ->
      deferred.resolve
        home_page:
          artwork_modules: []
          hero_units: err.data.home_page.hero_units
  deferred.promise

@index = (req, res, next) ->
  return if metaphysics.debug req, res, { method: 'post', query: query }

  # homepage:featured-sections
  featuredLinks = new Items [], id: '529939e2275b245e290004a0', item_type: 'FeaturedLink'

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
    .allSettled [
      fetchMetaphysicsData req
      featuredLinks.fetch cache: true
    ]
    .then (results) ->
      homePage = results[0]?.value.home_page

      isAdmin = req.user?.get('type') is 'Admin'

      heroUnits = if isAdmin then [] else homePage.hero_units
      heroUnits[positionWelcomeHeroMethod(req, res)](welcomeHero) unless req.user?

      # always show followed artist rail for logged in users,
      # if we dont get results we will replace with artists TO follow
      if req.user and not _.findWhere homePage.artwork_modules, { key: 'followed_artists' }
        homePage.artwork_modules.unshift { key: 'followed_artists' }

      res.locals.sd.HERO_UNITS = heroUnits
      res.locals.sd.USER_HOME_PAGE = homePage.artwork_modules

      # for pasing data to client side forgot code
      res.locals.sd.RESET_PASSWORD_REDIRECT_TO = req.query.reset_password_redirect_to
      res.locals.sd.SET_PASSWORD = req.query.set_password

      res.render 'index',
        heroUnits: heroUnits
        modules: homePage.artwork_modules
        featuredLinks: featuredLinks
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
