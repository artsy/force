import { FC, FormEvent, useState } from "react"
import {
  Button,
  Input,
  Text,
  Spacer,
  Flex,
  StackableBorderBox,
} from "@artsy/palette"
import { useSystemContext } from "System/SystemContext"

type Message = {
  role: string
  content: string
}

export const App: FC = () => {
  const [userInput, setUserInput] = useState<string>("")
  const [messages, setMessageList] = useState<Message[]>([])

  const { user } = useSystemContext()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/advisor/3", {
        method: "POST",
        body: JSON.stringify([
          ...messages,
          { role: "user", content: userInput },
        ]),
        headers: {
          "Content-Type": "application/json",
          "X-ACCESS-TOKEN": user?.accessToken || "",
        },
      })
      const parsedResponse = await res.json()

      setMessageList(parsedResponse)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Spacer y={4} />
      <Text variant="lg-display">Profile Builder</Text>
      <Spacer y={4} />
      {messages.map((message, index) => {
        // Guard against trying to rendering messages that are just for memory, sush as function tool messages.
        if (message.role === "tool" || message.content === null) {
          return null
        }

        return (
          <StackableBorderBox key={index}>
            <Text color="black60">
              {message.role === "user" ? "User" : "Assistant"}
            </Text>
            <Text>{message.content}</Text>
          </StackableBorderBox>
        )
      })}
      <Spacer y={2} />
      <form onSubmit={onSubmit}>
        <Flex>
          <Input
            name="userInput"
            placeholder="Enter your message here"
            onChange={e => setUserInput(e.target.value)}
          />
          <Spacer x={4} />
          <Button type="submit">Send</Button>
        </Flex>
      </form>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </>
  )
}
