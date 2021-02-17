import React from "react"
import { commitMutation, graphql } from "react-relay"
import styled from "styled-components"
import { ProgressIndicator } from "v2/Components/ProgressIndicator"
import {
  CollectorIntentUpdateCollectorProfileMutation,
  Intents,
} from "v2/__generated__/CollectorIntentUpdateCollectorProfileMutation.graphql"
import { SystemContextProps, withSystemContext } from "v2/Artsy"
import Colors from "../../../Assets/Colors"
import { MultiButtonState } from "../../Buttons/MultiStateButton"
import { media } from "../../Helpers"
import SelectableToggle from "../SelectableToggle"
import { StepProps } from "../Types"
import { Layout } from "./Layout"

const updateCollectorProfile = (intents, relayEnvironment) => {
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

type Props = StepProps & SystemContextProps

interface CollectorIntentComponentProps extends Props {
  updateProfile
}

interface State {
  selectedOptions: { [option: string]: boolean }
  error?: string
}

export class CollectorIntentComponent extends React.Component<
  CollectorIntentComponentProps,
  State
> {
  static intentEnum = {
    "buy art & design": "BUY_ART_AND_DESIGN",
    "sell art & design": "SELL_ART_AND_DESIGN",
    "research art prices": "RESEARCH_ART_PRICES",
    "learn about art": "LEARN_ABOUT_ART",
    "find out about new exhibitions": "FIND_ART_EXHIBITS",
    "read art market news": "READ_ART_MARKET_NEWS",
  }

  static defaultProps = {
    updateProfile: updateCollectorProfile,
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedOptions: {},
    }
  }

  onOptionSelected = index => {
    const selectedOptions = Object.assign({}, this.state.selectedOptions)
    selectedOptions[index] = !selectedOptions[index]

    this.setState({
      selectedOptions,
    })
  }

  selectedIntents() {
    const intents = Object.values(CollectorIntentComponent.intentEnum).filter(
      (_, index) => this.state.selectedOptions[index]
    ) as Intents[]

    return intents
  }

  submit() {
    const selected = this.selectedIntents()

    if (selected.length > 0) {
      this.props.updateProfile(selected, this.props.relayEnvironment)
    }

    this.props.history.push("/personalize/artists")
  }

  render() {
    const options = Object.keys(
      CollectorIntentComponent.intentEnum
    ).map((text, index) => (
      <SelectableToggle
        key={index}
        text={text}
        onSelect={this.onOptionSelected.bind(this, index)}
        selected={this.state.selectedOptions[index]}
      />
    ))

    const buttonState =
      this.selectedIntents().length > 0
        ? MultiButtonState.Highlighted
        : MultiButtonState.Default

    return (
      <>
        <ProgressIndicator />
        <Layout
          buttonState={buttonState}
          onNextButtonPressed={this.submit.bind(this)}
          subtitle="Select all that apply"
          title="How would you like to use Artsy?"
        >
          <OptionsContainer>{options}</OptionsContainer>
        </Layout>
      </>
    )
  }
}

const CollectorIntent = withSystemContext(CollectorIntentComponent)
export default CollectorIntent
