/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkMetaTestQueryVariables = {};
export type ArtworkMetaTestQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkMeta_artwork">;
    } | null;
};
export type ArtworkMetaTestQueryRawResponse = {
    readonly artwork: ({
        readonly href: string | null;
        readonly internalID: string;
        readonly date: string | null;
        readonly artist_names: string | null;
        readonly sale_message: string | null;
        readonly partner: ({
            readonly name: string | null;
            readonly id: string | null;
            readonly type: string | null;
            readonly profile: ({
                readonly image: ({
                    readonly resized: ({
                        readonly url: string | null;
                    }) | null;
                }) | null;
                readonly id: string | null;
            }) | null;
        }) | null;
        readonly image_rights: string | null;
        readonly is_in_auction: boolean | null;
        readonly is_acquireable: boolean | null;
        readonly is_shareable: boolean | null;
        readonly unlisted: boolean | null;
        readonly meta_image: ({
            readonly resized: ({
                readonly width: number | null;
                readonly height: number | null;
                readonly url: string | null;
            }) | null;
        }) | null;
        readonly meta: ({
            readonly title: string | null;
            readonly description: string | null;
            readonly long_description: string | null;
        }) | null;
        readonly context: ({
            readonly __typename: "Fair";
            readonly id: string | null;
            readonly slug: string;
            readonly name: string | null;
        } | {
            readonly __typename: string;
            readonly id: string | null;
        }) | null;
        readonly is_price_hidden: boolean | null;
        readonly is_price_range: boolean | null;
        readonly listPrice: ({
            readonly __typename: "PriceRange";
            readonly minPrice: ({
                readonly major: number;
                readonly currencyCode: string;
            }) | null;
            readonly maxPrice: ({
                readonly major: number;
            }) | null;
        } | {
            readonly __typename: "Money";
            readonly major: number;
            readonly currencyCode: string;
        } | {
            readonly __typename: string;
        }) | null;
        readonly availability: string | null;
        readonly category: string | null;
        readonly dimensions: ({
            readonly in: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type ArtworkMetaTestQuery = {
    readonly response: ArtworkMetaTestQueryResponse;
    readonly variables: ArtworkMetaTestQueryVariables;
    readonly rawResponse: ArtworkMetaTestQueryRawResponse;
};



/*
query ArtworkMetaTestQuery {
  artwork(id: "opaque-artwork-id", includeUnlisted: true) {
    ...ArtworkMeta_artwork
    id
  }
}

fragment ArtworkMeta_artwork on Artwork {
  href
  internalID
  date
  artist_names: artistNames
  sale_message: saleMessage
  partner {
    name
    id
  }
  image_rights: imageRights
  is_in_auction: isInAuction
  is_acquireable: isAcquireable
  is_shareable: isShareable
  unlisted
  meta_image: image {
    resized(width: 640, height: 640, version: ["large", "medium", "tall"]) {
      width
      height
      url
    }
  }
  meta {
    title
    description(limit: 155)
    long_description: description(limit: 200)
  }
  context {
    __typename
    ... on Fair {
      slug
      name
    }
    ... on Node {
      id
    }
  }
  ...SeoDataForArtwork_artwork
}

fragment SeoDataForArtwork_artwork on Artwork {
  href
  date
  is_price_hidden: isPriceHidden
  is_price_range: isPriceRange
  listPrice {
    __typename
    ... on PriceRange {
      minPrice {
        major
        currencyCode
      }
      maxPrice {
        major
      }
    }
    ... on Money {
      major
      currencyCode
    }
  }
  meta_image: image {
    resized(width: 640, height: 640, version: ["large", "medium", "tall"]) {
      width
      height
      url
    }
  }
  meta {
    title
    description(limit: 155)
  }
  partner {
    name
    type
    profile {
      image {
        resized(width: 320, height: 320, version: ["medium"]) {
          url
        }
      }
      id
    }
    id
  }
  artist_names: artistNames
  availability
  category
  dimensions {
    in
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "opaque-artwork-id"
  },
  {
    "kind": "Literal",
    "name": "includeUnlisted",
    "value": true
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "major",
  "args": null,
  "storageKey": null
},
v6 = [
  (v5/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "currencyCode",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkMetaTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"opaque-artwork-id\",includeUnlisted:true)",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkMeta_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkMetaTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"opaque-artwork-id\",includeUnlisted:true)",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "href",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "internalID",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "date",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "artist_names",
            "name": "artistNames",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "sale_message",
            "name": "saleMessage",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": null,
            "args": null,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "type",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "profile",
                "storageKey": null,
                "args": null,
                "concreteType": "Profile",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "image",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Image",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "resized",
                        "storageKey": "resized(height:320,version:[\"medium\"],width:320)",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 320
                          },
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": [
                              "medium"
                            ]
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 320
                          }
                        ],
                        "concreteType": "ResizedImageUrl",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/)
                        ]
                      }
                    ]
                  },
                  (v2/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": "image_rights",
            "name": "imageRights",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "is_in_auction",
            "name": "isInAuction",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "is_acquireable",
            "name": "isAcquireable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "is_shareable",
            "name": "isShareable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "unlisted",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": "meta_image",
            "name": "image",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "resized",
                "storageKey": "resized(height:640,version:[\"large\",\"medium\",\"tall\"],width:640)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 640
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "large",
                      "medium",
                      "tall"
                    ]
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 640
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "width",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "height",
                    "args": null,
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "meta",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkMeta",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "title",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "description",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "limit",
                    "value": 155
                  }
                ],
                "storageKey": "description(limit:155)"
              },
              {
                "kind": "ScalarField",
                "alias": "long_description",
                "name": "description",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "limit",
                    "value": 200
                  }
                ],
                "storageKey": "description(limit:200)"
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "context",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "Fair",
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "slug",
                    "args": null,
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": "is_price_hidden",
            "name": "isPriceHidden",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "is_price_range",
            "name": "isPriceRange",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "listPrice",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "PriceRange",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "minPrice",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Money",
                    "plural": false,
                    "selections": (v6/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "maxPrice",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Money",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/)
                    ]
                  }
                ]
              },
              {
                "kind": "InlineFragment",
                "type": "Money",
                "selections": (v6/*: any*/)
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "availability",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "category",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "dimensions",
            "storageKey": null,
            "args": null,
            "concreteType": "dimensions",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "in",
                "args": null,
                "storageKey": null
              }
            ]
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtworkMetaTestQuery",
    "id": null,
    "text": "query ArtworkMetaTestQuery {\n  artwork(id: \"opaque-artwork-id\", includeUnlisted: true) {\n    ...ArtworkMeta_artwork\n    id\n  }\n}\n\nfragment ArtworkMeta_artwork on Artwork {\n  href\n  internalID\n  date\n  artist_names: artistNames\n  sale_message: saleMessage\n  partner {\n    name\n    id\n  }\n  image_rights: imageRights\n  is_in_auction: isInAuction\n  is_acquireable: isAcquireable\n  is_shareable: isShareable\n  unlisted\n  meta_image: image {\n    resized(width: 640, height: 640, version: [\"large\", \"medium\", \"tall\"]) {\n      width\n      height\n      url\n    }\n  }\n  meta {\n    title\n    description(limit: 155)\n    long_description: description(limit: 200)\n  }\n  context {\n    __typename\n    ... on Fair {\n      slug\n      name\n    }\n    ... on Node {\n      id\n    }\n  }\n  ...SeoDataForArtwork_artwork\n}\n\nfragment SeoDataForArtwork_artwork on Artwork {\n  href\n  date\n  is_price_hidden: isPriceHidden\n  is_price_range: isPriceRange\n  listPrice {\n    __typename\n    ... on PriceRange {\n      minPrice {\n        major\n        currencyCode\n      }\n      maxPrice {\n        major\n      }\n    }\n    ... on Money {\n      major\n      currencyCode\n    }\n  }\n  meta_image: image {\n    resized(width: 640, height: 640, version: [\"large\", \"medium\", \"tall\"]) {\n      width\n      height\n      url\n    }\n  }\n  meta {\n    title\n    description(limit: 155)\n  }\n  partner {\n    name\n    type\n    profile {\n      image {\n        resized(width: 320, height: 320, version: [\"medium\"]) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n  artist_names: artistNames\n  availability\n  category\n  dimensions {\n    in\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'fdda1771fc40505f85695a05eda7a3eb';
export default node;
