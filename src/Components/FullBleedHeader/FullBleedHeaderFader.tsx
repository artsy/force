import { Box } from "@artsy/palette"
import { FC, useEffect, useRef } from "react"
import styled from "styled-components"
import { useCursor } from "use-cursor"
import { useMode } from "Utils/Hooks/useMode"
import { wait } from "Utils/wait"
import { FullBleedHeader, FullBleedHeaderProps } from "./FullBleedHeader"

interface FullBleedHeaderFaderProps {
  figures: FullBleedHeaderProps[]
}

export const FullBleedHeaderFader: FC<FullBleedHeaderFaderProps> = ({
  figures,
  children,
}) => {
  const [mode, setMode] = useMode<"Resting" | "Transitioning">("Resting")

  const { index, cursor, handleNext } = useCursor({ max: figures.length })

  const currentFigure = figures[index]
  const nextFigure = figures[(cursor + 1) % figures.length]

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const init = async () => {
      await wait(5000)
      setMode("Transitioning")
      await wait(1500)
      setMode("Resting")
      handleNext()

      init()
    }

    init()
  }, [handleNext, setMode])

  return (
    <Box ref={ref as any} position="relative">
      {[currentFigure, nextFigure].map((figure, i) => (
        <FullBleedHeaderWithTransition
          relativeTo={ref}
          key={figure.src}
          {...figure}
          {...(i === 0
            ? {}
            : {
                position: "absolute",
                top: 0,
                style:
                  mode === "Transitioning"
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                        pointerEvents: "none",
                      },
              })}
        >
          {figure.children ?? children}
        </FullBleedHeaderWithTransition>
      ))}
    </Box>
  )
}

const FullBleedHeaderWithTransition = styled(FullBleedHeader)`
  transition: opacity 1s ease-in-out;
`
