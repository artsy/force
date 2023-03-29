/**
 * @generated SignedSource<<759e8b8e697deb21e26c3acafff1dbf9>>
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
          "name": "partnerId",
          "value": "commerce-test-partner"
        },
        {
          "kind": "Literal",
          "name": "type",
          "value": "PARTNER"
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
      "storageKey": "conversationsConnection(first:1,partnerId:\"commerce-test-partner\",type:\"PARTNER\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "262f3806721b50b73380b738fb6f7709";

export default node;
