import React from "react"
import styled from "styled-components"
import { Author } from "./Author"

interface AuthorsProps {
  authors: object[]
  color?: string
}

export const Authors: React.SFC<AuthorsProps> = props => {
  const { authors, color } = props
  return (
    <AuthorsContainer>
      {authors.map((author, i) => (
        <Author author={author} key={i} color={color} />
      ))}
    </AuthorsContainer>
  )
}
const AuthorsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
