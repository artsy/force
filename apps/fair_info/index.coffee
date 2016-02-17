express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.use '/:id/*', routes.assignFair
app.get '/:id/info2', routes.info
app.get '/:id/info2/visitors', routes.visitors
app.get '/:id/info2/programming', routes.programming
app.get '/:id/info2/events', routes.events
app.get '/:id/info2/artsy-at-the-fair', routes.atTheFair
app.get '/:id/info2/about-the-fair', routes.aboutFair

# big ol' sigh
app.get '/:id/info2/armory-arts-week', routes.armoryArtsWeek
app.get '/:id/info2/armory-arts-week/all', routes.armoryArtsWeekAll
