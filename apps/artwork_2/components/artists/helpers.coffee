{ groupBy } = require 'underscore'

module.exports =
  groupBy: groupBy

  tabs: tabs = [
    'biography'
    'exhibition_highlights'
    'articles'
  ]

  sections: sections = (artist) ->
    has: (section) ->
      switch section
        when 'biography'
          artist.biography?
        when 'exhibition_highlights'
          artist.exhibition_highlights.length > 0
        when 'articles'
          artist.articles.length > 0
        else
          false

  build: (artist) ->
    tabs.filter (tab) ->
      sections(artist).has(tab)

  name: (section) ->
    section.split('_').join ' '
