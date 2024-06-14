import {
  Text,
  Flex,
  Box,
  Spacer,
  Join,
  Separator,
  Button,
  GridColumns,
  Column,
  SkeletonText,
  Skeleton,
  SkeletonBox,
  Message,
} from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { SavedSearchAlertsArtworksQuery } from "__generated__/SavedSearchAlertsArtworksQuery.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { EditAlertEntity } from "Apps/Settings/Routes/SavedSearchAlerts/types"
import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { AlertProvider } from "Components/Alert/AlertProvider"
import ArtworkGrid, {
  ArtworkGridPlaceholder,
} from "Components/ArtworkGrid/ArtworkGrid"
import { Modal } from "Components/Alert/Components/Modal/Modal"
import { Media } from "Utils/Responsive"
import {
  CriteriaPills,
  CriteriaPillsPlaceholder,
} from "Components/Alert/Components/CriteriaPills"
import { ModalHeader } from "Components/Alert/Components/Modal/ModalHeader"
import { useJump } from "Utils/Hooks/useJump"

interface AlertArtworksProps {
  alert: NonNullable<SavedSearchAlertsArtworksQuery["response"]["me"]>["alert"]
  onCloseClick?: () => void
  onEditAlertClick: () => void
}

export const AlertArtworks: React.FC<AlertArtworksProps> = ({
  alert,
  onCloseClick,
  onEditAlertClick,
}) => {
  const { jumpTo } = useJump()

  if (!alert || !alert.artworksConnection)
    return <SavedSearchAlertsArtworksPlaseholder onCloseClick={onCloseClick} />

  const count = alert.artworksConnection?.counts?.total
  const href = alert.href

  return (
    <>
      <Media greaterThanOrEqual="md">
        <Box p={4} flex={1}>
          <Join separator={<Spacer y={2} />}>
            <ModalHeader />

            <Flex flexWrap="wrap" gap={1}>
              <CriteriaPills editable={false} />
            </Flex>

            <Separator />

            {count > 0 ? (
              <>
                <Text variant="sm-display" color="black60" mb={4}>
                  {count}
                  {count > 1 ? " works" : " work"} currently on Artsy match your
                  criteria.
                  <Text variant="sm-display" color="black60">
                    See our top picks for you:
                  </Text>
                </Text>
                <Spacer y={2} />

                <ArtworkGrid
                  artworks={alert.artworksConnection}
                  columnCount={2}
                  emptyStateComponent={<ArtworksGridEmptyState />}
                />

                <GridColumns>
                  <Column span={6}>
                    <Button
                      width="100%"
                      // @ts-ignore
                      as={RouterLink}
                      to={href}
                    >
                      See All Matching Works
                    </Button>
                  </Column>
                  <Column span={6}>
                    <Button
                      width="100%"
                      variant="secondaryBlack"
                      onClick={() => {
                        onEditAlertClick()
                        jumpTo("Alerts")
                      }}
                    >
                      Edit Alert
                    </Button>
                  </Column>
                </GridColumns>
              </>
            ) : (
              <>
                <ArtworksGridEmptyState />

                <Button
                  width="100%"
                  variant="secondaryBlack"
                  onClick={() => {
                    onEditAlertClick()
                    jumpTo("Alerts")
                  }}
                >
                  Edit Alert
                </Button>
              </>
            )}
          </Join>
        </Box>
      </Media>

      <Media lessThan="md">
        <Modal onClose={onCloseClick}>
          <Flex mx={2} mb={2} flexDirection="column">
            <Join separator={<Spacer y={2} />}>
              <Flex flexWrap="wrap" gap={1}>
                <CriteriaPills editable={false} />
              </Flex>

              {count > 0 ? (
                <>
                  <Text variant="sm-display" color="black60">
                    {count}
                    {count > 1 ? " works" : " work"} currently on Artsy match
                    your criteria.
                    <Text variant="sm-display" color="black60">
                      See our top picks for you:
                    </Text>
                  </Text>

                  <Spacer y={2} />

                  <ArtworkGrid
                    artworks={alert.artworksConnection}
                    columnCount={2}
                    emptyStateComponent={<ArtworksGridEmptyState />}
                  />
                  <Button
                    // @ts-ignore
                    as={RouterLink}
                    to={href}
                  >
                    See All Matching Works
                  </Button>
                  <Button variant="secondaryBlack" onClick={onEditAlertClick}>
                    Edit Alert
                  </Button>
                </>
              ) : (
                <>
                  <ArtworksGridEmptyState />
                  <Button variant="secondaryBlack" onClick={onEditAlertClick}>
                    Edit Alert
                  </Button>
                </>
              )}
            </Join>
          </Flex>
        </Modal>
      </Media>
    </>
  )
}

