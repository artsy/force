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

The XAPP token is cached and accessible at any time via `require('artsy-xapp-middlware').token`. However this is unreliable as the token can expire at any time causing the `.token` value to be null. The XAPP token will only be re-cached the next time the middleware is called, so the most reliable way to access the token is through `res.locals.artsyXappToken`.
