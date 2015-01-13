#
# Fair "Year-Round" / Fair Organizer app
#

express = require 'express'
routes = require './routes'
timeout = require 'connect-timeout'
{ resize, crop } = require '../../components/resizer'

app = module.exports = express()
app.locals.resize = resize
app.locals.crop = crop
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
getFairData = [
  timeout('25s')
  routes.fetchFairData
  (req, res, next) -> next() unless req.timedout
]

# just a route to for testing for now
app.get '/the-armory-show-temp', getFairData, routes.overview
