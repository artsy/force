module.exports = (id) ->
  """
  {
    partner(id: "#{id}")
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
  """