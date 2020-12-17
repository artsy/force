import { Link } from "@artsy/palette"
import { ModalDialog, ModalDialogProps } from "v2/Components/Modal/ModalDialog"
import React from "react"
import { Container, Subscribe } from "unstated"

interface DialogState {
  props: ModalDialogProps
  onForceClose: () => Promise<void>
}

export class DialogContainer extends Container<DialogState> {
  state: DialogState = {
    onForceClose: () => Promise.resolve(),
    props: {
      detail: null,
      heading: null,
      primaryCta: {
        action: () => void 0,
        text: "",
      },
      show: false,
    },
  }

  /**
   * Hides the the currently-showing dialog
   */
  hide = () => {
    this.setState({ props: { ...this.state.props, show: false } })
  }

  /**
   * @param props the props for the ModalDialog
   * @param onForceClose if someone else shows a modal while yours is open this
   * will be called before your modal is closed. It can return a promise if you
   * need to do async stuff before the next modal is shown.
   * @returns a promise that is resolved after your modal is shown
   */
  show = async ({
    props,
    onForceClose,
  }: {
    props: ModalDialogProps
    onForceClose: () => any
  }) => {
    if (this.state.props.show) {
      // need to gracefully allow existing modal to close
      await Promise.resolve(this.state.onForceClose())
      this.hide()
      // give a little pause so the user can see a transition between the two
      await new Promise(r => setTimeout(r, 400))
    }

    return new Promise(resolve => {
      this.setState({ onForceClose, props }, resolve)
    })
  }

  showConfirmDialog = ({
    title,
    message,
    confirmButtonText = "Continue",
    cancelButtonText = "Cancel",
  }: {
    title: React.ReactNode
    message: React.ReactNode
    confirmButtonText?: string
    cancelButtonText?: string
  }): Promise<{ confirmed: boolean }> => {
    return new Promise<{ confirmed: boolean }>(resolve => {
      const accept = () => {
        this.hide()
        resolve({ confirmed: true })
      }
      const reject = () => {
        this.hide()
        resolve({ confirmed: false })
      }

      this.show({
        onForceClose: reject,
        props: {
          detail: message,
          heading: title,
          onClose: reject,
          primaryCta: {
            action: accept,
            text: confirmButtonText,
          },
          secondaryCta: {
            action: reject,
            text: cancelButtonText,
          },
          show: true,
        },
      })
    })
  }

  /**
   * returns a promise that resolves to `true` if the user clicked the
   * continue button, and `false` if the modal was dismissed through other means.
   */
  showErrorDialog = ({
    title = "An error occurred",
    supportEmail = "orders@artsy.net",
    message = (
      <>
        Something went wrong. Please try again or contact{" "}
        <Link href={`mailto:${supportEmail}}`}>{supportEmail}</Link>.
      </>
    ),
    continueButtonText = "Continue",
  }: {
    title?: string
    message?: React.ReactNode
    supportEmail?: string
    continueButtonText?: string
  } = {}): Promise<boolean> => {
    return new Promise<boolean>(resolve => {
      const onContinue = () => {
        this.hide()
        resolve(true)
      }

      const onDismiss = () => {
        this.hide()
        resolve(false)
      }

      this.show({
        onForceClose: onDismiss,
        props: {
          detail: message,
          heading: title,
          onClose: onDismiss,
          primaryCta: {
            action: onContinue,
            text: continueButtonText,
          },
          show: true,
        },
      })
    })
  }
}

const extractDialogHelpers = ({
  show,
  hide,
  showErrorDialog,
  showConfirmDialog,
}: DialogContainer) => ({
  hide,
  show,
  showConfirmDialog,
  showErrorDialog,
})

export type Dialog = ReturnType<typeof extractDialogHelpers>

/**
 * Injects the `dialog` prop into the given page component
 * @param Component
 */
export function injectDialog<R extends { dialog: Dialog }>(
  Component: React.ComponentType<R>
): React.ComponentType<Omit<R, "dialog">> {
  return props => (
    <Subscribe to={[DialogContainer]}>
      {(dialog: DialogContainer) => (
        <Component {...(props as R)} dialog={extractDialogHelpers(dialog)} />
      )}
    </Subscribe>
  )
}

export const ConnectedModalDialog = () => (
  <Subscribe to={[DialogContainer]}>
    {(dialogs: DialogContainer) => <ModalDialog {...dialogs.state.props} />}
  </Subscribe>
)
