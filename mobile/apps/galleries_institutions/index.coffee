#
# /galleries and /institutions
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/galleries', routes.index
app.get '/galleries/all', routes.galleries_institutions
app.get '/galleries/:city', routes.galleries_institutions
app.get '/institutions', routes.index
app.get '/institutions/all', routes.galleries_institutions
app.get '/institutions/:city', routes.galleries_institutions

