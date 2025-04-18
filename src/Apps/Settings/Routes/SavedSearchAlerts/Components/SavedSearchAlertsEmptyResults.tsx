import ArtworkIcon from "@artsy/icons/ArtworkIcon"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import FilterIcon from "@artsy/icons/FilterIcon"
import SearchIcon from "@artsy/icons/SearchIcon"
import { Box, Button, Flex, Join, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"

interface InfoSectionProps {
  title: string
  body: string
  icon: JSX.Element
}

const InfoSection: React.FC<
  React.PropsWithChildren<InfoSectionProps>
> = props => {
  return (
    <Flex flexDirection="row">
      <Flex alignItems="center" height="20px" width="18px" mr={1}>
        {props.icon}
      </Flex>
      <Box>
        <Text variant="sm" lineHeight="20px">
          {props.title}
        </Text>
        <Text variant="sm" color="mono60">
          {props.body}
        </Text>
      </Box>
    </Flex>
  )
}

export const SavedSearchAlertsEmptyResults = () => {
  return (
    <Box mx="auto" px={[2, 0]} justifyContent="center" maxWidth="441px">
      <Flex flexDirection="column" alignItems="left">
        <Text variant={["lg", "xl"]}>Hunting for a</Text>
        <Text variant={["lg", "xl"]}>particular artwork?</Text>
        <Spacer y={4} />
        <Join separator={<Spacer y={2} />}>
          <InfoSection
            title="Find your artist"
            body="On an artist page, go to the Works for Sale section."
            icon={<SearchIcon />}
          />
          <InfoSection
            title="Filter"
            body="Set the filters for any search criteria you have, like price, medium or size."
            icon={<FilterIcon />}
          />
          <InfoSection
            title="Create alert"
            body="When you’re ready, click “Create Alert”."
            icon={<BellStrokeIcon />}
          />
          <InfoSection
            title="Get a match"
            body="Get notifications when there’s a match."
            icon={<ArtworkIcon />}
          />
        </Join>
        <Spacer y={4} />
        <Button
          // @ts-ignore
          as={RouterLink}
          to="/artists"
          width="100%"
          size="large"
          variant="secondaryNeutral"
        >
          Explore Artists
        </Button>
      </Flex>
    </Box>
  )
}
