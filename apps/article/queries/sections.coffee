module.exports =
```
sections{
  ...on Image{
    type
    url
    caption
  }
  ...on Video{
    type
    url
    cover_image_url
    layout
    background_color
  }
  ...on Callout{
    type
    thumbnail_url
    text
    article
    hide_image
    top_stories
  }
  ...on Embed{
    type
    url
    height
    mobile_height
    layout
  }
  ...on Text{
    type
    body
  }
  ...on Toc{
    type
    links{
      ...on Link{
        name
        value
      }
    }
  }
  ...on Artworks{
    type
    ids
    layout
    artworks{
      type
      id
      slug
      date
      title
      image
      partner{
        name
        slug
      }
      artist{
        name
        slug
      }
    }
  }
  ...on Slideshow{
    type
    items{
      ...on Image{
        type
        url
        caption
      }
      ...on Video{
        type
        url
        cover_image_url
        layout
        background_color
      }
      ...on SimpleArtwork{
        id
        type
      }
    }
  }
  ...on ImageSet{
    type
    images{
      ...on Image{
        type
        url
        caption
    }
  ...on Artwork{
    type
    id
    slug
    date
    title
    image
    partner{
      name
      slug
    }
    artist{
      name
      slug
    }
  }
}
```