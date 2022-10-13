import { MetaTags } from "Components/MetaTags"
import { ConfirmationScreenComponent } from "Components/ConfirmationScreenComponent"
import { ArtsyLogoBlackIcon, Flex, FullBleed } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { AppContainer } from "Apps/Components/AppContainer"
import { BackLink } from "Components/Links/BackLink"
import { useRouter } from "System/Router/useRouter"

export const PriceEstimateConfirmation = () => {
  const { match } = useRouter()
  const artworkId = match.params.artworkID

  return (
    <>
      <MetaTags title="Request a Price Estimate | Artsy" />
      <Flex my={4}>
        <RouterLink to="/my-collection" display="block">
          <ArtsyLogoBlackIcon display="block" />
        </RouterLink>
      </Flex>

      <FullBleed border="1px solid" borderColor="black10" />

      <AppContainer>
        <BackLink
          py={2}
          mb={4}
          width="min-content"
          to={`/my-collection/artwork/${artworkId}`}
        >
          Back
        </BackLink>

        <ConfirmationScreenComponent
          title="Price Estimate Request Sent"
          subtitle="An Artsy Specialist will evaluate your artwork and contact you with a
      free price estimate."
          buttonTitle="Back to My Collection"
          routerLink={`/my-collection/artwork/${artworkId}`}
        />
      </AppContainer>
    </>
  )
}
