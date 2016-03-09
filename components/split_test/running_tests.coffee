# Centralizes configuration for currently running split tests
#
# eg.
# header_design:
#   key: 'header_design'
#   outcomes:
#     old: 0.8
#     new: 0.2
#   edge: 'new'
#   dimension: 'dimension1' # Optional GA dimension
#   scope: 'local' # Optionally disable global initialization
#
# Note: if there are no running tests
# this should export empty Object
# module.exports = {}

module.exports =

  partner_application_copy:
    key: 'partner_application_copy'
    outcomes:
      join: 0.5
      apply: 0.5

  artist_works_infinite_scroll:
    key: 'artist_works_infinite_scroll'
    outcomes:
      infinite: 0.5
      finite: 0.5
    dimension: 'dimension9'

  commercial_filtering:
    key: 'commercial_filtering'
    edge: 'collect'
    outcomes:
      browse: 0.5
      collect: 0.5
    dimension: 'dimension10'
