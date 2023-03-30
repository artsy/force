/**
 * @generated SignedSource<<c8587aa6a473645281e146c177d351a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationsSidebar_viewer$data = {
  readonly conversationsConnection: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly internalID: string | null;
        readonly " $fragmentSpreads": FragmentRefs<"ConversationsSidebarItem_conversation">;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "ConversationsSidebar_viewer";
};
export type ConversationsSidebar_viewer$key = {
  readonly " $data"?: ConversationsSidebar_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationsSidebar_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "conversationsConnection"
];
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
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "hasReply"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "toBeReplied"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "viewer"
      ],
      "operation": require('./ConversationsSidebarPaginationQuery.graphql')
    }
  },
  "name": "ConversationsSidebar_viewer",
  "selections": [
    {
      "alias": "conversationsConnection",
      "args": [
        {
          "kind": "Variable",
          "name": "hasReply",
          "variableName": "hasReply"
        },
        {
          "kind": "Variable",
          "name": "toBeReplied",
          "variableName": "toBeReplied"
        },
        {
          "kind": "Literal",
          "name": "type",
          "value": "USER"
        }
      ],
      "concreteType": "ConversationConnection",
      "kind": "LinkedField",
      "name": "__ConversationsSidebar_viewer_conversationsConnection_connection",
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
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
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
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ConversationsSidebarItem_conversation"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "b8034dba33527a2d376f8720e9d281a4";

export default node;
