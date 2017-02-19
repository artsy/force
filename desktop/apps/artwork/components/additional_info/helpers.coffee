module.exports =
  tabs: tabs = [
    'about_the_work'
    'exhibition_history'
    'bibliography'
    'provenance'
  ]

  sections: sections = (artwork) ->
    has: (section) ->
      switch section
        when 'about_the_work'
          artwork.articles.length or
          artwork.publisher? or
          artwork.signature? or
          artwork.description? or
          artwork.additional_information?
        when 'exhibition_history'
          artwork.exhibition_history?
        when 'bibliography'
          artwork.bibliography?
        when 'provenance'
          artwork.provenance?
        else
          false

  build: (artwork) ->
    tabs.filter (tab) ->
      sections artwork
        .has tab

  name: (section) ->
    section.split '_'
      .join ' '
