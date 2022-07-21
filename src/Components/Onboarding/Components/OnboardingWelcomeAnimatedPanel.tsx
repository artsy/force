import { Box, Flex, Image, ResponsiveBox } from "@artsy/palette"
import { FC, forwardRef } from "react"
import styled, { keyframes } from "styled-components"
import { cropped } from "Utils/resized"

export const OnboardingWelcomeAnimatedPanel = forwardRef(
  (_props, forwardedRef) => {
    return (
      <Box
        ref={forwardedRef as any}
        width="100%"
        height="100%"
        position="relative"
        overflow="hidden"
        style={{
          pointerEvents: "none",
          userSelect: "none",
          transform: "translateZ(0)",
        }}
      >
        <Flex
          bg="black100"
          position="absolute"
          top={0}
          left={0}
          style={{
            transform: "rotate(33.33deg) translate(10px, -25%)",
            transformOrigin: "top left",
          }}
        >
          {COLUMNS.map((column, col) => {
            const Direction = col % 2 === 0 ? Down : Up

            return (
              <Direction key={col} width={250} ml={col === 0 ? 0 : 2}>
                <Duplicate>
                  {column.map((img, row) => (
                    <ResponsiveBox
                      key={[col, row].join("-")}
                      aspectWidth={300}
                      aspectHeight={400}
                      maxWidth="100%"
                      bg="black60"
                      mt={2}
                    >
                      <Image
                        src={img.src}
                        srcSet={img.srcSet}
                        width="100%"
                        height="100%"
                        alt=""
                      />
                    </ResponsiveBox>
                  ))}
                </Duplicate>
              </Direction>
            )
          })}
        </Flex>
      </Box>
    )
  }
)

const DURATION = "120s"

const up = keyframes`
  0% { transform: translateY(0%) }
  100% { transform: translateY(-50%); }
`

const Up = styled(Box)`
  animation: ${up} ${DURATION} linear infinite;
`

const down = keyframes`
  0% { transform: translateY(-50%) }
  100% { transform: translateY(0%); }
`

const Down = styled(Box)`
  animation: ${down} ${DURATION} linear infinite;
`

const Duplicate: FC = ({ children }) => {
  return (
    <>
      {children}
      {children}
      {children}
      {children}
    </>
  )
}

const IMAGES = [
  {
    width: 1199,
    height: 1570,
    src: "https://files.artsy.net/images/warhol-grid.jpg",
  },
  {
    width: 2801,
    height: 3667,
    src: "https://files.artsy.net/images/wang-grid.jpg",
  },
  {
    width: 855,
    height: 1119,
    src: "https://files.artsy.net/images/katz-grid.jpg",
  },
  {
    width: 1162,
    height: 1522,
    src: "https://files.artsy.net/images/kahlo-grid.jpg",
  },
  {
    width: 882,
    height: 1155,
    src: "https://files.artsy.net/images/hirst-grid.jpg",
  },
  {
    width: 1876,
    height: 2457,
    src: "https://files.artsy.net/images/future-kid-grid.jpg",
  },
  {
    width: 2830,
    height: 3706,
    src: "https://files.artsy.net/images/cohn-grid.jpg",
  },
  {
    width: 2183,
    height: 2859,
    src: "https://files.artsy.net/images/adesina-grid.jpg",
  },
  {
    width: 1544,
    height: 2058,
    src: "https://files.artsy.net/images/boafo-grid.jpg",
  },
]

const CROPS = IMAGES.map(({ src }) => {
  return cropped(src, { width: 250, height: 333 })
})

const COLUMNS = [
  [CROPS[0], CROPS[1], CROPS[2]],
  [CROPS[3], CROPS[4], CROPS[5]],
  [CROPS[6], CROPS[7], CROPS[8]],
]
