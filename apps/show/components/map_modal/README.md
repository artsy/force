# MapModalView

This component is used to render a pop-up modal with an interactive google map showing the location of the Gallery and text displaying the show's location and its hours. 

## Implementation

Include the stylesheet in your pages .styl file

````
@import '../components/map_modal'
````

Require in the components backbone view. 

Build the view by passing in a show as the model for the view and append the element to anywhere you want the 'Map & Full Hours' link to appear.

````
MapModal = require '../components/map_modal/view.coffee'

mapModal = new MapModal
    model: show

$('.show-header-cell').append mapModal.$el
````
