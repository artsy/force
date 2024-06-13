import ArtworkIcon from "@artsy/icons/ArtworkIcon"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import FilterIcon from "@artsy/icons/FilterIcon"
import SearchIcon from "@artsy/icons/SearchIcon"
import { Box, Button, Flex, Join, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useTranslation } from "react-i18next"

interface InfoSectionProps {
  title: string
  body: string
  icon: JSX.Element
}

const InfoSection: React.FC<InfoSectionProps> = props => {
  return (
    <Flex flexDirection="row">
      <Flex alignItems="center" height="20px" width="18px" mr={1}>
        {props.icon}
      </Flex>
      <Box>
        <Text variant="sm" lineHeight="20px">
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
        <Text variant={["lg", "xl"]}>
          {t("settings.alerts.empty.headline.line1")}
        </Text>
        <Text variant={["lg", "xl"]}>
          {t("settings.alerts.empty.headline.line2")}
        </Text>
        <Spacer y={4} />
        <Join separator={<Spacer y={2} />}>
          <InfoSection
            title={t("settings.alerts.empty.search.title")}
            body={t("settings.alerts.empty.search.body")}
            icon={<SearchIcon />}
          />
          <InfoSection
            title={t("settings.alerts.empty.filter.title")}
            body={t("settings.alerts.empty.filter.body")}
            icon={<FilterIcon />}
          />
          <InfoSection
            title={t("settings.alerts.empty.create.title")}
            body={t("settings.alerts.empty.create.body")}
            icon={<BellStrokeIcon />}
          />
          <InfoSection
            title={t("settings.alerts.empty.match.title")}
            body={t("settings.alerts.empty.match.body")}
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
          {t("settings.alerts.empty.button.label")}
        </Button>
      </Flex>
    </Box>
  )
}
