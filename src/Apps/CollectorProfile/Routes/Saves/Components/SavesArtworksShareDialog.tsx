import ShareIcon from "@artsy/icons/ShareIcon"
import { Button, Input, ModalDialog, Stack } from "@artsy/palette"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
import { useState } from "react"

export interface SavesArtworksShareDialogProps {
  onClose: () => void
  collectionId: string
}

export const SavesArtworksShareDialog: React.FC<
  React.PropsWithChildren<SavesArtworksShareDialogProps>
> = ({ onClose, collectionId }) => {
  const { user } = useSystemContext()

  const [mode, setMode] = useState<"Idle" | "Copied">("Idle")

  const handleClick = () => {
    navigator?.clipboard.writeText(url)
    setMode("Copied")

    setTimeout(() => {
      setMode("Idle")
    }, 2000)
  }

  if (!user) return null

  const url = `${getENV("APP_URL")}/user/${user.id}/collection/${collectionId}`

  return (
    <ModalDialog onClose={onClose} title="Share Collection">
      <Stack gap={1}>
        <Input value={url} readOnly />

        <Button
          variant="secondaryBlack"
          onClick={handleClick}
          disabled={mode === "Copied"}
        >
          {mode === "Copied" ? "Copied to clipboard" : "Copy URL"}
        </Button>

        <Button
          variant="primaryBlack"
          Icon={ShareIcon}
          // @ts-ignore
          as="a"
          href={url}
          target="_blank"
        >
          Open in new tab
        </Button>
      </Stack>
    </ModalDialog>
  )
}
