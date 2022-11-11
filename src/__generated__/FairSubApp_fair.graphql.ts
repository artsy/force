/**
 * @generated SignedSource<<3a33733c994168a075393ef01afc2385>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairSubApp_fair$data = {
  readonly href: string | null;
  readonly id: string;
  readonly name: string | null;
  readonly profile: {
    readonly __typename: "Profile";
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

(node as any).hash = "8800fcf01337098f990219c0fee9f38e";

export default node;
