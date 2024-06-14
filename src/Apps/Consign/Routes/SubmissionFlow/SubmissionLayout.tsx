import { AppContainer } from "Apps/Components/AppContainer"
import { MetaTags } from "Components/MetaTags"
import { EnableRecaptcha } from "Utils/EnableRecaptcha"
import { Spacer } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"

export const SubmissionLayout: React.FC = ({ children }) => {
  return (
    <>
      <EnableRecaptcha />

      <MetaTags
        pathname="consign/submission"
        title="Sell Art from Your Collection | Consignments | Artsy"
        description="Get competitive offers from the world's top auction houses and galleries to sell art from your collection. Submit today at no cost."
      />

      <Spacer y={4} />

      <AppContainer>
        <RouterLink to="/sell" display="block">
          <ArtsyLogoIcon display="block" />
        </RouterLink>

        {children}
      </AppContainer>

      <Spacer y={4} />
    </>
  )
}
