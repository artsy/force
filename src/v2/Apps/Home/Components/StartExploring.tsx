import { Flex, Box, Text, Spacer, Pill } from "@artsy/palette"

import { RouterLink } from "v2/System/Router/RouterLink"

export const StartExploring: React.FC = ({}) => {
  return (
    <>
      <Box>
        <Flex flexDirection={"column"} justifyContent={"center"}>
          <Text variant="xl">Start Exploring</Text>
          <Spacer mt={[1, 2]}>
            <Pill
              variant="filter"
              as={RouterLink}
              // @ts-ignore
              to={"/gene/trending-this-week"}
              my={0.5}
              mr={1}
              disabled={true}
            >
              Trending This Week
            </Pill>
            <Pill
              variant="filter"
              as={RouterLink}
              // @ts-ignore
              to={"/gene/top-auction-lots"}
              my={0.5}
              mr={1}
              disabled={true}
            >
              Top Auction Lots
            </Pill>
            <Pill
              variant="filter"
              as={RouterLink}
              // @ts-ignore
              to={"/gene/black-painters-on-our-radar"}
              my={0.5}
              mr={1}
              disabled={true}
            >
              Black Painters on Our Radar
            </Pill>
            <Pill
              variant="filter"
              as={RouterLink}
              // @ts-ignore
              to={"/gene/finds-under-1000"}
              my={0.5}
              mr={1}
              disabled={true}
            >
              Finds Under $1,000
            </Pill>
            <Pill
              variant="filter"
              as={RouterLink}
              // @ts-ignore
              to={"/gene/trove"}
              my={0.5}
              mr={1}
              disabled={true}
            >
              Trove: Editor's Picks
            </Pill>
            <Pill
              variant="filter"
              as={RouterLink}
              // @ts-ignore
              to={"/gene/iconic-prints"}
              my={0.5}
              mr={1}
              disabled={true}
            >
              Iconic Prints
            </Pill>
            <Pill
              variant="filter"
              as={RouterLink}
              // @ts-ignore
              to={"/gene/artists-on-the-rise"}
              my={0.5}
              mr={1}
              disabled={true}
            >
              Artists on the Rise
            </Pill>
          </Spacer>
        </Flex>
      </Box>
    </>
  )
}
