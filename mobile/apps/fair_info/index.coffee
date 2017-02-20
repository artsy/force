express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/:id/info', routes.assignFair, routes.info
app.get '/:id/info/visitors', routes.assignFair, routes.visitors
app.get '/:id/info/events/:eventId.ics', routes.assignFair, routes.addEventToCalendar
app.get '/:id/info/events/:eventId', routes.assignFair, routes.singleEvent
app.get '/:id/info/events', routes.assignFair, routes.events
app.get '/:id/info/programming', routes.assignFair, routes.infoProgramming
app.get '/:id/info/artsy-at-the-fair', routes.assignFair, routes.atTheFair
app.get '/:id/info/about-the-fair', routes.assignFair, routes.aboutFair

# this HURTS
app.get '/:id/info/armory-arts-week', routes.assignFair, routes.armoryArtsWeek
app.get '/:id/info/armory-arts-week/all', routes.assignFair, routes.armoryArtsWeekAll
