import { useState } from "react"
import * as React from "react"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { commitMutation, graphql } from "react-relay"
import styled from "styled-components"
import { ProgressIndicator } from "v2/Components/ProgressIndicator"
import { BudgetUpdateMyUserProfileMutation } from "v2/__generated__/BudgetUpdateMyUserProfileMutation.graphql"
import { withSystemContext } from "v2/System"
import Colors from "../../../Assets/Colors"
import { MultiButtonState } from "../../Buttons/MultiStateButton"
import { media } from "../../Helpers"
import SelectableToggle from "../SelectableToggle"
import { Layout } from "./Layout"
import { useTracking } from "v2/System/Analytics/useTracking"
import { Environment } from "relay-runtime"
import { computeRedirectTo } from "v2/Components/Onboarding/helpers"
import Cookies from "cookies-js"

const bootstrapData = window.__BOOTSTRAP__ || {}
const computedRedirectTo = computeRedirectTo(Cookies, bootstrapData)

type UserUpdater = (
  priceRangeMax: number,
  relayEnvironment: Environment
) => void

const updateUserProfile: UserUpdater = (priceRangeMax, relayEnvironment) => {
  const input = {
    completedOnboarding: true,
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
} as const

interface Props {
  redirectTo: string
  relayEnvironment: Environment
  updateUserProfile: UserUpdater
}

export const BudgetComponent: React.FC<Props> = props => {
  const tracking = useTracking()
  const updateProfile = props.updateUserProfile || updateUserProfile
  const redirectTo = props.redirectTo || computedRedirectTo
  const [selectedOption, setSelectedOption] = useState(null)

  const onOptionSelected = (index: number) => {
    const selection = { selection: Object.values(budgetOptions)[index] }
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    setSelectedOption(selection)
  }

  const options = Object.keys(budgetOptions).map((text, index) => (
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    <SelectableToggle
      key={index}
      text={text}
      onSelect={() => onOptionSelected(index)}
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      selected={selectedOption?.selection === budgetOptions[text]}
    />
  ))

  const submit = () => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const priceRangeMax = selectedOption?.selection
    if (!priceRangeMax) return

    updateProfile(priceRangeMax, props.relayEnvironment)

    const event = {
      action_type: ActionType.onboardingUserInputData,
      context_module: ContextModule.onboardingBudget,
      context_owner_type: OwnerType.onboarding,
      data_input: selectedOption,
    }
    tracking.trackEvent(event)

    const completedEvent: any = {
      action: "Completed Onboarding",
    }
    tracking.trackEvent(completedEvent)

    setTimeout(() => window.location.assign(redirectTo), 500)
  }

  return (
    <>
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      <ProgressIndicator percentComplete={0.75} />
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
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
