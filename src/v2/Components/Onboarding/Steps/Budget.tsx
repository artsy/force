import React, { useState } from "react"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { commitMutation, graphql } from "react-relay"
import styled from "styled-components"
import { ProgressIndicator } from "v2/Components/ProgressIndicator"
import { BudgetUpdateMyUserProfileMutation } from "v2/__generated__/BudgetUpdateMyUserProfileMutation.graphql"
import { withSystemContext } from "v2/Artsy"
import Colors from "../../../Assets/Colors"
import { MultiButtonState } from "../../Buttons/MultiStateButton"
import { media } from "../../Helpers"
import SelectableToggle from "../SelectableToggle"
import { Layout } from "./Layout"
import { useTracking } from "v2/Artsy/Analytics/useTracking"

const updateUserProfile = (priceRangeMax, relayEnvironment) => {
  const input = {
    priceRangeMin: -1,
    priceRangeMax,
  }

  commitMutation<BudgetUpdateMyUserProfileMutation>(relayEnvironment, {
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
    variables: { input },
  })
}

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

const budgetOptions = {
  "UNDER $500": 500,
  "UNDER $2,500": 2500,
  "UNDER $5,000": 5000,
  "UNDER $10,000": 10000,
  "UNDER $25,000": 25000,
  "UNDER $50,000": 50000,
  "NO BUDGET IN MIND": 1000000000000,
}

export const BudgetComponent = props => {
  const tracking = useTracking()
  const updateProfile = props.updateUserProfile || updateUserProfile
  const [selectedOption, setSelectedOption] = useState(null)

  const onOptionSelected = (index: number) => {
    const selection = { selection: Object.values(budgetOptions)[index] }
    setSelectedOption(selection)
  }

  const options = Object.keys(budgetOptions).map((text, index) => (
    <SelectableToggle
      key={index}
      text={text}
      onSelect={() => onOptionSelected(index)}
      selected={selectedOption?.selection === budgetOptions[text]}
    />
  ))

  const submit = () => {
    const priceRangeMax = selectedOption?.selection
    if (!priceRangeMax) return

    updateProfile(priceRangeMax, props.relayEnvironment)

    const redirectTo = props.redirectTo || "/"
    setTimeout(() => window.location.assign(redirectTo), 500)

    const event = {
      context_module: ContextModule.onboardingInterests,
      context_owner_type: OwnerType.onboarding,
      data_input: selectedOption,
    }
    tracking.trackEvent(event)

    const completedEvent: any = {
      action: "Completed Onboarding",
    }
    tracking.trackEvent(completedEvent)
  }

  return (
    <>
      <ProgressIndicator percentComplete={0.75} />
      <Layout
        title="What’s your maximum artwork budget?"
        subtitle="Select one"
        onNextButtonPressed={submit}
        isLastStep
        buttonState={
          selectedOption
            ? MultiButtonState.Highlighted
            : MultiButtonState.Default
        }
      >
        <OptionsContainer>{options}</OptionsContainer>
      </Layout>
    </>
  )
}

const Budget = withSystemContext(BudgetComponent)
export default Budget
