import { Column, GridColumns, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"

export const ArtistOverviewEmpty: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <GridColumns gridRowGap={2}>
      <Column span={6} start={4}>
        <Text variant="md" textAlign="center">
          We‘ll update this page when more information is available.
        </Text>

        <Text variant="md" color="mono60" textAlign="center">
          Do you represent this artist?{" "}
          <RouterLink inline to="/gallery-partnerships">
            Become a partner.
          </RouterLink>
        </Text>
      </Column>
    </GridColumns>
  )
}
