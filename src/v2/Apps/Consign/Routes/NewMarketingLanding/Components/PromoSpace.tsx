import { Flex, FullBleed, Text, ArrowRightIcon } from "@artsy/palette"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { RouterLink } from "v2/System/Router/RouterLink"

const partnersLinkProps = {
  to: "https://partners.artsy.net",
  target: "_blank",
}

export const PromoSpace: React.FC = () => {
  return (
    <FullBleed backgroundColor="black5">
      <AppContainer py={1}>
        <HorizontalPadding>
          <Flex justifyContent="space-between" alignItems="center">
            <Text mr={2} variant={["xs", "md"]}>
              Gallery or art dealer?&nbsp;
              <RouterLink {...partnersLinkProps}>Become a partner</RouterLink>
              &nbsp;to access the world’s largest online marketplace.
            </Text>
            <RouterLink {...partnersLinkProps} display="inline-flex">
              <ArrowRightIcon />
            </RouterLink>
          </Flex>
        </HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
