import { Button, Flex } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type {
  ConfirmationStepFooterQuery,
  ConfirmationStepFooterQuery$data,
} from "__generated__/ConfirmationStepFooterQuery.graphql"
import type { FC } from "react"
import { graphql } from "react-relay"

import { NUMBER_OF_ARTWORKS_TO_SHOW } from "Components/SavedSearchAlert/ConfirmationArtworksGrid"
import { RouterLink } from "System/Components/RouterLink"

interface ConfirmationStepFooterProps {
  artworksCount: number
  me: ConfirmationStepFooterQuery$data["me"]
  onClose: () => void
}

export const ConfirmationStepFooter: FC<
  React.PropsWithChildren<ConfirmationStepFooterProps>
> = ({ artworksCount, me, onClose }) => {
  const savedSearch = me?.alert

  return (
    <Flex flexDirection={["column", "row"]} gap={1}>
      {artworksCount > NUMBER_OF_ARTWORKS_TO_SHOW && (
        <Button
          width="100%"
          // @ts-ignore
          as={RouterLink}
          to={savedSearch?.href}
          onClick={() => {
            onClose()
          }}
          data-testid="seeAllMatchingWorksButton"
        >
          See all matching works
        </Button>
      )}

      <Button
        width="100%"
        variant="secondaryBlack"
        // @ts-ignore
        as={RouterLink}
        to={"/favorites/alerts"}
        onClick={() => {
          onClose()
        }}
        data-testid="manageYourAlertsButton"
      >
        Manage your alerts
      </Button>
    </Flex>
  )
}

interface ConfirmationStepFooterQueryRendererProps {
  artworksCount: number
  alertID: string
  onClose: () => void
}

export const ConfirmationStepFooterQueryRenderer: FC<
  React.PropsWithChildren<ConfirmationStepFooterQueryRendererProps>
> = props => {
  return (
    <SystemQueryRenderer<ConfirmationStepFooterQuery>
      placeholder={<ConfirmationStepFooterContentPlaceholder />}
      // Temporary workaround internalID is requested because there is a bug in Metaphysics. If a user's field is not requested, the
      // query returns null for savedSearch.
      query={graphql`
        query ConfirmationStepFooterQuery($alertID: String!) {
          me {
            internalID
            alert(id: $alertID) {
              href
            }
          }
        }
      `}
      variables={{
        alertID: props.alertID,
      }}
      render={({ props: relayProps, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!relayProps?.me?.alert) {
          return <ConfirmationStepFooterContentPlaceholder />
        }

        return <ConfirmationStepFooter me={relayProps.me} {...props} />
      }}
    />
  )
}

export const ConfirmationStepFooterContentPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Flex flexDirection={["column", "row"]} gap={1}>
      <Button width="100%" disabled>
        See all matching works
      </Button>

      <Button width="100%" variant="secondaryBlack" disabled>
        Manage your alerts
      </Button>
    </Flex>
  )
}
