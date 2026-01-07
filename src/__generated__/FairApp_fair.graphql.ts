/**
 * @generated SignedSource<<7419aa2eba0b4559d83daea55dcff1ac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairApp_fair$data = {
  readonly internalID: string;
  readonly profile: {
    readonly id: string;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ExhibitorsLetterNav_fair" | "FairHeaderImage_fair" | "FairHeader_fair" | "FairTabs_fair">;
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

(node as any).hash = "7f514c69a28fe55190418a888e7d836e";

export default node;
