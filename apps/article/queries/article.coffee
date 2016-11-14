module.exports =
  """
  {
    articles(id:"582352a4e606a7001162aff9" ){
      slug
      author{
        name
        id
      }
      tags
      title
      published
      lead_paragraph
      hero_section{
        ...on Video{
          type
          url
          cover_image_url
          layout
          background_color
        }
        ...on Image{
          type
          url
          caption
        }
      }
      contributing_authors{
        ...on ContributingAuthor{
          id
          name
        }
      }
      super_article{
        partner_link
        partner_logo
        partner_logo_link
        partner_link_title
        secondary_logo_text
        secondary_logo_link
        secondary_partner_logo
        footer_blurb
        related_articles
      }
      #{require './sections.coffee'}
    }
  """