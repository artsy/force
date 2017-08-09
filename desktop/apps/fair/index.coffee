#
# Large fair app that does browsing, microsite, and more. /:fair.profile_id/*
#

express = require 'express'
routes = require './routes'
timeout = require 'connect-timeout'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
getFairData = [
  timeout('25s')
  routes.fetchFairData
  (req, res, next) -> next() unless req.timedout
]
getFairByOrganizerYear = [
  timeout('25s')
  routes.fetchFairByOrganizerYear
  routes.fetchFairData
  (req, res, next) -> next() unless req.timedout
]

app.use routes.microsite
app.get '/:id', getFairByOrganizerYear, routes.overview
app.get '/:id/:year([0-9]{4})', getFairByOrganizerYear, routes.overview
app.get '/:id/overview', getFairData, routes.overview
app.get '/:id/articles', getFairData, routes.fairArticles
app.get '/:id/for-you', getFairData, routes.forYou
app.get '/:id/search', getFairData, routes.search
app.get '/:id/browse/show/:partner_id', getFairData, routes.showRedirect
app.get '/:id/browse', getFairData, routes.browse
app.get '/:id/browse/*', getFairData, routes.browse
app.get '/:id/sign_up', getFairData, routes.overview
app.get '/:id/sign_up/:action', getFairData, routes.overview
app.get '/:id/capture', getFairData, routes.captureSignup, routes.overview
app.get '/:id/capture/:action', getFairData, routes.captureSignup, routes.overview
# Handle microgravity urls that get crawled by google
app.get '/:id/programming', getFairData, routes.overview

