# ArtworkTableView

This component contains two views ArtworkTableView and ArtworkRowView. ArtworkTableView handles initializing and appending ArtworkRow's. ArtworkRowView extends SaleArtworkView and handles the interaction for the artwork.

## Implementation

Include the stylesheet

assets/foo.styl
````
@import '../components/artwork_table/stylesheets'
````

Pass a collection of artworks to a new ArtworkTableView
````coffeescript
ArtworkTableView = require '../components/artwork_table/view.coffee'

@artworks = new Artworks
view = new ArtworkTableView
    el: $('body')
    collection: @artworks
````