import { Clickable, Image, ResponsiveBox, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { useCookieConsentManager } from "Components/CookieConsentManager/CookieConsentManagerContext"
import { useMode } from "Utils/Hooks/useMode"
import type { FC } from "react"
import styled from "styled-components"

interface VideoEmbedProps {
  embed: string
  fallbackEmbed?: string
  coverImage?: {
    src: string
    srcSet?: string
  }
  onPlay?: () => void
}

export const VideoEmbed: FC<VideoEmbedProps> = ({
  embed,
  fallbackEmbed,
  coverImage,
  onPlay,
}) => {
  const { isDestinationAllowed, openConsentManager, ready } =
    useCookieConsentManager()

  const [mode, setMode] = useMode<"Pending" | "Playing">("Pending")

  const handleClick = () => {
    setMode("Playing")
    onPlay?.()
  }

  if (!embed && !fallbackEmbed) return null

  return (
    <ResponsiveBox
      aspectWidth={16}
      aspectHeight={9}
      maxWidth="100%"
      bg="mono10"
      data-testid="VideoEmbed"
    >
      {ready && (
        <>
          {isDestinationAllowed("YouTube") ? (
            <>
              {mode === "Pending" && coverImage ? (
                <Cover
                  onClick={handleClick}
                  width="100%"
                  height="100%"
                  position="relative"
                  bg="mono10"
                >
                  <Image
                    src={coverImage.src}
                    srcSet={coverImage.srcSet}
                    width="100%"
                    height="100%"
                    lazyLoad
                  />

                  <Play />
                </Cover>
              ) : (
                <Video
                  dangerouslySetInnerHTML={{
                    __html: coverImage ? embed : fallbackEmbed || embed,
                  }}
                />
              )}
            </>
          ) : (
            <Clickable
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}
              color="mono60"
              onClick={openConsentManager}
            >
              <Text variant="xs">Manage Cookies</Text>
            </Clickable>
          )}
        </>
      )}
    </ResponsiveBox>
  )
}

const Video = styled.div`
  width: 100%;
  height: 100%;

  > iframe {
    display: block;
    width: 100%;
    height: 100%;
  }
`

const Play = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(
    ${({ theme }) => (theme.name === "light" ? "255, 255, 255" : "0, 0, 0")},
    0.7
  );
  width: 65px;
  height: 45px;

  &:after {
    content: "";
    display: block;
    color: ${themeGet("colors.mono100")};
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 20px solid ${themeGet("colors.mono100")};
  }
`

const Cover = styled(Clickable)`
  ${Play} {
    transition: background-color 250ms;
  }

  &:hover {
    ${Play} {
      background-color: rgba(
        ${({ theme }) =>
          theme.name === "light" ? "255, 255, 255" : "0, 0, 0"},
        0.9
      );
    }
  }
`
