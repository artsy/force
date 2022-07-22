import * as React from "react"
import { Column, GridColumns } from "@artsy/palette"
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"

export const FairExhibitorsGroupPlaceholder: React.FC = () => {
  return (
    <GridColumns>
      {[...new Array(4)].map((_, i) => {
        return (
          <Column key={i} span={[12, 6, 3]}>
            <EntityHeaderPlaceholder displayAvatar={false} />
          </Column>
        )
      })}
    </GridColumns>
  )
}
