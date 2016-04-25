{ groupBy } = require 'underscore'

module.exports =
  groupBy: groupBy

  tabs: tabs = [
    'biography'
  ]

  sections: sections = (artist) ->
    has: (section) ->
      switch section
        when 'biography'
          artist.biography?
        else
          false

  build: (artist) ->
    tabs.filter (tab) ->
      sections artist
        .has tab

  name: (section) ->
    section.split '_'
      .join ' '
