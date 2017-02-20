request = require 'superagent'
{ reject } = require 'underscore'

module.exports =

  topParselyArticles: (section, articleSlug, key, secret, cb) ->
    request
      .get("https://api.parsely.com/v2/analytics/section/#{section}/detail")
      .query
        apikey: key
        secret: secret
        limit: 10
        days: 7
        sort: '_hits'
      .end (err, response) =>
        return cb [] if err
        posts = response.body.data
        if articleSlug
          posts = reject posts, (post) => post.url.indexOf(articleSlug) > 0
        return cb posts
