import React, { FC } from "react"

import { MetaTags } from "v2/Components/MetaTags"
import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { NewForYouArtworksGridQueryRenderer } from "v2/Apps/NewForYou/Components/NewForYouArtworksGrid"

export const NewForYouApp: FC = () => {
  return (
    <>
      <Spacer mt={2} />
      <MetaTags title="New For You" />
      <GridColumns>
        <Column span={6}>
          <Text variant="xl" mt={4}>
            New Works For You
          </Text>
        </Column>
        <Column span={6}>
          <Text variant={"md"} mt={6}>
            Description Here Explaining Stuff
          </Text>
        </Column>
      </GridColumns>
      <Spacer mt={4} />
      <NewForYouArtworksGridQueryRenderer />
    </>
  )
}
