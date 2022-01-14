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
  "2": "0x6935a3bC7D7f6926B5183E5a631a843b7fF89b41",
  "3": "0x4756D77E2bE1528B426BdB17Dd21295e2f224005",
  "5": "0x3342afbd531a714A33B331A38af4ace100e49595",
  "7": "0xb853DE25c9f5f1CC703145977D52b9b8D98CD290",
  "9": "0x703F701660D3Cc44324040E3F6A7F67372438283",
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
