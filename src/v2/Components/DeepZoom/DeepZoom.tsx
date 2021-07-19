import { Box, Flex, color, space } from "@artsy/palette"
import { withSystemContext } from "v2/System"
import * as Schema from "v2/System/Analytics/Schema"
import FadeTransition from "v2/Components/Animation/FadeTransition"
import { bind, once, throttle } from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import track from "react-tracking"
import styled from "styled-components"
import { CloseButton } from "./CloseButton"
import { Slider, SliderProps } from "./DeepZoomSlider"

const KEYBOARD_EVENT = "keyup"
const ZOOM_PER_CLICK = 1.4
const HIDE_ZOOM_SLIDER_AFTER = 2500

const DeepZoomContainer = styled.div`
  position: fixed !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: ${color("black100")};
`

export interface DeepZoomProps {
  Image: {
    xmlns: string
    Url: string
    Format: string
    Overlap: number
    TileSize: number
    Size: {
      Width: number
      Height: number
    }
  }
}

export interface LightboxProps {
  deepZoom: DeepZoomProps
  children({ onShow, onHide }: { onShow(): void; onHide(): void }): JSX.Element
}

export interface LightboxState {
  shown: boolean
  element: Element
  viewer: any
  deepZoomRef: any
  slider: SliderProps
  showZoomSlider: boolean
  activityTimer?: number | NodeJS.Timeout
}

@track({ context_module: Schema.ContextModule.Zoom })
class DeepZoomComponent extends React.Component<LightboxProps, LightboxState> {
  static defaultProps = {
    enabled: true,
    lightboxId: "lightbox-container",
  }

  // @ts-expect-error STRICT_NULL_CHECK
  state = {
    element: null,
    viewer: null,
    shown: false,
    activityTimer: null,
    showZoomSlider: true,
    deepZoomRef: React.createRef(),
    slider: {
      min: 0,
      max: 1,
      step: 0.001,
      value: 0,
    },
  }

  @track({
    type: Schema.Type.Button,
    flow: Schema.Flow.ArtworkZoom,
    action_type: Schema.ActionType.Click,
  })
  show() {
    this.setState({ shown: true, showZoomSlider: true })
  }

  hide = () => {
    this.setState({ shown: false })
    if (this.state.viewer) {
      // @ts-expect-error STRICT_NULL_CHECK
      this.state.viewer.destroy()
      this.state.viewer = null
    }
    document.removeEventListener(KEYBOARD_EVENT, this.handleKeyPress)
    // @ts-expect-error STRICT_NULL_CHECK
    clearTimeout(this.state.activityTimer)
  }

  handleKeyPress = event => {
    if (event && event.key === "Escape") {
      this.hide()
    }
  }

  detectActivity = throttle(() => {
    // @ts-expect-error STRICT_NULL_CHECK
    clearTimeout(this.state.activityTimer)
    this.setState({
      showZoomSlider: true,
      activityTimer: setTimeout(() => {
        this.setState({
          showZoomSlider: false,
        })
      }, HIDE_ZOOM_SLIDER_AFTER),
    })
  }, 500) as () => void

  zoomBy = amount => {
    // @ts-expect-error STRICT_NULL_CHECK
    if (this.state.viewer.viewport) {
      // @ts-expect-error STRICT_NULL_CHECK
      this.state.viewer.viewport.zoomBy(amount)
      // @ts-expect-error STRICT_NULL_CHECK
      this.state.viewer.viewport.applyConstraints()
    }
  }

  zoomIn = () => {
    this.zoomBy(ZOOM_PER_CLICK)
  }

  zoomOut = () => {
    this.zoomBy(1 / ZOOM_PER_CLICK)
  }

  initSeaDragon = () => {
    import(/* webpackChunkName: "openseadragon" */ "openseadragon").then(
      OpenSeaDragon => {
        const viewer = OpenSeaDragon.default({
          element: this.state.deepZoomRef.current,

          debugMode: false,
          showNavigationControl: false,
          immediateRender: false,
          useCanvas: true,
          constrainDuringPan: false,
          blendTime: 0.0,
          animationTime: 1.5,
          springStiffness: 15.0,
          maxZoomPixelRatio: 1.0,
          minZoomImageRatio: 0.9,
          zoomPerClick: ZOOM_PER_CLICK,
          zoomPerScroll: 1.4,
          clickDistThreshold: 5,
          clickTimeThreshold: 300,
          visibilityRatio: 1,
          tileSources: this.props.deepZoom,

          gestureSettingsTouch: {
            scrolltozoom: false,
            clicktozoom: true,
            pinchtozoom: true,
            flickenabled: true,
            flickminspeed: 20,
            flickmomentum: 0.4,
          },
        })
        document.addEventListener(KEYBOARD_EVENT, this.handleKeyPress)
        this.setState({
          viewer,
        })
      }
    )
  }

