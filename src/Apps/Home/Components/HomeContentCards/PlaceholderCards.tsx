import {
  Box,
  ResponsiveBox,
  GridColumns,
  Column,
  SkeletonBox,
  SkeletonText,
  Spacer,
} from "@artsy/palette"
import { Media } from "Utils/Responsive"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"

export const PlaceholderCards = () => {
  return (
    <HeroCarousel>
      <GridColumns bg="black5" width="100%">
        <Column span={6} bg="black30">
          <>
            <Media at="xs">
              <ResponsiveBox aspectWidth={3} aspectHeight={2} maxWidth="100%" />
            </Media>
            <Media greaterThan="xs">
              <Box height={[300, 400, 500]} />
            </Media>
          </>
        </Column>
        <Column span={6}>
          <GridColumns height="100%">
            <Column
              start={[2, 3]}
              span={[10, 8]}
              display="flex"
              justifyContent="center"
              flexDirection="column"
              py={4}
            >
              <Media greaterThan="xs">
                <SkeletonText variant="xs">Artsy Auction</SkeletonText>
                <Spacer y={2} />
              </Media>
              <SkeletonText variant={["lg-display", "xl", "xl"]}>
                <h1>Post-War and Contemporary</h1>
              </SkeletonText>
              <Spacer y={[1, 2]} />
              <SkeletonText variant={["xs", "sm-display", "lg-display"]}>
                Bid on works by Alice Neel, Ugo Rondinone, Robert Nava, and
                more—and benefit the Immediate Abortion Access Fund to support
                reproductive justice for all.
              </SkeletonText>
              <Media greaterThan="xs">
                <Spacer
                  // Unconventional value here to keep visual rhythm
                  y="30px"
                />
                <SkeletonBox mt={2} width={200} height={50} />
              </Media>
              <Media at="xs">
                <Spacer y={1} />
                <SkeletonBox mt={2} width={200} height={50} />
              </Media>
            </Column>
          </GridColumns>
        </Column>
      </GridColumns>
      <GridColumns bg="black5" width="100%">
        <Column span={6} bg="black30">
          <>
            <Media at="xs">
              <ResponsiveBox aspectWidth={3} aspectHeight={2} maxWidth="100%" />
            </Media>
            <Media greaterThan="xs">
              <Box height={[300, 400, 500]} />
            </Media>
          </>
        </Column>
        <Column span={6}>
          <GridColumns height="100%">
            <Column
              start={[2, 3]}
              span={[10, 8]}
              display="flex"
              justifyContent="center"
              flexDirection="column"
              py={4}
            >
              <Media greaterThan="xs">
                <SkeletonText variant="xs">Artsy Auction</SkeletonText>
                <Spacer y={2} />
              </Media>
              <SkeletonText variant={["lg-display", "xl", "xl"]}>
                Post-War and Contemporary
              </SkeletonText>
              <Spacer y={[1, 2]} />
              <SkeletonText variant={["xs", "sm-display", "lg-display"]}>
                Bid on works by Alice Neel, Ugo Rondinone, Robert Nava, and
                more—and benefit the Immediate Abortion Access Fund to support
                reproductive justice for all.
              </SkeletonText>
              <Media greaterThan="xs">
                <Spacer
                  // Unconventional value here to keep visual rhythm
                  y="30px"
                />
                <SkeletonBox mt={2} width={200} height={50} />
              </Media>
              <Media at="xs">
                <Spacer y={1} />
                <SkeletonBox mt={2} width={200} height={50} />
              </Media>
            </Column>
          </GridColumns>
        </Column>
      </GridColumns>
    </HeroCarousel>
  )
}
