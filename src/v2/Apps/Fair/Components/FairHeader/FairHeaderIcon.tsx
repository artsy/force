import React from "react"
import { Box, BoxProps } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeaderIcon_fair } from "v2/__generated__/FairHeaderIcon_fair.graphql"

interface FairHeaderIconProps extends BoxProps {
  fair: FairHeaderIcon_fair
}

export const FairHeaderIcon: React.FC<FairHeaderIconProps> = ({
  fair: { name, profile },
  ...rest
}) => {
  if (!profile?.icon) return null

  const { icon } = profile

  return (
    <Box {...rest}>
      <img
        src={icon.cropped.src}
        srcSet={icon.cropped.srcSet}
        alt={`Logo of ${name}`}
        width={100}
        height={100}
      />
    </Box>
  )
}

export const FairHeaderIconFragmentContainer = createFragmentContainer(
  FairHeaderIcon,
  {
    fair: graphql`
      fragment FairHeaderIcon_fair on Fair {
        name
        profile {
          icon {
            cropped(width: 100, height: 100, version: "square140") {
              src
              srcSet
            }
          }
        }
      }
    `,
  }
)
