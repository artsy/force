import { ContextModule, Intent } from "@artsy/cohesion"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import { Button, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { SavedSearchCreateAlertButtonContainer } from "Components/SavedSearchAlert/Components/SavedSearchCreateAlertButtonContainer"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistWorksForSaleEmpty_artist$data } from "__generated__/ArtistWorksForSaleEmpty_artist.graphql"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { useAlert } from "Components/Alert"
import { useFeatureFlag } from "System/useFeatureFlag"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"

interface ArtistWorksForSaleEmptyProps {
  artist: ArtistWorksForSaleEmpty_artist$data
}

const ArtistWorksForSaleEmpty: FC<ArtistWorksForSaleEmptyProps> = ({
  artist,
}) => {
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const { filters } = useArtworkFilterContext()

  const { alertComponent, showAlert } = useAlert({
    authDialogOptions: {
      options: {
        title: "Sign up to create your alert",
        afterAuthAction: {
          action: "createAlert",
          kind: "artist",
          objectId: artist.internalID,
        },
      },
      analytics: {
        contextModule: ContextModule.artworkGrid,
        intent: Intent.createAlert,
      },
    },
    initialCriteria: filters,
  })
  const newAlertModalEnabled = useFeatureFlag("onyx_artwork_alert_modal_v2")

  return (
    <>
      <Spacer y={[2, 0]} />

      <GridColumns>
        <Column span={6} start={4} textAlign="center">
          <Text variant="md">Get notified when new works are available</Text>

          <Text variant="md" color="black60">
            There are currently no works for sale for this artist. Create an
            alert, and we’ll let you know when new works are added.
          </Text>

          <Spacer y={2} />

          {newAlertModalEnabled ? (
            <>
              <Button
                onClick={showAlert}
                Icon={BellStrokeIcon}
                variant="secondaryBlack"
              >
                Create Alert
              </Button>
              {alertComponent}
            </>
          ) : (
            <SavedSearchCreateAlertButtonContainer
              entity={{
                owner: {
                  id: contextPageOwnerId as string,
                  name: artist.name as string,
                  slug: contextPageOwnerSlug as string,
                  type: contextPageOwnerType,
                },
                defaultCriteria: {
                  artistIDs: [
                    {
                      displayValue: artist.name as string,
                      value: artist.internalID,
                    },
                  ],
                },
              }}
              criteria={{ artistIDs: [artist.internalID] }}
              authDialogOptions={{
                options: {
                  title: "Sign up to create your alert",
                  afterAuthAction: {
                    action: "createAlert",
                    kind: "artist",
                    objectId: artist.internalID,
                  },
                },
                analytics: {
                  contextModule: ContextModule.artworkGrid,
                  intent: Intent.createAlert,
                },
              }}
              renderButton={({ onClick }) => (
                <Button
                  onClick={onClick}
                  Icon={BellStrokeIcon}
                  variant="secondaryBlack"
                >
                  Create Alert
                </Button>
              )}
            />
          )}
        </Column>
      </GridColumns>
    </>
  )
}

export const ArtistWorksForSaleEmptyFragmentContainer = createFragmentContainer(
  ArtistWorksForSaleEmpty,
  {
    artist: graphql`
      fragment ArtistWorksForSaleEmpty_artist on Artist {
        internalID
        name
      }
    `,
  }
)
