express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/:type(galleries|institutions)-a-z', routes.partnersAZ
app.get '/:type(galleries|institutions)', routes.index
