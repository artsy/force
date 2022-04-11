/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarCommercial2_Test_QueryVariables = {};
export type ArtworkSidebarCommercial2_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarCommercial_artwork">;
    } | null;
};
export type ArtworkSidebarCommercial2_Test_Query = {
    readonly response: ArtworkSidebarCommercial2_Test_QueryResponse;
    readonly variables: ArtworkSidebarCommercial2_Test_QueryVariables;
};



/*
query ArtworkSidebarCommercial2_Test_Query {
  artwork(id: "pretty-drawing-111") {
    ...ArtworkSidebarCommercial_artwork
    id
  }
}

fragment ArtworkSidebarCommercial_artwork on Artwork {
  edition_sets: editionSets {
    internalID
    id
    is_acquireable: isAcquireable
    is_offerable: isOfferable
    sale_message: saleMessage
    ...ArtworkSidebarSizeInfo_piece
  }
  internalID
  isOfferableFromInquiry
  isPriceHidden
  is_acquireable: isAcquireable
  is_for_sale: isForSale
  is_inquireable: isInquireable
  is_offerable: isOfferable
  is_sold: isSold
  listPrice {
    __typename
    ... on PriceRange {
      display
    }
    ... on Money {
      display
    }
  }
  priceIncludesTaxDisplay
  sale_message: saleMessage
  shippingInfo
  shippingOrigin
  slug
  ...ArtworkSidebarCreateAlertButton_artwork
}

fragment ArtworkSidebarCreateAlertButton_artwork on Artwork {
  slug
  internalID
  title
  artists {
    internalID
    name
    slug
    id
  }
  attributionClass {
    internalID
    id
  }
}

fragment ArtworkSidebarSizeInfo_piece on Sellable {
  __isSellable: __typename
  dimensions {
    in
    cm
  }
  edition_of: editionOf
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "pretty-drawing-111"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": "is_acquireable",
  "args": null,
  "kind": "ScalarField",
  "name": "isAcquireable",
  "storageKey": null
},
v4 = {
  "alias": "is_offerable",
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferable",
  "storageKey": null
},
v5 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSidebarCommercial2_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarCommercial_artwork"
          }
        ],
        "storageKey": "artwork(id:\"pretty-drawing-111\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebarCommercial2_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": "edition_sets",
            "args": null,
            "concreteType": "EditionSet",
            "kind": "LinkedField",
            "name": "editionSets",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "dimensions",
                    "kind": "LinkedField",
                    "name": "dimensions",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "in",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cm",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": "edition_of",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "editionOf",
                    "storageKey": null
                  }
                ],
                "type": "Sellable",
                "abstractKey": "__isSellable"
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isOfferableFromInquiry",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isPriceHidden",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": "is_for_sale",
            "args": null,
            "kind": "ScalarField",
            "name": "isForSale",
            "storageKey": null
          },
          {
            "alias": "is_inquireable",
            "args": null,
            "kind": "ScalarField",
            "name": "isInquireable",
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "alias": "is_sold",
            "args": null,
            "kind": "ScalarField",
            "name": "isSold",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "listPrice",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v6/*: any*/),
                "type": "PriceRange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v6/*: any*/),
                "type": "Money",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceIncludesTaxDisplay",
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shippingInfo",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shippingOrigin",
            "storageKey": null
          },
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v7/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"pretty-drawing-111\")"
      }
    ]
  },
  "params": {
    "cacheID": "8444bba3e8d153bd332c8d2058934969",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.id": (v8/*: any*/),
        "artwork.artists.internalID": (v8/*: any*/),
        "artwork.artists.name": (v9/*: any*/),
        "artwork.artists.slug": (v8/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v8/*: any*/),
        "artwork.attributionClass.internalID": (v8/*: any*/),
        "artwork.edition_sets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "artwork.edition_sets.__isSellable": (v10/*: any*/),
        "artwork.edition_sets.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "artwork.edition_sets.dimensions.cm": (v9/*: any*/),
        "artwork.edition_sets.dimensions.in": (v9/*: any*/),
        "artwork.edition_sets.edition_of": (v9/*: any*/),
        "artwork.edition_sets.id": (v8/*: any*/),
        "artwork.edition_sets.internalID": (v8/*: any*/),
        "artwork.edition_sets.is_acquireable": (v11/*: any*/),
        "artwork.edition_sets.is_offerable": (v11/*: any*/),
        "artwork.edition_sets.sale_message": (v9/*: any*/),
        "artwork.id": (v8/*: any*/),
        "artwork.internalID": (v8/*: any*/),
        "artwork.isOfferableFromInquiry": (v11/*: any*/),
        "artwork.isPriceHidden": (v11/*: any*/),
        "artwork.is_acquireable": (v11/*: any*/),
        "artwork.is_for_sale": (v11/*: any*/),
        "artwork.is_inquireable": (v11/*: any*/),
        "artwork.is_offerable": (v11/*: any*/),
        "artwork.is_sold": (v11/*: any*/),
        "artwork.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "artwork.listPrice.__typename": (v10/*: any*/),
        "artwork.listPrice.display": (v9/*: any*/),
        "artwork.priceIncludesTaxDisplay": (v9/*: any*/),
        "artwork.sale_message": (v9/*: any*/),
        "artwork.shippingInfo": (v9/*: any*/),
        "artwork.shippingOrigin": (v9/*: any*/),
        "artwork.slug": (v8/*: any*/),
        "artwork.title": (v9/*: any*/)
      }
    },
    "name": "ArtworkSidebarCommercial2_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebarCommercial2_Test_Query {\n  artwork(id: \"pretty-drawing-111\") {\n    ...ArtworkSidebarCommercial_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarCommercial_artwork on Artwork {\n  edition_sets: editionSets {\n    internalID\n    id\n    is_acquireable: isAcquireable\n    is_offerable: isOfferable\n    sale_message: saleMessage\n    ...ArtworkSidebarSizeInfo_piece\n  }\n  internalID\n  isOfferableFromInquiry\n  isPriceHidden\n  is_acquireable: isAcquireable\n  is_for_sale: isForSale\n  is_inquireable: isInquireable\n  is_offerable: isOfferable\n  is_sold: isSold\n  listPrice {\n    __typename\n    ... on PriceRange {\n      display\n    }\n    ... on Money {\n      display\n    }\n  }\n  priceIncludesTaxDisplay\n  sale_message: saleMessage\n  shippingInfo\n  shippingOrigin\n  slug\n  ...ArtworkSidebarCreateAlertButton_artwork\n}\n\nfragment ArtworkSidebarCreateAlertButton_artwork on Artwork {\n  slug\n  internalID\n  title\n  artists {\n    internalID\n    name\n    slug\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n}\n\nfragment ArtworkSidebarSizeInfo_piece on Sellable {\n  __isSellable: __typename\n  dimensions {\n    in\n    cm\n  }\n  edition_of: editionOf\n}\n"
  }
};
})();
(node as any).hash = 'fbc9dc27695ae4adce44a3e0ded3d53e';
export default node;
