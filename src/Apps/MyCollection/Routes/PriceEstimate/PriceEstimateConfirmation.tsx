import { MetaTags } from "Components/MetaTags"
import { ConfirmationScreenComponent } from "Components/ConfirmationScreenComponent"
import { ArtsyLogoBlackIcon, Flex } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { AppContainer } from "Apps/Components/AppContainer"
import { useRouter } from "System/Router/useRouter"
import { useFeatureFlag } from "System/useFeatureFlag"

export const PriceEstimateConfirmation = () => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")
  const { match } = useRouter()
  const artworkId = match.params.artworkID

  return (
    <>
      <MetaTags title="Request a Price Estimate | Artsy" />
      <Flex my={4}>
        <RouterLink
          to={
            isCollectorProfileEnabled
              ? "/collector-profile/my-collection"
              : "/my-collection"
          }
          display="block"
        >
          <ArtsyLogoBlackIcon display="block" />
        </RouterLink>
      </Flex>

      <AppContainer>
        <ConfirmationScreenComponent
          title="Price Estimate Request Sent"
          subtitle="An Artsy Specialist will evaluate your artwork and contact you with a
      free price estimate."
          buttonText="Back to My Collection"
          routerLink={
            isCollectorProfileEnabled
              ? `/collector-profile/my-collection/artwork/${artworkId}`
              : `/my-collection/artwork/${artworkId}`
          }
        />
      </AppContainer>
    </>
  )
}
