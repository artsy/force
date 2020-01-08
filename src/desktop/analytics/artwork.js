import { data as sd } from "sharify"
;(function() {
  ;("use strict")

  // DOM events
  var $document = $(document)
  $document
    .on("click", ".analytics-artwork-show-phone-number", function() {
      analytics.track(
        "Clicked 'Show phone number'",
        _.omit($(this).data(), "partner")
      )
    })
    .on("click", ".analytics-artwork-download", function() {
      analytics.track("Downloaded lo-res image")
    })
    .on("click", ".analytics-artwork-share", function() {
      analytics.track("Viewed sharing_is_caring form")
    })
    .on("click", ".analytics-artwork-zoom", function() {
      analytics.track("Clicked to zoom in on artwork")
    })
    .on("click", ".analytics-artwork-view-in-room", function() {
      analytics.track("Entered 'View In Room'")
    })
    .on("click", ".analytics-artwork-acquire", function() {
      analytics.track('Clicked "Buy" on the artwork page')
    })
    .on("click", ".analytics-artwork-partner-link", function() {
      analytics.track("Clicked partner name link in detail sidebar")
    })
    .on("click", ".analytics-artwork-contact-seller", function() {
      var context = $(this).data()
      analytics.track('Clicked "Contact Gallery"', {
        artwork_id: context.artwork_id,
        context_type: context.context_type,
      })
    })
    .on("click", ".artwork-auction__live-button a", function() {
      analytics.track("click", {
        type: "button",
        label: $(this).text(),
        flow: "artworks",
        context_module: "artwork metadata",
        destination_path: $(this)
          .attr("href")
          .replace(sd.PREDICTION_URL, ""),
      })
    })

    // Other works by artist
    .on(
      "click",
      ".artwork-artist-artworks a.artwork-artist-artworks__header__jump",
      function() {
        analytics.track("Click", {
          flow: "Artwork suggested inventory rails",
          type: "Link",
          label: "View all",
          context_module: "Other works by artist",
          destination_path: $(this).attr("href"),
        })
      }
    )
    .on(
      "click",
      ".artwork-artist-artworks .artwork-section__jump a",
      function() {
        analytics.track("Click", {
          flow: "Artwork suggested inventory rails",
          type: "Link",
          label: "View all bottom link",
          context_module: "Other works by artist",
          destination_path: $(this).attr("href"),
        })
      }
    )
    .on(
      "click",
      ".artwork-artist-artworks .artwork-brick .artwork-brick__image a",
      function() {
        console.log("Click Artwork suggested inventory artwork brick")
        analytics.track("Click", {
          flow: "Artwork suggested inventory rails",
          type: "Artwork brick",
          context_module: "Other works by artist",
          destination_path: $(this).attr("href"),
        })
      }
    )

    // Other works from show
    .on(
      "click",
      ".artwork-show-artworks a.artwork-show-artworks__header__jump",
      function() {
        analytics.track("Click", {
          flow: "Artwork suggested inventory rails",
          type: "Link",
          label: "View all",
          context_module: "Other works from show",
          destination_path: $(this).attr("href"),
        })
      }
    )
    .on("click", ".artwork-show-artworks .artwork-section__jump a", function() {
      analytics.track("Click", {
        flow: "Artwork suggested inventory rails",
        type: "Link",
        label: "View all bottom link",
        context_module: "Other works from show",
        destination_path: $(this).attr("href"),
      })
    })
    .on(
      "click",
      ".artwork-show-artworks .artwork-brick .artwork-brick__image a",
      function() {
        analytics.track("Click", {
          flow: "Artwork suggested inventory rails",
          type: "Artwork brick",
          context_module: "Other works from show",
          destination_path: $(this).attr("href"),
        })
      }
    )

    // Other works from gallery
    .on(
      "click",
      ".artwork-partner-artworks a.artwork-partner-artworks__header__jump",
      function() {
        analytics.track("Click", {
          flow: "Artwork suggested inventory rails",
          type: "Link",
          label: "View all",
          context_module: "Other works from gallery",
          destination_path: $(this).attr("href"),
        })
      }
    )
    .on(
      "click",
      ".artwork-partner-artworks .artwork-section__jump a",
      function() {
        analytics.track("Click", {
          flow: "Artwork suggested inventory rails",
          type: "Link",
          label: "View all bottom link",
          context_module: "Other works from gallery",
          destination_path: $(this).attr("href"),
        })
      }
    )
    .on(
      "click",
      ".artwork-partner-artworks .artwork-brick .artwork-brick__image a",
      function() {
        analytics.track("Click", {
          flow: "Artwork suggested inventory rails",
          type: "Artwork brick",
          context_module: "Other works from gallery",
          destination_path: $(this).attr("href"),
        })
      }
    )

    // Other works in auction
    .on(
      "click",
      ".artwork-auction-artworks a.artwork-auction-artworks__header__jump",
      function() {
        analytics.track("Click", {
          flow: "Artwork suggested inventory rails",
          type: "Link",
          label: "View all",
          context_module: "Other works in auction",
          destination_path: $(this).attr("href"),
        })
      }
    )
    .on(
      "click",
      ".artwork-auction-artworks .artwork-section__jump a",
      function() {
        analytics.track("Click", {
          flow: "Artwork suggested inventory rails",
          type: "Link",
          label: "View all bottom link",
          context_module: "Other works in auction",
          destination_path: $(this).attr("href"),
        })
      }
    )
    .on(
      "click",
      ".artwork-auction-artworks .artwork-brick .artwork-brick__image a",
      function() {
        analytics.track("Click", {
          flow: "Artwork suggested inventory rails",
          type: "Artwork brick",
          context_module: "Other works in auction",
          destination_path: $(this).attr("href"),
        })
      }
    )

    // Artwork related works
    .on("click", ".artwork-related-artworks__tabs__nav a", function() {
      analytics.track("Click", {
        flow: "Artwork related works",
        type: "Tab",
        label: $(this).data("id") === "main" ? "Most similar" : "Gene",
        context_module: "Left tabs",
        destination_path: $(this).data("id"),
      })
    })
    .on(
      "click",
      ".artwork-related-artworks__tabs .side-tabs__content .artwork-tab .artwork-brick .artwork-brick__image a",
      function() {
        analytics.track("Click", {
          flow: "Artwork related works",
          type: "Artwork brick",
          context_module:
            $(this)
              .closest(".artwork-related-artworks__tabs")
              .find(
                ".artwork-related-artworks__tabs__nav a[data-state='active']"
              )
              .data("id") === "main"
              ? "Most similar"
              : "Gene",
          destination_path: $(this).attr("href"),
        })
      }
    )

    // Artwork current auctions on artsy
    .on(
      "click",
      ".artwork-current-auctions .artwork-current-auctions__header-area a",
      function() {
        analytics.track("Click", {
          flow: "Artwork current auctions on artsy",
          type: "Link",
          label: "View all",
          destination_path: $(this).attr("href"),
        })
      }
    )
    .on(
      "click",
      ".artwork-current-auctions .artwork-current-auctions__sales .auction-block a",
      function() {
        analytics.track("Click", {
          flow: "Artwork current auctions on artsy",
          type: "Sale brick",
          destination_path: $(this).attr("href"),
        })
      }
    )

    // Artwork context banner
    .on(
      "click",
      ".artwork-banner[data-type='ArtworkContextAuction'] .artwork-banner__jump a",
      function() {
        analytics.track("Click", {
          flow: "Artwork context banner",
          context_module: "Auction",
          type: "Link",
          label: "Explore",
          destination_path: $(this).attr("href"),
        })
      }
    )
    .on(
      "click",
      ".artwork-banner[data-type='ArtworkContextPartnerShow'] .artwork-banner__jump a",
      function() {
        analytics.track("Click", {
          flow: "Artwork context banner",
          context_module: "Show",
          type: "Link",
          label: "Explore",
          destination_path: $(this).attr("href"),
        })
      }
    )
    .on(
      "click",
      ".artwork-banner[data-type='ArtworkContextFair'] .artwork-banner__jump a",
      function() {
        console.log("Fair clicked")
        analytics.track("Click", {
          flow: "Artwork context banner",
          context_module: "Fair",
          type: "Link",
          label: "Explore",
          destination_path: $(this).attr("href"),
        })
      }
    )

    // Artwork related artists rail
    .on(
      "click",
      ".artwork-artist-related-rail .artwork-artist-related-rail__header a",
      function() {
        analytics.track("Click", {
          flow: "Artwork related artists rail",
          type: "Link",
          label: "View all",
          destination_path: $(this).attr("href"),
        })
      }
    )
    .on(
      "click",
      ".artwork-artist-related-rail .artwork-artist-related-rail__content .artist-cell-item a.artist-rail-cell__link",
      function() {
        analytics.track("Click", {
          flow: "Artwork related artists rail",
          type: "Artist card",
          destination_path: $(this).attr("href"),
        })
      }
    )
    .on(
      "click",
      ".artwork-artist-related-rail .artwork-artist-related-rail__content .artist-cell-item a.artist-cell-item__follow-button",
      function() {
        analytics.track("Click", {
          flow: "Artwork related artists rail",
          type: "Button",
          label: "Follow",
          destination_path: $(this).attr("href"),
        })
      }
    )

    // Artwork about the work
    .on(
      "click",
      ".artwork-additional-info .side-tabs__nav a.side-tabs__nav__link",
      function() {
        analytics.track("Click", {
          flow: "Artwork about the work",
          context_module: "Left tabs",
          type: "Tab",
          label: $(this).data("id"),
        })
      }
    )

    // Artwork about the artist
    .on(
      "click",
      ".artwork-artist .side-tabs__nav a.side-tabs__nav__link",
      function() {
        analytics.track("Click", {
          flow: "Artwork about the artist",
          context_module: "Left tabs",
          type: "Tab",
          label: $(this).data("id"),
        })
      }
    )
    .on(
      "click",
      ".artwork-artist .side-tabs__content .side-tab[data-id='biography']",
      function() {
        analytics.track("Click", {
          flow: "Artwork about the artist",
          context_module: "Biography",
          type: "Button",
          label: "Read more",
        })
      }
    )
    .on(
      "click",
      ".artwork-artist .side-tabs__content .side-tab[data-id='articles'] a.artwork-artist__content__article",
      function() {
        analytics.track("Click", {
          flow: "Artwork about the artist",
          context_module: "Articles",
          type: "Link",
          label: "Article",
          destination_path: $(this).attr("href"),
        })
      }
    )
    .on(
      "click",
      ".artwork-artist .side-tabs__content .side-tab[data-id='articles'] a.artwork-artist__content__article-link",
      function() {
        analytics.track("Click", {
          flow: "Artwork about the artist",
          context_module: "Articles",
          type: "Link",
          label: "See all",
          destination_path: $(this).attr("href"),
        })
      }
    )
    .on(
      "click",
      ".artwork-artist .side-tabs__content .artwork-section__jump a",
      function() {
        analytics.track("Click", {
          flow: "Artwork about the artist",
          context_module: "Artist link",
          type: "Link",
          destination_path: $(this).attr("href"),
        })
      }
    )

    // Artist link
    .on("click", ".artwork-metadata__artist a", function() {
      analytics.track("Click", {
        flow: "Artist link",
        type: "Link",
        destination_path: $(this).attr("href"),
      })
    })
    // Artwork classification info
    .on(
      "click",
      ".artwork-metadata__attribution-class-container a",
      function() {
        analytics.track("Click", {
          flow: "Classification info",
          type: "Link",
          destination_path: $(this).attr("href"),
        })
      }
    )
    // Seller link
    .on(
      "click",
      ".artwork-partner-stub a.artwork-partner-stub__name",
      function() {
        analytics.track("Click", {
          flow: "Seller link",
          type: "Link",
          destination_path: $(this).attr("href"),
        })
      }
    )

    // Seller info block
    .on("click", ".artwork-partner .artwork-partner__icon a", function() {
      analytics.track("Click", {
        flow: "Seller info block",
        context_module: "Thumbnail",
        type: "Link",
        destination_path: $(this).attr("href"),
      })
    })
    .on(
      "click",
      ".artwork-partner .artwork-partner__metadata a.artwork-partner__metadata__name",
      function() {
        analytics.track("Click", {
          flow: "Seller info block",
          context_module: "Gallery name",
          type: "Link",
          destination_path: $(this).attr("href"),
        })
      }
    )
    .on(
      "click",
      ".artwork-partner .artwork-partner__metadata__actions a.analytics-artwork-contact-seller",
      function() {
        analytics.track("Click", {
          flow: "Seller info block",
          context_module: "Contact gallery",
          type: "Button",
        })
      }
    )
    .on(
      "click",
      ".artwork-partner .artwork-partner__metadata__actions a.follow-button",
      function() {
        analytics.track("Click", {
          flow: "Seller info block",
          context_module: "Follow",
          type: "Button",
        })
      }
    )

    // Artwork share
    .on("click", ".artwork-actions .analytics-artwork-share", function() {
      analytics.track("Click", {
        flow: "Artwork share",
        context_module: "Share button",
        type: "Button",
      })
    })
    .on("click", ".share-menu .share-menu__options__buttons a", function() {
      analytics.track("Click", {
        flow: "Artwork share",
        context_module: $(this).data("service"),
        type: "Link",
        destination_path: $(this).attr("href"),
      })
    })

  analyticsHooks
    .on("artwork:contact-gallery", function(context) {
      analytics.track("Clicked 'Contact Gallery'", {
        artwork_id: context.artwork_id,
        context_type: context.context_type,
      })
    })
    .on("artwork:contact-specialist", function() {
      analytics.track("Clicked 'Contact Artsy Specialist'")
    })
})()
