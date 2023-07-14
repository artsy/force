/**
 * @generated SignedSource<<904fc90653629d8a02a2b1d10c95ce5e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderSourceEnum = "artwork_page" | "inquiry" | "private_sale" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SettingsPurchases_me$data = {
  readonly name: string | null;
  readonly orders: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly code: string;
        readonly " $fragmentSpreads": FragmentRefs<"SettingsPurchasesRow_order">;
      } | null;
    } | null> | null;
    readonly pageCursors: {
      readonly " $fragmentSpreads": FragmentRefs<"CommercePagination_pageCursors">;
    } | null;
    readonly pageInfo: {
      readonly endCursor: string | null;
      readonly hasNextPage: boolean;
    };
    readonly totalCount: number | null;
  } | null;
  readonly pendingOrders: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly code: string;
        readonly createdAt: string;
        readonly lineItems: {
          readonly nodes: ReadonlyArray<{
            readonly artworkId: string;
            readonly editionSetId: string | null;
          } | null> | null;
        } | null;
        readonly source: CommerceOrderSourceEnum;
        readonly " $fragmentSpreads": FragmentRefs<"SettingsPurchasesRow_order">;
      } | null;
    } | null> | null;
    readonly pageCursors: {
      readonly " $fragmentSpreads": FragmentRefs<"CommercePagination_pageCursors">;
    } | null;
    readonly pageInfo: {
      readonly endCursor: string | null;
      readonly hasNextPage: boolean;
    };
    readonly totalCount: number | null;
  } | null;
  readonly " $fragmentType": "SettingsPurchases_me";
};
export type SettingsPurchases_me$key = {
  readonly " $data"?: SettingsPurchases_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsPurchases_me">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "CommercePageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "CommercePageCursors",
  "kind": "LinkedField",
  "name": "pageCursors",
  "plural": false,
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CommercePagination_pageCursors"
    }
  ],
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v4 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "SettingsPurchasesRow_order"
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": [
        "APPROVED",
        "CANCELED",
        "FULFILLED",
        "REFUNDED",
        "SUBMITTED",
        "PROCESSING_APPROVAL"
      ],
      "kind": "LocalArgument",
      "name": "states"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsPurchases_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": "pendingOrders",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 100
        },
        {
          "kind": "Literal",
          "name": "states",
          "value": [
            "PENDING"
          ]
        }
      ],
      "concreteType": "CommerceOrderConnectionWithTotalCount",
      "kind": "LinkedField",
      "name": "orders",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOrderEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v3/*: any*/),
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
                  "kind": "ScalarField",
                  "name": "createdAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "CommerceLineItemConnection",
                  "kind": "LinkedField",
                  "name": "lineItems",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "CommerceLineItem",
                      "kind": "LinkedField",
                      "name": "nodes",
                      "plural": true,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "artworkId",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "editionSetId",
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                (v4/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "orders(first:100,states:[\"PENDING\"])"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        },
        {
          "kind": "Variable",
          "name": "states",
          "variableName": "states"
        }
      ],
      "concreteType": "CommerceOrderConnectionWithTotalCount",
      "kind": "LinkedField",
      "name": "orders",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOrderEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v3/*: any*/),
                (v4/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "d8c6ce274cad110bbc36ea24c4bd87ac";

export default node;
