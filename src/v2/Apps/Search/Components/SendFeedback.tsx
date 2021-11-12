import {
  Box,
  Button,
  CheckCircleIcon,
  Flex,
  Input,
  Text,
  TextArea,
  color,
} from "@artsy/palette"
import { SendFeedbackSearchResultsMutation } from "v2/__generated__/SendFeedbackSearchResultsMutation.graphql"
import { SystemContextProps } from "v2/System"
import { withSystemContext } from "v2/System"
import { Component } from "react"
import { commitMutation, graphql } from "react-relay"
import styled from "styled-components"
import { ErrorWithMetadata } from "v2/Utils/errors"
import createLogger from "v2/Utils/logger"

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

interface Inputs {
  message: string
  name: string
  email: string
}

interface State extends Inputs {
  submitted: boolean
  triggeredValidation: boolean
}

const logger = createLogger("Apps/Search/Components/SendFeedback.tsx")

class SendFeedbackForm extends Component<SystemContextProps, State> {
  state = {
    submitted: false,
    message: "",
    name: "",
    email: "",
    triggeredValidation: false,
  }

  handleClick() {
    const { relayEnvironment } = this.props
    const { message, name, email } = this.state

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    commitMutation<SendFeedbackSearchResultsMutation>(relayEnvironment, {
      // TODO: Inputs to the mutation might have changed case of the keys!
      mutation: graphql`
        mutation SendFeedbackSearchResultsMutation(
          $input: SendFeedbackMutationInput!
        ) {
          sendFeedback(input: $input) {
            feedbackOrError {
              ... on SendFeedbackMutationSuccess {
                feedback {
                  message
                }
              }
              ... on SendFeedbackMutationFailure {
                mutationError {
                  type
                  message
                  detail
                }
              }
            }
          }
        }
      `,
      variables: {
        input: { message, email, name },
      },
      // Add slight delay to make UX seem a bit nicer
      optimisticUpdater: () => {
        setTimeout(
          () =>
            this.setState({
              submitted: true,
            }),
          500
        )
      },
      onCompleted: data => {
        const {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          sendFeedback: { feedbackOrError },
        } = data
        if (feedbackOrError.mutationError) {
          logger.error(
            new ErrorWithMetadata(
              feedbackOrError.mutationError.type,
              feedbackOrError.mutationError.message
            )
          )
        } else {
          this.setState({
            submitted: true,
          })
        }
      },
    })
  }

  renderPersonalInfoInputs() {
    return (
      <LoggedOutInputContainer mt={2} alignContent="space-between">
        <Box mr={1} width="50%">
          <Input
            name="name"
            placeholder="Your name"
            onChange={({ currentTarget: { value } }) => {
              this.setState({ name: value })
            }}
            required
            error={this.errorForText("name")}
          />
        </Box>
        <Box width="50%">
          <Input
            name="email"
            placeholder="Email address"
            onChange={({ currentTarget: { value } }) => {
              this.setState({ email: value })
            }}
            required
            error={this.errorForEmail()}
          />
        </Box>
      </LoggedOutInputContainer>
    )
  }

  errorForEmail() {
    const { email, triggeredValidation } = this.state
    if (!triggeredValidation) return
    if (!email) return "Cannot leave field blank"
    if (!email.match(EMAIL_REGEX)) return "Invalid email."
  }

  errorForText(key: "message" | "name") {
    const { triggeredValidation } = this.state
    if (!triggeredValidation) return
    const text = this.state[key]
    if (!text) return "Cannot leave field blank"
  }

  hasErrors(): boolean {
    const { user } = this.props
    if (user) return !!this.errorForText("message")

    return !!(
      this.errorForEmail() ||
      this.errorForText("message") ||
      this.errorForText("name")
    )
  }

  renderFeedbackTextArea() {
    return (
      <FeedbackTextAreaContainer my={3}>
        <TextArea
          onChange={({ value }) => {
            this.setState({ message: value })
          }}
          placeholder="Your comments here"
          required
          error={this.errorForText("message")}
        />
      </FeedbackTextAreaContainer>
    )
  }

  renderSuccess() {
    return (
      <>
        <CheckCircleIcon />
        <Box mt={1} textAlign="center">
          <Text variant="text">Your message has been sent!</Text>
        </Box>
        <Box>
          <Text variant="caption">Thank you for helping to improve Artsy.</Text>
        </Box>
      </>
    )
  }

  renderFeedbackForm() {
    const { user } = this.props
    return (
      <>
        <Box textAlign="center">
          <Text variant="subtitle" mb={1}>
            Your feedback is important to us.
          </Text>
          <Text variant="text">
            Tell us how we can improve and help you find what you are looking
            for.
          </Text>
        </Box>
        {!user ? this.renderPersonalInfoInputs() : null}
        {this.renderFeedbackTextArea()}
        <Button
          onClick={() => {
            this.setState({ triggeredValidation: true }, () => {
              if (this.hasErrors()) return
              this.handleClick()
            })
          }}
        >
          Submit
        </Button>
      </>
    )
  }

  render() {
    const { submitted } = this.state

    return (
      <Box bg={color("black5")} p={6} mt={3}>
        <FeedbackContainer
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          {submitted ? this.renderSuccess() : this.renderFeedbackForm()}
        </FeedbackContainer>
      </Box>
    )
  }
}

const FeedbackContainer = styled(Flex)`
  min-height: 212px;
`

const FeedbackTextAreaContainer = styled(Box)`
  max-width: 484px;
  width: 100%;
`

const LoggedOutInputContainer = styled(Flex)`
  max-width: 484px;
  width: 100%;
`

export const SendFeedback = withSystemContext(SendFeedbackForm)
