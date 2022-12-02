import {
  Flex,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { CareerHighlightKindWithPromo } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/config"
import {
  CareerHighlightKind,
  getCareerHighlight,
} from "Apps/Settings/Routes/Insights/Utils/getCareerHighlight"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"
import { graphql, useFragment } from "react-relay"
import { CareerHighlightModalStep_careerHighlight$key } from "__generated__/CareerHighlightModalStep_careerHighlight.graphql"

interface CareerHighlightModalStepProps {
  careerHighlight: CareerHighlightModalStep_careerHighlight$key
  kind: CareerHighlightKindWithPromo | (string & {})
}

export const CareerHighlightModalStep: React.FC<CareerHighlightModalStepProps> = ({
  careerHighlight,
  kind,
}) => {
  const careerHighlights = useFragment(careerHighlightFragment, careerHighlight)
  const count = careerHighlights.length
  const { Icon, label } = getCareerHighlight(kind as CareerHighlightKind, count)

  return (
    <Flex flex={1} flexDirection="column" mx={[0, 1]}>
      <Flex alignItems="center">
        <Text flex={1} variant={["xl", "xxl"]} color="blue100">
          {count}
        </Text>

        <Flex
          height={[40, 50]}
          width={[40, 50]}
          alignItems="center"
          justifyContent="center"
          border="1px solid"
          borderColor="black100"
          borderRadius="50%"
        >
          <Icon fill="black100" height={20} width={20} />
        </Flex>
      </Flex>

      <Text variant={["lg-display", "lg"]}>{label}</Text>

      <Spacer y={4} />

      <Flex mt={2} flexDirection="column" overflowY="auto">
        {careerHighlights.map((careerHighlightArtist, index) => (
          <EntityHeaderArtistFragmentContainer
            key={`${kind}_${index}`}
            flex={1}
            alignItems="flex-start"
            mb={2}
            artist={careerHighlightArtist.artist!}
            displayLink={false}
            // added this to hide the follow button
            FollowButton={<></>}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export const STEPS_PLACEHOLDER = (
  <Skeleton display="flex" flex={1} flexDirection="column" mx={[0, 1]}>
    <Flex alignItems="center" justifyContent="space-between">
      <SkeletonText variant={["xl", "xxl"]}>12</SkeletonText>

      <Flex
        height={[40, 50]}
        width={[40, 50]}
        justifySelf="flex-end"
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        borderColor="black10"
        borderRadius="50%"
      >
        <SkeletonBox height={20} width={20} />
      </Flex>
    </Flex>

    <SkeletonText variant={["lg-display", "lg"]}>
      Artists were reviewed by major art publications.
    </SkeletonText>

    <Spacer y={4} />

    <Flex mt={2} flexDirection="column" overflowY="auto">
      {Array.from({ length: 4 }).map((_, i) => (
        <EntityHeaderPlaceholder mb={2} key={`placeholder-${i}`} />
      ))}
    </Flex>
  </Skeleton>
)

const careerHighlightFragment = graphql`
  fragment CareerHighlightModalStep_careerHighlight on ArtistInsight
    @relay(plural: true) {
    artist {
      ...EntityHeaderArtist_artist
    }
  }
`
