# Artwork Page

Welcome to the artwork page.

## Structure

The page has a single top level template: `templates/index.jade`. This includes the templates for every component on the page and contains *no logic*.

It's rendered in two parts, above the "fold" gets rendered completely on the server. The "fold" gets rendered on the client. Two individual metaphysics requests are fired for each.

Each component consists of a few files:

### `index.jade`

Component template. If there is data being accessed here that data should be defined in `query.coffee`, even if you know for a fact that data is being queried by some other component. This is not enforced. Please behave.

For sanity, break complex pieces of DOM structure up into sub-templates nested in a `templates` directory. The sub-templates should contain their own conditions for rendering, where resonable.

```jade
include ./foo
include ./bar

// ./foo.jade
if baz
  | My foo template

// ./bar.jade
unless baz
  | My bar template

// Should be favored over
if baz
  include ./foo
else
  include ./bar
```

### `index.styl`

Component stylesheet. Requires any of it's own component dependencies using Stylus' `require`. Must be required in the `stylesheets/index.styl`, in alphabetical order.

### `query.coffee`

Component query fragment. These are required in the `routes.coffee` file. If needed on the client, these are required in `client/index.coffee` as well. Should be a fragment on `Artwork`:

```coffeescript
module.exports = """
  fragment auction on Artwork {
    my_data
  }
"""
```

### `index.coffee`

Component JS initialization. Must be a single exported function. Typically starts off by selecting a top level `$el`, this can be a `Backbone.View` initialization in more complex instances. This must be required in the `client/index.coffee` file, in alphabetical order.

```coffeescript
module.exports = ->
  $el = $('.js-my-subcomponent')
  # ...
```

### `helpers.coffee`

Component template helpers. Must export a single object. Should only contain functions that are called in the templates. These are required in the `routes.coffee` file, namespaced by their component name, in alphabetical order. If needed on the client-side render they are also required in `client/index.coffee`, similarly. They are invoked like so: `= helpers.my_component.myHelperFunction()`.

```coffeescript
module.exports =
  capitalize: (string) ->
    string.charAt(0).toUpperCase() + string.slice(1)
```

### `bootstrap.coffee`

Selects out any data needed on the client that has previously been fetched on the server. Select only what's actually needed on the client-side. Export a single function, is invoked with the `sd`, and server `data` object. Is required in the `routes.coffee` file, in the `bootstrap` function, in alphabetical order.

```coffeescript
module.exports = (sd, { artwork }) ->
  sd.MY_COMPONENT =
    title: artwork.title
```
