# Split Test

The Split Test component enables the bucketing of users into categories. When a test is enabled, a cookie is set for each user that is also stored on the window via sharify. The cookie/SD var's name is based on the test name, and its value is set to one of the test's possible outcomes. Engineers can expose multiple variations of features, content, components etc. by hooking into a test outcome.

Rolling out a test requires a few steps:

- Add a test with name and outcomes to `running_tests.coffee`
- Create any feature variations that should be exposed based on outcome
- Configure analytics events that will be tracked as part of the test
- Enable the test via a `splitTest.view()` event

The last step is especially important! Users will still receive cookies, and analytics will operate as expected with or without a `splitTest.view()` event, but it is this call that enables the data team to parse analytics in the context of a test.

## Creating a test and outcomes

To start a test, add your configuration to the `running_tests.coffee` file:

```coffeescript
# Using an object for outcomes
header_design:
  key: 'header_design'
  outcomes:
    old: 80
    new: 20
  edge: 'new' # Optional
  dimension: 'dimension1' # Optional
  scope: 'local' # Optional

# Using an array for outcomes
  artist_collections_rail_qa:
    key: 'artist_collections_rail_qa'
    outcomes: [
      'control'
      'experiment'
    ]
    control_group: 'control'
    edge: 'experiment'
    weighting: 'equal'
```

Once this step is complete, an `sd` variable will be present for all users identified by the uppercase key of your test. For the above example, the key of the test is `header_design` and `sd.HEADER_DESIGN` will contain the outcome of the split test, in this case either `80` or `20`.

#### Options

- `key` name of your test

- `outcomes` either a hash of your outcomes, whose point values must add up to 100, or an array (when used with `weighting`: 'equal').

- `edge` is the feature that you want logged in admins to always have.

- `dimension` is a Google Analytics dimension. You can create one by logging into GA, clicking 'Admin', clicking 'Custom Definitions' in the middle column, clicking 'Custom Dimensions'. From there you can create a new custom dimension. Note that you should then name this 'dimension1', 'dimesion2', etc. - corresponding to the index of the custom definition in this UI.

- `scope` in some cases you may only want to initialize a test once a certain action is triggered (ie: landing on a specific page), if that's the case passing `scope: 'local'` will not globally intialize the test.

- `control_group` is what Reflection and other crawlers will see. Defaults to 'control'.

- `weighting` when specified as 'equal', will equally weight `outcomes`.

Tests are by default initialized globally meaning as soon as there is a configuration in the running tests file you'll get access to a Sharify variable the same name as your configuration key with the outcome and the test will set itself up client-side.

### Tracking experiments

A test is not enabled from the analytics side without a `view` event. This must be triggered on the client.

#### In Reaction

SD variables are made available _on the client-side only_ in Reaction when they are added to [Reaction's Sharify `GlobalData`](https://github.com/artsy/reaction/blob/master/typings/sharify.d.ts).

Once that is done, your Reaction app can access Sharify variables as follows:

```jsx
import { data as sd } from "sharify"

const MyApp = () => {
  return (
    <div>{sd.MY_FEATURE === "new" ? <NewComponent /> : <OldComponent />}</div>
  )
}
```

### Add link to artist collections rail test!!!

```javascript
@track()
export class MyComponent extends React.Component<Props> {
  componentDidMount() {
    this.trackMyTest()
  }

  @track <
    Props >
    (props => {
      const experiment = "my_test"
      const variation = sd.MY_TEST

      return {
        action_type: Schema.ActionType.ExperimentViewed,
        experiment_id: experiment,
        experiment_name: experiment,
        variation_id: variation,
        variation_name: variation,
        nonInteraction: 1,
      }
    })
  trackMyTest() {
    // no-op
  }
}
```

#### In Force

When testing an app built in Reaction, you will only have access to SD data on the client. If you need this information on the server as well, you will need to pass it down from Force.

##### Via Stitch (usually in app routes)

```javascript
export async function index(req, res, next) {
  const { MY_TEST } = res.locals.sd
  const showMyTest = MY_TEST === "experiment"

  const layout = await stitch({
    basePath: res.app.get("views"),
    layout: layoutTemplate,
    config: { ... },
    blocks: { ... },
    locals: { ...res.locals },
    data: {
      showMyTest, // pass in a/b test as a prop
    },
  })
}
```

##### Via reaction app with React Router

Reaction apps using React Route, properties should be passed to the context object.

ADD LINK TO ARTIST PAGE

```javascript
// Server side: buildServerAppContext

app.get("/:slug", async (req, res, next) => {
    try {
      const user = req.user && req.user.toJSON()
      const { MY_TEST } = res.locals.sd
      const {
        ...
      } = await buildServerApp({
        routes,
        url: req.url,
        userAgent: req.header("User-Agent"),
        context: {
          ...buildServerAppContext(req, res),
          showMyTest: MY_TEST === "experiment"
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

```javascript
// Server side: buildClientApp
buildClientApp({
  routes,
  context: {
    myTest: sd.MY_TEST,
  },
}).then(({ ClientApp }) => {
  ReactDOM.hydrate(<ClientApp />, document.getElementById("react-root"))
})
```

##### Via Backbone and React Apps housed in Force (legacy)

```javascript
// On the client!
const splitTest = require("desktop/components/split_test/index.coffee")

splitTest("header_design").view()
```

### Manually access a test on the client-side (optional)

In some cases, especially when dealing with legacy Backbone apps, you may want to access variables from your test on the client. You can use the below methods to access an outcome without `sd`, or generate a css class based on your test outcome.

```javascript
const splitTest = require("desktop/components/split_test/index.coffee")

// Call the required fn with the key to your configuration
const test = splitTest("header_design")

// You can then call outcome (as many times as you like, you will get the same outcome for the same user)
test.outcome() // => 'new'

// Do something with your outcome
// Another useful method is `cssClass` which will output a class name for use in stylesheets
test.cssClass() // => 'is-splittest-header_design--new'
```

## Ensuring a test is correctly configured

For local and staging environments analytics events will be printed to the browser console. For production, you can use the developer tools and click the network tab, filter request by "segment", and verify that you see the "Experiment Viewed" and other associated analytics events. You can also check looker as stated below.

### Notes on QA:

1. Once a test is added to [`runningTests`](TKTKTK), cookies will be set for all users.
2. It is possible to enable a test without exposing new features to users with an admin only flags to keep the display internal.
3. However, because we do not want to infect our results tracking with data that is not part of the official test it is recommended you use a dummy name during qa and rename when the test is officially launched (i.e. `sd.MY_TEST_QA`)

### Forcing a test down a specific path (optional)

#### Via url params

Logged in Artsy admins can override the outcome of a particular split test by passing query params.

For forcing the test "my_test" to have the outcome "experiment":
`http://www.artsy.net?split_test[my_test]=experiment`

#### Client-side

```coffeescript
splitTest = require '../../../components/split_test/index.coffee'
test = splitTest 'header_design'
test.set 'old' # Force down 'old' path
```

#### Server-side

```coffeescript
SplitTest = require '../../components/split_test/server_split_test'
runningTests = require '../../components/split_test/running_tests'
testConfig = runningTests.header_design
test = new SplitTest req, res, testConfig
test.set 'old'
res.locals.sd[testConfig.key.toUpperCase()] = 'old' # manually set the Sharify variable
```

### Confirm tracking data is received

Tests should deliver data to Looker ~ 2 hours after going into production. To confirm that data is being received, look for the test's 'experiment_id' at:
https://artsy.looker.com/sql/cgkgxbnzmf26cw
