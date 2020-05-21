import PropTypes from "prop-types"
import React from "react"
import track from "react-tracking"
import styled from "styled-components"
import { IconExpand } from "../Icon/IconExpand"
import { withFullScreen } from "../Sections/FullscreenViewer/withFullScreen"

interface Props extends React.HTMLProps<HTMLDivElement> {
  index?: number
  onViewFullscreen?: (index: number) => void
}

@track()
@withFullScreen
export class ViewFullscreen extends React.Component<Props, null> {
  static contextTypes = {
    onViewFullscreen: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  @track({ action: "Clicked article impression" })
  onClick(e) {
    e.preventDefault()
    this.props.onViewFullscreen(this.props.index)
  }

  render() {
    return (
      <ViewFullscreenLink onClick={this.onClick}>
        <IconExpand />
      </ViewFullscreenLink>
    )
  }
}

const ViewFullscreenLink = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
`
