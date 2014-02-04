# A Browserify Transform for Jade

**Jadeify** lets you use [Jade][] templates with [browserify][] in the simplest way possible:

```js
var template = require("./template.jade");

document.getElementById("my-thing").innerHTML = template({
    localVar: "value",
    anotherOne: "another value"
});
```

## Setup

When creating your browserify bundle, just add this line:

```js
bundle.transform(require("jadeify"));
```

or if you are a command line cowboy, something along the lines of

```js
browserify -t jadeify entry.js -o bundle.js
```

Note that this project peer-depends on Jade and each template will do `require("jade/runtime")`, so everything will just
work: there's no need to add any Jade-related stuff to your bundle manually.

So yeah, now `require`ing any `.jade` files will give you back a template function. Have fun!

[Jade]: http://jade-lang.com/
[browserify]: https://github.com/substack/node-browserify
