import { Text, Box, Clickable } from "@artsy/palette"
import { FC, useEffect } from "react"
import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import { useTransition } from "Utils/Hooks/useTransition"
import { wait } from "Utils/wait"
import styled from "styled-components"

interface RetrospectiveBeginProps {
  onStart: () => void
}

export const RetrospectiveBegin: FC<RetrospectiveBeginProps> = ({
  onStart,
}) => {
  const { register, transition } = useTransition({
    initialStatus: "Out",
  })

  useEffect(() => {
    const init = async () => {
      await wait(500)
      transition("In")
    }

    init()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = async () => {
    await transition("Out")
    await wait(1000)

    onStart()
  }

  return (
    <Clickable
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      position="fixed"
      top={0}
      left={0}
      style={{ gap: 20 }}
      p={4}
      onClick={handleClick}
    >
      <Logo ref={register(0)} data-state="Out">
        <ArtsyLogoIcon />
      </Logo>

      <Title ref={register(1)} variant="xxxl" data-state="Out">
        Your 2023 Retrospective
      </Title>

      <Cta ref={register(2)} variant="xxxl" color="black60" data-state="Out">
        Let’s Begin
      </Cta>
    </Clickable>
  )
}

const Logo = styled(Box)`
  transition: opacity 500ms, transform 500ms;

  &[data-state="In"] {
    opacity: 1;
    transform: translateY(0);
  }

  &[data-state="Out"] {
    opacity: 0;
    transform: translateY(20px);
  }
`

const Title = styled(Text)`
  transition: opacity 500ms, transform 500ms;

  &[data-state="In"] {
    opacity: 1;
    transform: translateY(0);
  }

  &[data-state="Out"] {
    opacity: 0;
    transform: translateY(20px);
  }
`

const Cta = styled(Text)`
  transition: opacity 500ms, transform 500ms;

  &[data-state="In"] {
    opacity: 1;
    transform: translateY(0);
  }

  &[data-state="Out"] {
    opacity: 0;
    transform: translateY(20px);
  }
`
