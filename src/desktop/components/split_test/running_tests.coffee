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
  collection_hubs:
    key: "collection_hubs"
    outcomes:
      control: 100
      experiment: 0
    edge: 'experiment'

  inquiry_auth_v2:
    key: 'inquiry_auth_v2'
    outcomes: [
      'control'
      'experiment'
    ]
    control_group: 'control'
    edge: 'experiment'
    weighting: 'equal'
}
