import React from "react"
import styled from "styled-components"

import { CircleWhiteCheckIcon, PlusIcon } from "@artsy/palette"
import Colors from "v2/Assets/Colors"
import { avantgarde } from "v2/Assets/Fonts"
import { media } from "../Helpers"

const Link = styled.a`
  display: flex;
  font-size: 14px;
  color: black;
  text-decoration: none;
  ${avantgarde("s13")};
  &:hover {
    background-color: ${Colors.gray};
    cursor: pointer;
  }
  padding-right: 10px;
  ${media.sm`
    padding: 0 5px;
  `};
`

const Avatar = styled.img`
  margin: 10px 15px 10px 10px;
`

const FullWidthCol = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Col = styled.div`
  display: flex;
  align-items: center;
`

export const LinkContainer = styled.div`
  border-top: 1px solid ${Colors.grayRegular};
  border-bottom: 1px solid ${Colors.grayRegular};
  margin-top: -1px;
`

interface Props extends React.HTMLProps<HTMLAnchorElement> {
  item?: any
  id: string
  name: string
  image_url: string
}

interface State {
  selected: boolean
}

export default class ItemLink extends React.Component<Props, State> {
  constructor(props, state) {
    super(props, state)

    this.state = {
      selected: false,
    }
  }

  onClick(e) {
    this.props.onClick(e)
    this.setState({ selected: true })
  }

  render() {
    return (
      <Link onClick={this.onClick.bind(this)}>
        <Col>
          {
            <Avatar
              src={
                this.props.image_url
                  ? this.props.image_url
                  : "https://www.artsy.net/images/icon-70.png"
              }
              width={50}
              height={50}
            />
          }
        </Col>
        <FullWidthCol>{this.props.name}</FullWidthCol>
        <Col>
          {this.state.selected ? (
            <CircleWhiteCheckIcon width="26" height="26" />
          ) : (
            <PlusIcon width="26" height="26" />
          )}
        </Col>
      </Link>
    )
  }
}
