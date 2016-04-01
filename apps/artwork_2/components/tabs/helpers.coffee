module.exports =
  tabs: tabs = [
    'description'
    'exhibition_history'
    'bibliography'
    'provenance'
  ]

  sections: sections = (artwork) ->
    has: (section) ->
      switch section
        when 'description'
          artwork.series? or
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
