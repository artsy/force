import { CloseIcon, Clickable } from "@artsy/palette"
import * as React from "react"
import styled from "styled-components"
import { ModalWidth, ModalWrapper } from "v2/Components/Modal/ModalWrapper"
import { media } from "../Helpers"
import { ModalHeader } from "./ModalHeader"

export interface ModalProps extends React.HTMLProps<Modal> {
  blurContainerSelector?: string
  onClose?: () => void
  hasLogo?: boolean
  isWide?: boolean
  image?: string
  show?: boolean
  title?: string
  disableCloseOnBackgroundClick?: boolean
}

/**
 * @deprecated in favor of our Design System Modal component in @artsy/palette
 * https://palette.artsy.net/elements/dialogs/modal
 */
export class Modal extends React.Component<ModalProps> {
  static defaultProps = {
    blurContainerSelector: "",
    show: false,
  }

  state = {
    blurContainers: this.props.blurContainerSelector
      ? Array.from(document.querySelectorAll(this.props.blurContainerSelector))
      : [],
    isAnimating: this.props.show || false,
    isShown: this.props.show || false,
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      this.setState({
        isAnimating: true,
        isShown: nextProps.show,
      })
    }
  }

  close = () => {
    this.props.onClose?.()
  }

  render(): JSX.Element {
    const {
      children,
      hasLogo,
      image,
      isWide,
      onClose,
      show,
      title,
      disableCloseOnBackgroundClick,
    } = this.props

    return (
      <ModalWrapper
        onClose={onClose}
        show={show}
        width={isWide ? ModalWidth.Wide : ModalWidth.Normal}
        image={image}
        fullscreenResponsiveModal
        disableCloseOnBackgroundClick={disableCloseOnBackgroundClick}
      >
        <Clickable
          position="absolute"
          top={0}
          right={0}
          p={2}
          onClick={this.close}
          aria-label="Close"
        >
          <CloseIcon />
        </Clickable>

        {image && <Image image={image} />}

        <ModalContent hasImage={!!image}>
          {(hasLogo || title) && (
            <ModalHeader title={title} hasLogo={hasLogo} />
          )}

          <div>{children}</div>
        </ModalContent>
      </ModalWrapper>
    )
  }
}

export const ModalContent = styled.div<{
  hasImage: boolean
}>`
  padding: 20px 40px 40px;
  width: ${props => (props.hasImage ? "50%" : "100%")};
  ${props => props.hasImage && "margin-left: 50%"};
  ${media.sm`
    width: 100%;
    margin: 0;
    padding: 20px;
  `};
`

export const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(200, 200, 200, 0.5);
`

export const Image = styled.div<{ image: string }>`
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 50%;
  ${media.sm`
    display: none;
  `};
`

export default Modal
