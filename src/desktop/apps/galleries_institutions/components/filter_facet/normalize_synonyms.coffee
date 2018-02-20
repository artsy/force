# Simplistic approach to providing synonym-matching, e.g. in typeahead queries.
#
# Usage:
#
# mySynonyms = [ ['saint', 'st'], ['harbor', 'harbour'] ]
# normalizeSynonyms(mySynonyms, 'st ives')
#  => returns 'saint ives'
# normalizeSynonyms(mySynonyms, 'bal harbour')
#  => returns 'bal harbor'

normalizeSynonymList = (synonymList, inputString) ->
  firstSynonym = synonymList[0]
  synonymList.reduce (str, synonym) ->
    regex = new RegExp '\\b' + synonym + '\\b', 'i'
    str.replace(regex, firstSynonym)
  , inputString

normalizeSynonyms = (allSynonyms, inputString) ->
  return inputString unless allSynonyms?
  return inputString if allSynonyms is []
  allSynonyms.reduce (str, synonymList) ->
    normalizeSynonymList(synonymList, str)
  , inputString

module.exports = normalizeSynonyms
