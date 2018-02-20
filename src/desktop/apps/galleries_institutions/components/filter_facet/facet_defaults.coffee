module.exports = (type) -> [{
    facetName: 'location'
    displayName: 'Locations'
  }, {
    facetName: 'category'
    displayName: 'Specialties'
  }, {
    facetName: 'term'
    displayName: switch type
                    when 'gallery' then 'Galleries'
                    when 'institution' then 'Institutions'
                    else ''
    search: true
  }]
