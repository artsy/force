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
  merch_sort_test:
    key: 'merch_sort_test'
    outcomes:
      control: 50
      experiment: 50
    control_group: 'control'
    edge: 'experiment'
}
