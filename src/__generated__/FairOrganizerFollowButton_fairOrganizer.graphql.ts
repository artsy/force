/**
 * @generated SignedSource<<3c5ced7f416e84738ea2387de5dac077>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerFollowButton_fairOrganizer$data = {
  readonly name: string | null;
  readonly profile: {
    readonly id: string;
    readonly internalID: string;
    readonly isFollowed: boolean | null;
  } | null;
  readonly slug: string;
  readonly " $fragmentType": "FairOrganizerFollowButton_fairOrganizer";
};
export type FairOrganizerFollowButton_fairOrganizer$key = {
  readonly " $data"?: FairOrganizerFollowButton_fairOrganizer$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairOrganizerFollowButton_fairOrganizer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerFollowButton_fairOrganizer",
  "selections": [
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
      "kind": "ScalarField",
      "name": "name",
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
          "name": "isFollowed",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FairOrganizer",
  "abstractKey": null
};

(node as any).hash = "cf361b8603eabea0549c7d227e2b2d00";

export default node;
