import OpenAI from "openai"
import express, { Request, Response } from "express"
import { instructions } from "Apps/ArtAdvisor/04-Bio-Follows-Alerts/lib/system-instructions"
import chalk from "chalk"
import {
  createAlert,
  followArtist,
  getUserProfile,
  updateCollectorProfile,
} from "Apps/ArtAdvisor/04-Bio-Follows-Alerts/lib/functions"

/*
 * Setup express server, OpenAi client, and config.
 */

const openai = new OpenAI() // Client will look for OPENAI_API_KEY in your environment during instantiation

/*
 * Define the tools that the assistant can use to make function calls.
 */

const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "get_user_profile",
      description: `Get information associated with a user profile on artsy.`,
      parameters: {
        type: "object",
        properties: {
          token: {
            type: "string",
            description:
              "user's access token, which can be used to fetch user information from artsy.",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "update_collector_profile",
      description: `Update the user's collector profile on artsy.`,
      parameters: {
        type: "object",
        properties: {
          bio: {
            type: "string",
            description:
              "The final version of the collector profile to be saved to the user's profile.",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "follow_artist",
      description: `Follow an artist on artsy on behalf of a user.`,
      parameters: {
        type: "object",
        properties: {
          artistID: {
            type: "string",
            description:
              "The ID of the artist to follow. It is the same as the artsy.net slug",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "create_alert",
      description: `Create an alert for an user on artsy.`,
      parameters: {
        type: "object",
        properties: {
          artistID: {
            type: "string",
            description:
              "The ID of the artist to follow. It is the same as the artsy.net slug. This parameter is required.",
          },
          priceRange: {
            type: "string",
            description:
              "The price range the user is interested in. It should follow the following format when there is a min and max price: minPrice-maxPrice. It should follow the following format when only a min price is provided: minPrice-*. It should follow the following format when only a max price is provided: *-maxPrice. If no price range is specified, omit this parameter.",
          },
          additionalGeneIds: {
            type: "string",
            description: "The medium the user is interested in.",
            enum: [
              "painting",
              "photography",
              "sculpture",
              "prints",
              "work-on-paper",
              "nft",
              "drawing",
              "design",
              "installation",
              "film-slash-video",
              "jewelry",
              "performance-art",
              "reproduction",
              "ephemera-or-merchandise",
            ],
          },
          rarity: {
            type: "string",
            description: "The rarity the user is interested in.",
            enum: [
              "unique",
              "limited edition",
              "open edition",
              "unknown edition",
            ],
          },
        },
      },
    },
  },
]

const handler = async (req: Request, res: Response) => {
  try {
    res.header("Content-Type", "text/plain")

    console.log(chalk.yellow("Received request body: "), req.body)

    /*
     * Step 1: Get the response from the assistant, passing in the entire message history.
     *         We expect the entire message history to come back from the client
     */

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = req.body

    // get a response from the model, providing the system instructions as the first message.
    const response = await openai.chat.completions.create({
      // NOTE: client is unaware of the system message since we don't append it to the messages array.
      messages: [{ role: "system", content: instructions }, ...messages],
      model: "gpt-4-turbo",
      tools,
    })

    console.log(
      chalk.yellow("First openai response: "),
      JSON.stringify(response, null, 2)
    )

    const responseMessage = response.choices[0].message

    /*
     * Step 2: check if the model wants to call a function in response to the user prompt
     */

    if (responseMessage.tool_calls) {
      // If the assistant requires a tool call, then we need to make the function call and pass the response back to the assistant

      const toolCalls = responseMessage.tool_calls

      console.log(
        chalk.yellow("Model requesting to make function call(s): "),
        toolCalls
      )

      // extend conversation with assistant's reply. When providing a function call, we need to include the assistant's response in the messages array directly before the response (i.e. order matters).
      messages.push(responseMessage)

      // The model can request multiple tool calls, so we need to iterate over each one and make the function call.
      for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name
        const functionArgs = JSON.parse(toolCall.function.arguments)

        const availableFunctions = {
          get_user_profile: getUserProfile,
          update_collector_profile: updateCollectorProfile,
          follow_artist: followArtist,
          create_alert: createAlert,
        }

        const functionToCall = availableFunctions[functionName]
        const args = {
          token: req.headers["x-access-token"] as string,
          ...functionArgs,
        }

        const functionResponse = await functionToCall(args)

        console.log(
          chalk.yellow(`Function call response from ${functionName}: `),
          JSON.stringify(functionResponse, null, 2)
        )

        // extend conversation with function response
        messages.push({
          tool_call_id: toolCall.id,
          role: "tool",
          content: JSON.stringify(functionResponse),
        })
      }

      // get a second response including the function response(s) in the messages.
      const secondResponse = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: messages,
      })

      console.log(chalk.yellow("Second openai response: "), secondResponse)

      // iterate over the response choices and push the messages to the messages array
      secondResponse.choices.forEach(choice => messages.push(choice.message))

      res.write(JSON.stringify(messages))
    } else {
      // If the assistant does not require a tool call, then we can just format the response and send it back to the client

      // iterate over the response choices and push the messages to the messages array
      response.choices.forEach(choice => messages.push(choice.message))

      res.write(JSON.stringify(messages))
    }

    console.log(chalk.green("********* END OF REQUEST *********"))

    res.end()
  } catch (e) {
    console.error(chalk.red("ERROR: "), e)
    res.status(500).send("An error occurred")
  }
}

/*
 * Define the express server routes
 */

export const router = express.Router()
router.post("/", handler)
