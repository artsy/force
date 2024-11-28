import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { Box, Clickable, Flex, Spacer, Sup, Text } from "@artsy/palette"
import { SavedSearchAlertListItem_item$data } from "__generated__/SavedSearchAlertListItem_item.graphql"
import { EditAlertEntity } from "Apps/Settings/Routes/SavedSearchAlerts/types"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useJump } from "Utils/Hooks/useJump"

export type SavedSearchAlertListItemVariant = "active" | "inactive"

interface SavedSearchAlertListItemProps {
  item: SavedSearchAlertListItem_item$data
  variant?: SavedSearchAlertListItemVariant
  onEditAlertClick: (entity: EditAlertEntity) => void
  onViewArtworksClick: (entity: EditAlertEntity) => void
}

export const SavedSearchAlertListItem: React.FC<React.PropsWithChildren<SavedSearchAlertListItemProps>> = ({
  item,
  variant,
  onEditAlertClick,
  onViewArtworksClick,
}) => {
  const { jumpTo } = useJump()
  const { trackEvent } = useTracking()

  const matchingArtworksCount = item.artworksConnection?.counts?.total

  return (
    <Box
      key={item.internalID}
      px={[2, 4]}
      pr={[2, 2]}
      py={4}
      bg={variant === "active" ? "black5" : "white100"}
    >
      <Flex
        flexDirection={["column", "row"]}
        alignItems={["stretch", "center"]}
        justifyContent="space-between"
      >
        <Flex
          mr={2}
          flexDirection={["column", "row"]}
          alignItems={["stretch", "center"]}
          flex={1}
          overflow="hidden"
        >
          <Flex flexDirection="column">
            <Text
              variant="lg-display"
              textColor={[
                "black100",
                variant === "active" ? "black100" : "black60",
              ]}
              style={{ overflowWrap: "break-word" }}
            >
              {item.title}
            </Text>
            <Text
              variant="md"
              textColor={[
                "black100",
                variant === "active" ? "black100" : "black60",
              ]}
              style={{ overflowWrap: "break-word" }}
            >
              {item.subtitle}
            </Text>
          </Flex>
          <Spacer x={2} y={2} />
        </Flex>
        <Flex
          flexDirection="row"
          alignItems={["flex-start", "center"]}
          minWidth="200px"
        >
          <Text
            variant="sm"
            textColor={[
              "black100",
              variant === "active" ? "black100" : "black60",
            ]}
          >
            <Clickable
              textDecoration="underline"
              onClick={() => {
                trackEvent({
                  action_type: ActionType.clickEditAlert,
                  alert_id: item.internalID,
                  context_module: ContextModule.alertsList,
                  context_owner_type: OwnerType.savedSearches,
                })
                onEditAlertClick({
                  id: item.internalID,
                  name: item.settings?.name ?? undefined,
                  artistIds: item.artistIDs as string[],
                })
                jumpTo("Alerts")
              }}
            >
              Edit
            </Clickable>
          </Text>
          <Spacer x={2} />
          <Text
            variant="sm"
            textColor={[
              "black100",
              variant === "active" ? "black100" : "black60",
            ]}
          >
            <Clickable
              onClick={() => {
                trackEvent({
                  action_type: ActionType.clickedArtworkGroup,
                  alert_id: item.internalID,
                  context_module: ContextModule.alertsList,
                  context_owner_type: OwnerType.savedSearches,
                })
                onViewArtworksClick({
                  id: item.internalID,
                  name: item.settings?.name ?? undefined,
                  artistIds: item.artistIDs as string[],
                })
                jumpTo("Alerts")
              }}
              textDecoration="underline"
            >
              View Artworks
            </Clickable>
            &nbsp;
            <Sup
              textColor={["brand", variant === "active" ? "brand" : "black60"]}
            >
              {matchingArtworksCount}
            </Sup>
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export const SavedSearchAlertListItemFragmentContainer = createFragmentContainer(
  SavedSearchAlertListItem,
  {
    item: graphql`
      fragment SavedSearchAlertListItem_item on Alert {
        internalID
        artistIDs
        artistSeriesIDs
        href
        title: displayName(only: [artistIDs])
        subtitle: displayName(except: [artistIDs])
        artworksConnection(first: 10) {
          counts {
            total
          }
        }
        settings {
          name
        }
      }
    `,
  }
)
