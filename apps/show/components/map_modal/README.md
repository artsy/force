# MapModalView

This component is used to render a pop-up modal with an interactive google map showing the location of the Gallery and text displaying its location and its hours.  

## Implementation

Require in the backbone view. 

On any element that you'd like to use to cause the modal to appear when clicked set a 'click' that will generate a new mapModalView and pass in the show whose information you would like to appear in the modal.

````
MapModalView = require '../components/map_modal/view.coffee'

... 

events:
  'click .circle-icon-button-share': 'openShare'

openShare: (e) ->
  e.preventDefault()
  new MapModalView
    model: currentShow

````

