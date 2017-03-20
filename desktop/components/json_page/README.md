# JSON Page

Deals with the fetching and editing of blobs of JSON on S3.

## Usage

```coffeescript
# index.coffee

adminOnly = require '../../lib/middleware/admin_only'
JSONPage = require '../../components/json_page'

# Initialize a new page object
page = new JSONPage name: 'cool-page', paths: show: '/cool-page', edit: '/cool-page/edit'

# Returns routes handlers bound to the passed in page object
{ data, edit, upload } = require('../../components/json_page/routes')(page)

# You write your own 'show' route handler
app.get page.paths.show, routes.index

# Mount your route handlers
app.get page.paths.show + '/data', data # Optional, just exposes the page's data
app.get page.paths.edit, adminOnly, edit
app.post page.paths.edit, adminOnly, upload
```

```coffeescript
# routes.coffee

JSONPage = require '../../components/json_page'
page = new JSONPage name: 'cool-page'

@index = (req, res, next) ->
  page.get (err, data) ->
    return next err if err
    res.render 'index', page.data
```

## Development

Ensure you have the .env vars: `S3_KEY`, `S3_SECRET` set.

To sync data with the bucket:

```
> foreman run node_modules/.bin/coffee ./desktop/components/json_page/seed.coffee your_page_name staging ../../../some/path/to/your/data.json
> ? Update `your_page_name` in the bucket `force-staging` with data from `../../apps/your_app/test/fixture.json`? Yes
> Updated `https://force-staging.s3.amazonaws.com/json/your_page_name.json`.
```

To update the fixture from the bucket data

```
foreman run node_modules/.bin/coffee components/json_page/update.coffee your_page_name staging ../some/path/to/your/data.json
? Update `../../apps/your_app/test/fixture.json` with data from `your_page_name` in the bucket `force-staging`? Yes
Updated.
```
