import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeaderImage_fair } from "v2/__generated__/FairHeaderImage_fair.graphql"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"

interface FairHeaderImageProps {
  fair: FairHeaderImage_fair
}

export const FairHeaderImage: React.FC<FairHeaderImageProps> = ({
  fair: { image },
}) => {
  if (image?.url) {
    return <FullBleedHeader src={image.url} />
  }

  return null
}

export const FairHeaderImageFragmentContainer = createFragmentContainer(
  FairHeaderImage,
  {
    fair: graphql`
      fragment FairHeaderImage_fair on Fair {
        image {
          url(version: "wide")
        }
      }
    `,
  }
)
