# Marketing Signup Modal

A modal that pops up after 3 seconds when a logged out user from outside Artsy lands on the containing page.

![](https://cloud.githubusercontent.com/assets/1022172/20072470/8735dfe4-a4f6-11e6-9364-6e05c42bf304.jpg)

## Example

Add the view to your client-side code

````coffeescript
MarketingSignupModal = require '../components/marketing_signup_modal/index.coffee'

module.exports.init = ->
  new MarketingSignupModal
````
