# Centralizes configuration for currently running split tests
#
# eg.
# header_design:
#   key: 'header_design'
#   outcomes:
#     old: 8
#     new: 2
#   edge: 'new'
#   dimension: 'dimension1' # Optional GA dimension
#   scope: 'local' # Optionally disable global initialization
#
# Note: if there are no running tests
# this should export empty Object
# module.exports = {}

module.exports =

  purchase_flow:
    key: 'purchase_flow'
    edge: 'purchase'
    outcomes:
      default: 50
      purchase: 50

  new_artist_page_cta:
    key: 'new_artist_page_cta'
    outcomes:
      old_cta: 50
      new_cta: 50
