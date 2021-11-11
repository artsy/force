import {
  Box,
  Button,
  CheckCircleIcon,
  Input,
  Link,
  Modal,
  Separator,
  Serif,
  TextArea,
  Text,
  Clickable,
} from "@artsy/palette"
import { CCPARequestMutation } from "v2/__generated__/CCPARequestMutation.graphql"
import { useSystemContext } from "v2/System"
import { useEffect, useState } from "react"
import * as React from "react"
import { commitMutation, graphql } from "react-relay"
import styled from "styled-components"
import { ErrorWithMetadata } from "v2/Utils/errors"
import { get } from "v2/Utils/get"
import createLogger from "v2/Utils/logger"
import { themeGet } from "@styled-system/theme-get"

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const logger = createLogger("Components/V2/CCPARequest.tsx")

interface Props {
  user?: User
}

const FeedbackTextAreaContainer = styled(Box)`
  max-width: 484px;
  width: 100%;
`

const IconContainer = styled(Box)`
  margin: 0 auto;
`

const Feedback = ({ setNotes, notes, triggeredValidation }) => {
  return (
    <>
      <Text variant="mediumText">Your message</Text>
      <FeedbackTextAreaContainer mt={1}>
        <TextArea
          onChange={({ value }) => {
            setNotes(value)
          }}
          placeholder="Describe your data request"
          required
          error={errorForText({ triggeredValidation, text: notes })}
        />
      </FeedbackTextAreaContainer>
    </>
  )
}

const errorForEmail = ({ triggeredValidation, email }) => {
  if (!triggeredValidation) return
  if (!email) return "Cannot leave field blank."
  if (!email.match(EMAIL_REGEX)) return "Please enter a valid email."
}

const errorForText = ({ triggeredValidation, text }) => {
  if (!triggeredValidation) return
  if (!text) return "Cannot leave field blank."
}

const hasErrors = ({ user, triggeredValidation, notes, name, email }) => {
  if (user) return !!errorForText({ triggeredValidation, text: notes })

  return !!(
    errorForEmail({ triggeredValidation, email }) ||
    errorForText({ triggeredValidation, text: name }) ||
    errorForText({ triggeredValidation, text: notes })
  )
}

const LoggedOutContents = ({
  triggeredValidation,
  setName,
  setEmail,
  setNotes,
  email,
  name,
  notes,
}) => {
  return (
    <>
      <Header />

      <Feedback
        notes={notes}
        triggeredValidation={triggeredValidation}
        setNotes={setNotes}
      />

      <Box mt={1}>
        <Input
          name="name"
          placeholder="Your full name"
          onChange={({ currentTarget: { value } }) => {
            setName(value)
          }}
          required
          error={errorForText({ text: name, triggeredValidation })}
        />
      </Box>
      <Box mt={1}>
        <Input
          name="email"
          placeholder="Your email address"
          onChange={({ currentTarget: { value } }) => {
            setEmail(value)
          }}
          required
          error={errorForEmail({ email, triggeredValidation })}
        />
      </Box>
    </>
  )
}

const LoggedInContents = ({ triggeredValidation, notes, email, setNotes }) => {
  return (
    <>
      <Header />
      <Separator mt={3} />

      <Box my={1}>
        <Serif size="3">From: {email}</Serif>
      </Box>

      <Separator mb={3} />
      <Feedback
        notes={notes}
        triggeredValidation={triggeredValidation}
        setNotes={setNotes}
      />
    </>
  )
}

const Header = () => {
  return (
    <Serif size="4" textAlign="center">
      Our{" "}
      <Link target="_blank" href="/privacy">
        Privacy Policy
      </Link>{" "}
      has the information we collect, how we use it, and why we use it.{"\n"}
      You can also email{" "}
      <Link href="mailto:privacy@artsy.net">privacy@artsy.net</Link> for more
      information or to submit a request.
    </Serif>
  )
}

