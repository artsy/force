express = require 'express'
routes = require './routes'
markdown = require '../../components/util/markdown.coffee'
moment = require 'moment'
{ crop } = require '../../components/resizer/index'

app = module.exports = express()
app.set 'views', "#{__dirname}"
app.set 'view engine', 'jade'
app.locals.crop = crop
app.locals.markdown = markdown
app.locals.moment = moment

app.get '/2016-year-in-art', routes.eoy
app.get '/gender-equality', routes.gucci
app.get '/gender-equality/:slug', routes.gucci
app.get '/venice-biennale', (_, res) -> res.redirect '/venice-biennale/toward-venice'
app.post '/venice-biennale/sms', routes.sendSMS
app.get '/venice-biennale/:slug', routes.venice
app.get '/vanity/*', routes.vanity
