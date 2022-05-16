import { Flex, FullBleed, Text, ArrowRightIcon } from "@artsy/palette"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { RouterLink } from "v2/System/Router/RouterLink"

export const PromoSpace: React.FC = () => {
  return (
    <RouterLink
      to="https://partners.artsy.net"
      textDecoration="none"
      target="_blank"
    >
      <FullBleed backgroundColor="black5">
        <AppContainer py={1}>
          <HorizontalPadding>
            <Flex justifyContent="space-between" alignItems="center">
              <Text mr={2} variant={["xs", "sm-display"]}>
                Gallery or art dealer? <u>Become a partner</u> to access the
                world’s largest online marketplace.
              </Text>
              <Flex>
                <ArrowRightIcon />
              </Flex>
            </Flex>
          </HorizontalPadding>
        </AppContainer>
      </FullBleed>
    </RouterLink>
  )
}
