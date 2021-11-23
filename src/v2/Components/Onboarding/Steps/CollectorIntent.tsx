import { useState } from "react"
import * as React from "react"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { commitMutation, graphql } from "react-relay"
import styled from "styled-components"
import { ProgressIndicator } from "v2/Components/ProgressIndicator"
import {
  CollectorIntentUpdateCollectorProfileMutation,
  Intents,
} from "v2/__generated__/CollectorIntentUpdateCollectorProfileMutation.graphql"
import { withSystemContext } from "v2/System"
import Colors from "../../../Assets/Colors"
import { MultiButtonState } from "../../Buttons/MultiStateButton"
import { media } from "../../Helpers"
import SelectableToggle from "../SelectableToggle"
import { Layout } from "./Layout"
import { useTracking } from "v2/System/Analytics/useTracking"
import { Environment } from "relay-runtime"
import { routerShape } from "found/PropTypes"

const intentEnum = {
  "buy art & design": "BUY_ART_AND_DESIGN",
  "sell art & design": "SELL_ART_AND_DESIGN",
  "research art prices": "RESEARCH_ART_PRICES",
  "learn about art": "LEARN_ABOUT_ART",
  "find out about new exhibitions": "FIND_ART_EXHIBITS",
  "read art market news": "READ_ART_MARKET_NEWS",
} as const

type ProfileUpdater = (
  intents: Intents[],
  relayEnvironment: Environment
) => void

const updateCollectorProfile: ProfileUpdater = (intents, relayEnvironment) => {
  commitMutation<CollectorIntentUpdateCollectorProfileMutation>(
    relayEnvironment,
    {
      mutation: graphql`
        mutation CollectorIntentUpdateCollectorProfileMutation(
          $input: UpdateCollectorProfileInput!
        ) {
          updateCollectorProfile(input: $input) {
            intents
          }
        }
      `,
      variables: { input: { intents } },
    }
  )
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

interface Props {
  relayEnvironment: Environment
  router: routerShape
  updateProfile: ProfileUpdater
}

export const CollectorIntentComponent: React.FC<Props> = props => {
  const tracking = useTracking()
  const updateProfile = props.updateProfile || updateCollectorProfile

  const [selectedOptions, setSelectedOptions] = useState({})

  const onOptionSelected = index => {
    const updatedSelectedOptions = Object.assign({}, selectedOptions)
    updatedSelectedOptions[index] = !updatedSelectedOptions[index]
    setSelectedOptions(updatedSelectedOptions)
  }

  const submit = () => {
    const selected = selectedIntents()

    if (selected.length > 0) {
      updateProfile(selected, props.relayEnvironment)

      const dataInput = selected.join(" ")
      const event = {
        action_type: ActionType.onboardingUserInputData,
        context_module: ContextModule.onboardingInterests,
        context_owner_type: OwnerType.onboarding,
        data_input: dataInput,
      }
      tracking.trackEvent(event)
    }

    props.router.push("/personalize/artists")
  }

  const optionTags = Object.keys(intentEnum).map((text, index) => (
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    <SelectableToggle
      key={index}
      text={text}
      onSelect={() => onOptionSelected(index)}
      selected={selectedOptions[index]}
    />
  ))

  const selectedIntents = () => {
    const intents = Object.values(intentEnum).filter(
      (_, index) => selectedOptions[index]
    ) as Intents[]

    return intents
  }

  const buttonState =
    selectedIntents().length > 0
      ? MultiButtonState.Highlighted
      : MultiButtonState.Default

  return (
    <>
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      <ProgressIndicator />
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      <Layout
        buttonState={buttonState}
        onNextButtonPressed={submit}
        subtitle="Select all that apply"
        title="How would you like to use Artsy?"
      >
        <OptionsContainer>{optionTags}</OptionsContainer>
      </Layout>
    </>
  )
}

const CollectorIntent = withSystemContext(CollectorIntentComponent)
export default CollectorIntent
