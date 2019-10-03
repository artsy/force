# Contributing to Force

This project is work of [many developers](https://github.com/artsy/force/graphs/contributors).

We accept [pull requests](https://github.com/artsy/force/pulls), and you may [propose features and discuss issues](https://github.com/artsy/force/issues).

In the examples below, substitute your GitHub username for `contributor` in URLs.

## Fork the Project

Fork the [project on GitHub](https://github.com/artsy/force) and check out your copy.

```sh
git clone https://github.com/contributor/force.git
cd force
git remote add upstream https://github.com/artsy/force.git
```

## Run Force

Install [NVM](https://github.com/creationix/nvm) and Node 10.

```sh
nvm install 10
nvm alias default 10
```

Install node modules with Yarn.

```sh
npm i yarn -g
yarn install
```

Copy the `.env.oss` file to a `.env` file.

```sh
cp .env.oss .env
```

Start the server.

```sh
yarn start
```

Force should now be running at [http://localhost:5000/](http://localhost:5000/).

## Real-time development with [Reaction](https://github.com/artsy/reaction)

When working with components built in Reaction and want to keep both environments in sync without publishing to NPM, run:

```sh
cd reaction
yarn link && yarn watch

# Open a new terminal pane
cd force
yarn link @artsy/reaction && yarn start
```

## Running a local copy of Force in Production mode:

```sh
yarn start:prod
```

This creates a production-ready bundle of client and server-side code and boots the server. (This will take a while to compile.)

## Creating a Review App

If wanting to create a deploy for a WIP feature or for QA, [Hokusai](), supports [Review Apps](https://github.com/artsy/force/blob/master/scripts/build_review_app.sh). This can be automated via the [`build_review_app`](https://github.com/artsy/force/blob/master/scripts/build_review_app.sh) script:

```sh
./scripts/build_review_app.sh review-app-name
```

Notably, the process isn’t fully automated as it requires creating a DNS record for the service in the `artsy.net` domain. This is required so that the Review App can oauth with [Gravity](https://github.com/artsy/gravity) (which does a hard check that the requesting client originates from the `artsy.net` domain). The script above will guide you in creating this, however.

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

It's likely that your change will not be merged and that the nitpicky maintainers will ask you to do more, or fix seemingly benign problems. Hang on there!

## Thank You

Please do know that we really appreciate and value your time and work. We love you, really. <3
