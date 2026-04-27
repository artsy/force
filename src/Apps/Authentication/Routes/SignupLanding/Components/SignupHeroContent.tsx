import { Box, Flex, Spacer, Stack, Text } from "@artsy/palette"
import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"
import { FACTS_AND_FIGURES } from "Utils/factsAndFigures"

const formatCompact = (value: string) => {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value.replace(/,/g, "")))
}

export const SignupHeroContent = () => {
  return (
    <Box>
      <Text variant={["lg", "xl", "xxl"]} as="h1">
        Join Artsy to Discover and Buy Art That Moves You
      </Text>
      <Spacer y={2} />
      <Stack gap={1}>
        <ValuePropItem>
          <strong>
            Explore {formatCompact(FACTS_AND_FIGURES.artworksCount)}+ original
            artworks
          </strong>{" "}
          across paintings, sculptures, prints, and photography from artists at
          leading global galleries.
        </ValuePropItem>
        <ValuePropItem>
          <strong> Get personalized recommendations</strong> by following
          artists and saving works to create a custom art experience that
          evolves with your taste.
        </ValuePropItem>
        <ValuePropItem>
          <strong> Save artworks, create collections, and set alerts</strong> to
          easily manage and grow your collection in one place.
        </ValuePropItem>
        <ValuePropItem>
          <strong>Collect original art with confidence </strong> by inquiring,
          negotiating, and purchasing through Artsy's trusted platform.{" "}
        </ValuePropItem>
      </Stack>
    </Box>
  )
}

const ValuePropItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex alignItems="flex-start" gap={1}>
      <CheckmarkFillIcon fill="black100" flexShrink={0} />
      <Text variant="sm">{children}</Text>
    </Flex>
  )
}
