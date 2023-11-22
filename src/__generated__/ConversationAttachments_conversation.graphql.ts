/**
 * @generated SignedSource<<974843e5f82808e7316ea338ce33c196>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationAttachments_conversation$data = {
  readonly attachmentsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly attachments: ReadonlyArray<{
          readonly contentType: string;
          readonly downloadURL: string;
          readonly fileName: string;
          readonly id: string;
        } | null | undefined> | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ConversationAttachments_conversation";
};
export type ConversationAttachments_conversation$key = {
  readonly " $data"?: ConversationAttachments_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationAttachments_conversation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationAttachments_conversation",
  "selections": [
    {
      "alias": "attachmentsConnection",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 30
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "DESC"
        }
      ],
      "concreteType": "MessageConnection",
      "kind": "LinkedField",
      "name": "messagesConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MessageEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Message",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Attachment",
                  "kind": "LinkedField",
                  "name": "attachments",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "id",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "contentType",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "fileName",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "downloadURL",
                      "storageKey": null
                    }
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
      "storageKey": "messagesConnection(first:30,sort:\"DESC\")"
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};

(node as any).hash = "2611a11c5718e7e052245625ea3cf24e";

export default node;
