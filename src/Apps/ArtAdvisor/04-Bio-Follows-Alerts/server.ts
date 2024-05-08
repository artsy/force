import OpenAI from "openai"
import express, { Request, Response } from "express"
import { instructions } from "./00-prompt-lib/collector-profile-one"
import chalk from "chalk"

/*
 * Setup express server, OpenAi client, and config.
 */

const openai = new OpenAI() // Client will look for OPENAI_API_KEY in your environment during instantiation

/*
 * Define the tools that the assistant can use:
 *
 * 1. get_user_profile: The user's artsy profile as returned from th "me" query. Will look up user encoded in the x-access-token header.
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
          token: {
            type: "string",
            description:
              "user's access token, which can be used to update user information in artsy.",
          },
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
          token: {
            type: "string",
            description:
              "user's access token, which can be used to update user information in artsy.",
          },
          artistID: {
            type: "string",
            description:
              "The ID of the artist to follow. It is the same as the artsy.net slug",
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
      chalk.yellow("First response from model: "),
      JSON.stringify(response)
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
        }

        const functionToCall = availableFunctions[functionName]
        const args = {
          token: req.headers["x-access-token"] as string,
          ...functionArgs,
        }

        const functionResponse = await functionToCall(args)

        console.log(
          chalk.yellow(`Function call response from ${functionName}: `),
          functionResponse
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

      console.log(chalk.yellow("SECOND RESPONSE: "), secondResponse)

      // itarate over the response choices and push the messages to the messages array
      secondResponse.choices.forEach(choice => messages.push(choice.message))

      res.write(JSON.stringify(messages))
    } else {
      // If the assistant does not require a tool call, then we can just format the response and send it back to the client

      // itarate over the response choices and push the messages to the messages array
      response.choices.forEach(choice => messages.push(choice.message))

      res.write(JSON.stringify(messages))
    }

    console.log(chalk.green("********* END OF REQUEST *********"))
    res.end()
  } catch (e) {
    console.error(chalk.red("ERROR: "), e)
    res.send("An error occurred: ")
  }
}

/*
 * Define the functions that can be called by the assitant.
 */

async function getUserProfile(args: { size: number; token: string }) {
  const query = `query getUserProfile {
    me {
      internalID
      name
      email
      followsAndSaves {
        artistsConnection(first: 10) {
          edges {
            node {
              artist {
                name
              }
            }
          }
        }
        genesConnection(first: 10) {
          edges {
            node {
              gene {
                name
              }
            }
          }
        }
      }
    }
  }`

  const variables = {
    size: args.size,
  }

  const headers = {
    "X-ACCESS-TOKEN": args.token,
    "Content-Type": "application/json",
  }

  const response = await metaphysics({ query, variables, headers })

  const profile = response.data.me

  return profile
}

async function updateCollectorProfile(args: { bio: string; token: string }) {
  const query = `mutation updateUserProfile($input: UpdateMyProfileInput!){
    updateMyUserProfile(input: $input) {
      __typename
      me {
        name
      }
      userOrError {
        ... on UpdateMyProfileMutationSuccess {
          user {
            collectorProfile {
              internalID
              bio
            }
          }
        }
        ... on UpdateMyProfileMutationFailure {
          mutationError {
            message
          }
        }
      }
    }
  }`

  const variables = {
    input: { bio: args.bio },
  }

  const headers = {
    "X-ACCESS-TOKEN": args.token,
    "Content-Type": "application/json",
  }

  const response = await metaphysics({ query, variables, headers })

  console.log("Response from update BIO: ", response)
  const updatedBio = response.data.updateMyUserProfile.userOrError

  return updatedBio
}

async function followArtist(args: { artistID: string; token: string }) {
  const query = `mutation followArtist($input: FollowArtistInput!) {
    followArtist(input: $input) {
      artist {
        internalID
        name
        slug
      }
    }
  }`

  const variables = {
    input: { artistID: args.artistID },
  }

  const headers = {
    "X-ACCESS-TOKEN": args.token,
    "Content-Type": "application/json",
  }

  const response = await metaphysics({ query, variables, headers })

  const artist = response.data.followArtist.artist

  return artist
}

async function metaphysics(args: {
  query: string
  variables: Record<string, unknown>
  headers: Record<string, string>
}) {
  const { query, variables, headers } = args

  const url =
    `${process.env.METAPHYSICS_ENDPOINT}/v2` ||
    "https://metaphysics-staging.artsy.net/v2"

  const body = JSON.stringify({ query, variables })
  const options = { method: "POST", headers, body }

  const response = await fetch(url, options)
  const json = await response.json()
  return json
}

/*
 * Define the express server routes
 */

export const router = express.Router()
router.post("/", handler)
