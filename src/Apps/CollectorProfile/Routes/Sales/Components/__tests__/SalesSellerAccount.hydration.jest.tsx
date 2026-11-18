import { SalesSellerAccount } from "Apps/CollectorProfile/Routes/Sales/Components/SalesSellerAccount"
import { fetchSellerAccount } from "Apps/CollectorProfile/Routes/Sales/Utils/sellerAccount"
import { act } from "@testing-library/react"
import { hydrateRoot } from "react-dom/client"
import { renderToString } from "react-dom/server"

jest.mock("Apps/CollectorProfile/Routes/Sales/Utils/sellerAccount", () => {
  return { fetchSellerAccount: jest.fn(), deleteSellerAccount: jest.fn() }
})

jest.mock("System/Hooks/useSystemContext", () => {
  return {
    useSystemContext: () => ({ user: { accessToken: "token" } }),
  }
})

describe("SalesSellerAccount hydration", () => {
  it("hydrates the server-rendered markup without a mismatch", async () => {
    ;(fetchSellerAccount as jest.Mock).mockResolvedValue(null)
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {})
    const onRecoverableError = jest.fn()

    const html = renderToString(<SalesSellerAccount />)
    const container = document.createElement("div")
    container.innerHTML = html
    document.body.appendChild(container)

    await act(async () => {
      hydrateRoot(container, <SalesSellerAccount />, { onRecoverableError })
    })

    const hydrationErrors = consoleError.mock.calls.filter(([message]) => {
      return /hydrat|didn['’]t match|mismatch/i.test(String(message))
    })

    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(hydrationErrors).toEqual([])
  })
})
