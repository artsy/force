import _BasicCheckbox from "./BasicCheckbox"
import PropTypes from "prop-types"
import block from "bem-cn-lite"
import { connect } from "react-redux"
import { contains } from "underscore"
import { updateArtistParams } from "desktop/apps/auction/actions/artworkBrowser"

// FIXME: Rewire
let BasicCheckbox = _BasicCheckbox

function ArtistFilter(props) {
  const {
    aggregatedArtists,
    allArtists,
    allArtistsSelected,
    artistIds,
    artistsYouFollow,
    includeArtworksByFollowedArtists,
    numArtistsYouFollow,
    updateArtistParamsAction,
    user,
  } = props

  const b = block("auction-ArtistFilter")

  return (
    <div className={b()}>
      <div className={b("title")}>Artists</div>

      {user && (
        <div className={b("artists-you-follow")}>
          <BasicCheckbox
            key={artistsYouFollow.id}
            item={artistsYouFollow}
            onClick={updateArtistParamsAction}
            checked={includeArtworksByFollowedArtists}
            disabled={numArtistsYouFollow === 0}
          />
        </div>
      )}
      <BasicCheckbox
        key={allArtists.id}
        item={allArtists}
        onClick={updateArtistParamsAction}
        checked={allArtistsSelected}
      />
      {aggregatedArtists.map(agg => {
        const artistSelected = contains(artistIds, agg.id)

        return (
          <BasicCheckbox
            key={agg.id}
            item={agg}
            onClick={updateArtistParamsAction}
            checked={artistSelected}
          />
        )
      })}
    </div>
  )
}

ArtistFilter.propTypes = {
  aggregatedArtists: PropTypes.array.isRequired,
  allArtists: PropTypes.object.isRequired,
  allArtistsSelected: PropTypes.bool.isRequired,
  artistIds: PropTypes.array.isRequired,
  artistsYouFollow: PropTypes.object.isRequired,
  includeArtworksByFollowedArtists: PropTypes.bool.isRequired,
  numArtistsYouFollow: PropTypes.number,
  updateArtistParamsAction: PropTypes.func.isRequired,
  user: PropTypes.object,
}

const mapStateToProps = state => {
  const {
    aggregatedArtists,
    filterParams,
    numArtistsYouFollow,
    user,
  } = state.artworkBrowser

  const artistIds = filterParams.artist_ids
  const includeArtworksByFollowedArtists =
    filterParams.include_artworks_by_followed_artists
  const allArtists = { id: "artists-all", name: "All" }
  const allArtistsSelected =
    artistIds.length === 0 && !includeArtworksByFollowedArtists
  const countDisplay = numArtistsYouFollow > 0 ? numArtistsYouFollow : undefined
  const artistsYouFollow = {
    id: "artists-you-follow",
    count: countDisplay,
    name: "Artists You Follow",
  }

  return {
    aggregatedArtists,
    allArtists,
    allArtistsSelected,
    artistIds,
    artistsYouFollow,
    includeArtworksByFollowedArtists,
    numArtistsYouFollow,
    user,
  }
}

const mapDispatchToProps = {
  updateArtistParamsAction: updateArtistParams,
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistFilter)

export const test = { ArtistFilter }
