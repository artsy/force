{ compact, flatten, pluck } = require 'underscore'
{ slugify } = require 'underscore.string'

module.exports =
  description: ({ title, date, name, artists, partner }) ->
    compact flatten [
      pluck artists, 'name'
      title
      date
      partner?.name
    ]
      .join ', '

  filename: ({ artists, title, date }) ->
    slugify compact([
      artists.map(({ name }) -> name).join ', '
      title
      date
    ]).join ' '
