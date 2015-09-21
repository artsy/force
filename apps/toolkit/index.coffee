express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/social-media-toolkit', routes.index
app.post '/social-media-toolkit', routes.form
app.get '/ArtsySocialMediaToolkit.pdf', routes.pdf
