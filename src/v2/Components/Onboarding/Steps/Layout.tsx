import Colors from "v2/Assets/Colors"
import { avantgarde } from "v2/Assets/Fonts"
import { Component } from "react"
import styled from "styled-components"
import MultiStateButton, {
  MultiButtonState,
} from "../../Buttons/MultiStateButton"
import { media } from "../../Helpers"
import StyledTitle from "../../Title"

interface Props {
  title: string
  subtitle: string
  onNextButtonPressed?: () => void
  isLastStep?: boolean | null
  buttonState?: MultiButtonState | null
}

const Container = styled.div`
  max-width: 930px;
  margin-left: auto;
  margin-right: auto;
  ${media.sm`
    margin: 20px;
  `};
`

const MainTitle = styled(StyledTitle)`
  text-align: center;
  line-height: normal;
  margin-bottom: 6px;
  ${media.sm`
    text-align: left;
  `};
`
const Subtitle = styled(StyledTitle)`
  ${avantgarde("s13")};
  color: ${Colors.grayDark};
  margin-top: 6px;
  margin-bottom: 30px;
  text-align: center;
  line-height: normal;
  ${media.sm`
    text-align: left;
    margin-bottom: 15px;
  `};
`

const ItemContainer = styled.div`
  padding-bottom: 50px;
`

/* MS IE11 and Edge don't support for the sticky position property */
const FixedButttonContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
`

/* Mobile safari doesn't support for the fixed position property:
 *   https://www.eventbrite.com/engineering/mobile-safari-why/
 **/
const StickyButtonContainer = styled.div`
  /* stylelint-disable-next-line value-no-vendor-prefix */
  position: -webkit-sticky;
  bottom: 0;
  background: linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 17%,
    white 35%,
    white
  );
  display: flex;
  justify-content: center;
`

const NextButton = styled(MultiStateButton)`
  margin: 50px 0;
  display: block;
  width: 250px;

  &:disabled {
    border: 1px solid ${Colors.grayRegular};
  }

  ${media.sm`
    width: 100%;
    margin: 25px 0 0;
  `};
`
NextButton.displayName = "NextButton"

export class Layout extends Component<Props, null> {
  render() {
    const disabled = !this.props.onNextButtonPressed
    const buttonText = this.props.isLastStep ? "finished" : "next"
    return (
      <Container>
        <MainTitle>{this.props.title} </MainTitle>
        <Subtitle titleSize="xxsmall">{this.props.subtitle}</Subtitle>
        <ItemContainer>{this.props.children}</ItemContainer>

        <FixedButttonContainer>
          <StickyButtonContainer>
            <NextButton
              disabled={disabled}
              onClick={this.props.onNextButtonPressed}
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              state={this.props.buttonState}
            >
              {buttonText}
            </NextButton>
          </StickyButtonContainer>
        </FixedButttonContainer>
      </Container>
    )
  }
}
