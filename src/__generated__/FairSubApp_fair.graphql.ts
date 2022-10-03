/**
 * @generated SignedSource<<8710f1c241c0d909d7b068405b76064a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairSubApp_fair$data = {
  readonly id: string;
  readonly name: string | null;
  readonly slug: string;
  readonly profile: {
    readonly __typename: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"FairMeta_fair">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairMeta_fair"
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
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

(node as any).hash = "6e764f17377d6510ad976161b446cef9";

export default node;
