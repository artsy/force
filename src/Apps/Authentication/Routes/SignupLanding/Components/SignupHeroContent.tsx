import { Box, Flex, Spacer, Stack, Text } from "@artsy/palette"
import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"

export const SignupHeroContent = () => {
  return (
    <Box>
      <Text
        variant={["xl", "xxl"]}
        as="h1"
        fontFamily="adobe-garamond-pro"
        fontWeight="bold"
        textAlign="left"
      >
        Discover and Buy Art That Moves You
      </Text>
      <Spacer y={2} />
      <Text
        variant="lg-display"
        color="mono60"
        fontFamily="adobe-garamond-pro"
        fontStyle="italic"
        textAlign="left"
        fontSize="22px" // dont hard code this
      >
        Join over 3.4 million art collectors and enthusiasts. Explore 1.6
        million original artworks for sale from leading galleries, museums, and
        artists worldwide—and find the work that speaks to you.
      </Text>
      <Spacer y={4} />
      <Stack gap={2}>
        <ValuePropItem text="Find the art you love with 1.6M+ original artworks for sale" />
        <ValuePropItem text="Get art recommendations that match your taste" />
        <ValuePropItem text="Build and manage your collection" />
        <ValuePropItem text="Collect with confidence" />
      </Stack>
    </Box>
  )
}

const ValuePropItem = ({ text }: { text: string }) => {
  return (
    <Flex alignItems="flex-start" gap={1}>
      <CheckmarkFillIcon width={24} height={24} fill="black100" />
      <Text variant="md" fontFamily="adobe-garamond-pro" fontWeight="bold">
        {text}
      </Text>
    </Flex>
  )
}
