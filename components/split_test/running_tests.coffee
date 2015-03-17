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
  redesigned_header:
    key: 'redesigned_header'
    dimension: 'dimension2'
    outcomes:
      old: 0.5
      new: 0.5
    edge: 'old'

  gallery_partnerships_apply:
    key: 'gallery_partnerships_apply'
    outcomes:
      inline: 0.5
      link: 0.5
    edge: 'inline'
