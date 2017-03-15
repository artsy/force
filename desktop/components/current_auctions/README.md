# Current Auctions

A React component that displays a bar of four current Auctions.

## Usage

If using within a React context:

```javascript
import { CurrentAuctions } from 'components/current_auctions'

class Page extends Component {
  render() {
    return (
      <CurrentAuctions
        sales={sales}
      />
    )
  }
}
```

If using within a non-React context, `index.jsx` will automatically mount provided there is a `react-mount-current-auctions` ID somewhere present in the DOM:

```jade
.container
  #react-mount-current-auctions
```

```coffeescript
mountCurrentAuctions = require 'components/current_auctions'

class CurrentAuctionsContainer extends Backbone.Component
  render: ->
    mountCurrentAuctions({
      sales: [
        ...
      ]
    })
```

### API

```javascript
CurrentAuctions.propTypes = {
  /**
   * If the module is displayed in an Auction context (such as viewing an
   * artwork that is in a sale) and an auction id is provided, ensure the first
   * displayed sale in the bar is the same as the context.
   */
  auctionContextId: String,

  /**
   * An array of sales as defined within `query.js`
   */
  sales: Array
}
```
