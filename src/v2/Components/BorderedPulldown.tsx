import * as React from "react"

import styled from "styled-components"
import colors from "../Assets/Colors"
import { garamond } from "../Assets/Fonts"
import { ArrowDownIcon, Clickable, color } from "@artsy/palette"

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
        <Clickable key={option.val} onClick={() => this.onChange(option)}>
          {option.name}
        </Clickable>
      )
    })

    const displayValue =
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
            <ArrowDownIcon color="black60" />
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
  padding-left: 8px;
  border-left: 1px solid ${color("black60")};
`

const PulldownOptions = styled.div`
  display: none;
  position: absolute;
  background: white;
  border: 2px solid ${color("black60")};
  top: -2px;
  left: -2px;
  right: -2px;
  z-index: 2;

  > button {
    ${garamond("s17")};
    text-decoration: none;
    overflow: ellipsis;
    display: block;
    padding: 8px 10px 6px;
    cursor: pointer;
    width: 100%;
    text-align: left;

    &:hover {
      background-color: ${color("black10")};
    }
  }
`

export default StyledBorderedPulldown
