/**
 * @generated SignedSource<<9539e78f122f7d3f69120bf1430a932d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeoDataForArtwork_Test_Query$variables = Record<PropertyKey, never>;
export type SeoDataForArtwork_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"SeoDataForArtwork_artwork">;
  } | null | undefined;
};
export type SeoDataForArtwork_Test_Query$rawResponse = {
  readonly artwork: {
    readonly artistNames: string | null | undefined;
    readonly availability: string | null | undefined;
    readonly category: string | null | undefined;
    readonly date: string | null | undefined;
    readonly dimensions: {
      readonly in: string | null | undefined;
    } | null | undefined;
    readonly href: string | null | undefined;
    readonly id: string;
    readonly is_price_hidden: boolean | null | undefined;
    readonly is_price_range: boolean | null | undefined;
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
      readonly __typename: string;
    } | null | undefined;
    readonly meta: {
      readonly description: string | null | undefined;
      readonly title: string | null | undefined;
    } | null | undefined;
    readonly meta_image: {
      readonly resized: {
        readonly height: number | null | undefined;
        readonly url: string;
        readonly width: number | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly partner: {
      readonly id: string;
      readonly name: string | null | undefined;
      readonly profile: {
        readonly id: string;
        readonly image: {
          readonly resized: {
            readonly url: string;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined;
      readonly type: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type SeoDataForArtwork_Test_Query = {
  rawResponse: SeoDataForArtwork_Test_Query$rawResponse;
  response: SeoDataForArtwork_Test_Query$data;
  variables: SeoDataForArtwork_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "richard-anuszkiewicz-lino-yellow-318"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "major",
  "storageKey": null
},
v2 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currencyCode",
    "storageKey": null
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SeoDataForArtwork_Test_Query",
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
            "name": "SeoDataForArtwork_artwork"
          }
        ],
        "storageKey": "artwork(id:\"richard-anuszkiewicz-lino-yellow-318\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SeoDataForArtwork_Test_Query",
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "href",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "date",
            "storageKey": null
          },
          {
            "alias": "is_price_hidden",
            "args": null,
            "kind": "ScalarField",
            "name": "isPriceHidden",
            "storageKey": null
          },
          {
            "alias": "is_price_range",
            "args": null,
            "kind": "ScalarField",
            "name": "isPriceRange",
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
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "minPrice",
                    "plural": false,
                    "selections": (v2/*: any*/),
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
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "PriceRange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v2/*: any*/),
                "type": "Money",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "meta_image",
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
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "width",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "height",
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": "resized(height:640,version:[\"large\",\"medium\",\"tall\"],width:640)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "limit",
                    "value": 155
                  }
                ],
                "kind": "ScalarField",
                "name": "description",
                "storageKey": "description(limit:155)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  {
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
                        "kind": "LinkedField",
                        "name": "resized",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/)
                        ],
                        "storageKey": "resized(height:320,version:[\"medium\"],width:320)"
                      }
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artistNames",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "availability",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          },
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
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": "artwork(id:\"richard-anuszkiewicz-lino-yellow-318\")"
      }
    ]
  },
  "params": {
    "cacheID": "f8392b0d6f9c82a9432ddf2ec1e103f5",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artistNames": (v5/*: any*/),
        "artwork.availability": (v5/*: any*/),
        "artwork.category": (v5/*: any*/),
        "artwork.date": (v5/*: any*/),
        "artwork.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "artwork.dimensions.in": (v5/*: any*/),
        "artwork.href": (v5/*: any*/),
        "artwork.id": (v6/*: any*/),
        "artwork.is_price_hidden": (v7/*: any*/),
        "artwork.is_price_range": (v7/*: any*/),
        "artwork.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "artwork.listPrice.__typename": (v8/*: any*/),
        "artwork.listPrice.currencyCode": (v8/*: any*/),
        "artwork.listPrice.major": (v9/*: any*/),
        "artwork.listPrice.maxPrice": (v10/*: any*/),
        "artwork.listPrice.maxPrice.major": (v9/*: any*/),
        "artwork.listPrice.minPrice": (v10/*: any*/),
        "artwork.listPrice.minPrice.currencyCode": (v8/*: any*/),
        "artwork.listPrice.minPrice.major": (v9/*: any*/),
        "artwork.meta": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMeta"
        },
        "artwork.meta.description": (v5/*: any*/),
        "artwork.meta.title": (v5/*: any*/),
        "artwork.meta_image": (v11/*: any*/),
        "artwork.meta_image.resized": (v12/*: any*/),
        "artwork.meta_image.resized.height": (v13/*: any*/),
        "artwork.meta_image.resized.url": (v8/*: any*/),
        "artwork.meta_image.resized.width": (v13/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.id": (v6/*: any*/),
        "artwork.partner.name": (v5/*: any*/),
        "artwork.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "artwork.partner.profile.id": (v6/*: any*/),
        "artwork.partner.profile.image": (v11/*: any*/),
        "artwork.partner.profile.image.resized": (v12/*: any*/),
        "artwork.partner.profile.image.resized.url": (v8/*: any*/),
        "artwork.partner.type": (v5/*: any*/)
      }
    },
    "name": "SeoDataForArtwork_Test_Query",
    "operationKind": "query",
    "text": "query SeoDataForArtwork_Test_Query {\n  artwork(id: \"richard-anuszkiewicz-lino-yellow-318\") {\n    ...SeoDataForArtwork_artwork\n    id\n  }\n}\n\nfragment SeoDataForArtwork_artwork on Artwork {\n  href\n  date\n  is_price_hidden: isPriceHidden\n  is_price_range: isPriceRange\n  listPrice {\n    __typename\n    ... on PriceRange {\n      minPrice {\n        major\n        currencyCode\n      }\n      maxPrice {\n        major\n      }\n    }\n    ... on Money {\n      major\n      currencyCode\n    }\n  }\n  meta_image: image {\n    resized(width: 640, height: 640, version: [\"large\", \"medium\", \"tall\"]) {\n      width\n      height\n      url\n    }\n  }\n  meta {\n    title\n    description(limit: 155)\n  }\n  partner {\n    name\n    type\n    profile {\n      image {\n        resized(width: 320, height: 320, version: [\"medium\"]) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n  artistNames\n  availability\n  category\n  dimensions {\n    in\n  }\n}\n"
  }
};
})();

(node as any).hash = "42324582d26a2b149c439fb77a1ebb9b";

export default node;
