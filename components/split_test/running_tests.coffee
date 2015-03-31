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
  gallery_partnerships_apply:
    key: 'gallery_partnerships_apply'
    outcomes:
      inline: 0.5
      link: 0.5
    edge: 'inline'

  artist_cta:
    key: 'artist_cta'
    outcomes:
      zig_zag: 1/4
      footer_modal_link: 1/4
      footer_modal_inline: 1/4
      control: 1/4
    dimension: 'dimension4'
    scope: 'local'
