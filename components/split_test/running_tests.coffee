# Centralizes configuration for currently running split tests
#
# eg.
# header_design:
#   key: 'header_design'
#   outcomes:
#     old: 0.8
#     new: 0.2
#   edge: 'new'
#
# Note: if there are no running tests
# this should export empty Object
# module.exports = {}

module.exports =
  gallery_partnerships_apply:
    key: 'gallery_partnerships_apply'
    outcomes:
      inline: 0.5
      link: 0.5
    edge: 'inline'

  artist_works_view_mode:
    key: 'artist_works_view_mode'
    dimension: 'dimension3'
    outcomes:
      list: 0.5
      grid: 0.5
    edge: 'list'
