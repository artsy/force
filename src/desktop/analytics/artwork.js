import { data as sd } from "sharify"
;(function() {
  ;("use strict")

  // DOM events
  var $document = $(document)
  $document

    .on("click", ".analytics-artwork-contact-seller", function() {
      var context = $(this).data()
      analytics.track('Clicked "Contact Gallery"', {
        artwork_id: context.artwork_id,
        context_type: context.context_type,
      })
    })

    // Other works by artist
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
      ".artwork-current-auctions .artwork-current-auctions__sales .auction-block a",
      function() {
        analytics.track("Click", {
          flow: "Artwork current auctions on artsy",
          type: "Sale brick",
          destination_path: $(this).attr("href"),
        })
      }
    )

    // Artwork related artists rail
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

    // Artwork about the artist
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

})()
