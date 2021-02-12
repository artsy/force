#
# Personalize page
#

express = require 'express'
{ ensureLoggedInUser, ensureValidStep, index } = require './routes.js'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/personalize', (_, res) => res.redirect('/personalize/interests')
app.get '/personalize/:slug', ensureLoggedInUser, ensureValidStep, index
