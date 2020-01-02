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

In case you want to ease debugging the server-side code, you can set the `DEBUG`
environment variable to disable webpack optimizations.

```sh
env DEBUG=true yarn start:prod
```

## Creating a Review App

If wanting to create a deploy for a WIP feature or for QA, [Hokusai](), supports [Review Apps](https://github.com/artsy/hokusai/blob/master/docs/Review_Apps.md).

The process for launching the review app differs somewhat depending on whether your unmerged changes are in Reaction or in Force.

### If your unmerged changes are in Reaction

You will first cut a release of Reaction and publish it as a "canary" version to the NPM registry. You will then install this canary release into your copy of Force and launch _that_ as review app.

1. Login to the NPM registry with `npm login`. (You will need to already have an NPM account, and it will need to be associated with the Artsy NPM org — holler on #front-end if you need help with this.)
1. Update `reaction/package.json` to have a canary version number, e.g. `22.9.8-canary-<your PR number>`
1. Publish the package under the `canary` tag with `npm publish --tag canary`. (Including the tag is vital to ensuring this release doesn't end up tagged as `latest` — thus triggering a round of auto-update PRs in the various apps that consume Reaction)
1. Confirm the results of the previous step with `npm dist-tag ls`. You should see something like

   ```
   canary: 22.9.8-canary-<your PR number>
   latest: 22.9.7
   ```

1. Over in Force install the canary with `yarn add @artsy/reaction@canary`

From here on out follow the steps in the next section for launching a Force review app. When you are done with the review process revert your change in step 2 above so that Reaction will resume normal versioning.

### If your unmerged changes are in Force

Launching a Force review app can be automated via the [`build_review_app.sh`](https://github.com/artsy/force/blob/master/scripts/build_review_app.sh) script:

```sh
./scripts/build_review_app.sh review-app-name
```

When this process is done (and it will take a while) it should output a url similar to

```sh
a99199101d01011e9aff2127c3b176f7-1359163722.us-east-1.elb.amazonaws.com
```

This is your Review App url, which should support all of the basic features inside of Force.

If you'd like a pretty URL subdomain or need to test full OAuth flows (for, say, login redirects between Gravity and Force for Auction registration) then an additional non-automated step is required via Cloudflare:

1. [Login to Cloudflare](https://dash.cloudflare.com/), and navigate to **artsy.net** > **DNS**
1. Click `+ Add Record`
1. Change `Type` dropdown to `CNAME`
1. Under `Name` enter a new subdomain
1. Under `Target` paste in URL output by `build_review_app.sh` script
1. Hit `Save`
1. DNS will propagate and after a few minutes the review app will be available via `<your-subdomain>.artsy.net`

Read over the [`build_review_app.sh`](https://github.com/artsy/force/blob/master/scripts/build_review_app.sh) script for more info on how this is all done.

😇 After your review app is no longer needed please remember to clean up any CNAMEs you've created, and to de-provision the review app itself with `hokusai review_app delete <review-app-name>`

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
