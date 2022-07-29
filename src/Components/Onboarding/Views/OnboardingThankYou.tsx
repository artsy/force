import { Box, Image, ResponsiveBox } from "@artsy/palette"
import { FC, useEffect } from "react"
import { OnboardingLoadingCollection } from "../Components/OnboardingLoadingCollection"
import { useOnboardingContext } from "../Hooks/useOnboardingContext"

export const OnboardingThankYou: FC = () => {
  const { onComplete } = useOnboardingContext()

  useEffect(() => {
    onComplete()
  }, [onComplete])

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      z-index={1}
    >
      <ResponsiveBox aspectWidth={300} aspectHeight={400} maxWidth="100%">
        <Image
          src="https://files.artsy.net/images/hirst-damien-the-wonder-of-you.jpg"
          lazyLoad
          width="100%"
          height="100%"
          style={{
            objectFit: "cover",
          }}
          alt=""
          z-index={1}
        />
      </ResponsiveBox>
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="100%"
        z-index={2}
      >
        <OnboardingLoadingCollection type="thank-you-loading" />
      </Box>
    </Box>
  )
}
