# My Active Bids

Small widget that indicates bids placed by the current user and if they're winning.

## Polling View

The easiest way is to just render client-side and drop in this view which will poll for updates to keep things fresh.

````coffeescript
MyActiveBids = require '../../components/my_active_bids/view.coffee'
view = new MyActiveBids
  user: user
  el: $('.home-active-bids')
  template: -> # Leave alone for default
view.start().then ->
````
