# Artsy Passport

_The `artsy-passport` package is deprecated, but [the code was moved into Force](https://github.com/artsy/force/pull/9263)._

_Most of the documentation in this README is legacy, but we should actively
update it as we make changes._

Wires up the common auth handlers, and related security concerns, for Artsy's [Ezel](https://github.com/artsy/ezel)-based apps using [passport](http://passportjs.org/). Used internally at Artsy to DRY up authentication code.

## Setup

#### Make sure you first mount session, body parser, and start [@artsy/xapp](https://github.com/artsy/artsy-xapp).

```
app.use express.bodyParser()
app.use express.cookieParser('foobar')
app.use express.cookieSession()
artsyXapp.init -> app.listen()
```

#### Then mount Artsy Passport passing a big configuration hash.

_Values indicate defaults._

```
app.use artsyPassport
  # Pass in env vars
  # ----------------
  FACEBOOK_ID: # Facebook app ID
  FACEBOOK_SECRET: # Facebook app secret
  ARTSY_ID: # Artsy client id
  ARTSY_SECRET: # Artsy client secret
  GOOGLE_ID: # Google client id
  GOOGLE_SECRET: # Google client secret
  ARTSY_URL: # SSL Artsy url e.g. https://artsy.net
  APP_URL: # Url pointing back to your app e.g. http://flare.artsy.net
  SEGMENT_WRITE_KEY: # Segment write key to track signup

  # Defaults you probably don't need to touch
  # -----------------------------------------

  # Social auth
  applePath: '/users/auth/apple',
  appleCallbackPath: '/users/auth/apple/callback',
  facebookPath: '/users/auth/facebook',
  facebookCallbackPath: '/users/auth/facebook/callback',
  googlePath: '/users/auth/google',
  googleCallbackPath: '/users/auth/google/callback',

  # Landing pages
  loginPagePath: '/log_in'
  signupPagePath: '/sign_up'
  settingsPagePath: '/settings'
  afterSignupPagePath: '/'

  # Misc
  logoutPath: '/users/sign_out'
  userKeys: [
    'id', 'type', 'name', 'email', 'phone', 'lab_features',
    'default_profile_id', 'has_partner_access', 'collector_level'
  ]
```

The keys are cased so it's convenient to pass in a configuration hash. A minimal setup could look like this:

```
app.use artsyPassport config
```

#### Create a login form pointing to your paths.

```
h1 Login
pre!= error
a( href=ap.facebookPath ) Login via Facebook
form( action=ap.loginPagePath, method='POST' )
  h3 Login via Email
  input( name='name' )
  input( name='email' )
  input( name='password' )
  input( type="hidden" name="_csrf" value=csrfToken )
  button( type='submit' ) Login
```

#### And maybe a signup form...

```
h1 Signup
pre!= error
a( href=ap.facebookPath ) Signup via Facebook
form( action=ap.signupPagePath, method='POST' )
  h3 Signup via Email
  input( name='name' )
  input( name='email' )
  input( name='password' )
  input( type="hidden" name="_csrf" value=csrfToken )
  button( type='submit' ) Signup
```

#### And maybe a settings page for linking accounts...

```
h2 Linked Accounts
pre!= error
- providers = user.authentications.map(function(a) { return a.provider })
if providers.indexOf('facebook') > -1
  | Connected Facebook
else
  a( href=ap.facebookPath ) Connect Facebook
```

#### Render the pages

```
{ loginPagePath, signupPagePath, settingsPagePath, afterSignupPagePath } = artsyPassport.options

app.get loginPagePath, (req, res) -> res.render 'login'
app.get signupPagePath, (req, res) -> res.render 'signup'
app.get settingsPagePath, (req, res) -> res.render 'settings'
app.get afterSignupPagePath, (req, res) -> res.render 'personalize'
```

#### Access a logged in Artsy user in a variety of ways...

In your server-side templates

```
h1 Hello #{user.name}
```

In your client-side code

```
sd = require('sharify').data

user = sd.CURRENT_USER
```

In your routers

```
app.get '/', (req, res) ->
  res.send 'Hello ' + req.user.name
```

_These forms of user will be null if they're not logged in._

## Sanitize Redirect

If you implement a fancier auth flow that involves client-side redirecting back, you may find this helper useful in avoiding ["open redirect"](https://github.com/artsy/artsy-passport/issues/68) attacks.

```
sanitizeRedirect = require 'artsy-passport/sanitize-redirect'

location.href = sanitizeRedirect "http://artsy.net%0D%0Aattacker.com/"
# Notices the url isn't pointing at artsy.net, so just redirects to /
```

## Contributing

Add a `local.artsy.net` entry into your /etc/hosts

```
127.0.0.1 localhost
#...
127.0.0.1 local.artsy.net
```

Install node modules `yarn` then write a ./config.js that looks something like this:

```js
module.exports = {
  FACEBOOK_ID: "",
  FACEBOOK_SECRET: "",
  ARTSY_ID: "",
  ARTSY_SECRET: "",
  ARTSY_URL: "https://api.artsy.net",
  APP_URL: "http://local.artsy.net:4000",
  // An Artsy user that's linked to Facebook
  ARTSY_EMAIL: "craig@artsy.net",
  ARTSY_PASSWORD: "",
  FACEBOOK_EMAIL: "craigspaeth@gmail.com",
  FACEBOOK_PASSWORD: "",
}
```
