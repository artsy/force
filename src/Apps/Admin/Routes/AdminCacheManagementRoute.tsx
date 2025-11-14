import { MetaTags } from "Components/MetaTags"
import {
  Box,
  Button,
  Flex,
  Input,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import { type FC, useReducer, useState } from "react"

export const AdminCacheManagementRoute: FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { sendToast } = useToasts()

  const [state, dispatch] = useReducer(reducer, {
    cacheKeys: [],
    filteredCacheKeys: [],
    filterInput: "",
    isClearingCache: false,
    isFetchingCacheKeys: false,
    isDeletingCacheKey: false,
  })

  const handleClearCacheClick = async () => {
    actions.isClearingCache(true)

    try {
      const response = await fetch("/admin/clear-cache", { method: "POST" })
      const data = await response.json()

      if (!response.ok) {
        throw Error(data.message ?? response.statusText)
      }

      sendToast({
        variant: "success",
        message: data.message,
      })

      actions.isClearingCache(false)
    } catch (err) {
      console.error(err)

      sendToast({
        variant: "error",
        message: err.message ?? "Something went wrong.",
      })

      actions.setError(err.message)
      actions.isClearingCache(false)
    }
  }

  const handleLoadAllCacheKeys = async () => {
    actions.isFetchingCacheKeys(true)

    try {
      const response = await fetch("/admin/cache-keys", { method: "GET" })
      const data = await response.json()

      if (!response.ok) {
        throw Error(data.message ?? response.statusText)
      }

      actions.setCacheKeys(data.keys)
      actions.isFetchingCacheKeys(false)
    } catch (err) {
      console.error(err)

      sendToast({
        variant: "error",
        message: err.message ?? "Something went wrong.",
      })

      actions.setError(err.message)
      actions.isFetchingCacheKeys(false)
    }
  }

  const handleDeleteCacheKey = async key => {
    actions.isDeletingCacheKey(true)

    try {
      const response = await fetch("/admin/cache-keys", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw Error(data.message ?? response.statusText)
      }

      actions.deleteCacheKey(key)
      actions.setFilteredCacheKeys(state.filterInput)

      sendToast({
        variant: "success",
        message: "Successfully deleted cache key.",
      })
    } catch (err) {
      console.error(err)

      sendToast({
        variant: "error",
        message: err.message ?? "Something went wrong.",
      })

      actions.setError(err.message)
      actions.isFetchingCacheKeys(false)
    }

    actions.isDeletingCacheKey(false)
  }

  const actions = {
    setCacheKeys: (payload: CacheKey[]) =>
      dispatch({ type: "setCacheKeys", payload }),
    deleteCacheKey: (payload: CacheKey) =>
      dispatch({ type: "deleteCacheKey", payload }),
    setFilteredCacheKeys: (payload: string) =>
      dispatch({ type: "setFilteredCacheKeys", payload }),
    setError: (payload: string) => dispatch({ type: "setError", payload }),
    isClearingCache: (payload: boolean) =>
      dispatch({ type: "isClearingCache", payload }),
    isFetchingCacheKeys: (payload: boolean) =>
      dispatch({ type: "isFetchingCacheKeys", payload }),
    isDeletingCacheKey: (payload: boolean) =>
      dispatch({ type: "isDeletingCacheKey", payload }),
  }

  const cacheKeys =
    state.filterInput.length > 0 ? state.filteredCacheKeys : state.cacheKeys

  return (
    <>
      <MetaTags title="Cache Manaagement | Artsy" />

      <Spacer y={4} />

      <Button onClick={handleClearCacheClick} loading={state.isClearingCache}>
        Clear entire cache
      </Button>

      <Text variant="xs" mt={2}>
        Please keep in mind this could make the site slower and is best to avoid
        doing during high traffic times.
      </Text>

      <Spacer y={4} />

      <Button
        onClick={handleLoadAllCacheKeys}
        loading={state.isFetchingCacheKeys}
      >
        Load all cache keys to manage
      </Button>

      {state.cacheKeys.length > 0 && (
        <Box
          height={400}
          overflowY="scroll"
          width="100%"
          my={2}
          p={2}
          border="1px solid"
          borderColor="mono30"
        >
          <Input
            name="search"
            title="Search"
            placeholder="Search"
            onChange={event => {
              const term = event.target.value
              actions.setFilteredCacheKeys(term)
            }}
            autoFocus
          />

          {cacheKeys.map((key, index) => {
            const keyAsString = JSON.stringify(key)

            return (
              <Flex
                key={`${keyAsString}-${index}`}
                py={2}
                borderBottom="1px solid"
                borderColor="mono30"
                alignItems="center"
              >
                <Box width="80%">
                  <Text variant="xs">QueryName</Text>
                  <Text>{key.queryId}</Text>

                  <Spacer y={1} />

                  <Text variant="xs">Cache Key</Text>
                  <Text>{keyAsString}</Text>
                </Box>
                <Box width="20%">
                  <DeleteButton onClick={() => handleDeleteCacheKey(key)} />
                </Box>
              </Flex>
            )
          })}

          {cacheKeys.length === 0 && (
            <Text variant="sm" my={1}>
              No cache keys found.
            </Text>
          )}
        </Box>
      )}
    </>
  )
}

const DeleteButton = ({ onClick }) => {
  const [isDeleting, setDeleting] = useState(false)

  return (
    <Button
      size="small"
      variant="secondaryBlack"
      loading={isDeleting}
      onClick={() => {
        setDeleting(true)
        onClick()
      }}
    >
      Delete Cache Key
    </Button>
  )
}

interface CacheKey {
  queryId: string
}

interface State {
  cacheKeys: CacheKey[]
  filteredCacheKeys: CacheKey[]
  filterInput: string
  error?: string
  isClearingCache: boolean
  isFetchingCacheKeys: boolean
  isDeletingCacheKey: boolean
}

type Action =
  | { type: "setCacheKeys"; payload: CacheKey[] }
  | { type: "setFilterInput"; payload: string }
  | { type: "deleteCacheKey"; payload: CacheKey }
  | { type: "setError"; payload: string }
  | { type: "setFilteredCacheKeys"; payload: string }
  | { type: "isClearingCache"; payload: boolean }
  | { type: "isFetchingCacheKeys"; payload: boolean }
  | { type: "isDeletingCacheKey"; payload: boolean }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setCacheKeys": {
      return { ...state, cacheKeys: action.payload }
    }

    case "setFilterInput": {
      return { ...state, filterInput: action.payload }
    }

    case "deleteCacheKey": {
      const updatedCacheKeys = state.cacheKeys.filter(
        cacheKey => JSON.stringify(cacheKey) !== JSON.stringify(action.payload),
      )

      return { ...state, cacheKeys: updatedCacheKeys }
    }

    case "setError": {
      return { ...state, error: action.payload }
    }

    case "setFilteredCacheKeys": {
      const filterInput = action.payload.toLowerCase()

      const filteredCacheKeys = state.cacheKeys.filter(key => {
        const filtered = JSON.stringify(key).toLowerCase().includes(filterInput)

        return filtered
      })

      return { ...state, filteredCacheKeys, filterInput }
    }

    case "isClearingCache": {
      return { ...state, isClearingCache: action.payload }
    }

    case "isFetchingCacheKeys": {
      return { ...state, isFetchingCacheKeys: action.payload }
    }

    case "isDeletingCacheKey": {
      return { ...state, isDeletingCacheKey: action.payload }
    }

    default:
      return state
  }
}
