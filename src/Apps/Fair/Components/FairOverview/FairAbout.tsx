import * as React from "react"
import { Column, GridColumns, HTML, ReadMore, Text } from "@artsy/palette"
import { FairTimerFragmentContainer as FairTimer } from "./FairTimer"
import { createFragmentContainer, graphql } from "react-relay"
import { FairAbout_fair } from "__generated__/FairAbout_fair.graphql"

interface FairAboutProps {
  fair: FairAbout_fair
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
            <Text variant="xs" mb={1}>
              About
            </Text>

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
