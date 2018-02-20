# MapModalView

This component is used to render a pop-up modal with an interactive google map showing the location of the Gallery and text displaying the show's location and its hours.

## Implementation

Include the stylesheet in your pages .styl file

````
@require '../components/map_modal'
````

Require in the components backbone view.

Anytime you need the view to appear, trigger an event and construct the MapModal view, passing it a show as the model and a width of 820px.

````
MapModal = require '../components/map_modal/view.coffee'

$('.map-modal-link').click -> new MapModal model: show, width: 820px

````
