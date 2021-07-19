module.exports =

  '''
  fragment partner on Partner  {
    id: internalID
    name
    initials
    locations(size:15) {
      city
    }
    profile {
      id: internalID
      href
      image {
        cropped(width:400, height:266, version: ["wide", "large", "featured", "larger"]) {
          url
        }
      }
    }
  }
  '''
