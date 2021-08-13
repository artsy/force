import { Spinner } from "@artsy/palette"
import { useSystemContext } from "v2/System"
import React from "react"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { ArtworkInquiryQuery } from "v2/__generated__/ArtworkInquiryQuery.graphql"
import { ArtworkInquiry_artwork } from "v2/__generated__/ArtworkInquiry_artwork.graphql"
import { useEffect } from "react"
import {
  ArtworkInquiryBackdrop,
  ArtworkInquiryDialog,
} from "./ArtworkInquiryDialog"
import { ArtworkInquiryFormFragmentContainer } from "./ArtworkInquiryForm"
import {
  ArtworkInquiryProvider,
  useArtworkInquiryContext,
  Screen,
} from "./ArtworkInquiryContext"
import { ArtworkInquiryExistingUserQueryRenderer } from "./ArtworkInquiryExistingUser"
import { ArtworkInquirySignUp } from "./ArtworkInquirySignUp"
import { ArtworkInquiryLogin } from "./ArtworkInquiryLogin"
import { ArtworkInquiryResetPassword } from "./ArtworkInquiryResetPassword"

interface ArtworkInquiryProps {
  artwork: ArtworkInquiry_artwork
}

const ArtworkInquiry: React.FC<ArtworkInquiryProps> = ({ artwork }) => {
  const { currentScreen } = useArtworkInquiryContext()

  return (
    <ArtworkInquiryDialog>
      {(() => {
        switch (currentScreen) {
          case Screen.Form:
            return <ArtworkInquiryFormFragmentContainer artwork={artwork} />
          case Screen.Login:
            return <ArtworkInquiryLogin />
          case Screen.ExistingUser:
            return <ArtworkInquiryExistingUserQueryRenderer />
          case Screen.SignUp:
            return <ArtworkInquirySignUp />
          case Screen.ResetPassword:
            return <ArtworkInquiryResetPassword />
        }
      })()}
    </ArtworkInquiryDialog>
  )
}

const ArtworkInquiryFragmentContainer = createFragmentContainer(
  ArtworkInquiry,
  {
    artwork: graphql`
      fragment ArtworkInquiry_artwork on Artwork {
        ...ArtworkInquiryForm_artwork
      }
    `,
  }
)

const ArtworkInquiryPlaceholder: React.FC = () => {
  return <Spinner color="white100" />
}

export const ArtworkInquiryQueryRenderer = ({
  artworkID,
  onClose,
}: {
  artworkID: string
  onClose(): void
}) => {
  const { relayEnvironment } = useSystemContext()

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <ArtworkInquiryProvider onClose={onClose} artworkID={artworkID}>
      <ArtworkInquiryBackdrop
        bg={isMounted ? "rgba(0, 0, 0, 0.8)" : "transparent"}
        onClose={onClose}
      >
        <SystemQueryRenderer<ArtworkInquiryQuery>
          environment={relayEnvironment!}
          variables={{ id: artworkID }}
          query={graphql`
            query ArtworkInquiryQuery($id: String!) {
              artwork(id: $id) {
                ...ArtworkInquiry_artwork
              }
            }
          `}
          placeholder={<ArtworkInquiryPlaceholder />}
          render={({ error, props }) => {
            if (error) {
              console.error(error)
              onClose()
              return null
            }

            if (!props || !props.artwork) {
              return <ArtworkInquiryPlaceholder />
            }

            return <ArtworkInquiryFragmentContainer artwork={props.artwork} />
          }}
        />
      </ArtworkInquiryBackdrop>
    </ArtworkInquiryProvider>
  )
}

interface UseArtworkInquiry {
  artworkID: string
}

export const useArtworkInquiry = ({ artworkID }: UseArtworkInquiry) => {
  const [isArtworkInquiryVisible, setIsArtworkInquiryVisible] = useState(false)

  const showArtworkInquiry = () => {
    setIsArtworkInquiryVisible(true)
  }

  const hideArtworkInquiry = () => {
    setIsArtworkInquiryVisible(false)
  }

  const ArtworkInquiry: React.FC = () => {
    return (
      <>
        {isArtworkInquiryVisible && (
          <ArtworkInquiryQueryRenderer
            artworkID={artworkID}
            onClose={hideArtworkInquiry}
          />
        )}
      </>
    )
  }

  return {
    showArtworkInquiry,
    hideArtworkInquiry,
    isArtworkInquiryVisible,
    ArtworkInquiry,
  }
}
