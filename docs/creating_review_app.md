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

Launching a Force review app can be automated via the [`build_review_app.sh`](https://github.com/artsy/force/blob/master/scripts/build_review_app.sh) script.

First, make sure `jq` is installed:

```sh
brew install jq
```

Then launch the script:

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

## Updating a Review App 

If you want to push subsequent changes to the review app you can push a new build to the same tag with the `--overwrite` flag:

```sh
hokusai registry push --overwrite --skip-latest --force --tag <name>
```

and you need to redeploy your app:

```sh
hokusai review_app deploy <name> <name>
```

😇 After your review app is no longer needed please remember to clean up any CNAMEs you've created, and to de-provision the review app itself with `hokusai review_app delete <review-app-name>`

For more info on Review App maintenence, [see Hokusai docs](https://github.com/artsy/hokusai/blob/master/docs/Review_Apps.md).
