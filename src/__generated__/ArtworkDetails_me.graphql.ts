/**
 * @generated SignedSource<<f7a3ee06e229b09337ab49025fcd8dcf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetails_me$data = {
  readonly email: string | null | undefined;
  readonly name: string | null | undefined;
  readonly phoneNumber: {
    readonly isValid: boolean | null | undefined;
    readonly originalNumber: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtworkDetails_me";
};
export type ArtworkDetails_me$key = {
  readonly " $data"?: ArtworkDetails_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetails_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkDetails_me",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PhoneNumberType",
      "kind": "LinkedField",
      "name": "phoneNumber",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isValid",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "originalNumber",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "86f46eb735bad9ca4693f14475420570";

export default node;
