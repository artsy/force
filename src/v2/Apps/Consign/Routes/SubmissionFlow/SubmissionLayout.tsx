import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { MetaTags } from "v2/Components/MetaTags"
import { ErrorModalProvider } from "./Utils/useErrorModal"
import { EnableRecaptcha } from "v2/Utils/EnableRecaptcha"
import { ArtsyLogoBlackIcon, Box } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"

export const SubmissionLayout: React.FC = ({ children }) => {
  return (
    <Box pt={4} mx={[-2, -4]}>
      <Box height={70} px={[2, 4]}>
        <RouterLink to="/sell">
          <ArtsyLogoBlackIcon />
        </RouterLink>
      </Box>

      <MetaTags
        pathname="consign/submission"
        title="Sell Art from Your Collection | Consignments | Artsy"
        description="Get competitive offers from the world's top auction houses and galleries to sell art from your collection. Submit today at no cost."
      />
      <AppContainer overflowX="hidden">
        <EnableRecaptcha />
        <HorizontalPadding mb={4}>
          <ErrorModalProvider>{children}</ErrorModalProvider>
        </HorizontalPadding>
      </AppContainer>
    </Box>
  )
}
