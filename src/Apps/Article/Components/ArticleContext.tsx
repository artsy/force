import { type FC, createContext, useContext } from "react"

const ArticleContext = createContext({
  articleId: "",
})

interface ArticleContextProviderProps {
  articleId: string
}

export const ArticleContextProvider: FC<
  React.PropsWithChildren<ArticleContextProviderProps>
> = ({ articleId, children }) => {
  return (
    <ArticleContext.Provider value={{ articleId }}>
      {children}
    </ArticleContext.Provider>
  )
}

export const useArticleContext = () => {
  return useContext(ArticleContext)
}
