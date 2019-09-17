import {
  isCustomEditorial,
  getCustomEditorialId,
  isVanguardSubArticle,
  getVanguardSubArticleContent,
} from "../editorial_features"
import { StandardArticle } from "@artsy/reaction/dist/Components/Publishing/Fixtures/Articles"

describe("Editorial Features", () => {
  describe("#isCustomEditoral", () => {
    it("returns nothing if article ID does not match existing features", () => {
      const customEditorial = isCustomEditorial("123")
      expect(customEditorial).toBeFalsy()
    })

    it("Can identify EOY_2018_ARTISTS", () => {
      const customEditorial = isCustomEditorial("5bf30690d8b9430baaf6c6de")
      expect(customEditorial).toBe("EOY_2018_ARTISTS")
    })

    it("Can identify EOY_2018_CULTURE", () => {
      const customEditorial = isCustomEditorial("5bf306aad8b9430baaf6c6df")
      expect(customEditorial).toBe("EOY_2018_CULTURE")
    })

    it("Can identify VANGUARD_2019", () => {
      const customEditorial = isCustomEditorial("5d2f8bd0cdc74b00208b7e16")
      expect(customEditorial).toBe("VANGUARD_2019")
    })
  })

  describe("#getCustomEditorialId", () => {
    it("returns the article id if name is found", () => {
      const id = getCustomEditorialId("VANGUARD_2019")
      expect(id).toBe("5d2f8bd0cdc74b00208b7e16")
    })

    it("does nothing if name is not found", () => {
      const id = getCustomEditorialId("VANGUARD_2018")
      expect(id).toBeUndefined()
    })
  })

  describe("#isVanguardSubArticle", () => {
    it("returns true if article is child of vanguard series", () => {
      const article = {
        seriesArticle: {
          id: "5d2f8bd0cdc74b00208b7e16",
        },
        ...StandardArticle,
      }
      const isSubarticle = isVanguardSubArticle(article)
      expect(isSubarticle).toBeTruthy()
    })

    it("returns true if article is child of vanguard sub-series", () => {
      const article = {
        seriesArticle: {
          id: "5d3def6b71e1480020dd7cb9",
        },
        ...StandardArticle,
      }
      const isSubarticle = isVanguardSubArticle(article)
      expect(isSubarticle).toBeTruthy()
    })

    it("returns false for non-sub articles", () => {
      const article = {
        seriesArticle: {
          id: "5d3def6b71e1480020dd7cb8",
        },
        ...StandardArticle,
      }
      const isSubarticle = isVanguardSubArticle(article)
      expect(isSubarticle).toBeFalsy()
    })
  })

  describe("getVanguardSubArticleContent", () => {
    const article = {
      ...StandardArticle,
      relatedArticles: [
        {
          title: "Emerging",
          thumbnail_title: "Emerging Artists to Know",
          relatedArticles: [
            {
              title: "Genesis Belanger",
              thumbnail_title: "Vanguard 2019: Genesis Belanger",
            },
          ],
        },
      ],
    }

    it("returns nothing if path is master series", () => {
      const subContents = getVanguardSubArticleContent(
        "series/artsy-vanguard-2019",
        article
      )
      expect(subContents).toBe(undefined)
    })

    it("returns subArticle data for sub-series if path is not master series", () => {
      const subContents = getVanguardSubArticleContent(
        "artsy-vanguard-2019/emerging",
        article
      )
      expect(subContents.title).toBe("Emerging")
    })

    it("returns subArticle data for artist if path is not master series", () => {
      const subContents = getVanguardSubArticleContent(
        "artsy-vanguard-2019/genesis-belanger",
        article
      )
      expect(subContents.title).toBe("Genesis Belanger")
    })
  })
})
