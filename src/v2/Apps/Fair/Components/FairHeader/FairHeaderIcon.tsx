import React from "react"
import { Box, BoxProps } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeaderIcon_fair } from "v2/__generated__/FairHeaderIcon_fair.graphql"
import { Media } from "v2/Utils/Responsive"

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
      {icon?.desktop?.src && (
        <Media greaterThanOrEqual="md">
          <img
            src={icon.desktop.src}
            srcSet={icon.desktop.srcSet}
            alt={`Logo of ${name}`}
            width={100}
            height={100}
          />
        </Media>
      )}

      {icon?.mobile?.src && (
        <Media lessThan="md">
          <img
            src={icon.mobile.src}
            srcSet={icon.mobile.srcSet}
            alt={`Logo of ${name}`}
            width={60}
            height={60}
          />
        </Media>
      )}
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
            desktop: cropped(width: 100, height: 100, version: "square140") {
              src
              srcSet
            }

            mobile: cropped(width: 60, height: 60, version: "square140") {
              src
              srcSet
            }
          }
        }
      }
    `,
  }
)
