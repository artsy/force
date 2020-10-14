import React from "react"
import { Box, space } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeaderIcon_fair } from "v2/__generated__/FairHeaderIcon_fair.graphql"

interface FairHeaderIconProps {
  fair: FairHeaderIcon_fair
}

export const FairHeaderIcon: React.FC<FairHeaderIconProps> = ({
  fair: { name, profile },
}) => {
  if (!profile?.icon) return null

  const { icon } = profile

  return (
    <Box
      position="absolute"
      bottom={0}
      left={space(2)}
      width={80}
      height={60}
      bg="white100"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <img
        src={icon.cropped.src}
        srcSet={icon.cropped.srcSet}
        alt={`Logo of ${name}`}
        width={60}
        height={60}
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
            cropped(width: 60, height: 60, version: "square140") {
              src
              srcSet
            }
          }
        }
      }
    `,
  }
)
