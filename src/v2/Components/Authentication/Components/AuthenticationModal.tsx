import { ModalOptions } from "v2/Components/Authentication/Types"
import Modal, { ModalProps } from "v2/Components/Modal/Modal"
import { Component } from "react"
import track from "react-tracking"
import { TrackingProp } from "react-tracking"
import Events from "v2/Utils/Events"

export interface AuthenticationModalProps extends ModalProps {
  blurContainerSelector?: string
  onClose: () => void
  onTypeChange?: (options: ModalOptions) => void
  show?: boolean
  subtitle?: string
  tracking?: TrackingProp
}

@track({}, { dispatch: data => Events.postEvent(data) })
export class AuthenticationModal extends Component<AuthenticationModalProps> {
  onClose = () => {
    this.props.tracking?.trackEvent({
      action: "Click",
      type: "dismiss",
      label: "dismiss auth modal",
      flow: "auth",
    })

    this.props.onClose()
  }

  render() {
    const title = this.props.subtitle || "The art world online"

    return (
      <Modal {...this.props} onClose={this.onClose} title={title} hasLogo>
        {this.props.children}
      </Modal>
    )
  }
}
