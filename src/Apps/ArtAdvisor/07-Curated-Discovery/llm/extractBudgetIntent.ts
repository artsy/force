import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import dedent from "dedent"
import { z } from "zod"

const model = openai("gpt-4o")

const system = dedent`
  Your task is to analyze a plaintext budget statement
  from a collector who is interested in buying one or more artworks,
  and to produce a structured object to describe it, containing:
  - budget
  - numberOfArtworks
  - timeFrame

  If a budget expresses a range, set min and max accordingly.

  If a budget expresses a single amount, then set min to 0 and max to the amount.

  If a budget cannot be inferred, omit it

  If the number of artworks is stated or implied, set numberOfArtworks accordingly.

  If the number of artworks is not stated or implied, omit numberOfArtworks.

  If the time frame is expressed in relative terms, consider the current date: ${new Date().toISOString()}

  If the time frame is not stated or implied, omit timeFrame.
`

const prompt = (statement: string) => dedent`
  Analyze the following budget statement and produce a structured object to describe it.

  BUDGET STATEMENT: ${statement}
`
const schema = z.object({
  budget: z
    .object({
      currency: z
        .string()
        .default("USD")
        .describe("ISO currency code. Assume USD if not otherwise specified."),
      min: z
        .number()
        .default(0)
        .describe(
          "A minimum amount. Default to 0 if not otherwise specified. Set this to a non-zero number ONLY IF the user has explicitly specified a minimum."
        ),
      max: z.number().describe("A maximum amount."),
    })
    .optional()
    .describe("The user's budget. Omit if unspecified."),
  numberOfArtworks: z
    .number()
    .optional()
    .describe(
      "The number of artworks the user wishes to buy. Omit if unspecified."
    ),
  timeFrame: z
    .object({
      number: z.number().optional().describe("How many of the time units"),
      unit: z
        .enum(["day", "week", "month", "year"])
        .optional()
        .describe("The unit of time"),
    })
    .optional()
    .describe(
      "The time frame over which the user wishes to buy. Omit if unspecified."
    ),
})

export async function extractBudgetIntent(budget: string) {
  console.log("[LLM] extractBudgetIntent", { budget })

  const result = await generateObject({
    model,
    temperature: 0,
    system,
    prompt: prompt(budget),
    schema,
  })

  return result.object
}
