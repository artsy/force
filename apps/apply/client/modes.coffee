# Key of object maps to state's mode field
# slug: slug that appears in URL
# copy: map of copy for form fields
# values: map of values for form fields (sent to Salesforce)

module.exports =
  initial:
    slug: ''
    copy:
      type: 'Select Organization Type'
      company: 'Name'
      title: 'Title'
    values:
      type: 'Other'

  gallery:
    slug: 'gallery'
    copy:
      type: 'Gallery'
      company: 'Gallery Name'
      title: 'Title at gallery'
    values:
      type: 'Gallery'

  institution:
    slug: 'institution'
    copy:
      type: 'Institution'
      company: 'Museum / Institution Name'
      title: 'Title at org.'
    values:
      type: 'Museum/Institution'

  fair:
    slug: 'fair'
    copy:
      type: 'Fair'
      company: 'Fair Name'
      title: 'Title'
    values:
      type: 'Art Fair'

  general:
    slug: 'general'
    copy:
      type: 'Other'
      company: 'Name'
      title: 'Title'
    values:
      type: 'Other'
