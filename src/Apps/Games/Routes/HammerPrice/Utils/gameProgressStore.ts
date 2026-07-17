/**
 * Persistence abstraction for Hammer Price game progress.
 *
 * The game only ever talks to the `GameProgressStore` interface; the default
 * implementation below is backed by localStorage so that it can later be
 * replaced by server-backed persistence without touching the game UI.
 */

export interface HammerPriceGameProgress {
  /** The auction result the puzzle is played against */
  auctionResultId: string
  /** Submitted guesses as fixed-width digit strings, in order */
  guesses: string[]
  /** ISO 8601 timestamp of the last update */
  updatedAt: string
}

export interface GameProgressStore {
  getProgress(auctionResultId: string): HammerPriceGameProgress | null
  saveProgress(progress: HammerPriceGameProgress): void
  listProgress(): HammerPriceGameProgress[]
  clearProgress(auctionResultId: string): void
}

const DEFAULT_KEY_PREFIX = "hammerPrice:v1:progress:"

const isValidProgress = (value: unknown): value is HammerPriceGameProgress => {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const progress = value as Partial<HammerPriceGameProgress>

  return (
    typeof progress.auctionResultId === "string" &&
    typeof progress.updatedAt === "string" &&
    Array.isArray(progress.guesses) &&
    progress.guesses.every(guess => typeof guess === "string")
  )
}

/**
 * localStorage-backed store. All storage access is defensive: on the server,
 * in private browsing modes, or with corrupted entries it degrades to an
 * empty, non-persisting store rather than throwing.
 */
export const createLocalStorageGameProgressStore = (
  keyPrefix: string = DEFAULT_KEY_PREFIX,
): GameProgressStore => {
  const getStorage = (): Storage | null => {
    try {
      return typeof window === "undefined" ? null : window.localStorage
    } catch {
      return null
    }
  }

  const read = (key: string): HammerPriceGameProgress | null => {
    const storage = getStorage()

    if (!storage) {
      return null
    }

    try {
      const raw = storage.getItem(key)

      if (!raw) {
        return null
      }

      const parsed = JSON.parse(raw)

      return isValidProgress(parsed) ? parsed : null
    } catch {
      return null
    }
  }

  return {
    getProgress: auctionResultId => {
      return read(`${keyPrefix}${auctionResultId}`)
    },

    saveProgress: progress => {
      const storage = getStorage()

      if (!storage) {
        return
      }

      try {
        storage.setItem(
          `${keyPrefix}${progress.auctionResultId}`,
          JSON.stringify(progress),
        )
      } catch {
        // Ignore quota or availability errors; progress is best-effort
      }
    },

    listProgress: () => {
      const storage = getStorage()

      if (!storage) {
        return []
      }

      return Array.from({ length: storage.length }, (_, index) => {
        return storage.key(index)
      })
        .filter((key): key is string => {
          return !!key && key.startsWith(keyPrefix)
        })
        .map(read)
        .filter((progress): progress is HammerPriceGameProgress => {
          return progress !== null
        })
    },

    clearProgress: auctionResultId => {
      const storage = getStorage()

      if (!storage) {
        return
      }

      try {
        storage.removeItem(`${keyPrefix}${auctionResultId}`)
      } catch {
        // Ignore availability errors
      }
    },
  }
}

export const hammerPriceProgressStore = createLocalStorageGameProgressStore()
