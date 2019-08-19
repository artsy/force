import ChevronLeft from "../../../../components/main_layout/public/icons/chevron-left.svg"
import ChevronRight from "../../../../components/main_layout/public/icons/chevron-right.svg"
import PropTypes from "prop-types"
import React, { Component } from "react"
import block from "bem-cn-lite"
import classNames from "classnames"

export class ArtworkRail extends Component {
  static propTypes = {
    artworks: PropTypes.array.isRequired,
    getDisplayComponent: PropTypes.func.isRequired,
    style: PropTypes.object,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    artworks: [],
    style: {},
  }

  state = {
    currArtworks: [],
    displayCount: 4,
    hasPreviousPage: false,
    hasNextPage: false,
    isSinglePage: false,
    page: 1,
  }

  UNSAFE_componentWillMount() {
    this.updatePageDisplay()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.updatePageDisplay()
    }
  }

  updatePageDisplay() {
    const { artworks } = this.props
    const { displayCount, page } = this.state
    const initialSlice = (page - 1) * displayCount

    const currArtworks = artworks.slice(
      initialSlice,
      initialSlice + displayCount
    )

    const isSinglePage = artworks.length <= displayCount
    const hasPreviousPage = page > 1
    const hasNextPage = page < artworks.length / displayCount

    this.setState({
      currArtworks,
      isSinglePage,
      hasPreviousPage,
      hasNextPage,
    })
  }

  previousPage = () => {
    const { hasPreviousPage, page } = this.state

    if (hasPreviousPage) {
      const newPage = page - 1

      this.setState({
        hasPreviousPage,
        page: newPage,
      })
    }
  }

  nextPage = () => {
    const { hasNextPage, page } = this.state

    if (hasNextPage) {
      const newPage = page + 1

      this.setState({
        hasNextPage,
        page: newPage,
      })
    }
  }

  render() {
    const { style, title } = this.props
    const {
      currArtworks,
      hasNextPage,
      hasPreviousPage,
      isSinglePage,
    } = this.state
    const b = block("auction-ArtworkRail")

    const leftPageClasses = classNames(String(b("page-left")), {
      disabled: !hasPreviousPage,
    })

    const rightPageClasses = classNames(String(b("page-right")), {
      disabled: isSinglePage || !hasNextPage,
    })

    return (
      <div className={b()} style={style}>
        <div className={b("title")}>{title}</div>
        <div className={b("content")}>
          <div className={leftPageClasses} onClick={this.previousPage}>
            <ChevronLeft />
          </div>
          <div className={b("artworks")}>
            {currArtworks.map((artwork, key) => {
              return (
                <div className={b("artwork")} key={key}>
                  {this.props.getDisplayComponent(artwork)}
                </div>
              )
            })}
          </div>
          <div className={rightPageClasses} onClick={this.nextPage}>
            <ChevronRight />
          </div>
        </div>
      </div>
    )
  }
}
