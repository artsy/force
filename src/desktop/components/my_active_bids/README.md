# My Active Bids

Small widget that indicates bids placed by the current user and if they're winning.

````coffeescript
MyActiveBids = require '../../components/my_active_bids/view.coffee'
view = new MyActiveBids
  user: user
  el: $('.home-active-bids')
  template: -> # Leave alone for default
view.start().then ->
````
