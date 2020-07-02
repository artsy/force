export const partnerQuery = id => {
  return `
    {
      partner(id: "${id}")
      {
        default_profile_id: defaultProfileID
        name
        type
        profile {
          id: internalID
          href
          image {
            cropped(width: 250, height: 165, version: "large_rectangle"){
              url
            }
          }
        }
      }
    }
  `
}

export const auctionQuery = id => {
  return `
    {
      sale(id: "${id}")
      {
        id: internalID
        name
        href
        cover_image: coverImage {
          cropped(width: 250 height: 165 version: "large_rectangle"){
            url
          }
        }
      }
    }
  `
}
