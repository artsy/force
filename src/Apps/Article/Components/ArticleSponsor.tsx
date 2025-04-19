import { Box, type BoxProps, Image, Text } from "@artsy/palette"
import { useArticleTracking } from "Apps/Article/useArticleTracking"
import type { ArticleSponsor_sponsor$data } from "__generated__/ArticleSponsor_sponsor.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArticleSponsorProps extends BoxProps {
  sponsor: ArticleSponsor_sponsor$data
}

const ArticleSponsor: FC<React.PropsWithChildren<ArticleSponsorProps>> = ({
  sponsor,
  ...rest
}) => {
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
        bg={scheme ? "mono100" : "mono0"}
        borderRadius="50%"
        as="a"
        // @ts-ignore
        href={sponsor.partnerLogoLink as string}
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
  },
)
