/**
 * @generated SignedSource<<cbf35b7b1a770960cb3c39c827455e21>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderSourceEnum = "ARTWORK_PAGE" | "INQUIRY" | "PARTNER_OFFER" | "PRIVATE_SALE" | "%future added value";
export type Order2DetailsOrderSummary_Test_Query$variables = Record<PropertyKey, never>;
export type Order2DetailsOrderSummary_Test_Query$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsOrderSummary_order">;
    } | null | undefined;
  } | null | undefined;
};
export type Order2DetailsOrderSummary_Test_Query$rawResponse = {
  readonly me: {
    readonly id: string;
    readonly order: {
      readonly id: string;
      readonly itemsTotal: {
        readonly display: string | null | undefined;
      } | null | undefined;
      readonly lineItems: ReadonlyArray<{
        readonly artwork: {
          readonly id: string;
          readonly partner: {
            readonly id: string;
            readonly name: string | null | undefined;
          } | null | undefined;
          readonly published: boolean;
          readonly slug: string;
        } | null | undefined;
        readonly artworkVersion: {
          readonly artistNames: string | null | undefined;
          readonly attributionClass: {
            readonly id: string;
            readonly shortDescription: string | null | undefined;
          } | null | undefined;
          readonly date: string | null | undefined;
          readonly dimensions: {
            readonly cm: string | null | undefined;
            readonly in: string | null | undefined;
          } | null | undefined;
          readonly id: string;
          readonly image: {
            readonly resized: {
              readonly height: number | null | undefined;
              readonly url: string;
              readonly width: number | null | undefined;
            } | null | undefined;
          } | null | undefined;
          readonly title: string | null | undefined;
        } | null | undefined;
        readonly id: string;
      } | null | undefined>;
      readonly pricingBreakdownLines: ReadonlyArray<{
        readonly __typename: "ShippingLine";
        readonly amount: {
          readonly amount: string | null | undefined;
          readonly currencySymbol: string | null | undefined;
        } | null | undefined;
        readonly amountFallbackText: string | null | undefined;
        readonly displayName: string;
      } | {
        readonly __typename: "SubtotalLine";
        readonly amount: {
          readonly amount: string | null | undefined;
          readonly currencySymbol: string | null | undefined;
        } | null | undefined;
        readonly displayName: string;
      } | {
        readonly __typename: "TaxLine";
        readonly amount: {
          readonly amount: string | null | undefined;
          readonly currencySymbol: string | null | undefined;
        } | null | undefined;
        readonly amountFallbackText: string | null | undefined;
        readonly displayName: string;
      } | {
        readonly __typename: "TotalLine";
        readonly amount: {
          readonly display: string | null | undefined;
        } | null | undefined;
        readonly amountFallbackText: string | null | undefined;
        readonly displayName: string;
      } | {
        readonly __typename: string;
      } | null | undefined>;
      readonly shippingTotal: {
        readonly display: string | null | undefined;
      } | null | undefined;
      readonly source: OrderSourceEnum;
      readonly taxTotal: {
        readonly display: string | null | undefined;
      } | null | undefined;
      readonly totalListPrice: {
        readonly display: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type Order2DetailsOrderSummary_Test_Query = {
  rawResponse: Order2DetailsOrderSummary_Test_Query$rawResponse;
  response: Order2DetailsOrderSummary_Test_Query$data;
  variables: Order2DetailsOrderSummary_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "123"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "amount",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "amount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currencySymbol",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = [
  (v1/*: any*/),
  (v2/*: any*/),
  (v3/*: any*/)
],
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Order2DetailsOrderSummary_Test_Query",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2DetailsOrderSummary_order"
              }
            ],
            "storageKey": "order(id:\"123\")"
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
    "name": "Order2DetailsOrderSummary_Test_Query",
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
                "concreteType": null,
                "kind": "LinkedField",
                "name": "pricingBreakdownLines",
                "plural": true,
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
                    "selections": (v4/*: any*/),
                    "type": "ShippingLine",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v4/*: any*/),
                    "type": "TaxLine",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v1/*: any*/),
                      (v3/*: any*/)
                    ],
                    "type": "SubtotalLine",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "amount",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "type": "TotalLine",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "source",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "totalListPrice",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "itemsTotal",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "shippingTotal",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "taxTotal",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
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
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "artwork",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "published",
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
                          (v6/*: any*/)
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
                                "value": 360
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 700
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
                                "name": "url",
                                "storageKey": null
                              },
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
                              }
                            ],
                            "storageKey": "resized(height:360,width:700)"
                          }
                        ],
                        "storageKey": null
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
            "storageKey": "order(id:\"123\")"
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7312273fa8af48c24628b8db2d5f7a74",
    "id": null,
    "metadata": {},
    "name": "Order2DetailsOrderSummary_Test_Query",
    "operationKind": "query",
    "text": "query Order2DetailsOrderSummary_Test_Query {\n  me {\n    order(id: \"123\") {\n      ...Order2DetailsOrderSummary_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2DetailsOrderSummary_order on Order {\n  ...Order2PricingBreakdown_order\n  source\n  totalListPrice {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  shippingTotal {\n    display\n  }\n  taxTotal {\n    display\n  }\n  lineItems {\n    artwork {\n      slug\n      published\n      partner {\n        name\n        id\n      }\n      id\n    }\n    artworkVersion {\n      title\n      artistNames\n      date\n      attributionClass {\n        shortDescription\n        id\n      }\n      dimensions {\n        in\n        cm\n      }\n      image {\n        resized(height: 360, width: 700) {\n          url\n          width\n          height\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Order2PricingBreakdown_order on Order {\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TaxLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on SubtotalLine {\n      displayName\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TotalLine {\n      displayName\n      amountFallbackText\n      amount {\n        display\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "46a1e2532d825a82f17a98fa50def2b5";

export default node;
