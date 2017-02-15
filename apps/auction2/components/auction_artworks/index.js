import { default as React, PropTypes } from 'react';
import AuctionGridArtwork from '../auction_grid_artwork/index'

export default function AuctionArtworks({ artworks, display }, _) {
  return (
    <div className={'auction2-artworks'}>
      <div className={'auction2-artworks__display-type'}>

      </div>
      {
        artworks.map((artwork) => (
          <AuctionGridArtwork key={artwork.get('_id')} artwork={artwork} />
        ))
      }
    </div>
  );
}

AuctionArtworks.propTypes = {
  artworks: PropTypes.array.isRequired,
};
