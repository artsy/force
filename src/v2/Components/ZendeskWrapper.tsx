import { FC, useEffect } from "react"
import { getENV } from "v2/Utils/getENV"
import { useLoadScript } from "v2/Utils/Hooks/useLoadScript"

const MODES = {
  default: getENV("ZENDESK_KEY"),
  auction: getENV("AUCTION_ZENDESK_KEY"),
} as const

interface ZendeskWrapperProps {
  mode?: keyof typeof MODES
}

export const ZendeskWrapper: FC<ZendeskWrapperProps> = ({
  mode = "default",
}) => {
  const key = MODES[mode]

  useLoadScript({
    id: "ze-snippet",
    src: `https://static.zdassets.com/ekr/snippet.js?key=${key}`,
    removeOnUnmount: true,
    onReady: () => {
      window.zEmbed?.show?.()
    },
  })

  useEffect(() => {
    return () => {
      window.zEmbed?.hide?.()
    }
  }, [])

  return null
}

ZendeskWrapper.displayName = "ZendeskWrapper"
