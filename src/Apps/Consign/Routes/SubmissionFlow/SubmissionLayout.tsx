import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { MetaTags } from "Components/MetaTags"
import { EnableRecaptcha } from "Utils/EnableRecaptcha"
import { ArtsyLogoBlackIcon, Spacer } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"

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
        <HorizontalPadding>
          <RouterLink to="/sell" display="block">
            <ArtsyLogoBlackIcon display="block" />
          </RouterLink>

          {children}
        </HorizontalPadding>
      </AppContainer>

      <Spacer y={4} />
    </>
  )
}
