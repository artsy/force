import { Flex } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { ItemReview } from "../ItemReview"

storiesOf("Apps/Order/Components", module).add("ItemReview", () => {
  return (
    <>
      <Section title="Item Review">
        <Flex width={542} flexDirection="column">
          <ItemReview
            lineItem={{
              " $refType": null,
              artwork: {
                artist_names: "Francesca DiMattio",
                title: "The Fox and the Hound",
                date: "2018",
                medium: "Oil on canvas",
                dimensions: {
                  in: "96 × 79 in",
                  cm: "243.8 × 200.7 cm",
                },
                attribution_class: {
                  shortDescription: "This is a unique work",
                },
                edition_sets: [],
                image: {
                  resized: {
                    url:
                      "https://d32dm0rphc51dk.cloudfront.net/XIlup0jb5BESj71JI7ZHpQ/larger.jpg",
                  },
                },
              },
              editionSetId: null,
            }}
          />
        </Flex>
      </Section>
      <Section title="Item Review with edition set">
        <Flex width={542} flexDirection="column">
          <ItemReview
            lineItem={{
              " $refType": null,
              artwork: {
                artist_names: "Francesca DiMattio",
                title: "The Fox and the Hound",
                date: "2018",
                medium: "Oil on canvas",
                dimensions: {
                  in: "96 × 79 in",
                  cm: "243.8 × 200.7 cm",
                },
                attribution_class: {
                  shortDescription: "This is a unique work",
                },
                edition_sets: [
                  {
                    internalID: "ed-1",
                    dimensions: {
                      in: "96 × 79 in",
                      cm: "243.8 × 200.7 cm",
                    },
                  },
                  {
                    internalID: "ed-2",
                    dimensions: {
                      in: "24 × 24 in",
                      cm: "10 × 10 cm",
                    },
                  },
                ],
                image: {
                  resized: {
                    url:
                      "https://d32dm0rphc51dk.cloudfront.net/XIlup0jb5BESj71JI7ZHpQ/larger.jpg",
                  },
                },
              },
              editionSetId: "ed-2",
            }}
          />
        </Flex>
      </Section>
      <Section title="Item Review with tall image">
        <Flex width={542} flexDirection="column">
          <ItemReview
            lineItem={{
              " $refType": null,
              artwork: {
                artist_names: "Francesca DiMattio",
                title: "The Fox and the Hound",
                date: "2018",
                medium: "Oil on canvas",
                dimensions: {
                  in: "96 × 79 in",
                  cm: "243.8 × 200.7 cm",
                },
                attribution_class: {
                  shortDescription: "This is a unique work",
                },
                edition_sets: [],
                image: {
                  resized: {
                    url: "http://via.placeholder.com/350x980",
                  },
                },
              },
              editionSetId: null,
            }}
          />
        </Flex>
      </Section>
      <Section title="Item Review with fat image">
        <Flex width={542} flexDirection="column">
          <ItemReview
            lineItem={{
              " $refType": null,
              artwork: {
                artist_names: "Francesca DiMattio",
                title: "The Fox and the Hound",
                date: "2018",
                medium: "Oil on canvas",
                dimensions: {
                  in: "96 × 79 in",
                  cm: "243.8 × 200.7 cm",
                },
                attribution_class: {
                  shortDescription: "This is a unique work",
                },
                image: {
                  resized: {
                    url: "http://via.placeholder.com/980x350",
                  },
                },
                edition_sets: [],
              },
              editionSetId: null,
            }}
          />
        </Flex>
      </Section>
    </>
  )
})
