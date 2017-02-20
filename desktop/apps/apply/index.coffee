express = require 'express'
{ APPLY_URL } = require '../../config'

app = module.exports = express()
redirect = (path) -> (req, res) -> res.redirect 301, "#{APPLY_URL}/#{path}"

app.get '/apply/gallery', redirect 'galleries'
app.get '/apply/institution', redirect 'institutions'
app.get '/apply/auction', redirect 'auctions'
app.get '/apply/fair', redirect 'fairs'
app.get '/apply*', redirect 'partnerships'
