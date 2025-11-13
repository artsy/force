import {
  Children,
  type FC,
  Fragment,
  isValidElement,
  type ReactNode,
  useMemo,
} from "react"

interface CommaListProps {
  children: ReactNode
  conjunction?: string
}

export const CommaList: FC<CommaListProps> = ({
  children,
  conjunction = "and",
}) => {
  const items = useMemo(() => {
    return Children.toArray(children).filter(
      child => isValidElement(child) || typeof child === "string"
    )
  }, [children])

  switch (items.length) {
    case 0:
      return null
    case 1:
      return <>{items[0]}</>
    case 2:
      return (
        <>
          {items[0]} {conjunction} {items[1]}
        </>
      )
    default:
      return (
        <>
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            const isSecondToLast = index === items.length - 2

            return (
              <Fragment key={index}>
                {item}
                {!isLast && (isSecondToLast ? `, ${conjunction} ` : ", ")}
              </Fragment>
            )
          })}
        </>
      )
  }
}
