#
# The Mailchimp subsciption endpoint
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.post '/mailchimp_subscribe', routes.subscribe