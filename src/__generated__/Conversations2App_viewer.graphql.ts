/**
 * @generated SignedSource<<e990c3b71f5be09e704355d670e564bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Conversations2App_viewer$data = {
  readonly conversationsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string | null;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "Conversations2App_viewer";
};
export type Conversations2App_viewer$key = {
  readonly " $data"?: Conversations2App_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Conversations2App_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Conversations2App_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "type",
          "value": "USER"
        }
      ],
      "concreteType": "ConversationConnection",
      "kind": "LinkedField",
      "name": "conversationsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ConversationEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Conversation",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "conversationsConnection(first:1,type:\"USER\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "47d74eb6eca9ed22c8b0f6cb729c658a";

export default node;
