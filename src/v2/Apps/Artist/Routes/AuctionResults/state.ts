import { Container } from "unstated"

interface StateContainer {
  selectedAuction?: any
  showDetails: boolean
}

export class AuctionResultsState extends Container<StateContainer> {
  state = { showDetails: false, selectedAuction: null }

  openDetailsCollpase = selectedAuction => {
    this.setState({ showDetails: true, selectedAuction })
  }

  closeDetailsCollapse = () => {
    this.setState({ showDetails: false, selectedAuction: null })
  }

  toggleDetails = selectedAuction => {
    if (!this.state.showDetails) {
      this.setState({
        showDetails: true,
        selectedAuction,
      })
    } else {
      this.setState({
        showDetails: false,
        selectedAuction: null,
      })
    }
  }
}
