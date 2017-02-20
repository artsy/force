# Results List

Pairs a Typeahead component with an results list.

## Usage

```coffeescript
TypeaheadView = require '../../components/typeahead/view.coffee'
ResultsListView = require '../../components/results_list/view.coffee'

# Pass it a typehead (required)
@resultsList = new ResultsListView
  typeahead: new TypeaheadView kind: 'artists'

# Listen to collection events
@listenTo @resultsList, 'add', (suggestion) ->
  # Do something with suggestion
@listenTo @resultsList, 'remove', (suggestion) ->
  # Do something with suggestion

# Render any pre-existing results while simultaneously excluding them from the typeahead dropdown
@listenTo @yourCollection, 'sync', ->
  @resultsList.reset @yourCollection
```
