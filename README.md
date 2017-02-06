Force
=====

[Force](https://github.com/artsy/force) is the Artsy website, [www.artsy.net](https://www.artsy.net).

Are you an Engineer? Don't know what Artsy is? Check out [this overview](https://github.com/artsy/meta/blob/master/meta/what_is_artsy.md) and [more](https://github.com/artsy/meta/blob/master/README.md).

Want to know more about Artsy tech? Read the [Artsy Engineering Blog](http://artsy.github.io).

Meta
----

* __State:__ production
* __Production:__ [https://www.artsy.net](https://www.artsy.net) | [Heroku](https://dashboard.heroku.com/apps/force-production/resources)
* __Staging:__ [https://staging.artsy.net](https://staging.artsy.net) | [Heroku](https://dashboard.heroku.com/apps/force-staging/resources)
* __Github:__ [https://github.com/artsy/force](https://github.com/artsy/force)
* __CI:__ [Semaphore](https://semaphoreci.com/artsy-it/force); merged PRs to artsy/force#master are automatically deployed to staging; merged PRs to artsy/force#release are automatically deployed to production. Make all PRs from feature branches to master to deploy them to staging. Create a PR from master to release to deploy a set of changes to production.
* __Point People:__ [@craigspaeth](https://github.com/craigspaeth), [@broskoski](https://github.com/broskoski), [@kanaabe](https://github.com/kanaabe), [@1aurabrown](https://github.com/1aurabrown), 

[![Build Status](https://semaphoreci.com/api/v1/artsy-it/force/branches/master/badge.svg)](https://semaphoreci.com/artsy-it/force)

History
-------

Force was [open-sourced in 2014](http://artsy.github.io/blog/2014/09/05/we-open-sourced-our-isomorphic-javascript-website) and was an early successful implementation of [an isomorphic JavaScript application, rendering both the server and client side](http://artsy.github.io/blog/2013/11/30/rendering-on-the-server-and-client-in-node-dot-js). It is developed in the open since August 2016.

Set-Up
------

See [CONTRIBUTING](CONTRIBUTING.md).

Docs
----

You can find more documentation in [this repository's /doc directory](/doc).

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

License
-------

Copyright (c) 2013-2017 Art.sy, Inc.

MIT License. See [LICENSE](LICENSE).
