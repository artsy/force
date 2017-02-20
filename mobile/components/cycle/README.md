# Cycle

Cycles through things. Takes care of styling + transitioning. Attaches `is-active` and `is-deactivating` classes to the elements as it cycles through them.

## Usage

```coffeescript
cycle = new Cycle
  $el: $('.js-stuff-cycle') # container of cycleable elements
  selector: '.thing' # selector of element to cycle through
  speed: 5000 # optional

# Start cycling
cycle.start()

# Stop cycling
cycle.stop()
```
