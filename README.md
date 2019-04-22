# Force

[Force](https://github.com/artsy/force) is the Artsy website, [www.artsy.net](https://www.artsy.net).

Are you an Engineer? Don't know what Artsy is? Check out [this overview](https://github.com/artsy/meta/blob/master/meta/what_is_artsy.md) and [more](https://github.com/artsy/meta/blob/master/README.md).

Want to know more about Artsy's tech? Read the [Artsy Engineering Blog](http://artsy.github.io).

## Meta

* **State:** production
* **Production:** [https://www.artsy.net](https://www.artsy.net) | [k8s](https://kubernetes.artsy.net/#!/search?q=force&namespace=default)
* **Staging:** [https://staging.artsy.net](https://staging.artsy.net) | [k8s](https://kubernetes-staging.artsy.net/#!/search?q=force&namespace=default)
* **GitHub:** [https://github.com/artsy/force](https://github.com/artsy/force)
* **CI/Deploys:** [CircleCi](https://circleci.com/gh/artsy/force); merged PRs to `artsy/force#master` are automatically deployed to staging; PRs from `staging` to `release` are automatically deployed to production. [Start a deploy...](https://github.com/artsy/force/compare/release...staging?expand=1)
* **BrowserStack:** For testing applications cross-browser use [BrowserStack](https://browserstack.com). Credentials are located in 1Password.
* **Point People:** [@damassi](https://github.com/damassi), [@mzikherman](https://github.com/mzikherman)

[![Build Status](https://circleci.com/gh/artsy/force.svg?style=svg)](https://circleci.com/gh/artsy/force)
[![codecov](https://codecov.io/gh/artsy/force/branch/master/graph/badge.svg)](https://codecov.io/gh/artsy/force)

## History

Force was [open-sourced in 2014](http://artsy.github.io/blog/2014/09/05/we-open-sourced-our-isomorphic-javascript-website) and was an early successful implementation of [an isomorphic JavaScript application, rendering both the server and client side](http://artsy.github.io/blog/2013/11/30/rendering-on-the-server-and-client-in-node-dot-js). It is developed in the open since August 2016.

## Set-Up

See [CONTRIBUTING](CONTRIBUTING.md).

```
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
```

## License

MIT License. See [LICENSE](LICENSE).
