import {
  Box,
  Flex,
  Text,
  Spacer,
  ArtsyMarkBlackIcon,
  ArtsyLogoIcon,
  FullBleed,
  Spinner,
} from "@artsy/palette"
import { SplitLayout } from "Components/SplitLayout"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { useState, useEffect } from "react"
//import { FC } from "react"

// declare variables for each statement (here? or inside?)
// declare and set useState inside of component
// useEffect with setTimeout function inside that sets state after a few seconds
// empty dependency array

export const ArtQuizResultsLoader = () => {
  const { desktop } = useNavBarHeight()

  const calculatingResults = "Calculating Results..."
  const resultsComplete = "Results Complete"

  const [message, setMessage] = useState(calculatingResults)

  useEffect(() => {
    setTimeout(() => {
      setMessage(resultsComplete)
    }, 3000)
  }, [])

  return (
    <FullBleed height={`calc(100vh - ${desktop}px)`}>
      <Box height="100%" padding={0}>
        <SplitLayout
          hideLogo
          left={
            <Flex height="100%" alignItems="center" justifyContent="center">
              <ArtsyMarkBlackIcon height="65px" width="65px" fill="white100" />
            </Flex>
          }
          leftProps={{ display: ["none", "block"] }}
          right={
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
              p={[2, 4]}
            >
              {/* Vertically centers next Box */}
              <Box />
              <Spinner />
              <Box width="100%">
                <Text variant={["xl", "xxl"]}>Art Taste Quiz</Text>

                <Spacer my={2} />

                <Text variant={["md", "lg-display"]}>
                  {message}
                  <Spacer my={4} />
                </Text>
              </Box>
            </Flex>
          }
        />
      </Box>
    </FullBleed>
  )
}
