import { Box, Link } from "@artsy/palette"
import { Component } from "react"
import { getENV } from "v2/Utils/getENV"
import { ModalDialog } from "./ModalDialog"
import { ModalWidth } from "./ModalWrapper"

export interface ErrorModalProps {
  show?: boolean
  headerText?: string
  detailText?: string
  errorStack?: string
  contactEmail?: string // Used in default detailText if none is specified.
  closeText?: string
  onClose?: () => void
  ctaAction?: () => void
}

/**
 * @deprecated: Use `useToasts` from `@artsy/palette` with `variant="error"` instead.
 */
export class ErrorModal extends Component<ErrorModalProps> {
  static defaultProps = {
    closeText: "Continue",
    headerText: "An error occurred",
  }

  close = () => {
    this.props.onClose && this.props.onClose()
  }

  render() {
    const {
      show,
      onClose,
      headerText,
      detailText,
      errorStack,
      contactEmail,
      closeText,
      ctaAction,
    } = this.props
    const emailAddress = contactEmail ? contactEmail : "support@artsy.net"
    const showErrorStack = errorStack && getENV("NODE_ENV") !== "production"
    const width =
      getENV("NODE_ENV") === "development" ? ModalWidth.Wide : ModalWidth.Narrow

    return (
      <ModalDialog
        show={show}
        onClose={onClose}
        heading={headerText}
        width={width}
        detail={
          <>
            {detailText || (
              <>
                Something went wrong. Please try again or contact{" "}
                <Link href={`mailto:${emailAddress}`}>{emailAddress}</Link>.
              </>
            )}

            {showErrorStack && (
              <Box py={3}>
                <Box style={{ whiteSpace: "pre-wrap" }}>{errorStack}</Box>
              </Box>
            )}
          </>
        }
        primaryCta={{
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          action: ctaAction || onClose,
          text: closeText,
        }}
      />
    )
  }
}
