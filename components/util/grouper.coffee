_ = require 'underscore'

# mimics the output of _.groupBy
# given an array of unsorted strings of various length, groups them
# such that each group has a concatenated length less than n and
# minimizes groups
module.exports.groupByConcatLength = (strArray, maxConcatStrLength) =>
  sorted = _.sortBy(strArray, (str) -> -str.length)
  groups = [{concatLength: 0, strings: []}]
  _.each(sorted, (str) ->
    # pick the group with the shortest concat length and put the
    # str into that group, updating its length, if it is short enough,
    # otherwise create a new group.
    minGroupLength = _.min(_.map(groups, (group) -> group.concatLength))
    minGroup = _.find(groups, (group) -> group.concatLength == minGroupLength)
    if minGroup.concatLength + str.length <= maxConcatStrLength
      minGroup.concatLength += str.length
      minGroup.strings.push(str)
    else
      groups.push({concatLength: str.length, strings: [str]})
  )
  _.object(_.map(groups, (group, i) -> [i + 1, group.strings]))
