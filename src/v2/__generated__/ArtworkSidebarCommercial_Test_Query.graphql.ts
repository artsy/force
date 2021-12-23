/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarCommercial_Test_QueryVariables = {};
export type ArtworkSidebarCommercial_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarCommercial_artwork">;
    } | null;
};
export type ArtworkSidebarCommercial_Test_QueryRawResponse = {
    readonly artwork: ({
        readonly edition_sets: ReadonlyArray<({
            readonly internalID: string;
            readonly id: string;
            readonly is_acquireable: boolean | null;
            readonly is_offerable: boolean | null;
            readonly sale_message: string | null;
            readonly dimensions: ({
                readonly in: string | null;
                readonly cm: string | null;
            }) | null;
            readonly edition_of: string | null;
        }) | null> | null;
        readonly internalID: string;
        readonly isOfferableFromInquiry: boolean | null;
        readonly isPriceHidden: boolean | null;
        readonly is_acquireable: boolean | null;
        readonly is_for_sale: boolean | null;
        readonly is_inquireable: boolean | null;
        readonly is_offerable: boolean | null;
        readonly listPrice: ({
            readonly __typename: "PriceRange";
            readonly display: string | null;
        } | {
            readonly __typename: "Money";
            readonly display: string | null;
        } | {
            readonly __typename: string | null;
        }) | null;
        readonly priceIncludesTaxDisplay: string | null;
        readonly sale_message: string | null;
        readonly shippingInfo: string | null;
        readonly shippingOrigin: string | null;
        readonly slug: string;
        readonly id: string | null;
    }) | null;
};
export type ArtworkSidebarCommercial_Test_Query = {
    readonly response: ArtworkSidebarCommercial_Test_QueryResponse;
    readonly variables: ArtworkSidebarCommercial_Test_QueryVariables;
    readonly rawResponse: ArtworkSidebarCommercial_Test_QueryRawResponse;
};



/*
query ArtworkSidebarCommercial_Test_Query {
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
}

fragment ArtworkSidebarSizeInfo_piece on Sellable {
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSidebarCommercial_Test_Query",
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
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebarCommercial_Test_Query",
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
                "type": "PriceRange"
              },
              {
                "kind": "InlineFragment",
                "selections": (v6/*: any*/),
                "type": "Money"
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"pretty-drawing-111\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ArtworkSidebarCommercial_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebarCommercial_Test_Query {\n  artwork(id: \"pretty-drawing-111\") {\n    ...ArtworkSidebarCommercial_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarCommercial_artwork on Artwork {\n  edition_sets: editionSets {\n    internalID\n    id\n    is_acquireable: isAcquireable\n    is_offerable: isOfferable\n    sale_message: saleMessage\n    ...ArtworkSidebarSizeInfo_piece\n  }\n  internalID\n  isOfferableFromInquiry\n  isPriceHidden\n  is_acquireable: isAcquireable\n  is_for_sale: isForSale\n  is_inquireable: isInquireable\n  is_offerable: isOfferable\n  listPrice {\n    __typename\n    ... on PriceRange {\n      display\n    }\n    ... on Money {\n      display\n    }\n  }\n  priceIncludesTaxDisplay\n  sale_message: saleMessage\n  shippingInfo\n  shippingOrigin\n  slug\n}\n\nfragment ArtworkSidebarSizeInfo_piece on Sellable {\n  dimensions {\n    in\n    cm\n  }\n  edition_of: editionOf\n}\n"
  }
};
})();
(node as any).hash = 'b24085c44331ebe40dbd355882e53ac1';
export default node;
