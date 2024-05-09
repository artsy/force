import { FC, FormEvent, useEffect, useRef, useState } from "react"
import {
  Button,
  Input,
  Text,
  Spacer,
  Flex,
  StackableBorderBox,
  Box,
  Spinner,
  useToasts,
} from "@artsy/palette"
import { useSystemContext } from "System/SystemContext"
import Markdown from "marked-react"

type Message = {
  role: string
  content: string
}

export const App: FC = () => {
  const [userInput, setUserInput] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { user } = useSystemContext()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    try {
      const res = await fetch("/api/advisor/4", {
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

      setMessages(parsedResponse)

      if (inputRef.current) {
        inputRef.current.value = ""
        inputRef.current.focus()
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <Spacer y={4} />
      <Text variant="lg-display">Profile Builder</Text>
      <Spacer y={4} />
      <Box>
        {messages.map((message, index) => {
          // Guard against trying to rendering messages that are just for memory, such as function tool messages.
          if (message.role === "tool" || message.content === null) {
            return null
          }

          return (
            <StackableBorderBox key={index}>
              <Text color="black60">
                {message.role === "user" ? "User" : "Assistant"}
              </Text>
              <Markdown>{message.content}</Markdown>
            </StackableBorderBox>
          )
        })}
      </Box>
      <Spacer y={2} />
      <form onSubmit={onSubmit}>
        <Flex>
          <Input
            ref={inputRef}
            name="userInput"
            placeholder="Enter your message here"
            onChange={e => setUserInput(e.target.value)}
          />
          <Spacer x={2} />
          <SubmitButton isGenerating={isGenerating} />
        </Flex>
      </form>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </>
  )
}

const SubmitButton: React.FC<{ isGenerating: boolean }> = props => {
  const { isGenerating } = props

  return (
    <Button type="submit" minWidth={"10em"} disabled={isGenerating}>
      {isGenerating ? (
        <Box position="relative">
          <Spinner color="white100" />
        </Box>
      ) : (
        "Send"
      )}
    </Button>
  )
}
