import { type FC, createContext, useContext } from "react"

interface ArticleContextValue {
  articleId: string
}

const ArticleContext = createContext<ArticleContextValue>({
  articleId: "",
})

interface ArticleContextProviderProps {
  articleId: string
}

export const ArticleContextProvider: FC<
  React.PropsWithChildren<ArticleContextProviderProps>
> = ({ articleId, children }) => {
  return <ArticleContext.Provider value={{ articleId }}>{children}</ArticleContext.Provider>
}

export const useArticleContext = () => {
  return useContext(ArticleContext)
}
