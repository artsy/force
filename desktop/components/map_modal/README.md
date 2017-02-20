# MapModalView

This component is used to render a pop-up modal with an interactive google map showing the location and text displaying the model's location and supporting details.

## Implementation

Include the stylesheet in your pages .styl file

````
@require '../components/map_modal'
````

Require in the components backbone view.

Anytime you need the view to appear, trigger an event and pass the model, latlng, template, location, and mapElement (as a string) to openMapModal.

````
openMapModal = require '../components/map_modal/index.coffee'

$('.map-modal-link').click ->
  openMapModal
    model: show
    latlng: show.location().get('coordinates')
    template: template
    location: show.location().getMapsLocation()
    mapElement: '.map-modal-show-map'

````
