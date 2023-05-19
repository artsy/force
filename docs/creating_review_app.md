## Creating a Force Review App

If you want to create a deploy for a WIP feature or for QA, Hokusai supports [Review Apps](https://github.com/artsy/hokusai/blob/main/docs/Review_Apps.md).

You can create a review app via CircleCI which runs the [`build_review_app.sh`](https://github.com/artsy/force/blob/main/scripts/build_review_app.sh) script. Or, you can run that script locally, which will be slower because it involves building the docker image locally and pushing it up to AWS ECR.

The rest of the doc assumes you are working with a review app called `awesome-feature`.

### Building on Circle

This is the easiest and fastest way. Push up a branch named `review-app-awesome-feature`

CircleCI will match the `review-app-` prefix and either:

1. Create a review app using `build_review_app.sh` if the review app doesn't
   exist yet (i.e. first successful push of the branch), or
2. Update an existing review app using `update_review_app.sh`
3. Once CI is complete follow [this step](https://github.com/artsy/force/blob/main/docs/creating_review_app.md#accessing-the-review-app) to setup DNS.

### Building on Local

First, make sure `jq` is installed:

```sh
brew install jq
```

Then launch the script with:

```sh
./scripts/build_review_app.sh awesome-feature
```

The script will save a K8s spec in `hokusai/awesome-feature.yml`

### Accessing the review app.

To access the review app, you must create a DNS name for it. The name must match the name of the review app, and it must end in `artsy.net`. So it must be `awesome-feature.artsy.net`. This is required for full OAuth flow to complete. On Cloudflare, please do:

1. [Login to Cloudflare](https://dash.cloudflare.com/), and navigate to **artsy.net** > **DNS**
1. Click `+ Add Record`
1. Change `Type` dropdown to `CNAME`
1. Under `Name` enter `awesome-feature`
1. Under `Target` say `nginx-staging.artsy.net`
1. Under `Proxy status` toggle to `Proxied`
1. Under `Record Attributes > Comment` add the PR that created the review app, e.g. https://github.com/artsy/force/pull/123
1. Under `Record Attributes > Tags` add the prefix of your team, e.g. `FX`
1. Hit `Save`
1. DNS will propagate and after a few minutes the review app will be available via `awesome-feature.artsy.net`

### Setting ENV variables on the review app

To set an ENV variable, run:

```sh
hokusai review_app env set <my-review-app-name> SOME_ENV_VAR=true
hokusai review_app refresh <my-review-app-name>
```

### Updating the review app

If the review app was created via Circle as mentioned above, simply push up your changes on the `review-app-awesome-feature` branch.

If the app was built locally, do:

```sh
hokusai registry push --overwrite --skip-latest --force --tag awesome-feature
```

and redeploy the app:

```sh
hokusai review_app deploy awesome-feature awesome-feature
```

### Deleting a Review App

You should delete review apps as soon as QA is complete.

Delete the app by:

```sh
yarn delete-review-app awesome-feature
```

Delete its DNS entry by:

1. [Login to Cloudflare](https://dash.cloudflare.com/), and navigate to **artsy.net** > **DNS**
1. In the search box, type `awesome-feature`
1. Locate the correct record in search results, hit `Edit` at end of line
1. Hit the `Delete` button on lower left

### Conclusion

For more info on Review App maintenence, [see Hokusai docs](https://github.com/artsy/hokusai/blob/master/docs/Review_Apps.md).

Read over the [`build_review_app.sh`](https://github.com/artsy/force/blob/main/scripts/build_review_app.sh) script for more info on how this is all done.
