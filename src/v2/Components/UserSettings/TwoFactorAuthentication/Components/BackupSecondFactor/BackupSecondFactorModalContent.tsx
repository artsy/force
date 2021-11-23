import { Button, BorderBoxProps, Box, Flex, Sans } from "@artsy/palette"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import React, { useEffect, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { BackupSecondFactorModalContent_me } from "v2/__generated__/BackupSecondFactorModalContent_me.graphql"
import { BackupSecondFactorModalContentQuery } from "v2/__generated__/BackupSecondFactorModalContentQuery.graphql"

import { useSystemContext } from "v2/System"
import { renderWithLoadProgress } from "v2/System/Relay/renderWithLoadProgress"

interface BackupSecondFactorModalContentProps extends BorderBoxProps {
  me: BackupSecondFactorModalContent_me
}

export const BackupSecondFactorModalContent: React.FC<BackupSecondFactorModalContentProps> = props => {
  const { me } = props

  const [supportsClipboard, setSupportsClipboard] = useState(false)

  useEffect(() => {
    // Only render the copy button if browser supports the Clipboard API
    // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
    if ("clipboard" in navigator) setSupportsClipboard(true)
  }, [])

  function copyCodesToClipboard() {
    const codes = me.backupSecondFactors!.map(item => item!.code).join("\n")
    navigator.clipboard.writeText(codes)
  }

  return (
    <Box minHeight="280px">
      <Sans size="3" color="black60">
        Store these two-factor recovery codes in a safe place. You can use these
        one-time codes to access your account.
      </Sans>
      <Flex mt={3} flexDirection="row" flexWrap="wrap">
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        {me.backupSecondFactors.map((factor, index) => (
          <Box width="50%" key={index}>
            <Sans size="6" color="black60" textAlign="center" py={0.5}>
              {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
              {factor.code}
            </Sans>
          </Box>
        ))}
      </Flex>

      {supportsClipboard && (
        <Flex justifyContent="center">
          <Button
            onClick={copyCodesToClipboard}
            variant="secondaryOutline"
            size="small"
            mt={1}
            mb={1}
            data-test="copyButton"
          >
            Copy
          </Button>
        </Flex>
      )}
    </Box>
  )
}

export const ModalContentFragmentContainer = createFragmentContainer(
  BackupSecondFactorModalContent,
  {
    me: graphql`
      fragment BackupSecondFactorModalContent_me on Me {
        backupSecondFactors: secondFactors(kinds: [backup]) {
          ... on BackupSecondFactor {
            code
          }
        }
      }
    `,
  }
)

export const BackupSecondFactorModalContentQueryRenderer = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<BackupSecondFactorModalContentQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query BackupSecondFactorModalContentQuery @raw_response_type {
          me {
            ...BackupSecondFactorModalContent_me
          }
        }
      `}
      render={renderWithLoadProgress(ModalContentFragmentContainer)}
    />
  )
}
