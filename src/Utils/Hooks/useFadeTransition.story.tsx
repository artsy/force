import { Button, Text } from "@artsy/palette"
import { useState } from "react"
import { States } from "storybook-states"
import { UseFadeTransition, useFadeTransition } from "./useFadeTransition"

export default {
  title: "Hooks/useFadeTransition",
}

export const Default = () => {
  return (
    <States<UseFadeTransition>
      states={[{}, { initialStatus: "Out", duration: 1000 }]}
    >
      <Demo />
    </States>
  )
}

const Demo = (props: UseFadeTransition) => {
  const { register, transition, mode, status } = useFadeTransition(props)

  const [counter, setCounter] = useState(1)

  const handleTransition = async () => {
    await transition()

    console.log("Done")
  }

  return (
    <>
      <Button onClick={handleTransition} size="small">
        Transition
      </Button>

      <Button
        size="small"
        ml={1}
        onClick={() => setCounter(prevRenders => prevRenders + 1)}
        variant="secondaryBlack"
      >
        Increment Counter
      </Button>

      <Text variant="xs" bg="black5" px={1} py={0.5} mt={2} color="black60">
        {JSON.stringify({ counter, mode, status }, null, 2)}
      </Text>

      <Text variant="sm" ref={register(1)} mt={1}>
        Fade first
      </Text>

      <Text variant="sm" ref={register(2)}>
        Fade second
      </Text>

      <Text variant="sm" ref={register(4)}>
        Fade <strong>fourth</strong>
      </Text>

      <Text variant="sm" ref={register(3)}>
        Fade third
      </Text>

      <Text variant="sm" ref={register(6)}>
        Fade <strong>sixth</strong>
      </Text>

      <Text variant="sm" ref={register(5)}>
        Fade fifth
      </Text>
    </>
  )
}
