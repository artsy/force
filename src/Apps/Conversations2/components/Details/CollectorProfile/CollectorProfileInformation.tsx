import { Flex, Separator, ShowMore, Text } from "@artsy/palette"

import MapPinIcon from "@artsy/icons/MapPinIcon"
import BriefcaseIcon from "@artsy/icons/BriefcaseIcon"
import InstitutionIcon from "@artsy/icons/InstitutionIcon"
import MessageIcon from "@artsy/icons/MessageIcon"
import GavelIcon from "@artsy/icons/GavelIcon"
import { UserVerifiedIcon } from "pages/conversations/components/UserVerifiedIcon"
import { graphql, useFragment } from "react-relay"
import { CollectorProfileInformation_collectorProfileType$key } from "__generated__/CollectorProfileInformation_collectorProfileType.graphql"

interface Props {
  collectorProfileType: CollectorProfileInformation_collectorProfileType$key
}
export const CollectorProfileInformation: React.FC<Props> = ({
  collectorProfileType,
}) => {
  const data = useFragment(
    graphql`
      fragment CollectorProfileInformation_collectorProfileType on CollectorProfileType {
        profession
        location {
          city
          country
        }
        isActiveInquirer
        isActiveBidder
        confirmedBuyerAt
        otherRelevantPositions
        bio
        collectorProfileArtists {
          name
        }
      }
    `,
    collectorProfileType
  )

  if (!data) {
    return null
  }

  const {
    location,
    isActiveInquirer,
    isActiveBidder,
    profession,
    confirmedBuyerAt,
    otherRelevantPositions,
    bio,
    collectorProfileArtists,
  } = data

  return (
    <>
      {!!location && (
        <Flex alignItems="center">
          <Flex py={0.5}>
            <Flex alignItems="center">
              <MapPinIcon fill="black100" />
            </Flex>
            <Text variant="sm" ml={1}>
              {location?.city ? `${location?.city},` : ""} {location?.country}
            </Text>
          </Flex>
        </Flex>
      )}
      {!!profession && (
        <Flex py={0.5}>
          <Flex alignItems="center">
            <BriefcaseIcon fill="black100" />
          </Flex>
          <Text variant="sm" ml={1}>
            {profession}
          </Text>
        </Flex>
      )}
      {!!otherRelevantPositions && (
        <Flex py={0.5}>
          <Flex alignItems="center">
            <InstitutionIcon fill="black100" />
          </Flex>
          <Text variant="sm" ml={1}>
            {otherRelevantPositions}
          </Text>
        </Flex>
      )}
      <Flex flexDirection="column">
        {confirmedBuyerAt && (
          <>
            <Separator my={2} />
            <Flex alignItems="flex-start" my={1}>
              <Flex position="relative" mr={1} mt={0.5}>
                <UserVerifiedIcon variant="md" />
              </Flex>
              <Flex flexDirection="column">
                <Text variant="sm" color="black100">
                  Confirmed Buyer
                </Text>
                <Text variant="xs" color="black60">
                  User has made multiple purchases
                </Text>
              </Flex>
            </Flex>
          </>
        )}
        {isActiveInquirer && (
          <Flex>
            <MessageIcon fill="black100" mr={1} mt={0.5} />
            <Flex flexDirection="column">
              <Text variant="sm" color="black100">
                Active Inquirer
              </Text>
              <Text variant="xs" color="black60">
                User has sent 25+ inquiries
              </Text>
            </Flex>
          </Flex>
        )}
        {isActiveBidder && (
          <Flex alignItems="flex-start">
            <GavelIcon fill="black100" mr={1} mt={0.5} />
            <Flex flexDirection="column">
              <Text variant="sm" color="black100">
                Bidder
              </Text>
              <Text variant="xs" color="black60">
                User has registered for 1+ auctions
              </Text>
            </Flex>
          </Flex>
        )}
        <ShowMore
          textDecoration="underline"
          initial={0}
          mt={1}
          hideText="Show less"
          variant="sm-display"
        >
          {bio && (
            <>
              <Separator my={2} />
              <Flex alignItems="flex-start" mb={1}>
                <Text color="black100">{bio}</Text>
              </Flex>
            </>
          )}

          {collectorProfileArtists && (
            <>
              <Separator my={2} />
              <Text color="black100" variant="sm" mb={1}>
                Artists collected:
              </Text>
              {collectorProfileArtists?.map((artist, i) => (
                <Text key={i} data-test="artist" color="black100" mb={1}>
                  {artist?.name}
                </Text>
              ))}
            </>
          )}
        </ShowMore>
      </Flex>
    </>
  )
}
