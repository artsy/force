import PropTypes from "prop-types"
import _BidStatus from "./BidStatus"
import block from "bem-cn-lite"
import { get } from "lodash"
import titleAndYear from "desktop/apps/auction/utils/titleAndYear"
import { connect } from "react-redux"

// FIXME: Rewire
let BidStatus = _BidStatus

function MasonryArtwork(props) {
  const {
    saleArtwork,
    artistDisplay,
    date,
    image,
    isAuction,
    isClosed,
    lotLabel,
    sale_message,
    title,
  } = props

  const b = block("auction-page-MasonryArtwork")

  return (
    <a href={`/artwork/${saleArtwork.id}`} className={b()}>
      <div>
        <img className={b("image")} src={image} alt={title} />
      </div>

      {isAuction ? (
        <div className={b("lot-number")}>Lot {lotLabel}</div>
      ) : (
        <div className={b("sale-message")}>{sale_message}</div>
      )}

      <div className={b("artists")}>{artistDisplay}</div>

      <div
        className={b("title")}
        dangerouslySetInnerHTML={{
          __html: titleAndYear(title, date),
        }}
      />

      {isAuction && !isClosed && (
        <div className={b("bid-status")}>
          <BidStatus artworkItem={saleArtwork} />
        </div>
      )}
    </a>
  )
}

MasonryArtwork.propTypes = {
  saleArtwork: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isAuction: PropTypes.bool.isRequired,
  isClosed: PropTypes.bool.isRequired,
  lotLabel: PropTypes.string, // Not needed for e-commerce works
  artistDisplay: PropTypes.string.isRequired,
  sale_message: PropTypes.string,
  title: PropTypes.string.isRequired,
}

const mapStateToProps = (state, props) => {
  const { saleArtwork } = props
  const image = get(
    saleArtwork,
    "artwork.images.0.image_medium",
    "/images/missing_image.png"
  )
  const { artists } = saleArtwork
  const artistDisplay =
    artists && artists.length > 0 ? artists.map(aa => aa.name).join(", ") : ""

  return {
    date: saleArtwork.date,
    image,
    isAuction: state.app.auction.get("is_auction"),
    isClosed: state.app.auction.isClosed(),
    lotLabel: saleArtwork.lot_label,
    artistDisplay,
    sale_message: saleArtwork.sale_message,
    title: saleArtwork.title,
  }
}

export default connect(mapStateToProps)(MasonryArtwork)

export const test = { MasonryArtwork }
