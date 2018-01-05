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

  sections: sections = (artist, isAdmin) ->
    has: (section) ->
      switch section
        when 'biography'
          artist.blurb || artist.bio || artist.biography_blurb?.text != ""
        when 'exhibition_highlights'
          if isAdmin
            artist.exhibition_highlights? && artist.exhibition_highlights.length > 0
          else
            artist.exhibition_highlights? && artist.exhibition_highlights.length > 15
        when 'articles'
          artist.articles.length > 0
        else
          false

  build: (artist, isAdmin) ->
    tabs.filter (tab) ->
      sections artist, isAdmin
        .has tab

  name: (section) ->
    return "Exhibition History" if section is "exhibition_highlights"
    section.split '_'
      .join ' '
