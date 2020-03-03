#
# /galleries and /institutions
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/galleries', routes.index
app.get '/galleries/:city', routes.galleries_institutions
app.get '/institutions', routes.index
app.get '/institutions/:city', routes.galleries_institutions

app.get '/galleries/all', (req, res) -> res.redirect "/galleries"
app.get '/institutions/all', (req, res) -> res.redirect "/institutions"
