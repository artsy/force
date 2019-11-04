# Centralizes configuration for currently running split tests
#
# eg.
# header_design:
#   key: 'header_design'
#   outcomes:
#     old: 8
#     new: 2
#
# Or, `outcomes` can be an array, when you specify `weighting: 'equal'.
#   weighting: 'equal'
#   outcomes: [
#     'old'
#     'new'
#   ]
#   edge: 'new'
#   dimension: 'dimension1' # Optional GA dimension
#   scope: 'local' # Optionally disable global initialization
#   control_group: 'old'  #Defaults to `control`, Reflection sees this.
#
# For equal weighting, add `weighting: 'equal'` and `outcomes` as an array.
#
# Note: if there are no running tests
# this should export empty Object
# module.exports = {}

module.exports = {
  homepage_collection_hub_entrypoints_test:
    key: "homepage_collection_hub_entrypoints_test"
    outcomes:
      control: 50
      experiment: 50
    edge: "experiment"
}
