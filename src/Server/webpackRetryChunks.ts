;(function () {
  // Save the original __webpack_require__.e function
  const originalEnsure = __webpack_require__.e

  // Create a retry wrapper around the original ensure function
  function retryEnsure(chunkId, retries = 3) {
    function tryEnsure(attempt) {
      return originalEnsure(chunkId).catch(error => {
        if (attempt < retries) {
          console.warn(`Retrying to load chunk ${chunkId}, attempt ${attempt}`)
          return tryEnsure(attempt + 1)
        } else {
          console.error(
            `Failed to load chunk ${chunkId} after ${retries} attempts`
          )
          throw error
        }
      })
    }
    return tryEnsure(1)
  }

  // Patch the original __webpack_require__.e function
  __webpack_require__.e = function (chunkId) {
    return retryEnsure(chunkId)
  }

  // If there are any additional properties or methods on __webpack_require__.e, copy them over
  for (const key in originalEnsure) {
    if (originalEnsure.hasOwnProperty(key)) {
      __webpack_require__.e[key] = originalEnsure[key]
    }
  }
})()
