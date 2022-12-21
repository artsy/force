import { Box } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { FC } from "react"

export const ArtQuizApp: FC = ({ children }) => {
  const { height } = useNavBarHeight()

  return (
    <>
      <MetaTags title="Art Taste Quiz | Artsy" />

      {/* TODO: Remove once we implement a footer-less layout that allows for filling out the height */}
      <Box position="fixed" top={height} right={0} bottom={0} left={0}>
        {children}
      </Box>
    </>
  )
}
