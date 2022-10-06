import { Column, Separator } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { UserBidHistory_me$data } from "__generated__/UserBidHistory_me.graphql"
import { SettingsAuctionsLotStandingFragmentContainer } from "./SettingsAuctionsLotStanding"

interface UserBidHistoryProps {
  me: UserBidHistory_me$data
}

export const UserBidHistory: React.FC<UserBidHistoryProps> = ({
  me: { inactiveLotStandings: lotStandings },
}) => {
  if (!lotStandings || lotStandings.length === 0) {
    return <SectionContainer title="Bid History"></SectionContainer>
  }

  return (
    <SectionContainer title="Bid History">
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

export const UserBidHistoryFragmentContainer = createFragmentContainer(
  UserBidHistory,
  {
    me: graphql`
      fragment UserBidHistory_me on Me {
        inactiveLotStandings: lotStandings(live: false) {
          ...SettingsAuctionsLotStanding_lotStanding
        }
      }
    `,
  }
)
