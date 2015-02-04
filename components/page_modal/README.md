# Page Modal

```stylus
@import '../components/page_modal'
```

```coffeescript
attachPageModal = require '../page_modal/index.coffee'

# Accepts a selector and a routing table
attachPageModal '.js-attach-page-modal', {
  'artist/:id': 'close'
  'artwork/:id': 'modal'
}
```

`close` routes should be a pattern matching the originating page.

When any `selector` item is clicked; the `href` of the target is triggered as a pushState route.

These `href`s should map to `modal` routes. When triggered the page will be loaded inside of an iframe in the modal.
