import { Box, Text, Image, BoxProps } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleSponsor_sponsor } from "v2/__generated__/ArticleSponsor_sponsor.graphql"

interface ArticleSponsorProps extends BoxProps {
  sponsor: ArticleSponsor_sponsor
}

const ArticleSponsor: FC<ArticleSponsorProps> = ({ sponsor, ...rest }) => {
  const logo = sponsor.partnerLightLogo ?? sponsor.partnerDarkLogo

  if (!logo) return null

  const scheme = sponsor.partnerLightLogo ? "light" : "dark"

  return (
    <Box {...rest}>
      <Text variant="xs" textTransform="uppercase" mb={1}>
        Presented in Partnership with
      </Text>

      <Box
        display="block"
        width={40}
        height={40}
        bg={scheme ? "black100" : "white100"}
        borderRadius="50%"
        as="a"
        // @ts-ignore
        href={sponsor.partnerLogoLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={logo}
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
      </Box>
    </Box>
  )
}

export const ArticleSponsorFragmentContainer = createFragmentContainer(
  ArticleSponsor,
  {
    sponsor: graphql`
      fragment ArticleSponsor_sponsor on ArticleSponsor {
        partnerLightLogo
        partnerDarkLogo
        partnerLogoLink
      }
    `,
  }
)
