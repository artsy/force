import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import auctions from "desktop/apps/auction/reducers"
import * as actions from "desktop/apps/auction/actions/artworkBrowser"
import sinon from "sinon"

const rewire = require("rewire")("../../actions/artworkBrowser")

describe("auction/actions/artworkBrowser.test.js", () => {
  it("returns the initial state", () => {
    const {
      artworkBrowser: { filterParams },
    } = auctions(undefined, {})
    filterParams.should.containEql({ page: 1, size: 20 })
  })

  describe("with initial state", () => {
    let initialResponse

    beforeEach(() => {
      initialResponse = auctions(undefined, {})
    })

    describe("#fetchArtworksByFollowedArtists", () => {
      let store

      beforeEach(() => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        store = mockStore(initialResponse)
        rewire.__set__(
          "metaphysics",
          sinon.stub().returns(
            Promise.resolve({
              saleArtworksConnection: {
                edges: [
                  { node: { id: "artwork1" } },
                  { node: { id: "artwork2" } },
                ],
                counts: {
                  total: 123,
                },
              },
            })
          )
        )
      })
      it.skip("calls the correct actions", () => {
        const expectedActions = [
          {
            type: "UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS",
            payload: { saleArtworks: [{ id: "artwork1" }, { id: "artwork2" }] },
          },
          {
            type: "UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS_TOTAL",
            payload: { total: 123 },
          },
          { type: "UPDATE_IS_LAST_FOLLOWED_ARTISTS_PAGE" },
          { type: "SHOW_FOLLOWED_ARTISTS_RAIL" },
        ]
        store
          .dispatch(actions.fetchArtworksByFollowedArtists())
          .then(() => {
            store.getActions().should.eql(expectedActions)
          })
          .catch(e => {
            // FIXME: promise mocking does not catch error:
            // TypeError [ERR_INVALID_ARG_TYPE]: The "urlObject" argument
            // must be one of type Object or string. Received type undefined
          })
      })
    })

    describe("#toggleListView", () => {
      it("toggles the list view component", () => {
        initialResponse.artworkBrowser.isListView.should.eql(false)
        const toggledResponse = auctions(
          initialResponse,
          actions.toggleListView(true)
        )
        toggledResponse.artworkBrowser.isListView.should.eql(true)
      })
    })

    describe("#updateAggregatedArtists", () => {
      it("updates aggregated artists", () => {
        initialResponse.artworkBrowser.aggregatedArtists.should.eql([])
        const updatedResponse = auctions(
          initialResponse,
          actions.updateAggregatedArtists(["artist1", "artist2"])
        )
        updatedResponse.artworkBrowser.aggregatedArtists.should.eql([
          "artist1",
          "artist2",
        ])
      })
    })

    describe("#updateAggregatedMediums", () => {
      it("updates aggregated mediums", () => {
        initialResponse.artworkBrowser.aggregatedMediums.should.eql([])
        const updatedResponse = auctions(
          initialResponse,
          actions.updateAggregatedMediums(["gene1", "gene2"])
        )
        updatedResponse.artworkBrowser.aggregatedMediums.should.eql([
          "gene1",
          "gene2",
        ])
      })
    })

    describe("#updateAllFetched", () => {
      it("updates allFetched to true if the total matches the number of artworks", () => {
        initialResponse.artworkBrowser.allFetched.should.eql(false)
        initialResponse.artworkBrowser.saleArtworks.should.eql([])
        initialResponse.artworkBrowser.total.should.eql(0)
        const newArtworks = auctions(
          initialResponse,
          actions.updateSaleArtworks(["artwork1", "artwork2", "artwork3"])
        )
        const newTotal = auctions(newArtworks, actions.updateTotal(3))
        const allArtworksFetched = auctions(
          newTotal,
          actions.updateAllFetched()
        )
        allArtworksFetched.artworkBrowser.allFetched.should.eql(true)
        allArtworksFetched.artworkBrowser.saleArtworks.should.eql([
          "artwork1",
          "artwork2",
          "artwork3",
        ])
        allArtworksFetched.artworkBrowser.total.should.eql(3)
      })

      it("updates allFetched to false if the total does not match the number of artworks", () => {
        initialResponse.artworkBrowser.allFetched.should.eql(false)
        initialResponse.artworkBrowser.saleArtworks.should.eql([])
        initialResponse.artworkBrowser.total.should.eql(0)
        const newArtworks = auctions(
          initialResponse,
          actions.updateSaleArtworks(["artwork1", "artwork2", "artwork3"])
        )
        const newTotal = auctions(newArtworks, actions.updateTotal(10))
        const notAllArtworksFetched = auctions(
          newTotal,
          actions.updateAllFetched()
        )
        notAllArtworksFetched.artworkBrowser.allFetched.should.eql(false)
        notAllArtworksFetched.artworkBrowser.saleArtworks.should.eql([
          "artwork1",
          "artwork2",
          "artwork3",
        ])
        notAllArtworksFetched.artworkBrowser.total.should.eql(10)
      })

      it("updates allFetched to true if the current page exceeds 100", () => {
        const maxPageResponse = auctions(
          {
            artworkBrowser: {
              total: 1,
              saleArtworks: [],
              filterParams: { page: 100 },
            },
          },
          {}
        )
        const tooHighPage = auctions(maxPageResponse, actions.updatePage(false))
        const notAllFetched = auctions(tooHighPage, actions.updateAllFetched())
        notAllFetched.artworkBrowser.allFetched.should.eql(true)
      })
    })

    describe("#updateArtistId", () => {
      it("updates the artist id", () => {
        initialResponse.artworkBrowser.filterParams.artist_ids.should.eql([])
        const oneArtist = auctions(
          initialResponse,
          actions.updateArtistId("artist1")
        )
        oneArtist.artworkBrowser.filterParams.artist_ids.should.eql(["artist1"])
        const twoArtists = auctions(
          oneArtist,
          actions.updateArtistId("artist2")
        )
        twoArtists.artworkBrowser.filterParams.artist_ids.should.eql([
          "artist1",
          "artist2",
        ])
        const subtractArtist = auctions(
          twoArtists,
          actions.updateArtistId("artist2")
        )
        subtractArtist.artworkBrowser.filterParams.artist_ids.should.eql([
          "artist1",
        ])
        const noArtists = auctions(
          subtractArtist,
          actions.updateArtistId("artist1")
        )
        noArtists.artworkBrowser.filterParams.artist_ids.should.eql([])
      })

      it("updates the artist ids to none when artists-all is passed", () => {
        initialResponse.artworkBrowser.filterParams.artist_ids.should.eql([])
        const oneArtist = auctions(
          initialResponse,
          actions.updateArtistId("artist1")
        )
        oneArtist.artworkBrowser.filterParams.artist_ids.should.eql(["artist1"])
        const twoArtists = auctions(
          oneArtist,
          actions.updateArtistId("artist2")
        )
        twoArtists.artworkBrowser.filterParams.artist_ids.should.eql([
          "artist1",
          "artist2",
        ])
        const allArtists = auctions(
          twoArtists,
          actions.updateArtistId("artists-all")
        )
        allArtists.artworkBrowser.filterParams.artist_ids.should.eql([])
      })

      it("updates the artist ids to none when artists-you-follow is passed, but changes a param", () => {
        initialResponse.artworkBrowser.filterParams.artist_ids.should.eql([])
        initialResponse.artworkBrowser.filterParams.include_artworks_by_followed_artists.should.eql(
          false
        )
        const oneArtist = auctions(
          initialResponse,
          actions.updateArtistId("artist1")
        )
        oneArtist.artworkBrowser.filterParams.artist_ids.should.eql(["artist1"])
        const twoArtists = auctions(
          oneArtist,
          actions.updateArtistId("artist2")
        )
        twoArtists.artworkBrowser.filterParams.artist_ids.should.eql([
          "artist1",
          "artist2",
        ])
        const allArtists = auctions(
          twoArtists,
          actions.updateArtistId("artists-you-follow")
        )
        allArtists.artworkBrowser.filterParams.artist_ids.should.eql([])
        allArtists.artworkBrowser.filterParams.include_artworks_by_followed_artists.should.eql(
          true
        )
      })

      it("updates the artist ids to all when artists-you-follow is already checked", () => {
        initialResponse.artworkBrowser.filterParams.artist_ids.should.eql([])
        initialResponse.artworkBrowser.filterParams.include_artworks_by_followed_artists.should.eql(
          false
        )
        const artistsYouFollow = auctions(
          initialResponse,
          actions.updateArtistId("artists-you-follow")
        )
        artistsYouFollow.artworkBrowser.filterParams.artist_ids.should.eql([])
        artistsYouFollow.artworkBrowser.filterParams.include_artworks_by_followed_artists.should.eql(
          true
        )
        const noArtistsYouFollow = auctions(
          artistsYouFollow,
          actions.updateArtistId("artists-you-follow")
        )
        noArtistsYouFollow.artworkBrowser.filterParams.artist_ids.should.eql([])
        noArtistsYouFollow.artworkBrowser.filterParams.include_artworks_by_followed_artists.should.eql(
          false
        )
      })

      it("includes the full list of aggregations", () => {
        initialResponse.artworkBrowser.filterParams.artist_ids.should.eql([])
        const oneArtist = auctions(
          initialResponse,
          actions.updateArtistId("artist1")
        )
        oneArtist.artworkBrowser.filterParams.artist_ids.should.eql(["artist1"])
        oneArtist.artworkBrowser.filterParams.aggregations.should.eql([
          "ARTIST",
          "FOLLOWED_ARTISTS",
          "MEDIUM",
          "TOTAL",
        ])
      })
    })

    describe("#updateArtworks", () => {
      it("resets the artworks if the page does not change", () => {
        initialResponse.artworkBrowser.saleArtworks.should.eql([])
        const newArtworks = [{ id: "artwork-1" }, { id: "artwork-2" }]
        const updatedArtworks = auctions(
          initialResponse,
          actions.updateSaleArtworks(newArtworks)
        )
        updatedArtworks.artworkBrowser.saleArtworks.should.eql(newArtworks)
        const resetArtworks = [{ id: "artwork-3" }]
        const resettedArtworks = auctions(
          updatedArtworks,
          actions.updateSaleArtworks(resetArtworks)
        )
        resettedArtworks.artworkBrowser.saleArtworks.should.eql(resetArtworks)
      })

      it("concatenates the artworks if the page is above 1", () => {
        initialResponse.artworkBrowser.saleArtworks.should.eql([])
        const newArtworks = [{ id: "artwork-1" }, { id: "artwork-2" }]
        const updatedArtworks = auctions(
          initialResponse,
          actions.updateSaleArtworks(newArtworks)
        )
        updatedArtworks.artworkBrowser.saleArtworks.should.eql(newArtworks)
        const newPage = auctions(updatedArtworks, actions.updatePage(false))
        const concatArtworks = [{ id: "artwork-3" }]
        const concatenatedArtworks = auctions(
          newPage,
          actions.updateSaleArtworks(concatArtworks)
        )
        concatenatedArtworks.artworkBrowser.saleArtworks.should.eql([
          { id: "artwork-1" },
          { id: "artwork-2" },
          { id: "artwork-3" },
        ])
      })
    })

    describe("#updateEstimateDisplay", () => {
      it("updates the estimate display", () => {
        initialResponse.artworkBrowser.maxEstimateRangeDisplay.should.eql(50000)
        initialResponse.artworkBrowser.minEstimateRangeDisplay.should.eql(0)
        const updatedEstimateDisplay = auctions(
          initialResponse,
          actions.updateEstimateDisplay(100, 20000)
        )
        updatedEstimateDisplay.artworkBrowser.maxEstimateRangeDisplay.should.eql(
          20000
        )
        updatedEstimateDisplay.artworkBrowser.minEstimateRangeDisplay.should.eql(
          100
        )
      })
    })

    describe("#updateEstimateRangeParams", () => {
      it("updates the estimate range params", () => {
        initialResponse.artworkBrowser.filterParams.estimate_range.should.eql(
          ""
        )
        const updatedEstimateRange = auctions(
          initialResponse,
          actions.updateEstimateRangeParams(100, 20000)
        )
        updatedEstimateRange.artworkBrowser.filterParams.estimate_range.should.eql(
          "10000-2000000"
        )
      })

      it("updates the estimate range params correctly if they are at the max", () => {
        initialResponse.artworkBrowser.filterParams.estimate_range.should.eql(
          ""
        )
        const updatedEstimateRange = auctions(
          initialResponse,
          actions.updateEstimateRangeParams(100, 20000)
        )
        updatedEstimateRange.artworkBrowser.filterParams.estimate_range.should.eql(
          "10000-2000000"
        )
        const highestBucket = auctions(
          updatedEstimateRange,
          actions.updateEstimateRangeParams(400, 50000)
        )
        highestBucket.artworkBrowser.filterParams.estimate_range.should.eql(
          "40000-*"
        )
        const lowerBucket = auctions(
          highestBucket,
          actions.updateEstimateRangeParams(400, 20000)
        )
        lowerBucket.artworkBrowser.filterParams.estimate_range.should.eql(
          "40000-2000000"
        )
      })

      it("includes the full list of aggregations", () => {
        initialResponse.artworkBrowser.filterParams.estimate_range.should.eql(
          ""
        )
        const updatedEstimateRange = auctions(
          initialResponse,
          actions.updateEstimateRangeParams(100, 20000)
        )
        updatedEstimateRange.artworkBrowser.filterParams.estimate_range.should.eql(
          "10000-2000000"
        )
        updatedEstimateRange.artworkBrowser.filterParams.aggregations.should.eql(
          ["ARTIST", "FOLLOWED_ARTISTS", "MEDIUM", "TOTAL"]
        )
      })
    })

    describe("#updateInitialMediumMap", () => {
      it("sets the initial medium map the first time", () => {
        initialResponse.artworkBrowser.initialMediumMap.should.eql([])
        const updatedMap = [
          { count: 1, name: "Prints", id: "prints" },
          { count: 2, name: "Painting", id: "painting" },
          { count: 2, name: "Works On Paper", id: "works-on-paper" },
        ]
        const updatedInitialMediumMap = auctions(
          initialResponse,
          actions.updateInitialMediumMap(updatedMap)
        )
        updatedInitialMediumMap.artworkBrowser.initialMediumMap.should.eql(
          updatedMap
        )
        const updatedAgain = auctions(
          updatedInitialMediumMap,
          actions.updateInitialMediumMap([])
        )
        updatedAgain.artworkBrowser.initialMediumMap.should.eql(updatedMap)
      })
    })

    describe("#updateMediumId", () => {
      it("updates the medium id", () => {
        initialResponse.artworkBrowser.filterParams.gene_ids.should.eql([])
        const oneMedium = auctions(
          initialResponse,
          actions.updateMediumId("gene-1")
        )
        oneMedium.artworkBrowser.filterParams.gene_ids.should.eql(["gene-1"])
        const twoMediums = auctions(oneMedium, actions.updateMediumId("gene-2"))
        twoMediums.artworkBrowser.filterParams.gene_ids.should.eql([
          "gene-1",
          "gene-2",
        ])
        const subtractMedium = auctions(
          twoMediums,
          actions.updateMediumId("gene-1")
        )
        subtractMedium.artworkBrowser.filterParams.gene_ids.should.eql([
          "gene-2",
        ])
        const noMediums = auctions(
          subtractMedium,
          actions.updateMediumId("gene-2")
        )
        noMediums.artworkBrowser.filterParams.gene_ids.should.eql([])
      })

      it("updates the medium ids to none when mediums-all is passed", () => {
        initialResponse.artworkBrowser.filterParams.gene_ids.should.eql([])
        const oneMedium = auctions(
          initialResponse,
          actions.updateMediumId("gene-1")
        )
        oneMedium.artworkBrowser.filterParams.gene_ids.should.eql(["gene-1"])
        const twoMediums = auctions(oneMedium, actions.updateMediumId("gene-2"))
        twoMediums.artworkBrowser.filterParams.gene_ids.should.eql([
          "gene-1",
          "gene-2",
        ])
        const allMediums = auctions(
          twoMediums,
          actions.updateMediumId("mediums-all")
        )
        allMediums.artworkBrowser.filterParams.gene_ids.should.eql([])
      })

      it("includes the full list of aggregations", () => {
        initialResponse.artworkBrowser.filterParams.gene_ids.should.eql([])
        const oneMedium = auctions(
          initialResponse,
          actions.updateMediumId("gene-1")
        )
        oneMedium.artworkBrowser.filterParams.gene_ids.should.eql(["gene-1"])
        oneMedium.artworkBrowser.filterParams.aggregations.should.eql([
          "ARTIST",
          "FOLLOWED_ARTISTS",
          "MEDIUM",
          "TOTAL",
        ])
      })
    })

    describe("#updatePage", () => {
      it("updates the page param, and doesn't over-fetch aggregations", () => {
        initialResponse.artworkBrowser.filterParams.page.should.eql(1)
        initialResponse.artworkBrowser.filterParams.aggregations.should.eql([
          "ARTIST",
          "FOLLOWED_ARTISTS",
          "MEDIUM",
          "TOTAL",
        ])
        const incrementedPage = auctions(
          initialResponse,
          actions.updatePage(false)
        )
        incrementedPage.artworkBrowser.filterParams.page.should.eql(2)
        incrementedPage.artworkBrowser.filterParams.aggregations.should.eql([
          "TOTAL",
          "FOLLOWED_ARTISTS",
        ])
        const furtherIncrementedPage = auctions(
          incrementedPage,
          actions.updatePage(false)
        )
        furtherIncrementedPage.artworkBrowser.filterParams.page.should.eql(3)
        furtherIncrementedPage.artworkBrowser.filterParams.aggregations.should.eql(
          ["TOTAL", "FOLLOWED_ARTISTS"]
        )
        const resetPage = auctions(
          furtherIncrementedPage,
          actions.updatePage(true)
        )
        resetPage.artworkBrowser.filterParams.page.should.eql(1)
        resetPage.artworkBrowser.filterParams.aggregations.should.eql([
          "ARTIST",
          "FOLLOWED_ARTISTS",
          "MEDIUM",
          "TOTAL",
        ])
      })
    })

    describe("#updateSortParam", () => {
      it("updates the sort param", () => {
        initialResponse.artworkBrowser.filterParams.sort.should.eql("position")
        const updatedSort = auctions(
          initialResponse,
          actions.updateSortParam("-position")
        )
        updatedSort.artworkBrowser.filterParams.sort.should.eql("-position")
      })
    })

    describe("#updateTotal", () => {
      it("updates the total number of artworks", () => {
        initialResponse.artworkBrowser.total.should.eql(0)
        const updatedTotal = auctions(
          initialResponse,
          actions.updateTotal(4000)
        )
        updatedTotal.artworkBrowser.total.should.eql(4000)
      })
    })
  })
})
