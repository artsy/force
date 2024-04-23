import { FC, useState } from "react"
import { Button, Input, TextArea, Text } from "@artsy/palette"
import { ChatCompletionStream } from "openai/lib/ChatCompletionStream"

export const ArtAdvisorApp: FC = () => {
  const [userInput, setUserInput] = useState<string>("")
  const [messages, setMessages] = useState<string>("")

  const onSubmit = async () => {
    console.log("ABOUT TO SEND", userInput)
    const res = await fetch("http://localhost:3000", {
      method: "POST",
      body: userInput,
      headers: { "Content-Type": "text/plain" },
    })
    // @ts-expect-error ReadableStream on different environments can be strange
    const runner = ChatCompletionStream.fromReadableStream(res.body)

    runner.on("content", (delta, snapshot) => {
      setMessages(messages + snapshot + "\n")
    })

    console.dir(await runner.finalChatCompletion(), { depth: null })
  }

  return (
    <>
      <Text variant="lg-display" mb={4}>
        Art Advisor
      </Text>
      <TextArea value={messages} />
      <Input
        name="userInput"
        placeholder="Enter your message here"
        onChange={e => setUserInput(e.target.value)}
      />
      <Button type="submit" onClick={onSubmit}>
        Send Message
      </Button>
    </>
  )
}
