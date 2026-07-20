/**
 * @generated SignedSource<<c196fef05860494c0c4f91a825e80ce2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useOrder2LineItemDataTestQuery$variables = Record<PropertyKey, never>;
export type useOrder2LineItemDataTestQuery$data = {
  readonly me: {
    readonly order: {
      readonly lineItems: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"useOrder2LineItemData_lineItem">;
      } | null | undefined>;
    } | null | undefined;
  } | null | undefined;
};
export type useOrder2LineItemDataTestQuery = {
  response: useOrder2LineItemDataTestQuery$data;
  variables: useOrder2LineItemDataTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "order-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v3 = [
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
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "dimensions",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "framedDimensions",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "height",
      "value": 138
    },
    {
      "kind": "Literal",
      "name": "width",
      "value": 185
    }
  ],
  "concreteType": "ResizedImageUrl",
  "kind": "LinkedField",
  "name": "resized",
  "plural": false,
  "selections": [
    (v8/*: any*/)
  ],
  "storageKey": "resized(height:138,width:185)"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
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
  "type": "String"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useOrder2LineItemDataTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "LineItem",
                "kind": "LinkedField",
                "name": "lineItems",
                "plural": true,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "useOrder2LineItemData_lineItem"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "order(id:\"order-id\")"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useOrder2LineItemDataTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "LineItem",
                "kind": "LinkedField",
                "name": "lineItems",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "artworkOrEditionSet",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/)
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/)
                        ],
                        "type": "EditionSet",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v7/*: any*/),
                        "type": "Node",
                        "abstractKey": "__isNode"
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtworkVersion",
                    "kind": "LinkedField",
                    "name": "artworkVersion",
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
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistNames",
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
                        "alias": null,
                        "args": null,
                        "concreteType": "AttributionClass",
                        "kind": "LinkedField",
                        "name": "attributionClass",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "shortDescription",
                            "storageKey": null
                          },
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/),
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "artwork",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
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
                            "name": "href",
                            "storageKey": null
                          },
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "includeAll",
                            "value": false
                          }
                        ],
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "figures",
                        "plural": true,
                        "selections": [
                          (v1/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v9/*: any*/)
                            ],
                            "type": "Image",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v7/*: any*/),
                            "type": "Video",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": "figures(includeAll:false)"
                      },
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": "order(id:\"order-id\")"
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8fbe43c5c5d07e9d82a97dcb6cf260c9",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v10/*: any*/),
        "me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.order.id": (v10/*: any*/),
        "me.order.lineItems": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "LineItem"
        },
        "me.order.lineItems.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.order.lineItems.artwork.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtworkFigures"
        },
        "me.order.lineItems.artwork.figures.__typename": (v11/*: any*/),
        "me.order.lineItems.artwork.figures.id": (v10/*: any*/),
        "me.order.lineItems.artwork.figures.resized": (v12/*: any*/),
        "me.order.lineItems.artwork.figures.resized.url": (v11/*: any*/),
        "me.order.lineItems.artwork.id": (v10/*: any*/),
        "me.order.lineItems.artwork.internalID": (v10/*: any*/),
        "me.order.lineItems.artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "me.order.lineItems.artwork.partner.href": (v13/*: any*/),
        "me.order.lineItems.artwork.partner.id": (v10/*: any*/),
        "me.order.lineItems.artwork.partner.name": (v13/*: any*/),
        "me.order.lineItems.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
        "me.order.lineItems.artworkOrEditionSet.__isNode": (v11/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.__typename": (v11/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.dimensions": (v14/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.dimensions.cm": (v13/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.dimensions.in": (v13/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.framedDimensions": (v14/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.framedDimensions.cm": (v13/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.framedDimensions.in": (v13/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.id": (v10/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.price": (v13/*: any*/),
        "me.order.lineItems.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "me.order.lineItems.artworkVersion.artistNames": (v13/*: any*/),
        "me.order.lineItems.artworkVersion.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "me.order.lineItems.artworkVersion.attributionClass.id": (v10/*: any*/),
        "me.order.lineItems.artworkVersion.attributionClass.shortDescription": (v13/*: any*/),
        "me.order.lineItems.artworkVersion.date": (v13/*: any*/),
        "me.order.lineItems.artworkVersion.id": (v10/*: any*/),
        "me.order.lineItems.artworkVersion.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "me.order.lineItems.artworkVersion.image.resized": (v12/*: any*/),
        "me.order.lineItems.artworkVersion.image.resized.url": (v11/*: any*/),
        "me.order.lineItems.artworkVersion.image.url": (v13/*: any*/),
        "me.order.lineItems.artworkVersion.title": (v13/*: any*/),
        "me.order.lineItems.id": (v10/*: any*/)
      }
    },
    "name": "useOrder2LineItemDataTestQuery",
    "operationKind": "query",
    "text": "query useOrder2LineItemDataTestQuery {\n  me {\n    order(id: \"order-id\") {\n      lineItems {\n        ...useOrder2LineItemData_lineItem\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment useOrder2LineItemData_lineItem on LineItem {\n  artworkOrEditionSet {\n    __typename\n    ... on Artwork {\n      price\n      dimensions {\n        in\n        cm\n      }\n      framedDimensions {\n        in\n        cm\n      }\n    }\n    ... on EditionSet {\n      price\n      dimensions {\n        in\n        cm\n      }\n      framedDimensions {\n        in\n        cm\n      }\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  artworkVersion {\n    title\n    artistNames\n    date\n    attributionClass {\n      shortDescription\n      id\n    }\n    image {\n      url\n      resized(width: 185, height: 138) {\n        url\n      }\n    }\n    id\n  }\n  artwork {\n    internalID\n    partner {\n      name\n      href\n      id\n    }\n    figures(includeAll: false) {\n      __typename\n      ... on Image {\n        resized(width: 185, height: 138) {\n          url\n        }\n      }\n      ... on Video {\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3c5a050d4177edf6da13729f216d2f7c";

export default node;
