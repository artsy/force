import { ContextModule } from "@artsy/cohesion"
import { Box, Flex, Image, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"
import { RouterLink } from "System/Components/RouterLink"
import { PartnersFeaturedCarouselCell_profile$data } from "__generated__/PartnersFeaturedCarouselCell_profile.graphql"

interface PartnersFeaturedCarouselCellProps {
  profile: PartnersFeaturedCarouselCell_profile$data
}

const PartnersFeaturedCarouselCell: FC<PartnersFeaturedCarouselCellProps> = ({
  profile,
}) => {
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
            <Text variant="xs" mb={2}>
              {status} Show
            </Text>

            <Text variant="lg-display" mb={1}>
              {show.name}
            </Text>

            <Text variant="sm-display" mb={2}>
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

            <FollowProfileButtonQueryRenderer
              id={profile.internalID}
              contextModule={ContextModule.featuredGalleriesRail}
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
        internalID
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
                  version: ["main", "normalized", "larger", "large"]
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
