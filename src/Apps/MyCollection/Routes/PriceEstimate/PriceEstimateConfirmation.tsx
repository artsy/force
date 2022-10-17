import { ArtsyLogoBlackIcon, Flex } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { ConfirmationScreenComponent } from "Components/ConfirmationScreenComponent"
import { BackLink } from "Components/Links/BackLink"
import { MetaTags } from "Components/MetaTags"
import { RouterLink } from "System/Router/RouterLink"
import { useRouter } from "System/Router/useRouter"

export const PriceEstimateConfirmation = () => {
  const { match } = useRouter()
  const artworkId = match.params.artworkID

  return (
    <>
      <MetaTags title="Request a Price Estimate | Artsy" />

      <Flex mt={4}>
        <RouterLink to="/my-collection" display="block">
          <ArtsyLogoBlackIcon display="block" />
        </RouterLink>
      </Flex>

      <AppContainer>
        <BackLink
          py={2}
          mb={6}
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
