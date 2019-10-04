# Acceptance Tests

Force's acceptance test use [Nightmare](https://github.com/segmentio/nightmare) to simulate a browser by running [Chromium](https://www.chromium.org/Home) through [Electron](https://electron.atom.io/). Use `yarn acceptance` to run.

These tests start a set of vanilla Express apps to mock the behavior of dependent APIs such as Gravity and Metaphysics. You will have to write your own code per test suite to mock the API behavior, which can be helped with the use of fixtures and recording (see below).

A typical acceptance test will involve setting up these fake servers, running a nightmare instance to browse the website, and asserting the contents of the page using [Nightmare APIs](https://github.com/segmentio/nightmare#extract-from-the-page) or a small helper `$ = await browser.page('.selector')` to provide a convenient jQuery-like interface to the page's contents.

```javascript
/* eslint-env mocha */
import { setup, teardown } from './helpers'

describe('', () => {
  let gravity, browser

  before(async () => {
    ({ gravity, browser } = await setup())
    gravity.get('/api/v1/page/:id', (req, res) => {
      res.send(require('./fixtures/gravity/page'))
    })
  })

  after(teardown)

  describe('/terms', () => {
    it('renders a markdown page of terms and conditions', async () => {
      const $ = await browser.page('/terms')
      $('body').html().should.containEql('These Terms of Use')
    })
  })
```

## Fixtures

_**Note:** The description below appears to be obsolete. See [this thread](https://artsy.slack.com/archives/C2TQ4PT8R/p1570211335035500) in the meantime for a workaround for capturing fixtures._

We use fixtures to mock downstream API's JSON responses. These JSON fixtures can be found in the test/acceptance/fixtures folders. You can make these yourself, or more conveniently, you might want to try recording the JSON responses from a given page using [Nock's recording functionality](https://github.com/node-nock/nock#recording). To do so...

1. Run `yarn acceptance-record <namespace>` replacing `<namespace>` with a namespace for your fixture files, e.g. `yarn acceptance-record auction`
2. Visit a page you would like to record the API calls from, e.g. [localhost:5000/auction/phillips-photographs](http://localhost:5000/auction/phillips-photographs)
3. Wait for the page to load and API calls to finish

Notice some new JSON files written in the test/acceptance/fixtures folders that you can then use in your acceptance tests. In your terminal there will be logs of which files correspond to which API requests for your convenience.

```
$ Writing recordings...
$ gravity/auction.json: GET stagingapi.artsy.net/api/v1/auction/phillips...
```

```javascript
before(async () => {
  ;({ gravity, browser } = await setup())
  gravity.get("/api/v1/page/:id", (req, res) => {
    res.send(require("./fixtures/gravity/auction.json"))
  })
})
```

**Note:** These fixtures are intended to be a convenient starting point and not an end-all solution. It's encouraged that you modify, create, or delete the fixtures as you see fit for each test to take control of test behavior.
