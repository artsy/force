# Buyer's Premium

Given a "Sale" that `is_auction` this will fetch the buyer's premium markdown page and return some html to render it. Used in the artwork page modal and a standalone page for Martsy/Eidelon/iPad Eigen.

Include the stylesheet

assets/foo.styl
````
@require '../components/buyers_premium'
````

Use the helper
````coffeescript
buyersPremium = require '../components/buyers_premium/index.coffee'

buyersPremium auction, (err, html) ->
  # res.render 'view', bphtml: html
  # or
  # $('.el').html html
````