/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PurchaseHistory_me = {
    readonly orders: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly code: string;
                readonly state: CommerceOrderStateEnum;
                readonly mode: CommerceOrderModeEnum | null;
                readonly buyerTotal: string | null;
                readonly lineItems: {
                    readonly edges: ReadonlyArray<{
                        readonly node: {
                            readonly artwork: {
                                readonly date: string | null;
                                readonly image: {
                                    readonly resized: {
                                        readonly url: string | null;
                                    } | null;
                                } | null;
                                readonly internalID: string;
                                readonly title: string | null;
                                readonly artist_names: string | null;
                            } | null;
                        } | null;
                    } | null> | null;
                } | null;
            } | null;
        } | null> | null;
        readonly pageCursors: {
            readonly around: ReadonlyArray<{
                readonly cursor: string;
                readonly isCurrent: boolean;
                readonly page: number;
            }>;
            readonly first: {
                readonly cursor: string;
                readonly isCurrent: boolean;
                readonly page: number;
            } | null;
            readonly last: {
                readonly cursor: string;
                readonly isCurrent: boolean;
                readonly page: number;
            } | null;
            readonly previous: {
                readonly cursor: string;
                readonly isCurrent: boolean;
                readonly page: number;
            } | null;
        } | null;
        readonly pageInfo: {
            readonly endCursor: string | null;
            readonly hasNextPage: boolean;
            readonly hasPreviousPage: boolean;
            readonly startCursor: string | null;
        };
    } | null;
    readonly " $refType": "PurchaseHistory_me";
};
export type PurchaseHistory_me$data = PurchaseHistory_me;
export type PurchaseHistory_me$key = {
    readonly " $data"?: PurchaseHistory_me$data;
    readonly " $fragmentRefs": FragmentRefs<"PurchaseHistory_me">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "cursor",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "page",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "PurchaseHistory_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int",
      "defaultValue": 10
    },
    {
      "kind": "LocalArgument",
      "name": "last",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "after",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "before",
      "type": "String",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "orders",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after"
        },
        {
          "kind": "Variable",
          "name": "before",
          "variableName": "before"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        },
        {
          "kind": "Variable",
          "name": "last",
          "variableName": "last"
        }
      ],
      "concreteType": "CommerceOrderConnectionWithTotalCount",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "CommerceOrderEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": null,
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "code",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "state",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "mode",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "buyerTotal",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "lineItems",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "CommerceLineItemConnection",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "edges",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "CommerceLineItemEdge",
                      "plural": true,
                      "selections": [
                        {
                          "kind": "LinkedField",
                          "alias": null,
                          "name": "node",
                          "storageKey": null,
                          "args": null,
                          "concreteType": "CommerceLineItem",
                          "plural": false,
                          "selections": [
                            {
                              "kind": "LinkedField",
                              "alias": null,
                              "name": "artwork",
                              "storageKey": null,
                              "args": null,
                              "concreteType": "Artwork",
                              "plural": false,
                              "selections": [
                                {
                                  "kind": "ScalarField",
                                  "alias": null,
                                  "name": "date",
                                  "args": null,
                                  "storageKey": null
                                },
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
                                      "storageKey": "resized(width:55)",
                                      "args": [
                                        {
                                          "kind": "Literal",
                                          "name": "width",
                                          "value": 55
                                        }
                                      ],
                                      "concreteType": "ResizedImageUrl",
                                      "plural": false,
                                      "selections": [
                                        {
                                          "kind": "ScalarField",
                                          "alias": null,
                                          "name": "url",
                                          "args": null,
                                          "storageKey": null
                                        }
                                      ]
                                    }
                                  ]
                                },
                                (v0/*: any*/),
                                {
                                  "kind": "ScalarField",
                                  "alias": null,
                                  "name": "title",
                                  "args": null,
                                  "storageKey": null
                                },
                                {
                                  "kind": "ScalarField",
                                  "alias": "artist_names",
                                  "name": "artistNames",
                                  "args": null,
                                  "storageKey": null
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageCursors",
          "storageKey": null,
          "args": null,
          "concreteType": "CommercePageCursors",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "around",
              "storageKey": null,
              "args": null,
              "concreteType": "CommercePageCursor",
              "plural": true,
              "selections": (v1/*: any*/)
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "first",
              "storageKey": null,
              "args": null,
              "concreteType": "CommercePageCursor",
              "plural": false,
              "selections": (v1/*: any*/)
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "last",
              "storageKey": null,
              "args": null,
              "concreteType": "CommercePageCursor",
              "plural": false,
              "selections": (v1/*: any*/)
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "previous",
              "storageKey": null,
              "args": null,
              "concreteType": "CommercePageCursor",
              "plural": false,
              "selections": (v1/*: any*/)
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageInfo",
          "storageKey": null,
          "args": null,
          "concreteType": "CommercePageInfo",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "endCursor",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasNextPage",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasPreviousPage",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "startCursor",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'd41ff70287f376c946cc6639696bee28';
export default node;
