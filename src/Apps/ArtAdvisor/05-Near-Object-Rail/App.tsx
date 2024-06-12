import { FC, useEffect, useState } from "react"
import {
  Spinner,
  Spacer,
  Box,
  Select,
  Text,
  useToasts,
  GridColumns,
  Column,
} from "@artsy/palette"
import { Rail } from "Components/Rail/Rail"
import { Artwork } from "Apps/ArtAdvisor/05-Near-Object-Rail/components/Artwork"
import _ from "lodash"

export type ArtworkType = {
  _additional: {
    id: string
  }
  title: string
  imageUrl: string | null
}

type UserType = {
  _additional: {
    id: string
  }
  name: string
}

type UsersListType = {
  value: string
  text: string
}

export const App: FC = () => {
  const [artworks, setArtworks] = useState<ArtworkType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [usersList, setUsersList] = useState<UsersListType[]>([])
  const [userId, setUserId] = useState<string>("")

  const { sendToast } = useToasts()

  const getNearObject = async (id: string) => {
    if (!id) return

    setIsLoading(true)

    try {
      const response = await fetch(`/api/advisor/5/near_object/${id}`)
      const data = await response.json()
      setArtworks(data)
    } catch (error) {
      console.error(error)
      sendToast({
        variant: "error",
        message: `An error occurred: ${error}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/advisor/5/users")

        const users = await response.json()

        let usersList: UsersListType[] = users.map((user: UserType) => {
          return {
            value: user._additional.id,
            text: user.name,
          }
        })
        setUsersList([{ text: "", value: "" }, ...usersList])
      } catch (error) {
        console.error(error)
        sendToast({
          variant: "error",
          message: `An error occurred: ${error}`,
        })
      } finally {
        setIsLoading(false)
      }
    }
    getUsers()
  }, [sendToast])

  return (
    <Box minHeight={600}>
      <Spacer y={2} />
      <Select
        title={"Pick A User"}
        width={"25%"}
        options={usersList}
        disabled={isLoading}
        onSelect={value => {
          console.log("Selected user: ", value)
          setUserId(value)
          getNearObject(value)
          setArtworks([])
        }}
      />
      <Spacer y={2} />
      <GridColumns>
        <Column span={12} minHeight={850}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {userId ? (
                <Rail
                  title={"Near Object"}
                  getItems={() => {
                    return artworks.map((artwork: ArtworkType) => {
                      return (
                        <>
                          <Artwork
                            artwork={artwork}
                            userId={userId}
                            getNearObject={getNearObject}
                          />
                        </>
                      )
                    })
                  }}
                />
              ) : (
                <Box display={"flex"} justifyContent={"center"}>
                  <Text py={6} variant={"lg"}>
                    Select a user to get started
                  </Text>
                </Box>
              )}
            </>
          )}
        </Column>
      </GridColumns>
    </Box>
  )
}
