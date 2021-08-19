import React from "react"
import { Column, GridColumns, Separator, Text } from "@artsy/palette"

export const ArtsyMissionStatement: React.FC = () => {
  return (
    <>
      <GridColumns>
        <Column span={8} start={3} py={4}>
          <Text variant="xl" textAlign="center">
            We connect the world's most innovative art collectors and sellers in
            one place.
          </Text>
        </Column>
      </GridColumns>

      <Separator />
    </>
  )
}
