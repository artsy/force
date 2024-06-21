import { FC, useState } from "react"
import { Button, Input, TextArea, Text, Spacer, Flex } from "@artsy/palette"
import { useSystemContext } from "System/Hooks/useSystemContext"

type Message = {
  role: string
  content: string
}

export const App: FC = () => {
  const [userInput, setUserInput] = useState<string>("")
  const [messages, setMessages] = useState<string>("")
  const [messageList, setMessageList] = useState<Message[]>([])

  const { user } = useSystemContext()

  const onSubmit = async () => {
    const res = await fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify([
        ...messageList,
        { role: "user", content: userInput },
      ]),
      headers: {
        "Content-Type": "text/plain",
        "X-ACCESS-TOKEN": user?.accessToken || "",
      },
    })

    const parsedResponse = await res.json()

    console.log(parsedResponse)

    setMessageList(parsedResponse.messages)

    setMessages(
      messages +
        "USER: " +
        userInput +
        "\n" +
        "\n" +
        "ART ADVISOR: " +
        parsedResponse.message +
        "\n" +
        "\n"
    )
  }

  return (
    <>
      <Spacer y={4} />
      <Text variant="lg-display">Art Advisor Chat</Text>
      <Spacer y={4} />
      <TextArea value={messages} />
      <Spacer y={2} />
      <Flex>
        <Input
          name="userInput"
          placeholder="Enter your message here"
          onChange={e => setUserInput(e.target.value)}
        />
        <Spacer x={2} />
        <Button type="submit" onClick={onSubmit}>
          Send Message
        </Button>
      </Flex>
      <pre>{JSON.stringify(messageList, null, 2)}</pre>
    </>
  )
}
