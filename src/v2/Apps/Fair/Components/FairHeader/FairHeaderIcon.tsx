import React from "react"
import { BoxProps } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeaderIcon_fair } from "v2/__generated__/FairHeaderIcon_fair.graphql"
import { ProfileIcon } from "v2/Components/ProfileIcon"

interface FairHeaderIconProps extends BoxProps {
  fair: FairHeaderIcon_fair
}

export const FairHeaderIcon: React.FC<FairHeaderIconProps> = ({
  fair: { name, profile },
  ...rest
}) => {
  return (
    <ProfileIcon profile={{ icon: profile?.icon, name: name! }} {...rest} />
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
