Force
===

[Force](https://github.com/artsy/force) is the main desktop website for Artsy. For more information see [this blog post](http://artsy.github.io/blog/2014/09/05/we-open-sourced-our-isomorphic-javascript-website/) and [this blog post](http://artsy.github.io/blog/2013/11/30/rendering-on-the-server-and-client-in-node-dot-js/).

Meta
---

* __State:__ production
* __Production:__ [https://www.artsy.net/](https://www.artsy.net/) | [Heroku](https://dashboard.heroku.com/apps/force-production/resources)
* __Staging:__ [https://staging.artsy.net/](https://staging.artsy.net/) | [Heroku](https://dashboard.heroku.com/apps/force-staging/resources)
* __Github:__ [https://github.com/artsy/force/](https://github.com/artsy/force/)
* __CI:__ [Semaphore](https://semaphoreapp.com/artsy/force/); merged PRs to artsy/force#master are automatically deployed to staging; production is manually deployed from semaphore
* __Point People:__ [@craigspaeth](https://github.com/craigspaeth), [@broskoski](https://github.com/broskoski), [@kanaabe](https://github.com/kanaabe)

[![Build Status](https://semaphoreci.com/api/v1/projects/69ecb118-c998-4935-9752-14f1e9550053/531138/badge.svg)](https://semaphoreci.com/artsy-it/force--2)

Set-Up
---

- Install [NVM](https://github.com/creationix/nvm)
- Install Node 5
```sh
nvm install 5
nvm alias default 5
```
- Fork Force to your Github account in the Github UI.
- Clone your repo locally (substitute your Github username).

``` sh
# For Artsy Staff
git clone git@github.com:[my_name]/force.git && cd force

# For OSS participants
git clone git@github.com:artsy/force-public.git force && cd force

```
- Install node modules

```
npm install
```

- Create a `.env` file and paste in the sensitive configuration.
  * Artsy: You can find these keys in the Artsy Shared vault of One Password under "Force.env" or ask someone in #web Slack.
  * OSS: You can skip this step

- Start Force pointing to the staging [Gravity](https://github.com/artsy/gravity) API

```sh
# For Artsy Staff
make ss

# For OSS participants
make oss
```

- Force should now be running at [http://localhost:5000/](http://localhost:5000/)

Additional docs
---

You can find additional documentation about Force (deployments etc) in [this repository's /doc directory](/doc).

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

