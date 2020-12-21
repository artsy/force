// Track loaded scripts
const LOADED_SCRIPTS = new Set<string>()

export const loadScript = (
  urlOrId: string,
  source: string = null
): Promise<void> => {
  // Only load a script at most once.
  if (LOADED_SCRIPTS.has(urlOrId)) {
    return null
  }

  LOADED_SCRIPTS.add(urlOrId)
  const scriptPromise = new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") {
      // Resolve to null when imported server side.
      resolve()
      return
    }

    try {
      let script =
        source === null ? findScript(urlOrId) : findScriptById(urlOrId)

      if (script) {
        console.warn(`Script ${urlOrId} already loaded in the document`)
      } else if (!script) {
        script =
          source === null
            ? injectScript(urlOrId)
            : injectScriptRaw(urlOrId, source)
      }

      script.addEventListener("load", () => {
        resolve()
      })

      script.addEventListener("error", () => {
        reject(new Error(`Failed to load script ${urlOrId}`))
      })
    } catch (err) {
      reject(err)
    }
  })

  return scriptPromise
}

const findScript = (scriptUrl: string): HTMLScriptElement | null => {
  const scripts = document.querySelectorAll<HTMLScriptElement>(
    `script[src^="${scriptUrl}"]`
  )

  const urlRegex = new RegExp(scriptUrl, "g")
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i]

    if (!urlRegex.test(script.src)) {
      continue
    }

    return script
  }

  return null
}

const findScriptById = (scriptId: string): HTMLElement | null => {
  const element = document.getElementById(scriptId)
  return element ? element : null
}

const injectScript = (scriptUrl: string): HTMLScriptElement => {
  const script = document.createElement("script")
  script.src = scriptUrl

  appendBody(script)

  return script
}

const injectScriptRaw = (id: string, source: string): HTMLScriptElement => {
  const script = document.createElement("script")
  script.id = id
  script.type = "text/javascript"
  script.textContent = source

  appendBody(script)

  return script
}

const appendBody = (element: HTMLElement): void => {
  const body = document.body
  if (!body) {
    throw new Error("Expected document.body not to be null.")
  }
  body.appendChild(element)
}
