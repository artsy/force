import React from "react"

import { FollowProps } from "../../Types"
import { ArtistSearchResults } from "./ArtistSearchResults"
import { PopularArtists } from "./PopularArtists"

interface Props extends FollowProps {
  searchQuery: string
}

export default class ArtistList extends React.Component<Props, null> {
  render() {
    if (this.props.searchQuery.length > 0) {
      return (
        <ArtistSearchResults
          term={this.props.searchQuery}
          updateFollowCount={this.props.updateFollowCount}
        />
      )
    }
    return <PopularArtists updateFollowCount={this.props.updateFollowCount} />
  }
}
