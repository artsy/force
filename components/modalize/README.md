# Modalize

Creates modal views out of normal views

## Usage

```coffeescript
modalize = require '../../components/modalize/index.coffee'

view = new YourView

modal = modalize view

modal.open()
# You have a modal

modal.close ->
  # You no longer have a modal

```

## Advanced Usage

``` coffeescript
things = new Things
view = new ThingsView collection: things

modal = modalize view,
  className: 'modalize things-modal'
  dimensions:
    width: '500px'

modal.load (done) ->
  # `load` will put up a spinner and hide the modal
  # until `done` is called in the callback
  things.fetch().then done

```
