# Deploy Notes

Force is hosted on Heroku, and currently deployed via `make deploy env=production|staging`. This will bundle and upload all fingerprinted assets to an identically named bucket on S3 (force-production|staging), sets the appropriate `COMMIT_HASH` ENV var on the heroku app, and finally does a git force push to heroku.

If you are wanting to deploy from your local environment, simply running a `make deploy env=production|staging` along with valid `S3_KEY` and `S3_SECRET` credentials (can be found in Force.env secure note in 1Pass) from a checked out master branch should be sufficient. Note that it is your locally checked out master that is being deployed.

Please try not to update Force Staging to point to gravity's production. It may be tempting when demoing/looking at a new feature to want to use real data, but this is really dangerous. You may inadvertently place a bid or send an inquiry, etc.

But, if you do really want to point a non-production Force instance to production gravity in order to check stuff out, see below on deploying Force to a personal Heroku app.

## Deploying Force to a Personal Heroku App

The first step is to 'fork' the force-production app on Heroku. With an updated [Toolbelt](https://toolbelt.heroku.com/), this is: `heroku fork --app force-production new_app_name`. This copies the slug and all config vars from `force-production` to a new app called `new_app_name`. The app is then live at http://new_app_name.herokuapp.com.

Now you'll want to do a deploy to this app. You'll first need to create an S3 bucket with a name matching the app name you chose to fork to (`new_app_name`). Then, run the `make deploy_custom app=new_app_name` from the checked out branch/PR you wish to deploy. This will upload fingerprinted assets to that bucket, as well as push the currently checked out branch to that heroku app.

Next, you'll want to switch some config vars.

```
heroku config:set APP_URL=http://new_app_name.herokuapp.com --app new_app_name
heroku config:set S3_BUCKET=new_app_name --app new_app_name
heroku config:set APPLICATION_NAME=new_app_name --app new_app_name
heroku config:set CDN_URL=https://new_app_name.s3.amazonaws.com --app new_app_name

```

At this point you should be good to go!
