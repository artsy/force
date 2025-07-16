import { useEffect, useState } from "react"
import { Rail } from "Components/Rail/Rail"
import { Text } from "@artsy/palette"
import { fetchFromReviewMetaphysics } from "../fetchFromReviewMetaphysics"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SimpleArtworkCard } from "./SimpleArtworkCard"

interface ArtworkData {
  title: string
  href: string
  artistNames: string
  saleMessage?: string
  image: {
    src: string
    width: number
    height: number
  }
}

export const BasedOnYourRecentSavesRail: React.FC = () => {
  const { user } = useSystemContext()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [artworks, setArtworks] = useState<ArtworkData[]>([])
  const [title, setTitle] = useState<string>("")

  useEffect(() => {
    setLoading(true)
    fetchFromReviewMetaphysics(
      `
      {
        homeView {
          basedOnYourRecentSaves: section(id: "home-view-section-based-on-your-recent-saves") {
            component { title }
            ... on HomeViewSectionArtworks {
              artworksConnection(first: 10) {
                edges {
                  node {
                    title
                    href
                    artistNames
                    saleMessage
                    image {
                      src: url(version: ["larger", "large"])
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
      `,
      user,
    )
      .then(data => {
        const section = data.homeView?.basedOnYourRecentSaves
        setTitle(section?.component?.title ?? "Based on Your Recent Saves")
        setArtworks(
          section?.artworksConnection?.edges?.map((e: any) => e.node) ?? [],
        )
        setLoading(false)
      })
      .catch(e => {
        setError(e.message)
        setLoading(false)
      })
  }, [user])

  if (loading) return <Text>Loading…</Text>
  if (error) return <Text color="red100">Error: {error}</Text>
  if (!artworks.length) return null

  return (
    <Rail
      title={"Version A"}
      getItems={() =>
        artworks.map((artwork, i) => (
          <SimpleArtworkCard key={i} artwork={artwork} />
        ))
      }
    />
  )
}
