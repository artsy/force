# Marketing Signup Modal

Adds a marketing popover to certain pages.

![](https://cloud.githubusercontent.com/assets/1022172/20309384/bd42951c-ab15-11e6-97e7-dcc7fda5d1a3.jpg)

## Usage

This uses a config variable to determine where it's applied. The Marketing Signup Modal supports multiple campaigns using a hardcode stringified JSON object. Use `heroku config:set` to configure a campaign. e.g. Set `MARKETING_SIGNUP_MODALS='[{"slug":"miami","copy":"Sign up for early access","image":"http://placekitten.com/200/200"}, {"slug:":"art-fair","copy":"Get exclusive access","image":"http://placekitten.com/200/200"}]'` to allow the query param ?m-id=miami to be added to any page for a modal to appear.

Examples:

`MARKETING_SIGNUP_MODALS='[{"slug":"miami","copy":"Sign up for early access","image":"http://placekitten.com/200/200"}, {"slug:":"art-fair","copy":"Get exclusive access","image":"http://placekitten.com/200/200"}]'`

If this experiment results in a worthwhile amount of collector acquistion then eventually the idea is we will replace this config data with a tool we give Marketing to manage themselves.

## Implementation

This is implemented globally in our layout component by checking against the config variables added to sharify.
