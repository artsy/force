/**
 * @generated SignedSource<<49dc472acf0ace3dfda3811b9d972b59>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileHeader_me$data = {
  readonly bio: string | null | undefined;
  readonly createdAt: string | null | undefined;
  readonly name: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileHeaderAvatar_me" | "CollectorProfileHeaderInfo_me">;
  readonly " $fragmentType": "CollectorProfileHeader_me";
};
export type CollectorProfileHeader_me$key = {
  readonly " $data"?: CollectorProfileHeader_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileHeader_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileHeader_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollectorProfileHeaderAvatar_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollectorProfileHeaderInfo_me"
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
      "name": "bio",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "45baf50d768c31a324ff79b1737d15dc";

export default node;
