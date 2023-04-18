import { Text } from "@artsy/palette"
import { ClassI18n } from "System/i18n/ClassI18n"
import styled from "styled-components"

export const NewSeacrhBar = () => {
  return (
    <ClassI18n>
      {({ t }) => (
        <Form
          action="/search"
          method="GET"
          onSubmit={() => console.log("Pressed ")}
        >
          <Text> I am the new Search bar</Text>
        </Form>
      )}
    </ClassI18n>
  )
}

const Form = styled.form`
  width: 100%;
`
