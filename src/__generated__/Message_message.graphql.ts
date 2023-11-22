/**
 * @generated SignedSource<<c6d8f8efd5759e09c9ba3a80864d42ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Message_message$data = {
  readonly __typename: "Message";
  readonly attachments: ReadonlyArray<{
    readonly contentType: string;
    readonly downloadURL: string;
    readonly fileName: string;
    readonly id: string;
  } | null | undefined> | null | undefined;
  readonly body: string | null | undefined;
  readonly createdAt: string | null | undefined;
  readonly from: {
    readonly email: string | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly isFromUser: boolean | null | undefined;
  readonly " $fragmentType": "Message_message";
};
export type Message_message$key = {
  readonly " $data"?: Message_message$data;
  readonly " $fragmentSpreads": FragmentRefs<"Message_message">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Message_message",
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
      "name": "internalID",
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
      "concreteType": "MessageInitiator",
      "kind": "LinkedField",
      "name": "from",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "email",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
  "type": "Message",
  "abstractKey": null
};

(node as any).hash = "8df1d4b1072ff92b143baf0a307c977b";

export default node;
