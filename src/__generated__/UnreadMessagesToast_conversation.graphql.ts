/**
 * @generated SignedSource<<6ac920640f0c2f1bb59a400bd677b700>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UnreadMessagesToast_conversation$data = {
  readonly activeOrders: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly updatedAt: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly fromLastViewedMessageID: string | null | undefined;
  readonly id: string;
  readonly internalID: string | null | undefined;
  readonly isLastMessageToUser: boolean | null | undefined;
  readonly lastMessageID: string | null | undefined;
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
            "REFUNDED",
            "PROCESSING_APPROVAL"
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
      "storageKey": "orderConnection(last:1,states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"REFUNDED\",\"PROCESSING_APPROVAL\"])"
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};
})();

(node as any).hash = "ef9bb7db3acf2ba877700d2442eaf43b";

export default node;
