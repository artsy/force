import * as Fonts from "v2/Assets/Fonts"
import React from "react"
import styled, { StyledFunction } from "styled-components"
import request from "superagent"
import Colors from "../../../Assets/Colors"
import InvertedButton from "../../Buttons/Inverted"
import { borderedInput } from "../../Mixins"
import { EMAIL_REGEX } from "../Constants"

interface EmailProps {
  signupUrl: string
}

interface EmailState {
  value: string
  error: boolean
  disabled: boolean
  message: string
}

interface InputProps {
  isError: boolean
  isReadOnly: boolean
}

export class InstantArticleEmailSignup extends React.Component<
  EmailProps,
  EmailState
  > {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      error: false,
      disabled: false,
      message: "",
    }
  }

  onClick = () => {
    this.setState({ disabled: true })
    if (this.state.value.match(EMAIL_REGEX)) {
      request
        .post(this.props.signupUrl)
        .send({ email: this.state.value })
        .set("accept", "json")
        .end((err, res) => {
          if (err) {
            this.flashMessage("Error. Please try again", true)
          } else {
            this.flashMessage("Thank you!", false)
          }
        })
    } else {
      this.flashMessage("Invalid Email... Please try again", true)
    }
  }

  flashMessage = (message, error) => {
    this.setState({ message, error })
    setTimeout(() => {
      this.setState({ message: "", disabled: false, error: false })
    }, 2000)
  }

  onInputChange = e => {
    this.setState({ value: e.target.value, error: null })
  }

  render() {
    return (
      <InstantArticleEmailContainer>
        <Subtitle>The Daily Editorial Newsletter</Subtitle>
        <Title>The latest art-world news and stories in your inbox</Title>
        <Form>
          <Input
            type="email"
            placeholder="Enter Your Email..."
            onChange={this.onInputChange}
            value={this.state.message || this.state.value}
            readOnly={this.state.message.length > 0}
            isError={this.state.error}
            isReadOnly={this.state.message.length > 0}
          />
          <StyledButton disabled={this.state.disabled} onClick={this.onClick}>
            Subscribe
          </StyledButton>
        </Form>
      </InstantArticleEmailContainer>
    )
  }
}

const input: StyledFunction<InputProps & React.HTMLProps<HTMLInputElement>> =
  styled.input
const Input = input`
  ${borderedInput}
  width: 100%;
  border-width: 1px;
  color: ${props => (props.isError ? Colors.redMedium : "black")};
  ${props => (props.isReadOnly ? Fonts.unica("s16") : "")}
`
const InstantArticleEmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  padding: 30px 0;
  margin: 0 20px;
  border-top: 1px solid ${Colors.grayRegular};
  border-bottom: 1px solid ${Colors.grayRegular};
`
const Title = styled.div`
  ${Fonts.garamond("s23")};
  margin-bottom: 30px;
`
const Subtitle = styled.div`
  ${Fonts.avantgarde("s11")};
  margin-bottom: 10px;
`
const StyledButton = styled(InvertedButton)`
  border-radius: 2px;
  height: 30px;
  width: 80px;
  margin-left: -100px;
  ${Fonts.avantgarde("s11")};
`
const Form = styled.div`
  display: flex;
`
