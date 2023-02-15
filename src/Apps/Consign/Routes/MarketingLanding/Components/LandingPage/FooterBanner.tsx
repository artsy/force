import { Banner } from "@artsy/palette"
import { Media } from "Utils/Responsive"
import { RouterLink } from "System/Router/RouterLink"

export const FooterBanner: React.FC = () => {
  return (
    <Media greaterThan="xs">
      <Banner dismissable={false} variant="defaultLight" mx={[-2, -4]}>
        Gallery or art dealer?
        <RouterLink to="https://partners.artsy.net">
          Become a partner
        </RouterLink>
        to access the world’s largest online marketplace.
      </Banner>
    </Media>
  )
}
