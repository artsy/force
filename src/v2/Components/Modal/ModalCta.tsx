import { Button, color, space } from "@artsy/palette"
import { SFC } from "react"
import styled from "styled-components"
import { media } from "../Helpers"

export interface CtaProps {
  isFixed: boolean
  text: string
  onClick: () => void
}

export const ModalCta: SFC<{
  cta?: CtaProps
  hasImage?: boolean
  onClose: () => void
}> = props => {
  const {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    cta: { isFixed, onClick, text },
    hasImage,
    onClose,
  } = props

  return (
    <Cta isFixed={isFixed} hasImage={hasImage}>
      <Button onClick={onClick || onClose}>{text}</Button>
    </Cta>
  )
}

const Cta = styled.div<{ isFixed?: boolean; hasImage?: boolean }>`
  padding: ${space(2)}px 0 ${space(3)}px 0;

  button {
    margin: 0;
    width: 100%;
  }
  ${props =>
    props.isFixed &&
    `
    position: absolute;
    bottom: 0;
    right: ${space(4)}px;
    left: ${props.hasImage ? "calc(50% + 40px)" : space(4) + "px"};
    background: white;
    border-top: 1px solid ${color("black10")};
  `};

  ${media.sm`
    padding-bottom: ${space(2)}px;
    ${(props: { isFixed?: boolean }) =>
      props.isFixed &&
      `
      right: ${space(2)}px;
      left: ${space(2)}px
    `}
  `};
`
