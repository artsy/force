/**
 * @generated SignedSource<<ebd37ea5a112ad9939b6f1442c6c475e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairSubApp_fair$data = {
  readonly href: string | null | undefined;
  readonly id: string;
  readonly name: string | null | undefined;
  readonly profile: {
    readonly __typename: "Profile";
  } | null | undefined;
  readonly " $fragmentType": "FairSubApp_fair";
};
export type FairSubApp_fair$key = {
  readonly " $data"?: FairSubApp_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairSubApp_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairSubApp_fair",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
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
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "98d499a3d6f94021de2faa6e352f6172";

export default node;
