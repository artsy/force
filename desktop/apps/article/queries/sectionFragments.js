export const sectionFragments = `
  fragment Image on Image {
    url
    caption
    type
    width
    height
  }

  fragment Video on Video {
    caption
    type
    url
    cover_image_url
    layout
    background_color
  }

  fragment Artwork on Artwork {
    type
    id
    slug
    image
    title
    date
    partner {
      name
      slug
    }
    artists {
      name
      slug
    }
    artist {
      name
      slug
    }
    width
    height
  }
`
