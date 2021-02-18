import React from "react"
import { commitMutation, graphql } from "react-relay"
import styled from "styled-components"
import { ProgressIndicator } from "v2/Components/ProgressIndicator"
import { BudgetUpdateMyUserProfileMutation } from "v2/__generated__/BudgetUpdateMyUserProfileMutation.graphql"
import { SystemContextProps, withSystemContext } from "v2/Artsy"
import Colors from "../../../Assets/Colors"
import { MultiButtonState } from "../../Buttons/MultiStateButton"
import { media } from "../../Helpers"
import { Props } from "../Wizard"
import SelectableToggle from "../SelectableToggle"
import { StepProps } from "../Types"
import { Layout } from "./Layout"
import track from "react-tracking"
import Events from "../../../Utils/Events"

const OptionsContainer = styled.div`
  width: 450px;
  margin: 0 auto 100px;

  &:last-child {
    border-bottom: 1px solid ${Colors.grayRegular};
  }
  ${media.sm`
    width: 100%;
    margin-bottom: 20px;
  `};
`

interface State {
  selection: number | null
}

@track({}, { dispatch: data => Events.postEvent(data) })
export class BudgetComponent extends React.Component<
  Props & StepProps & SystemContextProps,
  State
> {
  options = {
    "UNDER $500": 500,
    "UNDER $2,500": 2500,
    "UNDER $5,000": 5000,
    "UNDER $10,000": 10000,
    "UNDER $25,000": 25000,
    "UNDER $50,000": 50000,
    "NO BUDGET IN MIND": 1000000000000,
  }

  state = {
    selection: null,
  }

  onOptionSelected = (index: number) => {
    const selection = { selection: Object.values(this.options)[index] }
    this.setState(selection)
  }

  submit() {
    const priceRangeMax = this.state.selection

    commitMutation<BudgetUpdateMyUserProfileMutation>(
      this.props.relayEnvironment,
      {
        // TODO: Inputs to the mutation might have changed case of the keys!
        mutation: graphql`
          mutation BudgetUpdateMyUserProfileMutation(
            $input: UpdateMyProfileInput!
          ) {
            updateMyUserProfile(input: $input) {
              user {
                name
              }
            }
          }
        `,
        variables: {
          input: {
            priceRangeMin: -1,
            priceRangeMax,
          },
        },
      }
    )

    const redirectTo = this.props.redirectTo || "/"
    setTimeout(() => window.location.assign(redirectTo), 500)

    this.props.tracking.trackEvent({
      action: "Completed Onboarding",
    })
  }

  render() {
    const options = Object.keys(this.options).map((text, index) => (
      <SelectableToggle
        key={index}
        text={text}
        onSelect={this.onOptionSelected.bind(this, index)}
        selected={this.state.selection === this.options[text]}
      />
    ))

    return (
      <>
        <ProgressIndicator percentComplete={0.75} />
        <Layout
          title="What’s your maximum artwork budget?"
          subtitle="Select one"
          onNextButtonPressed={this.state.selection && this.submit.bind(this)}
          isLastStep
          buttonState={
            this.state.selection
              ? MultiButtonState.Highlighted
              : MultiButtonState.Default
          }
        >
          <OptionsContainer>{options}</OptionsContainer>
        </Layout>
      </>
    )
  }
}

const Budget = withSystemContext(BudgetComponent)
export default Budget
