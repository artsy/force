import { Flex, Text } from "@artsy/palette"
import * as React from "react"
interface PartnerBannerProps {
  badgeCategory: string
}

export const PartnerBanner: React.FC<PartnerBannerProps> = ({
  badgeCategory,
}) => {
  return (
    <>
      <Flex display="inline-block" backgroundColor={"black5"} mr={1} px={0.5}>
        <Text variant="text" color="black100" textAlign={"center"}>
          {badgeCategory}
        </Text>
      </Flex>
    </>
  )
}
