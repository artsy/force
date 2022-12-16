import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { MetaTags } from "Components/MetaTags"
import { EnableRecaptcha } from "Utils/EnableRecaptcha"
import { ArtsyLogoBlackIcon, Spacer } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { useRouter } from "System/Router/useRouter"

export const ConsignmentInquiryContainer: React.FC = ({ children }) => {
  const { router, match } = useRouter()

  const handleLogoClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault
    if (match.location.pathname == "/sell/inquiry/sent") {
      router.go(-2)
      return
    }
    router.go(-1)
  }

  return (
    <>
      <EnableRecaptcha />

      <MetaTags
        pathname="sell/inquiry"
        title="Get in Touch | Sell With Artsy | Artsy"
        description="Contact a specialist about selling your artworks with Artsy"
      />

      <Spacer y={4} />

      <AppContainer>
        <HorizontalPadding>
          <RouterLink to="/sell" display="block" onClick={handleLogoClick}>
            <ArtsyLogoBlackIcon display="block" />
          </RouterLink>

          {children}
        </HorizontalPadding>
        <Spacer y={4} />
      </AppContainer>

      <Spacer y={4} />
    </>
  )
}
