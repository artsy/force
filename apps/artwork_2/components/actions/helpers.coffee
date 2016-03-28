{ compact, flatten, pluck } = require 'underscore'

module.exports =
  description: ({ title, date, name, artists, partner }) ->
    compact flatten [
      pluck artists, 'name'
      title
      date
      partner?.name
    ]
      .join ', '
