import * as React from "react"
import {
  Column,
  GridColumns,
  HTML,
  ReadMore,
  Spacer,
  Text,
} from "@artsy/palette"
import { FairTimerFragmentContainer as FairTimer } from "./FairTimer"
import { createFragmentContainer, graphql } from "react-relay"
import { FairAbout_fair$data } from "v2/__generated__/FairAbout_fair.graphql"

interface FairAboutProps {
  fair: FairAbout_fair$data
}

const FairAbout: React.FC<FairAboutProps> = ({ fair }) => {
  const { about } = fair

  return (
    <>
      <GridColumns mt={[2, 4]}>
        <Column span={6}>
          <FairTimer fair={fair} />
        </Column>

        {about && (
          <Column span={6}>
            <Text variant="md" textTransform="uppercase">
              About
            </Text>
            <Spacer mt={2} />

            <HTML variant="sm">
              <ReadMore maxChars={480} content={about} />
            </HTML>
          </Column>
        )}
      </GridColumns>
    </>
  )
}

export const FairAboutFragmentContainer = createFragmentContainer(FairAbout, {
  fair: graphql`
    fragment FairAbout_fair on Fair {
      ...FairTimer_fair
      about(format: HTML)
    }
  `,
})
