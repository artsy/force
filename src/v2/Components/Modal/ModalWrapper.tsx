import { Theme } from "@artsy/palette"
import * as React from "react"
import styled, { createGlobalStyle, keyframes } from "styled-components"
import { getViewportDimensions } from "v2/Utils/viewport"
import FadeTransition from "../Animation/FadeTransition"
import { media } from "../Helpers"

export enum ModalWidth {
  Narrow = "280px",
  Normal = "440px",
  Medium = "780px",
  Wide = "900px",
}

export interface ModalWrapperProps extends React.HTMLProps<ModalWrapper> {
  blurContainerSelector?: string
  onClose?: () => void
  width?: ModalWidth
  fullscreenResponsiveModal?: boolean
  image?: string
  show?: boolean
  disableCloseOnBackgroundClick?: boolean
}

export interface ModalWrapperState {
  isAnimating: boolean
  isShown: boolean
  blurContainers: Element[]
}

const GlobalStyle = createGlobalStyle<{ suppressMultiMountWarning: boolean }>`
  .blurred {
    filter: blur(50px);
  }
`

const KEYBOARD_EVENT = "keyup"

export class ModalWrapper extends React.Component<
  ModalWrapperProps,
  ModalWrapperState
> {
  static defaultProps = {
    show: false,
    blurContainerSelector: "",
  }

  state = {
    isAnimating: this.props.show || false,
    isShown: this.props.show || false,
    blurContainers: this.props.blurContainerSelector
      ? Array.from(document.querySelectorAll(this.props.blurContainerSelector))
      : [],
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      this.setState({
        isAnimating: true,
        isShown: nextProps.show,
      })
    }
  }

  componentDidMount() {
    const isOpen = this.props.show
    this.updateBodyScrollBlock(isOpen)
    this.updateEscapeKeyListener(isOpen)
  }

  componentDidUpdate(prevProps) {
    const isOpen = this.props.show
    if (prevProps.show !== isOpen) {
      this.updateBodyScrollBlock(isOpen)
      this.updateEscapeKeyListener(isOpen)
    }
  }

  componentWillUnmount() {
    this.removeBlurToContainers()
    this.updateBodyScrollBlock(false)
    this.updateEscapeKeyListener(false)
  }

  close = () => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    this.props.onClose()
    this.removeBlurToContainers()
  }

  addBlurToContainers = () => {
    for (const container of this.state.blurContainers) {
      container.classList.add("blurred")
    }
  }

  removeBlurToContainers = () => {
    for (const container of this.state.blurContainers) {
      container.classList.remove("blurred")
    }
  }

  updateBodyScrollBlock(isOpen) {
    if (isOpen) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "visible"
    }
  }

  handleEscapeKey = event => {
    if (event && event.key === "Escape") {
      this.close()
    }
  }

  updateEscapeKeyListener(isOpen) {
    if (isOpen) {
      document.addEventListener(KEYBOARD_EVENT, this.handleEscapeKey, true)
    } else {
      document.removeEventListener(KEYBOARD_EVENT, this.handleEscapeKey, true)
    }
  }

  render(): JSX.Element {
    const { children, width, fullscreenResponsiveModal, image } = this.props
    const { isShown, isAnimating } = this.state
    const { width: viewportWidth } = getViewportDimensions()

    if (isShown) {
      this.addBlurToContainers()
    } else {
      this.removeBlurToContainers()
    }

    return (
      <Theme theme="v3">
        <Wrapper isShown={isShown || isAnimating}>
          <GlobalStyle suppressMultiMountWarning />
          {isShown && (
            <ModalOverlay
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              onClick={
                this.props.disableCloseOnBackgroundClick ? null : this.close
              }
            />
          )}
          <FadeTransition
            in={isShown}
            mountOnEnter
            onExited={() => {
              this.setState({ isAnimating: false })
            }}
            unmountOnExit
            timeout={{ enter: 10, exit: 200 }}
          >
            <ModalContainer
              fullscreenResponsiveModal={fullscreenResponsiveModal}
              width={width}
              image={image}
              viewportWidth={viewportWidth}
            >
              <ModalInner fullscreenResponsiveModal={fullscreenResponsiveModal}>
                {children}
              </ModalInner>
            </ModalContainer>
          </FadeTransition>
        </Wrapper>
      </Theme>
    )
  }
}

const Wrapper = styled.div<{ isShown?: boolean }>`
  ${props =>
    props.isShown &&
    `
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999
  `};
`

const slideUp = keyframes`
  from {
    transform: translate(-50%, -40%);
    opacity: 0;
    /* stylelint-disable-next-line */
  },

  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
`

export const ModalContainer = styled.div<{
  width?: ModalWidth
  fullscreenResponsiveModal?: boolean
  image?: string
  viewportWidth?: number
}>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: ${props => {
    if (props.image) {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      return props.viewportWidth > 900 ? ModalWidth.Wide : ModalWidth.Medium
    } else {
      return props.width ? props.width : ModalWidth.Normal
    }
  }};
  height: min-content;
  border-radius: 5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  animation: ${slideUp} 250ms linear;

  ${props =>
    props.fullscreenResponsiveModal
      ? media.sm`
          width: 100%;
          border-radius: 0;
        `
      : media.sm`
          width: calc(100vw - 20px);
          border-radius: 2px;
        `};
`

const ModalInner = styled.div<{
  fullscreenResponsiveModal?: boolean
}>`
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  ${props =>
    props.fullscreenResponsiveModal &&
    media.sm`
      max-height: 100vh;
      height: 100vh
    `};
`

export default ModalWrapper
