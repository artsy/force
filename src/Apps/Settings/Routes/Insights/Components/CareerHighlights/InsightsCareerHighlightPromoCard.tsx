import {
  Button,
  Clickable,
  ClickableProps,
  Flex,
  Image,
  ResponsiveBox,
  Text,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"
import { RouterLink } from "System/Components/RouterLink"
import { resized } from "Utils/resized"
import { Media } from "Utils/Responsive"

export const InsightsCareerHighlightPromoCard: React.FC<{
  onClick?(): void
}> = ({ onClick }) => {
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
          Discover career highlights for artists you collect.
        </Text>

        <Button
          // @ts-ignore
          as={RouterLink}
          variant="primaryBlack"
          size="small"
          to={"/collector-profile/my-collection/artworks/new"}
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

interface CardWrapperProps extends ClickableProps {
  onClick?: () => void
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  onClick,
  children,
  ...rest
}) => {
  return (
    <ClickableCard onClick={onClick} {...rest}>
      {children}
    </ClickableCard>
  )
}

const ClickableCard = styled(Clickable)`
  background: ${themeGet("colors.white100")};
  border: 1px solid ${themeGet("colors.black10")};
  display: flex;
  align-items: stretch;

  &:hover {
    border-color: ${themeGet("colors.blue100")};
  }
`
