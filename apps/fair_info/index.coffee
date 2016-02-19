express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.use '/:id/*', routes.assignFair
app.get '/:id/info', routes.info
app.get '/:id/info/visitors', routes.visitors
app.get '/:id/info/programming', routes.programming
app.get '/:id/info/events', routes.events
app.get '/:id/info/artsy-at-the-fair', routes.atTheFair
app.get '/:id/info/about-the-fair', routes.aboutFair

# big ol' sigh
app.get '/:id/info/armory-arts-week', routes.armoryArtsWeek
app.get '/:id/info/armory-arts-week/all', routes.armoryArtsWeekAll

