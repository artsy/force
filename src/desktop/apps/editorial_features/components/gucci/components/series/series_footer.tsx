import React from "react"
import { PartnerBlock, Text } from "@artsy/reaction/dist/Components/Publishing"
import { Box, Flex, Sans } from "@artsy/palette"
import { Media } from "@artsy/reaction/dist/Utils/Responsive"

interface SeriesFooterProps {
  curation: any
}

export const SeriesFooter: React.SFC<SeriesFooterProps> = props => {
  const { curation } = props
  const logoSrc = curation.partner_logo_footer || curation.partner_logo_primary
  const logoUrl = curation.partner_link_url || ""

  return (
    <Flex
      maxWidth="1200px"
      mx="auto"
      mb={100}
      px={20}
      mt={[100, 100, 100, 0]}
      width="100%"
      flexDirection={["column", "column", "column", "row"]}
      justifyContent="space-between"
    >
      <Flex
        width={[1, 1, 1, 1 / 3]}
        justifyContent="space-between"
        flexDirection="column"
      >
        <Sans size={["10", "10", "10", "14"]} pb={[20, 20, 20, 0]}>
          About the Series
        </Sans>
        <Media greaterThanOrEqual="lg">
          <Box pb={10}>
            <PartnerBlock
              logo={logoSrc}
              url={logoUrl}
              trackingData={{
                type: "external link",
                destination_path: logoUrl,
              }}
            />
          </Box>
        </Media>
      </Flex>

      <Flex width={[1, 1, 1, 3 / 5]} flexDirection="column">
        <Text html={curation.about} layout="standard" />
        <Media lessThan="md">
          <Box pt={80}>
            <PartnerBlock
              logo={logoSrc}
              url={logoUrl}
              trackingData={{
                type: "external link",
                destination_path: logoUrl,
              }}
            />
          </Box>
        </Media>
      </Flex>
    </Flex>
  )
}
