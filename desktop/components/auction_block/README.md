# Auction Block

A React component that displays a single auction block. For use on its own (as in the "associated sale" component on the auction page), or in a series (as in the "current auctions" component on the artwork page).

## Usage

If using within a React context:

```javascript
import { AuctionBlock } from 'components/auction_block'

class Page extends Component {
  render() {
    return (
      <AuctionBlock
        relatedAuction={relatedAuction}
        sale={sale}
      />
    )
  }
}
```

If used within a non-React context, `index.jsx` will automatically mount provided there is a default `#react-mount-auction-block` somewhere present in the DOM:

```jade
.container
  #react-mount-auction-block
```

```coffeescript
mountAuctionBlock = require 'components/auction_block'

class AuctionBlockContainer extends Backbone.View
  render: ->
    mountAuctionBlock({
      relatedAuction: true
      sale: sale
    })
```

(**NOTE**: You can pass in a selector as a second argument to mount to a custom location.)

### API

The necessary fields to render this object come from a `sale`. `relatedAuction` indicates whether or not the "Related Auction" subtitle should appear in the block.

```javascript
AuctionBlock.propTypes = {
    relatedAuction: Boolean,
    sale: Object
}
```
