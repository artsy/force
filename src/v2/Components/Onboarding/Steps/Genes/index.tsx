import { throttle } from "lodash"
import React from "react"
import styled from "styled-components"
import { ProgressIndicator } from "v2/Components/ProgressIndicator"
import Colors from "../../../../Assets/Colors"
import Input from "../../../Input"

import { MultiButtonState } from "../../../Buttons/MultiStateButton"
import { media } from "../../../Helpers"
import { StepProps } from "../../Types"
import { Layout } from "../Layout"
import GeneList from "./GeneList"

const OnboardingSearchBox = styled.div`
  width: 450px;
  margin: 0 auto 100px;
  border-bottom: 1px solid ${Colors.grayRegular};
  ${media.sm`
    width: 100%;
    margin-bottom: 20px;
  `};
`

interface State {
  inputText: string
  followCount: number
  inputTextQuery: string
}

export default class Genes extends React.Component<StepProps, State> {
  state = { inputText: "", inputTextQuery: "", followCount: 0 }

  updateFollowCount(count: number) {
    this.setState({ followCount: count })
  }

  componentDidMount() {
    this.throttledTextChange = throttle(this.throttledTextChange, 500, {
      leading: true,
    })
  }

  searchTextChanged = e => {
    const updatedInputText = e.target.value
    this.setState({ inputText: updatedInputText })
    this.throttledTextChange(updatedInputText)
  }

  throttledTextChange = inputText => {
    this.setState({ inputTextQuery: inputText })
  }

  clearSearch(e) {
    this.setState({
      inputText: "",
      inputTextQuery: "",
    })
  }

  handleNextButtonClick() {
    this.props.history.push("/personalize/budget")
  }

  render() {
    return (
      <>
        <ProgressIndicator percentComplete={0.5} />
        <Layout
          title="What categories most interest you?"
          subtitle="Follow one or more"
          onNextButtonPressed={this.handleNextButtonClick.bind(this)}
          buttonState={
            this.state.followCount > 0
              ? MultiButtonState.Highlighted
              : MultiButtonState.Default
          }
        >
          <OnboardingSearchBox>
            <Input
              placeholder={"Search categories..."}
              block
              onInput={this.searchTextChanged}
              onPaste={this.searchTextChanged}
              onCut={this.searchTextChanged}
              value={this.state.inputText}
              autoFocus
            />
            <div style={{ marginBottom: "35px" }} />
            {
              <GeneList
                searchQuery={this.state.inputTextQuery}
                updateFollowCount={this.updateFollowCount.bind(this)}
              />
            }
          </OnboardingSearchBox>
        </Layout>
      </>
    )
  }
}
