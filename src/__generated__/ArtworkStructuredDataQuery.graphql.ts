/**
 * @generated SignedSource<<38fd2a0cad5160ff9165db007f42df83>>
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
  "name": "editionOf",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "ArtworkMedium",
  "kind": "LinkedField",
  "name": "mediumType",
  "plural": false,
  "selections": [
    (v7/*: any*/)
  ],
  "storageKey": null
},
v9 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "depth",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "metric",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v16 = {
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
        (v15/*: any*/),
        (v11/*: any*/),
        (v12/*: any*/)
      ],
      "storageKey": "resized(height:1920,width:1920)"
    }
  ],
  "storageKey": null
},
v17 = {
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
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPriceHidden",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "availability",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "major",
  "storageKey": null
},
v21 = [
  (v20/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currencyCode",
    "storageKey": null
  }
],
v22 = {
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
          "selections": (v21/*: any*/),
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
            (v20/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "type": "PriceRange",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v21/*: any*/),
      "type": "Money",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v23 = {
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
        (v15/*: any*/)
      ],
      "storageKey": "resized(height:320,width:320)"
    }
  ],
  "storageKey": null
},
v24 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v30 = {
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
          (v8/*: any*/),
          {
            "alias": null,
            "args": (v9/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": [
              (v7/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": "artists(shallow:true)"
          },
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/),
          (v19/*: any*/),
          (v22/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  (v23/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v24/*: any*/),
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
                          (v25/*: any*/),
                          (v26/*: any*/),
                          (v27/*: any*/),
                          (v28/*: any*/),
                          (v29/*: any*/)
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
          (v8/*: any*/),
          {
            "alias": null,
            "args": (v9/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": [
              (v7/*: any*/),
              (v3/*: any*/),
              (v30/*: any*/)
            ],
            "storageKey": "artists(shallow:true)"
          },
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/),
          (v19/*: any*/),
          (v22/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  (v23/*: any*/),
                  (v30/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v24/*: any*/),
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
                          (v25/*: any*/),
                          (v26/*: any*/),
                          (v27/*: any*/),
                          (v28/*: any*/),
                          (v29/*: any*/),
                          (v30/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "locationsConnection(first:1)"
              },
              (v30/*: any*/)
            ],
            "storageKey": null
          },
          (v30/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bb9b260e758faead5a60279c576c96b2",
    "id": null,
    "metadata": {},
    "name": "ArtworkStructuredDataQuery",
    "operationKind": "query",
    "text": "query ArtworkStructuredDataQuery(\n  $id: String!\n) {\n  artwork(id: $id) {\n    slug\n    href\n    title\n    medium\n    editionOf\n    mediumType {\n      name\n    }\n    artists(shallow: true) {\n      name\n      href\n      id\n    }\n    date\n    width\n    height\n    depth\n    metric\n    image {\n      large: resized(width: 1920, height: 1920) {\n        url\n        width\n        height\n      }\n    }\n    description(format: PLAIN)\n    isPriceHidden\n    availability\n    listPrice {\n      __typename\n      ... on PriceRange {\n        minPrice {\n          major\n          currencyCode\n        }\n        maxPrice {\n          major\n        }\n      }\n      ... on Money {\n        major\n        currencyCode\n      }\n    }\n    partner {\n      name\n      href\n      profile {\n        image {\n          resized(width: 320, height: 320) {\n            url\n          }\n        }\n        id\n      }\n      locationsConnection(first: 1) {\n        edges {\n          node {\n            address\n            city\n            state\n            postalCode\n            country\n            id\n          }\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4a36f3591a6af18d2da9018a89abbe70";

export default node;
