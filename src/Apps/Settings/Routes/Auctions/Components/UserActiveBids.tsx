import { RouterLink } from "System/Components/RouterLink"
import { Button, Column, Separator } from "@artsy/palette"
import type { UserActiveBids_me$data } from "__generated__/UserActiveBids_me.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { SettingsAuctionsLotStandingFragmentContainer } from "./SettingsAuctionsLotStanding"

interface UserActiveBidsProps {
  me: UserActiveBids_me$data
}

export const UserActiveBids: React.FC<
  React.PropsWithChildren<UserActiveBidsProps>
> = ({ me: { activeLotStandings: lotStandings } }) => {
  if (!lotStandings || lotStandings.length === 0) {
    return (
      <SectionContainer
        title="Active Bids"
        emptyStateNote="You have no active bids."
        emptyStateAction={
          <RouterLink to="/auctions">
            <Button mt={4} variant="primaryBlack">
              Explore Auctions
            </Button>
          </RouterLink>
        }
      />
    )
  }

  return (
    <SectionContainer title="Active Bids">
      {lotStandings.map((lotStanding, i) => {
        if (!lotStanding) return null

        return (
          <React.Fragment key={i}>
            <SettingsAuctionsLotStandingFragmentContainer
              lotStanding={lotStanding}
            />

            {i !== lotStandings.length - 1 && (
              <Column span={12}>
                <Separator />
              </Column>
            )}
          </React.Fragment>
        )
      })}
    </SectionContainer>
  )
}

export const UserActiveBidsFragmentContainer = createFragmentContainer(
  UserActiveBids,
  {
    me: graphql`
      fragment UserActiveBids_me on Me {
        activeLotStandings: lotStandings(live: true) {
          ...SettingsAuctionsLotStanding_lotStanding
        }
      }
    `,
  },
)
