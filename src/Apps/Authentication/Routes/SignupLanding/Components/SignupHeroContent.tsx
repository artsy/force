import { Box, Flex, Spacer, Stack, Text } from "@artsy/palette"
import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"

export const SignupHeroContent = () => {
  return (
    <Box>
      <Text variant={["xl", "xxl"]} as="h1">
        Discover and Buy Art That Moves You.
      </Text>
      <Spacer y={2} />
      <Text variant="lg-display" color="mono60">
        Welcome to Artsy, the world's largest online art marketplace. We give
        you the tools to make art part of your daily routine, whether you're a
        seasoned art collector or looking for your first artwork.
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
      <CheckmarkFillIcon fill="black100" />
      <Text variant="md">{text}</Text>
    </Flex>
  )
}
