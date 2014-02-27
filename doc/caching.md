# Caching

The goal of caching is to reduce repetitive computation and shift data
access from bottlenecked stores (e.g., PostgreSQL) to simpler, more
easily distributed stores (e.g., Memcached or Redis)

## Caching at Artsy

The Artsy web product uses many levels of
caching. [Gravity](https://github.com/artsy/gravity) caches its API
responses using [Garner](https://github.com/artsy/garner) and
[mongoid-cached-json](https://github.com/dblock/mongoid-cached-json). As
of January 12 2014, these caches expire in 24 hours but are actively
invalidated. For example, if I fetch an artwork from the API it will
cache the artwork fetch to the database in Garner and cache it's JSON
representation using mongoid-cached-json. If we either deploy an
edited Artwork API endpoint definition or edit that artwork via the
API, these caches will be invalidated and the next fetch will get
updated information.

For more detail see:
- http://artsy.github.io/blog/2013/01/20/improving-performance-of-mongoid-cached-json/
- https://gist.github.com/fancyremarker/beb14f98450c4dfee334

## Caching in Force and Microgravity

Caching in these API consuming node-based apps is a very new
thing. Downstream cache is hard! Currently, we use Redis to cache API
get requests by overriding Backbone.sync with
[backbone-cache-sync](https://github.com/artsy/backbone-cache-sync). Since
we already cache the API endpoints in Gravity, backbone-cache-sync is
really only useful in special cases. Here are a few things to keep in
mind when deciding whether you should use caching in these apps:
- No active invalidation
- Expiration is customizeable but the default is 12 hours
- Our average API response time is around 100ms and median is 50ms
- Average Redis response time: ~5ms
- We use an API's url + params as it's key (do not cache a /me route!)

In production, the Microgravity Redis instance is a writeable slave of
the Force Redis instance. This means that cache additions and
invalidation in Force cascade to Microgravity. This eases cache
invalidation and increases our cache footprint.

### Things not to cache in Redis

- User specific information
- Information that our users or partners edit a lot (posts, partner shows, filter results)

## Examples of Caching in Force and Microgravity

If you are in doubt that something can be cached, don't cache it and
just fetch it on the client. I'll just take 100ms and everything will
be fine. Here are some examples of how and why we cache or don't cache
things in Force.

### Excellent uses of caching

- /browse, /partners, /institutions, /galleries

These pages work particularly well because the content is managed
entirely by the Artsy team and the pages require many, many synchronus
requests to render. When we added caching, we saw these pages drop
from taking upwards of 15 seconds to render to taking less than 50ms.

### Less good uses of caching that are still ok

On the artist page, we cache the artist fetch but not the fetch for
their artworks. This allows us to instantly render the artist name
and tabs -- giving the user something to look at while the artist
artworks come in. From a staleness perspective, caching the artist
fetch is fine because we manage the artist entities and can cope with
slightly out of date information. Our partners however, would not be
happy if their new important work by an artist failed to apper on the
artist's page for 12 hours.

# Managing the Force and Microgravity cache
## Redis Dashboard

- visit https://dashboard.heroku.com/apps/force-production/resources
- click 'openredis'
- https://openredis.com/instances/3848

## Redis-cli
- `brew install redis`
- visit the Redis Dashboard (see previous section)
- enter the command highlighted under 'From the command line, in your local environment': https://www.dropbox.com/s/q99gzgdvgh8bxc1/Screenshot%202014-01-06%2018.11.32.png
- Redis-cli Docs (some commands like `keys` do not work): http://redis.io/commands

## Clear entire cache

- Start the CLI
- `$ flushall`
- done!

## Remove a specific key

Keys are the url for the respective api endpoint

- Start the CLI
- `$ RANDOMKEY` to get a sample key
- '$ get "https://artsy.net/foo"` # will return `(nil)` if it finds nothing. `'[]'` is a cached endpoint with no results
- '$ del "https://artsy.net/foo"`
- done!

------

You can use the [`SCAN`](http://redis.io/commands/scan) command in combination with it's `MATCH` option to search for keys:

```
scan 0 count 1000 match *gene*
1) "3928"
2) 1) "https://artsy.net/api/v1/artist/w-eugene-smith"

scan 3928 count 1000 match *gene*
1) "32684"
2) 1) "https://artsy.net/api/v1/artists/trending?gene=Minimalism"
   2) "https://artsy.net/api/v1/genes{\"size\":100,\"published\":true,\"sort\":\"name\",\"page\":2}"
   3) "https://artsy.net/api/v1/artist/gene-davis"
   4) "https://artsy.net/api/v1/genes{\"size\":100,\"published\":true,\"sort\":\"name\",\"page\":9}"
   5) "https://artsy.net/api/v1/artist/eugene-printz"
   6) "https://artsy.net/api/v1/artist/eugene-rousseau"

scan 32684 count 1000 match *gene*
...
```

`SCAN` returns 1) an updated cursor position and 2) the set of keys found during that iteration. When the cursor returns 0, you've iterated through the full keyspace.

------

Here are some keys that are in use for the current 'browse' and the about/job pages, which are nice to know how to clear on demand:

- `$ del "https://artsy.net/api/v1/page/about"`
- `$ del https://artsy.net/api/v1/set/51ba3bcb0abd8521b3000022/items{\"display_on_desktop\":true,\"page\":1,\"size\":20}" # Featured Genes (browse)`
- `$ del https://artsy.net/api/v1/set/51b8bfb99f2aab4c1d000001/items{\"display_on_desktop\":true,\"page\":1,\"size\":20}" # Popular Categories (browse)`
- `$ del https://artsy.net/api/v1/set/51ba3bcb0abd8521b3000021/items{\"display_on_desktop\":true,\"page\":1,\"size\":20}" # Gene Categories (browse)`

Note that query params are included in the cache key.
