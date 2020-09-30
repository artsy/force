import { Checkbox, Flex, Toggle } from "@artsy/palette"
import React, { FC } from "react"
import { get } from "v2/Utils/get"

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

  const count = get(filterContext, f => f.counts.followedArtists, 0)

  return (
    <Toggle label="Artists" expanded>
      <Flex flexDirection="column">
        <Checkbox disabled={!count} {...props}>
          <OptionText>Artists I Follow ({count})</OptionText>
        </Checkbox>
      </Flex>
    </Toggle>
  )
}
