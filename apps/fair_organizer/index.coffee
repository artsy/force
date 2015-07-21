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

getFairOrgData = [
  timeout('25s')
  routes.fetchFairOrgData
  (req, res, next) -> next() unless req.timedout
]

app.get '/:id', getFairOrgData, routes.overview
