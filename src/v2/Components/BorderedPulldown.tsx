import React from "react"

import Icon from "./Icon"

// @ts-ignore
import styled, { StyledComponentClass } from "styled-components"
import colors from "../Assets/Colors"
import { garamond } from "../Assets/Fonts"

export interface BorderedPullDownProps
  extends React.HTMLProps<BorderedPulldown> {
  options: any
  defaultValue: string
  onChange?: any
  selectedName?: string
}

export interface BorderedPulldownState {
  selected: any
  isHovered: boolean
}

export class BorderedPulldown extends React.Component<
  BorderedPullDownProps,
  BorderedPulldownState
> {
  state = {
    selected: null,
    isHovered: false,
  }

  toggleHover(value) {
    this.setState({
      isHovered: value,
    })
  }

  onChange(option) {
    this.setState({
      selected: option,
      isHovered: false,
    })
    this.props.onChange(option)
  }

  render() {
    const { options, defaultValue, selectedName } = this.props

    const optionEls = options.map(option => {
      return (
        <a key={option.val} onClick={() => this.onChange(option)}>
          {option.name}
        </a>
      )
    })

    const displayValue =
      (this.state.selected && this.state.selected.name) ||
      selectedName ||
      defaultValue
    let pulldownStyles = {}

    if (this.state.isHovered) {
      pulldownStyles = {
        display: "block",
      }
    }

    return (
      <div
        className={this.props.className}
        onMouseEnter={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
      >
        <Toggle>
          <span>{displayValue}</span>
          <CaretHolder>
            <Icon name="arrow-down" fontSize="9px" color={colors.grayMedium} />
          </CaretHolder>
        </Toggle>
        <PulldownOptions style={pulldownStyles}>{optionEls}</PulldownOptions>
      </div>
    )
  }
}

const StyledBorderedPulldown = styled(BorderedPulldown)`
  ${garamond("s17")};
  display: inline-block;
  width: 200px;
  position: relative;
  border: 2px solid ${colors.grayMedium};
  text-align: left;

  &.is-disabled {
    .bordered-pulldown-toggle {
      cursor: default;
      color: ${colors.grayBold};
    }
  }
`

const Toggle = styled.div`
  display: block;
  padding: 8px 10px 6px;
  text-decoration: none;
`

const CaretHolder = styled.div`
  float: right;
  padding-left: 5px;
  border-left: 1px solid ${colors.grayMedium};
`

const PulldownOptions = styled.div`
  display: none;
  position: absolute;
  background: white;
  border: 2px solid ${colors.grayMedium};
  top: -2px;
  left: -2px;
  right: -2px;
  z-index: 2;

  > a {
    text-decoration: none;
    overflow: ellipsis;
    display: block;
    padding: 8px 10px 6px;
    cursor: pointer;

    &:hover {
      background-color: ${colors.gray};
    }
  }
`

export default StyledBorderedPulldown
