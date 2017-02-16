import { connect } from 'react-redux'
import AuctionArtworks from './components/auction_artworks/index'

const mapStateToProps = (state) => {
  return { artworks: state.auctions.artworks }
}

const Container = connect(
  mapStateToProps
)(AuctionArtworks)

export default Container
