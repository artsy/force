import { FC } from "react"
import {
  Box,
  Image,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { EntityTooltipPartnerQuery } from "__generated__/EntityTooltipPartnerQuery.graphql"
import { EntityTooltipPartner_partner$data } from "__generated__/EntityTooltipPartner_partner.graphql"
import { RouterLink } from "System/Components/RouterLink"
import { EntityHeaderPartnerFragmentContainer } from "Components/EntityHeaders/EntityHeaderPartner"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { ActionType, ClickedTooltip } from "@artsy/cohesion"

interface EntityTooltipPartnerProps {
  partner: EntityTooltipPartner_partner$data
}

const EntityTooltipPartner: FC<EntityTooltipPartnerProps> = ({ partner }) => {
  const { trackEvent } = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const handleClick = () => {
    const payload: ClickedTooltip = {
      action: ActionType.clickedTooltip,
      context_owner_id: contextPageOwnerId as string,
      context_owner_slug: contextPageOwnerSlug as string,
      context_owner_type: contextPageOwnerType as any,
      destination_path: partner.href as string,
      type: "partner",
    }

    trackEvent(payload)
  }

  const bio = partner.profile?.fullBio || partner.profile?.bio
  const image = partner.profile?.image?.cropped

  return (
    <Box p={2} width={300}>
      {image && (
        <RouterLink to={partner.href} display="block" onClick={handleClick}>
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width={image.width}
            height={image.height}
            alt=""
            lazyLoad
            mb={2}
            style={{ display: "block" }}
          />
        </RouterLink>
      )}

      <EntityHeaderPartnerFragmentContainer
        partner={partner}
        displayAvatar={false}
        alignItems="flex-start"
      />

      {bio && (
        <RouterLink
          to={partner.href}
          display="block"
          textDecoration="none"
          mt={1}
          onClick={handleClick}
        >
          <Text variant="xs" lineClamp={3}>
            {bio}
          </Text>
        </RouterLink>
      )}
    </Box>
  )
}

const EntityTooltipPartnerFragmentContainer = createFragmentContainer(
  EntityTooltipPartner,
  {
    partner: graphql`
      fragment EntityTooltipPartner_partner on Partner {
        ...EntityHeaderPartner_partner
        href
        profile {
          bio
          fullBio
          image {
            cropped(
              width: 260
              height: 146
              version: ["wide", "medium250x165"]
            ) {
              src
              srcSet
              width
              height
            }
          }
        }
      }
    `,
  }
)

const EntityTooltipPartnerPlaceholder: FC = () => {
  return (
    <Skeleton p={2} width={300}>
      <SkeletonBox width={260} height={146} />

      <SkeletonText variant="sm-display">Partner Name</SkeletonText>

      <SkeletonText variant="xs">City, New City</SkeletonText>

      <SkeletonText variant="xs" mt={0.5}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </SkeletonText>
    </Skeleton>
  )
}

interface EntityTooltipPartnerQueryRendererProps {
  id: string
}

export const EntityTooltipPartnerQueryRenderer: FC<EntityTooltipPartnerQueryRendererProps> = ({
  id,
}) => {
  return (
    <SystemQueryRenderer<EntityTooltipPartnerQuery>
      variables={{ id }}
      query={graphql`
        query EntityTooltipPartnerQuery($id: String!) {
          partner(id: $id) {
            ...EntityTooltipPartner_partner
          }
        }
      `}
      placeholder={<EntityTooltipPartnerPlaceholder />}
      render={({ error, props }) => {
        if (error) {
          console.log(error)
          return null
        }

        if (!props?.partner) {
          return <EntityTooltipPartnerPlaceholder />
        }

        return <EntityTooltipPartnerFragmentContainer partner={props.partner} />
      }}
    />
  )
}
