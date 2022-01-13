import { Box, Text } from "@artsy/palette"
import * as React from "react"
interface PartnerBannerProps {
  badgeCategory: string
}

export const PartnerBanner: React.FC<PartnerBannerProps> = ({
  badgeCategory,
}) => {
  return (
    <>
      <Box backgroundColor={"black10"} width={100} mb={1}>
        <Text variant="xs" color="black100" textAlign={"center"}>
          {badgeCategory}woooo
        </Text>
      </Box>
    </>
  )
}
