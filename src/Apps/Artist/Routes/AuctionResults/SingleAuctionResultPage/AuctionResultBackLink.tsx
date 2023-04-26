import { Box, Clickable, Flex, Text } from "@artsy/palette"
import { useRouter } from "System/Router/useRouter"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"

export const AuctionResultBackLink: React.FC = () => {
  const { router } = useRouter()

  return (
    <Box py={[2, 1]}>
      <Clickable onClick={() => router.go(-1)} minHeight={30}>
        <Flex alignItems="center" minHeight={30}>
          <ChevronLeftIcon height={14} width={14} />
          <Text variant="xs" pl={1}>
            Back
          </Text>
        </Flex>
      </Clickable>
    </Box>
  )
}
