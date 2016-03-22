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

  commercial_filtering:
    key: 'commercial_filtering'
    edge: 'collect'
    outcomes:
      browse: 0.5
      collect: 0.5
    dimension: 'dimension10'

  masonry_artwork_sort:
    key: 'masonry_artwork_sort'
    edge: 'for_sale'
    outcomes:
      default: 0.5
      for_sale: 0.5
    dimension: 'dimension11'

  artwork_item_contact_gallery:
    key: 'artwork_item_contact_gallery'
    edge: 'contact'
    outcomes:
      default: 0.5
      contact: 0.5
    dimension: 'dimension12'
