import ArtworkIcon from "@artsy/icons/ArtworkIcon"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import FilterIcon from "@artsy/icons/FilterIcon"
import SearchIcon from "@artsy/icons/SearchIcon"
import { Box, Button, Flex, Join, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { useTranslation } from "react-i18next"

interface InfoSectionProps {
  title: string
  body: string
  icon: JSX.Element
}

const InfoSection: React.FC<InfoSectionProps> = props => {
  return (
    <Flex flexDirection="row" alignItems="top">
      {props.icon}
      <Box>
        <Text variant="sm" lineHeight={1}>
          {props.title}
        </Text>
        <Text variant="sm" color="black60">
          {props.body}
        </Text>
      </Box>
    </Flex>
  )
}

export const SavedSearchAlertsEmptyResults = () => {
  const { t } = useTranslation()

  return (
    <Box mx="auto" px={[2, 0]} justifyContent="center" maxWidth="441px">
      <Flex flexDirection="column" alignItems="left">
        <Text variant={["lg", "xl"]}>Hunting for a</Text>
        <Text variant={["lg", "xl"]}>particular artwork?</Text>
        <Spacer y={4} />
        <Join separator={<Spacer y={2} />}>
          <InfoSection
            title={t("settings.alerts.empty.search.title")}
            body={t("settings.alerts.empty.search.body")}
            icon={<SearchIcon mr={1} />}
          />
          <InfoSection
            title={t("settings.alerts.empty.filter.title")}
            body={t("settings.alerts.empty.filter.body")}
            icon={<FilterIcon mr={1} />}
          />
          <InfoSection
            title={t("settings.alerts.empty.create.title")}
            body={t("settings.alerts.empty.create.body")}
            icon={<BellStrokeIcon mr={1} />}
          />
          <InfoSection
            title={t("settings.alerts.empty.match.title")}
            body={t("settings.alerts.empty.match.body")}
            icon={<ArtworkIcon mr={1} />}
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
