import { RouterLink } from "System/Router/RouterLink"
import { FullBleedBanner } from "Components/FullBleedBanner"
import { useWindowSize } from "Utils/Hooks/useWindowSize"
import { breakpoints, Text } from "@artsy/palette"

export const FooterBanner: React.FC = () => {
  const { width } = useWindowSize()

  return (
    <>
      {width > parseInt(breakpoints.sm, 10) && (
        <FullBleedBanner dismissable={false} variant="defaultLight" mb={-4}>
          <Text variant="xs">
            Gallery or art dealer?{" "}
            <RouterLink to="https://partners.artsy.net">
              Become a partner
            </RouterLink>{" "}
            to access the world’s largest online marketplace.
          </Text>
        </FullBleedBanner>
      )}
    </>
  )
}
