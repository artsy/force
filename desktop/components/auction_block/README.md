# Auction Block

A React component that displays a single auction block. For use on its own (as in the "associated sale" component on the auction page), or in a series (as in the "current_auctions" component).

## Usage

If using within a React context:

```javascript
import { AuctionBlock } from 'components/auction_block'

class Page extends Component {
  render() {
    return (
      <AuctionBlock
        cover_image={cover_image}
        ...
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
      cover_image: cover_image
      ...
    })
```

(**NOTE**: You can pass in a selector as a second argument to mount to a custom location.)

### API

Most of these fields come directly from the `sale` model. `relatedAuction` indicates whether or not the "Related Auction" should appear in the block.

```javascript
AuctionBlock.propTypes = {
    cover_image: Object,
    end_at: String,
    href: String,
    id: String,
    is_closed: Boolean,
    is_live_open: Boolean,
    is_preview: Boolean,
    name: String,
    live_start_at: String,
    relatedAuction: Boolean,
    start_at: String
}
```
