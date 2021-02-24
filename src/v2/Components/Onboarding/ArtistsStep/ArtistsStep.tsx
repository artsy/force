import { throttle } from "lodash"
import React from "react"
import styled from "styled-components"
import { ProgressIndicator } from "v2/Components/ProgressIndicator"
import Colors from "../../../Assets/Colors"
import Input from "../../Input"
import { Spacer } from "@artsy/palette"
import { MultiButtonState } from "../../Buttons/MultiStateButton"
import { media } from "../../Helpers"
import { StepProps } from "../Types"
import { Layout } from "../Steps/Layout"
import ArtistList from "./ArtistList"

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

export class ArtistsStep extends React.Component<StepProps, State> {
  state = {
    inputText: "",
    inputTextQuery: "",
    followCount: 0,
  }

  updateFollowCount(count: number) {
    const updatedFollowCount = this.state.followCount + count

    this.setState({ followCount: updatedFollowCount })
  }

  submit() {
    this.props.router.push("/personalize/categories")
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

  render() {
    return (
      <>
        <ProgressIndicator percentComplete={0.25} />
        <Layout
          title="Who are your favorite artists?"
          subtitle="Follow one or more"
          onNextButtonPressed={this.submit.bind(this)}
          buttonState={
            this.state.followCount > 0
              ? MultiButtonState.Highlighted
              : MultiButtonState.Default
          }
        >
          <OnboardingSearchBox>
            <Input
              placeholder={"Search artists..."}
              block
              onInput={this.searchTextChanged.bind(this)}
              onPaste={this.searchTextChanged.bind(this)}
              onCut={this.searchTextChanged.bind(this)}
              autoFocus
            />
            <Spacer my={2} />
            <ArtistList
              searchQuery={this.state.inputTextQuery}
              updateFollowCount={this.updateFollowCount.bind(this)}
            />
          </OnboardingSearchBox>
        </Layout>
      </>
    )
  }
}
