import {
  Button,
  Clickable,
  ClickableProps,
  Flex,
  FlexProps,
  Image,
  ResponsiveBox,
  Text,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"
import { resized } from "Utils/resized"
import { Media } from "Utils/Responsive"

const { src: dSrc, srcSet: dSrcSet } = resized(
  "https://files.artsy.net/images/CareerHighlightPromoImage.png",
  {
    height: 712,
    width: 428,
  }
)

const { src: mSrc, srcSet: mSrcSet } = resized(
  "https://files.artsy.net/images/CareerHighlightPromoImageMobile.png",
  {
    height: 405,
    width: 165,
  }
)

export const InsightsCareerHighlightPromoCard: React.FC<{
  onClick?(): void
}> = ({ onClick }) => {
  return (
    <CardWrapper onClick={onClick} width={[205, 313]} height={[135, 178]}>
      <Flex
        py={[1, 2]}
        pl={[0.5, 2]}
        pr={0}
        alignItems="flex-start"
        justifyContent="flex-end"
        flexDirection="column"
      >
        <Text variant={["xs", "sm-display"]} mb={[1, 2]}>
          Discover career highlights for your artists.
        </Text>

        <Button
          // @ts-ignore
          as={RouterLink}
          variant="primaryBlack"
          size="small"
          to="/my-collection/artworks/new"
          px={[1, 2]}
        >
          Upload Artwork
        </Button>
      </Flex>

      <Media
        style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
        greaterThanOrEqual="sm"
      >
        <ResponsiveBox
          aspectHeight={712}
          aspectWidth={428}
          maxHeight={176}
          maxWidth={106}
        >
          <Image
            src={dSrc}
            width="100%"
            height="100%"
            srcSet={dSrcSet}
            alt="Artwork called '25 Cats Name Sam and One Blue Pussy' by Andy Warhol"
            lazyLoad
          />
        </ResponsiveBox>
      </Media>

      <Media
        style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
        lessThan="sm"
      >
        <ResponsiveBox
          aspectHeight={405}
          aspectWidth={165}
          maxHeight={133}
          maxWidth={54}
        >
          <Image
            src={mSrc}
            width="100%"
            height="100%"
            srcSet={mSrcSet}
            alt="Artwork called '25 Cats Name Sam and One Blue Pussy' by Andy Warhol"
            lazyLoad
          />
        </ResponsiveBox>
      </Media>
    </CardWrapper>
  )
}

// extending ClickableProps since the type already has FlexProps (BoxProps)
interface CardWrapperProps extends ClickableProps {
  onClick?: () => void
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  onClick,
  children,
  ...rest
}) => {
  const isCareerHighlightModalEnabled = useFeatureFlag(
    "my-collection-web-phase-7-career-highlights-modal"
  )

  if (isCareerHighlightModalEnabled) {
    return (
      <ClickableCard onClick={onClick} {...rest}>
        {children}
      </ClickableCard>
    )
  }
  return <Card {...(rest as FlexProps)}>{children}</Card>
}

const Card = styled(Flex)`
  background: white;
  border: 1px solid ${themeGet("colors.black10")};
`

const ClickableCard = styled(Clickable)`
  background: white;
  border: 1px solid ${themeGet("colors.black10")};
  display: flex;
  align-items: stretch;

  &:hover {
    border-color: ${themeGet("colors.blue100")};
  }
`
