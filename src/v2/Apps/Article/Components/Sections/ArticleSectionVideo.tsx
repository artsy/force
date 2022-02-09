import { FC } from "react"
import { ArticleSectionVideo_section } from "v2/__generated__/ArticleSectionVideo_section.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { Clickable, Image, ResponsiveBox } from "@artsy/palette"
import styled from "styled-components"
import { useMode } from "v2/Utils/Hooks/useMode"
import { themeGet } from "@styled-system/theme-get"

interface ArticleSectionVideoProps {
  section: ArticleSectionVideo_section
}

const ArticleSectionVideo: FC<ArticleSectionVideoProps> = ({ section }) => {
  const [mode, setMode] = useMode<"Pending" | "Playing">("Pending")

  const handleClick = () => {
    setMode("Playing")
  }

  if (!section.embed) return null

  const image = section.image?.cropped

  return (
    <ResponsiveBox
      aspectWidth={16}
      aspectHeight={9}
      maxWidth="100%"
      bg="black10"
      data-testid="ArticleSectionVideo"
    >
      {mode === "Pending" ? (
        <Cover
          onClick={handleClick}
          width="100%"
          height="100%"
          position="relative"
          bg="black10"
        >
          {image && (
            <Image
              src={image.src}
              srcSet={image.srcSet}
              width="100%"
              height="100%"
              lazyLoad
            />
          )}

          <Play />
        </Cover>
      ) : (
        <Video dangerouslySetInnerHTML={{ __html: section.embed }} />
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
  background-color: rgba(255, 255, 255, 0.7);
  width: 65px;
  height: 45px;

  &:after {
    content: "";
    display: block;
    color: ${themeGet("colors.black100")};
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 20px solid black;
  }
`

const Cover = styled(Clickable)`
  ${Play} {
    transition: background-color 250ms;
  }

  &:hover {
    ${Play} {
      background-color: rgba(255, 255, 255, 0.9);
    }
  }
`
