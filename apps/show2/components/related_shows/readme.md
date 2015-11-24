# RelatedShowsView

This component is used to render a series of related shows as rows in the footer of show pages.

## Implementation

Include the stylesheet in your pages .styl file
````
@import './components/related_shows/index.styl'
````

Require in the backbone view and build the view by passing it a collection of shows and a title. You could then, for instance, append to your DOM and it will render.

````
RelatedShowsView = require '../components/related_shows/view.coffee'

relatedShowsView = new RelatedShowsView
  collection: relatedShows
  title: 'Current Shows in #{show.formatCity()}'

$('#related-shows').append relatedShowsView.$el
````

