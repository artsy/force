import ConfirmRegistrationModal from 'desktop/components/credit_card/client/confirm_registration.coffee'
import PropTypes from 'prop-types'
import infiniteScroll from 'desktop/apps/auction2/utils/infiniteScroll'
import mediator from 'desktop/lib/mediator.coffee'
import scrollToTop from 'desktop/apps/auction2/utils/scrollToTop'
import { Component } from 'react'
import { connect } from 'react-redux'

class DOM extends Component {
  static propTypes = {
    auction: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    infiniteScroll: PropTypes.func.isRequired,
    user: PropTypes.object
  }

  // Selectors
  $ = null
  $body = null
  $registerBtn = null

  componentDidMount () {
    const FastClick = require('fastclick')
    FastClick(document.body)

    this.$ = require('jquery')
    this.addEventListeners()
    this.maybeShowRegistration()
  }

  componentWillUnmount () {
    this.removeEventListeners()
  }

  addEventListeners () {
    this.$body = this.$('body')
    this.$body.on('click', '.artsy-checkbox', scrollToTop)
    this.$(window).on('scroll.auction2-page-artworks', this.props.infiniteScroll)
    this.$registerBtn = this.$body.find('.js-register-button')
    this.$registerBtn.on('click', this.handleRegisterBtnClick)
  }

  removeEventListeners () {
    this.$body.off('click')
    this.$(window).off('scroll.auction2-page-artworks')
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

const mapStateToProps = (state) => ({
  auction: state.app.auction,
  user: state.app.user
})

const mapDispatchToProps = (dispatch) => ({
  infiniteScroll: () => infiniteScroll(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DOM)
