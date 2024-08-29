import { Box } from "@artsy/palette"
import { FullBleedBanner } from "Components/FullBleedBanner"
import { RouterLink } from "System/Components/RouterLink"

export const FooterBanner: React.FC = () => {
  return (
    <Box display={["none", "block"]}>
      <FullBleedBanner dismissable={false} variant="defaultLight">
        Gallery or art dealer?&nbsp;
        <RouterLink inline to="https://partners.artsy.net">
          Become a partner&nbsp;
        </RouterLink>
        to access the world’s largest online marketplace.
      </FullBleedBanner>
    </Box>
  )
}
