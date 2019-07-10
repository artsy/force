import AcceptConditionsOfSaleModal from "desktop/apps/auction_support/client/accept_conditions_of_sale_modal.coffee"
import PropTypes from "prop-types"
import mediator from "desktop/lib/mediator.coffee"
import scrollToTop from "desktop/apps/auction/utils/scrollToTop"
import { Component } from "react"
import { connect } from "react-redux"

class DOM extends Component {
  static propTypes = {
    auction: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    user: PropTypes.object,
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
    this.maybeStartRegistrationFlow()
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
    this.$registerBtn.off("click", this.handleRegister)
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
    } else if (me.has_credit_cards) {
      this.showAcceptConditions()

      // Redirect to credit card registration form
    } else {
      window.location.assign(auction.registerUrl())
    }
  }

  maybeStartRegistrationFlow() {
    if (location.pathname.match("/registration-flow")) {
      this.handleRegister()
    }
  }

  showAcceptConditions() {
    const { auction, user } = this.props
    if (user) {
      new AcceptConditionsOfSaleModal({
        auction,
      })
    }
  }

  render() {
    return this.props.children
  }
}

const mapStateToProps = state => ({
  auction: state.app.auction,
  user: state.app.user,
  me: state.app.me,
})

export default connect(mapStateToProps)(DOM)

// Helpers
export const test = {
  DOM,
}