const SuccessScreen = () => {
  return (
    <>
      <IconContainer pt={1}>
        <CheckCircleIcon fill="green100" height="32" width="32" />
      </IconContainer>
      <Box mt={3} textAlign="center">
        <Serif size="4">We've received your message.</Serif>
      </Box>
    </>
  )
}

const sendDataRequest = ({
  relayEnvironment,
  email,
  notes,
  name,
  setSubmitted,
}) => {
  commitMutation<CCPARequestMutation>(relayEnvironment, {
    mutation: graphql`
      mutation CCPARequestMutation($input: CreateAccountRequestMutationInput!) {
        createAccountRequest(input: $input) {
          accountRequestOrError {
            ... on CreateAccountRequestMutationSuccess {
              accountRequest {
                notes
              }
            }
            ... on CreateAccountRequestMutationFailure {
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
      input: { notes, email, name, action: "user_data" },
    },
    // Add slight delay to make UX seem a bit nicer
    optimisticUpdater: () => {
      setTimeout(() => setSubmitted(true), 500)
    },
    onCompleted: data => {
      const {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        createAccountRequest: { accountRequestOrError },
      } = data
      if (accountRequestOrError.mutationError) {
        logger.error(
          new ErrorWithMetadata(
            accountRequestOrError.mutationError.type,
            accountRequestOrError.mutationError.message
          )
        )
      } else {
        setSubmitted(true)
      }
    },
  })
}

export const CCPARequest: React.SFC<Props> = props => {
  const { user } = props
  const { relayEnvironment } = useSystemContext()
  const [showModal, setShowModal] = useState(false)

  const [notes, setNotes] = useState(null)
  const [email, setEmail] = useState(null)
  const [name, setName] = useState(null)
  const [triggeredValidation, setTriggeredValidation] = useState(false)
  const [clickedSubmit, setClickedSubmit] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const userEmail = get(props, p => p.user.email)

  const modalContents = submitted ? (
    <SuccessScreen />
  ) : !user ? (
    <LoggedOutContents
      email={email}
      name={name}
      notes={notes}
      triggeredValidation={triggeredValidation}
      setName={setName.bind(this)}
      setEmail={setEmail.bind(this)}
      setNotes={setNotes.bind(this)}
    />
  ) : (
    <LoggedInContents
      notes={notes}
      email={userEmail}
      triggeredValidation={triggeredValidation}
      setNotes={setNotes.bind(this)}
    />
  )

  useEffect(() => {
    if (clickedSubmit) {
      if (hasErrors({ user, email, name, notes, triggeredValidation })) {
        setClickedSubmit(false)
        return
      }
      sendDataRequest({
        relayEnvironment,
        email,
        name,
        notes,
        setSubmitted,
      })
    }
  }, [
    clickedSubmit,
    email,
    name,
    notes,
    relayEnvironment,
    triggeredValidation,
    user,
  ])

  const modalButton = submitted ? (
    <Button width="100%" onClick={() => setShowModal(false)}>
      Return to Artsy
    </Button>
  ) : (
    <Button
      width="100%"
      onClick={() => {
        setTriggeredValidation(true)
        setClickedSubmit(true)
      }}
    >
      Send message
    </Button>
  )

  const onClose = () => {
    setEmail(null)
    setName(null)
    setSubmitted(false)
    setNotes(null)
    setShowModal(false)
    setTriggeredValidation(false)
  }

  const title = submitted ? "Message sent" : "Personal Data Request"

  return (
    <>
      <CCPALink onClick={() => setShowModal(true)}>
        <Text variant="caption">Do not sell my personal information</Text>
      </CCPALink>

      <Modal
        title={title}
        show={showModal}
        onClose={onClose}
        FixedButton={modalButton}
      >
        {modalContents}
      </Modal>
    </>
  )
}

// Matches FooterLink styling
const CCPALink = styled(Clickable)`
  transition: color 0.25s;
  color: ${themeGet("colors.black60")};

  &:hover {
    color: ${themeGet("colors.black100")};
  }
`
