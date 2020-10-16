# Contributing to Force

This project is work of [many developers](https://github.com/artsy/force/graphs/contributors).

We accept [pull requests](https://github.com/artsy/force/pulls), and you may [propose features and discuss issues](https://github.com/artsy/force/issues).

## Quick Start

- Install dependencies:

        $ git clone git@github.com:artsy/force.git
        $ cd force
        $ cp .env.oss .env
        $ yarn install

- To run the full Artsy.net server:

        $ yarn start
        $ open http://localhost:5000

- Run the tests:

        $ yarn type-check
        $ yarn jest

## Setup Instructions

### Clone the Project

Clone the [project on GitHub](https://github.com/artsy/force) and cd in:

```sh
git clone git@github.com:artsy/force.git
cd force
```

## Run Force

Install [NVM](https://github.com/creationix/nvm) and Node 12:

```sh
nvm install 12
nvm alias default 12
```

Install node modules with Yarn:

```sh
brew install yarn
yarn install
```

Copy the `.env.oss` file to a `.env` file:

```sh
cp .env.oss .env
```

Start the server:

```sh
yarn start
```

Force should now be running at [http://localhost:5000/](http://localhost:5000/).

## Running a local copy of Force in Production mode:

```sh
yarn start:prod
```

This creates a production-ready bundle of client and server-side code and boots the server. (This will take a while to compile.)

In case you want to ease debugging the server-side code, you can set the `DEBUG`
environment variable to disable webpack optimizations.

```sh
env DEBUG=true yarn start:prod
```

## Authentication in your local Force app

Authentication in Force is handled by a modified OAuth flow, with [Gravity](https://github.com/artsy/gravity) authenticating the user and redirecting back to Force. For security reasons, the `localhost` origin [is forbidden as a redirect URL by Gravity in the staging environment](https://github.com/artsy/gravity/blob/543373d7d4413f5c8b1c8f84f73b2a592c00cba2/app/models/util/url_validation.rb#L23). This means that when running Force locally at `http://localhost:5000`, the staging Gravity environment won't redirect back to your locally running app to complete the flow.

For most local development in Force, this shouldn't be a problem. The login will still take effect and you can manually visit the desired local URL after logging in.

If you require the authentication flow to redirect back to your local version, you can configure Force to run locally at an `*.artsy.net` subdomain. Gravity's staging environment considers all `*.artsy.net` subdomains to be valid redirect URLs. Note that you may need to do this in
an incognito window if you're using Chrome. Otherwise, the browser tends
to remember that Artsy.net should always be accessed via SSL, and enforces
that behavior even for subdomains (such as local.artsy.net).

1. Add the following entry to your local hosts file (`/etc/hosts`):

```
127.0.0.1 local.artsy.net
```

2. Update your `.env` file with the following setting:

```
APP_URL=http://local.artsy.net:5000
```

3. Visit [`http://local.artsy.net:5000`](http://local.artsy.net:5000).

## Creating a Review App

See [the docs](docs/creating_review_app.md).

## Create a Topic Branch

Make sure your fork is up-to-date and create a topic branch for your feature or bug fix.

```sh
git checkout master
git pull upstream master
git checkout -b my-feature-branch
```

## Write Tests

Write tests for all new features and fixes using Mocha or Jest. Run all tests with `yarn test`.

Mocha looks for files prefixed with `.test` or `.spec`, while Jest looks for the prefix `.jest`.

To speed up your workflow try watching an individual file for changes, e.g. `yarn mocha -- --watch desktop/components/foo/bar.test.coffee`

## Write Code

We definitely appreciate pull requests that highlight or reproduce a problem, even without a fix.

Implement your feature or bug fix.

## Commit Changes

Make sure git knows your name and email address:

```sh
git config --global user.name "Your Name"
git config --global user.email "contributor@example.com"
```

## Push

```sh
git push origin my-feature-branch
```

## Make a Pull Request

Go to https://github.com/contributor/force and select your feature branch.
Click the 'Pull Request' button and fill out the form. Pull requests are usually reviewed within a few days.

## Rebase

If you've been working on a change for a while, rebase with upstream/master.

```
git fetch upstream
git rebase upstream/master
git push origin my-feature-branch -f
```

## Check on Your Pull Request

Go back to your pull request after a few minutes and see whether it passed muster with Semaphore. Everything should look green, otherwise fix issues and amend your commit as described above.

## Be Patient

It's likely that your change will not be merged and that the nitpicky maintainers will ask you to do more, or fix seemingly benign problems. Hang in there!

## Thank You

Please do know that we really appreciate and value your time and work. We love you, really. <3
