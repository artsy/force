# Force

[Force](https://github.com/artsy/force) is the Artsy website, [www.artsy.net](https://www.artsy.net).

Are you an Engineer? Don't know what Artsy is? Check out [this overview](https://github.com/artsy/README/blob/main/culture/what-is-artsy.md#readme) and [more](https://github.com/artsy/README/).

Want to know more about Artsy's tech? Read the [Artsy Engineering Blog](http://artsy.github.io).

## Meta

- **State:** production
- **Production:** [https://www.artsy.net](https://www.artsy.net) | [k8s](https://kubernetes.prd.artsy.systems/#/search?q=force&namespace=default)
- **Staging:** [https://staging.artsy.net](https://staging.artsy.net) | [k8s](https://kubernetes.stg.artsy.systems/#/search?q=force&namespace=default)
- **GitHub:** [https://github.com/artsy/force](https://github.com/artsy/force)
- **CI/Deploys:** [CircleCi](https://circleci.com/gh/artsy/force); merged PRs to `artsy/force#main` are automatically deployed to staging; PRs from `staging` to `release` are automatically deployed to production. [Start a deploy...](https://github.com/artsy/force/compare/release...staging?expand=1)
- **BrowserStack:** For testing applications cross-browser use [BrowserStack](https://browserstack.com). Credentials are located in 1Password.
- **Storybook:** [https://force-storybook.artsy.net](https://force-storybook.artsy.net)
- **Hacks:** [View code hacks here](./HACKS.md)
- **Point People:** [@damassi](https://github.com/damassi), [@dzucconi](https://github.com/dzucconi), [@mzikherman](https://github.com/mzikherman)

[![Build Status](https://circleci.com/gh/artsy/force.svg?style=svg)](https://circleci.com/gh/artsy/force)
[![codecov](https://codecov.io/gh/artsy/force/branch/main/graph/badge.svg)](https://codecov.io/gh/artsy/force)

## History

Force was [open-sourced in 2014](http://artsy.github.io/blog/2014/09/05/we-open-sourced-our-isomorphic-javascript-website) and was an early successful implementation of [an isomorphic JavaScript application, rendering both the server and client side](http://artsy.github.io/blog/2013/11/30/rendering-on-the-server-and-client-in-node-dot-js). It has been developed in the open since August 2016.

Since then it has evolved into what we regard as a fairly bullet-proof stack: [React](https://reactjs.org/), [Relay](https://relay.dev/) (a GraphQL client library), TypeScript, and our design system [Palette](https://palette.artsy.net/).

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

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fartsy%2Fforce.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fartsy%2Fforce?ref=badge_large)

## About Artsy

<a href="https://www.artsy.net/">
  <img align="left" src="https://avatars2.githubusercontent.com/u/546231?s=200&v=4"/>
</a>

This project is the work of engineers at [Artsy][footer_website], the world's
leading and largest online art marketplace and platform for discovering art.
One of our core [Engineering Principles][footer_principles] is being [Open
Source by Default][footer_open] which means we strive to share as many details
of our work as possible.

You can learn more about this work from [our blog][footer_blog] and by following
[@ArtsyOpenSource][footer_twitter] or explore our public data by checking out
[our API][footer_api]. If you're interested in a career at Artsy, read through
our [job postings][footer_jobs]!

[footer_website]: https://www.artsy.net/
[footer_principles]: https://github.com/artsy/README/blob/main/culture/engineering-principles.md
[footer_open]: https://github.com/artsy/README/blob/main/culture/engineering-principles.md#open-source-by-default
[footer_blog]: https://artsy.github.io/
[footer_twitter]: https://twitter.com/ArtsyOpenSource
[footer_api]: https://developers.artsy.net/
[footer_jobs]: https://www.artsy.net/jobs
