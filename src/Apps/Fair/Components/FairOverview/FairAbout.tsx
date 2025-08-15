import { Column, GridColumns, HTML, ReadMore, Text } from "@artsy/palette"
import type { FairAbout_fair$data } from "__generated__/FairAbout_fair.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairTimerFragmentContainer as FairTimer } from "./FairTimer"

interface FairAboutProps {
  fair: FairAbout_fair$data
}

const FairAbout: React.FC<React.PropsWithChildren<FairAboutProps>> = ({
  fair,
}) => {
  const { about } = fair

  const isArtsyEditionShop = fair.slug === "the-artsy-edition-shop"

  return (
    <>
      <GridColumns mt={[2, 4]}>
        {!isArtsyEditionShop && (
          <Column span={6}>
            <FairTimer fair={fair} />
          </Column>
        )}

        {about && (
          <Column span={6}>
            {!isArtsyEditionShop && (
              <Text variant="xs" mb={1}>
                About
              </Text>
            )}

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
      slug
    }
  `,
})
