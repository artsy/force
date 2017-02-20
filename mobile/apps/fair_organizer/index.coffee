#
# Fair "Year-Round" / Fair Organizer app
#
express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
getFairOrgData = [
  routes.fetchFairOrgData
  (req, res, next) -> next() unless req.timedout
]

# just a route to for testing for now
app.get '/:id', getFairOrgData, routes.overview
