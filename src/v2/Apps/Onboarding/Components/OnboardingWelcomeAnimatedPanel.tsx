import { Box, Flex, Image, ResponsiveBox } from "@artsy/palette"
import { forwardRef } from "react"
import styled, { keyframes } from "styled-components"

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
          {[...new Array(3)].map((_, col) => {
            const Component = col % 2 === 0 ? Down : Up

            return (
              <Component
                key={col}
                color="white"
                width={250}
                ml={col === 0 ? 0 : 2}
              >
                {[...new Array(6)].map((_, row) => (
                  <ResponsiveBox
                    key={row}
                    aspectWidth={3}
                    aspectHeight={4}
                    maxWidth="100%"
                    bg="black60"
                    mt={2}
                  >
                    <Image
                      src={`https://picsum.photos/seed/${col}:${row}/300/400`}
                      srcSet={`https://picsum.photos/seed/${col}:${row}/300/400 1x, https://picsum.photos/seed/${col}:${row}/600/800 2x`}
                      width="100%"
                      height="100%"
                      alt=""
                    />
                  </ResponsiveBox>
                ))}

                {/* Should be a copy of the previous images. We transform these 50% for a seamless loop */}
                {[...new Array(6)].map((_, row) => (
                  <ResponsiveBox
                    key={`${row}--copy`}
                    aspectWidth={3}
                    aspectHeight={4}
                    maxWidth="100%"
                    bg="black60"
                    mt={2}
                  >
                    <Image
                      src={`https://picsum.photos/seed/${col}:${row}/300/400`}
                      srcSet={`https://picsum.photos/seed/${col}:${row}/300/400 1x, https://picsum.photos/seed/${col}:${row}/600/800 2x`}
                      width="100%"
                      height="100%"
                      alt=""
                    />
                  </ResponsiveBox>
                ))}
              </Component>
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
