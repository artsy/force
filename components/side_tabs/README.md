# Side Tabs

Provides mixins that create a side tab and sets up click events. Requires a helper in the app where it's used to determine which tabs should be displayed.cd

## Example of helper

```coffeescript
module.exports =
  tabs: tabs = [
    'foo'
    'bar'
  ]
  sections: sections = (artwork) ->
    has: (section) ->
      switch section
        when 'foo'
          artwork.foo? or
          artwork.whatever?
        when 'bar'
          artwork.bar?
        else
          false
  build: (artwork) ->
    tabs.filter (tab) ->
      sections artwork
        .has tab
  name: (section) ->
    section.split '_'
      .join ' '
```

## Usage in template

```
include ../../../../components/side_tabs/mixins

var tabs = helpers.your_component.build(artwork) // => ['foo', 'bar']

if tabs.length
  .side-tabs( class='js-artwork-tabs' )
    +nav(tabs, helpers.your_component.name)

      .artwork-tabs__content
        for tab, i in tabs
          +tab(tab, i)
            case tab
              when 'foo'
                include ./templates/foo
              when 'bar'
                include ./templates/bar
```
