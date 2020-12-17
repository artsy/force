import { Container } from "unstated"

interface StateContainer {
  selectedAuction?: any
  showDetails: boolean
}

export class AuctionResultsState extends Container<StateContainer> {
  state = { selectedAuction: null, showDetails: false }

  openDetailsCollpase = selectedAuction => {
    this.setState({ selectedAuction, showDetails: true })
  }

  closeDetailsCollapse = () => {
    this.setState({ selectedAuction: null, showDetails: false })
  }

  toggleDetails = selectedAuction => {
    if (!this.state.showDetails) {
      this.setState({
        selectedAuction,
        showDetails: true,
      })
    } else {
      this.setState({
        selectedAuction: null,
        showDetails: false,
      })
    }
  }
}
