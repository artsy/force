import _BidStatus from "./BidStatus"
import PropTypes from "prop-types"
import block from "bem-cn-lite"
import titleAndYear from "desktop/apps/auction/utils/titleAndYear"
import { connect } from "react-redux"
import { get } from "lodash"

// FIXME: Rewire
let BidStatus = _BidStatus

function GridArtwork(props) {
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

  const b = block("auction-page-GridArtwork")

  return (
    <a
      className={b()}
      key={saleArtwork._id}
      href={`/artwork/${saleArtwork.slug}`}
    >
      <div className={b("image-container")}>
        <div className="vam-outer">
          <div className="vam-inner">
            <div className={b("image")}>
              <img src={image} alt={title} />
            </div>
          </div>
        </div>
      </div>
      <div className={b("metadata")}>
        {isAuction ? (
          <div className={b("lot-information")}>
            <div className={b("lot-number")}>Lot {lotLabel}</div>
            {!isClosed && <BidStatus artworkItem={saleArtwork} />}
          </div>
        ) : (
          <div>{sale_message}</div>
        )}
        <div className={b("artists")}>{artistDisplay}</div>
        <div
          className={b("title")}
          dangerouslySetInnerHTML={{
            __html: titleAndYear(title, date),
          }}
        />
      </div>
    </a>
  )
}

GridArtwork.propTypes = {
  saleArtwork: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isAuction: PropTypes.bool.isRequired,
  isClosed: PropTypes.bool.isRequired,
  lotLabel: PropTypes.string, // Not needed for e-commerce sales
  artistDisplay: PropTypes.string.isRequired,
  sale_message: PropTypes.string, // E-commerce sales only
  title: PropTypes.string.isRequired,
}

// TODO: Unify this selector across artwork types
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
    artistDisplay,
    date: saleArtwork.date,
    image,
    isAuction: state.app.auction.get("is_auction"),
    isClosed: state.artworkBrowser.isClosed || state.app.auction.isClosed(),
    lotLabel: saleArtwork.lot_label,
    sale_message: saleArtwork.sale_message,
    title: saleArtwork.title,
  }
}

export default connect(mapStateToProps)(GridArtwork)

export const test = { GridArtwork }
