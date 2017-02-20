{ groupBy, sortBy } = require 'underscore'
showHelpers = require '../../../../components/show_cell/helpers.coffee'

module.exports =
  groupBy: groupBy
  sortBy: sortBy
  showHelpers: showHelpers

  tabs: tabs = [
    'biography',
    'exhibition_highlights',
    'articles'
  ]

  sortExhibitions: (shows) ->
    sortBy(shows, 'start_at').reverse()

  sections: sections = (artist) ->
    has: (section) ->
      switch section
        when 'biography'
          artist.blurb || artist.bio || artist.biography_blurb?.text != ""
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
    return "Exhibition History" if section is "exhibition_highlights"
    section.split '_'
      .join ' '
