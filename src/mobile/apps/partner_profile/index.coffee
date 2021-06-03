#
# Partner profile pages e.g. artsy.net/gagosian-gallery
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

# TODO: Remove once we've rebuilt the partner article page in the new framework
app.get '/:profileId/article/:articleId', routes.requirePartner, routes.article
