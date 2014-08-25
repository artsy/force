# Force: The Artsy.net frontend

This is the public repository for [artsy.net's](https://artsy.net) frontend application. This application renders the html and provides rich interaction for artsy.net

 'Isomorphic' web apps are a very new thing. At Artsy, we would love to share our working version of one with the community. This repo is an example of a large application using the [Ezel](https://github.com/artsy/ezel) boilerplate. Ezel projects share code server/client and render server/client. They grow by breaking up the application into modular [apps](https://github.com/artsy/force-public/tree/master/apps) and reusable [components](https://github.com/artsy/force-public/tree/master/components).

Please see the [doc folder](https://github.com/artsy/force-public/tree/master/doc) for help.

## About Ezel

Ezel makes it easy to write and maintain Backbone apps that run in the browser and on the server using [Node.js](http://nodejs.org/). Built on popular libraries like [Express](http://expressjs.com/), [Backbone](http://backbonejs.org/), and [Browserify](http://browserify.org/), Ezel isn't a framework or library of its own, but rather a boilerplate of libraries and patterns that can be leveraged or abandoned as needed.

Ezel has three main philosophies...

### Modularity

Instead of managing growing complexity in projects by imposing rigid monolithic structure, Ezel encourages breaking your project up into smaller pieces that are easy to maintain and refactor independently.

### Flexiblity

Don't get locked into choosing between single page app or fully server-side rendered pages. Ezel's modular structure and shared server/client code makes it easy to decide what patterns and tools are best on a case by case basis.

### Run on Both Sides

Ezel [shares javascript modules that run in the browser and on the server](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/). This means you can [optimize initial page load](https://blog.twitter.com/2012/improving-performance-twittercom) and SEO by sharing templates that can render on the server or client. This also makes it easy to test all of your code in Node.js using [benv](http://github.com/artsy/benv) and [zombie](http://zombie.labnotes.org/) for robust, fast, and easy to set up tests.

## NOTE: This app is not runnable. 

Due to image licensing issues we cannot open up the artsy.net API. We are actively working on this. In the meantime, we are putting this up as an example of how we write code and structure our applications at Artsy. We would love any feedback!

If you have any questions please feel free to hit us up on twitter: [@craigspaeth](https://twitter.com/craigspaeth), [@dzucconi](https://twitter.com/dzucconi) and [@zamiang](https://twitter.com/zamiang)

### License

MIT License, see [LICENSE](LICENSE.md) for details.

````
                  ._,.
            ."..-..pf
            -L   ..#'
          .+_L  ."]#
          ,'j' .+.j`                 -'.__..,.,p.
         _~ #..<..0.                 .J-.``..._f.
        .7..#_.. _f.                .....-..,`4'
        ;` ,#j.  T'      ..         ..J....,'.j`
       .` .."^.,-0.,,,,yMMMMM,.    ,-.J...+`.j@
      .'.`...' .yMMMMM0M@^=`""g.. .'..J..".'.jH
      j' .'1`  q'^)@@#"^".`"='BNg_...,]_)'...0-
     .T ...I. j"    .'..+,_.'3#MMM0MggCBf....F.
     j/.+'.{..+       `^~'-^~~""""'"""?'"``'1`
     .... .y.}                  `.._-:`_...jf
     g-.  .Lg'                 ..,..'-....,'.
    .'.   .Y^                  .....',].._f
    ......-f.                 .-,,.,.-:--&`
                              .`...'..`_J`
                              .~......'#'  May the Force be with you.
                              '..,,.,_]`
                              .L..`..``.
````
