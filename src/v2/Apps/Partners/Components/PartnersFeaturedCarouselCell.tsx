import { ContextModule } from "@artsy/cohesion"
import { Box, Flex, Image, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowProfileButtonFragmentContainer } from "v2/Components/FollowButton/FollowProfileButton"
import { useSystemContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { PartnersFeaturedCarouselCell_profile } from "v2/__generated__/PartnersFeaturedCarouselCell_profile.graphql"

interface PartnersFeaturedCarouselCellProps {
  profile: PartnersFeaturedCarouselCell_profile
}

const PartnersFeaturedCarouselCell: FC<PartnersFeaturedCarouselCellProps> = ({
  profile,
}) => {
  const { user } = useSystemContext()

  const partner = profile.owner

  if (!partner) return null

  const show = partner.featuredShow
  const image = show?.coverImage?.resized
  const runningDates = [show?.startAt, show?.endAt].filter(Boolean).join(" – ")
  const status = { running: "Current", upcoming: "Upcoming", closed: "Past" }[
    show?.status ?? "running"
  ]
  const location = show?.isOnlineExclusive
    ? "Online Exclusive"
    : show?.location?.city

  return (
    <Flex width="100%" flexDirection={["column-reverse", "row"]}>
      <Flex
        flex={1}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        px={4}
        py={2}
      >
        <RouterLink
          to={`${partner.href}`}
          display="block"
          textDecoration="none"
        >
          <Text variant="xl" mb={4}>
            {partner.name}
          </Text>
        </RouterLink>

        {show && (
          <RouterLink to={show.href} display="block" textDecoration="none">
            <Text variant="xs" textTransform="uppercase" mb={2}>
              {status} Show
            </Text>

            <Text variant="lg" mb={1}>
              {show.name}
            </Text>

            <Text variant="md" mb={2}>
              {location}
              {location && (show.statusUpdate || runningDates) ? ", " : ""}
              {show.statusUpdate ? (
                <Box as="span" color="red100">
                  {show.statusUpdate}
                </Box>
              ) : (
                runningDates
              )}
            </Text>

            <FollowProfileButtonFragmentContainer
              profile={profile}
              user={user}
              contextModule={ContextModule.featuredGalleriesRail}
              buttonProps={{
                variant: "secondaryOutline",
              }}
            />
          </RouterLink>
        )}
      </Flex>

      {image && (
        <RouterLink
          to={show?.href ?? ""}
          display="flex"
          flex={[null, 1]}
          bg="black10"
          height={[300, 500]}
          width="100%"
        >
          <Image
            src={image.src}
            srcSet={image.srcSet}
            style={{ objectFit: "cover" }}
            lazyLoad
            width="100%"
            height="100%"
            alt=""
          />
        </RouterLink>
      )}
    </Flex>
  )
}

export const PartnersFeaturedCarouselCellFragmentContainer = createFragmentContainer(
  PartnersFeaturedCarouselCell,
  {
    profile: graphql`
      fragment PartnersFeaturedCarouselCell_profile on Profile {
        ...FollowProfileButton_profile
        owner {
          ... on Partner {
            internalID
            href
            name
            featuredShow {
              href
              name
              status
              statusUpdate
              startAt(format: "MMM D")
              endAt(format: "MMM D")
              isOnlineExclusive
              location {
                city
              }
              coverImage {
                resized(
                  height: 500
                  version: ["normalized", "larger", "large"]
                ) {
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    `,
  }
)
