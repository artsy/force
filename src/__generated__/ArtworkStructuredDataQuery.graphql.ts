/**
 * @generated SignedSource<<fdeda3eafc34cfcceed26860fc1576f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ArtworkStructuredDataQuery$variables = {
  id: string;
};
export type ArtworkStructuredDataQuery$data = {
  readonly artwork: {
    readonly artists: ReadonlyArray<{
      readonly href: string | null | undefined;
      readonly name: string | null | undefined;
    } | null | undefined> | null | undefined;
    readonly availability: string | null | undefined;
    readonly date: string | null | undefined;
    readonly depth: string | null | undefined;
    readonly description: string | null | undefined;
    readonly editionOf: string | null | undefined;
    readonly height: string | null | undefined;
    readonly href: string | null | undefined;
    readonly image: {
      readonly large: {
        readonly height: number | null | undefined;
        readonly url: string;
        readonly width: number | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly imageRights: string | null | undefined;
    readonly isPriceHidden: boolean | null | undefined;
    readonly listPrice: {
      readonly __typename: "Money";
      readonly currencyCode: string;
      readonly major: number;
    } | {
      readonly __typename: "PriceRange";
      readonly maxPrice: {
        readonly major: number;
      } | null | undefined;
      readonly minPrice: {
        readonly currencyCode: string;
        readonly major: number;
      } | null | undefined;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
    readonly manufacturer: string | null | undefined;
    readonly medium: string | null | undefined;
    readonly mediumType: {
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly metric: string | null | undefined;
    readonly partner: {
      readonly href: string | null | undefined;
      readonly locationsConnection: {
        readonly edges: ReadonlyArray<{
          readonly node: {
            readonly address: string | null | undefined;
            readonly city: string | null | undefined;
            readonly country: string | null | undefined;
            readonly postalCode: string | null | undefined;
            readonly state: string | null | undefined;
          } | null | undefined;
        } | null | undefined> | null | undefined;
      } | null | undefined;
      readonly name: string | null | undefined;
      readonly profile: {
        readonly image: {
          readonly resized: {
            readonly url: string;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly publisher: string | null | undefined;
    readonly series: string | null | undefined;
    readonly slug: string;
    readonly title: string | null | undefined;
    readonly width: string | null | undefined;
  } | null | undefined;
};
export type ArtworkStructuredDataQuery = {
  response: ArtworkStructuredDataQuery$data;
  variables: ArtworkStructuredDataQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "medium",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "series",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "publisher",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "manufacturer",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageRights",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "editionOf",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "ArtworkMedium",
  "kind": "LinkedField",
  "name": "mediumType",
  "plural": false,
  "selections": [
    (v11/*: any*/)
  ],
  "storageKey": null
},
v13 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "depth",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "metric",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": "large",
      "args": [
        {
          "kind": "Literal",
          "name": "height",
          "value": 1920
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 1920
        }
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": [
        (v19/*: any*/),
        (v15/*: any*/),
        (v16/*: any*/)
      ],
      "storageKey": "resized(height:1920,width:1920)"
    }
  ],
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "format",
      "value": "PLAIN"
    }
  ],
  "kind": "ScalarField",
  "name": "description",
  "storageKey": "description(format:\"PLAIN\")"
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPriceHidden",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "availability",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "major",
  "storageKey": null
},
v25 = [
  (v24/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currencyCode",
    "storageKey": null
  }
],
v26 = {
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
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "minPrice",
          "plural": false,
          "selections": (v25/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "maxPrice",
          "plural": false,
          "selections": [
            (v24/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "type": "PriceRange",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v25/*: any*/),
      "type": "Money",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "height",
          "value": 320
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 320
        }
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": [
        (v19/*: any*/)
      ],
      "storageKey": "resized(height:320,width:320)"
    }
  ],
  "storageKey": null
},
v28 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkStructuredDataQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v12/*: any*/),
          {
            "alias": null,
            "args": (v13/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": [
              (v11/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": "artists(shallow:true)"
          },
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/),
          (v20/*: any*/),
          (v21/*: any*/),
          (v22/*: any*/),
          (v23/*: any*/),
          (v26/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v11/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  (v27/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v28/*: any*/),
                "concreteType": "LocationConnection",
                "kind": "LinkedField",
                "name": "locationsConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "LocationEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Location",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v29/*: any*/),
                          (v30/*: any*/),
                          (v31/*: any*/),
                          (v32/*: any*/),
                          (v33/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "locationsConnection(first:1)"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtworkStructuredDataQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v12/*: any*/),
          {
            "alias": null,
            "args": (v13/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": [
              (v11/*: any*/),
              (v3/*: any*/),
              (v34/*: any*/)
            ],
            "storageKey": "artists(shallow:true)"
          },
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/),
          (v20/*: any*/),
          (v21/*: any*/),
          (v22/*: any*/),
          (v23/*: any*/),
          (v26/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v11/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  (v27/*: any*/),
                  (v34/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v28/*: any*/),
                "concreteType": "LocationConnection",
                "kind": "LinkedField",
                "name": "locationsConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "LocationEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Location",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v29/*: any*/),
                          (v30/*: any*/),
                          (v31/*: any*/),
                          (v32/*: any*/),
                          (v33/*: any*/),
                          (v34/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "locationsConnection(first:1)"
              },
              (v34/*: any*/)
            ],
            "storageKey": null
          },
          (v34/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5b112fd3ebf7a26e5d5527154b582502",
    "id": null,
    "metadata": {},
    "name": "ArtworkStructuredDataQuery",
    "operationKind": "query",
    "text": "query ArtworkStructuredDataQuery(\n  $id: String!\n) {\n  artwork(id: $id) {\n    slug\n    href\n    title\n    medium\n    series\n    publisher\n    manufacturer\n    imageRights\n    editionOf\n    mediumType {\n      name\n    }\n    artists(shallow: true) {\n      name\n      href\n      id\n    }\n    date\n    width\n    height\n    depth\n    metric\n    image {\n      large: resized(width: 1920, height: 1920) {\n        url\n        width\n        height\n      }\n    }\n    description(format: PLAIN)\n    isPriceHidden\n    availability\n    listPrice {\n      __typename\n      ... on PriceRange {\n        minPrice {\n          major\n          currencyCode\n        }\n        maxPrice {\n          major\n        }\n      }\n      ... on Money {\n        major\n        currencyCode\n      }\n    }\n    partner {\n      name\n      href\n      profile {\n        image {\n          resized(width: 320, height: 320) {\n            url\n          }\n        }\n        id\n      }\n      locationsConnection(first: 1) {\n        edges {\n          node {\n            address\n            city\n            state\n            postalCode\n            country\n            id\n          }\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "8d2170057d07d08042525f81610be5e1";

export default node;
