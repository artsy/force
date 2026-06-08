import { redirectCollectionToGene } from "Apps/Collect/Server/redirectCollectionToGene"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"

describe("redirectCollectionToGene", () => {
  it("does not redirect for a non-migrated collection", () => {
    const req = {
      params: {
        slug: "contemporary",
      },
    }
    const res = {
      redirect: jest.fn(),
      locals: { sd: {} },
    }
    const next = jest.fn()

    redirectCollectionToGene(
      req as unknown as ArtsyRequest,
      res as unknown as ArtsyResponse,
      next,
    )

    expect(res.redirect).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it("redirects for a migrated collection", () => {
    const spy = jest.fn()
    const req = {
      params: {
        slug: "chinese-artists",
      },
    }
    const res = {
      redirect: spy,
      locals: {
        sd: {},
      },
    }
    const next = jest.fn()

    redirectCollectionToGene(
      req as unknown as ArtsyRequest,
      res as unknown as ArtsyResponse,
      next,
    )

    expect(spy).toHaveBeenCalledWith(301, "/gene/china")
    expect(next).not.toHaveBeenCalled()
  })
})
