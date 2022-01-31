/**
 * @generated SignedSource<<8ffb1415ca4c6ccf6568add85c422ddf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UnreadMessagesToast_conversation$data = {
  readonly id: string;
  readonly internalID: string | null;
  readonly lastMessageID: string | null;
  readonly fromLastViewedMessageID: string | null;
  readonly isLastMessageToUser: boolean | null;
  readonly activeOrders: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly updatedAt: string;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "UnreadMessagesToast_conversation";
};
export type UnreadMessagesToast_conversation$key = {
  readonly " $data"?: UnreadMessagesToast_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"UnreadMessagesToast_conversation">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnreadMessagesToast_conversation",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastMessageID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "fromLastViewedMessageID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isLastMessageToUser",
      "storageKey": null
    },
    {
      "alias": "activeOrders",
      "args": [
        {
          "kind": "Literal",
          "name": "last",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "states",
          "value": [
            "APPROVED",
            "FULFILLED",
            "SUBMITTED",
            "REFUNDED"
          ]
        }
      ],
      "concreteType": "CommerceOrderConnectionWithTotalCount",
      "kind": "LinkedField",
      "name": "orderConnection",
      "plural": false,
      "selections": [
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
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "updatedAt",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "orderConnection(last:1,states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"REFUNDED\"])"
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};
})();

(node as any).hash = "4d34587b33e35fafafec625b2e57f5b2";

export default node;
