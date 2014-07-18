# Artsy Error Handler

Error handling routes for use in Artsy's web apps. Very specific to Artsy's [Ezel](http://ezeljs.com) apps so not very useful the general public. But hey, _open source by default_!

## Example

````coffeescript
require('artsy-error-handler') app,
    template: resolve(__dirname, '../components/layout/error.jade')
````