const ArtworksGridEmptyState = () => {
  return (
    <Message width="100%" title="No matches">
      There aren’t any works available that meet the criteria at this time.
    </Message>
  )
}

interface SavedSearchAlertsArtworksQueryRendererProps {
  editAlertEntity: EditAlertEntity
  onCloseClick?: () => void
  onEditAlertClick: () => void
}

export const SavedSearchAlertsArtworksFragmentContainer = createFragmentContainer(
  AlertArtworks,
  {
    alert: graphql`
      fragment SavedSearchAlertsArtworks_alert on Alert {
        internalID
        acquireable
        additionalGeneIDs
        artistIDs
        artistSeriesIDs
        atAuction
        attributionClass
        colors
        dimensionRange
        sizes
        width
        height
        inquireableOnly
        locationCities
        majorPeriods
        materialsTerms
        offerable
        partnerIDs
        priceRange
      }
    `,
  }
)

export const SavedSearchAlertsArtworksQueryRenderer: React.FC<SavedSearchAlertsArtworksQueryRendererProps> = ({
  editAlertEntity,
  onCloseClick,
  onEditAlertClick,
}) => {
  return (
    <SystemQueryRenderer<SavedSearchAlertsArtworksQuery>
      query={graphql`
        query SavedSearchAlertsArtworksQuery($id: String!) {
          me {
            alert(id: $id) {
              artworksConnection(first: 10) {
                counts {
                  total
                }
                ...ArtworkGrid_artworks
              }
              href
              ...SavedSearchAlertsArtworks_alert @relay(mask: false)
            }
          }
        }
      `}
      variables={{
        id: editAlertEntity.id,
      }}
      placeholder={
        <SavedSearchAlertsArtworksPlaseholder onCloseClick={onCloseClick} />
      }
      cacheConfig={{ force: true }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props?.me || !props?.me.alert) {
          return (
            <SavedSearchAlertsArtworksPlaseholder onCloseClick={onCloseClick} />
          )
        }

        return (
          <AlertProvider
            initialCriteria={getAllowedSearchCriteria(
              (props.me.alert as unknown) as SearchCriteriaAttributes
            )}
            alertID={props.me.alert.internalID}
            isAlertArtworksView
          >
            <SavedSearchAlertsArtworksFragmentContainer
              alert={props.me.alert}
              onCloseClick={onCloseClick}
              onEditAlertClick={onEditAlertClick}
            />
          </AlertProvider>
        )
      }}
    />
  )
}

const SavedSearchAlertsArtworksPlaseholderContext: React.FC = () => {
  return (
    <Join separator={<Spacer y={2} />}>
      <CriteriaPillsPlaceholder />
      <SkeletonBox display={["none", "block"]}>
        <Separator />
      </SkeletonBox>
      <Flex flexDirection="column">
        <SkeletonText variant="sm-display">
          20 works currently on Artsy match your criteria.
        </SkeletonText>
        <SkeletonText variant="sm-display">
          See our top picks for you:
        </SkeletonText>
        <Spacer y={[4, 2]} />
      </Flex>
      <ArtworkGridPlaceholder columnCount={2} />
    </Join>
  )
}

const SavedSearchAlertsArtworksPlaseholder: React.FC<{
  onCloseClick?: () => void
}> = ({ onCloseClick }) => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <Skeleton p={4}>
          <Text variant="lg" mb={2}>
            View Artworks
          </Text>
          <SavedSearchAlertsArtworksPlaseholderContext />
        </Skeleton>
      </Media>
      <Media lessThan="md">
        <AlertProvider isAlertArtworksView>
          <Modal onClose={onCloseClick}>
            <Skeleton px={2}>
              <SavedSearchAlertsArtworksPlaseholderContext />
            </Skeleton>
          </Modal>
        </AlertProvider>
      </Media>
    </>
  )
}
