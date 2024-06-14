import { FC } from "react"
import _ from "lodash"
import { Box, Button, Spacer, Text, TextArea } from "@artsy/palette"

interface ConceptsProps {
  conceptText: string
  setConceptText: (text: string) => void
  setConcepts: (concepts: string[]) => void
}
export const Concepts: FC<ConceptsProps> = props => {
  const { conceptText, setConceptText, setConcepts } = props
  return (
    <Box py={2}>
      <Text variant={"lg-display"}>Concepts</Text>
      <Spacer y={1} />

      <Text>Enter one or more "user concepts", one concept per line:</Text>
      <Spacer y={1} />

      <TextArea
        placeholder="street art, e.g."
        defaultValue={conceptText}
        rows={5}
        onChange={({ value }) => setConceptText(value)}
      ></TextArea>
      <Spacer y={1} />

      <Button
        onClick={e => {
          let concepts = (conceptText || "").split("\n")
          concepts = _.reject(concepts, c => _.isEmpty(c.trim()))
          setConcepts(concepts)
        }}
      >
        Update
      </Button>
    </Box>
  )
}
