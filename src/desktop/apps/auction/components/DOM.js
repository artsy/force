import PropTypes from "prop-types"
import mediator from "desktop/lib/mediator.coffee"
import scrollToTop from "desktop/apps/auction/utils/scrollToTop"
import { Component } from "react"
import { connect } from "react-redux"
import { showModal } from "../actions/app"

class DOM extends Component {
  static propTypes = {
    auction: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    me: PropTypes.object,
  }

  // Selectors
  $ = null
  $body = null
  $registerBtn = null

  componentDidMount() {
    const FastClick = require("fastclick")

    // removes 300ms delay
    if (FastClick.attach) {
      FastClick.attach(document.body)
    }

    this.$ = require("jquery")
    this.addEventListeners()

    this.handleRegistrationFlowPath()
    this.handleConfirmRegistrationPath()
  }

  componentWillUnmount() {
    this.removeEventListeners()
  }

  addEventListeners() {
    this.$body = this.$("body")
    this.$body.find(".Sidebar").on("click", ".artsy-checkbox", scrollToTop)
    this.$registerBtn = this.$body.find(".js-register-button")
    this.$registerBtn.on("click", this.handleRegister)
  }

  removeEventListeners() {
    this.$body.off("click")
    this.$registerBtn.off("click")
  }

  showModal = type => {
    // Showing modal immediately requires a delay due to jockeying with
    // the backbone-based ClockView inside Banner
    // FIXME: Remove timeout when we remove backbone
    setTimeout(() => {
      this.props.dispatch(showModal(type))
    }, 1000)
  }

  handleRegistrationFlowPath() {
    if (location.pathname.match("/registration-flow")) {
      this.handleRegister()
    }
  }

  handleConfirmRegistrationPath() {
    const { pathname } = location
    if (pathname.match(/\/confirm-registration/) && this.props.me) {
      this.showModal(
        location.search.match("origin=bid")
          ? "ConfirmBidAndRegistration"
          : "ConfirmRegistration"
      )
    }
  }

  handleRegister = event => {
    const { auction, me } = this.props
    // If there is no user, log in and redirect to this flow
    if (!me) {
      mediator.trigger("open:auth", {
        mode: "signup",
        redirectTo: auction.registrationFlowUrl(),
        intent: "register to bid",
        signupIntent: "register to bid",
        trigger: "click",
      })

      // If the user is already registered, just ignore this and fix the url.
    } else if (me.bidders[0]) {
      history.replaceState({}, document.title, auction.href())

      // If the user already has a CC, show accept conditions
      // (which redirects to auction-registration/:slug)
    } else if (!me.has_credit_cards) {
      window.location.assign(auction.registerUrl())
    } else {
      this.showModal("RegistrationFlow")
    }
  }

  render() {
    return this.props.children
  }
}

const mapStateToProps = state => ({
  auction: state.app.auction,
  me: state.app.me,
})

export default connect(mapStateToProps)(DOM)

// Helpers
export const test = {
  DOM,
}
