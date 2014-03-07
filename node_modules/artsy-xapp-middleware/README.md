# Artsy Xapp Middleware

Node middleware that fetches an xapp token from Artsy, stores it in res.locals, and expires it.

Use like so...

````coffeescript
app.use require('artsy-xapp-middlware')
  artsyUrl: 'http://artsy.net'
  clientId: '133fsa3'
  clientSecret: 'f32j13f'

app.get '/', (req, res) ->
  res.send "This app's XAPP token " + res.locals.artsyXappToken
````