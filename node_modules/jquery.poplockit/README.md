[![build status](https://api.travis-ci.org/zamiang/jquery.poplockit.png)](http://travis-ci.org/zamiang/jquery.poplockit)

# jQuery.popLockIt

A jQuery plugin for 'locking' short content in place as the user
scrolls by longer content. For example, it will lock metadata and
share buttons in place as the user scrolls by a long essay or series
of images.

## Demos

* [Posts Feed on Artsy](http://artsy.net/posts)
* [Scrolling Adorable Kittens](http://zamiang.github.io/jquery.poplockit/example/index.html) from [Placekitten](http://placekitten.com/)

For documentation, usage and examples please see [http://zamiang.github.io/jquery.poplockit](http://zamiang.github.io/jquery.poplockit/).

Note how the kitten stays as you scroll through the body of the post
![https://raw.github.com/zamiang/jquery.poplockit/master/poplockit.gif](https://raw.github.com/zamiang/jquery.poplockit/master/poplockit.gif)


## Usage

Download the [minified version](https://raw.github.com/zamiang/jquery.poplockit/master/dist/poplockit.min.js) or the [development version](https://raw.github.com/zamiang/jquery.poplockit/master/dist/poplockit.js).

Include required Javascripts

```html
<script src="jquery.js"></script>
<script src="dist/poplockit.min.js"></script>
```

Create html like this

```html
  <div id="feed">
    <article>
      <div class="column">Left</div>
      <div class="column">Center</div>
      <div class="column">Right</div>
    </article>
    ...
  </div>
```

Apply the popLockIt plugin

```javascript
$('#feed').popLockIt({
  feedItems      : $('#feed > article'),
  columnSelector : '> .column'
});
```

## Contributing

Contributions and pull requests are very welcome. Please follow these guidelines when submitting new code.

### Modifying the code

1. Fork and clone the repo.
2. If needed: `npm install -g grunt` for [Grunt](https://github.com/gruntjs/grunt)
3. If needed: `brew install phantomjs` for [PhantomJS](http://phantomjs.org/download.html)
4. Run `npm install` to install dependencies
5. Run `grunt` (compiles coffeescripts and runs tests)
6. Run `grunt watch` while editing files to auto-compile coffeescripts and run tests
7. Make all changes in Coffeescript files, not JavaScript files.

### Submitting pull requests

1. Add tests for the change you want to make. Run `grunt jasmine` to see if tests fail.
2. Run `grunt` to compile new dist and make sure nothing is broken
3. Submit a Pull Request using GitHub.
