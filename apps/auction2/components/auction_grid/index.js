import { default as React, PropTypes } from 'react';
import AuctionGridArtwork from '../auction_grid_artwork/index'

export default function AuctionGrid({ artworks }, _) {
  return (
    <div className={'auction2-grid'}>
      {
        artworks.map((artwork) => (
          <AuctionGridArtwork key={artwork.get('_id')} artwork={artwork} />
        ))
      }
    </div>
  );
}

AuctionGrid.propTypes = {
  artworks: PropTypes.array.isRequired,
};
