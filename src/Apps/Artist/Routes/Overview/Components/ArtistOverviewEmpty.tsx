import { Text, GridColumns, Column } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"

export const ArtistOverviewEmpty: React.FC = () => {
  return (
    <GridColumns gridRowGap={2}>
      <Column span={6} start={4}>
        <Text variant="md" textAlign="center">
          There is no overview for this artist at this time.
        </Text>
        <Text variant="md" color="black60" textAlign="center">
          The page will be updated once we have more information. Represent this
          artist?{" "}
          <RouterLink inline to="/gallery-partnerships">
            Become a partner.
          </RouterLink>
        </Text>
      </Column>
    </GridColumns>
  )
}
