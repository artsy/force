import { forwardRef, useEffect, useImperativeHandle } from "react"
import { Box, Spacer, Text } from "@artsy/palette"
import { useTransition } from "Utils/Hooks/useTransition"
import { wait } from "Utils/wait"
import styled from "styled-components"

interface RetrospectiveTopArtistsProps {
  data: [string, number][]
}

export const RetrospectiveTopArtists = forwardRef<
  { transitionOut: () => void },
  RetrospectiveTopArtistsProps
>(({ data }, forwardedRef) => {
  const maxCount = Math.max(...data.map(([_, count]) => count))
  const percentages = data.map(([_, count]) => (count / maxCount) * 100)

  const { transition, register } = useTransition({
    initialStatus: "Out",
    duration: 1000,
  })

  useEffect(() => {
    const init = async () => {
      await wait(1000)
      transition("In")
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useImperativeHandle(
    forwardedRef,
    () => ({
      transitionOut: () => {
        transition("Out")
      },
    }),
    [transition]
  )

  return (
    <>
      <Title ref={register(0)} variant="xxxl" data-state="Out">
        Top Artists
      </Title>

      <Spacer y={6} />

      <Box display="flex" flexDirection="column" style={{ gap: 40 }}>
        {data.map(([name, count], i) => {
          const percentage = percentages[i]

          return (
            <Element ref={register(i + 1)} key={i} data-state="Out">
              <Count key={name} variant="sm-display" color="black60">
                {count} works
              </Count>

              <Spacer y={0.5} />

              <Box height={40} overflow="hidden" width={`${percentage}%`}>
                <Bar height={40} bg="blue150" />
              </Box>

              <Spacer y={1} />

              <Text key={name} variant="xxl">
                {name}
              </Text>
            </Element>
          )
        })}
      </Box>
    </>
  )
})

const Title = styled(Text)`
  transition: opacity 500ms, transform 500ms;

  &[data-state="In"] {
    opacity: 1;
    transform: translateX(0);
  }

  &[data-state="Out"] {
    opacity: 0;
    transform: translateX(-1em);
  }
`

const Count = styled(Text)`
  transition: transform 1000ms;
`

const Bar = styled(Box)`
  transition: transform 1000ms;
`

const Element = styled(Box)`
  transition: opacity 500ms, transform 500ms;

  &[data-state="In"] {
    opacity: 1;
    transform: translateY(0);

    ${Count} {
      transform: translateX(0);
    }

    ${Bar} {
      transform: translateX(0);
    }
  }

  &[data-state="Out"] {
    opacity: 0;
    transform: translateY(1em);

    ${Count} {
      transform: translateX(-1em);
    }

    ${Bar} {
      transform: translateX(-100%);
    }
  }
`
