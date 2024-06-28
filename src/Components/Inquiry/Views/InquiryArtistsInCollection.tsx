import { Box, Stack, Text } from "@artsy/palette"
import { CollectorProfileArtistsAdd } from "Components/CollectorProfile/CollectorProfileArtistsAdd"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { FC } from "react"

export const InquiryArtistsInCollection: FC = () => {
  const { next } = useInquiryContext()

  return (
    <Stack gap={2} height="100%">
      <Box>
        <Text variant="lg-display">Add artists to My Collection:</Text>

        <Text variant="sm">
          Show off your collection and make a great impression.
        </Text>
      </Box>

      <Box flex={1} overflow="hidden">
        <CollectorProfileArtistsAdd onSuccess={next} onCancel={next} />
      </Box>
    </Stack>
  )
}
