import { MetaTags } from "Components/MetaTags"
import { ConfirmationScreenComponent } from "Components/ConfirmationScreenComponent"
import { Flex } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { AppContainer } from "Apps/Components/AppContainer"
import { useRouter } from "System/Hooks/useRouter"
import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"

export const PriceEstimateConfirmation = () => {
  const { match } = useRouter()
  const artworkId = match.params.artworkID

  return (
    <>
      <MetaTags title="Request a Price Estimate | Artsy" />
      <Flex my={4}>
        <RouterLink to={"/collector-profile/my-collection"} display="block">
          <ArtsyLogoIcon display="block" />
        </RouterLink>
      </Flex>

      <AppContainer>
        <ConfirmationScreenComponent
          title="Price Estimate Request Sent"
          subtitle="An Artsy Specialist will evaluate your artwork and contact you with a
      free price estimate."
          buttonText="Back to My Collection"
          routerLink={`/collector-profile/my-collection/artwork/${artworkId}`}
        />
      </AppContainer>
    </>
  )
}
