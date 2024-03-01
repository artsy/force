import { Box, Clickable, Flex, Spacer, Sup, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { SavedSearchAlertListItem_item$data } from "__generated__/SavedSearchAlertListItem_item.graphql"
import { EditAlertEntity } from "Apps/Settings/Routes/SavedSearchAlerts/types"
import { Media } from "Utils/Responsive"

export type SavedSearchAlertListItemVariant = "active" | "inactive"

interface SavedSearchAlertListItemProps {
  item: SavedSearchAlertListItem_item$data
  variant?: SavedSearchAlertListItemVariant
  onEditAlertClick: (entity: EditAlertEntity) => void
}

export const SavedSearchAlertListItem: React.FC<SavedSearchAlertListItemProps> = ({
  item,
  variant,
  onEditAlertClick,
}) => {
  const viewAllHref = item.href
  const matchingArtworksCount = item.artworksConnection?.counts?.total

  const TextWrapper = ({ children, textVariant }) => (
    <>
      <Media greaterThanOrEqual="md">
        <Text
          variant={textVariant}
          color={variant === "active" ? "black100" : "black60"}
          style={{ overflowWrap: "break-word" }}
        >
          {children}
        </Text>
      </Media>
      <Media lessThan="md">
        <Text
          variant={textVariant}
          color="black100"
          style={{ overflowWrap: "break-word" }}
        >
          {children}
        </Text>
      </Media>
    </>
  )

  return (
    <Box
      key={item.internalID}
      px={[2, 4]}
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
            <TextWrapper textVariant="lg-display">{item.title}</TextWrapper>
            <TextWrapper textVariant="md">{item.subtitle}</TextWrapper>
          </Flex>
          <Spacer x={2} y={2} />
        </Flex>
        <Flex flexDirection="row" alignItems={["flex-start", "center"]}>
          <TextWrapper textVariant="sm">
            <Clickable
              textDecoration="underline"
              onClick={() => {
                onEditAlertClick({
                  id: item.internalID,
                  name: item.settings?.name ?? undefined,
                  artistIds: item.artistIDs as string[],
                })
              }}
            >
              Edit
            </Clickable>
          </TextWrapper>
          <Spacer x={2} />
          <TextWrapper textVariant="sm">
            <RouterLink to={viewAllHref} textDecoration="underline">
              View Artworks
            </RouterLink>
            <Sup color="brand">{matchingArtworksCount}</Sup>
          </TextWrapper>
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
        artworksConnection(first: 1) {
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
