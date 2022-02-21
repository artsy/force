import { ContextModule } from "@artsy/cohesion"
import { Box, BoxProps, ResponsiveBox, Image, Flex, Text } from "@artsy/palette"
import { capitalize, compact, uniq } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { FollowProfileButtonFragmentContainer } from "v2/Components/FollowButton/FollowProfileButton"
import { NearbyGalleryCard_partner$data } from "v2/__generated__/NearbyGalleryCard_partner.graphql"

interface NearbyGalleryCardProps extends BoxProps {
  partner: NearbyGalleryCard_partner$data
  city?: string | null
}

function normalizeCityName(city: string) {
  return capitalize(city.trim())
}

function getLocation(cities: Array<string>, preferredCity?: string | null) {
  let location

  if (cities.length > 0) {
    const normalizedPreferredCity =
      preferredCity && normalizeCityName(preferredCity)

    if (cities.some(c => c === normalizedPreferredCity)) {
      location = normalizedPreferredCity
    } else {
      location = cities[0]
    }

    if (cities.length > 1) {
      location += ` & ${cities.length - 1} other location`

      if (cities.length > 2) {
        location += "s"
      }
    }
  }

  return location
}

const NearbyGalleryCard: React.FC<NearbyGalleryCardProps> = ({
  partner,
  city,
  ...rest
}) => {
  const { user } = useSystemContext()

  if (!partner) {
    return null
  }

  const { name, slug, profile, type, locationsConnection } = partner
  const canFollow = type !== "Auction House"
  const image = partner?.profile?.image?.cropped
  const partnerHref = `/partner/${slug}`
  const cities = uniq(
    compact(
      locationsConnection?.edges?.map(location =>
        location?.node?.city
          ? normalizeCityName(location?.node?.city)
          : location?.node?.displayCountry
      )
    )
  )
  const location = getLocation(cities, city)

  return (
    <Box {...rest}>
      <ResponsiveBox
        bg="black10"
        aspectHeight={3}
        aspectWidth={4}
        maxWidth="100%"
      >
        <RouterLink to={partnerHref}>
          {image && (
            <Image
              lazyLoad
              src={image.src}
              srcSet={image.srcSet}
              width="100%"
              height="100%"
            />
          )}
        </RouterLink>
      </ResponsiveBox>
      <Flex justifyContent="space-between" mt={1}>
        <Box>
          <RouterLink noUnderline to={partnerHref}>
            <Text variant="lg">{name}</Text>
            {location && <Text color="black60">{location}</Text>}
          </RouterLink>
        </Box>
        {canFollow && !!profile && (
          <FollowProfileButtonFragmentContainer
            profile={profile}
            user={user}
            contextModule={ContextModule.partnerHeader}
            buttonProps={{
              size: "small",
              variant: "secondaryOutline",
            }}
          />
        )}
      </Flex>
    </Box>
  )
}

export const NearbyGalleryCardFragmentContainer = createFragmentContainer(
  NearbyGalleryCard,
  {
    partner: graphql`
      fragment NearbyGalleryCard_partner on Partner {
        name
        slug
        type
        profile {
          image {
            cropped(height: 300, width: 400, version: "wide") {
              src
              srcSet
            }
          }
          ...FollowProfileButton_profile
        }
        locationsConnection(first: 20) {
          edges {
            node {
              city
              displayCountry
            }
          }
        }
      }
    `,
  }
)
