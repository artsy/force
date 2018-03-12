{ compact } = require 'underscore'
{ slugify } = require 'underscore.string'

module.exports =
  filename: ({ artists, title, date }) ->
    slugify compact([
      artists.map(({ name }) -> name).join ', '
      title
      date
    ]).join ' '
