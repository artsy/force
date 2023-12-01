// NOTE: Eventually, we'll want to drop this down to 5s again, but that can't
// take place until the backend work outlined in this JIRA ticket is complete:

import { usePoll } from "Utils/Hooks/usePoll"
import { useTabVisible } from "Utils/Hooks/useTabVisible"
import { getENV } from "Utils/getENV"

export const DEFAULT_POLLING_INTERVAL_TIME = 20000

interface UseRefetchLatestMessagesPollProps {
  intervalTime?: number
  onRefetch: () => void
  clearWhen?: boolean
}

export const useRefetchLatestMessagesPoll = ({
  intervalTime = DEFAULT_POLLING_INTERVAL_TIME,
  onRefetch,
  clearWhen,
}: UseRefetchLatestMessagesPollProps) => {
  const isTabVisible = useTabVisible()

  const reloadLatestMessages = () => {
    onRefetch()
  }

  usePoll({
    callback: () => {
      const isEnabled = getENV("ENABLE_CONVERSATIONS_MESSAGES_AUTO_REFRESH")

      if (!isEnabled) {
        return
      }
      if (!isTabVisible) {
        return
      }

      reloadLatestMessages()
    },
    intervalTime: intervalTime,
    key: "MessageRefetcher",
    clearWhen,
  })
}
