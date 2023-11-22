/**
 * @generated SignedSource<<d89d4d69c6a4e4e436620e3c39f807fb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationMessages_messages$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly __typename: "Message";
      readonly body: string | null | undefined;
      readonly createdAt: string | null | undefined;
      readonly id: string;
      readonly internalID: string;
      readonly isFromUser: boolean | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"Message_message">;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "ConversationMessages_messages";
};
export type ConversationMessages_messages$key = {
  readonly " $data"?: ConversationMessages_messages$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationMessages_messages">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationMessages_messages",
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
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            },
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
              "name": "internalID",
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
              "kind": "ScalarField",
              "name": "isFromUser",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "body",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Message_message"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MessageConnection",
  "abstractKey": null
};

(node as any).hash = "fd29bc23d63959e46da46c2ce93bb8ff";

export default node;
