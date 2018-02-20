export const partnerQuery = (id) => {
  return `
    {
      partner(id: "${id}")
      {
        default_profile_id
        name
        type
        profile {
          id
          href
          image {
            cropped(width: 250 height: 165 version: "large_rectangle"){
              url
            }
          }
        }
      }
    }
  `
}

export const auctionQuery = (id) => {
  return `
    {
      sale(id: "${id}")
      {
        id
        name
        href
        cover_image {
          cropped(width: 250 height: 165 version: "large_rectangle"){
            url
          }
        }
      }
    }
  `
}
