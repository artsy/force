import ChevronLeft from '../../../../../components/main_layout/public/icons/chevron-left.svg'
import ChevronRight from '../../../../../components/main_layout/public/icons/chevron-right.svg'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import block from 'bem-cn-lite'
import classNames from 'classnames'
import { Artwork } from '@artsy/reaction-force/dist/Components/Artwork'

export class BuyNowRail extends Component {
  static propTypes = {
    artworks: PropTypes.array.isRequired
  }

  static defaultProps = {
    artworks: []
  }

  state = {
    currArtworks: [],
    displayCount: 4,
    hasPreviousPage: false,
    hasNextPage: false,
    isSinglePage: false,
    page: 1
  }

  componentWillMount () {
    this.updatePageDisplay()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.updatePageDisplay()
    }
  }

  updatePageDisplay () {
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
      hasNextPage
    })
  }

  previousPage = () => {
    const { hasPreviousPage, page } = this.state

    if (hasPreviousPage) {
      const newPage = page - 1

      this.setState({
        hasPreviousPage,
        page: newPage
      })
    }
  }

  nextPage = () => {
    const { hasNextPage, page } = this.state

    if (hasNextPage) {
      const newPage = page + 1

      this.setState({
        hasNextPage,
        page: newPage
      })
    }
  }

  render () {
    const { currArtworks, hasNextPage, hasPreviousPage, isSinglePage } = this.state
    const b = block('auction-BuyNowRail')

    const leftPageClasses = classNames(
      String(b('page-left')),
      { disabled: !hasPreviousPage }
    )

    const rightPageClasses = classNames(
      String(b('page-right')),
      { disabled: isSinglePage || !hasNextPage }
    )

    return (
      <div className={b()}>
        <div className={b('title')}>
          Buy Now
        </div>
        <div className={b('content')}>
          <div
            className={leftPageClasses}
            onClick={this.previousPage}
          >
            <ChevronLeft />
          </div>
          <div className={b('artworks')}>
            {
              currArtworks.map(({ artwork }, key) => {
                return (
                  <div className={b('artwork')}>
                    <Artwork artwork={artwork} key={key} />
                  </div>
                )
              })
            }
          </div>
          <div
            className={rightPageClasses}
            onClick={this.nextPage}
          >
            <ChevronRight />
          </div>
        </div>
      </div>
    )
  }
}
