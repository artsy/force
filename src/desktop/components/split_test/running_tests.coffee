# Centralizes configuration for currently running split tests
#
# USE: Append `?split_test[test_name]=experiment` query param in url.
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
#   control_group: 'old'  #Defaults to `control`
#
# For equal weighting, add `weighting: 'equal'` and `outcomes` as an array.
#
# Note: if there are no running tests
# this should export empty Object
# module.exports = {}

module.exports = {
  artist_grid_manual_curation_trial:
    key: 'artist_grid_manual_curation_trial'
    outcomes: [
      'control'
      'experiment'
    ]
    control_group: 'control'
    edge: 'experiment'
    weighting: 'equal'
    scope: 'local'
}
