import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import dedent from "dedent"
import { z } from "zod"

const model = openai("gpt-4o")

const system = dedent`
  Your task is to analyze a list of art collecting interests
  and to produce an array of search-engine friendly search queries

  Examples:

  Input: "I am interested in adorable animals"
  Output: ["cute animals"]

  Input: "I want to support latinx femmes"
  Output: ["women artists", "latina", "latinx"]
`

const prompt = (statement: string) => dedent`
  Analyze the list of collecting interests and produce a structured object to describe it.

  COLLECTING INTERESTS: ${statement}
`
export const schema = z.object({
  terms: z
    .array(z.string())
    .optional()
    .describe("A list of search-engine optimized search terms"),
})

export async function extractInterestsIntent(interestsFreeText: string) {
  const result = await generateObject({
    model,
    temperature: 0,
    system,
    prompt: prompt(interestsFreeText),
    schema,
  })

  console.log("[LLM] extractInterestsIntent", {
    interestsFreeText,
    terms: result.object.terms,
  })

  return result.object
}
