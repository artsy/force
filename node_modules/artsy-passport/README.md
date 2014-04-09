# Artsy Passport

Wires up the common auth handlers for Artsy's [Ezel](http://ezeljs.com)-based apps using [passport](http://passportjs.org/). Used internally at Artsy to DRY up authentication code.

## Setup

#### Make sure you first mount session, body parser, and [xapp](https://github.com/artsy/artsy-xapp-middleware) middlware.

````coffeescript
app.use require('artsy-xapp-middlware') { #... }
app.use express.bodyParser()
app.use express.cookieParser('foobar')
app.use express.cookieSession()
````

#### Then mount Artsy Passport passing a big configuration hash.

_Values indicate defaults._

````coffeescript
app.use artsyPassport
  FACEBOOK_ID: # Facebook app ID
  FACEBOOK_SECRET: # Facebook app secret
  TWITTER_KEY: # Twitter consumer key
  TWITTER_SECRET: # Twitter consumer secret
  ARTSY_ID: # Artsy client id
  ARTSY_SECRET: # Artsy client secret
  SECURE_ARTSY_URL: # SSL Artsy url e.g. https://artsy.net
  APP_URL: # Url pointing back to your app e.g. http://flare.artsy.net
  facebookPath: '/users/auth/facebook' # Url to point your facebook button to
  twitterPath: '/users/auth/twitter' # Url to point your twitter button to
  loginPath: '/users/sign_in' # POST `email` and `password` to this path to login
  signupPath: '/users/invitation/accept' # POST `email` and `password` to this path to signup
  twitterCallbackPath: '/users/auth/twitter/callback' # After twitter auth callback url
  facebookCallbackPath: '/users/auth/facebook/callback' # After facebook auth callback url
  # The user data to cache in the session
  userKeys: ['id', 'type', 'name', 'email', 'phone', 'lab_features', 'default_profile_id']
  CurrentUser: # Backbone Model class to serialize the user into e.g. `CurrentUser`
  # Temporary generated email for twitter signup.
  twitterSignupTempEmail: (token, secret, profile) -> 'md5hash@artsy.net'
  # (optional) After signing up with a provider Artsy Passport will redirect to the
  # login url. Override this to intecerpt with your own path such as a UI to prompt
  # for an email address to replace the Twitter temporary email. Just make sure that
  # Path for a "One last step" UI that lets Artsy store the user's email after twitter signup.
  twitterLastStepPath: '/users/auth/twitter/email'
````

The keys are cased so it's convenient to pass in a configuration hash. A minimal setup could look like this:

````coffeescript
app.use artsyPassport _.extend config,
  CurrentUser: CurrentUser
````

**Note:** CurrentUser must be a Backbone model with typical `get` and `toJSON` methods.

#### Create a login form pointing to your paths.

````jade
h1 Login
a( href='/users/auth/facebook' ) Login via Facebook
a( href='/users/auth/twitter' ) Login via Twitter
form( action='/users/sign_in', method='POST' )
  h3 Login via Email
  input( name='name' )
  input( name='email' )
  input( name='password' )
  button( type='submit' ) Signup


#### And maybe a signup form...

````jade
h1 Signup
a( href='/users/auth/facebook?sign_up=true' ) Signup via Facebook
a( href='/users/auth/twitter?sign_up=true' ) Signup via Twitter
form( action='/users/invitation/accept', method='POST' )
  h3 Signup via Email
  input( name='name' )
  input( name='email' )
  input( name='password' )
  button( type='submit' ) Signup
````

#### Finally there's this weird "one last step" UI for twitter to store emails after signup.

````jade
h1 Just one more step
form( method='post', action='/users/auth/twitter/email' )
  input.bordered-input( name='email' )
  button( type='submit' ) Join Artsy
````

#### Handle login and signup callbacks.

````coffeescript
{ loginPath, signupPath, twitterCallbackPath,
  twitterLastStepPath, facebookCallbackPath } = artsyPassport.options

app.post loginPath, (req, res) ->
  res.redirect '/'
app.post signupPath, (req, res) ->
  res.redirect '/personalize'
app.get twitterCallbackPath, (req, res) ->
  if req.query.sign_up then res.redirect('/personalize') else res.redirect('/')
app.get twitterLastStepPath, (req, res) ->
  res.render 'twitter_last_step'
app.get facebookCallbackPath, (req, res) ->
  if req.query.sign_up then res.redirect('/personalize') else res.redirect('/')
````

#### Access a logged in Artsy user in a variety of ways...

In your server-side templates

````jade
h1 Hello #{user.get('name')}
````

In your client-side code

````coffeescript
CurrentUser = require '../models/current_user.coffee'
sd = require('sharify').data

user = new CurrentUser(sd.CURRENT_USER)
````

In your routers

````coffeescript
app.get '/', (req, res) ->
  res.send 'Hello ' + req.user.get('name')
````

_These forms of user will be null if they're not logged in._

## Contributing

First install node modules `npm install` then write a ./config.coffee that looks something like this:

````coffeescript
module.exports =
  FACEBOOK_ID: ''
  FACEBOOK_SECRET: ''
  TWITTER_KEY: ''
  TWITTER_SECRET: ''
  ARTSY_ID: ''
  ARTSY_SECRET: ''
  SECURE_ARTSY_URL: 'https://staging.artsy.net'
  APP_URL: 'http://local.artsy.net:3000'
  # An Artsy user that's linked to facebook and twitter
  ARTSY_EMAIL: 'craig@artsy.net'
  ARTSY_PASSWORD: '***'
  TWITTER_EMAIL: 'craig@artsy.net'
  TWITTER_PASSWORD: '***'
  FACEBOOK_EMAIL: 'craig@artsy.net'
  FACEBOOK_PASSWORD: '***'
````

Then you can check the example by running `make example` and opening [localhost:4000](http://localhost:4000). The tests are integration tests that use the example, so once you set this up run `make test` to run tests.
