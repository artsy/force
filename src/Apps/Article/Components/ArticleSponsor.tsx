import { Box, Text, Image, BoxProps } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleSponsor_sponsor$data } from "__generated__/ArticleSponsor_sponsor.graphql"
import { useArticleTracking } from "../useArticleTracking"

interface ArticleSponsorProps extends BoxProps {
  sponsor: ArticleSponsor_sponsor$data
}

const ArticleSponsor: FC<ArticleSponsorProps> = ({ sponsor, ...rest }) => {
  const { clickedSponsorLink } = useArticleTracking()

  const logo = sponsor.partnerLightLogo ?? sponsor.partnerDarkLogo

  if (!logo) return null

  const scheme = sponsor.partnerLightLogo ? "light" : "dark"

  return (
    <Box {...rest}>
      <Text variant="xs" fontWeight="bold" mb={0.5}>
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
        onClick={() => {
          if (!sponsor.partnerLogoLink) return
          clickedSponsorLink(sponsor.partnerLogoLink)
        }}
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
