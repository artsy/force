#
# A collection of more or less static pages that live under artsy.net urls.
# Examples could include a year in review or a stumble upon page.
#
# Why not just drop in a bunch of .html files on S3 and use shortcuts?
# Who wants to write html! This lets us be lazy about easily leveraging existing
# UI components and preprocessors like stylus/jade. ༼;´༎ຶ ۝ ༎ຶ༽
#

express = require 'express'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/future-of-art', (req, res) -> res.render 'future_of_art'
app.use express.static __dirname + "/public"