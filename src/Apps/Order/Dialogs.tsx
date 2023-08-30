import { Button, Text } from "@artsy/palette"
import { ModalDialog } from "@artsy/palette"
import { getErrorDialogCopy } from "Apps/Order/Utils/getErrorDialogCopy"
import * as React from "react"
// TODO: Replace with normal React state
// eslint-disable-next-line no-restricted-imports
import { Container, Subscribe } from "unstated"

interface CtaProps {
  action(): void
  text: React.ReactNode
}

interface ModalDialogProps {
  show?: boolean
  width?: number
  heading?: string
  detail?: React.ReactNode
  primaryCta: CtaProps
  secondaryCta?: CtaProps
  onClose: () => void
}

interface DialogState {
  props: ModalDialogProps
  onForceClose: () => Promise<void>
}

const defaultErrorDialogCopy = getErrorDialogCopy()

export class DialogContainer extends Container<DialogState> {
  state: DialogState = {
    props: {
      onClose: () => {},
      show: false,
      heading: undefined,
      detail: null,
      primaryCta: {
        text: "",
        action: () => void 0,
      },
    },
    onForceClose: () => Promise.resolve(),
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

    return new Promise<void>(resolve => {
      this.setState({ props, onForceClose }, resolve)
    })
  }

  showConfirmDialog = ({
    title,
    message,
    confirmButtonText = "Continue",
    cancelButtonText = "Cancel",
  }: {
    title: string
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
        props: {
          show: true,
          heading: title,
          detail: message,
          primaryCta: {
            text: confirmButtonText,
            action: accept,
          },
          secondaryCta: {
            text: cancelButtonText,
            action: reject,
          },
          onClose: reject,
        },
        onForceClose: reject,
      })
    })
  }

  /**
   * returns a promise that resolves to `true` if the user clicked the
   * continue button, and `false` if the modal was dismissed through other means.
   */
  showErrorDialog = ({
    title = defaultErrorDialogCopy.title,
    message = defaultErrorDialogCopy.formattedMessage,
    continueButtonText = "Continue",
    width = undefined,
  }: {
    title?: string
    message?: React.ReactNode
    supportEmail?: string
    continueButtonText?: string
    width?: number
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
        props: {
          show: true,
          width,
          heading: title,
          detail: message,
          primaryCta: {
            text: continueButtonText,
            action: onContinue,
          },
          onClose: onDismiss,
        },
        onForceClose: onDismiss,
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
  show,
  hide,
  showErrorDialog,
  showConfirmDialog,
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
    {(dialogs: DialogContainer) => {
      const { props } = dialogs.state

      if (!props.show) {
        return null
      }

      return (
        <ModalDialog
          title={props.heading}
          onClose={props.onClose}
          width={props.width ? "fit-content" : undefined}
          maxWidth={props.width}
          footer={
            <Button width="100%" onClick={props.primaryCta.action}>
              {props.primaryCta.text}
            </Button>
          }
        >
          {props.detail && <Text variant="sm-display">{props.detail}</Text>}

          {props.secondaryCta && (
            <Button
              mt={1}
              variant="secondaryBlack"
              onClick={props.secondaryCta.action}
            >
              {props.secondaryCta.text}
            </Button>
          )}
        </ModalDialog>
      )
    }}
  </Subscribe>
)
