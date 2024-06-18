import {
  Button,
  Column,
  Flex,
  GridColumns,
  Input,
  Spacer,
  Text,
} from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { useRouter } from "System/Hooks/useRouter"
import { useEffect, useRef } from "react"

export const NavigateToRoute: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null)
  const { router } = useRouter()

  const navigateToRoute = () => {
    const route = ref.current?.value

    if (!route) {
      return
    }

    router.push(route)
  }

  const handleClick = (event: React.MouseEvent) => {
    navigateToRoute()
  }

  const handleEnterKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      navigateToRoute()
    }
  }

  useEffect(() => {
    window.addEventListener("keypress", handleEnterKeyPress)

    return () => {
      window.removeEventListener("keypress", handleEnterKeyPress)
    }
  })

  return (
    <>
      <MetaTags title="Admin | Navigate" />

      <Text variant="lg" pt={2}>
        Navigate
      </Text>

      <Spacer y={2} />

      <GridColumns>
        <Column span={8}>
          <Flex>
            <Input
              ref={ref}
              placeholder="Enter route (e.g., /artist/andy-warhol)"
              mr={2}
            />
            <Button onClick={handleClick}>Navigate to route</Button>
          </Flex>
        </Column>
      </GridColumns>
    </>
  )
}
