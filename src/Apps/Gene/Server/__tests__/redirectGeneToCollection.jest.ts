import { redirectGeneToCollection } from "Apps/Gene/Server/redirectGeneToCollection"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"

describe("redirectGeneToCollection", () => {
  it("does not redirect for a non-migrated gene", () => {
    const req = { params: { slug: "contemporary" } }
    const res = { redirect: jest.fn(), locals: { sd: {} } }

    redirectGeneToCollection({
      req: req as unknown as ArtsyRequest,
      res: res as unknown as ArtsyResponse,
    } as any)

    expect(res.redirect).not.toHaveBeenCalled()
  })

  it("redirects for a migrated gene", () => {
    const req = { params: { slug: "trove" } }
    const res = { redirect: jest.fn(), locals: { sd: {} } }

    redirectGeneToCollection({
      req: req as unknown as ArtsyRequest,
      res: res as unknown as ArtsyResponse,
    } as any)

    expect(res.redirect).toHaveBeenCalledWith(
      301,
      "/collection/curators-picks-emerging",
    )
  })
})
