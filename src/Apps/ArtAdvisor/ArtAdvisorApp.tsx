import { FC, useState } from "react"
import { Button, Input, TextArea, Text, Spacer, Flex } from "@artsy/palette"
import { ChatCompletionStream } from "openai/lib/ChatCompletionStream"

export const ArtAdvisorApp: FC = () => {
  const [userInput, setUserInput] = useState<string>("")
  const [messages, setMessages] = useState<string>("")

  const onSubmit = async () => {
    const res = await fetch("http://localhost:3000", {
      method: "POST",
      body: userInput,
      headers: { "Content-Type": "text/plain" },
    })

    setMessages(messages + `USER: ${userInput}` + "\n")

    // @ts-expect-error ReadableStream on different environments can be strange
    const runner = ChatCompletionStream.fromReadableStream(res.body)

    runner.on("content", (delta, snapshot) => {
      setMessages(
        messages +
          "USER: " +
          userInput +
          "\n" +
          "\n" +
          "ART ADVISOR: " +
          snapshot +
          "\n" +
          "\n"
      )
    })

    console.dir(await runner.finalChatCompletion(), { depth: null })
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
    </>
  )
}
