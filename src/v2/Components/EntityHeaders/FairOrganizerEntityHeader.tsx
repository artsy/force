import { ContextModule } from "@artsy/cohesion"
import { EntityHeader, BoxProps } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { FairOrganizerEntityHeader_fairOrganizer$data } from "v2/__generated__/FairOrganizerEntityHeader_fairOrganizer.graphql"
import { FollowProfileButtonFragmentContainer } from "../FollowButton/FollowProfileButton"

interface FairOrganizerEntityHeaderProps extends BoxProps {
  fairOrganizer: FairOrganizerEntityHeader_fairOrganizer$data
}

const FairOrganizerEntityHeader: FC<FairOrganizerEntityHeaderProps> = ({
  fairOrganizer,
  ...rest
}) => {
  const { user } = useSystemContext()

  const image = fairOrganizer.profile?.avatar?.cropped
  const totalCount = fairOrganizer.fairsConnection?.totalCount ?? 0
  const meta =
    totalCount > 0 ? `${totalCount} Fair${totalCount === 1 ? "" : "s"}` : ""

  return (
    <EntityHeader
      name={fairOrganizer.name!}
      meta={meta}
      href={`/fair-organizer/${fairOrganizer.slug}`}
      initials={fairOrganizer.profile?.initials ?? fairOrganizer.name?.[0]}
      image={image!}
      FollowButton={
        <FollowProfileButtonFragmentContainer
          user={user}
          profile={fairOrganizer.profile!}
          contextModule={ContextModule.fairOrganizerHeader}
          buttonProps={{ size: "small", variant: "secondaryOutline" }}
        />
      }
      {...rest}
    />
  )
}

export const FairOrganizerEntityHeaderFragmentContainer = createFragmentContainer(
  FairOrganizerEntityHeader,
  {
    fairOrganizer: graphql`
      fragment FairOrganizerEntityHeader_fairOrganizer on FairOrganizer {
        internalID
        slug
        name
        fairsConnection {
          totalCount
        }
        profile {
          ...FollowProfileButton_profile
          isFollowed
          initials
          avatar: image {
            cropped(width: 45, height: 45) {
              src
              srcSet
            }
          }
        }
      }
    `,
  }
)
