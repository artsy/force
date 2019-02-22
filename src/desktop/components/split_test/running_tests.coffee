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
  # Used for cookie-ing and gradual roll out.
  # We'll start at 1 and work our way up, users in groups
  # less than that number will receive the new artwork page.
  new_artwork_page:
    key: 'new_artwork_page',
    outcomes: [
      0
      1
      2
      3
      4
      5
      6
      7
      8
      9
    ]
    weighting: 'equal'
    edge: 0
    control_group: 9

  artist_insights:
    key: 'artist_insights'
    outcomes: [
      'v1'
      'v2'
    ]
    control_group: 'v1'
    edge: 'v2'
    weighting: 'equal'

  # editorial_collections_rail:
  #   key: 'editorial_collections_rail'
  #   outcomes: [
  #     0
  #     1
  #   ]
  #   control_group: 0
  #   edge: 1
  #   weighting: 'equal'
}
