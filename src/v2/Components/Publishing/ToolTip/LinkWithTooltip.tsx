import { color as Color } from "@artsy/palette"
import { defer } from "lodash"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { findDOMNode } from "react-dom"
import track, { TrackingProp } from "react-tracking"
import styled from "styled-components"
import { parse as parseURL } from "url"
import FadeTransition from "../../Animation/FadeTransition"
import { ToolTip } from "./ToolTip"

interface Props {
  color?: string
  url: string
  tracking?: TrackingProp
}

interface State {
  inToolTip: boolean
  maybeHideToolTip: boolean
  position: ClientRect
  orientation?: string
}

export class LinkWithTooltip extends Component<Props, State> {
  static contextTypes = {
    tooltipsData: PropTypes.object,
    onTriggerToolTip: PropTypes.func,
    activeToolTip: PropTypes.any,
    waitForFade: PropTypes.string,
  }

  static defaultProps = {
    color: "black",
  }

  public link: any
  public SetupToolTipPosition: any

  state = {
    inToolTip: false,
    maybeHideToolTip: false,
    position: null,
    orientation: "up",
  }

  urlToEntityType(): { entityType: string; slug: string } {
    const urlComponents = parseURL(this.props.url).pathname.split("/")
    urlComponents.shift()

    return {
      entityType: urlComponents[0],
      slug: urlComponents[1],
    }
  }

  componentDidMount() {
    this.SetupToolTipPosition = () => defer(this.setupToolTipPosition)
    this.setupToolTipPosition()

    window.addEventListener("scroll", this.SetupToolTipPosition)
    window.addEventListener("resize", this.SetupToolTipPosition)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.SetupToolTipPosition)
    window.removeEventListener("resize", this.SetupToolTipPosition)
  }

  entityTypeToEntity = () => {
    const { entityType, slug } = this.urlToEntityType()
    const data = this.context.tooltipsData
    const collectionKey = entityType + "s"

    if (!data || !data[collectionKey]) return null

    return {
      entityType,
      entity: data[collectionKey][slug],
    }
  }

  showToolTip = toolTipData => {
    const { tracking } = this.props
    const { onTriggerToolTip } = this.context
    const { entity, entityType } = toolTipData

    if (entity) {
      onTriggerToolTip(entity.slug)

      tracking.trackEvent({
        action: "Viewed tooltip",
        type: "intext tooltip",
        entity_type: entityType,
        entity_id: entity.internalID,
        entity_slug: entity.slug,
      })
    }
  }

  trackClick = toolTipData => {
    const { tracking } = this.props
    const { entity, entityType } = toolTipData

    if (entity) {
      tracking.trackEvent({
        action: "Click",
        flow: "tooltip",
        type: `${entityType} stub`,
        context_module: "intext tooltip",
        destination_path: entity.href,
      })
    }
  }

  leftLink = () => {
    this.setState({ maybeHideToolTip: true })
  }

  hideToolTip = () => {
    this.context.onTriggerToolTip(null)

    this.setState({
      inToolTip: false,
      maybeHideToolTip: false,
    })
  }

  maybeHideToolTip = () => {
    const { inToolTip, maybeHideToolTip } = this.state
    setTimeout(() => {
      if (!inToolTip && maybeHideToolTip) {
        this.hideToolTip()
      }
    }, 750)
  }

  onLeaveLink = () => {
    this.leftLink()
    defer(this.maybeHideToolTip)
  }

  getToolTipPosition = type => {
    if (this.link) {
      const { left, width, x } = this.state.position
      const linkCenter = width / 2
      const toolTipWidth = type === "artist" ? 360 : 280

      let toolTipLeft = linkCenter - toolTipWidth / 2
      const isAtWindowBoundary = x + toolTipLeft < 10
      let arrowLeft = null

      if (isAtWindowBoundary) {
        const padding = 20
        const arrowSize = 30

        arrowLeft = left + linkCenter - padding - arrowSize
        toolTipLeft = 10 - x
      }
      return {
        arrowLeft,
        toolTipLeft,
      }
    }
  }

  getOrientation = position => {
    const height = window ? window.innerHeight : 0
    const linkPosition = position.top
    const orientation = height - linkPosition > 350 ? "down" : "up"

    return orientation
  }

  setupToolTipPosition = () => {
    if (this.link) {
      const position = (findDOMNode(
        this.link
      ) as Element).getBoundingClientRect()
      const orientation = this.getOrientation(position)

      this.setState({ position, orientation })
    }
  }

  render() {
    const { color, url } = this.props
    const { activeToolTip, waitForFade } = this.context
    const { orientation } = this.state
    const toolTipData = this.entityTypeToEntity()
    const { entity, entityType } = toolTipData
    const id = entity ? entity.slug : null
    const toolTipPosition = this.getToolTipPosition(entityType)
    const show = id && activeToolTip ? id === activeToolTip : false
    const showWithFade = show || (waitForFade && waitForFade === id)

    return (
      <Link
        onMouseEnter={() => {
          !show && this.showToolTip(toolTipData)
        }}
        ref={link => (this.link = link)}
        show={showWithFade}
        data-test="linkWithTooltip"
      >
        <PrimaryLink
          color={color}
          href={url}
          target="_blank"
          show={showWithFade}
          onClick={() => this.trackClick(toolTipData)}
        >
          {this.props.children}
        </PrimaryLink>

        <FadeContainer>
          <FadeTransition
            in={show}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 200, exit: 250 }}
          >
            <ToolTip
              entity={entity}
              model={entityType}
              onMouseLeave={this.hideToolTip}
              onMouseEnter={() => {
                this.setState({ inToolTip: true })
              }}
              positionLeft={toolTipPosition && toolTipPosition.toolTipLeft}
              arrowLeft={toolTipPosition && toolTipPosition.arrowLeft}
              orientation={orientation}
            />
          </FadeTransition>
        </FadeContainer>

        {show && (
          <Background
            onMouseLeave={this.onLeaveLink}
            href={url}
            target="_blank"
            onClick={() => this.trackClick(toolTipData)}
          />
        )}
      </Link>
    )
  }
}

export const PrimaryLink = styled.a<{ color?: string; show: boolean }>`
  z-index: auto;
  transition: color 0.25s;
  background-image: linear-gradient(
    to right,
    ${props => (props.color === "black" ? Color("black60") : props.color)} 50%,
    transparent 50%
  ) !important;
  background-size: 3px 1.75px !important;
  background-position: 0 1.07em !important;

  ${props =>
    props.show &&
    props.color === "black" &&
    `
    color: ${Color("black30")} !important;

    background-image: linear-gradient(
      to right,
      ${Color("black30")} 50%,
      transparent 50%
    ) !important;
  `};

  ${props =>
    props.show &&
    props.color !== "black" &&
    `
      opacity: .65;
    `};
`

const FadeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
`

export const Link = styled.div<{ onMouseEnter: any; show: boolean }>`
  display: inline-block;
  position: relative;
  cursor: pointer;
  text-indent: initial;
  z-index: ${props => (props.show ? 10 : 0)};

  ${FadeContainer} {
    ${props => props.show && `z-index: 10`};
  }
`

export const Background = styled.a`
  position: absolute;
  left: 0;
  top: -10px;
  bottom: -10px;
  right: 0;
  z-index: 10;
  background-image: none !important;
`

export default track()(LinkWithTooltip)
