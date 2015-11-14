express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.use('/:id/*', routes.assignFair)
app.get('/:id/info2', routes.visitors)
app.get('/:id/info2/visitors', routes.visitors)