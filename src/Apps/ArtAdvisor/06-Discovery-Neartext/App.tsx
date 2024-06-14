import { FC, useEffect, useState } from "react"
import { Box, Select, SkeletonBox, Spacer, Text } from "@artsy/palette"
import {
  DiscoveryArtwork,
  DiscoveryUser,
  UUID,
} from "Apps/ArtAdvisor/06-Discovery-Neartext/types"
import { Rail } from "Components/Rail/Rail"
import _ from "lodash"
import { Artwork } from "Apps/ArtAdvisor/06-Discovery-Neartext/components/Artwork"
import { Concepts } from "Apps/ArtAdvisor/06-Discovery-Neartext/components/Concepts"

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<DiscoveryUser[]>([])
  const [userId, setUserId] = useState<UUID>()
  const [user, setUser] = useState<DiscoveryUser>()
  const [conceptText, setConceptText] = useState<string>("")
  const [concepts, setConcepts] = useState<string[]>([])
  const [artworks, setArtworks] = useState<DiscoveryArtwork[]>([])

  useEffect(() => {
    console.log("[Discovery] mount effect")

    async function fetchUsers() {
      const response = await fetch("/api/advisor/6/users")
      const users = await response.json()
      return users
    }

    fetchUsers().then(setUsers)
  }, [])

  useEffect(() => {
    console.log("[Discovery] user effect for", userId)
    async function fetchUser(id: UUID) {
      const response = await fetch(`/api/advisor/6/users/${id}`)
      const user = await response.json()
      return user
    }

    if (userId) fetchUser(userId).then(setUser)
  }, [userId])

  useEffect(() => {
    console.group("[Discovery] artwork effect for", concepts, user)
    async function fetchArtworks(options: {
      concepts: string[]
      likedArtworkIds: string[]
      dislikedArtworkIds: string[]
    }) {
      const { concepts, likedArtworkIds, dislikedArtworkIds } = options
      setIsLoading(true)
      const params = new URLSearchParams()
      concepts.forEach(concept => {
        params.append("concepts", concept)
      })
      // TODO: pull these right off the user?
      likedArtworkIds.forEach(id => {
        params.append("likedArtworkIds", id)
      })
      dislikedArtworkIds.forEach(id => {
        params.append("dislikedArtworkIds", id)
      })
      console.log("[Discovery] fetchArtworks() querystring", params.toString())

      const url = `/api/advisor/6/artworks?${params.toString()}`
      const response = await fetch(url)
      const data = await response.json()
      setIsLoading(false)
      return data
    }

    if (user && concepts.length > 0) {
      const options = {
        concepts,
        likedArtworkIds: user.likedArtworkIds,
        dislikedArtworkIds: user.dislikedArtworkIds,
      }
      console.log("[Discovery] fetchArtworks()", options)
      fetchArtworks(options).then(setArtworks)
    }
    console.groupEnd()
  }, [concepts, user])

  return (
    <Box>
      <Spacer y={2} />
      <Select
        title={"Pick A User"}
        width={"25%"}
        options={users.map(u => ({ value: u.id, text: u.name }))}
        disabled={isLoading}
        onSelect={value => {
          console.log("[Discovery] Selected user: ", value)
          setUserId(value)
        }}
      />
      <Spacer y={2} />
      {user ? (
        <>
          {artworks.length ? (
            <Box opacity={isLoading ? 0.2 : 1}>
              <Rail
                title="Recommended Artworks (Near Concepts)"
                getItems={() => {
                  return artworks.map((artwork: DiscoveryArtwork) => {
                    return (
                      <Artwork
                        key={artwork.id}
                        artwork={artwork}
                        user={user}
                        setUser={setUser}
                      />
                    )
                  })
                }}
              />
            </Box>
          ) : (
            <SkeletonBox height={460} />
          )}

          <Concepts
            conceptText={conceptText}
            setConceptText={setConceptText}
            setConcepts={setConcepts}
          />
        </>
      ) : (
        <Text py={6} variant={"lg"}>
          Select a user to get started
        </Text>
      )}
      <hr />
      <details>
        <summary>Debug</summary>
        <pre>
          {JSON.stringify(
            { users, userId, user, conceptText, concepts, artworks },
            null,
            2
          )}
        </pre>
      </details>
    </Box>
  )
}
