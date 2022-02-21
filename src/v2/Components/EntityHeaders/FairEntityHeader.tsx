import { ContextModule } from "@artsy/cohesion"
import { BoxProps, EntityHeader } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { FairEntityHeader_fair$data } from "v2/__generated__/FairEntityHeader_fair.graphql"
import { FollowProfileButtonFragmentContainer } from "../FollowButton/FollowProfileButton"

interface FairEntityHeaderProps extends BoxProps {
  fair: FairEntityHeader_fair$data
}

const FairEntityHeader: FC<FairEntityHeaderProps> = ({ fair, ...rest }) => {
  const { user } = useSystemContext()

  const image = fair?.avatar?.cropped
  const meta = [fair.startAt, fair.endAt].filter(Boolean).join(" – ")

  return (
    <EntityHeader
      name={fair.name!}
      meta={meta}
      href={`/fair/${fair.slug}`}
      initials={fair.profile?.initials ?? fair.name?.[0]}
      image={image!}
      FollowButton={
        <FollowProfileButtonFragmentContainer
          user={user}
          profile={fair.profile!}
          contextModule={ContextModule.fairsHeader}
          buttonProps={{ size: "small", variant: "secondaryOutline" }}
        />
      }
      {...rest}
    />
  )
}

export const FairEntityHeaderFragmentContainer = createFragmentContainer(
  FairEntityHeader,
  {
    fair: graphql`
      fragment FairEntityHeader_fair on Fair {
        internalID
        slug
        name
        startAt(format: "MMM Do")
        endAt(format: "MMM Do YYYY")
        avatar: image {
          cropped(width: 45, height: 45) {
            src
            srcSet
          }
        }
        profile {
          ...FollowProfileButton_profile
          isFollowed
          initials
        }
      }
    `,
  }
)
