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
#   control_group: 'old' #Defaults to `control`, Reflection sees this.
#
# For equal weighting, add `weighting: 'equal'` and `outcomes` as an array.
#
# Note: if there are no running tests
# this should export empty Object
# module.exports = {}

module.exports = {
  artist_page_variants:
    key: 'artist_page_variants'
    outcomes: [
      'control'
      'no_info'
      'no_header'
      'no_info_header'
    ]
    control_group: 'control'
    edge: 'no_info_header'
    weighting: 'equal'
  merch_sort_test:
    key: 'merch_sort_test'
    outcomes:
      control: 50
      experiment: 50
    control_group: 'control'
    edge: 'experiment'
}
