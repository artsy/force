import express, { Request, Response } from "express"
import OpenAI from "openai"

const openai = new OpenAI() // uses `OPENAI_API_KEY` from .env

const handler = async (req: Request, res: Response) => {
  try {
    console.log(new Date())
    console.log("Received request body:", req.body)

    const stream = openai.beta.chat.completions.stream({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "system",
          content: `
          You are Artsy's art advisor assistant.
          `,
        },
        { role: "user", content: req.body },
      ],
    })

    res.header("Content-Type", "text/plain")
    // @ts-expect-error
    for await (const chunk of stream.toReadableStream()) {
      console.log(chunk)
      res.write(chunk)
    }

    res.end()
  } catch (e) {
    console.error(e)
  }
}

function parseTextPlain(req, res, next) {
  if (req.headers["content-type"] === "text/plain") {
    let data = ""
    req.on("data", chunk => {
      data += chunk
    })
    req.on("end", () => {
      req.body = data
      next()
    })
  } else {
    next()
  }
}

export const router = express.Router()
router.use(parseTextPlain)
router.post("/", handler)
