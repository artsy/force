import {
  Spacer,
  Text,
  GridColumns,
  Column,
  Box,
  ThemeProviderV3,
} from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

interface ErrorPageProps {
  code: number
  message?: string
  detail?: string
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  code,
  message,
  detail,
}) => {
  const defaultMessage =
    code === 404
      ? "Sorry, the page you were looking for doesn’t exist at this URL."
      : "Internal Error"

  const detailMessage = message ? `Error Message: ${message}` : detail

  return (
    <ThemeProviderV3>
      <GridColumns my={4} gridRowGap={4}>
        <Column span={6} wrap>
          <Text variant="xl">{defaultMessage}</Text>

          <Text variant="xl" color="black60">
            {code}
          </Text>

          <Spacer mb={2} />

          <Text variant="md" color="black60">
            Please contact{" "}
            <a href="mailto:support@artsy.net">support@artsy.net</a> with any
            questions.
            <br />
            <RouterLink to="/">Go to Artsy homepage</RouterLink>
          </Text>
        </Column>

        {code !== 404 && !!detailMessage && (
          <Column span={12}>
            <Code
              border="1px solid"
              borderColor="black10"
              color="black60"
              px={1}
              py={0.5}
              mx={-1}
              maxHeight={600}
            >
              {detailMessage}
            </Code>
          </Column>
        )}
      </GridColumns>
    </ThemeProviderV3>
  )
}

// TODO: Consider extracting a code/monospace font variant in Palette
const Code = styled(Box)`
  font-size: 13px;
  font-family: "Menlo", "Monaco", "Andale Mono", "lucida console", "Courier New",
    monospace;
  line-height: 1.6;
  text-align: left;
  word-break: break-word;
  overflow-x: auto;
`
