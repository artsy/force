import { Text } from "@artsy/palette"
import ourNFTContractAbi from "./abi-nft.json"
import { Contract, getDefaultProvider } from "ethers"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkSidebarTitleInfo_artwork } from "v2/__generated__/ArtworkSidebarTitleInfo_artwork.graphql"

export interface ArtworkSidebarTitleInfoProps {
  artwork: ArtworkSidebarTitleInfo_artwork
}

// nfts for sale
export const tokenID = "5"
export const nftMap = {
  "2": "0x64fF572AAED39Ebccaa322ab931c6F908f46e0bB",
  "3": "0x5c401E8e99239aD36fDab581f57536a2F4659b4B",
  "5": "0x1a414ACfB6c35fb4732B276ea7639383440f99e7",
  "7": "0x3E12BaD7F1BE5b54E1a664758C3b5e6008e34112",
  "9": "0xEb7e908E1Ea86d47A86694A7F6CCdae5151337db",
}
export const ourNFTContractAddr = "0xA3fBe7EC8D3d4b9452654C666AFC98ac13eeBF6E"
export async function getNFTMetadata() {
  const provider = getDefaultProvider("ropsten")

  const ourNFTContract = new Contract(
    ourNFTContractAddr,
    ourNFTContractAbi,
    provider
  )
  const tokenURI = await ourNFTContract.tokenURI(tokenID)

  if (tokenURI.endsWith(".png")) {
    return { image: tokenURI }
  } else if (tokenURI.endsWith(".json")) {
    const metadata = await (await fetch(tokenURI)).json()
    return metadata as object
  } else {
    return { image: tokenURI }
  }
}

export class ArtworkSidebarTitleInfo extends Component<
  ArtworkSidebarTitleInfoProps
> {
  state = { metadata: { name: "" } }

  async componentDidMount() {
    const metadata = await getNFTMetadata()
    this.setState({ metadata })
  }

  render() {
    const { artwork } = this.props

    const isNFT = artwork.category === "NFT"

    return (
      <>
        {isNFT && (
          <>
            <Text variant="lg" as="h1" color="black60" mb={0.5}>
              {this.state.metadata.name}
            </Text>
            <Text variant="md">NFT</Text>
          </>
        )}
        {!isNFT && (
          <>
            <Text variant="lg" as="h1" color="black60" mb={0.5}>
              <i>{artwork.title?.trim()}</i>
              {artwork.date &&
                artwork.date.replace(/\s+/g, "").length > 0 &&
                ", " + artwork.date}
            </Text>
            {artwork.medium && <Text variant="md">{artwork.medium}</Text>}
          </>
        )}
      </>
    )
  }
}

export const ArtworkSidebarTitleInfoFragmentContainer = createFragmentContainer(
  ArtworkSidebarTitleInfo,
  {
    artwork: graphql`
      fragment ArtworkSidebarTitleInfo_artwork on Artwork {
        title
        date
        medium
        category
      }
    `,
  }
)
