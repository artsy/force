# Authentication in Force

Currently, there are two authentication methods in Force: email/password and
third-party authentication.

We have three third-party providers available in Force: Google, Apple, and
Facebook.

The majority of the authentication middleware code in Force exists in a package
called `@artsy/passport`. The package handles most of the communication between
Force and Gravity (see
[/api/v1/me/authentications](https://github.com/artsy/gravity/blob/main/app/api/v1/me_authentications_endpoint.rb)
endpoints and the
[/oauth2/access_token](https://github.com/artsy/gravity/blob/main/app/controllers/oauth_controller.rb)
endpoint in Gravity).

Force is the only project that uses `@artsy/passport`. For that reason, we chose
to [move the package from its own repository into the `/src/lib` directory of
Force](https://github.com/artsy/force/pull/9263). We also deprecated the package
on NPM.

There was a package called `@artsy/passport-local-with-otp`, which was also
[moved into Force](https://github.com/artsy/force/pull/9268).

You'll find the code that mounts our authentication routes in
`/src/lib/passport/app/index.js`. The harness and components for the
authentication UI live in `/src/v2/Apps/Authentication/` and
`src/v2/Components/Authentication/`, respectively.

## Key Dependencies

Each of these packages is important for the implementation in
`@artsy/passport`.

- [passport](https://www.passportjs.org/)
- [passport-facebook](https://www.passportjs.org/packages/passport-facebook/)
- [passport-apple](https://www.passportjs.org/packages/passport-apple/)
- [passport-google-oauth20](https://www.passportjs.org/packages/passport-google-oauth20/)
- [@artsy/xapp](https://github.com/artsy/artsy-xapp)
- [artsy/sharify](https://github.com/artsy/sharify)

## Strategies for Local Development

Working locally with `@artsy/passport` was very
difficult before it came into Force. Despite being better, you'll most likely
still encounter a few obstacles.

When working with third-party providers, you'll need to provide those
third-party providers with some publicly accessible URLs. If you're developing
locally, you can achieve this pretty easily using [ngrok](https://ngrok.com/).

Alternatively, you can try using [a Review
App](https://github.com/artsy/force/blob/main/docs/creating_review_app.md#accessing-the-review-app),
but that approach seems to offer mixed results.

Here's how to make Google auth work with local Force app:

- Set up an Internet-facing URL for local Force app.
  As mentioned, you can use ngrok.
  Sign up for a free ngrok account. And create an auth token.
  Launch local Force which lisens on port 5000.
  Run ngrok:

```
brew install ngrok
ngrok config add-authtoken <your-ngrok-auth-token>
ngrok http 5000 --response-header-add "content-security-policy: self;"
```

You will see an ngrok url like this one:

```
https://4dfe-71-247-23-28.ngrok.io -> http://localhost:5000
```

Visiting that public URL should load your local Force app.

- Register your ngrok URL on Google Cloud Platform as callback
  Log into Google Cloud Platform using the creds in 1Pass `GMail` card.
  - In GCP `Console`, select `API Project` from upper left.
  - Click the "Hamburger" at upper left, which shows left sidebar.
  - Click `API & Services > Credentials`
  - Under `OAuth 2.0 Client IDs`, click edit for `Force Staging`
  - Add the ngrok URL under `Authorized JavaScript origins`
  - Add the ngrok URL under `Authorized redirect URIs`, with `/users/auth/google/callback` appended
  - Save
- Override your local `APP_URL` var to be the ngrok URL. Restart Force.

## Adding a New Provider

Following [this example PR](https://github.com/artsy/force/pull/9143), which
added Google as a provider, might make things more clear.

To add a new provider, you'll need to accomplish the following tasks:

- Ensure an endpoint for your provider exists in
  [Gravity](https://github.com/artsy/gravity/blob/main/app/api/v1/me_authentications_endpoint.rb).
- Find a [Passport strategy for the
  provider](https://www.passportjs.org/packages/)
- Add any required keys or tokens from the provider to Force
- Configure the strategy in `src/lib/passport/lib/passport/index.js`
  - Ensure you have set any necessary scope params in `src/lib/passport/lib/passport/lifecycle.js` or [this could be you](https://github.com/artsy/force/pull/9851)!
- Write the callback function for your provider in
  `src/lib/passport/lib/passport/callbacks.js`
- Add routes for your provider to `src/lib/passport/lib/passport/index.js`
- Follow the existing UI patterns in Force to make the provider available to
  users
