import React from "react"
import {
  Box,
  Flex,
  Image,
  Input,
  Join,
  MagnifyingGlassIcon,
  Spacer,
  Text,
  breakpoints,
} from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"

export const GetPriceEstimate: React.FC = () => {
  return (
    <SectionContainer background="black5">
      <Flex
        width="100%"
        maxWidth={breakpoints.xl}
        flexDirection={["column", "column", "column", "row"]}
        justifyContent="center"
      >
        <Flex
          width={["100%", "100%", "100%", "40%"]}
          flexDirection="column"
          alignItems={["center", "center", "center", "normal"]}
          textAlign={["center", "center", "center", "left"]}
        >
          <Text variant="largeTitle">Get a Price Estimate</Text>
          <Spacer my={1} />
          <Text variant="subtitle" color="black60">
            Discover the potential of reselling an <br />
            artwork you own.
          </Text>

          <Spacer mt={3} />

          {/* TODO: Wire up search bar */}
          <Flex position="relative" maxWidth={360} width="100%">
            <Input
              height={40}
              placeholder="Tell me the value of my…"
              style={{ boxShadow: "0px 2px 10px rgba(0,0,0,0.1)" }}
            />
            <MagnifyingGlassIcon position="absolute" right="2%" top={1} />
          </Flex>
        </Flex>

        <Spacer mb={[4, 4, 4, 0]} />

        <Flex
          width={["100%", "100%", "100%", "60%"]}
          alignItems="center"
          justifyContent="center"
        >
          <Join separator={<Spacer mr={5} />}>
            <ArtworkItem
              image={
                <Image
                  width={165}
                  height="auto"
                  src="https://d32dm0rphc51dk.cloudfront.net/3mOXPUFZdK7G6kejFVBSbA/large.jpg"
                />
              }
              artistName="Andy Warhol"
              salePrice="300k"
            />

            <ArtworkItem
              image={
                <Image
                  width={200}
                  height="auto"
                  src="https://d32dm0rphc51dk.cloudfront.net/rc-gsfGM9zs2aDXTKY9pOg/large.jpg"
                />
              }
              artistName="Katharina Grosse"
              salePrice="220k"
            />

            <ArtworkItem
              image={
                <Image
                  width={163}
                  height="auto"
                  src="https://d32dm0rphc51dk.cloudfront.net/_5zMF8NB0M49MMqCqVBcSg/large.jpg"
                />
              }
              artistName="George Condo"
              salePrice="120k"
            />
          </Join>
        </Flex>
      </Flex>
    </SectionContainer>
  )
}

const ArtworkItem: React.FC<{
  image: JSX.Element
  artistName: string
  salePrice: string
}> = ({ image, artistName, salePrice }) => {
  return (
    <Box>
      {image}
      <Spacer my={1} />
      <Text variant="small">{artistName}</Text>
      <Text variant="small">Average Sale Price:</Text>
      <Text variant="largeTitle">{salePrice}</Text>
    </Box>
  )
}
