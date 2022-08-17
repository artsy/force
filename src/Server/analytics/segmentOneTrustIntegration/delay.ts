export function delay(n) {
  return new Promise<void>(done => {
    setTimeout(() => {
      done()
    }, n)
  })
}
