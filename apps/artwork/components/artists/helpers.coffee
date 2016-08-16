{ groupBy } = require 'underscore'
showHelpers = require '../../../../components/show_cell/helpers.coffee'

module.exports =
  groupBy: groupBy
  showHelpers: showHelpers

  tabs: tabs = [
    'biography',
    'exhibition_highlights',
    'articles'
  ]

  sections: sections = (artist) ->
    has: (section) ->
      switch section
        when 'biography'
          artist.biography?
        when 'exhibition_highlights'
          artist.exhibition_highlights? && artist.exhibition_highlights.length > 15
        when 'articles'
          artist.articles.length > 0
        else
          false

  build: (artist) ->
    tabs.filter (tab) ->
      sections artist
        .has tab

  name: (section) ->
    section.split '_'
      .join ' '
