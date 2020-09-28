import { Checkbox, Flex, Toggle } from "@artsy/palette"
import React, { FC } from "react"

import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"

export const FollowedArtistsFilter: FC = () => {
  const filterContext = useArtworkFilterContext()

  const props = {
    onSelect: value =>
      filterContext.setFilter("includeArtworksByFollowedArtists", value),
    selected: Boolean(
      filterContext.currentlySelectedFilters()[
        "includeArtworksByFollowedArtists"
      ]
    ),
  }

  return (
    <Toggle label="Artists" expanded>
      <Flex flexDirection="column">
        <Checkbox {...props}>
          <OptionText>
            Artists I Follow ({filterContext.counts.followedArtists})
          </OptionText>
        </Checkbox>
      </Flex>
    </Toggle>
  )
}
