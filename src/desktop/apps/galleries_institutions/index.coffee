express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/:type(galleries|institutions)', routes.index

app.get '/galleries-a-z', (req, res) -> res.redirect "/galleries"
app.get '/institutions-a-z', (req, res) -> res.redirect "/institutions"
