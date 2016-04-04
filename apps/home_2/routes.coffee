_ = require 'underscore'
Q = require 'bluebird-q'
{ parse } = require 'url'
Backbone = require 'backbone'
sd = require('sharify').data
HeroUnits = require '../../collections/hero_units'
UserHomePage = require './models/user_home_page'
{ client } = require '../../lib/cache'
welcomeHero = require './welcome'
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

@index = (req, res) ->
  heroUnits = new HeroUnits
  userHomePage = new UserHomePage
  timeToCacheInSeconds = 300 # 5 Minutes

  Q.allSettled(_.compact([
    heroUnits.fetch(cache: true, cacheTime: timeToCacheInSeconds)
    userHomePage.fetch query: query, currentUser: req.user
  ])).then(->
    heroUnits[positionWelcomeHeroMethod(req, res)](welcomeHero) unless req.user?
    res.locals.sd.HERO_UNITS = heroUnits.toJSON()
    res.locals.sd.USER_HOME_PAGE = userHomePage.modules.toJSON()
    res.render 'index',
      heroUnits: heroUnits
      homePage: userHomePage
  ).done()

@redirectToSignup = (req, res) ->
  res.redirect "/sign_up"

@redirectLoggedInHome = (req, res, next) ->
  pathname = parse(req.url or '').pathname
  req.query['redirect-to'] = '/' if pathname is '/log_in' or pathname is '/sign_up'
  if req.user? then res.redirect getRedirectTo(req) else next()
