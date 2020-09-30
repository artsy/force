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
        src={icon._1x.src}
        srcSet={`${icon._1x.src} 1x, ${icon._2x.src} 2x`}
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
            _1x: cropped(width: 60, height: 60, version: "square140") {
              src: url
            }
            _2x: cropped(width: 120, height: 120, version: "square140") {
              src: url
            }
          }
        }
      }
    `,
  }
)
