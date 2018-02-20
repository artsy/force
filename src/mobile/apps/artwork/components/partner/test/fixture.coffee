{ fabricate } = require 'antigravity'

module.exports =
  partner = fabricate('partner',
    href: "/art-gallery"
    locations: [
      {
        city: 'New York'
        country: 'US'
      },
      {
        city: 'Miami'
        country: 'US'
      }
    ]
    name: "Mariane Ibrahim Gallery"
    profile: {
      bio: 'A very elaborate bio about a very prestigious gallery.'
      id: 'art-gallery'
    }
    type: "Gallery"
  )
