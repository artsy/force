module.exports =

  '''
  fragment partner on Partner  {
    id
    name
    initials
    locations(size:15) {
      city
    }
    profile {
      id
      href
      image {
        cropped(width:400, height:266, version: ["wide", "large", "featured", "larger"]) {
          url
        }
      }
    }
  }
  '''