  onSliderChanged = event => {
    // @ts-expect-error STRICT_NULL_CHECK
    this.state.viewer.viewport.zoomTo(event.target.value)
  }

  onZoomChanged = () => {
    if (!this.state.viewer) return
    this.setState({
      slider: {
        ...this.state.slider,
        // @ts-expect-error STRICT_NULL_CHECK
        min: this.state.viewer.viewport.getMinZoom(),
        // @ts-expect-error STRICT_NULL_CHECK
        max: this.state.viewer.viewport.getMaxZoom(),
        // @ts-expect-error STRICT_NULL_CHECK
        value: this.state.viewer.viewport.getZoom(),
      },
    })
  }

  componentDidMount() {
    // @ts-expect-error STRICT_NULL_CHECK
    const element = document.getElementById(this.props.lightboxId)
    if (element) {
      this.setState({
        element,
      })
    }
  }

  componentWillUnmount() {
    this.hide()
  }

  componentDidUpdate(_prevProps, prevState) {
    if (this.state.shown === true && prevState.shown === false) {
      this.initSeaDragon()
    }
    if (this.state.viewer && !prevState.viewer) {
      this.postRender()
    }
  }

  renderLightbox() {
    const { slider } = this.state
    return (
      <FadeTransition
        in={this.state.shown}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 250, exit: 300 }}
      >
        <DeepZoomContainer
          onMouseMove={this.detectActivity}
          onWheel={this.detectActivity}
          onTouchStart={this.detectActivity}
          onTouchMove={this.detectActivity}
          ref={this.state.deepZoomRef as any /* TODO Update SC */}
        >
          <Box
            position="absolute"
            top={space(3) / 2}
            right={space(3) / 2}
            zIndex={1001}
          >
            <CloseButton onClick={() => this.hide()} />
          </Box>
          <Flex
            position="absolute"
            width="100%"
            justifyContent="center"
            zIndex={1001}
            bottom={space(2)}
          >
            <FadeTransition
              in={this.state.showZoomSlider}
              timeout={{ enter: 50, exit: 150 }}
            >
              <Slider
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={slider.value}
                onChange={this.onSliderChanged}
                onZoomInClicked={() => this.zoomIn()}
                onZoomOutClicked={() => this.zoomOut()}
              />
            </FadeTransition>
          </Flex>
        </DeepZoomContainer>
      </FadeTransition>
    )
  }

  renderPortal = () => {
    return this.state.element
      ? // @ts-expect-error STRICT_NULL_CHECK
        ReactDOM.createPortal(this.renderLightbox(), this.state.element)
      : null
  }

  render() {
    const { children } = this.props

    // Only render client-side
    if (!this.state.element) {
      return children({
        onShow: this.show.bind(this),
        onHide: this.hide.bind(this),
      })
    }

    return (
      <>
        {this.renderPortal()}
        {children({
          onShow: this.show.bind(this),
          onHide: this.hide.bind(this),
        })}
      </>
    )
  }

  postRender = () => {
    // @ts-expect-error STRICT_NULL_CHECK
    this.state.viewer.addHandler(
      "zoom",
      bind(throttle(this.onZoomChanged, 50), this)
    )
    // @ts-expect-error STRICT_NULL_CHECK
    this.state.viewer.addHandler(
      "tile-drawn",
      once(() => {
        this.setState({
          slider: {
            ...this.state.slider,
            // @ts-expect-error STRICT_NULL_CHECK
            min: this.state.viewer.viewport.getMinZoom(),
            // @ts-expect-error STRICT_NULL_CHECK
            max: this.state.viewer.viewport.getMaxZoom(),
            // @ts-expect-error STRICT_NULL_CHECK
            value: this.state.viewer.viewport.getHomeZoom(),
          },
        })
      })
    )
    this.detectActivity()
  }
}

export const DeepZoom = withSystemContext(DeepZoomComponent)
