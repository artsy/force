# Typeahead

`components/typeahead/view.coffee` wraps up configuration and event binding for [Twitter's typeahead.js](https://github.com/twitter/typeahead.js/blob/v0.10.5/doc/jquery_typeahead.md). (Do note that we're locked into the 0.10.x version until this issue is resolved https://github.com/twitter/typeahead.js/issues/743#issuecomment-142104685)

---

## Usage

### Autocomplete using Gravity artists:

```coffeescript
TypeaheadView = require '../../components/typeahead/view.coffee'

@typeahead = new TypeaheadView
  kind: 'artists'
  autofocus: true

@$('.js-typeahead').html @typeahead.render().$el

@listenTo @typeahead, 'selected', (suggestion) ->
  # Do something with the Suggestion model

```

### Autocomplete using an alternate API:

```coffeescript
TypeaheadView = require '../../components/typeahead/view.coffee'

@typeahead = new TypeaheadView
  # Specify a `url` instead of of `kind` (which configures the default Gravity /match endpoint)
  url: "#{NON_DEFAULT_ENDPOINT}/galleries"
  # Specify a named query parameter that will get populated with the value from the input
  param: 'term'
  # Specify a path to walk down to get the array of results
  path: '_embedded.galleries'

@$('.js-typeahead').html @typeahead.render().$el

@listenTo @typeahead, 'selected', (suggestion) ->
  # Do something with the Suggestion model
```

---

## Options (w/ default values)

```coffeescript
# Autofocus input
autofocus: false

# Autoselect first result
autoselect: true # Always `false` on touch devices

# Whether or not the typed text should be bolded on the results drop down
highlight: false

# Display the top results remaining text when typing in the input
hint: true

# String passed to the input placeholder
placeholder: 'Search'

# Attribute used to pull the display value
# out of the result objects
nameAttr: 'name'

# Name of paramter used to query whatever API is specified with the input value
param: 'term'

# URL of the of the endpoint (if left unspecified will default to Gravity's /match API)
url: null

# Configure the match endpoint to by typed: 'artworks', 'artists', 'fairs', or 'genes'
kind: null

# List of IDs that get excluded from the suggestions result set
# (Gets automatically populated as results are selected)
selected: []
```

---

## Events

```coffeescript
'selected': (suggestion) -> # Triggered when a suggestion is selected. Passes the suggestion.
'asyncrequest': -> # Triggered when an AJAX request is started
'asyncreceive': -> # Triggered when an AJAX request is completed
```
