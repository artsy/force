# Split Test

To start a test, add your configuration to the `running_tests.coffee` file:

```coffeescript
header_design:
  key: 'header_design'
  outcomes:
    old: 80
    new: 20
  edge: 'new' # Optional
  dimension: 'dimension1' # Optional
  scope: 'local' # Optional
```

## Options

`key` name of your test

`outcomes` either a hash of your outcomes, whose point values must add up to 100, or an array (when used with `weighting`: 'equal').

`edge` is the feature that you want logged in admins to always have.

`dimension` is a Google Analytics dimension. You can create one by logging into GA, clicking 'Admin', clicking 'Custom Definitions' in the middle column, clicking 'Custom Dimensions'. From there you can create a new custom dimension. Note that you should then name this 'dimension1', 'dimesion2', etc. - corresponding to the index of the custom definition in this UI.

`scope` in some cases you may only want to initialize a test once a certain action is triggered (ie: landing on a specific page), if that's the case passing `scope: 'local'` will not globally intialize the test.

`control_group` is what Reflection and other crawlers will see. Defaults to 'control'.

`weighting` when specified as 'equal', will equally weight `outcomes`.

Tests are by default initialized globally meaning as soon as there is a configuration in the running tests file you'll get access to a Sharify variable the same name as your configuration key with the outcome and the test will set itself up client-side.

## Getting the outcome of a split test on the server

By default, this component sets an `sd` variable with the uppercase key of your test. If the key of your test is `artist_view_test`, `sd.ARTIST_VIEW_TEST` will contain the outcome of the split test.

## Passing test outcomes to components

### How does an outcome get set to sd?

On app start up the split test middleware checks if there is an existing `sd.YOUR_AB_TEST_NAME` value for the keys in runningTest config and if there is none, one is assigned. The value is assigned by retrieving the test cookie or setting the cookie which is determined by the `weighting` property passed into options.

### How to pass an outcome to react

Via routes file:

```
export async function index(req, res, next) {
  const {
    ...
    EDITORIAL_COLLECTIONS_RAIL, // a/b test value
  } = res.locals.sd


  // CollectionsRail a/b test
  const showCollectionsRail = EDITORIAL_COLLECTIONS_RAIL === "experiment"

  const layout = await stitch({
    basePath: res.app.get("views"),
    layout: layoutTemplate,
    config: {
      styledComponents: true,
    },
    blocks: {
      head: "meta.jade",
      body: App,
    },
    locals: {
      ...res.locals,
    },
    data: {
      showCollectionsRail, // pass in a/b test bool as a prop
    },
  })
}
```

Via reaction app with react router:
For app using react router, properties should be passed to the context object.

In the server:

```
app.get(
  "/artist/:artistID*",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user && req.user.toJSON()
      const {
        ARTIST_COLLECTIONS_RAIL_QA, // Collections Rail a/b test
      } = res.locals.sd
      const {
        ...
      } = await buildServerApp({
        routes,
        url: req.url,
        userAgent: req.header("User-Agent"),
        context: {
          ...buildServerAppContext(req, res),
          showCollectionsRail:
            ARTIST_COLLECTIONS_RAIL_QA === "experiment"
        },
      })
    // Render layout logic
    ...
    }
  } catch (error) {
    ...
  }
)
```

In the client:

```
buildClientApp({
  routes,
  context: {
    user: sd.CURRENT_USER,
    showCollectionsRail:
      sd.ARTIST_COLLECTIONS_RAIL_QA === "experiment"
  },
})
  .then(({ ClientApp }) => {
    // Hydrate client app
    ...
  })
  .catch(error => {
    console.error(error)
  })
```

## Manually initializing a test on the client-side (optional) - deprecated

Note that this is the legacy method of initializing a test on the client-side.

```coffeescript
splitTest = require '../../../components/split_test/index.coffee'
# Call the required fn with the key to your configuration
test = splitTest('header_design')
# You can then call outcome (as many times as you like, you will get the same outcome for the same user)
test.outcome() # => 'new'
# Do something with your outcome
# Another useful method is `cssClass` which will output a class name for use in stylesheets
test.cssClass() # => 'is-splittest-header_design--new'
```

## Forcing a test down a specific path (optional) - deprecate?

### Client-side

```coffeescript
splitTest = require '../../../components/split_test/index.coffee'
test = splitTest 'header_design'
test.set 'old' # Force down 'old' path
```

### Server-side - deprecate?

```coffeescript
SplitTest = require '../../components/split_test/server_split_test'
runningTests = require '../../components/split_test/running_tests'
testConfig = runningTests.header_design
test = new SplitTest req, res, testConfig
test.set 'old'
res.locals.sd[testConfig.key.toUpperCase()] = 'old' # manually set the Sharify variable
```

## Ensuring your test is configured correctly

### Notes on QA:

1. Once a test is added to runningTests, cookies will be set for all users.
2. It is possible to enable a test without exposing new features to users with an admin only flags to keep the display internal.
3. However, because we do not want to infect our results tracking with data that is not part of the official test it is recommended you use a dummy name during qa and rename when the test is officially launched (i.e. `sd.EDITORIAL_COLLECTIONS_RAIL_QA`)

## Forcing a test down a specific path via url params

Logged in Artsy admins can override the outcome of a particular split test by passing query params.

For forcing the test `header_design` to have the outcome `old`:
http://www.artsy.net?split_test[header_design]=old

## How to ensure your events are being tracked

For local and staging environments these events will be printed to the browser console. For production, you can use the developer tools and click the network tap, filter request by "segment", and verify that you see the "Experiment Viewed" and other associated analytics events. You can also check looker as stated below.

## Tracking experiments

```coffeescript
# On the client
splitTest = require '../../../components/split_test/index.coffee'
test = splitTest('header_design').view()
```

## Confirm tracking data is received

Tests should deliver data to Looker ~ 2 hours after going into production. To confirm that data is being received, look for the test's 'experiment_id' at:
https://artsy.looker.com/sql/cgkgxbnzmf26cw
