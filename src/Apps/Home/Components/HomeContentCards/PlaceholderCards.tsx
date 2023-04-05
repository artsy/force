import {
  Box,
  ResponsiveBox,
  GridColumns,
  Column,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Button,
  Skeleton,
} from "@artsy/palette"
import { Media } from "Utils/Responsive"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import { FC } from "react"

export const PlaceholderCards: FC = () => {
  return (
    <HeroCarousel>
      {new Array(2).fill(0).map((_, index) => {
        return (
          <Skeleton key={index} width="100%" height="100%">
            <Media greaterThan="xs">
              <PlaceholderCardLarge />
            </Media>

            <Media at="xs">
              <PlaceholderCardSmall />
            </Media>
          </Skeleton>
        )
      })}
    </HeroCarousel>
  )
}

const PlaceholderCardSmall: FC = () => {
  return (
    <Box width="100%" height="100%" bg="black5">
      <ResponsiveBox
        aspectWidth={3}
        aspectHeight={2}
        maxWidth="100%"
        bg="black30"
      />

      <Box p={4}>
        <SkeletonText variant="lg-display" lineClamp={3}>
          {PLACEHOLDER_CARD.title}
        </SkeletonText>

        <Spacer y={1} />

        <SkeletonText variant="xs" lineClamp={4}>
          {PLACEHOLDER_CARD.description}
        </SkeletonText>

        <Spacer y={1} />

        <SkeletonText variant="xs">{PLACEHOLDER_CARD.button}</SkeletonText>
      </Box>
    </Box>
  )
}

const PlaceholderCardLarge: FC = () => {
  return (
    <GridColumns bg="black5">
      <Column span={6}>
        <Box height={[300, 400, 500]} position="relative" bg="black30" />
      </Column>

      <Column span={6}>
        <GridColumns height="100%">
          <Column
            start={3}
            span={8}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            py={4}
          >
            <SkeletonText variant="xs">{PLACEHOLDER_CARD.label}</SkeletonText>

            <Spacer y={1} />

            <SkeletonText variant={["lg-display", "xl", "xl"]}>
              {PLACEHOLDER_CARD.title}
            </SkeletonText>

            <Spacer y={2} />

            <SkeletonText
              variant={["xs", "sm-display", "lg-display"]}
              lineClamp={4}
            >
              {PLACEHOLDER_CARD.description}
            </SkeletonText>

            <Spacer y={[2, 2, 4]} />

            <GridColumns>
              <Column span={[12, 12, 6]}>
                <SkeletonBox>
                  <Button
                    variant="secondaryBlack"
                    width="100%"
                    disabled
                    opacity={0}
                  >
                    {PLACEHOLDER_CARD.button}
                  </Button>
                </SkeletonBox>
              </Column>
            </GridColumns>
          </Column>
        </GridColumns>
      </Column>
    </GridColumns>
  )
}

const PLACEHOLDER_CARD = {
  label: "Artsy Auction",
  title: "Post-War and Contemporary",
  description:
    "Bid on works by Alice Neel, Ugo Rondinone, Robert Nava, and more—and benefit the Immediate Abortion Access Fund to support reproductive justice for all.",
  button: "Browse Works",
}
