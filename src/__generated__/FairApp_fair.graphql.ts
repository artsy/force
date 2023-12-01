/**
 * @generated SignedSource<<79cc002f70fa8572b684feac6791105c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairApp_fair$data = {
  readonly internalID: string;
  readonly profile: {
    readonly id: string;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ExhibitorsLetterNav_fair" | "FairHeaderImage_fair" | "FairHeader_fair" | "FairMeta_fair" | "FairTabs_fair">;
  readonly " $fragmentType": "FairApp_fair";
};
export type FairApp_fair$key = {
  readonly " $data"?: FairApp_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairApp_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairApp_fair",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairTabs_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairMeta_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairHeader_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairHeaderImage_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ExhibitorsLetterNav_fair"
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
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "0eb1702e4a331569aee3578c3d71af36";

export default node;
