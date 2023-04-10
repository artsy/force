import { Box, ChevronIcon, Clickable, Flex, Text } from "@artsy/palette"
import { useRouter } from "System/Router/useRouter"

export const AuctionResultBackLink: React.FC = () => {
  const { router } = useRouter()

  return (
    <Box py={[2, 1]}>
      <Clickable onClick={() => router.go(-1)} minHeight={30}>
        <Flex alignItems="center" minHeight={30}>
          <ChevronIcon height={14} width={14} direction="left" />
          <Text variant="xs" pl={1}>
            Back
          </Text>
        </Flex>
      </Clickable>
    </Box>
  )
}
