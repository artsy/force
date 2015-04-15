# RelatedShowsView

This component is used to render a series of related shows as rows in the footer of show pages. 

## Implementation

Include the stylesheet

assets/foo.styl
````
@import './components/related_shows/index.styl'
````

include the mixin template and pass in an array of show models and title to the mixin

````jade
include './components/related_shows/mixin.jade'

.current-shows
  +related-shows('Current Shows in New York', shows.models)
.other-shows
  +related-shows('Other Shows around the World', otherShows.models)
````