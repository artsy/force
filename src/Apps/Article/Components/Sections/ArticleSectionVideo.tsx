import { FC } from "react"
import { ArticleSectionVideo_section$data } from "__generated__/ArticleSectionVideo_section.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { Clickable, Image, ResponsiveBox, Text } from "@artsy/palette"
import styled from "styled-components"
import { useMode } from "Utils/Hooks/useMode"
import { themeGet } from "@styled-system/theme-get"
import { useArticleTracking } from "Apps/Article/useArticleTracking"
import { useCookieConsentManager } from "Components/CookieConsentManager/CookieConsentManagerContext"

interface ArticleSectionVideoProps {
  section: ArticleSectionVideo_section$data
}

const ArticleSectionVideo: FC<ArticleSectionVideoProps> = ({ section }) => {
  const {
    isDestinationAllowed,
    openConsentManager,
    ready,
  } = useCookieConsentManager()

  const { clickedPlayVideo } = useArticleTracking()

  const [mode, setMode] = useMode<"Pending" | "Playing">("Pending")

  const handleClick = () => {
    setMode("Playing")

    clickedPlayVideo()
  }

  if (!section.embed || !section.fallbackEmbed) return null

  const image = section.image?.cropped

  return (
    <ResponsiveBox
      aspectWidth={16}
      aspectHeight={9}
      maxWidth="100%"
      bg="black10"
      data-testid="ArticleSectionVideo"
    >
      {ready && (
        <>
          {isDestinationAllowed("YouTube") ? (
            <>
              {mode === "Pending" && image ? (
                <Cover
                  onClick={handleClick}
                  width="100%"
                  height="100%"
                  position="relative"
                  bg="black10"
                >
                  <Image
                    src={image.src}
                    srcSet={image.srcSet}
                    width="100%"
                    height="100%"
                    lazyLoad
                  />

                  <Play />
                </Cover>
              ) : (
                <Video
                  dangerouslySetInnerHTML={{
                    __html: image ? section.embed : section.fallbackEmbed,
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
              color="black60"
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

export const ArticleSectionVideoFragmentContainer = createFragmentContainer(
  ArticleSectionVideo,
  {
    section: graphql`
      fragment ArticleSectionVideo_section on ArticleSectionVideo {
        embed(autoPlay: true)
        fallbackEmbed: embed(autoPlay: false)
        image {
          cropped(width: 910, height: 512) {
            src
            srcSet
          }
        }
      }
    `,
  }
)

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
    color: ${themeGet("colors.black100")};
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 20px solid ${themeGet("colors.black100")};
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
