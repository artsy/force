import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ProfileIcon } from "v2/Components/ProfileIcon"

export const FairOrganizerHeaderIcon: React.FC<any> = ({
  fairOrganizer,
  ...rest
}) => {
  const { name, profile } = fairOrganizer
  return <ProfileIcon profile={{ icon: profile.icon, name }} {...rest} />
}

export const FairOrganizerHeaderIconFragmentContainer = createFragmentContainer(
  FairOrganizerHeaderIcon,
  {
    fairOrganizer: graphql`
      fragment FairOrganizerHeaderIcon_fairOrganizer on FairOrganizer {
        name
        profile {
          icon {
            desktop: cropped(width: 80, height: 80, version: "square140") {
              src
              srcSet
              size: width
            }

            mobile: cropped(width: 60, height: 60, version: "square140") {
              src
              srcSet
              size: width
            }
          }
        }
      }
    `,
  }
)
