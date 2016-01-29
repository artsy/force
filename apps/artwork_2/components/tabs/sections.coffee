module.exports =
  description:
    name: 'Description'
    predicate: (artwork) ->
      artwork.description? or
      artwork.additional_information? or
      artwork.signature? or
      artwork.series? or
      artwork.publisher?

  exhibition_history:
    name: 'Exhibition History'
    predicate: ({ exhibition_history }) ->
      exhibition_history?

  bibliography:
    name: 'Bibliography'
    predicate: ({ bibliography }) ->
      bibliography?

  provenance:
    name: 'Provenance'
    predicate: ({ provenance }) ->
      provenance?

  additional_info:
    name: 'Additional Info'
    predicate: ({ is_comparable_with_auction_results }) ->
      is_comparable_with_auction_results
