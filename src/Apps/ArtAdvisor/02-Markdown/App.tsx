import { FC, useEffect, useRef, useState } from "react"
import { Text, Box, Input, Button, Flex } from "@artsy/palette"
import { ChatCompletionStream } from "openai/lib/ChatCompletionStream"
import Markdown from "marked-react"

export const App: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const conversationRef = useRef(null)
  const scrollMeRef = useRef<HTMLDivElement>(null)
  const [markdownText, setMarkdownText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Setup: insert some CSS rules into the document's head
    const styleElement = insertStyles()

    // Cleanup: remove the style element when the component is unmounted
    return () => removeStyles(styleElement)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    if (!inputRef.current) {
      return
    }

    const response = await fetch("http://localhost:3000", {
      method: "POST",
      body: inputRef.current.value,
      headers: { "Content-Type": "text/plain" },
    })

    if (!response.body) {
      return
    }

    const runner = ChatCompletionStream.fromReadableStream(response.body)
    setIsGenerating(true)

    runner.on("content", (delta, snapshot) => {
      // update the conversation incrementally
      setMarkdownText(current => current + delta)

      // -vs- replace the conversation
      // setMarkdownText(snapshot)

      // keep the bottom of the conversation scrolled into view
      let convo = (conversationRef.current as unknown) as HTMLDivElement
      if (convo) {
        convo.scrollTop = convo.scrollHeight - convo.clientHeight
      }
    })

    await runner.finalChatCompletion()
    setMarkdownText(current => current + "\n\n")
    setIsGenerating(false)
  }

  return (
    <Box>
      <Text variant={"lg-display"} my={4}>
        Chat 1
      </Text>

      <Box
        ref={conversationRef}
        style={{ fontSize: "1.2em" }}
        height={"30em"}
        border={"solid 1px"}
        borderColor={"black60"}
        my="2em"
        p="1em"
        overflow={"scroll"}
      >
        <Markdown>{markdownText}</Markdown>

        <div ref={scrollMeRef}>
          {/* invisible element that will be scrolled into view as `messages` gets updated */}
        </div>
      </Box>

      <form onSubmit={handleSubmit}>
        <Flex gap={1} mb={4}>
          <Input
            ref={inputRef}
            style={{ fontSize: "1.2em" }}
            placeholder="Chat with Artsy"
            defaultValue="List the different printmaking techniques. For each provide the name of the technique in boldface, the definirion in italic, and a link to an example artwork for that technique on Artsy.net"
          />
          <Button px={6} disabled={isGenerating}>
            Send
          </Button>
        </Flex>
      </form>

      <details>
        <summary>See raw response</summary>

        <textarea
          style={{ width: "100%", height: "auto" }}
          rows={30}
          value={markdownText}
          readOnly
        />
      </details>
    </Box>
  )
}

function insertStyles() {
  // Create a new style element
  const styleElement = document.createElement("style")
  styleElement.type = "text/css"

  // Insert the style element into the document's head
  document.head.appendChild(styleElement)

  // Add some CSS rules
  if (styleElement.sheet) {
    styleElement.sheet.insertRule(
      "ul, ol { margin: 0 1em; padding: 0em; }",
      styleElement.sheet.cssRules.length
    )
    styleElement.sheet.insertRule(
      "ol li { list-style-type: number; margin-bottom: 1em; }",
      styleElement.sheet.cssRules.length
    )
    styleElement.sheet.insertRule(
      "ul li { list-style-type: disc; margin-bottom: 1em; }",
      styleElement.sheet.cssRules.length
    )
    styleElement.sheet.insertRule(
      "table { border: 1px solid gray; border-collapse: collapse; }",
      styleElement.sheet.cssRules.length
    )
    styleElement.sheet.insertRule(
      "td, th { border: 1px solid gray; padding: 0.5em; }",
      styleElement.sheet.cssRules.length
    )
  }

  return styleElement
}

function removeStyles(styleElement: HTMLStyleElement) {
  document.head.removeChild(styleElement)
}
