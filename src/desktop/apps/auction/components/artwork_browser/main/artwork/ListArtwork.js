import _BidStatus from "./BidStatus"
import PropTypes from "prop-types"
import block from "bem-cn-lite"
import classNames from "classnames"
import titleAndYear from "desktop/apps/auction/utils/titleAndYear"
import { connect } from "react-redux"
import { get } from "lodash"

// FIXME: Rewire
let BidStatus = _BidStatus

function ListArtwork(props) {
  const {
    saleArtwork,
    artistDisplay,
    date,
    image,
    isAuction,
    isClosed,
    isMobile,
    lotLabel,
    sale_message,
    title,
  } = props

  const b = block("auction-page-ListArtwork")
  const auctionArtworkClasses = classNames(String(b()), {
    "auction-open": isClosed,
  })

  return isMobile ? (
    <a
      className={auctionArtworkClasses}
      key={saleArtwork._id}
      href={`/artwork/${saleArtwork.id}`}
    >
      <div className={b("image")}>
        <img src={image} alt={title} />
      </div>

      <div className={b("metadata")}>
        {isAuction ? (
          <div className={b("lot-number")}>Lot {lotLabel}</div>
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

        {isAuction && !isClosed && (
          <div className={b("bid-status")}>
            <BidStatus artworkItem={saleArtwork} />
          </div>
        )}
      </div>
    </a>
  ) : (
    // Desktop
    <a
      className={auctionArtworkClasses}
      key={saleArtwork._id}
      href={`/artwork/${saleArtwork.id}`}
    >
      <div className={b("image-container")}>
        <div className={b("image")}>
          <img src={image} alt={saleArtwork.title} />
        </div>
      </div>
      <div className={b("metadata")}>
        <div className={b("artists")}>{artistDisplay}</div>
        <div
          className={b("title")}
          dangerouslySetInnerHTML={{
            __html: titleAndYear(title, date),
          }}
        />
      </div>
      {isAuction ? (
        <div className={b("lot-number")}>Lot {saleArtwork.lot_label}</div>
      ) : (
        <div>{sale_message}</div>
      )}

      {isAuction && !props.isClosed && (
        <div className={b("bid-status")}>
          <BidStatus artworkItem={saleArtwork} />
        </div>
      )}
    </a>
  )
}

ListArtwork.propTypes = {
  saleArtwork: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isAuction: PropTypes.bool.isRequired,
  isClosed: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  lotLabel: PropTypes.string.isRequired,
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
    isClosed: state.artworkBrowser.isClosed || state.app.auction.isClosed(),
    isMobile: state.app.isMobile,
    lotLabel: saleArtwork.lot_label,
    artistDisplay,
    sale_message: saleArtwork.sale_message,
    title: saleArtwork.title,
  }
}

export default connect(mapStateToProps)(ListArtwork)

export const test = { ListArtwork }
