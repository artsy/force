import { FC, useEffect } from "react"
import { Text } from "@artsy/palette"

export const App: FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      fetch("/api/advisor/5")
    }

    fetchData()
  }, [])

  return <Text>Hello!</Text>
}
