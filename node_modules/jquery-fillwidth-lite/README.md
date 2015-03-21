# jquery-fillwidth-lite

Lines up a single row of images to fit their container. Like a simpler + dumber version of https://github.com/craigspaeth/jquery.fillwidth.

![](https://s3.amazonaws.com/f.cl.ly/items/2Y1u0n0H2h1y0I3n2I03/Image%202015-03-21%20at%206.44.38%20PM.png)

## Example

````javascript
jqueryFillwidthLite($, _, imagesLoaded)
$('#el').fillwidthLite()
````

With more options

````javascript
var jqueryFillwidthLite = require('jquery-fillwidth-lite');
jqueryFillwidthLite($, _, imagesLoaded)
$('#el').fillwidthLite({

  // What height you want to aim for the image to be
  targetHeight: 500,

  // By default this will just line the images up so they're
  // squeezed together. You may want to do something different like
  // add some margin in between them. This gives you a hook so you
  // can access the `img` object that looks something like this:
  // {
  //   $el: // The <img> DOM element
  //   width: // The width the $el should be
  //   height:  // The height the $el was calculated to be after fillwidth
  // }
  apply: function(img, i, gutterSize) {
    img.$el.width(img.width).css({ 'margin-right': '15px' })
  },

  // If you're going to add gaps via margin or padding in `apply` be
  // sure to specify how much per-image here.
  gutterSize: 15,

  // A callback for after the fillwidthing has finished
  done: function() {

  }
})
````

See example.html for a working example.

## TODOs

* Better docs
* Host example on gh-pages
* Tests
* Remove underscore and imagesloaded dependencies. Maybe jQuery eventually.
* Refactor to plain Javascript source

If you are at all interested in using this plugin please leave an issue bugging me about it and I will get on these right away.

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `make test`.

## License

MIT
