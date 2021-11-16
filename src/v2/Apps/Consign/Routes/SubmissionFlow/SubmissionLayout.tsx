import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { MinimalNavBar } from "v2/Components/NavBar/MinimalNavBar"
import { MetaTags } from "v2/Components/MetaTags"

export const SubmissionLayout: React.FC = ({ children }) => {
  return (
    <MinimalNavBar to="/consign">
      <MetaTags
        pathname="consign/submission"
        title="Sell Art from Your Collection | Consignments | Artsy"
        description="Get competitive offers from the world's top auction houses and galleries to sell art from your collection. Submit today at no cost."
      />
      <AppContainer overflowX="hidden">
        <HorizontalPadding mb={4}>{children}</HorizontalPadding>
      </AppContainer>
    </MinimalNavBar>
  )
}
