import React, { useState } from "react"
import { Box, Clickable, Flex, Text } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"

export const FAQ: React.FC = () => {
  return (
    <SectionContainer>
      <Text width="100%" textAlign="left" mb={4} variant="largeTitle">
        Frequently Asked Questions Read more about selling your artwork
      </Text>
      <Box>
        <ToggleButton label="How does selling on Artsy work?">
          <TextItem>
            Artsy helps you find the best sales solution for works in your
            collection. We review the works you’re interested in selling,
            determine the strength of the secondary market demand, and suggest
            an appropriate sales strategy. <br />
            <br />
            This can involve matching you with the right seller (e.g., an
            auction house or a gallery), selling qualified works via Artsy’s
            online marketplace, or selling the work privately through our
            network of trusted partners and collectors. <br />
            <br />
            This service is free, and the nominal, pre-agreed seller’s
            commission is due only when your work sells. Artsy specialists guide
            you along the way and help you choose the right sales strategy. To
            get started, submit works you’re interested in selling here.
          </TextItem>
        </ToggleButton>

        <ToggleButton label="What happens once I submit a work to Artsy Consignments?">
          <TextItem>
            Artsy helps you find the best sales solution for works in your
            collection. We review the works you’re interested in selling,
            determine the strength of the secondary market demand, and suggest
            an appropriate sales strategy. <br />
            <br />
            This can involve matching you with the right seller (e.g., an
            auction house or a gallery), selling qualified works via Artsy’s
            online marketplace, or selling the work privately through our
            network of trusted partners and collectors. <br />
            <br />
            This service is free, and the nominal, pre-agreed seller’s
            commission is due only when your work sells. Artsy specialists guide
            you along the way and help you choose the right sales strategy. To
            get started, submit works you’re interested in selling here.
          </TextItem>
        </ToggleButton>

        <ToggleButton label="Where can I see my work on Artsy?">
          <TextItem>
            Artsy helps you find the best sales solution for works in your
            collection. We review the works you’re interested in selling,
            determine the strength of the secondary market demand, and suggest
            an appropriate sales strategy. <br />
            <br />
            This can involve matching you with the right seller (e.g., an
            auction house or a gallery), selling qualified works via Artsy’s
            online marketplace, or selling the work privately through our
            network of trusted partners and collectors. <br />
            <br />
            This service is free, and the nominal, pre-agreed seller’s
            commission is due only when your work sells. Artsy specialists guide
            you along the way and help you choose the right sales strategy. To
            get started, submit works you’re interested in selling here.
          </TextItem>
        </ToggleButton>

        <ToggleButton label="Which auction houses and galleries are in Artsy’s consignment partner network?">
          <TextItem>
            Artsy helps you find the best sales solution for works in your
            collection. We review the works you’re interested in selling,
            determine the strength of the secondary market demand, and suggest
            an appropriate sales strategy. <br />
            <br />
            This can involve matching you with the right seller (e.g., an
            auction house or a gallery), selling qualified works via Artsy’s
            online marketplace, or selling the work privately through our
            network of trusted partners and collectors. <br />
            <br />
            This service is free, and the nominal, pre-agreed seller’s
            commission is due only when your work sells. Artsy specialists guide
            you along the way and help you choose the right sales strategy. To
            get started, submit works you’re interested in selling here.
          </TextItem>
        </ToggleButton>

        <ToggleButton label="I’m an artist. Can I submit my own work to consign?">
          <TextItem>
            Artsy helps you find the best sales solution for works in your
            collection. We review the works you’re interested in selling,
            determine the strength of the secondary market demand, and suggest
            an appropriate sales strategy. <br />
            <br />
            This can involve matching you with the right seller (e.g., an
            auction house or a gallery), selling qualified works via Artsy’s
            online marketplace, or selling the work privately through our
            network of trusted partners and collectors. <br />
            <br />
            This service is free, and the nominal, pre-agreed seller’s
            commission is due only when your work sells. Artsy specialists guide
            you along the way and help you choose the right sales strategy. To
            get started, submit works you’re interested in selling here.
          </TextItem>
        </ToggleButton>

        <ToggleButton label="How can I edit my submission?">
          <TextItem>
            Artsy helps you find the best sales solution for works in your
            collection. We review the works you’re interested in selling,
            determine the strength of the secondary market demand, and suggest
            an appropriate sales strategy. <br />
            <br />
            This can involve matching you with the right seller (e.g., an
            auction house or a gallery), selling qualified works via Artsy’s
            online marketplace, or selling the work privately through our
            network of trusted partners and collectors. <br />
            <br />
            This service is free, and the nominal, pre-agreed seller’s
            commission is due only when your work sells. Artsy specialists guide
            you along the way and help you choose the right sales strategy. To
            get started, submit works you’re interested in selling here.
          </TextItem>
        </ToggleButton>

        <ToggleButton label="I have another question">
          <TextItem>
            Artsy helps you find the best sales solution for works in your
            collection. We review the works you’re interested in selling,
            determine the strength of the secondary market demand, and suggest
            an appropriate sales strategy. <br />
            <br />
            This can involve matching you with the right seller (e.g., an
            auction house or a gallery), selling qualified works via Artsy’s
            online marketplace, or selling the work privately through our
            network of trusted partners and collectors. <br />
            <br />
            This service is free, and the nominal, pre-agreed seller’s
            commission is due only when your work sells. Artsy specialists guide
            you along the way and help you choose the right sales strategy. To
            get started, submit works you’re interested in selling here.
          </TextItem>
        </ToggleButton>
      </Box>
    </SectionContainer>
  )
}

const ToggleButton: React.FC<{
  expanded?: boolean
  label: string
}> = ({ expanded, label, children }) => {
  const [isExpanded, toggleExpand] = useState(expanded)

  return (
    <Box mb={2}>
      <Clickable onClick={() => toggleExpand(!isExpanded)}>
        <Flex alignContent="center" alignItems="baseline">
          {isExpanded ? (
            <PlusMinusIcon>-</PlusMinusIcon>
          ) : (
            <PlusMinusIcon>+</PlusMinusIcon>
          )}
          <Text variant="subtitle" textAlign="left">
            {label}
          </Text>
        </Flex>
      </Clickable>

      {isExpanded && (
        <Box mt={2} ml="24px">
          {children}
        </Box>
      )}
    </Box>
  )
}

const PlusMinusIcon: React.FC = ({ children }) => (
  <Flex
    width={13}
    mr={1}
    justifyContent="center"
    alignContent="center"
    textAlign="center"
  >
    <Text
      variant="largeTitle"
      fontWeight="medium"
      color="black60"
      position="relative"
      top="2px"
    >
      {children}
    </Text>
  </Flex>
)

const TextItem: React.FC = ({ children }) => {
  return (
    <Text variant="text" color="black60" maxWidth={650}>
      {children}
    </Text>
  )
}
