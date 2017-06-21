import AddToCalendar from 'desktop/components/add_to_calendar/index.coffee'
import ClockView from 'desktop/components/clock/view.coffee'
import ConfirmRegistrationModal from 'desktop/components/credit_card/client/confirm_registration.coffee'
import MyActiveBids from 'desktop/components/my_active_bids/view.coffee'
import PropTypes from 'prop-types'
import { Component } from 'react'
import infiniteScroll from 'desktop/apps/auction2/utils/infiniteScroll'
import mediator from 'desktop/lib/mediator.coffee'
import scrollToTop from 'desktop/apps/auction2/utils/scrollToTop'

export default class DOM extends Component {
  static propTypes = {
    auction: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    store: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  // Backbone views
  clockView = null
  addToCalendarView = null
  myActiveBidsView = null

  // Selectors
  $ = null
  $body = null
  $registerBtn = null

  componentDidMount () {
    this.$ = require('jquery')
    this.setupBackboneViews()
    this.addEventListeners()
    this.maybeShowRegistration()
  }

  componentWillUnmount () {
    this.destroyBackboneViews()
    this.removeEventListeners()
  }

  /**
   * Setup Clock, Calendar and ActiveBids Backbone views.
   * TODO: Refactor these into React components
   */
  setupBackboneViews () {
    const { auction, user } = this.props
    const { id, is_open, is_live_open } = auction.toJSON()
    const showMyActiveBids = is_open && !is_live_open

    this.clockView = new ClockView({
      modelName: 'Auction',
      model: auction,
      el: this.$('.auction-clock')
    }).start()

    this.addToCalendarView = new AddToCalendar({
      el: this.$('.auction-callout')
    })

    if (showMyActiveBids) {
      this.myActiveBidsView = new MyActiveBids({
        user: user,
        el: this.$('#my-active-bids'),
        saleId: id
      }).start()
    }
  }

  destroyBackboneViews () {
    this.clockView.remove()
    this.addToCalendarView.remove()
    this.myActiveBidsView && this.myActiveBidsView.remove()
  }

  addEventListeners () {
    this.$body = this.$('body')
    this.$body.on('click', '.artsy-checkbox', scrollToTop)
    this.$(window).on('scroll.auction-page-artworks', infiniteScroll(this.props.store))
    this.$registerBtn = this.$body.find('.js-register-button')
    this.$registerBtn.on('click', this.handleRegisterBtnClick)
  }

  removeEventListeners () {
    this.$body.off('click')
    this.$(window).off('scroll.auction-page-artworks')
    this.$registerBtn.off('click', this.handleRegisterBtnClick)
  }

  handleRegisterBtnClick = (event) => {
    if (!this.props.user) {
      event.preventDefault()

      mediator.trigger('open:auth', {
        mode: 'register',
        redirectTo: this.$(event.target).attr('href')
      })
    }
  }

  maybeShowRegistration () {
    const { auction, user } = this.props

    if (user) {
      if (location.pathname.match('/confirm-registration')) {
        new ConfirmRegistrationModal({
          auction
        })
      }
    }
  }

  render () {
    return this.props.children
  }
}
