import { redirectGeneToCollection } from "Apps/Gene/Server/redirectGeneToCollection"

describe("redirectGeneToCollection", () => {
  it("does not redirect for a non-migrated gene", () => {
    const req = {
      params: {
        slug: "contemporary",
      },
    }
    const res = {
      redirect: jest.fn(),
      locals: { sd: {} },
    }
    redirectGeneToCollection({ req, res })
    expect(res.redirect).not.toHaveBeenCalled()
  })

  it("redirects for a migrated gene", () => {
    const spy = jest.fn()
    const req = {
      params: {
        slug: "trove",
      },
    }
    const res = {
      redirect: spy,
      locals: {
        sd: {},
      },
    }

    redirectGeneToCollection({ req, res })
    expect(spy).toHaveBeenCalledWith(301, "/collection/curators-picks-emerging")
  })
})
