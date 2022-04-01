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
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { EntityTooltipPartnerQuery } from "v2/__generated__/EntityTooltipPartnerQuery.graphql"
import { EntityTooltipPartner_partner } from "v2/__generated__/EntityTooltipPartner_partner.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"
import { EntityHeaderPartnerFragmentContainer } from "../EntityHeaders/EntityHeaderPartner"

interface EntityTooltipPartnerProps {
  partner: EntityTooltipPartner_partner
}

const EntityTooltipPartner: FC<EntityTooltipPartnerProps> = ({ partner }) => {
  const bio = partner.profile?.fullBio || partner.profile?.bio
  const image = partner.profile?.image?.cropped

  return (
    <Box p={2} width={300}>
      {image && (
        <RouterLink to={partner.href} display="block">
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width={image.width}
            height={image.height}
            alt=""
            lazyLoad
            mb={2}
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

      <SkeletonText variant="md">Partner Name</SkeletonText>

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
