import { resized } from "Utils/resized"
import { Flex, Image, ResponsiveBox, Text } from "@artsy/palette"
import { forwardRef } from "react"

interface OnboardingFigureProps {
  src: string
  aspectWidth: number
  aspectHeight: number
  caption: string
}

export const OnboardingFigure = forwardRef(
  (
    {
      src,
      aspectWidth,
      aspectHeight,
      caption,
    }: OnboardingFigureProps & {
      ref?: React.Ref<HTMLDivElement>
    },
    forwardedRef,
  ) => {
    const img = resized(src, { width: 400 })

    return (
      <Flex
        ref={forwardedRef as any}
        width="100%"
        height="100%"
        bg="mono100"
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
          />

          <Text
            variant="sm-display"
            color="mono0"
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
  },
)
