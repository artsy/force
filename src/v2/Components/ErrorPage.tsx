import { Button, Serif, Spacer, color } from "@artsy/palette"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { garamond } from "v2/Assets/Fonts"
import React from "react"
import styled from "styled-components"

interface ErrorPageProps {
  code: number
  message?: string
  detail?: string
}

interface ErrorCodeBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  code: number
}

export class ErrorPage extends React.Component<ErrorPageProps, null> {
  render() {
    const { code, message, detail } = this.props
    const defaultMessage =
      code === 404
        ? "Sorry, the page you were looking for doesn’t exist at this URL."
        : "Internal Error"

    const detailMessage = message ? `Error Message: ${message}` : detail

    return (
      <HorizontalPadding>
        <ErrorCodeBackground code={code}>
          <ErrorDefaultMessage>{defaultMessage}</ErrorDefaultMessage>
          {code !== 404 && <ErrorInner>{detailMessage}</ErrorInner>}
          <Serif size="4" color="black60">
            Please contact{" "}
            <Link href="mailto:support@artsy.net">support@artsy.net</Link> with
            any questions.
          </Serif>
          <Spacer mb={4} />
          <Link href="/">
            <Button size="large">Go to Artsy homepage</Button>
          </Link>
        </ErrorCodeBackground>
      </HorizontalPadding>
    )
  }
}

const Link = styled.a`
  color: ${color("black100")};
`

const ErrorDefaultMessage = styled.div`
  max-width: 60%;
  margin: 40px auto;
  ${garamond("s40")};
`

const ErrorInner = styled.div`
  background: ${color("white100")};
  border: 0;
  border: 3px solid ${color("black10")};
  color: ${color("black60")};
  font-size: 13px;
  line-height: 1.6em;
  margin: 20px auto;
  max-height: 115px;
  max-width: 75%;
  font-family: "Menlo", "Monaco", "Andale Mono", "lucida console", "Courier New",
    monospace;
  overflow-x: auto;
  padding: 5px 9px;
  text-align: left;
  word-break: break-word;
`

const ErrorCodeBackground = styled.div<ErrorCodeBackgroundProps>`
  position: absolute;
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 0 20px;
  top: calc(50% \- 70px);
  left: 50%;
  transform: translate(-50%, -50%);

  &::before {
    content: "${props => `${props.code}`}";
    display: block;
    position: absolute;
    top: calc(50% \+ 30px);
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 535px;
    line-height: 1;
    z-index: -1;
    color: ${color("black5")};
  }
`
