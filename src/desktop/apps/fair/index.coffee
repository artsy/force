#
# Large fair app that does browsing, microsite, and more. /:fair.profile_id/*
#

express = require 'express'
routes = require './routes'
timeout = require 'connect-timeout'
{ redirectFairRequests } = require('./fairRedirection.ts')

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
app.get '/:id', redirectFairRequests, getFairData, routes.overview
app.get '/:id/:year([0-9]{4})', redirectFairRequests, getFairByOrganizerYear, routes.overview
app.get '/:id/overview', redirectFairRequests, getFairData, routes.overview
app.get '/:id/articles', redirectFairRequests, getFairData, routes.fairArticles
app.get '/:id/for-you', redirectFairRequests, getFairData, routes.forYou
app.get '/:id/search', redirectFairRequests, getFairData, routes.search
app.get '/:id/browse/show/:partner_id', redirectFairRequests, getFairData, routes.showRedirect
app.get '/:id/browse/artworks/artworks', redirectFairRequests, routes.malformedFilterRedirect
app.get '/:id/browse', redirectFairRequests, getFairData, routes.browse
app.get '/:id/browse/*', redirectFairRequests, getFairData, routes.browse
app.get '/:id/sign_up', redirectFairRequests, getFairData, routes.overview
app.get '/:id/sign_up/:action', redirectFairRequests, getFairData, routes.overview
app.get '/:id/capture', redirectFairRequests, getFairData, routes.captureSignup, routes.overview
app.get '/:id/capture/:action', redirectFairRequests, getFairData, routes.captureSignup, routes.overview
# Handle microgravity urls that get crawled by google
app.get '/:id/programming', redirectFairRequests, getFairData, routes.overview

