import { FC, useEffect } from "react"
import { Box, Spacer, Text } from "@artsy/palette"
import { useFadeTransition } from "Utils/Hooks/useFadeTransition"
import { wait } from "Utils/wait"

interface RetrospectiveTopArtistsProps {
  data: [string, number][]
}

export const RetrospectiveTopArtists: FC<RetrospectiveTopArtistsProps> = ({
  data,
}) => {
  const maxCount = Math.max(...data.map(([_, count]) => count))
  const percentages = data.map(([_, count]) => (count / maxCount) * 100)

  const { transition, register } = useFadeTransition({
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

  return (
    <>
      <Text variant="xxxl">Top Artists</Text>

      <Spacer y={6} />

      <Box display="flex" flexDirection="column" style={{ gap: 40 }}>
        {data.map(([name, count], i) => {
          const percentage = percentages[i]

          return (
            <Box ref={register(i)} key={i} style={{ opacity: 0 }}>
              <Text key={name} variant="sm-display" color="black60">
                {count} works
              </Text>

              <Spacer y={0.5} />

              <Box width={`${percentage}%`} height={40} bg="brand" />

              <Spacer y={1} />

              <Text key={name} variant="xxl">
                {name}
              </Text>
            </Box>
          )
        })}
      </Box>
    </>
  )
}
