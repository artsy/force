import { RouterState, withRouter } from "found"
import React from "react"
import { ArtworkFilter_viewer } from "v2/__generated__/ArtworkFilter_viewer.graphql"
import { ZeroState } from "v2/Apps/Search/Components/ZeroState"
import { ArtworkFilter } from "v2/Components/ArtworkFilter"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"

interface SearchResultsRouteProps extends RouterState {
  viewer: ArtworkFilter_viewer
}

export const SearchResultsArtworksRoute = withRouter((props => {
  return (
    <ArtworkFilter
      mt={[0, "-1px"]}
      viewer={props.viewer}
      filters={props.match.location.query}
      onChange={updateUrl}
      ZeroState={ZeroState}
    />
  )
}) as React.FC<SearchResultsRouteProps>)
