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
#   control_group: 'old' #Defaults to `control`
#
# Note: if there are no running tests
# this should export empty Object
# module.exports = {}

module.exports = {
  artist_page_variants:
    key: 'artist_page_variants'
    outcomes:
      control: 25
      no_info: 25
      no_header: 25
      no_info_header: 25
    control_group: 'control'
    edge: 'no_info_header'
}
