import React from "react"

import { FollowProps } from "../../Types"
import { GeneSearchResults } from "./GeneSearchResults"
import { SuggestedGenes } from "./SuggestedGenes"

export interface Props extends FollowProps {
  searchQuery: string
}

export default class GeneList extends React.Component<Props, any> {
  render() {
    if (this.props.searchQuery.length > 0) {
      return (
        <GeneSearchResults
          term={this.props.searchQuery}
          updateFollowCount={this.props.updateFollowCount}
        />
      )
    }
    return <SuggestedGenes updateFollowCount={this.props.updateFollowCount} />
  }
}
