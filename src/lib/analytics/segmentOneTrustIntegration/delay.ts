export function delay(n) {
  console.log("delay called")
  return new Promise<void>(done => {
    setTimeout(() => {
      done()
    }, n)
  })
}
