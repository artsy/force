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
  artist_insights:
    key: 'artist_insights'
    outcomes: [
      'v1'
      'v2'
    ]
    control_group: 'v1'
    edge: 'v2'
    weighting: 'equal'

  artist_collections_rail:
    key: 'artist_collections_rail'
    outcomes: [
      'control'
      'experiment'
    ]
    control_group: 'control'
    edge: 'experiment'
    weighting: 'equal'

  new_search_page:
    key: 'new_search_page'
    outcomes: [
      'control'
      'experiment'
    ]
    control_group: 'control'
    edge: 'experiment'
    weighting: 'equal'
}
