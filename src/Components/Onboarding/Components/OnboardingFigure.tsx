import { forwardRef, ForwardRefExoticComponent } from "react"
import { Flex, Image, ResponsiveBox, Text } from "@artsy/palette"
import { resized } from "Utils/resized"

interface OnboardingFigureProps {
  src: string
  aspectWidth: number
  aspectHeight: number
  caption: string
}

export const OnboardingFigure: ForwardRefExoticComponent<
  OnboardingFigureProps & {
    ref?: React.Ref<HTMLDivElement>
  }
> = forwardRef(({ src, aspectWidth, aspectHeight, caption }, forwardedRef) => {
  const img = resized(src, { width: 400 })

  return (
    <Flex
      ref={forwardedRef as any}
      width="100%"
      height="100%"
      bg="black100"
      flexDirection="column"
      justifyContent="flex-end"
      alignItems="flex-start"
    >
      <ResponsiveBox
        aspectWidth={aspectWidth}
        aspectHeight={aspectHeight}
        maxWidth={400}
        position="relative"
      >
        <Image
          src={img.src}
          srcSet={img.srcSet}
          width="100%"
          height="auto"
          alt=""
          lazyLoad
        />

        <Text
          variant="sm-display"
          color="white100"
          position="absolute"
          right={2}
          bottom={2}
          fontStyle="italic"
        >
          {caption}
        </Text>
      </ResponsiveBox>
    </Flex>
  )
})
