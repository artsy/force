import { FC } from "react"
import { graphql, useFragment } from "react-relay"
import { CollectorProfileArtistsAddResult_artist$key } from "__generated__/CollectorProfileArtistsAddResult_artist.graphql"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { Button } from "@artsy/palette"
import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"

interface CollectorProfileArtistsAddResultProps {
  artist: CollectorProfileArtistsAddResult_artist$key
  selected: boolean
  onSelect: (selected: boolean) => void
}

export const CollectorProfileArtistsAddResult: FC<CollectorProfileArtistsAddResultProps> = ({
  artist: _artist,
  selected,
  onSelect,
}) => {
  const artist = useFragment(FRAGMENT, _artist)
  return (
    <EntityHeaderArtistFragmentContainer
      artist={artist}
      displayLink={false}
      FollowButton={
        <Button
          size="small"
          variant={selected ? "primaryBlue" : "secondaryBlack"}
          onClick={() => {
            onSelect(!selected)
          }}
          Icon={selected ? CheckmarkIcon : undefined}
        >
          {selected ? "Selected" : "Select"}
        </Button>
      }
    />
  )
}

const FRAGMENT = graphql`
  fragment CollectorProfileArtistsAddResult_artist on Artist {
    ...EntityHeaderArtist_artist
    internalID
  }
`
