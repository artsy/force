import {
  Spacer,
  Text,
  GridColumns,
  Column,
  Box,
  BoxProps,
} from "@artsy/palette"
import * as React from "react"
import styled from "styled-components"
import { RouterLink } from "System/Components/RouterLink"

interface ErrorPageProps extends BoxProps {
  code: number | string
  message?: string
  detail?: string
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  code,
  message,
  detail,
  children,
  ...rest
}) => {
  // We assume string codes are client exceptions
  const headline =
    typeof code === "number" ? ERROR_MESSAGES[code] : "Internal Error"

  return (
    <Box {...rest}>
      <GridColumns gridRowGap={4}>
        <Column span={6} wrap>
          <Text variant="xl">{headline}</Text>

          <Text variant="xl" color="black60">
            {code}
          </Text>

          <Spacer y={2} />

          <Text variant="sm-display" color="black60">
            Please contact{" "}
            <RouterLink inline to="mailto:support@artsy.net">
              support@artsy.net
            </RouterLink>{" "}
            with any questions.
          </Text>

          {children ?? (
            <Text variant="sm-display" color="black60">
              <RouterLink to="/">Go to Artsy Homepage</RouterLink>
            </Text>
          )}
        </Column>
      </GridColumns>

      {((typeof code === "number" && code >= 500) ||
        typeof code === "string") &&
        (detail || message) && (
          <>
            <Spacer y={4} />

            {message && (
              <Message color={detail ? "black100" : "black60"}>
                {message}
              </Message>
            )}

            {detail && (
              <Detail {...(message ? { mt: "-1px" } : {})}>{detail}</Detail>
            )}
          </>
        )}
    </Box>
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
  white-space: pre;
`

const Message = styled(Code).attrs({
  border: "1px solid",
  borderColor: "black10",
  px: 1,
  py: 0.5,
  mx: -1,
})``

const Detail = styled(Code).attrs({
  border: "1px solid",
  borderColor: "black10",
  px: 1,
  py: 0.5,
  mx: -1,
  maxHeight: 600,
})`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`

export const ERROR_MESSAGES: Record<number, string> = {
  // 4×× Client Error
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Sorry, the page you were looking for doesn’t exist at this URL.",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "Request-URI Too Long",
  415: "Unsupported Media Type",
  416: "Requested Range Not Satisfiable",
  417: "Expectation Failed",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  444: "Connection Closed Without Response",
  451: "Unavailable For Legal Reasons",
  499: "Client Closed Request",
  // 5×× Server Error
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required",
  599: "Network Connect Timeout Error",
}
