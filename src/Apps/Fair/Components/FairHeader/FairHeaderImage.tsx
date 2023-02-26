import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeaderImage_fair$data } from "__generated__/FairHeaderImage_fair.graphql"
import { FullBleedHeader } from "Components/FullBleedHeader/FullBleedHeader"

interface FairHeaderImageProps {
  fair: FairHeaderImage_fair$data
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
