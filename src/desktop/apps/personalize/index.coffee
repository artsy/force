#
# Personalize page
#

express = require 'express'
{ ensureLoggedInUser, index } = require './routes.js'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/personalize', index
app.get '/personalize/:slug', ensureLoggedInUser, index
