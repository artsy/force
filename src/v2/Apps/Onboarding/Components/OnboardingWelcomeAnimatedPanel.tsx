import { Box, Flex, Image, ResponsiveBox } from "@artsy/palette"
import { chunk } from "lodash"
import { FC, forwardRef } from "react"
import styled, { keyframes } from "styled-components"
import { cropped } from "v2/Utils/resized"

export const OnboardingWelcomeAnimatedPanel = forwardRef(
  (_props, forwardedRef) => {
    return (
      <Box
        ref={forwardedRef as any}
        width="100%"
        height="100%"
        position="relative"
        overflow="hidden"
        style={{ pointerEvents: "none", userSelect: "none" }}
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

const DURATION = "60s"

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
    </>
  )
}

// TODO: Will be replaced with alternate crops
const IMAGES = [
  {
    width: 2821,
    height: 2859,
    src:
      "https://files.artsy.net/images/adegboyega-adesina-painting-of-rechel.jpg",
  },
  {
    width: 750,
    height: 1119,
    src: "https://files.artsy.net/images/alex-katz-yellow-flags-3-62.jpeg",
  },
  {
    width: 1840,
    height: 2058,
    src: "https://files.artsy.net/images/amoako-boafo-tasia-cobbinah.png",
  },
  {
    width: 1289,
    height: 2016,
    src:
      "https://files.artsy.net/images/andy-warhol-cow-f-and-s-ii-dot-12a-1.jpeg",
  },
  {
    width: 1590,
    height: 1002,
    src: "https://files.artsy.net/images/andy-warhol-dollars-4.jpeg",
  },
  {
    width: 3600,
    height: 2880,
    src:
      "https://files.artsy.net/images/caroline-larsen-deco-bouquet-with-pink-background.jpeg",
  },
  {
    width: 622,
    height: 772,
    src: "https://files.artsy.net/images/damien-hirst-h9-1-justice-2024.jpeg",
  },
  {
    width: 2121,
    height: 2906,
    src:
      "https://files.artsy.net/images/damien-hirst-the-wonder-of-you-your-heart-1.jpeg",
  },
  {
    width: 1200,
    height: 1522,
    src:
      "https://files.artsy.net/images/frida-kahlo-autorretrato-con-chango-y-loro.jpeg",
  },
  {
    width: 4500,
    height: 3713,
    src:
      "https://files.artsy.net/images/genevieve-cohn-ill-make-a-mountain-out-of-you-yet.jpeg",
  },
  {
    width: 1500,
    height: 1703,
    src: "https://files.artsy.net/images/super-future-kid-hazy-daisy.jpeg",
  },
  {
    width: 2765,
    height: 3667,
    src:
      "https://files.artsy.net/images/ziping-wang-the-snowflake-that-comes-alive.jpeg",
  },
]

const CROPS = IMAGES.map(({ src }) => {
  return cropped(src, { width: 300, height: 400 })
})

const columns = <T,>(xs: T[], n: number): T[][] => {
  const take = Math.ceil(xs.length / n)
  return chunk(xs, take)
}

const COLUMNS = columns(CROPS, 3)
