import { createContextStore, Action, action } from "easy-peasy"
import { type FC } from "react"

// Store model interface following NavigationHistory pattern
interface ArticleStoreModel {
  // State
  articleId: string

  // Actions
  setArticleId: Action<ArticleStoreModel, string>
}

// Create the context store
export const ArticleStore = createContextStore<ArticleStoreModel>(
  runtimeModel => ({
    // State
    articleId: runtimeModel?.articleId || "",

    // Actions
    setArticleId: action((state, payload) => {
      state.articleId = payload
    }),
  }),
)

interface ArticleContextProviderProps {
  articleId: string
}

// Provider component with backward compatibility
export const ArticleContextProvider: FC<
  React.PropsWithChildren<ArticleContextProviderProps>
> = ({ articleId, children }) => {
  return (
    <ArticleStore.Provider runtimeModel={{ articleId }}>
      {children}
    </ArticleStore.Provider>
  )
}

// Backward compatible hook
export const useArticleContext = () => {
  const articleId = ArticleStore.useStoreState(state => state.articleId)
  const setArticleId = ArticleStore.useStoreActions(
    actions => actions.setArticleId,
  )

  return {
    articleId,
    setArticleId, // Additional functionality not in original
  }
}

// Export alias for migration compatibility
export const ArticleContext = ArticleStore
